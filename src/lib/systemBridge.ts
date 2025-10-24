// src/lib/systemBridge.ts

export type MarketData = {
  name: string;
  price: number;
  change: number;
};

export async function fetchFromApi<T = any>(url: string): Promise<{ status: string; data: T }> {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error('API error');
    const data = await res.json();
    return { status: 'success', data };
  } catch (e) {
    return { status: 'error', data: [] as any };
  }
}

export function normalizeMarketData(raw: any[]): MarketData[] {
  // Example normalization: expects array of { name, price, change }
  return raw.map(item => ({
    name: item.name || item.symbol || 'Unknown',
    price: Number(item.price ?? 0),
    change: Number(item.change ?? 0),
  }));
}
