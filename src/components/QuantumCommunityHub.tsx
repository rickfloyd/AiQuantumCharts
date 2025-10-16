import { useState, useEffect } from 'react';

export interface TradingIdea {
  id: string;
  author: string;
  title: string;
  description: string;
  symbol: string;
  type: 'long' | 'short' | 'neutral';
  entryPrice: number;
  targetPrice: number;
  stopLoss: number;
  timeframe: string;
  confidence: number;
  likes: number;
  comments: Comment[];
  createdAt: Date;
  tags: string[];
  status: 'active' | 'closed' | 'stopped';
  performance?: number;
  image?: string;
}

export interface Comment {
  id: string;
  author: string;
  text: string;
  likes: number;
  createdAt: Date;
  replies?: Comment[];
}

export interface ChatRoom {
  id: string;
  name: string;
  description: string;
  memberCount: number;
  isActive: boolean;
  category: 'general' | 'forex' | 'crypto' | 'stocks' | 'options' | 'ai-signals' | 'elite';
  level: 'public' | 'premium' | 'vip';
}

export interface UserProfile {
  id: string;
  username: string;
  avatar?: string;
  level: 'Rookie' | 'Trader' | 'Pro' | 'Elite' | 'Quantum Master';
  reputation: number;
  winRate: number;
  totalTrades: number;
  followers: number;
  following: number;
  badges: string[];
  joinDate: Date;
}

export interface LeaderboardEntry {
  rank: number;
  user: UserProfile;
  monthlyReturn: number;
  totalReturn: number;
  successfulTrades: number;
}

