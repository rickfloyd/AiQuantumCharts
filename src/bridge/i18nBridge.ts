// © Quantum Charts – Frontend i18n Bridge
// File: src/bridge/i18nBridge.ts

import axios from "axios";

/** detect browser language safely */
export function getUserLang(): string {
  return navigator.language || "en-US";
}

/** fetch translation for given key from local dictionary or server */
export async function t(key: string, lang?: string): Promise<string> {
  const lng = lang || getUserLang();
  try {
    const local = await import(`./locales/${lng.slice(0, 2)}.json`);
    return local[key] || key;
  } catch {
    try {
      const { data } = await axios.post("/api/bridge/translate", {
        text: key,
        lang: lng,
      });
      return data.translated || key;
    } catch {
      return key;
    }
  }
}
