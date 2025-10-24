export const SPORTSDATA_API_KEY = import.meta.env.VITE_SPORTSDATA_API_KEY;
const BASE_URL = 'https://api.sportsdata.io/v3';

export async function fetchSportsDataScores(sport: string, league: string) {
  const url = `${BASE_URL}/${sport}/scores/json/GamesByDate/2023-10-23?key=${SPORTSDATA_API_KEY}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('SportsDataIO API error');
  return res.json();
}
