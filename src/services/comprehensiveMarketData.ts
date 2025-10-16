// Comprehensive Market Data Service for AI Quantum Charts
// Handles all the market categories with proper API integrations

interface MarketDataConfig {
  name: string;
  api?: string;
  endpoint?: string;
  rss?: string;
}

interface ApiResponse {
  data: any;
  error?: string;
  source: string;
}

class ComprehensiveMarketDataService {
  private readonly API_KEYS = {
    ALPHA_VANTAGE: process.env.REACT_APP_ALPHA_VANTAGE_KEY || 'demo',
    POLYGON: process.env.REACT_APP_POLYGON_KEY || '',
    IEX_CLOUD: process.env.REACT_APP_IEX_CLOUD_KEY || '',
    FINNHUB: process.env.REACT_APP_FINNHUB_KEY || ''
  };

  private readonly BASE_URLS = {
    alpha_vantage: 'https://www.alphavantage.co/query',
    yahoo_finance: 'https://query1.finance.yahoo.com',
    iex_cloud: 'https://cloud.iexapis.com/stable',
    coingecko: 'https://api.coingecko.com/api/v3',
    polygon: 'https://api.polygon.io',
    finnhub: 'https://finnhub.io/api/v1'
  };

  // Fetch data based on category configuration
  async fetchMarketData(config: MarketDataConfig): Promise<ApiResponse> {
    try {
      if (config.rss) {
        return this.fetchRSSData(config.rss);
      }

      switch (config.api) {
        case 'alpha_vantage':
          return this.fetchAlphaVantageData(config.endpoint || '');
        case 'yahoo_finance':
          return this.fetchYahooFinanceData(config.endpoint || '');
        case 'iex_cloud':
          return this.fetchIEXCloudData(config.endpoint || '');
        case 'coingecko':
          return this.fetchCoinGeckoData(config.endpoint || '');
        case 'polygon':
          return this.fetchPolygonData(config.endpoint || '');
        case 'finnhub':
          return this.fetchFinnhubData(config.endpoint || '');
        default:
          throw new Error(`Unsupported API: ${config.api}`);
      }
    } catch (error) {
      return {
        data: null,
        error: error instanceof Error ? error.message : 'Unknown error',
        source: config.api || config.rss || 'unknown'
      };
    }
  }

  // Alpha Vantage API calls
  private async fetchAlphaVantageData(endpoint: string): Promise<ApiResponse> {
    const url = `${this.BASE_URLS.alpha_vantage}?${endpoint}&apikey=${this.API_KEYS.ALPHA_VANTAGE}`;
    
    const response = await fetch(url);
    const data = await response.json();
    
    return {
      data,
      source: 'alpha_vantage'
    };
  }

  // Yahoo Finance API calls
  private async fetchYahooFinanceData(endpoint: string): Promise<ApiResponse> {
    const url = `${this.BASE_URLS.yahoo_finance}/${endpoint}`;
    
    const response = await fetch(url);
    const data = await response.json();
    
    return {
      data,
      source: 'yahoo_finance'
    };
  }

  // IEX Cloud API calls
  private async fetchIEXCloudData(endpoint: string): Promise<ApiResponse> {
    const url = `${this.BASE_URLS.iex_cloud}/${endpoint}?token=${this.API_KEYS.IEX_CLOUD}`;
    
    const response = await fetch(url);
    const data = await response.json();
    
    return {
      data,
      source: 'iex_cloud'
    };
  }

  // CoinGecko API calls
  private async fetchCoinGeckoData(endpoint: string): Promise<ApiResponse> {
    const url = `${this.BASE_URLS.coingecko}/${endpoint}`;
    
    const response = await fetch(url);
    const data = await response.json();
    
    return {
      data,
      source: 'coingecko'
    };
  }

  // Polygon API calls
  private async fetchPolygonData(endpoint: string): Promise<ApiResponse> {
    const url = `${this.BASE_URLS.polygon}/${endpoint}?apikey=${this.API_KEYS.POLYGON}`;
    
    const response = await fetch(url);
    const data = await response.json();
    
    return {
      data,
      source: 'polygon'
    };
  }

  // Finnhub API calls
  private async fetchFinnhubData(endpoint: string): Promise<ApiResponse> {
    const url = `${this.BASE_URLS.finnhub}/${endpoint}?token=${this.API_KEYS.FINNHUB}`;
    
    const response = await fetch(url);
    const data = await response.json();
    
    return {
      data,
      source: 'finnhub'
    };
  }

