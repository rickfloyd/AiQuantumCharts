import React, { useState } from 'react';
import { TrendingUp, TrendingDown, Star, Shield, Globe, Award, DollarSign, Coins, BarChart3, Activity, Zap } from 'lucide-react';

const MarketDataTabs = () => {
  const [activeMainTab, setActiveMainTab] = useState('bloomberg');
  const [activeAssetTab, setActiveAssetTab] = useState('stocks');

  // Asset category data with fluorescent colors
  const stocksData = [
    { symbol: 'AAPL', name: 'Apple Inc.', price: '$182.31', change: '+1.24%', positive: true, volume: '45.2M', color: 'fluorescent-pink' },
    { symbol: 'GOOGL', name: 'Alphabet Inc.', price: '$2,847.42', change: '-0.85%', positive: false, volume: '28.1M', color: 'fluorescent-blue' },
    { symbol: 'MSFT', name: 'Microsoft Corp.', price: '$378.85', change: '+2.10%', positive: true, volume: '32.8M', color: 'electric-orange' },
    { symbol: 'TSLA', name: 'Tesla Inc.', price: '$248.50', change: '-3.42%', positive: false, volume: '89.5M', color: 'pulsing-cyan' },
    { symbol: 'AMZN', name: 'Amazon.com Inc.', price: '$3,127.78', change: '+0.67%', positive: true, volume: '25.3M', color: 'neon-green' },
  ];

  const spreadsData = [
    { symbol: 'SPY/QQQ', name: 'S&P 500 vs Nasdaq', spread: '2.45', change: '+0.12', positive: true, type: 'ETF Spread', color: 'fluorescent-pink' },
    { symbol: 'GLD/SLV', name: 'Gold vs Silver', spread: '78.32', change: '-1.25', positive: false, type: 'Commodity Spread', color: 'fluorescent-blue' },
    { symbol: 'TLT/IEF', name: 'Long vs Mid Treasury', spread: '1.85', change: '+0.08', positive: true, type: 'Bond Spread', color: 'electric-orange' },
    { symbol: 'XLE/XLF', name: 'Energy vs Financial', spread: '0.92', change: '-0.03', positive: false, type: 'Sector Spread', color: 'pulsing-cyan' },
    { symbol: 'VIX/VXN', name: 'S&P vs Nasdaq Vol', spread: '2.15', change: '+0.45', positive: true, type: 'Volatility Spread', color: 'electric-purple' },
  ];

  const floatData = [
    { symbol: 'GME', name: 'GameStop Corp.', float: '304.5M', locked: '68%', available: '97.4M', sentiment: 'Bullish', color: 'fluorescent-pink' },
    { symbol: 'AMC', name: 'AMC Entertainment', float: '516.8M', locked: '45%', available: '284.2M', sentiment: 'Neutral', color: 'fluorescent-blue' },
    { symbol: 'BBBY', name: 'Bed Bath & Beyond', float: '79.9M', locked: '72%', available: '22.4M', sentiment: 'Bearish', color: 'electric-orange' },
    { symbol: 'KOSS', name: 'Koss Corporation', float: '9.2M', locked: '85%', available: '1.4M', sentiment: 'Bullish', color: 'pulsing-cyan' },
    { symbol: 'NOK', name: 'Nokia Corporation', float: '5.6B', locked: '23%', available: '4.3B', sentiment: 'Neutral', color: 'neon-green' },
  ];

  const cryptoData = [
    { symbol: 'BTC', name: 'Bitcoin', price: '$43,250.00', change: '+2.45%', positive: true, marketCap: '$847B', color: 'fluorescent-pink' },
    { symbol: 'ETH', name: 'Ethereum', price: '$2,485.50', change: '+1.85%', positive: true, marketCap: '$298B', color: 'fluorescent-blue' },
    { symbol: 'BNB', name: 'Binance Coin', price: '$315.20', change: '-0.75%', positive: false, marketCap: '$48B', color: 'electric-orange' },
    { symbol: 'SOL', name: 'Solana', price: '$98.45', change: '+5.25%', positive: true, marketCap: '$42B', color: 'pulsing-cyan' },
    { symbol: 'ADA', name: 'Cardano', price: '$0.485', change: '-1.25%', positive: false, marketCap: '$17B', color: 'electric-purple' },
  ];

  const futuresData = [
    { symbol: 'ES', name: 'E-mini S&P 500', price: '4,785.25', change: '+12.50', positive: true, expiry: 'Mar 2024', color: 'fluorescent-pink' },
    { symbol: 'NQ', name: 'E-mini Nasdaq', price: '16,850.75', change: '-25.25', positive: false, expiry: 'Mar 2024', color: 'fluorescent-blue' },
    { symbol: 'CL', name: 'Crude Oil WTI', price: '78.42', change: '+1.25', positive: true, expiry: 'Feb 2024', color: 'electric-orange' },
    { symbol: 'GC', name: 'Gold Futures', price: '2,018.50', change: '+8.30', positive: true, expiry: 'Apr 2024', color: 'pulsing-cyan' },
    { symbol: 'ZB', name: '30-Year Treasury', price: '115.25', change: '-0.15', positive: false, expiry: 'Mar 2024', color: 'neon-green' },
  ];

  const bloombergData = [
    { symbol: 'EURUSD', price: '1.0842', change: '+0.0012', positive: true, source: 'Bloomberg', color: 'fluorescent-pink' },
    { symbol: 'GBPUSD', price: '1.2654', change: '-0.0023', positive: false, source: 'Bloomberg', color: 'fluorescent-blue' },
    { symbol: 'USDJPY', price: '149.85', change: '+0.45', positive: true, source: 'Bloomberg', color: 'electric-orange' },
    { symbol: 'GOLD', price: '2,018.50', change: '+12.30', positive: true, source: 'Bloomberg', color: 'pulsing-cyan' },
    { symbol: 'CRUDE', price: '78.42', change: '-1.25', positive: false, source: 'Bloomberg', color: 'electric-purple' },
  ];

  const reutersData = [
    { symbol: 'BTCUSD', price: '43,250', change: '+850', positive: true, source: 'Reuters', color: 'fluorescent-pink' },
    { symbol: 'ETHUSD', price: '2,485', change: '+45', positive: true, source: 'Reuters', color: 'fluorescent-blue' },
    { symbol: 'SPX', price: '4,785', change: '-15', positive: false, source: 'Reuters', color: 'electric-orange' },
    { symbol: 'NDX', price: '16,850', change: '-85', positive: false, source: 'Reuters', color: 'pulsing-cyan' },
    { symbol: 'VIX', price: '18.45', change: '+2.15', positive: true, source: 'Reuters', color: 'neon-green' },
  ];

  const topBrokers = [
    { name: 'Charles Schwab', rating: '4.8/5', features: 'Zero commissions, Advanced tools', bonus: 'Up to $3,000 bonus', color: 'fluorescent-pink' },
    { name: 'Fidelity', rating: '4.7/5', features: 'Research excellence, Mobile app', bonus: 'Up to $2,500 bonus', color: 'fluorescent-blue' },
    { name: 'Interactive Brokers', rating: '4.6/5', features: 'Global markets, Low costs', bonus: 'Up to $1,000 bonus', color: 'electric-orange' },
    { name: 'TD Ameritrade', rating: '4.5/5', features: 'Education, Platform variety', bonus: 'Up to $2,000 bonus', color: 'pulsing-cyan' },
    { name: 'E*TRADE', rating: '4.4/5', features: 'User-friendly, Options trading', bonus: 'Up to $1,500 bonus', color: 'neon-green' },
  ];

  const offshoreBrokers = [
    { name: 'IC Markets', rating: '4.9/5', features: 'ECN trading, Low spreads', regulation: 'ASIC, CySEC', color: 'fluorescent-pink' },
    { name: 'Pepperstone', rating: '4.8/5', features: 'MT4/MT5, Fast execution', regulation: 'ASIC, FCA', color: 'fluorescent-blue' },
    { name: 'XM Group', rating: '4.7/5', features: 'No deposit fees, 24/7 support', regulation: 'CySEC, IFSC', color: 'electric-orange' },
    { name: 'FXTM', rating: '4.6/5', features: 'Copy trading, Education', regulation: 'CySEC, FCA', color: 'pulsing-cyan' },
    { name: 'AvaTrade', rating: '4.5/5', features: 'Social trading, Multi-asset', regulation: 'Central Bank of Ireland', color: 'electric-purple' },
  ];

  const getAssetData = () => {
    switch (activeAssetTab) {
      case 'stocks': return stocksData;
      case 'spreads': return spreadsData;
      case 'float': return floatData;
      case 'crypto': return cryptoData;
      case 'futures': return futuresData;
      default: return stocksData;
    }
  };

  const getAssetIcon = (tab: string) => {
    switch (tab) {
      case 'stocks': return <BarChart3 className="w-4 h-4" />;
      case 'spreads': return <Activity className="w-4 h-4" />;
      case 'float': return <Zap className="w-4 h-4" />;
      case 'crypto': return <Coins className="w-4 h-4" />;
      case 'futures': return <DollarSign className="w-4 h-4" />;
      default: return <BarChart3 className="w-4 h-4" />;
    }
  };

  const renderAssetContent = () => {
    const data = getAssetData();
    
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((item, index) => (
          <div key={index} className={`bg-deep-black/70 rounded-xl p-6 hover:bg-charcoal/50 transition-all duration-300 border-2 border-${(item as any).color} shadow-neon-blue hover:shadow-neon-pink hover:animate-pulse-glow cursor-pointer`}>
            <div className="flex items-center justify-between mb-3">
              <div>
                <div className={`text-${(item as any).color} font-bold text-lg drop-shadow-lg`}>{item.symbol}</div>
                <div className="text-gray-300 text-sm">{item.name}</div>
              </div>
              <div className="text-right">
                {activeAssetTab === 'stocks' && (
                  <>
                    <div className={`text-${(item as any).color} font-bold text-lg drop-shadow-lg`}>{item.price}</div>
                    <div className={`text-sm flex items-center justify-end font-bold ${item.positive ? 'text-neon-green' : 'text-fluorescent-pink'}`}>
                      {item.positive ? <TrendingUp className="w-3 h-3 mr-1 animate-bounce" /> : <TrendingDown className="w-3 h-3 mr-1 animate-bounce" />}
                      {item.change}
                    </div>
                    <div className="text-gray-400 text-xs">Vol: {(item as any).volume}</div>
                  </>
                )}
                {activeAssetTab === 'spreads' && (
                  <>
                    <div className={`text-${(item as any).color} font-bold text-lg drop-shadow-lg`}>{(item as any).spread}</div>
                    <div className={`text-sm flex items-center justify-end font-bold ${(item as any).positive ? 'text-neon-green' : 'text-fluorescent-pink'}`}>
                      {(item as any).positive ? <TrendingUp className="w-3 h-3 mr-1 animate-bounce" /> : <TrendingDown className="w-3 h-3 mr-1 animate-bounce" />}
                      {(item as any).change}
                    </div>
                    <div className="text-gray-400 text-xs">{(item as any).type}</div>
                  </>
                )}
                {activeAssetTab === 'float' && (
                  <>
                    <div className={`text-${(item as any).color} font-bold text-lg drop-shadow-lg`}>{(item as any).float}</div>
                    <div className="text-gray-400 text-xs">Locked: {(item as any).locked}</div>
                    <div className="text-gray-400 text-xs">Available: {(item as any).available}</div>
                    <div className={`text-xs font-bold ${(item as any).sentiment === 'Bullish' ? 'text-neon-green' : (item as any).sentiment === 'Bearish' ? 'text-fluorescent-pink' : 'text-electric-yellow'}`}>
                      {(item as any).sentiment}
                    </div>
                  </>
                )}
                {activeAssetTab === 'crypto' && (
                  <>
                    <div className={`text-${(item as any).color} font-bold text-lg drop-shadow-lg`}>{item.price}</div>
                    <div className={`text-sm flex items-center justify-end font-bold ${item.positive ? 'text-neon-green' : 'text-fluorescent-pink'}`}>
                      {item.positive ? <TrendingUp className="w-3 h-3 mr-1 animate-bounce" /> : <TrendingDown className="w-3 h-3 mr-1 animate-bounce" />}
                      {item.change}
                    </div>
                    <div className="text-gray-400 text-xs">{(item as any).marketCap}</div>
                  </>
                )}
                {activeAssetTab === 'futures' && (
                  <>
                    <div className={`text-${(item as any).color} font-bold text-lg drop-shadow-lg`}>{item.price}</div>
                    <div className={`text-sm flex items-center justify-end font-bold ${(item as any).positive ? 'text-neon-green' : 'text-fluorescent-pink'}`}>
                      {(item as any).positive ? <TrendingUp className="w-3 h-3 mr-1 animate-bounce" /> : <TrendingDown className="w-3 h-3 mr-1 animate-bounce" />}
                      {(item as any).change}
                    </div>
                    <div className="text-gray-400 text-xs">{(item as any).expiry}</div>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="bg-charcoal-gradient p-8 border-t-4 border-electric-purple shadow-neon-blue">
      {/* Asset Category Tabs */}
      <div className="mb-8">
        <h2 className="text-fluorescent-pink text-2xl font-bold mb-6 flex items-center drop-shadow-lg">
          <Zap className="w-6 h-6 mr-2 animate-bounce" />
          QUANTUM MARKET ASSETS
        </h2>
        <div className="flex space-x-2 mb-8 bg-deep-black/50 rounded-xl p-2 border-2 border-fluorescent-blue shadow-neon-blue">
          {['stocks', 'spreads', 'float', 'crypto', 'futures'].map((tab, index) => (
            <button
              key={tab}
              onClick={() => setActiveAssetTab(tab)}
              className={`flex-1 px-6 py-3 rounded-lg text-sm font-bold transition-all duration-300 flex items-center justify-center space-x-2 border-2 ${
                activeAssetTab === tab
                  ? `bg-fluorescent-gradient text-deep-black border-fluorescent-pink shadow-neon-pink animate-pulse-glow`
                  : `text-${index % 2 === 0 ? 'fluorescent-pink' : 'fluorescent-blue'} hover:text-white border-${index % 2 === 0 ? 'fluorescent-pink' : 'fluorescent-blue'} hover:bg-charcoal/50 hover:shadow-neon-cyan`
              }`}
            >
              {getAssetIcon(tab)}
              <span className="uppercase">{tab}</span>
            </button>
          ))}
        </div>
        {renderAssetContent()}
      </div>

      {/* Main Tab Navigation */}
      <div className="flex space-x-2 mb-8 bg-deep-black/50 rounded-xl p-2 border-2 border-electric-orange shadow-neon-orange">
        <button
          onClick={() => setActiveMainTab('bloomberg')}
          className={`flex-1 px-6 py-4 rounded-lg text-sm font-bold transition-all duration-300 border-2 ${
            activeMainTab === 'bloomberg'
              ? 'bg-cyber-gradient text-deep-black border-pulsing-cyan shadow-neon-cyan animate-pulse-glow'
              : 'text-pulsing-cyan hover:text-white border-pulsing-cyan hover:bg-charcoal/50 hover:shadow-neon-blue'
          }`}
        >
          LIVE MARKET DATA - BLOOMBERG & REUTERS
        </button>
        <button
          onClick={() => setActiveMainTab('topbrokers')}
          className={`flex-1 px-6 py-4 rounded-lg text-sm font-bold transition-all duration-300 border-2 ${
            activeMainTab === 'topbrokers'
              ? 'bg-fluorescent-gradient text-deep-black border-fluorescent-pink shadow-neon-pink animate-pulse-glow'
              : 'text-fluorescent-pink hover:text-white border-fluorescent-pink hover:bg-charcoal/50 hover:shadow-neon-pink'
          }`}
        >
          TOP US BROKERS
        </button>
        <button
          onClick={() => setActiveMainTab('offshore')}
          className={`flex-1 px-6 py-4 rounded-lg text-sm font-bold transition-all duration-300 border-2 ${
            activeMainTab === 'offshore'
              ? 'bg-electric-orange text-deep-black border-electric-orange shadow-neon-orange animate-pulse-glow'
              : 'text-electric-orange hover:text-white border-electric-orange hover:bg-charcoal/50 hover:shadow-neon-orange'
          }`}
        >
          TRUSTED OFFSHORE BROKERS
        </button>
      </div>

      {/* Main Tab Content */}
      {activeMainTab === 'bloomberg' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h3 className="text-fluorescent-pink font-bold text-xl mb-6 flex items-center drop-shadow-lg">
              <Globe className="w-6 h-6 mr-2 animate-pulse" />
              BLOOMBERG TERMINAL DATA
            </h3>
            <div className="space-y-4">
              {bloombergData.map((item, index) => (
                <div key={index} className={`bg-deep-black/70 rounded-xl p-6 hover:bg-charcoal/50 transition-all duration-300 border-2 border-${item.color} shadow-neon-blue hover:shadow-neon-pink cursor-pointer`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className={`text-${item.color} font-bold text-lg drop-shadow-lg`}>{item.symbol}</div>
                      <div className="text-gray-400 text-sm">{item.source}</div>
                    </div>
                    <div className="text-right">
                      <div className={`text-${item.color} font-bold text-lg drop-shadow-lg`}>{item.price}</div>
                      <div className={`text-sm flex items-center justify-end font-bold ${item.positive ? 'text-neon-green' : 'text-fluorescent-pink'}`}>
                        {item.positive ? <TrendingUp className="w-3 h-3 mr-1 animate-bounce" /> : <TrendingDown className="w-3 h-3 mr-1 animate-bounce" />}
                        {item.change}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-fluorescent-blue font-bold text-xl mb-6 flex items-center drop-shadow-lg">
              <Globe className="w-6 h-6 mr-2 animate-pulse" />
              REUTERS MARKET FEED
            </h3>
            <div className="space-y-4">
              {reutersData.map((item, index) => (
                <div key={index} className={`bg-deep-black/70 rounded-xl p-6 hover:bg-charcoal/50 transition-all duration-300 border-2 border-${item.color} shadow-neon-blue hover:shadow-neon-cyan cursor-pointer`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className={`text-${item.color} font-bold text-lg drop-shadow-lg`}>{item.symbol}</div>
                      <div className="text-gray-400 text-sm">{item.source}</div>
                    </div>
                    <div className="text-right">
                      <div className={`text-${item.color} font-bold text-lg drop-shadow-lg`}>{item.price}</div>
                      <div className={`text-sm flex items-center justify-end font-bold ${item.positive ? 'text-neon-green' : 'text-fluorescent-pink'}`}>
                        {item.positive ? <TrendingUp className="w-3 h-3 mr-1 animate-bounce" /> : <TrendingDown className="w-3 h-3 mr-1 animate-bounce" />}
                        {item.change}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeMainTab === 'topbrokers' && (
        <div>
          <h3 className="text-fluorescent-pink font-bold text-xl mb-6 flex items-center drop-shadow-lg">
            <Award className="w-6 h-6 mr-2 animate-bounce" />
            TOP RATED US BROKERS
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {topBrokers.map((broker, index) => (
              <div key={index} className={`bg-deep-black/70 rounded-xl p-6 hover:bg-charcoal/50 transition-all duration-300 border-2 border-${broker.color} shadow-neon-blue hover:shadow-neon-pink cursor-pointer hover:animate-pulse-glow`}>
                <div className="flex items-center justify-between mb-3">
                  <h4 className={`text-${broker.color} font-bold text-lg drop-shadow-lg`}>{broker.name}</h4>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-electric-yellow mr-1 animate-pulse" />
                    <span className={`text-${broker.color} text-sm font-bold`}>{broker.rating}</span>
                  </div>
                </div>
                <p className="text-gray-300 text-sm mb-3 font-semibold">{broker.features}</p>
                <div className="text-neon-green text-sm font-bold">{broker.bonus}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeMainTab === 'offshore' && (
        <div>
          <h3 className="text-electric-orange font-bold text-xl mb-6 flex items-center drop-shadow-lg">
            <Shield className="w-6 h-6 mr-2 animate-bounce" />
            TRUSTED OFFSHORE BROKERS
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {offshoreBrokers.map((broker, index) => (
              <div key={index} className={`bg-deep-black/70 rounded-xl p-6 hover:bg-charcoal/50 transition-all duration-300 border-2 border-${broker.color} shadow-neon-blue hover:shadow-neon-orange cursor-pointer hover:animate-pulse-glow`}>
                <div className="flex items-center justify-between mb-3">
                  <h4 className={`text-${broker.color} font-bold text-lg drop-shadow-lg`}>{broker.name}</h4>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-electric-yellow mr-1 animate-pulse" />
                    <span className={`text-${broker.color} text-sm font-bold`}>{broker.rating}</span>
                  </div>
                </div>
                <p className="text-gray-300 text-sm mb-3 font-semibold">{broker.features}</p>
                <div className="text-pulsing-cyan text-sm flex items-center">
                  <Shield className="w-3 h-3 mr-1" />
                  <span className="font-bold">{broker.regulation}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MarketDataTabs;