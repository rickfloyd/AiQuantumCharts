import React, { useState, useCallback } from 'react';
import ErrorBoundary from './ErrorBoundary';
import TradingInterface from './TradingInterface';
import MarketDataTabs from './MarketDataTabs';
import { marketDataService } from '../services/comprehensiveMarketData';

// Market Categories with API endpoints and RSS feeds
const marketCategories = {
  overview: {
    name: 'Overview',
    active: true,
    apiType: 'multiple',
    endpoints: ['market_summary', 'major_indices', 'top_gainers']
  },
  stocks: {
    name: 'Stocks',
    subcategories: {
      'us-stocks': { name: 'US Stocks', api: 'alpha_vantage', endpoint: 'QUERY_FUNCTION=TOP_GAINERS_LOSERS' },
      'most-active': { name: 'Most Active', api: 'yahoo_finance', endpoint: 'v1/finance/trending/US' },
      '52-week-high': { name: '52-Week Highs', api: 'iex_cloud', endpoint: 'stock/market/collection/sector' },
      '52-week-low': { name: '52-Week Lows', api: 'iex_cloud', endpoint: 'stock/market/collection/sector' },
      'penny-stocks': { name: 'Penny Stocks', api: 'alpha_vantage', endpoint: 'QUERY_FUNCTION=TOP_GAINERS_LOSERS' },
      'large-cap': { name: 'Large Cap', api: 'yahoo_finance', endpoint: 'v1/finance/screener' },
      'small-cap': { name: 'Small Cap', api: 'yahoo_finance', endpoint: 'v1/finance/screener' },
      'high-dividend': { name: 'High Dividend', api: 'iex_cloud', endpoint: 'stock/market/collection/sector' }
    }
  },
  crypto: {
    name: 'Crypto',
    subcategories: {
      'top-coins': { name: 'Top Coins', api: 'coingecko', endpoint: 'coins/markets' },
      '2-week-high': { name: '2-Week High', api: 'coingecko', endpoint: 'coins/markets?order=price_change_percentage_14d_desc' },
      '52-week-high': { name: '52-Week High', api: 'coingecko', endpoint: 'coins/markets?order=price_change_percentage_1y_desc' },
      '2-week-low': { name: '2-Week Low', api: 'coingecko', endpoint: 'coins/markets?order=price_change_percentage_14d_asc' },
      '52-week-low': { name: '52-Week Low', api: 'coingecko', endpoint: 'coins/markets?order=price_change_percentage_1y_asc' },
      'defi-tokens': { name: 'DeFi Tokens', api: 'coingecko', endpoint: 'coins/categories' },
      'stablecoins': { name: 'Stablecoins', api: 'coingecko', endpoint: 'coins/markets?category=stablecoins' },
      'meme-coins': { name: 'Meme Coins', api: 'coingecko', endpoint: 'coins/markets?category=meme-token' },
      'large-cap': { name: 'Large Cap', api: 'coingecko', endpoint: 'coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100' },
      'small-cap': { name: 'Small Cap', api: 'coingecko', endpoint: 'coins/markets?vs_currency=usd&order=market_cap_asc&per_page=100' }
    }
  },
  forex: {
    name: 'Forex',
    subcategories: {
      'major-pairs': { name: 'Major Pairs', api: 'alpha_vantage', endpoint: 'FX_DAILY' },
      'minor-pairs': { name: 'Minor Pairs', api: 'alpha_vantage', endpoint: 'FX_DAILY' },
      'exotic-pairs': { name: 'Exotic Pairs', api: 'alpha_vantage', endpoint: 'FX_DAILY' },
      'cross-rates': { name: 'Cross Rates', api: 'yahoo_finance', endpoint: 'v8/finance/chart' },
      'currency-indices': { name: 'Currency Indices', api: 'alpha_vantage', endpoint: 'CURRENCY_EXCHANGE_RATE' }
    }
  },
  etfs: {
    name: 'ETFs',
    subcategories: {
      'all-etfs': { name: 'All ETFs', api: 'alpha_vantage', endpoint: 'LISTING_STATUS' },
      '52-week-high': { name: '52-Week High ETFs', api: 'iex_cloud', endpoint: 'stock/market/collection/sector' },
      '52-week-low': { name: '52-Week Low ETFs', api: 'iex_cloud', endpoint: 'stock/market/collection/sector' },
      'sector-etfs': { name: 'Sector ETFs', api: 'yahoo_finance', endpoint: 'v1/finance/screener' },
      'bond-etfs': { name: 'Bond ETFs', api: 'yahoo_finance', endpoint: 'v1/finance/screener' },
      'commodity-etfs': { name: 'Commodity ETFs', api: 'yahoo_finance', endpoint: 'v1/finance/screener' },
      'leveraged-etfs': { name: 'Leveraged ETFs', api: 'yahoo_finance', endpoint: 'v1/finance/screener' },
      'inverse-etfs': { name: 'Inverse ETFs', api: 'yahoo_finance', endpoint: 'v1/finance/screener' },
      'bitcoin-etfs': { name: 'Bitcoin ETFs', api: 'yahoo_finance', endpoint: 'v1/finance/screener' },
      'ethereum-etfs': { name: 'Ethereum ETFs', api: 'yahoo_finance', endpoint: 'v1/finance/screener' }
    }
  },
  commodities: {
    name: 'Commodities',
    subcategories: {
      'energy': { name: 'Energy', api: 'alpha_vantage', endpoint: 'WTI&interval=daily' },
      'metals': { name: 'Metals', api: 'alpha_vantage', endpoint: 'COPPER&interval=daily' },
      'agricultural': { name: 'Agricultural', api: 'alpha_vantage', endpoint: 'CORN&interval=daily' },
      'gold': { name: 'Gold', api: 'alpha_vantage', endpoint: 'GOLD&interval=daily' },
      'oil': { name: 'Oil', api: 'alpha_vantage', endpoint: 'WTI&interval=daily' },
      'natural-gas': { name: 'Natural Gas', api: 'alpha_vantage', endpoint: 'NATURAL_GAS&interval=daily' }
    }
  },
  indices: {
    name: 'Indices',
    subcategories: {
      'us-indices': { name: 'US Indices', api: 'alpha_vantage', endpoint: 'TIME_SERIES_DAILY&symbol=SPY' },
      'world-indices': { name: 'World Indices', api: 'yahoo_finance', endpoint: 'v1/finance/trending' },
      'asia-pacific': { name: 'Asia-Pacific', api: 'yahoo_finance', endpoint: 'v1/finance/trending' },
      'european': { name: 'European', api: 'yahoo_finance', endpoint: 'v1/finance/trending' },
      'emerging-markets': { name: 'Emerging Markets', api: 'yahoo_finance', endpoint: 'v1/finance/trending' }
    }
  },
  futures: {
    name: 'Futures',
    subcategories: {
      'index-futures': { name: 'Index Futures', api: 'alpha_vantage', endpoint: 'TIME_SERIES_DAILY' },
      'commodity-futures': { name: 'Commodity Futures', api: 'alpha_vantage', endpoint: 'COMMODITY' },
      'currency-futures': { name: 'Currency Futures', api: 'alpha_vantage', endpoint: 'FX_DAILY' },
      'interest-rate-futures': { name: 'Interest Rate Futures', api: 'alpha_vantage', endpoint: 'TREASURY_YIELD' },
      'energy-futures': { name: 'Energy Futures', api: 'alpha_vantage', endpoint: 'WTI&interval=daily' }
    }
  },
  options: {
    name: 'Options',
    subcategories: {
      'most-active': { name: 'Most Active Options', api: 'alpha_vantage', endpoint: 'OPTIONS' },
      'unusual-activity': { name: 'Unusual Activity', api: 'alpha_vantage', endpoint: 'OPTIONS' },
      'high-volume': { name: 'High Volume', api: 'alpha_vantage', endpoint: 'OPTIONS' }
    }
  },
  bonds: {
    name: 'Bonds',
    subcategories: {
      'government-bonds': { name: 'Government Bonds', api: 'alpha_vantage', endpoint: 'TREASURY_YIELD' },
      'corporate-bonds': { name: 'Corporate Bonds', api: 'alpha_vantage', endpoint: 'TREASURY_YIELD' },
      'international-bonds': { name: 'International Bonds', api: 'alpha_vantage', endpoint: 'TREASURY_YIELD' },
      'high-yield': { name: 'High Yield', api: 'alpha_vantage', endpoint: 'TREASURY_YIELD' }
    }
  },
  sectors: {
    name: 'Sectors',
    subcategories: {
      'technology': { name: 'Technology', api: 'alpha_vantage', endpoint: 'SECTOR' },
      'healthcare': { name: 'Healthcare', api: 'alpha_vantage', endpoint: 'SECTOR' },
      'financials': { name: 'Financials', api: 'alpha_vantage', endpoint: 'SECTOR' },
      'energy': { name: 'Energy', api: 'alpha_vantage', endpoint: 'SECTOR' },
      'consumer-discretionary': { name: 'Consumer Discretionary', api: 'alpha_vantage', endpoint: 'SECTOR' },
      'industrials': { name: 'Industrials', api: 'alpha_vantage', endpoint: 'SECTOR' },
      'materials': { name: 'Materials', api: 'alpha_vantage', endpoint: 'SECTOR' },
      'utilities': { name: 'Utilities', api: 'alpha_vantage', endpoint: 'SECTOR' },
      'real-estate': { name: 'Real Estate', api: 'alpha_vantage', endpoint: 'SECTOR' }
    }
  },
  international: {
    name: 'International',
    subcategories: {
      'chinese-stocks': { name: 'Chinese Stocks', api: 'yahoo_finance', endpoint: 'v1/finance/trending/CN' },
      'japanese-stocks': { name: 'Japanese Stocks', api: 'yahoo_finance', endpoint: 'v1/finance/trending/JP' },
      'european-stocks': { name: 'European Stocks', api: 'yahoo_finance', endpoint: 'v1/finance/trending/GB' },
      'emerging-markets': { name: 'Emerging Markets', api: 'yahoo_finance', endpoint: 'v1/finance/trending' }
    }
  },
  news: {
    name: 'News & Analysis',
    subcategories: {
      'market-news': { name: 'Market News', rss: 'https://feeds.bloomberg.com/markets/news.rss' },
      'financial-news': { name: 'Financial News', rss: 'https://feeds.reuters.com/reuters/businessNews' },
      'crypto-news': { name: 'Crypto News', rss: 'https://cointelegraph.com/rss' },
      'forex-news': { name: 'Forex News', rss: 'https://www.forexfactory.com/news.xml' },
      'economic-calendar': { name: 'Economic Calendar', api: 'alpha_vantage', endpoint: 'NEWS_SENTIMENT' }
    }
  }
};

