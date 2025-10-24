import { Router } from "express";
const router = Router();

const fxPairs = [
  "EUR/USD","USD/JPY","GBP/USD","AUD/USD","BTC/USD","ETH/USD",
  "XAU/USD","USD/CHF","USD/CAD","USD/BRL","NZD/USD","EUR/JPY",
  "USD/MXN","GBP/JPY","XAG/USD","USD/ZAR","EUR/GBP","EUR/CHF",
  "ETH/BTC","LTC/USD"
];

router.get("/", (_, res) => {
  res.status(200).json({ success: true, pairs: fxPairs });
});

export default router;
