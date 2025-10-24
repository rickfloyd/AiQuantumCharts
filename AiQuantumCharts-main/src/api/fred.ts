export const FRED_API_KEY = import.meta.env.VITE_FRED_API_KEY;
const BASE_URL = 'https://api.stlouisfed.org/fred';

export async function fetchFredSeries(series_id: string) {
  const url = `${BASE_URL}/series/observations?series_id=${series_id}&api_key=${FRED_API_KEY}&file_type=json`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('FRED API error');
  return res.json();
}
