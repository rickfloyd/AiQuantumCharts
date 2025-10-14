import React, { useState, useEffect } from 'react';
import './index.css';
import AgeVerification from './components/AgeVerification';

interface MiningOption {
  id: string;
  name: string;
  type: 'CPU' | 'GPU' | 'ASIC';
  hashrate: string;
  power: string;
  profitability: string;
  downloadUrl: string;
  description: string;
  supportedCoins: string[];
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
}

const MINING_SOFTWARE: MiningOption[] = [
  {
    id: 'nicehash',
    name: 'NiceHash Miner',
    type: 'GPU',
    hashrate: '50-100 MH/s',
    power: '200-400W',
    profitability: '$3-8/day',
    downloadUrl: 'https://www.nicehash.com/download',
    description: 'Easy-to-use mining software with automatic algorithm switching for maximum profits.',
    supportedCoins: ['Bitcoin', 'Ethereum', 'Dogecoin', 'Auto-switching'],
    difficulty: 'Beginner'
  },
  {
    id: 'phoenixminer',
    name: 'PhoenixMiner',
    type: 'GPU',
    hashrate: '60-120 MH/s',
    power: '150-350W',
    profitability: '$4-10/day',
    downloadUrl: 'https://phoenixminer.info/downloads/',
    description: 'High-performance Ethereum and Ethash mining with minimal dev fees.',
    supportedCoins: ['Ethereum', 'Ethereum Classic', 'Callisto'],
    difficulty: 'Intermediate'
  },
  {
    id: 'xmrig',
    name: 'XMRig',
    type: 'CPU',
    hashrate: '1-15 KH/s',
    power: '50-200W',
    profitability: '$1-4/day',
    downloadUrl: 'https://xmrig.com/download',
    description: 'Latest v6.21.3+ Monero miner with RandomX optimizations, CPU worker improvements, CUDA/OpenCL backends, and MSR optimizations for Intel/AMD.',
    supportedCoins: ['Monero (XMR)', 'RandomX', 'RX-WOW', 'RX-ARQ', 'RX-GRAFT', 'RX-SFX'],
    difficulty: 'Intermediate'
  },
  {
    id: 'bfgminer',
    name: 'BFGMiner',
    type: 'ASIC',
    hashrate: '1-100 TH/s',
    power: '1000-3000W',
    profitability: '$15-50/day',
    downloadUrl: 'https://bfgminer.org/',
    description: 'Advanced ASIC/FPGA mining software with monitoring and remote interface.',
    supportedCoins: ['Bitcoin', 'Litecoin', 'SHA-256 coins'],
    difficulty: 'Advanced'
  },
  {
    id: 'gminer',
    name: 'GMiner',
    type: 'GPU',
    hashrate: '40-90 MH/s',
    power: '180-320W',
    profitability: '$3-7/day',
    downloadUrl: 'https://gminer.info/',
    description: 'Fast Nvidia and AMD GPU miner with low developer fees.',
    supportedCoins: ['Ethereum', 'Ravencoin', 'Beam', 'Grin'],
    difficulty: 'Beginner'
  },
  {
    id: 'lolminer',
    name: 'lolMiner',
    type: 'GPU',
    hashrate: '45-150 MH/s',
    power: '160-400W',
    profitability: '$3-12/day',
    downloadUrl: 'https://github.com/Lolliedieb/lolMiner-releases',
    description: 'Latest v1.96a+ multi-algorithm miner with Tari-Sha3x, Fishhash, dual mining support, AMD/Nvidia/Intel Arc compatibility, and LHR unlock.',
    supportedCoins: ['Ethash', 'Etchash', 'Autolykos2 (Ergo)', 'Kaspa', 'Nexa', 'Fishhash', 'Karlsen', 'Alephium', 'Conflux', 'Radiant', 'Tari-Sha3x'],
    difficulty: 'Intermediate'
  },
  {
    id: 'trex',
    name: 'T-Rex',
    type: 'GPU',
    hashrate: '50-120 MH/s',
    power: '180-350W',
    profitability: '$4-10/day',
    downloadUrl: 'https://github.com/trexminer/T-Rex',
    description: 'Latest NVIDIA GPU miner with LHR unlock, dual mining, advanced fan control, and support for Ethash/Etchash/Autolykos2/Kawpow/Blake3/Octopus/Firopow.',
    supportedCoins: ['Ethash', 'Etchash', 'Autolykos2 (Ergo)', 'Kawpow (Ravencoin)', 'Blake3 (Alephium)', 'Octopus (Conflux)', 'Firopow (Firo)'],
    difficulty: 'Beginner'
  }
];

