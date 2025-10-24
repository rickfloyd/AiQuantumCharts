import React, { useState } from 'react';
import { Heart, TrendingUp, TrendingDown, Eye, RefreshCw, BarChart3, Activity, Settings, Maximize2, Square } from 'lucide-react';

const NeonTheme: React.FC = () => {
  const [openDropdown, setOpenDropdown] = useState('');
  const [selectedTab, setSelectedTab] = useState('Stocks');

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-950 text-white">
      <header className="border-b border-cyan-500/30 bg-black/50 backdrop-blur-sm">
        <div className="max-w-[1400px] mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-400 via-blue-500 to-pink-500 animate-pulse flex items-center justify-center">
                    <Activity className="w-7 h-7 text-white" />
                  </div>
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-400 to-pink-500 blur-xl opacity-50"></div>
                </div>
                <div>
                  <div className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-pink-500 bg-clip-text text-transparent">
                    AI
                  </div>
                  <div className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-pink-500 bg-clip-text text-transparent">
                    QUANTUM
                  </div>
                  <div className="text-xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                    CHARTS
                  </div>
                </div>
              </div>

              <nav className="flex items-center space-x-6 text-sm">
                <div className="relative">
                  <button
                    onClick={() => setOpenDropdown(openDropdown === 'personalities' ? '' : 'personalities')}
                    className="text-pink-400 hover:text-pink-300 transition font-semibold"
                  >
                    Personalities
                  </button>
                  {openDropdown === 'personalities' && (
                    <div className="absolute top-full mt-2 left-0 bg-gray-900 border border-pink-500 rounded-lg shadow-2xl shadow-pink-500/30 min-w-[180px] z-50">
                      <a href="#personality1" className="block px-4 py-2 text-pink-400 hover:bg-pink-500/10 transition">Personality 1</a>
                      <a href="#personality2" className="block px-4 py-2 text-pink-400 hover:bg-pink-500/10 transition">Personality 2</a>
                      <a href="#personality3" className="block px-4 py-2 text-pink-400 hover:bg-pink-500/10 transition">Personality 3</a>
                    </div>
                  )}
                </div>
                <a href="#ideas" className="text-pink-400 hover:text-pink-300 transition font-semibold">Ideas</a>
                <a href="#impact" className="flex items-center space-x-1 text-green-400 hover:text-green-300 transition">
                  <Heart className="w-4 h-4" />
                  <span>Impact</span>
                </a>
                <a href="#markets" className="text-cyan-400 hover:text-cyan-300 transition font-semibold">Markets</a>
                <a href="#screener" className="text-orange-500 hover:text-orange-400 transition font-semibold">Screener</a>
                <a href="#news" className="text-cyan-400 hover:text-cyan-300 transition font-semibold">News</a>
                <a href="#community" className="text-orange-500 hover:text-orange-400 transition font-semibold">Community</a>
                <a href="#more" className="text-cyan-400 hover:text-cyan-300 transition">More</a>
              </nav>
            </div>

            <div className="flex items-center space-x-4">
              <input
                type="search"
                placeholder="Search markets..."
                className="bg-gray-900 border border-cyan-500 rounded-lg px-4 py-2 text-sm text-cyan-400 placeholder-cyan-600 focus:outline-none focus:border-cyan-400 focus:shadow-lg focus:shadow-cyan-500/30 transition w-64"
              />
              <a href="#stocks" className="text-pink-400 hover:text-pink-300 transition">Stocks</a>
              <a href="#community" className="text-cyan-400 hover:text-cyan-300 transition">Community</a>
            </div>
          </div>
        </div>
      </header>

      <div className="border-b border-pink-500 bg-gradient-to-r from-pink-500/20 via-transparent to-pink-500/20"></div>

      <div className="max-w-[1400px] mx-auto px-6 py-6">
        <div className="bg-gradient-to-r from-blue-900/30 to-cyan-900/30 border border-cyan-500/50 rounded-xl p-6 mb-6 shadow-2xl shadow-cyan-500/20"></div>

        <div className="border-b border-cyan-500/30 mb-6"></div>

        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <Activity className="w-6 h-6 text-pink-500" />
            <h2 className="text-2xl font-bold text-pink-500">Market Summary &gt;</h2>
            <button className="p-2 text-cyan-400 hover:text-cyan-300 transition">
              <RefreshCw className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6">
          <div className="col-span-1">
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-gradient-to-br from-gray-900 to-cyan-950 border border-cyan-500 rounded-xl p-5 shadow-2xl shadow-cyan-500/30 relative group hover:shadow-cyan-400/50 transition">
                <button className="absolute top-3 right-3 text-gray-600 hover:text-cyan-400 transition">
                  <Eye className="w-4 h-4" />
                </button>
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-cyan-400 font-semibold">Nasdaq 100</div>
                    <div className="text-3xl font-bold text-white">$385.01</div>
                  </div>
                </div>
                <div className="flex items-center space-x-1 text-pink-500">
                  <TrendingDown className="w-4 h-4" />
                  <span className="text-sm font-semibold">-0.88%</span>
                </div>
              </div>

              <div className="bg-gradient-to-br from-gray-900 to-orange-950 border border-orange-500 rounded-xl p-5 shadow-2xl shadow-orange-500/30 relative group hover:shadow-orange-400/50 transition">
                <button className="absolute top-3 right-3 text-gray-600 hover:text-orange-400 transition">
                  <Eye className="w-4 h-4" />
                </button>
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-orange-400 font-semibold">Dow Jones</div>
                    <div className="text-3xl font-bold text-white">$368.91</div>
                  </div>
                </div>
                <div className="flex items-center space-x-1 text-green-400">
                  <TrendingUp className="w-4 h-4" />
                  <span className="text-sm font-semibold">+1.23%</span>
                </div>
              </div>

              <div className="bg-gradient-to-br from-gray-900 to-blue-950 border border-blue-500 rounded-xl p-5 shadow-2xl shadow-blue-500/30 relative group hover:shadow-blue-400/50 transition">
                <button className="absolute top-3 right-3 text-gray-600 hover:text-blue-400 transition">
                  <Eye className="w-4 h-4" />
                </button>
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-cyan-500 flex items-center justify-center">
                    <TrendingDown className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-blue-400 font-semibold">Russell 2000</div>
                    <div className="text-3xl font-bold text-white">$197.32</div>
                  </div>
                </div>
                <div className="flex items-center space-x-1 text-pink-500">
                  <TrendingDown className="w-4 h-4" />
                  <span className="text-sm font-semibold">-0.27%</span>
                </div>
              </div>
            </div>

            <div className="border-b border-cyan-500/30 mb-6"></div>

            <div className="flex items-center justify-between mb-4">
              <div className="flex space-x-2">
                <button className="px-4 py-2 bg-gray-900 border border-green-500 rounded-lg text-green-400 text-sm hover:bg-green-500/10 transition shadow-lg shadow-green-500/20">
                  4h
                </button>
                <button className="px-4 py-2 bg-gray-900 border border-pink-500 rounded-lg text-pink-400 text-sm hover:bg-pink-500/10 transition shadow-lg shadow-pink-500/20">
                  1D
                </button>
                <button className="px-4 py-2 bg-cyan-500 border border-cyan-400 rounded-lg text-white text-sm shadow-lg shadow-cyan-500/50">
                  <Activity className="w-4 h-4" />
                </button>
                <button className="px-4 py-2 bg-gray-900 border border-orange-500 rounded-lg text-orange-400 text-sm hover:bg-orange-500/10 transition shadow-lg shadow-orange-500/20">
                  <BarChart3 className="w-4 h-4" />
                </button>
              </div>

              <div className="flex space-x-2">
                <button className="p-2 bg-gray-900 border border-yellow-500 rounded-lg text-yellow-400 hover:bg-yellow-500/10 transition shadow-lg shadow-yellow-500/20">
                  <Settings className="w-5 h-5" />
                </button>
                <button className="p-2 bg-cyan-500 border border-cyan-400 rounded-lg text-white shadow-lg shadow-cyan-500/50">
                  <Maximize2 className="w-5 h-5" />
                </button>
                <button className="px-6 py-2 bg-gradient-to-r from-pink-500 to-pink-600 border border-pink-400 rounded-lg text-white font-bold hover:from-pink-600 hover:to-pink-700 transition shadow-lg shadow-pink-500/50">
                  STOP
                </button>
              </div>
            </div>

            <div className="bg-gradient-to-r from-pink-900/30 to-pink-800/30 border-2 border-pink-500 rounded-2xl p-6 shadow-2xl shadow-pink-500/30">
              <div className="flex items-center space-x-3 mb-3">
                <Activity className="w-6 h-6 text-pink-400" />
                <h3 className="text-xl font-bold text-pink-400">DXY (US Dollar Index)</h3>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-5xl font-bold text-white">105.42</div>
                <div className="flex items-center space-x-2 text-pink-400">
                  <TrendingDown className="w-6 h-6" />
                  <span className="text-xl font-semibold">-0.38 (-0.36%)</span>
                </div>
              </div>
            </div>

            <div className="mt-6 flex space-x-2">
              {['Stocks', 'Spreads', 'Float', 'Crypto', 'Futures'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setSelectedTab(tab)}
                  className={`px-6 py-2 rounded-lg font-semibold text-sm transition shadow-lg ${
                    selectedTab === tab
                      ? 'bg-cyan-500 text-white border border-cyan-400 shadow-cyan-500/50'
                      : 'bg-gray-900 text-cyan-400 border border-cyan-500/30 hover:bg-cyan-500/10'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="h-8 bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent"></div>
    </div>
  );
};

export default NeonTheme;
