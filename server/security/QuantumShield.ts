import { Router } from "express";
import os from "os";

const router = Router();

router.get("/api/status", (_, res) => {
  res.json({
    status: "🟢 Online",
    uptime: process.uptime().toFixed(0),
    hostname: os.hostname(),
    timestamp: new Date().toISOString(),
  });
});

export default router;
