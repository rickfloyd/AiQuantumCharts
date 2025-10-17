
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import Header from "./components/Header";
import MarketSummary from "./components/MarketSummary";
import MarketDataTabs from "./components/MarketDataTabs";
import Education from "./components/Education";
import Transparency from "./components/Transparency";
import Impact from "./components/Impact";

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error("ErrorBoundary caught:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="bg-deep-black min-h-screen flex flex-col items-center justify-center text-fluorescent-pink text-center p-10">
          <h1 className="text-5xl font-bold animate-bounce-glow">Something went wrong</h1>
          <p className="mt-4 text-xl text-pulsing-cyan">The platform hit a glitch try refreshing or check the console.</p>
        </div>
      );
    }
    return this.props.children;
  }
}

const PlatformStatus: React.FC = () => (
  <div className="fixed top-4 right-4 bg-gray-900 border border-neon-green rounded-lg p-3 text-sm z-50 shadow-neon-green">
    <div className="flex items-center space-x-2">
      <div className="w-2 h-2 bg-neon-green rounded-full animate-pulse"></div>
      <span className="text-neon-green font-bold">Platform Status: Online</span>
    </div>
    <div className="text-gray-300 text-xs mt-1">
      AI Models: Active | Market Data: Live | APIs: Connected
    </div>
  </div>
);

const Sidebar: React.FC = () => (
  <div className="w-80 bg-deep-black border-r border-pulsing-cyan p-6 min-h-screen">
    <h3 className="text-fluorescent-pink font-bold text-lg mb-6 animate-cyber-pulse">AI Trading Platform</h3>
    <ul className="space-y-3 text-sm">
      <li className="flex items-center text-pulsing-cyan"><div className="w-3 h-3 bg-neon-green rounded-full mr-3"></div>AI Price Prediction Engine</li>
      <li className="flex items-center text-pulsing-cyan"><div className="w-3 h-3 bg-neon-green rounded-full mr-3"></div>ML Pattern Recognition</li>
      <li className="flex items-center text-pulsing-cyan"><div className="w-3 h-3 bg-neon-green rounded-full mr-3"></div>Sentiment Analysis AI</li>
      <li className="flex items-center text-pulsing-cyan"><div className="w-3 h-3 bg-neon-green rounded-full mr-3"></div>Smart Risk Management</li>
      <li className="flex items-center text-pulsing-cyan"><div className="w-3 h-3 bg-neon-green rounded-full mr-3"></div>Automated Trading Signals</li>
      <li className="flex items-center text-pulsing-cyan"><div className="w-3 h-3 bg-neon-green rounded-full mr-3"></div>Neural Networks & LSTM</li>
      <li className="flex items-center text-pulsing-cyan"><div className="w-3 h-3 bg-neon-green rounded-full mr-3"></div>Advanced Drawing Tools</li>
      <li className="flex items-center text-pulsing-cyan"><div className="w-3 h-3 bg-neon-green rounded-full mr-3"></div>Real-Time Market Data</li>
      <li className="flex items-center text-pulsing-cyan"><div className="w-3 h-3 bg-neon-green rounded-full mr-3"></div>Portfolio Management</li>
      <li className="flex items-center text-pulsing-cyan"><div className="w-3 h-3 bg-neon-green rounded-full mr-3"></div>Custom Scripting Engine</li>
    </ul>
    <div className="mt-8 p-4 bg-fluorescent-blue/10 border border-fluorescent-blue rounded-lg">
      <p className="text-fluorescent-blue font-bold text-sm mb-2 animate-cyber-pulse">Revolutionary AI Trading Platform!</p>
      <p className="text-xs text-pulsing-cyan">Empowering traders with quantum-level insights and automation.</p>
    </div>
  </div>
);


