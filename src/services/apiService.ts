// Mock API Service - No external API calls
export class APIService {
  private static instance: APIService;
  private dataCache: Map<string, any> = new Map();
  private updateCallbacks: Map<string, Function[]> = new Map();

  private constructor() {}

  static getInstance(): APIService {
    if (!APIService.instance) {
      APIService.instance = new APIService();
    }
    return APIService.instance;
  }

  // Mock Market Data
  async getTwelveDataQuote(symbol: string): Promise<any> {
    return this.getMockMarketData(symbol);
  }

  async getFinnhubQuote(symbol: string): Promise<any> {
    return this.getMockMarketData(symbol);
  }

  async getAlphaVantageQuote(symbol: string): Promise<any> {
    return this.getMockMarketData(symbol);
  }

  async getPolygonQuote(symbol: string): Promise<any> {
    return this.getMockMarketData(symbol);
  }

  async getCoinGeckoData(coinId: string): Promise<any> {
    return this.getMockCryptoData(coinId);
  }

  // Mock News Data
  async getPersonalityNews(personality: 'republican' | 'democrat' | 'liberal' | 'independent'): Promise<any> {
    return this.getMockNews(personality);
  }

  // Mock Sports Data
  async getNFLData(): Promise<any> {
    return this.getMockSportsData();
  }

  // Mock WebSocket (no real connection)
  connectWebSocket(endpoint: string, symbol: string, callback: Function): void {
    console.log(`Mock WebSocket connection for ${symbol}`);
    // Simulate periodic updates
    setInterval(() => {
      callback(this.getMockMarketData(symbol));
    }, 5000);
  }

  // Subscription Management (mock)
  subscribe(key: string, callback: Function): void {
    if (!this.updateCallbacks.has(key)) {
      this.updateCallbacks.set(key, []);
    }
    this.updateCallbacks.get(key)?.push(callback);
  }

  unsubscribe(key: string, callback: Function): void {
    const callbacks = this.updateCallbacks.get(key);
    if (callbacks) {
      const index = callbacks.indexOf(callback);
      if (index > -1) {
        callbacks.splice(index, 1);
      }
    }
  }

  // Cache Management
  getCachedData(key: string, maxAge: number = 60000): any {
    const cached = this.dataCache.get(key);
    if (cached && (Date.now() - cached.timestamp) < maxAge) {
      return cached.data;
    }
    return null;
  }

  // Mock Data Generators
  private getMockMarketData(symbol: string): any {
    const mockPrices = {
      'AAPL': { price: 182.31, change: 1.24, changePercent: 0.68 },
      'GOOGL': { price: 2847.42, change: -20.85, changePercent: -0.72 },
      'MSFT': { price: 378.85, change: 7.10, changePercent: 1.91 },
      'TSLA': { price: 248.50, change: -8.42, changePercent: -3.28 },
      'AMZN': { price: 3127.78, change: 21.67, changePercent: 0.70 },
      'SPY': { price: 478.25, change: 2.15, changePercent: 0.45 },
      'QQQ': { price: 384.50, change: -1.85, changePercent: -0.48 },
      'DIA': { price: 368.75, change: 3.25, changePercent: 0.89 },
      'IWM': { price: 198.45, change: -0.95, changePercent: -0.48 }
    };

    const baseData = mockPrices[symbol as keyof typeof mockPrices] || {
      price: Math.random() * 1000 + 100,
      change: (Math.random() - 0.5) * 20,
      changePercent: (Math.random() - 0.5) * 5
    };

    // Add small random variations
    return {
      ...baseData,
      price: baseData.price + (Math.random() - 0.5) * 2,
      change: baseData.change + (Math.random() - 0.5) * 0.5
    };
  }

  private getMockCryptoData(coinId: string): any {
    const mockCrypto = {
      'bitcoin': { price: 43250, change: 2.45 },
      'ethereum': { price: 2485, change: 1.85 },
      'binancecoin': { price: 315, change: -0.75 }
    };

    return mockCrypto[coinId as keyof typeof mockCrypto] || {
      price: Math.random() * 50000,
      change: (Math.random() - 0.5) * 10
    };
  }

  private getMockNews(personality: string): any[] {
    const mockNews = {
      republican: [
        { title: 'Market Rally Continues Amid Economic Growth', category: 'Business', time: '2 min ago' },
        { title: 'Federal Reserve Policy Impact on Trading', category: 'Politics', time: '15 min ago' },
        { title: 'Conservative Investment Strategies Outperform', category: 'Finance', time: '30 min ago' },
        { title: 'Traditional Energy Stocks Surge', category: 'Energy', time: '45 min ago' }
      ],
      democrat: [
        { title: 'Green Energy Stocks Surge on Climate Policy', category: 'Environment', time: '5 min ago' },
        { title: 'Social Impact Investing Trends', category: 'Politics', time: '20 min ago' },
        { title: 'Healthcare Sector Shows Strong Growth', category: 'Healthcare', time: '35 min ago' },
        { title: 'Education Technology Investments Rise', category: 'Technology', time: '50 min ago' }
      ],
      liberal: [
        { title: 'Global Markets React to Social Policies', category: 'World', time: '8 min ago' },
        { title: 'Progressive Economic Indicators', category: 'Politics', time: '25 min ago' },
        { title: 'Sustainable Finance Initiatives Expand', category: 'Sustainability', time: '40 min ago' },
        { title: 'Worker Cooperative Investments Grow', category: 'Labor', time: '55 min ago' }
      ],
      independent: [
        { title: 'Unbiased Market Analysis Report', category: 'Business', time: '3 min ago' },
        { title: 'Global Economic Outlook', category: 'World', time: '18 min ago' },
        { title: 'Balanced Portfolio Strategies', category: 'Investment', time: '33 min ago' },
        { title: 'Market Volatility Analysis', category: 'Analysis', time: '48 min ago' }
      ]
    };

    return mockNews[personality as keyof typeof mockNews] || mockNews.independent;
  }

  private getMockSportsData(): any[] {
    return [
      { homeTeam: 'Chiefs', awayTeam: 'Bills', homeScore: 24, awayScore: 21, status: 'Final' },
      { homeTeam: 'Cowboys', awayTeam: 'Giants', homeScore: 17, awayScore: 14, status: 'Q4' },
      { homeTeam: 'Patriots', awayTeam: 'Jets', homeScore: 20, awayScore: 17, status: 'Final' },
      { homeTeam: '49ers', awayTeam: 'Rams', homeScore: 28, awayScore: 21, status: 'Final' }
    ];
  }

  // Cleanup (mock)
  disconnect(): void {
    console.log('Mock API service disconnected');
    this.updateCallbacks.clear();
  }
}