import { WebSocket, WebSocketServer } from 'ws';
import jwt from "jsonwebtoken";
import { JWT_SECRET } from '@repo/backend-common/config';
import { prismaClient } from "@repo/db";

const wss = new WebSocketServer({ port: 8080 });

interface User {
  ws: WebSocket;
  rooms: string[];
  userId: string;
}

// Global state of connected users
let users: User[] = [];

function checkUser(token: string): string | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    if (typeof decoded === "string" || !decoded || !decoded.userId) {
      return null;
    }

    return decoded.userId;
  } catch (e) {
    return null;
  }
}

wss.on('connection', function connection(ws, request) {
  const url = request.url;
  if (!url) {
    ws.close();
    return;
  }

  const queryParams = new URLSearchParams(url.split('?')[1]);
  const token = queryParams.get('token') || "";
  const userId = checkUser(token);

  if (!userId) {
    ws.close();
    return;
  }

  // Track the user
  const currentUser: User = {
    userId,
    rooms: [],
    ws
  };
  users.push(currentUser);

  console.log(`User ${userId} connected. Total users: ${users.length}`);

  ws.on('message', async function message(data) {
    try {
      const parsedData = JSON.parse(data.toString());

      // 1. JOIN ROOM
      if (parsedData.type === "join_room") {
        const roomId = parsedData.roomId.toString();
        if (!currentUser.rooms.includes(roomId)) {
          currentUser.rooms.push(roomId);
          console.log(`User ${userId} joined room ${roomId}`);
        }
      }

      // 2. LEAVE ROOM
      if (parsedData.type === "leave_room") {
        const roomId = parsedData.roomId.toString();
        // FIX: Keep everything EXCEPT the room we are leaving
        currentUser.rooms = currentUser.rooms.filter(x => x !== roomId);
        console.log(`User ${userId} left room ${roomId}`);
      }

      // 3. CHAT MESSAGE
      if (parsedData.type === "chat") {
        const roomId = parsedData.roomId.toString();
        const messageText = parsedData.message;

        // Persist to Database
        try {
          await prismaClient.chat.create({
            data: {
              roomId: Number(roomId),
              message: messageText,
              userId: userId
            }
          });
        } catch (dbError) {
          console.error("Database save failed:", dbError);
        }

        // Broadcast to everyone in the specific room
        users.forEach(user => {
          if (user.rooms.includes(roomId)) {
            user.ws.send(JSON.stringify({
              type: "chat",
              message: messageText,
              roomId
            }));
          }
        });
      }
    } catch (e) {
      console.error("Error processing message:", e);
    }
  });

  // 4. HANDLE DISCONNECT (Crucial for memory)
  ws.on('close', () => {
    users = users.filter(user => user.ws !== ws);
    console.log(`User ${userId} disconnected. Total users: ${users.length}`);
  });

  // Handle potential errors on the socket
  ws.on('error', console.error);
});