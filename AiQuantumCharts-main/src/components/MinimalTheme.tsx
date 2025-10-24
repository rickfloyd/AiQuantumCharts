import React, { useState } from "react";
import SimpleTabs from "./SimpleTabs";
import AnimatedLogo from "./AnimatedLogo";

const MinimalTheme: React.FC = () => {
  const [activeTab, setActiveTab] = useState("forex");

  const tabs = [
    { id: "forex", label: "FOREX" },
    { id: "crypto", label: "CRYPTO" },
    { id: "stocks", label: "STOCKS" },
    { id: "bonds", label: "BONDS" },
    { id: "indices", label: "INDICES" },
    { id: "futures", label: "FUTURES" },
  ];

  return (
    <div className="bg-gradient-to-b from-black via-gray-950 to-black min-h-screen text-gray-100">
      <header className="flex flex-col items-start px-6 py-4 border-b border-pink-900/30">
        <div className="flex items-center space-x-3">
          <AnimatedLogo />
          <span className="text-xl font-bold bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text text-transparent">
            AI QUANTUM CHARTS
          </span>
        </div>
        <button
          onClick={() => {
            const next = 'neon';
            window.localStorage.setItem('siteTheme', next);
            window.location.reload();
          }}
          className="mt-8 mb-2 px-4 py-2 rounded-lg font-bold text-xs bg-gray-900 text-pink-400 border border-pink-500 shadow-neon-pink hover:bg-pink-900 hover:text-white transition-all"
          aria-label="Switch to Neon Theme"
        >
          Switch to Neon Theme
        </button>
        <nav className="flex items-center space-x-6 text-base mt-2">
          <a href="#exchange" className="text-pink-400 hover:text-pink-300">
            Exchange
          </a>
          <a href="#markets" className="text-blue-400 hover:text-blue-300">
            Markets
          </a>
          <a href="#wallet" className="text-pink-400 hover:text-pink-300">
            Wallet
          </a>
          <a href="#login" className="text-blue-400 hover:text-blue-300">
            Login
          </a>
        </nav>
      </header>

      <div className="bg-transparent">
        <div className="max-w-6xl mx-auto px-4">
          <div className="py-4 text-center">
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-wider bg-gradient-to-r from-pink-400 via-pink-500 to-orange-400 bg-clip-text text-transparent drop-shadow-[0_0_12px_rgba(255,105,180,0.35)]">
              SIMPLE VIEW • AI QUANTUM CHARTS
            </h2>
          </div>
        </div>
      </div>

      <div className="border-b border-pink-900/30">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex space-x-1 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 font-bold text-sm transition-all ${
                  activeTab === tab.id
                    ? "bg-gradient-to-r from-pink-600 to-blue-600 text-white border-b-2 border-pink-400"
                    : "text-gray-400 hover:text-pink-400"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text text-transparent">
          {tabs.find((t) => t.id === activeTab)?.label} Market Summary
        </h1>

        <SimpleTabs />

        {/* Section for each market type, styled cleanly, no yellow boxes */}
        <div className="space-y-8">
          {tabs.map((tab) => (
            activeTab === tab.id && (
              <section key={tab.id} className="bg-gradient-to-br from-gray-900/60 to-gray-950/80 rounded-xl p-8 border border-pink-900/30 shadow-lg">
                <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-pink-400 to-blue-400 bg-clip-text text-transparent uppercase tracking-wider">
                  {tab.label} Market Board
                </h2>
                <div className="h-32 flex items-center justify-center text-gray-500 italic opacity-70">
                  {`[${tab.label} market data and charts coming soon]`}
                </div>
              </section>
            )
          ))}
        </div>
      </main>

      <footer className="text-center py-6 text-gray-500 text-xs border-t border-pink-900/30 mt-8">
        Quantum Charts &copy; 2025. Minimal version for accessibility and focus.
      </footer>
    </div>
  );
};

export default MinimalTheme;
