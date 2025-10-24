export const COINGECKO_API_KEY = import.meta.env.VITE_COINGECKO_API_KEY;
const BASE_URL = 'https://api.coingecko.com/api/v3';

export async function fetchCoinGeckoPrice(id: string) {
  const url = `${BASE_URL}/simple/price?ids=${id}&vs_currencies=usd&x_cg_pro_api_key=${COINGECKO_API_KEY}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('CoinGecko API error');
  return res.json();
}
