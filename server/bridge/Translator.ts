// File: server/bridge/Translator.ts

import franc from "franc";           // language detector
import { translate } from "@vitalets/google-translate-api"; // localizable fallback

export function detectLanguage(text: string): string {
  const code = franc(text || "en");
  return code === "und" ? "en-US" : code;
}

/**
 * canonicalizeText:
 * converts between source and target languages, default to English core
 */
export async function canonicalizeText(
  text: string,
  sourceLang: string,
  targetLang: string
): Promise<string> {
  if (sourceLang === targetLang) return text;
  try {
    const result = await translate(text, { from: sourceLang, to: targetLang });
    return result.text;
  } catch {
    return text; // fail-safe: never break processing
  }
}
