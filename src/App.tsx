import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import MarketSummary from './components/MarketSummary';
import TradingInterface from './components/TradingInterface';
import TradingChart from './components/TradingChart';
import Sidebar from './components/Sidebar';
import MarketDataTabs from './components/MarketDataTabs';

function App() {
  return (
    <div className="min-h-screen bg-charcoal-gradient text-fluorescent-pink">
      <Header />
      
      <Routes>
        <Route path="/test" element={<div style={{color:"#fff"}}>Router OK</div>} />
        <Route path="/" element={
          <>
            <MarketSummary />
            <TradingInterface />
            
            <div className="flex">
              <div className="flex-1">
                <TradingChart />
              </div>
              <Sidebar />
            </div>
            
            <MarketDataTabs />
          </>
        } />
      </Routes>
      
      {/* Footer */}
      <footer className="bg-charcoal-gradient border-t-4 border-electric-purple shadow-neon-blue p-6 text-center">
        <div className="text-fluorescent-pink text-sm font-bold drop-shadow-lg">
          © 2024 AI QUANTUM CHARTS. Advanced AI Trading Platform Powered by Quantum Algorithms.
        </div>
        <div className="text-pulsing-cyan text-xs mt-2 font-semibold">
          Real-time Market Data • Fluorescent Analytics • Quantum Intelligence
        </div>
      </footer>
    </div>
  );
}

export default App;