export default function CommunityHub() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'ideas' | 'chat' | 'leaderboard' | 'tournaments'>('dashboard');
  const [tradingIdeas, setTradingIdeas] = useState<TradingIdea[]>([]);
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    // Initialize mock data
    setUserProfile({
      id: '1',
      username: 'QuantumTrader2025',
      level: 'Pro',
      reputation: 1250,
      winRate: 73.2,
      totalTrades: 156,
      followers: 342,
      following: 89,
      badges: ['🚀 Fast Learner', '💎 Diamond Hands', '🎯 Precision Trader'],
      joinDate: new Date('2024-08-15')
    });

    setTradingIdeas([
      {
        id: '1',
        author: 'QuantumMaster',
        title: '🚀 NVIDIA Breakout - AI Revolution Continues',
        description: 'NVDA showing massive bullish momentum with AI earnings catalyst. Perfect cup & handle pattern on daily chart.',
        symbol: 'NVDA',
        type: 'long',
        entryPrice: 875.50,
        targetPrice: 950.00,
        stopLoss: 825.00,
        timeframe: '1D',
        confidence: 92,
        likes: 284,
        comments: [],
        createdAt: new Date('2025-10-15'),
        tags: ['AI', 'Tech', 'Breakout', 'Momentum'],
        status: 'active',
        performance: 15.2
      },
      {
        id: '2',
        author: 'CryptoQuantum',
        title: '⚡ Bitcoin Lightning Strike - $100K Incoming',
        description: 'BTC breaking major resistance with institutional buying surge. ETF inflows at all-time highs.',
        symbol: 'BTCUSD',
        type: 'long',
        entryPrice: 68500,
        targetPrice: 100000,
        stopLoss: 62000,
        timeframe: '1W',
        confidence: 88,
        likes: 567,
        comments: [],
        createdAt: new Date('2025-10-14'),
        tags: ['Crypto', 'Bitcoin', 'Institutional', 'ETF'],
        status: 'active',
        performance: 8.7
      }
    ]);

    setChatRooms([
      { id: '1', name: '🌐 Global Trading Hub', description: 'Real-time global market discussions', memberCount: 3247, isActive: true, category: 'general', level: 'public' },
      { id: '2', name: '💱 Forex Quantum', description: 'Advanced forex strategies & analysis', memberCount: 1832, isActive: true, category: 'forex', level: 'premium' },
      { id: '3', name: '₿ Crypto Nexus', description: 'Cryptocurrency signals & news', memberCount: 5156, isActive: true, category: 'crypto', level: 'public' },
      { id: '4', name: '📈 Stock Masters', description: 'Elite stock trading community', memberCount: 2945, isActive: true, category: 'stocks', level: 'premium' },
      { id: '5', name: '🎯 Options Elite', description: 'Advanced options strategies', memberCount: 967, isActive: true, category: 'options', level: 'vip' },
      { id: '6', name: '🤖 AI Quantum Signals', description: 'Exclusive AI-powered trading signals', memberCount: 434, isActive: true, category: 'ai-signals', level: 'vip' },
      { id: '7', name: '💎 Diamond Traders', description: 'Only for verified profitable traders', memberCount: 189, isActive: true, category: 'elite', level: 'vip' }
    ]);

    setLeaderboard([
      {
        rank: 1,
        user: { id: '1', username: 'QuantumKing', level: 'Quantum Master', reputation: 5000, winRate: 89.2, totalTrades: 2341, followers: 15000, following: 45, badges: [], joinDate: new Date() },
        monthlyReturn: 47.8,
        totalReturn: 2340.5,
        successfulTrades: 2089
      },
      {
        rank: 2,
        user: { id: '2', username: 'AITradeBot', level: 'Elite', reputation: 4200, winRate: 85.7, totalTrades: 1856, followers: 8900, following: 12, badges: [], joinDate: new Date() },
        monthlyReturn: 42.3,
        totalReturn: 1987.2,
        successfulTrades: 1590
      },
      {
        rank: 3,
        user: { id: '3', username: 'CyberTrader', level: 'Elite', reputation: 3800, winRate: 82.1, totalTrades: 1534, followers: 6700, following: 89, badges: [], joinDate: new Date() },
        monthlyReturn: 38.9,
        totalReturn: 1654.7,
        successfulTrades: 1260
      }
    ]);
  }, []);

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-deep-black border-2 border-fluorescent-pink rounded-lg p-6 shadow-neon-pink animate-pulse-glow">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-3xl font-bold text-fluorescent-pink animate-cyber-pulse">
              🚀 WELCOME TO THE QUANTUM COMMUNITY
            </h2>
            <p className="text-pulsing-cyan text-lg">
              Welcome back, <span className="text-electric-yellow font-bold">{userProfile?.username}</span>!
            </p>
          </div>
          <div className="text-right">
            <div className="text-neon-green text-2xl font-bold">{userProfile?.level}</div>
            <div className="text-fluorescent-pink">Reputation: {userProfile?.reputation}</div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-charcoal border border-pulsing-cyan rounded-lg p-4 text-center hover:shadow-neon-cyan transition-all">
            <div className="text-electric-yellow text-2xl font-bold">{userProfile?.winRate}%</div>
            <div className="text-pulsing-cyan text-sm">Win Rate</div>
          </div>
          <div className="bg-charcoal border border-neon-green rounded-lg p-4 text-center hover:shadow-neon-green transition-all">
            <div className="text-neon-green text-2xl font-bold">{userProfile?.totalTrades}</div>
            <div className="text-pulsing-cyan text-sm">Total Trades</div>
          </div>
          <div className="bg-charcoal border border-fluorescent-pink rounded-lg p-4 text-center hover:shadow-neon-pink transition-all">
            <div className="text-fluorescent-pink text-2xl font-bold">{userProfile?.followers}</div>
            <div className="text-pulsing-cyan text-sm">Followers</div>
          </div>
          <div className="bg-charcoal border border-electric-orange rounded-lg p-4 text-center hover:shadow-neon-orange transition-all">
            <div className="text-electric-orange text-2xl font-bold">{userProfile?.badges.length}</div>
            <div className="text-pulsing-cyan text-sm">Badges</div>
          </div>
        </div>
      </div>

      {/* Community Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-deep-black border border-pulsing-cyan rounded-lg p-6 shadow-neon-cyan">
          <h3 className="text-xl font-bold text-pulsing-cyan mb-4">🏆 TOP TRADERS</h3>
          <div className="space-y-3">
            {leaderboard.slice(0, 3).map((entry) => (
              <div key={entry.user.id} className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <span className="text-electric-yellow font-bold">#{entry.rank}</span>
                  <span className="text-fluorescent-pink">{entry.user.username}</span>
                </div>
                <span className="text-neon-green font-bold">+{entry.monthlyReturn}%</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-deep-black border border-electric-orange rounded-lg p-6 shadow-neon-orange">
          <h3 className="text-xl font-bold text-electric-orange mb-4">🚀 TRENDING IDEAS</h3>
          <div className="space-y-3">
            {tradingIdeas.slice(0, 3).map((idea) => (
              <div key={idea.id} className="border-b border-charcoal pb-2">
                <div className="text-fluorescent-pink font-semibold text-sm">{idea.symbol}</div>
                <div className="text-pulsing-cyan text-xs">{idea.title.substring(0, 30)}...</div>
                <div className="text-neon-green text-xs">❤️ {idea.likes} likes</div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-deep-black border border-neon-green rounded-lg p-6 shadow-neon-green">
          <h3 className="text-xl font-bold text-neon-green mb-4">💬 ACTIVE ROOMS</h3>
          <div className="space-y-3">
            {chatRooms.slice(0, 3).map((room) => (
              <div key={room.id} className="flex justify-between items-center">
                <div>
                  <div className="text-fluorescent-pink text-sm font-semibold">{room.name}</div>
                  <div className="text-pulsing-cyan text-xs">{room.memberCount} members</div>
                </div>
                <div className={`px-2 py-1 rounded text-xs font-bold ${
                  room.level === 'vip' ? 'bg-fluorescent-pink text-deep-black' :
                  room.level === 'premium' ? 'bg-electric-yellow text-deep-black' :
                  'bg-pulsing-cyan text-deep-black'
                }`}>
                  {room.level.toUpperCase()}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderTradingIdeas = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-fluorescent-pink animate-cyber-pulse">⚡ QUANTUM TRADING IDEAS</h2>
        <button className="bg-fluorescent-gradient text-deep-black px-6 py-3 rounded-lg font-bold hover:shadow-neon-pink transition-all animate-pulse-glow">
          🚀 SHARE YOUR IDEA
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {tradingIdeas.map(idea => (
          <div key={idea.id} className="bg-deep-black border border-pulsing-cyan rounded-lg p-6 shadow-neon-cyan hover:shadow-neon-pink transition-all">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-bold text-fluorescent-pink">{idea.title}</h3>
                <p className="text-electric-yellow">by {idea.author} • {idea.createdAt.toLocaleDateString()}</p>
              </div>
              <div className={`px-3 py-1 rounded-full text-sm font-bold ${
                idea.type === 'long' ? 'bg-neon-green text-deep-black' : 
                idea.type === 'short' ? 'bg-hot-pink text-deep-black' : 
                'bg-electric-orange text-deep-black'
              }`}>
                {idea.type.toUpperCase()}
              </div>
            </div>

            <p className="text-pulsing-cyan mb-4">{idea.description}</p>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4 text-sm">
              <div>
                <span className="text-electric-yellow">Symbol:</span>
                <div className="font-bold text-fluorescent-pink text-lg">{idea.symbol}</div>
              </div>
              <div>
                <span className="text-electric-yellow">Entry:</span>
                <div className="font-bold text-pulsing-cyan">${idea.entryPrice}</div>
              </div>
              <div>
                <span className="text-electric-yellow">Target:</span>
                <div className="font-bold text-neon-green">${idea.targetPrice}</div>
              </div>
              <div>
                <span className="text-electric-yellow">Stop Loss:</span>
                <div className="font-bold text-hot-pink">${idea.stopLoss}</div>
              </div>
              <div>
                <span className="text-electric-yellow">Confidence:</span>
                <div className="font-bold text-electric-orange">{idea.confidence}%</div>
              </div>
              <div>
                <span className="text-electric-yellow">Performance:</span>
                <div className="font-bold text-neon-green">+{idea.performance}%</div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              {idea.tags.map(tag => (
                <span key={tag} className="bg-fluorescent-pink text-deep-black text-xs px-2 py-1 rounded font-bold">
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex gap-4 text-sm">
              <button className="flex items-center gap-2 text-hot-pink hover:text-fluorescent-pink transition-colors">
                ❤️ {idea.likes}
              </button>
              <button className="flex items-center gap-2 text-pulsing-cyan hover:text-electric-yellow transition-colors">
                💬 {idea.comments.length}
              </button>
              <button className="text-electric-orange hover:text-neon-green transition-colors">🔄 Share</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderChatRooms = () => (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-fluorescent-pink animate-cyber-pulse">💬 QUANTUM CHAT ROOMS</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {chatRooms.map(room => (
          <div key={room.id} className="bg-deep-black border border-pulsing-cyan rounded-lg p-6 shadow-neon-cyan hover:shadow-neon-pink transition-all cursor-pointer">
            <div className="flex justify-between items-start mb-3">
              <h3 className="text-lg font-bold text-fluorescent-pink">{room.name}</h3>
              <div className={`px-2 py-1 rounded text-xs font-bold ${
                room.level === 'vip' ? 'bg-fluorescent-pink text-deep-black' :
                room.level === 'premium' ? 'bg-electric-yellow text-deep-black' :
                'bg-pulsing-cyan text-deep-black'
              }`}>
                {room.level.toUpperCase()}
              </div>
            </div>
            
            <p className="text-pulsing-cyan text-sm mb-4">{room.description}</p>
            
            <div className="flex justify-between items-center text-sm">
              <span className="text-electric-yellow">{room.memberCount.toLocaleString()} members</span>
              <div className={`w-3 h-3 rounded-full ${room.isActive ? 'bg-neon-green' : 'bg-gray-500'} animate-pulse`}></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderLeaderboard = () => (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-fluorescent-pink animate-cyber-pulse">🏆 QUANTUM LEADERBOARD</h2>
      
      <div className="bg-deep-black border border-fluorescent-pink rounded-lg shadow-neon-pink">
        <div className="grid grid-cols-6 gap-4 p-4 border-b border-pulsing-cyan text-electric-yellow font-bold text-sm">
          <div>RANK</div>
          <div>TRADER</div>
          <div>LEVEL</div>
          <div>MONTHLY RETURN</div>
          <div>WIN RATE</div>
          <div>TRADES</div>
        </div>
        
        {leaderboard.map(entry => (
          <div key={entry.user.id} className="grid grid-cols-6 gap-4 p-4 border-b border-charcoal hover:bg-charcoal/30 transition-all">
            <div className="flex items-center">
              <span className={`font-bold text-lg ${
                entry.rank === 1 ? 'text-electric-yellow' :
                entry.rank === 2 ? 'text-gray-300' :
                entry.rank === 3 ? 'text-electric-orange' :
                'text-pulsing-cyan'
              }`}>
                #{entry.rank}
              </span>
            </div>
            <div>
              <div className="text-fluorescent-pink font-bold">{entry.user.username}</div>
              <div className="text-pulsing-cyan text-xs">{entry.user.followers.toLocaleString()} followers</div>
            </div>
            <div className="text-neon-green font-bold">{entry.user.level}</div>
            <div className="text-neon-green font-bold">+{entry.monthlyReturn}%</div>
            <div className="text-electric-yellow font-bold">{entry.user.winRate}%</div>
            <div className="text-pulsing-cyan">{entry.successfulTrades.toLocaleString()}</div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderTournaments = () => (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-fluorescent-pink animate-cyber-pulse">🎮 QUANTUM TOURNAMENTS</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-deep-black border border-neon-green rounded-lg p-6 shadow-neon-green">
          <h3 className="text-xl font-bold text-neon-green mb-4">🚀 ACTIVE TOURNAMENTS</h3>
          <div className="space-y-4">
            <div className="border border-pulsing-cyan rounded-lg p-4">
              <h4 className="text-fluorescent-pink font-bold">Weekly Crypto Challenge</h4>
              <p className="text-pulsing-cyan text-sm">Best crypto trading performance</p>
              <div className="flex justify-between mt-2">
                <span className="text-electric-yellow">Prize: $5,000</span>
                <span className="text-neon-green">2 days left</span>
              </div>
            </div>
            <div className="border border-pulsing-cyan rounded-lg p-4">
              <h4 className="text-fluorescent-pink font-bold">AI vs Human Challenge</h4>
              <p className="text-pulsing-cyan text-sm">Beat the AI trading algorithm</p>
              <div className="flex justify-between mt-2">
                <span className="text-electric-yellow">Prize: $10,000</span>
                <span className="text-neon-green">5 days left</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-deep-black border border-fluorescent-pink rounded-lg p-6 shadow-neon-pink">
          <h3 className="text-xl font-bold text-fluorescent-pink mb-4">🏆 RECENT WINNERS</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-electric-yellow">🥇 QuantumKing</span>
              <span className="text-neon-green">+247% return</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-pulsing-cyan">🥈 AITradeBot</span>
              <span className="text-neon-green">+198% return</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-electric-orange">🥉 CyberTrader</span>
              <span className="text-neon-green">+156% return</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-charcoal-gradient text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header - SUPERCHARGED */}
        <div className="text-center mb-12 ultra-energy cyber-explosion">
          <div className="bg-energy-wave p-8 rounded-xl border-4 border-electric-yellow animate-energy-pulse">
            <h1 className="text-6xl font-bold text-deep-black mb-6 animate-quantum-vibration lightning-text text-explosive">
              ⚡🚀💎 QUANTUM COMMUNITY MATRIX 💎🚀⚡
            </h1>
            <p className="text-2xl text-deep-black font-bold animate-neon-flicker">
              🔥 CONNECT • TRADE • DOMINATE THE QUANTUM MARKETS TOGETHER 🔥
            </p>
            <div className="mt-4 text-deep-black font-bold text-lg animate-energy-pulse">
              💰 MAXIMUM ENERGY MODE: ACTIVATED 💰
            </div>
          </div>
        </div>

        {/* Navigation Tabs - SUPERCHARGED */}
        <div className="flex justify-center mb-12 ultra-energy energy-pulse">
          <div className="bg-deep-black border-4 border-fluorescent-pink rounded-xl p-4 shadow-neon-pink animate-cyber-explosion">
            {[
              { id: 'dashboard', label: '🏠 Dashboard', icon: '🏠' },
              { id: 'ideas', label: '💡 Ideas', icon: '💡' },
              { id: 'chat', label: '💬 Chat', icon: '💬' },
              { id: 'leaderboard', label: '🏆 Leaderboard', icon: '🏆' },
              { id: 'tournaments', label: '🎮 Tournaments', icon: '🎮' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as 'dashboard' | 'ideas' | 'chat' | 'leaderboard' | 'tournaments')}
                className={`px-8 py-4 rounded-xl font-bold transition-all mx-2 text-lg border-2 ${
                  activeTab === tab.id
                    ? 'bg-energy-wave text-deep-black shadow-neon-pink border-electric-yellow animate-cyber-explosion ultra-energy'
                    : 'text-pulsing-cyan hover:text-fluorescent-pink hover:bg-charcoal/50 border-pulsing-cyan hover:border-fluorescent-pink hover-explosion animate-energy-pulse'
                }`}
              >
                ⚡{tab.label}⚡
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="animate-fade-in">
          {activeTab === 'dashboard' && renderDashboard()}
          {activeTab === 'ideas' && renderTradingIdeas()}
          {activeTab === 'chat' && renderChatRooms()}
          {activeTab === 'leaderboard' && renderLeaderboard()}
          {activeTab === 'tournaments' && renderTournaments()}
        </div>
      </div>
    </div>
  );
}