const CRYPTO_PRICES = {
  'Bitcoin': '$43,250',
  'Ethereum': '$2,680',
  'Monero': '$165',
  'Dogecoin': '$0.08'
};

const App: React.FC = () => {
  const [selectedType, setSelectedType] = useState<'ALL' | 'CPU' | 'GPU' | 'ASIC'>('ALL');
  const [showCalculator, setShowCalculator] = useState(false);
  const [userConsent, setUserConsent] = useState(false);
  const [isAgeVerified, setIsAgeVerified] = useState<boolean>(false);
  const [isCheckingAge, setIsCheckingAge] = useState<boolean>(true);

  useEffect(() => {
    // Check age verification first
    const checkAgeVerification = () => {
      const ageVerified = localStorage.getItem('age_verified_crypto');
      const ageVerifiedDate = localStorage.getItem('age_verified_crypto_date');
      
      if (ageVerified === 'true' && ageVerifiedDate) {
        // Check if verification is still valid (24 hours)
        const verificationDate = new Date(ageVerifiedDate);
        const currentDate = new Date();
        const timeDiff = currentDate.getTime() - verificationDate.getTime();
        const hoursDiff = timeDiff / (1000 * 3600);
        
        if (hoursDiff < 24) {
          setIsAgeVerified(true);
        } else {
          // Clear expired verification
          localStorage.removeItem('age_verified_crypto');
          localStorage.removeItem('age_verified_crypto_date');
        }
      }
      setIsCheckingAge(false);
    };

    checkAgeVerification();
  }, []);

  useEffect(() => {
    // Check if user has given consent
    const consent = localStorage.getItem('mining_consent');
    if (consent === 'true') {
      setUserConsent(true);
    }
  }, []);

  const handleAgeVerified = () => {
    setIsAgeVerified(true);
  };

  const handleConsent = () => {
    setUserConsent(true);
    localStorage.setItem('mining_consent', 'true');
  };

  // Show loading while checking age verification
  if (isCheckingAge) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  // Show age verification if not verified
  if (!isAgeVerified) {
    return <AgeVerification onVerified={handleAgeVerified} />;
  }

  const filteredMiners = selectedType === 'ALL' 
    ? MINING_SOFTWARE 
    : MINING_SOFTWARE.filter(miner => miner.type === selectedType);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'text-green-400';
      case 'Intermediate': return 'text-yellow-400';
      case 'Advanced': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  if (!userConsent) {
    return (
      <div className="min-h-screen gradient-bg flex items-center justify-center p-8">
        <div className="max-w-2xl mx-auto text-center crypto-card rounded-2xl p-12">
          <div className="text-8xl mb-8">⛏️💰</div>
          <h1 className="text-5xl font-bold mb-6 text-white">
            Do You Want to Mine Crypto?
          </h1>
          <p className="text-xl text-gray-200 mb-8 leading-relaxed">
            Start earning passive income with cryptocurrency mining! 
            Download professional-grade mining software and begin mining 
            Bitcoin, Ethereum, Monero, and more.
          </p>
          
          <div className="grid grid-cols-2 gap-6 mb-8 text-sm">
            <div className="crypto-card rounded-lg p-4">
              <div className="text-2xl mb-2">⚡</div>
              <div className="font-semibold">Easy Setup</div>
              <div className="text-gray-300">Get started in minutes</div>
            </div>
            <div className="crypto-card rounded-lg p-4">
              <div className="text-2xl mb-2">💎</div>
              <div className="font-semibold">High Profits</div>
              <div className="text-gray-300">Earn $5-50+ daily</div>
            </div>
            <div className="crypto-card rounded-lg p-4">
              <div className="text-2xl mb-2">🔒</div>
              <div className="font-semibold">Secure</div>
              <div className="text-gray-300">Trusted by millions</div>
            </div>
            <div className="crypto-card rounded-lg p-4">
              <div className="text-2xl mb-2">🌐</div>
              <div className="font-semibold">Multiple Coins</div>
              <div className="text-gray-300">Mine 50+ cryptocurrencies</div>
            </div>
          </div>

          <div className="space-y-4">
            <button
              onClick={handleConsent}
              className="mining-button text-black font-bold py-4 px-8 rounded-full text-xl hover:scale-105 transition-transform"
            >
              🚀 YES! Show Me The Best Miners
            </button>
            <p className="text-sm text-gray-400">
              ⚠️ Mining disclaimer: Cryptocurrency mining involves financial risk. 
              Electricity costs, hardware wear, and market volatility affect profitability.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="gradient-bg p-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold mb-2">💰 Crypto Mining Hub</h1>
          <p className="text-xl text-gray-200">Download the Best Mining Software</p>
          
          {/* Live Crypto Prices */}
          <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(CRYPTO_PRICES).map(([coin, price]) => (
              <div key={coin} className="crypto-card rounded-lg p-3 text-center">
                <div className="font-semibold">{coin}</div>
                <div className="text-green-400 font-bold">{price}</div>
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* Filter Tabs */}
      <div className="max-w-7xl mx-auto p-6">
        <div className="flex flex-wrap gap-4 mb-8">
          {['ALL', 'CPU', 'GPU', 'ASIC'].map((type) => (
            <button
              key={type}
              onClick={() => setSelectedType(type as 'ALL' | 'CPU' | 'GPU' | 'ASIC')}
              className={`px-6 py-2 rounded-full font-semibold transition-all ${
                selectedType === type
                  ? 'mining-button text-black'
                  : 'bg-gray-700 text-white hover:bg-gray-600'
              }`}
            >
              {type} Mining
            </button>
          ))}
          <button
            onClick={() => setShowCalculator(!showCalculator)}
            className="px-6 py-2 rounded-full bg-blue-600 hover:bg-blue-700 font-semibold transition-all"
          >
            🧮 Profit Calculator
          </button>
        </div>

        {/* Profit Calculator */}
        {showCalculator && (
          <div className="crypto-card rounded-xl p-6 mb-8">
            <h3 className="text-2xl font-bold mb-4">⚡ Mining Profit Calculator</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">Hash Rate</label>
                <input type="text" className="w-full p-3 rounded-lg bg-gray-700 text-white" placeholder="e.g., 60 MH/s" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Power (Watts)</label>
                <input type="text" className="w-full p-3 rounded-lg bg-gray-700 text-white" placeholder="e.g., 250W" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Electricity Cost</label>
                <input type="text" className="w-full p-3 rounded-lg bg-gray-700 text-white" placeholder="$0.12/kWh" />
              </div>
            </div>
            <div className="mt-4 p-4 bg-green-900/30 rounded-lg">
              <div className="text-lg font-semibold text-green-400">Estimated Daily Profit: $6.45</div>
              <div className="text-sm text-gray-400">Monthly: $193.50 | Yearly: $2,354</div>
            </div>
          </div>
        )}

        {/* Latest Mining Software Updates */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-center">🆕 Latest Mining Software Updates</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="crypto-card rounded-xl p-6">
              <h3 className="text-xl font-bold mb-3 text-blue-400">XMRig v6.21.3+</h3>
              <ul className="text-sm space-y-2 text-gray-300">
                <li>✅ RandomX algorithm optimizations</li>
                <li>✅ Enhanced CPU worker performance</li>
                <li>✅ CUDA/OpenCL GPU backend support</li>
                <li>✅ MSR optimizations for Intel/AMD</li>
                <li>✅ Multiple RandomX variants (RX-WOW, RX-ARQ, RX-GRAFT)</li>
              </ul>
            </div>
            <div className="crypto-card rounded-xl p-6">
              <h3 className="text-xl font-bold mb-3 text-green-400">lolMiner v1.96a</h3>
              <ul className="text-sm space-y-2 text-gray-300">
                <li>✅ Tari-Sha3x mining support</li>
                <li>✅ Fishhash mainnet compatibility</li>
                <li>✅ Dual mining with multiple algorithms</li>
                <li>✅ Intel Arc GPU support</li>
                <li>✅ LHR unlock for Nvidia cards</li>
              </ul>
            </div>
            <div className="crypto-card rounded-xl p-6">
              <h3 className="text-xl font-bold mb-3 text-purple-400">T-Rex Latest</h3>
              <ul className="text-sm space-y-2 text-gray-300">
                <li>✅ Advanced LHR auto-tuning</li>
                <li>✅ Dual mining optimization</li>
                <li>✅ Enhanced GPU fine-tuning</li>
                <li>✅ Memory tweak modes</li>
                <li>✅ Built-in watchdog system</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Mining Software Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredMiners.map((miner) => (
            <div key={miner.id} className="crypto-card rounded-xl p-6 hover:scale-105 transition-transform">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold">{miner.name}</h3>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getDifficultyColor(miner.difficulty)}`}>
                  {miner.difficulty}
                </span>
              </div>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-400">Type:</span>
                  <span className="font-semibold">{miner.type}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Hash Rate:</span>
                  <span className="font-semibold text-blue-400">{miner.hashrate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Power:</span>
                  <span className="font-semibold">{miner.power}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Daily Profit:</span>
                  <span className="font-semibold text-green-400">{miner.profitability}</span>
                </div>
              </div>

              <p className="text-gray-300 text-sm mb-4">{miner.description}</p>

              <div className="mb-4">
                <div className="text-sm text-gray-400 mb-2">Supported Coins:</div>
                <div className="flex flex-wrap gap-2">
                  {miner.supportedCoins.map((coin) => (
                    <span key={coin} className="px-2 py-1 bg-gray-700 rounded-full text-xs">
                      {coin}
                    </span>
                  ))}
                </div>
              </div>

              <a
                href={miner.downloadUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full mining-button text-center text-black font-bold py-3 px-6 rounded-lg hover:scale-105 transition-transform"
              >
                ⬇️ Download {miner.name}
              </a>
            </div>
          ))}
        </div>

        {/* Mining Pools Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold mb-8">🏊 Recommended Mining Pools</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: 'Slush Pool', fee: '2%', coins: ['Bitcoin'], url: 'https://slushpool.com' },
              { name: 'Ethermine', fee: '1%', coins: ['Ethereum'], url: 'https://ethermine.org' },
              { name: 'F2Pool', fee: '2.5%', coins: ['Bitcoin', 'Ethereum', 'Litecoin'], url: 'https://f2pool.com' },
              { name: 'NiceHash', fee: '2%', coins: ['Auto-switch'], url: 'https://nicehash.com' }
            ].map((pool) => (
              <div key={pool.name} className="crypto-card rounded-lg p-4">
                <h4 className="font-bold mb-2">{pool.name}</h4>
                <div className="text-sm text-gray-400 mb-2">Fee: {pool.fee}</div>
                <div className="text-xs text-gray-500 mb-3">{pool.coins.join(', ')}</div>
                <a href={pool.url} target="_blank" rel="noopener noreferrer" 
                   className="text-blue-400 hover:text-blue-300 text-sm">
                  Join Pool →
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-16 text-center text-gray-500 border-t border-gray-700 pt-8">
          <p className="mb-2">⚠️ Mining Disclaimer: Cryptocurrency mining involves risk. Please research electricity costs, hardware requirements, and market conditions.</p>
          <p className="text-sm mb-3">Mining software information updated from latest GitHub repositories including XMRig v6.21.3+, lolMiner v1.96a+, and T-Rex latest releases.</p>
          <p className="text-sm">Always download mining software from official sources and use antivirus protection. Verify checksums and signatures.</p>
          <p className="text-xs mt-2 text-gray-600">Last updated: Based on recent GitHub repository analysis</p>
        </footer>
      </div>
    </div>
  );
};

export default App;