const ProfessionalTradingLayout: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('overview');


  const handleCategoryClick = useCallback(async (categoryKey: string) => {
    setActiveCategory(categoryKey);

    
    try {
      // Load market data for the selected category
      const categoryData = marketCategories[categoryKey as keyof typeof marketCategories];
      if (categoryData && 'subcategories' in categoryData && Object.keys(categoryData.subcategories).length > 0) {
        const firstSubcategory = Object.keys(categoryData.subcategories)[0];
        const data = await marketDataService.getMarketDataByCategory(categoryKey, firstSubcategory);
        console.log('Market data loaded for', categoryKey, ':', data);
      }
    } catch (error) {
      console.error('Error loading market data:', error);
    }
  }, []);


  return (
    <div className="min-h-screen bg-deep-black text-fluorescent-pink">
      
      {/* Market Summary Section - Exactly like screenshots */}
      <div className="p-6 bg-deep-black border-b border-pulsing-cyan">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-fluorescent-pink text-xl font-bold animate-cyber-pulse">📊 Market Summary</h2>
          <div className="flex gap-2">
            <button className="px-3 py-1 bg-pulsing-cyan text-deep-black rounded font-bold hover:bg-fluorescent-pink transition-all">Stocks</button>
            <button className="px-3 py-1 bg-deep-black text-pulsing-cyan border border-pulsing-cyan rounded font-bold hover:bg-fluorescent-pink hover:text-deep-black transition-all">Spreads</button>
            <button className="px-3 py-1 bg-deep-black text-pulsing-cyan border border-pulsing-cyan rounded font-bold hover:bg-fluorescent-pink hover:text-deep-black transition-all">Float</button>
            <button className="px-3 py-1 bg-deep-black text-pulsing-cyan border border-pulsing-cyan rounded font-bold hover:bg-fluorescent-pink hover:text-deep-black transition-all">Crypto</button>
            <button className="px-3 py-1 bg-deep-black text-pulsing-cyan border border-pulsing-cyan rounded font-bold hover:bg-fluorescent-pink hover:text-deep-black transition-all">Futures</button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* AI-Powered Trading Platform Card */}
          <div className="bg-deep-black border-2 border-pulsing-cyan p-4 rounded-lg shadow-neon-cyan">
            <div className="text-fluorescent-pink text-sm font-bold mb-2">🚀 AI-Powered Trading Platform</div>
            <div className="space-y-1">
              <div className="flex items-center text-xs">
                <div className="w-2 h-2 bg-fluorescent-pink rounded mr-2"></div>
                <span className="text-pulsing-cyan">AI Price Prediction Engine</span>
              </div>
              <div className="flex items-center text-xs">
                <div className="w-2 h-2 bg-fluorescent-pink rounded mr-2"></div>
                <span className="text-pulsing-cyan">ML Pattern Recognition</span>
              </div>
              <div className="flex items-center text-xs">
                <div className="w-2 h-2 bg-fluorescent-pink rounded mr-2"></div>
                <span className="text-pulsing-cyan">Sentiment Analysis AI</span>
              </div>
              <div className="flex items-center text-xs">
                <div className="w-2 h-2 bg-fluorescent-pink rounded mr-2"></div>
                <span className="text-pulsing-cyan">Smart Risk Management</span>
              </div>
            </div>
          </div>

          {/* Nasdaq Card */}
          <div className="bg-deep-black border-2 border-pulsing-cyan p-4 rounded-lg shadow-neon-cyan hover:border-fluorescent-pink transition-all">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-pulsing-cyan rounded-full flex items-center justify-center mr-3">
                  <span className="text-deep-black font-bold">📈</span>
                </div>
                <div>
                  <div className="text-pulsing-cyan text-sm font-bold">Nasdaq 100</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-electric-yellow text-lg font-bold">$382.36</div>
                <div className="text-hot-pink text-sm font-bold flex items-center">
                  ↓ -0.45%
                </div>
              </div>
            </div>
          </div>

          {/* Dow Jones Card */}
          <div className="bg-deep-black border-2 border-pulsing-cyan p-4 rounded-lg shadow-neon-cyan hover:border-fluorescent-pink transition-all">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-electric-orange rounded-full flex items-center justify-center mr-3">
                  <span className="text-deep-black font-bold">📊</span>
                </div>
                <div>
                  <div className="text-pulsing-cyan text-sm font-bold">Dow Jones</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-electric-yellow text-lg font-bold">$367.43</div>
                <div className="text-neon-green text-sm font-bold flex items-center">
                  ↑ +1.37%
                </div>
              </div>
            </div>
          </div>

          {/* Russell 2000 Card */}
          <div className="bg-deep-black border-2 border-pulsing-cyan p-4 rounded-lg shadow-neon-cyan hover:border-fluorescent-pink transition-all">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-fluorescent-blue rounded-full flex items-center justify-center mr-3">
                  <span className="text-deep-black font-bold">💹</span>
                </div>
                <div>
                  <div className="text-pulsing-cyan text-sm font-bold">Russell 2000</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-electric-yellow text-lg font-bold">$195.98</div>
                <div className="text-hot-pink text-sm font-bold flex items-center">
                  ↓ -0.82%
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Trading Interface */}
      <div className="flex h-screen">
        {/* Left Panel - Trading Interface */}
        <div className="flex-1 bg-deep-black border-r border-pulsing-cyan">
          <ErrorBoundary>
            <TradingInterface />
          </ErrorBoundary>
        </div>

        {/* Right Panel - Quantum Charts Navigation */}
        <div className="w-80 bg-deep-black border-l border-pulsing-cyan">
          <div className="p-4">
            <h3 className="text-fluorescent-pink font-bold mb-4 animate-cyber-pulse">⚡ Quantum Charts</h3>
            <div className="bg-deep-black border border-pulsing-cyan rounded-lg p-4 mb-4">
              <h4 className="text-pulsing-cyan font-bold mb-2 text-sm">MARKETS</h4>
              <div className="space-y-2">
                <div className="bg-fluorescent-pink text-deep-black px-2 py-1 rounded text-xs font-bold">Overview</div>
                <div 
                  className="bg-deep-black border border-pulsing-cyan text-pulsing-cyan px-2 py-1 rounded text-xs font-bold hover:bg-fluorescent-pink hover:text-deep-black transition-all cursor-pointer"
                  onClick={() => handleCategoryClick('forex')}
                >
                  Forex
                </div>
                <div 
                  className="bg-deep-black border border-pulsing-cyan text-pulsing-cyan px-2 py-1 rounded text-xs font-bold hover:bg-fluorescent-pink hover:text-deep-black transition-all cursor-pointer"
                  onClick={() => handleCategoryClick('crypto')}
                >
                  Crypto
                </div>
                <div 
                  className="bg-deep-black border border-pulsing-cyan text-pulsing-cyan px-2 py-1 rounded text-xs font-bold hover:bg-fluorescent-pink hover:text-deep-black transition-all cursor-pointer"
                  onClick={() => handleCategoryClick('stocks')}
                >
                  Stocks
                </div>
                <div 
                  className="bg-deep-black border border-pulsing-cyan text-pulsing-cyan px-2 py-1 rounded text-xs font-bold hover:bg-fluorescent-pink hover:text-deep-black transition-all cursor-pointer"
                  onClick={() => handleCategoryClick('commodities')}
                >
                  Commodities
                </div>
                <div 
                  className="bg-deep-black border border-pulsing-cyan text-pulsing-cyan px-2 py-1 rounded text-xs font-bold hover:bg-fluorescent-pink hover:text-deep-black transition-all cursor-pointer"
                  onClick={() => handleCategoryClick('indices')}
                >
                  Indexes
                </div>
                <div 
                  className="bg-deep-black border border-pulsing-cyan text-pulsing-cyan px-2 py-1 rounded text-xs font-bold hover:bg-fluorescent-pink hover:text-deep-black transition-all cursor-pointer"
                  onClick={() => handleCategoryClick('futures')}
                >
                  Futures
                </div>
                <div 
                  className="bg-deep-black border border-pulsing-cyan text-pulsing-cyan px-2 py-1 rounded text-xs font-bold hover:bg-fluorescent-pink hover:text-deep-black transition-all cursor-pointer"
                  onClick={() => handleCategoryClick('options')}
                >
                  Options
                </div>
              </div>
            </div>
            
            {/* AI Analysis Panel */}
            <div className="bg-deep-black border border-pulsing-cyan rounded-lg p-4">
              <h4 className="text-fluorescent-pink font-bold mb-2 text-sm animate-cyber-pulse">🤖 AI ANALYSIS</h4>
              <div className="space-y-2 text-xs">
                <div className="text-pulsing-cyan">• Market sentiment: <span className="text-neon-green font-bold">BULLISH</span></div>
                <div className="text-pulsing-cyan">• Volatility index: <span className="text-electric-yellow font-bold">18.52</span></div>
                <div className="text-pulsing-cyan">• Trend strength: <span className="text-fluorescent-pink font-bold">STRONG</span></div>
                <div className="text-pulsing-cyan">• Risk level: <span className="text-electric-orange font-bold">MODERATE</span></div>
              </div>
              
              <div className="mt-4 pt-2 border-t border-pulsing-cyan">
                <div className="text-fluorescent-pink font-bold text-xs mb-2">💡 AI RECOMMENDATIONS</div>
                <div className="space-y-1 text-xs">
                  <div className="text-neon-green">✓ Consider long positions in tech</div>
                  <div className="text-electric-yellow">⚠ Monitor USD strength</div>
                  <div className="text-pulsing-cyan">📊 Watch volume breakouts</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section - Market Data */}
      <ErrorBoundary>
        <MarketDataTabs />
      </ErrorBoundary>
    </div>
  );
};

export default ProfessionalTradingLayout;