function App() {
  return (
    <Router>
      <div className="App bg-deep-black min-h-screen text-white">
        <ErrorBoundary>
          <PlatformStatus />
          <div className="flex">
            <Sidebar />
            <main className="flex-1">
              <div className="w-full max-w-7xl mx-auto px-2 sm:px-4 md:px-8 py-2 md:py-6">
                <Header />
                <MarketSummary />
                <MarketDataTabs />
                <Education />
                <Transparency />
                <Impact />
                <Routes>
                  <Route path="/trading" element={<div className="p-4 md:p-10"><h2 className="text-3xl md:text-4xl font-bold text-fluorescent-pink mb-4">Trading Dashboard</h2><p className="text-gray-300 text-base md:text-lg">Advanced trading interface coming soon.</p></div>} />
                  <Route path="/education" element={<div className="p-4 md:p-10"><h2 className="text-3xl md:text-4xl font-bold text-neon-green mb-4">Education Center</h2><p className="text-gray-300 text-base md:text-lg">Explore curated courses gamified learning and interactive trading lessons.</p></div>} />
                  <Route path="/community" element={<div className="p-4 md:p-10"><h2 className="text-3xl md:text-4xl font-bold text-fluorescent-blue mb-4">Quantum Community Hub</h2><p className="text-gray-300 text-base md:text-lg">Connect with traders share strategies and learn from innovators.</p></div>} />
                  <Route path="/portfolio" element={<div className="p-4 md:p-10"><h2 className="text-3xl md:text-4xl font-bold text-electric-yellow mb-4">Portfolio Manager</h2><p className="text-gray-300 text-base md:text-lg">Manage your trades track performance and optimize your strategy.</p></div>} />
                  <Route path="/options" element={<div className="p-4 md:p-10"><h2 className="text-3xl md:text-4xl font-bold text-bright-magenta mb-4">Options Trading Tools</h2><p className="text-gray-300 text-base md:text-lg">Cutting-edge analytics and tools for professional options traders.</p></div>} />
                  <Route path="/commodities" element={<div className="p-4 md:p-10"><h2 className="text-3xl md:text-4xl font-bold text-neon-orange mb-4">Commodities Dashboard</h2><p className="text-gray-300 text-base md:text-lg">Gold oil and global commodity analytics with real-time market insight.</p></div>} />
                  <Route path="/news" element={<div className="p-4 md:p-10"><h2 className="text-3xl md:text-4xl font-bold text-pulsing-cyan mb-4">Market News & Analysis</h2><p className="text-gray-300 text-base md:text-lg">Real-time financial news sentiment breakdown and AI-powered insights.</p></div>} />
                  <Route path="/sports" element={<div className="p-4 md:p-10"><h2 className="text-3xl md:text-4xl font-bold text-electric-purple mb-4">Sports Analytics</h2><p className="text-gray-300 text-base md:text-lg">Real-time performance analytics and predictive modeling for global sports.</p></div>} />
                  <Route path="/sports-betting" element={<div className="p-4 md:p-10"><h2 className="text-3xl md:text-4xl font-bold text-hot-pink mb-4">Sports Betting AI</h2><p className="text-gray-300 text-base md:text-lg">AI-powered betting insights probability modeling and real-time odds.</p></div>} />
                  <Route path="/calendar" element={<div className="p-4 md:p-10"><h2 className="text-3xl md:text-4xl font-bold text-laser-red mb-4">Economic Calendar</h2><p className="text-gray-300 text-base md:text-lg">Stay ahead of key economic events earnings and macro data that move the markets.</p></div>} />
                  <Route path="/alerts" element={<div className="p-4 md:p-10"><h2 className="text-3xl md:text-4xl font-bold text-volt-green mb-4">Smart Alerts</h2><p className="text-gray-300 text-base md:text-lg">Real-time price volume and sentiment alerts tailored to your strategy.</p></div>} />
                  <Route path="/assistant" element={<div className="p-4 md:p-10"><h2 className="text-3xl md:text-4xl font-bold text-neon-purple mb-4">AI Trading Assistant</h2><p className="text-gray-300 text-base md:text-lg">Your personal AI co-pilot for trade execution analysis and strategy building.</p></div>} />
                  <Route path="/qubit" element={<div className="p-4 md:p-10"><h2 className="text-3xl md:text-4xl font-bold text-fluorescent-pink mb-4">Qubit Script Editor</h2><p className="text-gray-300 text-base md:text-lg">Build customize and deploy trading scripts using next-gen quantum logic.</p></div>} />
                  <Route path="/transparency" element={<div className="p-4 md:p-10"><h2 className="text-3xl md:text-4xl font-bold text-electric-yellow mb-4">Transparency Portal</h2><p className="text-gray-300 text-base md:text-lg">See exactly how every dollar is allocated.</p></div>} />
                  <Route path="/impact" element={<div className="p-4 md:p-10"><h2 className="text-3xl md:text-4xl font-bold text-neon-green mb-4">Social Impact</h2><p className="text-gray-300 text-base md:text-lg">Empowering underserved communities and creating pathways into financial literacy.</p></div>} />
                  <Route path="*" element={<div className="h-screen flex flex-col items-center justify-center bg-deep-black text-center"><h1 className="text-6xl text-laser-red font-bold mb-4">404</h1><p className="text-gray-300 text-xl mb-6">Page not found but the future is still here</p><a href="/" className="px-6 py-3 bg-fluorescent-pink text-black font-bold rounded-lg hover:scale-105 transition-transform">Return to Dashboard</a></div>} />
                </Routes>
              </div>
            </main>
          </div>
          <footer className="bg-charcoal border-t border-pulsing-cyan text-center py-4 text-gray-400 text-sm">
            <div className="space-y-1">
              <p>AI Quantum Charts v2.0 Rebuilt from the ground up for speed and power</p>
              <p>Built with love to empower traders creators and innovators worldwide</p>
            </div>
          </footer>
        </ErrorBoundary>
      </div>
    </Router>
  );
}

export default App;
