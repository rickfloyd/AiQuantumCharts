import { Router } from "express";
import { zeroCodeBan } from "../middleware/zeroCodeBan";

const router = Router();

// Example in-memory chat log (replace with DB in production)
const chatLog: { userId: string; message: string; timestamp: number }[] = [];

router.post("/send", zeroCodeBan, (req, res) => {
  const { userId, message } = req.body;
  chatLog.push({ userId, message, timestamp: Date.now() });
  // Broadcast to clients via socket.io or similar here
  res.status(200).json({ success: true });
});

router.get("/history", (req, res) => {
  res.status(200).json({ chat: chatLog });
});

export default router;
