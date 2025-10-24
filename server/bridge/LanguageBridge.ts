// © Quantum Charts – Multilingual Code Bridge
// File: server/bridge/LanguageBridge.ts

import { detectLanguage, canonicalizeText } from "./Translator";
import localeMap from "./LocaleMap.json";
import { Router } from "express";

/**
 * normalizeRequest:  unifies input to a single canonical language
 * normalizeResponse: re-expands localized text for output
 */
export async function normalizeRequest(text: string) {
  const lang = detectLanguage(text);
  const canonical = await canonicalizeText(text, lang, "en-US");
  return { canonical, lang };
}

export async function normalizeResponse(
  canonical: string,
  targetLang: string
) {
  if (targetLang === "en-US") return canonical;
  return await canonicalizeText(canonical, "en-US", targetLang);
}

/** global middleware plug-in */
export function attachBridge(app: any) {
  app.use(async (req: any, _res: any, next: any) => {
    try {
      if (req.body?.text) {
        const { canonical, lang } = await normalizeRequest(req.body.text);
        req.body.text = canonical;
        req.clientLang = lang;
      }
    } catch (e) {
      console.error("LanguageBridge error:", e);
    }
    next();
  });
}

// API endpoint for dynamic translation
const router = Router();
router.post("/api/bridge/translate", async (req, res) => {
  const { text, lang } = req.body;
  const translated = await canonicalizeText(text, "en-US", lang);
  res.json({ translated });
});

export default router;
