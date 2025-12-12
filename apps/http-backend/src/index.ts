// server.js
import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { JWT_SECRET } from "@repo/backend-common/config"; // make sure this exports a string
import { authenticate } from "./middlewares.js";

console.log(JWT_SECRET)

const app = express();
app.use(express.json());

// simple in-memory user store (replace with DB in production)
const users:any = []; // { id, username, email, passwordHash }

// ---------- SIGNUP ----------
app.post("/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password)
      return res.status(400).json({ message: "username, email and password required" });
//@ts-ignore
    const exists = users.find((u) => u.email === email);
    if (exists) return res.status(400).json({ message: "email already registered" });

    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = { id: users.length + 1, username, email, passwordHash };
    users.push(newUser);

    // respond with minimal info (not password)
    res.status(201).json({ message: "signup successful", user: { id: newUser.id, username, email } });
  } catch (err) {
    res.status(500).json({ message: "internal error" });
  }
});

// ---------- SIGNIN ----------
app.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ message: "email and password required" });
//@ts-ignore
    const user = users.find((u) => u.email === email);
    if (!user) return res.status(404).json({ message: "user not found" });

    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) return res.status(401).json({ message: "invalid credentials" });

    // same logic as your screenshot: create token with userId
    const userId = user.id;
    const token = jwt.sign({ userId }, JWT_SECRET);

    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: "internal error" });
  }
});

// ---------- PROTECTED /room ----------
app.post("/room", authenticate, (req, res) => {
  // req.user.userId is available from 
  //@ts-ignore
  res.json({ message: "accessed protected room", userId: req.user.userId });
});

// ---------- START SERVER ----------
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
