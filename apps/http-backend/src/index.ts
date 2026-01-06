import express, { Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import bcrypt from "bcrypt";
import { prismaClient } from "@repo/db";
import { JWT_SECRET } from "@repo/backend-common/config";

const app = express();
app.use(express.json());

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is missing");
}

   //TYPES
interface AuthPayload extends JwtPayload {
  userId: string;
}


   //TOKEN HELPER

function getUserId(req: Request): string | null {
  const authHeader = req.headers.authorization;
  if (!authHeader) return null;

  const token = authHeader.split(" ")[1];
  if (!token) return null;

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as AuthPayload;
    return decoded.userId;
  } catch {
    return null;
  }
}


app.post("/signup", async (req: Request, res: Response) => {
  const { name, email, password } = req.body as {
    name?: string;
    email?: string;
    password?: string;
  };

  if (!name || !email || !password) {
    return res.status(400).json({ message: "Missing fields" });
  }

  try {
    const existing = await prismaClient.user.findUnique({
      where: { email }
    });

    if (existing) {
      return res.status(409).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prismaClient.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        photo: "https://imgs.search.brave.com/BwGRFG-CLtf-OLXrqqZU5l7sqSe22rt121y_UqTWtQM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/cHJlbWl1bS12ZWN0/b3IvYnVzaW5lc3Mt/bWFuLWF2YXRhci1w/cm9maWxlXzExMzMy/NTctMjQzMS5qcGc_/c2VtdD1haXNfaHli/cmlkJnc9NzQwJnE9/ODA"
      }
    });

    res.status(201).json({ userId: user.id });

  } catch {
    res.status(500).json({ message: "Signup failed" });
  }
});


app.post("/signin", async (req: Request, res: Response) => {
  const { email, password } = req.body as {
    email?: string;
    password?: string;
  };

  if (!email || !password) {
    return res.status(400).json({ message: "Missing credentials" });
  }

  try {
    const user = await prismaClient.user.findUnique({
      where: { email }
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { userId: user.id },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({ token });

  } catch {
    res.status(500).json({ message: "Signin failed" });
  }
});


app.post("/room", async (req: Request, res: Response) => {
  const userId = getUserId(req);
  if (!userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const { slug } = req.body as { slug?: string };
  if (!slug) {
    return res.status(400).json({ message: "Slug required" });
  }

  try {
    const room = await prismaClient.room.create({
      data: {
        slug,
        adminId: userId
      }
    });

    res.status(201).json(room);

  } catch {
    res.status(500).json({ message: "Room creation failed" });
  }
});


app.post("/chat", async (req: Request, res: Response) => {
  const userId = getUserId(req);
  if (!userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const { roomId, message } = req.body as {
    roomId?: number;
    message?: string;
  };

  if (!roomId || !message) {
    return res.status(400).json({ message: "Missing fields" });
  }

  try {
    const chat = await prismaClient.chat.create({
      data: {
        roomId,
        message,
        userId
      }
    });

    res.status(201).json(chat);

  } catch {
    res.status(500).json({ message: "Message failed" });
  }
});

app.get("/chats/:roomId", async (req, res) => {
    const roomId = Number(req.params.roomId);

    try {
        // We query the 'chat' table to get messages for this specific room
        const messages = await prismaClient.chat.findMany({
            where: {
                roomId: roomId,
            },
            orderBy: {
                id: "desc" // Gets latest messages first
            },
            take: 50 // Limits to the last 50 messages
        });

        res.json({
            messages
        });
    } catch (e) {
        res.status(500).json({
            message: "Error fetching chats"
        });
    }
});

app.get("/room/:slug", async (req, res) => {
    const slug = req.params.slug;

    try {
        const room = await prismaClient.room.findFirst({
            where: {
                slug
            }
        });

        res.json({
            room
        });
    } catch (e) {
        res.status(500).json({ message: "Internal server error" });
    }
});

app.listen(3005, () => {
  console.log("Server running on port 3005");
});
