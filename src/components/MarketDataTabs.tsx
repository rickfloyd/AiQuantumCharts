import { TrendingUp, TrendingDown } from 'lucide-react';

const MarketDataTabs = () => {
  const stocksData = [
    { symbol: 'AAPL', name: 'Apple Inc.', price: '$231.31', change: '+1.24%', positive: true },
    { symbol: 'GOOGL', name: 'Alphabet Inc.', price: '$2,847.42', change: '-0.85%', positive: false },
    { symbol: 'MSFT', name: 'Microsoft Corp.', price: '$415.85', change: '+2.10%', positive: true },
    { symbol: 'NASDAQ', name: 'Nasdaq 100', price: '$382.36', change: '-0.45%', positive: false },
    { symbol: 'DOW', name: 'Dow Jones', price: '$367.43', change: '+1.37%', positive: true },
    { symbol: 'RUSSELL', name: 'Russell 2000', price: '$195.98', change: '-0.82%', positive: false },
  ];

  return (
    <div className="bg-deep-black p-8 border-t border-pulsing-cyan">
      <h2 className="text-fluorescent-pink text-2xl font-bold mb-6 animate-cyber-pulse">🚀 QUANTUM MARKET DATA</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stocksData.map((item, index) => (
          <div key={index} className="bg-deep-black rounded-xl p-6 border-2 border-pulsing-cyan shadow-neon-cyan hover:border-fluorescent-pink hover:shadow-neon-pink transition-all duration-300 animate-pulse-glow">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-fluorescent-blue font-bold text-lg animate-cyber-pulse">{item.symbol}</div>
                <div className="text-pulsing-cyan text-sm font-semibold">{item.name}</div>
              </div>
              <div className="text-right">
                <div className="text-electric-yellow font-bold text-lg animate-pulse-glow">{item.price}</div>
                <div className={`text-sm flex items-center justify-end font-bold ${item.positive ? 'text-neon-green animate-bounce-glow' : 'text-hot-pink animate-cyber-pulse'}`}>
                  {item.positive ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
                  {item.change}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MarketDataTabs;
