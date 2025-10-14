import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import MarketSummary from './components/MarketSummary';
// Removed unused imports: TradingInterface, GridDashboard, Sidebar
import MarketDataTabs from './components/MarketDataTabs';
import EducationalImpact from './components/EducationalImpact';
import AITradingUI from './components/AITradingUI';
import ChatBotPanel from './components/ChatBotPanel';
import ComingSoon from './components/ComingSoon';

// Enhanced Feature Summary Component
const FeatureSummary = () => (
  <div className="fixed bottom-4 left-4 bg-gray-900 border border-cyan-400 rounded-lg p-4 max-w-sm z-50">
    <h3 className="text-cyan-400 font-bold mb-2">🚀 AI-Powered Trading Platform</h3>
    <div className="text-xs text-gray-300 space-y-1">
      <div className="flex items-center"><span className="text-green-400">✅</span> AI Price Prediction Engine</div>
      <div className="flex items-center"><span className="text-green-400">✅</span> ML Pattern Recognition</div>
      <div className="flex items-center"><span className="text-green-400">✅</span> Sentiment Analysis AI</div>
      <div className="flex items-center"><span className="text-green-400">✅</span> Smart Risk Management</div>
      <div className="flex items-center"><span className="text-green-400">✅</span> Automated Trading Signals</div>
      <div className="flex items-center"><span className="text-green-400">✅</span> Neural Networks & LSTM</div>
      <div className="flex items-center"><span className="text-green-400">✅</span> Advanced Drawing Tools</div>
      <div className="flex items-center"><span className="text-green-400">✅</span> Real-Time Market Data</div>
      <div className="flex items-center"><span className="text-green-400">✅</span> Portfolio Management</div>
      <div className="flex items-center"><span className="text-green-400">✅</span> Custom Scripting Engine</div>
    </div>
    <div className="mt-3 text-xs text-cyan-400 font-bold">
      🤖 Revolutionary AI Trading Platform!
    </div>
  </div>
);

