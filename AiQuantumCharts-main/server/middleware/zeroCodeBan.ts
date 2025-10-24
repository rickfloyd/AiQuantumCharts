// Universal Zero-Code Ban Middleware
// Blocks code in all major languages before saving/broadcasting any message/post
// Works in Express or Next.js API routes

import type { Request, Response, NextFunction } from "express";

// Multi-language dangerous code patterns
const DANGEROUS_PATTERNS = [
  /<script.*?>/i, /<\/script>/i,
  /function\s*\(/, /=>/, /const\s+/, /let\s+/, /var\s+/, /import\s+/, /export\s+/, /eval\s*\(/,
  /def\s+/, /lambda/, /os\./, /subprocess/, /import\s+os/, /import\s+sys/,
  /#include/, /int\s+main\s*\(/, /\{.*\}/, /;.*;/,
  /<iframe/, /<img\s+src=/, /onerror=/i, /onload=/i,
  /<\?php/, /echo\s+/, /\$_GET/, /\$_POST/,
  /SELECT\s+.*FROM/i, /INSERT\s+INTO/i, /DROP\s+TABLE/i, /UPDATE\s+.*SET/i, /--/, /;/,
  /#!\/bin\/bash/, /curl\b/, /wget\b/, /&&/, /\|\|/,
  /new\s+Function/, /atob\(/, /unescape\(/,
  /[A-Za-z0-9+/=]{40,}/, // base64
];

export function zeroCodeBan(req: Request, res: Response, next: NextFunction) {
  const message = req.body.message || req.body.content || "";
  for (const pattern of DANGEROUS_PATTERNS) {
    if (pattern.test(message)) {
      logAndBan(req);
      injectSystemWarning("⚠️ Bot detected and removed. Sorry for the inconvenience.");
      return res.status(403).json({ error: "Code detected. You are permanently banned." });
    }
  }
  // Optionally: add entropy/AI checks here
  return next();
}

function logAndBan(req: Request) {
  // Pseudo-code: Replace with real DB + security API calls
  console.log("🚨 Code injection attempt from", req.ip, req.headers["user-agent"]);
  // Save to incident logs, ban account, ban IP range, fingerprint device, etc.
}

function injectSystemWarning(text: string) {
  // Broadcast a warning to all active users in the chat room
  // Replace with your socket or pub/sub logic
  console.log("📢 SYSTEM WARNING:", text);
}
