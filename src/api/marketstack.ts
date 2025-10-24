export const MARKETSTACK_API_KEY = import.meta.env.VITE_MARKETSTACK_API_KEY;
const BASE_URL = 'http://api.marketstack.com/v1';

export async function fetchMarketstackQuote(symbol: string) {
  const url = `${BASE_URL}/eod?access_key=${MARKETSTACK_API_KEY}&symbols=${symbol}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Marketstack API error');
  return res.json();
}
