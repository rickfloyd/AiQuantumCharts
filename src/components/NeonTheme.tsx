import React from 'react';
import Navbar from './Navbar';

const NeonTheme: React.FC = () => {
  // ...existing code...

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-950 text-white">
      <Navbar />
      <div className="max-w-[1400px] mx-auto px-6 py-10">
        <h1 className="text-4xl font-bold mb-8 text-neon-pink">Neon Dashboard</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
          {/* Stocks */}
          <div className="bg-black/80 border border-cyan-500 rounded-2xl shadow-lg p-4 hover:scale-105 transition-transform duration-300">
            <h2 className="text-cyan-300 text-lg font-bold">Stocks</h2>
            <p className="text-3xl font-semibold">$386.85</p>
            <p className="text-pink-400">-0.68%</p>
          </div>
          {/* Crypto */}
          <div className="bg-black/80 border border-orange-400 rounded-2xl shadow-lg p-4 hover:scale-105 transition-transform duration-300">
            <h2 className="text-orange-300 text-lg font-bold">Crypto</h2>
            <p className="text-3xl font-semibold">$42,000</p>
            <p className="text-green-400">+2.15%</p>
          </div>
          {/* Futures */}
          <div className="bg-black/80 border border-blue-500 rounded-2xl shadow-lg p-4 hover:scale-105 transition-transform duration-300">
            <h2 className="text-blue-300 text-lg font-bold">Futures</h2>
            <p className="text-3xl font-semibold">$199.88</p>
            <p className="text-pink-400">-0.41%</p>
          </div>
          {/* Sports */}
          <div className="bg-black/80 border border-fuchsia-500 rounded-2xl shadow-lg p-4 hover:scale-105 transition-transform duration-300">
            <h2 className="text-fuchsia-300 text-lg font-bold">Sports</h2>
            <p className="text-3xl font-semibold">105.42</p>
            <p className="text-pink-400">-0.36%</p>
          </div>
          {/* Community */}
          <div className="bg-black/80 border border-green-500 rounded-2xl shadow-lg p-4 hover:scale-105 transition-transform duration-300">
            <h2 className="text-green-300 text-lg font-bold">Community</h2>
            <p className="text-3xl font-semibold">1,234</p>
            <p className="text-green-400">+0.78%</p>
          </div>
          {/* World */}
          <div className="bg-black/80 border border-yellow-400 rounded-2xl shadow-lg p-4 hover:scale-105 transition-transform duration-300">
            <h2 className="text-yellow-300 text-lg font-bold">World</h2>
            <p className="text-3xl font-semibold">Global</p>
            <p className="text-yellow-400">+1.12%</p>
          </div>
          {/* Add more boxes as needed */}
        </div>
      </div>
    </div>
  );
};

export default NeonTheme;
