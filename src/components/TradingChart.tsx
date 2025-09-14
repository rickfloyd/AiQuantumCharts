import React from 'react';
import { BarChart3, Zap, Activity, TrendingUp } from 'lucide-react';

const TradingChart: React.FC = () => {
  return (
    <div className="w-full h-full min-h-[600px] bg-charcoal-gradient rounded-xl flex items-center justify-center border-4 border-fluorescent-pink shadow-neon-pink m-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-20 h-20 bg-fluorescent-blue rounded-full animate-pulse"></div>
        <div className="absolute top-20 right-20 w-16 h-16 bg-electric-orange rounded-full animate-bounce-glow"></div>
        <div className="absolute bottom-20 left-20 w-24 h-24 bg-pulsing-cyan rounded-full animate-cyber-pulse"></div>
        <div className="absolute bottom-10 right-10 w-18 h-18 bg-neon-green rounded-full animate-pulse"></div>
      </div>
      
      <div className="text-center z-10 p-8 bg-deep-black/50 rounded-xl border-2 border-electric-purple shadow-neon-blue">
        <div className="flex items-center justify-center mb-6">
          <div className="relative">
            <BarChart3 className="w-20 h-20 text-fluorescent-pink animate-pulse-glow" />
            <Zap className="w-8 h-8 text-electric-yellow absolute -top-2 -right-2 animate-bounce" />
          </div>
        </div>
        
        <div className="mb-8 text-center">
          <h2 className="text-fluorescent-pink text-4xl font-bold uppercase tracking-wider drop-shadow-lg animate-pulse-glow">
            get everything the other guys have at half the price
          </h2>
        </div>
        
        <h3 className="text-fluorescent-pink text-2xl font-bold mb-4 drop-shadow-lg flex items-center justify-center">
          <Activity className="w-6 h-6 mr-2 animate-pulse" />
          QUANTUM CHART AREA
        </h3>
        
        <p className="text-pulsing-cyan text-lg font-semibold mb-4">
          Advanced AI Trading Visualization
        </p>
        
        <div className="flex items-center justify-center space-x-4 text-sm">
          <div className="flex items-center text-neon-green font-bold">
            <TrendingUp className="w-4 h-4 mr-1 animate-bounce" />
            Real-time Data
          </div>
          <div className="w-2 h-2 bg-electric-orange rounded-full animate-pulse"></div>
          <div className="text-electric-yellow font-bold">
            Fluorescent Indicators
          </div>
          <div className="w-2 h-2 bg-fluorescent-blue rounded-full animate-pulse"></div>
          <div className="text-electric-purple font-bold">
            AI Analysis
          </div>
        </div>
        
        <div className="mt-6 p-4 bg-charcoal/50 rounded-lg border border-fluorescent-blue">
          <div className="text-fluorescent-pink text-xs font-bold mb-2">CHART FEATURES:</div>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="text-fluorescent-blue">• Candlestick Patterns</div>
            <div className="text-electric-orange">• Volume Analysis</div>
            <div className="text-pulsing-cyan">• Technical Indicators</div>
            <div className="text-neon-green">• AI Predictions</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TradingChart;