function App() {
  const [currentSymbol] = useState('AAPL');

  return (
    <div className="min-h-screen bg-charcoal-gradient text-fluorescent-pink">
      <Header />
      
      <Routes>
        <Route path="/test" element={<div className="text-white">Router OK</div>} />
        
        {/* Investor Portal Routes */}
        <Route path="/investor/portfolio" element={
          <ComingSoon 
            title="PORTFOLIO ANALYTICS" 
            description="Advanced portfolio tracking with real-time P&L, risk metrics, and performance attribution."
            icon="📊"
            features={["Real-time Portfolio Tracking", "P&L Analytics", "Risk Metrics", "Performance Attribution", "Asset Allocation", "Rebalancing Tools"]}
          />
        } />
        
        <Route path="/investor/research" element={
          <ComingSoon 
            title="RESEARCH HUB" 
            description="Institutional-grade research, analyst reports, and market intelligence tools."
            icon="🔍"
            features={["Analyst Reports", "Market Intelligence", "Company Research", "Sector Analysis", "Economic Indicators", "News Sentiment"]}
          />
        } />
        
        <Route path="/investor/reports" element={
          <ComingSoon 
            title="CUSTOM REPORTS" 
            description="Generate professional reports for clients, stakeholders, and regulatory compliance."
            icon="📋"
            features={["Client Reports", "Performance Reports", "Risk Reports", "Compliance Reports", "Custom Templates", "Automated Generation"]}
          />
        } />
        
        <Route path="/investor/risk" element={
          <ComingSoon 
            title="RISK MANAGEMENT" 
            description="Advanced risk analytics with VaR, stress testing, and correlation analysis."
            icon="📈"
            features={["Value at Risk (VaR)", "Stress Testing", "Correlation Analysis", "Exposure Limits", "Risk Monitoring", "Scenario Analysis"]}
          />
        } />
        
        <Route path="/investor/insights" element={
          <ComingSoon 
            title="AI INSIGHTS" 
            description="Machine learning powered investment insights and automated strategy recommendations."
            icon="🤖"
            features={["ML Predictions", "Strategy Recommendations", "Pattern Recognition", "Sentiment Analysis", "Market Signals", "Automated Alerts"]}
          />
        } />
        
        <Route path="/investor/global" element={
          <ComingSoon 
            title="GLOBAL MARKETS" 
            description="Multi-asset class trading across global markets with unified position management."
            icon="🌐"
            features={["Multi-Asset Trading", "Global Markets", "Position Management", "Currency Conversion", "Market Hours", "Cross-Border Compliance"]}
          />
        } />
        
        <Route path="/" element={
          <>
            <div className="container mx-auto px-4">
              <EducationalImpact />
            </div>
            <MarketSummary />
            {/* Main Responsive Trading Grid */}
            <div className="w-full flex flex-col gap-4 py-6">
              <div className="flex flex-1 min-h-[60vh] w-full gap-4">
                {/* Left: AI Insights */}
                <aside className="hidden md:flex flex-col w-64 bg-gray-900/80 rounded-lg p-4 border-2 border-pink-500 shadow-lg animate-pulse">
                  <h2 className="text-xl font-bold text-pink-400 mb-2">🤖 AI Insights</h2>
                  <ul className="text-sm space-y-2">
                    <li>• <span className="text-pink-300">AI Trade Signals</span></li>
                    <li>• <span className="text-pink-300">Pattern Recognition</span></li>
                    <li>• <span className="text-pink-300">Sentiment Analysis</span></li>
                    <li>• <span className="text-pink-300">Risk Alerts</span></li>
                    <li>• <span className="text-pink-300">News & Events</span></li>
                  </ul>
                  <div className="mt-4 text-xs text-pink-200">(Live AI widgets coming soon)</div>
                  <div className="mt-4">
                    <ChatBotPanel symbol={currentSymbol} />
                  </div>
                </aside>
                {/* Center: Main Chart */}
                <section className="flex-1 flex flex-col items-center justify-center min-w-0">
                  <div className="w-full h-[48vh] md:h-[60vh] bg-gray-950 rounded-lg border-2 border-cyan-400 shadow-xl flex items-center justify-center">
                    {/* EnhancedChart is your main trading chart */}
                    {/* TODO: Replace with <EnhancedChart /> if not already imported */}
                    <AITradingUI symbol={currentSymbol} />
                  </div>
                  {/* Chart controls */}
                  <div className="flex gap-2 mt-4 justify-center">
                    <button className="px-3 py-1 rounded bg-cyan-700 text-white hover:bg-cyan-500">1m</button>
                    <button className="px-3 py-1 rounded bg-cyan-700 text-white hover:bg-cyan-500">5m</button>
                    <button className="px-3 py-1 rounded bg-cyan-700 text-white hover:bg-cyan-500">1h</button>
                    <button className="px-3 py-1 rounded bg-cyan-700 text-white hover:bg-cyan-500">4h</button>
                    <button className="px-3 py-1 rounded bg-cyan-700 text-white hover:bg-cyan-500">1D</button>
                    <button className="px-3 py-1 rounded bg-pink-600 text-white hover:bg-pink-400">Candles</button>
                    <button className="px-3 py-1 rounded bg-pink-600 text-white hover:bg-pink-400">Line</button>
                    <button className="px-3 py-1 rounded bg-pink-600 text-white hover:bg-pink-400">Bar</button>
                    <button className="px-3 py-1 rounded bg-purple-700 text-white hover:bg-purple-500">Indicators</button>
                    <button className="px-3 py-1 rounded bg-yellow-600 text-white hover:bg-yellow-400">Draw</button>
                  </div>
                </section>
                {/* Right: Order Entry */}
                <aside className="hidden md:flex flex-col w-72 bg-gray-900/80 rounded-lg p-4 border-2 border-cyan-400 shadow-lg animate-pulse">
                  <h2 className="text-xl font-bold text-cyan-300 mb-2">📝 Order Entry</h2>
                  <form className="flex flex-col gap-2">
                    <label htmlFor="orderType" className="sr-only">Order Type</label>
                    <select id="orderType" className="bg-gray-800 border border-cyan-500 rounded px-2 py-1 text-white" aria-label="Order Type">
                      <option>Market</option>
                      <option>Limit</option>
                      <option>Stop</option>
                    </select>
                    <input type="number" placeholder="Amount" className="bg-gray-800 border border-cyan-500 rounded px-2 py-1 text-white" />
                    <input type="number" placeholder="Price (if limit)" className="bg-gray-800 border border-cyan-500 rounded px-2 py-1 text-white" />
                    <div className="flex gap-2 mt-2">
                      <button className="flex-1 bg-green-600 hover:bg-green-500 text-white rounded py-1">Buy</button>
                      <button className="flex-1 bg-red-600 hover:bg-red-500 text-white rounded py-1">Sell</button>
                    </div>
                  </form>
                  <div className="mt-4 text-xs text-cyan-200">(Order panel: connect to backend for live trading)</div>
                </aside>
              </div>
              {/* Bottom: Portfolio & Performance */}
              <div className="w-full mt-4 bg-gray-900/80 rounded-lg p-4 border-2 border-purple-500 shadow-lg flex flex-col md:flex-row gap-4 animate-pulse">
                <div className="flex-1">
                  <h2 className="text-lg font-bold text-purple-300 mb-2">💼 Portfolio</h2>
                  <div className="text-sm text-purple-200">(Holdings, P&L, risk metrics, trade history coming soon)</div>
                </div>
                <div className="flex-1">
                  <h2 className="text-lg font-bold text-purple-300 mb-2">📊 Performance</h2>
                  <div className="text-sm text-purple-200">(Charts, analytics, and performance stats coming soon)</div>
                </div>
              </div>
            </div>
            <MarketDataTabs />
          </>
        } />
      </Routes>
      
      {/* Feature Summary */}
      <FeatureSummary />
      
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