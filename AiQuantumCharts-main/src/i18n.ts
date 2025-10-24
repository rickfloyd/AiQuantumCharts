// Simple i18n scaffolding for multilingual support
export const locales = {
  en: { welcome: "Welcome to QuantumCharts!" },
  es: { welcome: "¡Bienvenido a QuantumCharts!" },
  fr: { welcome: "Bienvenue sur QuantumCharts!" },
};

export function t(key: string, lang: keyof typeof locales = 'en') {
  return locales[lang][key] || key;
}
