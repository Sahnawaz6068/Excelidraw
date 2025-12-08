import { NextFunction ,Request,Response} from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "./config.js";

export function authenticate(req:Request, res:Response, next:NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: "missing authorization header" });

  const parts = authHeader.split(" ");
  if (parts.length !== 2 || parts[0] !== "Bearer")
    return res.status(401).json({ message: "invalid authorization format" });

  const token = parts[1];
  try { 
    //@ts-ignore
    const payload = jwt.verify(token, JWT_SECRET);
    //@ts-ignore
    req.user = payload; // { userId: ... }
    next();
  } catch (err) {
    return res.status(401).json({ message: "invalid or expired token" });
  }
}