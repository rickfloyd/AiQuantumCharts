import React, { useState } from 'react';
import { TrendingUp, TrendingDown, RefreshCw, Eye, EyeOff, Zap, Activity } from 'lucide-react';
import { useMarketData } from '../hooks/useMarketData';

const MarketSummary = () => {
  const [hiddenIndices, setHiddenIndices] = useState<number[]>([]);
  
  // Use real market data
  const { data: marketData, loading, refreshData } = useMarketData([
    'SPY', 'QQQ', 'DIA', 'IWM'  // ETFs representing major indices
  ]);

  // Map ETF symbols to index names
  const indexNames = {
    'SPY': 'S&P 500',
    'QQQ': 'Nasdaq 100', 
    'DIA': 'Dow Jones',
    'IWM': 'Russell 2000'
  };

  const handleRefresh = () => {
    refreshData();
  };

  const handleMarketClick = (symbol: string) => {
    console.log(`Viewing details for ${symbol}`);
  };

  const handleTabClick = (tab: string) => {
    console.log(`Switched to ${tab} tab`);
  };

  const toggleVisibility = (index: number) => {
    setHiddenIndices(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  return (
    <div className="bg-charcoal-gradient px-6 py-6 border-b-2 border-electric-purple shadow-neon-blue">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <h2 className="text-fluorescent-pink text-xl font-bold drop-shadow-lg flex items-center">
            <Activity className="w-6 h-6 mr-2 animate-pulse" />
            {'Market Summary >'}
          </h2>
          <button
            onClick={handleRefresh}
            className={`text-pulsing-cyan hover:text-electric-yellow transition-all duration-300 p-2 rounded-lg hover:shadow-neon-cyan hover:bg-charcoal/50 ${loading ? 'animate-spin' : 'hover:animate-bounce-glow'}`}
            title="Refresh market data"
          >
            <RefreshCw className="w-5 h-5" />
          </button>
        </div>
        <div className="flex items-center space-x-6 text-sm">
          {['Stocks', 'Spreads', 'Float', 'Crypto', 'Futures'].map((tab, index) => (
            <button 
              key={tab}
              onClick={() => handleTabClick(tab)}
              className={`font-bold transition-all duration-300 px-4 py-2 rounded-lg hover:bg-charcoal/50 ${
                index % 2 === 0 
                  ? 'text-fluorescent-blue hover:text-pulsing-cyan hover:shadow-neon-blue' 
                  : 'text-electric-orange hover:text-electric-yellow hover:shadow-neon-orange'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {marketData.map((item, index) => (
          <div key={index} className={`flex items-center space-x-4 p-4 rounded-xl bg-deep-black/50 border-2 border-${item.color} shadow-neon-blue hover:shadow-neon-pink hover:animate-pulse-glow transition-all duration-300 ${hiddenIndices.includes(index) ? 'opacity-30' : ''}`}>
            <div className={`w-16 h-16 bg-${item.color} rounded-full flex items-center justify-center text-white font-bold text-sm cursor-pointer hover:scale-110 transition-all duration-300 animate-cyber-pulse`}>
              {item.symbol === 'SPY' ? (
                <Zap className="w-8 h-8" />
              ) : item.symbol === 'QQQ' ? (
                <Activity className="w-8 h-8" />
              ) : item.symbol === 'DIA' ? (
                <TrendingUp className="w-8 h-8" />
              ) : (
                <TrendingDown className="w-8 h-8" />
              )}
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <button 
                  onClick={() => handleMarketClick(item.symbol)}
                  className={`text-${item.color} font-bold text-sm hover:text-white transition-all duration-300 drop-shadow-lg`}
                >
                  {indexNames[item.symbol as keyof typeof indexNames] || item.symbol}
                </button>
                <button
                  onClick={() => toggleVisibility(index)}
                  className="text-gray-400 hover:text-fluorescent-pink transition-all duration-300 hover:scale-110"
                  title={hiddenIndices.includes(index) ? 'Show' : 'Hide'}
                >
                  {hiddenIndices.includes(index) ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              <div className={`text-${item.color} text-xl font-bold drop-shadow-lg mb-1`}>{item.price}</div>
              <div className={`text-sm flex items-center font-bold ${item.positive ? 'text-neon-green' : 'text-fluorescent-pink'}`}>
                {item.positive ? <TrendingUp className="w-4 h-4 mr-1 animate-bounce" /> : <TrendingDown className="w-4 h-4 mr-1 animate-bounce" />}
                {item.change}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MarketSummary;