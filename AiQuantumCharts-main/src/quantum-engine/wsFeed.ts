// Quantum Performance Engine: WebSocket Feed Layer
// Streams real-time market data from TwelveData, Finnhub, Polygon, etc.

export type MarketTick = {
  symbol: string;
  price: number;
  timestamp: number;
};

export class MarketWebSocketFeed {
  private ws: WebSocket | null = null;
  private url: string;
  private onTick: (tick: MarketTick) => void;

  constructor(url: string, onTick: (tick: MarketTick) => void) {
    this.url = url;
    this.onTick = onTick;
  }

  connect() {
    this.ws = new WebSocket(this.url);
    this.ws.onmessage = (msg) => {
      const data = JSON.parse(msg.data);
      this.onTick({
        symbol: data.symbol,
        price: parseFloat(data.price),
        timestamp: Date.now(),
      });
    };
    this.ws.onclose = () => {
      // Optionally: reconnect logic
    };
  }

  disconnect() {
    this.ws?.close();
  }
}
