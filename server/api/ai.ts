import { Router } from "express";
const router = Router();

// Placeholder: Replace with real LLM/OpenAI integration
router.post("/assist", async (req, res) => {
  const { message } = req.body;
  // TODO: Call OpenAI or local LLM here
  // For now, echo back a canned response
  let reply = "QubitSensei: I see you want help with: " + message;
  if (/ema|moving average/i.test(message)) {
    reply += "\nHere's a QubitScript example for EMA:\nema21 = ema(close, length=21)\nplot(ema21, label=\"21 EMA\")";
  }
  res.json({ reply });
});

export default router;
