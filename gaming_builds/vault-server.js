import express from "express";
import cors from "cors";
import multer from "multer";
import fs from "fs";
import path from "path";

const app = express();
const PORT = 3000;

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());

// 📁 Create vault directory if missing
const vaultDir = path.join(process.cwd(), "vault");
if (!fs.existsSync(vaultDir)) {
  fs.mkdirSync(vaultDir);
}

// 📦 Multer storage for attachments
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, vaultDir);
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});
const upload = multer({ storage });

// 🧠 Save message and attachment metadata
app.post("/vault/messages", upload.single("attachment"), (req, res) => {
  try {
    const {
      roomId,
      fromUserId,
      fromDisplayName,
      toUserId,
      toDisplayName,
      text,
      timestamp,
      platform,
      uiClient,
    } = req.body;

    const attachmentName = req.file ? req.file.originalname : null;
    const attachmentPath = req.file ? `/vault/${req.file.filename}` : null;

    const messageData = {
      roomId,
      fromUserId,
      fromDisplayName,
      toUserId,
      toDisplayName,
      text: text || null,
      attachmentName,
      attachmentPath,
      timestamp: timestamp || new Date().toISOString(),
      platform,
      uiClient,
      metadata: {
        ip: req.ip,
        userAgent: req.headers["user-agent"],
      },
    };

    // 📜 Save to vault log file
    const logFile = path.join(vaultDir, "messages.log");
    fs.appendFileSync(logFile, JSON.stringify(messageData) + "\n", "utf-8");

    res.json({
      success: true,
      message: "Message logged successfully.",
      stored: messageData,
    });
  } catch (err) {
    console.error("Vault save error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// 📤 Optional: Retrieve all messages for a room
app.get("/vault/messages", (req, res) => {
  const { roomId } = req.query;
  try {
    const logFile = path.join(vaultDir, "messages.log");
    if (!fs.existsSync(logFile)) {
      return res.json([]);
    }
    const lines = fs.readFileSync(logFile, "utf-8").trim().split("\n");
    const messages = lines.map((l) => JSON.parse(l));
    const filtered = roomId ? messages.filter((m) => m.roomId === roomId) : messages;
    res.json(filtered);
  } catch (err) {
    console.error("Read vault error:", err);
    res.status(500).json({ error: "Could not read vault" });
  }
});

// Mock friends API endpoint
app.get("/api/friends/all", (req, res) => {
  const mockFriends = [
    {
      id: "1",
      platform: "steam",
      friend_id: "friend-1",
      friend_name: "GamerBro123",
      status: "online"
    },
    {
      id: "2", 
      platform: "xbox",
      friend_id: "friend-2",
      friend_name: "CyberNinja",
      status: "away"
    },
    {
      id: "3",
      platform: "ps",
      friend_id: "friend-3", 
      friend_name: "KratosGod",
      status: "online"
    },
    {
      id: "4",
      platform: "epic",
      friend_id: "friend-4",
      friend_name: "FortniteKing", 
      status: "offline"
    }
  ];
  res.json(mockFriends);
});

// 📁 Serve attachments (vault directory)
app.use("/vault", express.static(vaultDir));

app.listen(PORT, () => {
  console.log(`✅ Secure Vault backend running at http://localhost:${PORT}`);
});