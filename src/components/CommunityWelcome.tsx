

export default function CommunityWelcome() {
  return (
    <div className="min-h-screen bg-charcoal-gradient text-white p-6">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold text-fluorescent-pink mb-6 animate-cyber-pulse">
            🎉 WELCOME TO THE QUANTUM COMMUNITY! 
          </h1>
          <p className="text-2xl text-pulsing-cyan mb-8">
            You're now part of the most advanced trading community in the universe!
          </p>
          <div className="bg-fluorescent-gradient p-6 rounded-lg shadow-neon-pink mb-8 border-4 border-fluorescent-pink animate-pulse-glow inline-block">
            <p className="text-deep-black text-3xl font-bold">✅ ACCOUNT ACTIVATED</p>
            <p className="text-deep-black text-xl font-bold">🚀 QUANTUM ACCESS GRANTED</p>
          </div>
        </div>

        {/* Community Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {/* Trading Ideas */}
          <div className="bg-deep-black border border-pulsing-cyan rounded-lg p-8 shadow-neon-cyan hover:shadow-neon-pink transition-all transform hover:scale-105">
            <div className="text-center">
              <div className="text-6xl mb-4">💡</div>
              <h3 className="text-2xl font-bold text-fluorescent-pink mb-4">TRADING IDEAS</h3>
              <div className="text-pulsing-cyan space-y-2">
                <p>• Share your best trading setups</p>
                <p>• Get AI-powered analysis</p>
                <p>• Track performance in real-time</p>
                <p>• Earn reputation points</p>
                <p>• Access premium signals</p>
              </div>
            </div>
          </div>

          {/* Chat Rooms */}
          <div className="bg-deep-black border border-neon-green rounded-lg p-8 shadow-neon-green hover:shadow-neon-pink transition-all transform hover:scale-105">
            <div className="text-center">
              <div className="text-6xl mb-4">💬</div>
              <h3 className="text-2xl font-bold text-neon-green mb-4">LIVE CHAT ROOMS</h3>
              <div className="text-pulsing-cyan space-y-2">
                <p>• Real-time market discussions</p>
                <p>• Expert trader insights</p>
                <p>• Multi-asset coverage</p>
                <p>• VIP exclusive rooms</p>
                <p>• AI trading signals</p>
              </div>
            </div>
          </div>

          {/* Leaderboards */}
          <div className="bg-deep-black border border-electric-yellow rounded-lg p-8 shadow-neon-yellow hover:shadow-neon-pink transition-all transform hover:scale-105">
            <div className="text-center">
              <div className="text-6xl mb-4">🏆</div>
              <h3 className="text-2xl font-bold text-electric-yellow mb-4">LEADERBOARDS</h3>
              <div className="text-pulsing-cyan space-y-2">
                <p>• Compete with top traders</p>
                <p>• Monthly rankings</p>
                <p>• Performance tracking</p>
                <p>• Exclusive badges</p>
                <p>• Prize competitions</p>
              </div>
            </div>
          </div>

          {/* Tournaments */}
          <div className="bg-deep-black border border-fluorescent-pink rounded-lg p-8 shadow-neon-pink hover:shadow-neon-orange transition-all transform hover:scale-105">
            <div className="text-center">
              <div className="text-6xl mb-4">🎮</div>
              <h3 className="text-2xl font-bold text-fluorescent-pink mb-4">TOURNAMENTS</h3>
              <div className="text-pulsing-cyan space-y-2">
                <p>• Weekly trading challenges</p>
                <p>• Cash prizes up to $50K</p>
                <p>• AI vs Human competitions</p>
                <p>• Skill-based matchmaking</p>
                <p>• Hall of Fame status</p>
              </div>
            </div>
          </div>

          {/* AI Features */}
          <div className="bg-deep-black border border-electric-orange rounded-lg p-8 shadow-neon-orange hover:shadow-neon-cyan transition-all transform hover:scale-105">
            <div className="text-center">
              <div className="text-6xl mb-4">🤖</div>
              <h3 className="text-2xl font-bold text-electric-orange mb-4">AI POWERED</h3>
              <div className="text-pulsing-cyan space-y-2">
                <p>• Quantum trading algorithms</p>
                <p>• Neural network analysis</p>
                <p>• Sentiment prediction</p>
                <p>• Risk optimization</p>
                <p>• Pattern recognition</p>
              </div>
            </div>
          </div>

          {/* Exclusive Access */}
          <div className="bg-deep-black border border-hot-pink rounded-lg p-8 shadow-neon-hot-pink hover:shadow-neon-green transition-all transform hover:scale-105">
            <div className="text-center">
              <div className="text-6xl mb-4">💎</div>
              <h3 className="text-2xl font-bold text-hot-pink mb-4">VIP ACCESS</h3>
              <div className="text-pulsing-cyan space-y-2">
                <p>• Elite trader networks</p>
                <p>• Institutional insights</p>
                <p>• Private alpha strategies</p>
                <p>• Direct expert access</p>
                <p>• Premium market data</p>
              </div>
            </div>
          </div>
        </div>

        {/* Getting Started Section */}
        <div className="bg-deep-black border-2 border-fluorescent-pink rounded-lg p-8 shadow-neon-pink animate-pulse-glow">
          <h2 className="text-3xl font-bold text-fluorescent-pink text-center mb-8">
            🚀 READY TO DOMINATE THE MARKETS?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="text-center">
              <div className="bg-fluorescent-gradient text-deep-black w-16 h-16 rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-4">1</div>
              <h4 className="text-xl font-bold text-electric-yellow mb-2">JOIN DISCUSSIONS</h4>
              <p className="text-pulsing-cyan">Start chatting in public rooms and share your market insights</p>
            </div>
            
            <div className="text-center">
              <div className="bg-neon-green text-deep-black w-16 h-16 rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-4">2</div>
              <h4 className="text-xl font-bold text-electric-yellow mb-2">SHARE IDEAS</h4>
              <p className="text-pulsing-cyan">Post your trading setups and get feedback from the community</p>
            </div>
            
            <div className="text-center">
              <div className="bg-electric-orange text-deep-black w-16 h-16 rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-4">3</div>
              <h4 className="text-xl font-bold text-electric-yellow mb-2">COMPETE & WIN</h4>
              <p className="text-pulsing-cyan">Enter tournaments and climb the leaderboards for glory and prizes</p>
            </div>
          </div>

          <div className="text-center">
            <a 
              href="/community" 
              className="bg-fluorescent-gradient text-deep-black px-12 py-4 rounded-lg text-xl font-bold hover:shadow-neon-pink transition-all animate-bounce-glow inline-block"
            >
              🚀 ENTER THE COMMUNITY HUB
            </a>
          </div>
        </div>

        {/* Live Stats */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="bg-deep-black border border-pulsing-cyan rounded-lg p-6 text-center shadow-neon-cyan">
            <div className="text-3xl font-bold text-pulsing-cyan">15,247</div>
            <div className="text-electric-yellow">Active Traders</div>
          </div>
          
          <div className="bg-deep-black border border-neon-green rounded-lg p-6 text-center shadow-neon-green">
            <div className="text-3xl font-bold text-neon-green">$2.4M</div>
            <div className="text-electric-yellow">Monthly Prizes</div>
          </div>
          
          <div className="bg-deep-black border border-fluorescent-pink rounded-lg p-6 text-center shadow-neon-pink">
            <div className="text-3xl font-bold text-fluorescent-pink">847</div>
            <div className="text-electric-yellow">Live Ideas</div>
          </div>
          
          <div className="bg-deep-black border border-electric-orange rounded-lg p-6 text-center shadow-neon-orange">
            <div className="text-3xl font-bold text-electric-orange">92.3%</div>
            <div className="text-electric-yellow">Success Rate</div>
          </div>
        </div>
      </div>
    </div>
  );
}