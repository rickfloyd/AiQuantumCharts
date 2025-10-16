import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import MarketDataTabs from './components/MarketDataTabs';
import Education from './components/Education';
import Transparency from './components/Transparency';
import Impact from './components/Impact';
import ComingSoon from './components/ComingSoon';
import QuantumCommunityHub from './components/QuantumCommunityHub';
import CommunityWelcome from './components/CommunityWelcome';
import UserProfile from './components/UserProfile';
import ErrorBoundary from './components/ErrorBoundary';
import GridDashboard from './components/GridDashboard';
import './components/HighEnergyAnimations.css';

function App() {

  return (
    <div className="App bg-deep-black min-h-screen text-white">
      <ErrorBoundary>
        <Header />
      </ErrorBoundary>
      
      <Routes>
        {/* Main Trading Dashboard */}
        <Route path="/" element={
          <ErrorBoundary>
            <div className="min-h-screen bg-deep-black">
              <MarketDataTabs />
              
              {/* Featured App Icon Box */}
              <div className="p-6">
                <div className="flex justify-center mb-8">
                  <div className="bg-deep-black/95 border-2 border-fluorescent-pink rounded-xl p-6 shadow-neon-pink animate-pulse-glow hover:border-electric-blue hover:shadow-neon-cyan transition-all duration-300">
                    <div className="text-center">
                      <h3 className="text-2xl font-bold text-fluorescent-blue mb-4 animate-cyber-pulse">
                        🚀 FEATURED APP ICON 🚀
                      </h3>
                      <div className="relative inline-block">
                        <img 
                          src="https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/92/fd/06/92fd06bf-e7b2-3e80-1289-40e73f9251ad/AppIcon-1x_U007emarketing-0-11-0-85-220-0.png/434x0w.webp"
                          alt="Featured App Icon"
                          className="w-32 h-32 rounded-2xl shadow-neon-pink border-2 border-pulsing-cyan hover:border-fluorescent-pink hover:scale-110 transition-all duration-300 animate-bounce-glow featured-app-icon"
                        />
                        <div className="absolute -top-2 -right-2 bg-electric-yellow text-deep-black px-2 py-1 rounded-full text-xs font-bold animate-cyber-pulse">
                          ⭐ NEW
                        </div>
                      </div>
                      <p className="text-pulsing-cyan font-bold mt-4 text-lg">
                        💎 QUANTUM TRADING ICON 💎
                      </p>
                      <p className="text-bright-magenta font-semibold mt-2">
                        ⚡ Click to explore features ⚡
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Grid Dashboard */}
              <div className="p-6">
                <GridDashboard />
              </div>
            </div>
          </ErrorBoundary>
        } />
        
        {/* Trading Routes */}
        <Route path="/trading" element={
          <ErrorBoundary>
            <ComingSoon title="Trading Interface" description="Advanced trading interface coming soon!" />
          </ErrorBoundary>
        } />
        
        <Route path="/professional" element={
          <ErrorBoundary>
            <ComingSoon title="Professional Trading" description="Professional trading layout coming soon!" />
          </ErrorBoundary>
        } />
        
        <Route path="/chart" element={
          <ErrorBoundary>
            <ComingSoon title="Independent Chart" description="Advanced charting tools coming soon!" />
          </ErrorBoundary>
        } />
        
        <Route path="/enhanced-chart" element={
          <ErrorBoundary>
            <ComingSoon title="Enhanced Chart" description="Enhanced charting features coming soon!" />
          </ErrorBoundary>
        } />
        
        <Route path="/drawing" element={
          <ErrorBoundary>
            <ComingSoon title="Drawing Tools" description="Advanced charting and drawing tools coming soon!" />
          </ErrorBoundary>
        } />
        
        <Route path="/alerts" element={
          <ErrorBoundary>
            <ComingSoon title="Alert System" description="Smart trading alerts and notifications coming soon!" />
          </ErrorBoundary>
        } />
        
        <Route path="/portfolio" element={
          <ErrorBoundary>
            <ComingSoon title="Portfolio Manager" description="Advanced portfolio management coming soon!" />
          </ErrorBoundary>
        } />
        
        <Route path="/assistant" element={
          <ErrorBoundary>
            <ComingSoon title="Trading Assistant" description="AI-powered trading assistant coming soon!" />
          </ErrorBoundary>
        } />
        
        <Route path="/qubit" element={
          <ErrorBoundary>
            <ComingSoon title="Qubit Editor" description="Custom scripting engine coming soon!" />
          </ErrorBoundary>
        } />
        
        <Route path="/community" element={
          <ErrorBoundary>
            <QuantumCommunityHub />
          </ErrorBoundary>
        } />
        
        <Route path="/community/welcome" element={
          <ErrorBoundary>
            <CommunityWelcome />
          </ErrorBoundary>
        } />
        
        <Route path="/profile" element={
          <ErrorBoundary>
            <UserProfile 
              user={{
                username: 'QuantumTrader2025',
                bio: '🚀 Professional trader specializing in AI-powered market analysis',
                location: 'New York, USA',
                profileMedia: {
                  type: 'image',
                  url: '/default-avatar.png'
                },
                socialLinks: {
                  twitter: '@QuantumTrader2025',
                  youtube: 'QuantumTradingChannel',
                  instagram: 'quantum.trader',
                  tiktok: '@quantumtrading',
                  linkedin: 'quantum-trader-pro',
                  discord: 'QuantumTrader#1234',
                  telegram: '@quantumtrader',
                  reddit: 'u/QuantumTrader2025'
                },
                stats: {
                  level: 'Pro',
                  reputation: 1250,
                  winRate: 73.2,
                  totalTrades: 156,
                  followers: 342,
                  following: 89,
                  joinDate: new Date('2024-08-15')
                },
                badges: ['🚀 Fast Learner', '💎 Diamond Hands', '🎯 Precision Trader']
              }}
              isOwnProfile={true}
            />
          </ErrorBoundary>
        } />

        <Route path="/education" element={
          <ErrorBoundary>
            <Education />
          </ErrorBoundary>
        } />
        
        <Route path="/impact" element={
          <ErrorBoundary>
            <Impact />
          </ErrorBoundary>
        } />
        
        <Route path="/transparency" element={
          <ErrorBoundary>
            <Transparency />
          </ErrorBoundary>
        } />
        
        {/* New Routes for All Navigation Tabs */}
        <Route path="/sports-betting" element={
          <ErrorBoundary>
            <ComingSoon title="Sports Betting" description="Advanced sports betting analytics and AI predictions coming soon!" />
          </ErrorBoundary>
        } />
        
        <Route path="/sports" element={
          <ErrorBoundary>
            <ComingSoon title="Sports Analytics" description="Real-time sports data and performance analytics!" />
          </ErrorBoundary>
        } />
        
        <Route path="/world-sports" element={
          <ErrorBoundary>
            <ComingSoon title="World Sports" description="Global sports coverage and international leagues!" />
          </ErrorBoundary>
        } />
        
        <Route path="/products" element={
          <ErrorBoundary>
            <ComingSoon title="Trading Products" description="Advanced trading tools and premium products!" />
          </ErrorBoundary>
        } />
        
        <Route path="/markets" element={
          <ErrorBoundary>
            <ComingSoon title="Market Analysis" description="Deep market insights and advanced analytics!" />
          </ErrorBoundary>
        } />
        
        {/* Additional Advanced Features */}
        <Route path="/options" element={
          <ErrorBoundary>
            <ComingSoon title="Options Trading" description="Advanced options trading tools and analytics!" />
          </ErrorBoundary>
        } />
        
        <Route path="/forex" element={
          <ErrorBoundary>
            <ComingSoon title="Forex Analysis" description="Real-time forex market analysis and currency insights!" />
          </ErrorBoundary>
        } />
        
        <Route path="/commodities" element={
          <ErrorBoundary>
            <ComingSoon title="Commodity Markets" description="Gold, oil, and commodity market analysis!" />
          </ErrorBoundary>
        } />
        
        <Route path="/calendar" element={
          <ErrorBoundary>
            <ComingSoon title="Economic Calendar" description="Key economic events and market-moving announcements!" />
          </ErrorBoundary>
        } />
        
        <Route path="/news" element={
          <ErrorBoundary>
            <ComingSoon title="News & Analysis" description="Real-time market news and expert analysis!" />
          </ErrorBoundary>
        } />
        
        <Route path="/portfolio" element={
          <ErrorBoundary>
            <ComingSoon title="Portfolio Tracker" description="Advanced portfolio management and tracking tools!" />
          </ErrorBoundary>
        } />
        
        <Route path="/indicators" element={
          <ErrorBoundary>
            <ComingSoon title="Technical Indicators" description="Comprehensive technical analysis and indicators!" />
          </ErrorBoundary>
        } />
        
        <Route path="/signals" element={
          <ErrorBoundary>
            <ComingSoon title="Trading Signals" description="AI-powered trading signals and alerts!" />
          </ErrorBoundary>
        } />
        <Route path="/transparency" element={<Transparency />} />
        <Route path="/impact" element={<Impact />} />

        <Route path="/test" element={
          <div className="bg-black text-cyan-400 min-h-screen p-8">
            <h1 className="text-6xl font-bold text-pink-500 mb-8">
              🚀 AI QUANTUM CHARTS 🚀
            </h1>
            <div className="text-2xl space-y-4">
              <p className="text-green-400">✅ Platform is WORKING!</p>
              <p className="text-yellow-400">⚡ White screen issue: FIXED!</p>
              <p className="text-blue-400">🔥 Ready for development!</p>
            </div>
            <div className="mt-8 p-6 border-2 border-pink-500 rounded-lg bg-gray-900">
              <p className="text-xl">🎯 ENERGY TEST: SUCCESS! ⚡</p>
            </div>
          </div>
        } />

        <Route path="/" element={
          <div className="space-y-8">
            <ErrorBoundary>
              <MarketDataTabs />
            </ErrorBoundary>
            
            {/* Platform Status Display */}
            <div className="fixed top-4 right-4 bg-gray-900 border border-green-400 rounded-lg p-3 text-sm z-50">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-green-400 font-bold">Platform Status: Online</span>
              </div>
              <div className="text-gray-300 text-xs mt-1">
                🤖 AI Models: Active | 📊 Market Data: Live | 🔗 APIs: Connected
              </div>
            </div>

            {/* Welcome Banner */}
            <div className="container mx-auto px-4">
              <div className="bg-gradient-to-r from-purple-900 to-blue-900 p-8 rounded-lg border border-cyan-500 shadow-lg">
                <h1 className="text-5xl font-bold text-cyan-400 mb-4">
                  🚀 Welcome to AI Quantum Charts
                </h1>
                <p className="text-xl text-gray-300 mb-4">
                  The future of trading is here. Experience AI-powered market analysis, quantum algorithms, and real-time insights.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                  <div className="bg-black/50 p-4 rounded-lg border border-green-500">
                    <div className="text-green-400 text-lg font-bold">✅ AI Engine</div>
                    <div className="text-gray-300 text-sm">Online & Active</div>
                  </div>
                  <div className="bg-black/50 p-4 rounded-lg border border-blue-500">
                    <div className="text-blue-400 text-lg font-bold">📊 Data Feed</div>
                    <div className="text-gray-300 text-sm">Real-time</div>
                  </div>
                  <div className="bg-black/50 p-4 rounded-lg border border-purple-500">
                    <div className="text-purple-400 text-lg font-bold">🔮 Quantum</div>
                    <div className="text-gray-300 text-sm">Processing</div>
                  </div>
                  <div className="bg-black/50 p-4 rounded-lg border border-cyan-500">
                    <div className="text-cyan-400 text-lg font-bold">⚡ Speed</div>
                    <div className="text-gray-300 text-sm">Lightning Fast</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        } />
      </Routes>
    </div>
  );
}

export default App;