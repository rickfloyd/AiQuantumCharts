import { Router } from "express";
import fetch from "node-fetch";
const router = Router();

const TWELVE_KEY = "6892d751d0104a789847f040c031053f";

router.get("/:symbol", async (req, res) => {
  try {
    const symbol = req.params.symbol.toUpperCase();
    const api = `https://api.twelvedata.com/price?symbol=${symbol}&apikey=${TWELVE_KEY}`;
    const r = await fetch(api);
    const j = await r.json();
    res.json({ symbol, price: j.price });
  } catch (e) {
    res.status(500).json({ error: "Price fetch failed" });
  }
});

export default router;
