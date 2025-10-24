export const POLYGON_API_KEY = import.meta.env.VITE_POLYGON_API_KEY;
const BASE_URL = 'https://api.polygon.io/v2';

export async function fetchPolygonQuote(symbol: string) {
  const url = `${BASE_URL}/last/trade/${symbol}?apiKey=${POLYGON_API_KEY}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Polygon API error');
  return res.json();
}
