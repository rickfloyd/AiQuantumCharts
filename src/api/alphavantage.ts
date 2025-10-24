export const ALPHAVANTAGE_API_KEY = import.meta.env.VITE_ALPHAVANTAGE_API_KEY;
const BASE_URL = 'https://www.alphavantage.co/query';

export async function fetchAlphaVantageQuote(symbol: string) {
  const url = `${BASE_URL}?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${ALPHAVANTAGE_API_KEY}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('AlphaVantage API error');
  return res.json();
}