  // RSS feed parsing
  private async fetchRSSData(rssUrl: string): Promise<ApiResponse> {
    try {
      // Use a RSS-to-JSON proxy service for CORS compatibility
      const proxyUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`;
      
      const response = await fetch(proxyUrl);
      const data = await response.json();
      
      return {
        data,
        source: 'rss'
      };
    } catch (error) {
      return {
        data: null,
        error: `RSS fetch failed: ${error}`,
        source: 'rss'
      };
    }
  }

  // Specific market data fetchers
  async getStockData(category: string, subcategory: string) {
    const configs = {
      'us-stocks': { name: 'US Stocks', api: 'alpha_vantage', endpoint: 'function=TOP_GAINERS_LOSERS' },
      'most-active': { name: 'Most Active', api: 'alpha_vantage', endpoint: 'function=TOP_GAINERS_LOSERS' },
      '52-week-high': { name: '52-Week Highs', api: 'alpha_vantage', endpoint: 'function=TOP_GAINERS_LOSERS' },
      '52-week-low': { name: '52-Week Lows', api: 'alpha_vantage', endpoint: 'function=TOP_GAINERS_LOSERS' },
      'penny-stocks': { name: 'Penny Stocks', api: 'alpha_vantage', endpoint: 'function=TOP_GAINERS_LOSERS' },
      'large-cap': { name: 'Large Cap', api: 'alpha_vantage', endpoint: 'function=MARKET_STATUS' },
      'small-cap': { name: 'Small Cap', api: 'alpha_vantage', endpoint: 'function=MARKET_STATUS' },
      'high-dividend': { name: 'High Dividend', api: 'alpha_vantage', endpoint: 'function=TOP_GAINERS_LOSERS' }
    };

    const config = configs[subcategory as keyof typeof configs];
    if (!config) {
      throw new Error(`Unsupported stock subcategory: ${subcategory}`);
    }

    return this.fetchMarketData(config);
  }

  async getCryptoData(subcategory: string) {
    const configs = {
      'top-coins': { name: 'Top Coins', api: 'coingecko', endpoint: 'coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1' },
      '2-week-high': { name: '2-Week High', api: 'coingecko', endpoint: 'coins/markets?vs_currency=usd&order=price_change_percentage_14d_desc&per_page=100' },
      '52-week-high': { name: '52-Week High', api: 'coingecko', endpoint: 'coins/markets?vs_currency=usd&order=price_change_percentage_1y_desc&per_page=100' },
      '2-week-low': { name: '2-Week Low', api: 'coingecko', endpoint: 'coins/markets?vs_currency=usd&order=price_change_percentage_14d_asc&per_page=100' },
      '52-week-low': { name: '52-Week Low', api: 'coingecko', endpoint: 'coins/markets?vs_currency=usd&order=price_change_percentage_1y_asc&per_page=100' },
      'defi-tokens': { name: 'DeFi Tokens', api: 'coingecko', endpoint: 'coins/markets?vs_currency=usd&category=decentralized-finance-defi&order=market_cap_desc&per_page=100' },
      'stablecoins': { name: 'Stablecoins', api: 'coingecko', endpoint: 'coins/markets?vs_currency=usd&category=stablecoins&order=market_cap_desc&per_page=100' },
      'meme-coins': { name: 'Meme Coins', api: 'coingecko', endpoint: 'coins/markets?vs_currency=usd&category=meme-token&order=market_cap_desc&per_page=100' },
      'large-cap': { name: 'Large Cap', api: 'coingecko', endpoint: 'coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1' },
      'small-cap': { name: 'Small Cap', api: 'coingecko', endpoint: 'coins/markets?vs_currency=usd&order=market_cap_asc&per_page=100&page=1' }
    };

    const config = configs[subcategory as keyof typeof configs];
    if (!config) {
      throw new Error(`Unsupported crypto subcategory: ${subcategory}`);
    }

    return this.fetchMarketData(config);
  }

  async getForexData(subcategory: string) {
    const configs = {
      'major-pairs': { name: 'Major Pairs', api: 'alpha_vantage', endpoint: 'function=FX_DAILY&from_symbol=EUR&to_symbol=USD' },
      'minor-pairs': { name: 'Minor Pairs', api: 'alpha_vantage', endpoint: 'function=FX_DAILY&from_symbol=GBP&to_symbol=JPY' },
      'exotic-pairs': { name: 'Exotic Pairs', api: 'alpha_vantage', endpoint: 'function=FX_DAILY&from_symbol=USD&to_symbol=TRY' },
      'cross-rates': { name: 'Cross Rates', api: 'alpha_vantage', endpoint: 'function=CURRENCY_EXCHANGE_RATE&from_currency=EUR&to_currency=GBP' },
      'currency-indices': { name: 'Currency Indices', api: 'alpha_vantage', endpoint: 'function=FX_DAILY&from_symbol=DXY&to_symbol=USD' }
    };

    const config = configs[subcategory as keyof typeof configs];
    if (!config) {
      throw new Error(`Unsupported forex subcategory: ${subcategory}`);
    }

    return this.fetchMarketData(config);
  }

  async getETFData(subcategory: string) {
    const configs = {
      'all-etfs': { name: 'All ETFs', api: 'alpha_vantage', endpoint: 'function=LISTING_STATUS&state=active' },
      '52-week-high': { name: '52-Week High ETFs', api: 'alpha_vantage', endpoint: 'function=TOP_GAINERS_LOSERS' },
      '52-week-low': { name: '52-Week Low ETFs', api: 'alpha_vantage', endpoint: 'function=TOP_GAINERS_LOSERS' },
      'bitcoin-etfs': { name: 'Bitcoin ETFs', api: 'alpha_vantage', endpoint: 'function=TIME_SERIES_DAILY&symbol=BITO' },
      'ethereum-etfs': { name: 'Ethereum ETFs', api: 'alpha_vantage', endpoint: 'function=TIME_SERIES_DAILY&symbol=ETHE' }
    };

    const config = configs[subcategory as keyof typeof configs];
    if (!config) {
      throw new Error(`Unsupported ETF subcategory: ${subcategory}`);
    }

    return this.fetchMarketData(config);
  }

  async getCommodityData(subcategory: string) {
    const configs = {
      'energy': { name: 'Energy', api: 'alpha_vantage', endpoint: 'function=WTI&interval=daily' },
      'metals': { name: 'Metals', api: 'alpha_vantage', endpoint: 'function=COPPER&interval=daily' },
      'agricultural': { name: 'Agricultural', api: 'alpha_vantage', endpoint: 'function=CORN&interval=daily' },
      'gold': { name: 'Gold', api: 'alpha_vantage', endpoint: 'function=GOLD&interval=daily' },
      'oil': { name: 'Oil', api: 'alpha_vantage', endpoint: 'function=WTI&interval=daily' },
      'natural-gas': { name: 'Natural Gas', api: 'alpha_vantage', endpoint: 'function=NATURAL_GAS&interval=daily' }
    };

    const config = configs[subcategory as keyof typeof configs];
    if (!config) {
      throw new Error(`Unsupported commodity subcategory: ${subcategory}`);
    }

    return this.fetchMarketData(config);
  }

  async getNewsData(subcategory: string) {
    const configs = {
      'market-news': { name: 'Market News', rss: 'https://feeds.bloomberg.com/markets/news.rss' },
      'financial-news': { name: 'Financial News', rss: 'https://feeds.reuters.com/reuters/businessNews' },
      'crypto-news': { name: 'Crypto News', rss: 'https://cointelegraph.com/rss' },
      'forex-news': { name: 'Forex News', rss: 'https://www.forexfactory.com/news.xml' },
      'economic-calendar': { name: 'Economic Calendar', api: 'alpha_vantage', endpoint: 'function=NEWS_SENTIMENT&topics=financial_markets' },
      'world-economic': { name: 'World Economic', rss: 'https://feeds.reuters.com/reuters/businessNews' },
      'earnings-calendar': { name: 'Earnings Calendar', api: 'alpha_vantage', endpoint: 'function=EARNINGS_CALENDAR' }
    };

    const config = configs[subcategory as keyof typeof configs];
    if (!config) {
      throw new Error(`Unsupported news subcategory: ${subcategory}`);
    }

    return this.fetchMarketData(config);
  }

  // Main dispatcher method
  async getMarketDataByCategory(category: string, subcategory: string): Promise<ApiResponse> {
    switch (category) {
      case 'stocks':
        return this.getStockData(category, subcategory);
      case 'crypto':
        return this.getCryptoData(subcategory);
      case 'forex':
        return this.getForexData(subcategory);
      case 'etfs':
        return this.getETFData(subcategory);
      case 'commodities':
        return this.getCommodityData(subcategory);
      case 'news':
        return this.getNewsData(subcategory);
      default:
        throw new Error(`Unsupported category: ${category}`);
    }
  }
}

// Export singleton instance
export const marketDataService = new ComprehensiveMarketDataService();
export default marketDataService;