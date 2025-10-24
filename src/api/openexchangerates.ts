export const OPENEXCHANGERATES_API_KEY = import.meta.env.VITE_OPENEXCHANGERATES_API_KEY;
const BASE_URL = 'https://openexchangerates.org/api';

export async function fetchOpenExchangeRates() {
  const url = `${BASE_URL}/latest.json?app_id=${OPENEXCHANGERATES_API_KEY}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('OpenExchangeRates API error');
  return res.json();
}
