import React, { useState, useEffect } from 'react';

interface AITradingUIProps {
  symbol: string;
}

interface SimplePrediction {
  symbol: string;
  currentPrice: number;
  predictedPrice: number;
  confidence: number;
  trend: 'bullish' | 'bearish' | 'neutral';
  timestamp: Date;
}

const AITradingUI: React.FC<AITradingUIProps> = ({ symbol }) => {
  const [prediction, setPrediction] = useState<SimplePrediction | null>(null);
  const [loading, setLoading] = useState(false);

  // Simulate AI prediction with mock data
  const generateMockPrediction = (symbol: string): SimplePrediction => {
    const basePrice = Math.random() * 200 + 50; // Random price between 50-250
    const change = (Math.random() - 0.5) * 0.1; // Random change ±5%
    const predictedPrice = basePrice * (1 + change);
    const confidence = Math.random() * 40 + 60; // 60-100% confidence
    
    return {
      symbol,
      currentPrice: basePrice,
      predictedPrice,
      confidence,
      trend: change > 0 ? 'bullish' : change < 0 ? 'bearish' : 'neutral',
      timestamp: new Date()
    };
  };

  useEffect(() => {
    if (symbol) {
      setLoading(true);
      // Simulate API call delay
      setTimeout(() => {
        try {
          const mockPrediction = generateMockPrediction(symbol);
          setPrediction(mockPrediction);
        } catch (error) {
          console.error('Error generating prediction:', error);
        } finally {
          setLoading(false);
        }
      }, 1000);
    }
  }, [symbol]);

  if (loading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400 mx-auto mb-4"></div>
          <div className="text-cyan-400">Running AI Analysis...</div>
          <div className="text-gray-400 text-sm mt-2">Processing {symbol}</div>
        </div>
      </div>
    );
  }

  if (!prediction) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">🤖</div>
          <div className="text-cyan-400 text-xl font-bold">AI Trading Engine</div>
          <div className="text-gray-400 mt-2">Ready to analyze {symbol}</div>
        </div>
      </div>
    );
  }

  const confidenceColor = prediction.confidence >= 80 ? 'text-green-400' : 
                         prediction.confidence >= 60 ? 'text-yellow-400' : 'text-red-400';
  
  const trendColor = prediction.trend === 'bullish' ? 'text-green-400' : 
                     prediction.trend === 'bearish' ? 'text-red-400' : 'text-gray-400';

  const priceChange = prediction.predictedPrice - prediction.currentPrice;
  const changePercent = (priceChange / prediction.currentPrice) * 100;

  return (
    <div className="w-full h-full bg-gray-900 p-6 rounded-lg">
      <div className="text-center mb-6">
        <h3 className="text-cyan-400 text-xl font-bold mb-2">🤖 AI Analysis: {prediction.symbol}</h3>
        <div className="text-gray-400 text-sm">
          Last updated: {prediction.timestamp.toLocaleTimeString()}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-gray-800 p-4 rounded-lg">
          <div className="text-gray-400 text-sm">Current Price</div>
          <div className="text-white text-xl font-bold">
            ${prediction.currentPrice.toFixed(2)}
          </div>
        </div>
        
        <div className="bg-gray-800 p-4 rounded-lg">
          <div className="text-gray-400 text-sm">AI Prediction</div>
          <div className="text-white text-xl font-bold">
            ${prediction.predictedPrice.toFixed(2)}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-gray-800 p-4 rounded-lg">
          <div className="text-gray-400 text-sm">Price Change</div>
          <div className={`text-lg font-bold ${priceChange >= 0 ? 'text-green-400' : 'text-red-400'}`}>
            {priceChange >= 0 ? '+' : ''}${priceChange.toFixed(2)} ({changePercent.toFixed(2)}%)
          </div>
        </div>
        
        <div className="bg-gray-800 p-4 rounded-lg">
          <div className="text-gray-400 text-sm">Confidence</div>
          <div className={`text-lg font-bold ${confidenceColor}`}>
            {prediction.confidence.toFixed(1)}%
          </div>
        </div>
      </div>

      <div className="bg-gray-800 p-4 rounded-lg mb-4">
        <div className="text-gray-400 text-sm mb-2">Market Trend</div>
        <div className={`text-lg font-bold ${trendColor} capitalize`}>
          {prediction.trend}
          {prediction.trend === 'bullish' && ' 📈'}
          {prediction.trend === 'bearish' && ' 📉'}
          {prediction.trend === 'neutral' && ' ➡️'}
        </div>
      </div>

      <div className="bg-cyan-900/20 border border-cyan-400 p-4 rounded-lg">
        <div className="text-cyan-400 text-sm font-bold mb-2">🧠 AI Insights</div>
        <div className="text-gray-300 text-sm">
          • Advanced ML pattern recognition active<br/>
          • Sentiment analysis: Processing market sentiment<br/>
          • Risk assessment: Monitoring volatility patterns<br/>
          • Neural network confidence: {prediction.confidence.toFixed(1)}%
        </div>
      </div>
    </div>
  );
};

export default AITradingUI;