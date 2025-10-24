export const TWELVEDATA_API_KEY = import.meta.env.VITE_TWELVEDATA_API_KEY;
const BASE_URL = 'https://api.twelvedata.com';

export async function fetchTwelveDataQuote(symbol: string) {
  const url = `${BASE_URL}/quote?symbol=${symbol}&apikey=${TWELVEDATA_API_KEY}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('TwelveData API error');
  return res.json();
}
