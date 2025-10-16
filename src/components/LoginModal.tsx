import { useState } from 'react';

interface LoginUserData {
  username: string;
  email: string;
  profilePicture: string;
}

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (userData: LoginUserData) => void;
  onSwitchToSignup: () => void;
}

export default function LoginModal({ isOpen, onClose, onSuccess, onSwitchToSignup }: LoginModalProps) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });

  const handleSocialLogin = (provider: string) => {
    // Simulate social login
    console.log(`Logging in with ${provider}`);
    const mockUserData = {
      username: `${provider}User123`,
      email: `user@${provider}.com`,
      profilePicture: '/default-avatar.png'
    };
    onSuccess(mockUserData);
    onClose();
  };

  const handleEmailLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate email login
    const userData = {
      username: 'QuantumTrader',
      email: formData.email,
      profilePicture: '/default-avatar.png'
    };
    onSuccess(userData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-deep-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4 particle-field">
      <div className="bg-deep-black border-4 border-fluorescent-pink rounded-xl shadow-neon-pink max-w-3xl w-full ultra-energy animate-cyber-explosion">
        
        {/* Header - SUPERCHARGED */}
        <div className="bg-energy-wave p-8 border-b-4 border-electric-yellow animate-energy-pulse">
          <div className="flex justify-between items-center">
            <h2 className="text-4xl font-bold text-deep-black text-explosive animate-quantum-vibration">
              ⚡🔐 QUANTUM LOGIN MATRIX 🔐⚡
            </h2>
            <button 
              onClick={onClose}
              className="text-deep-black hover:text-hot-pink text-3xl font-bold transition-colors hover-explosion animate-energy-pulse"
            >
              ⚡✕⚡
            </button>
          </div>
          <div className="mt-3 text-center">
            <div className="text-deep-black font-bold text-lg animate-neon-flicker">
              🔥 MAXIMUM ENERGY ACCESS MODE 🔥
            </div>
          </div>
        </div>

        <div className="p-8 space-y-8">
          {/* Social Login Options - SUPERCHARGED */}
          <div className="ultra-energy cyber-explosion">
            <h3 className="text-3xl font-bold text-explosive mb-8 text-center animate-quantum-vibration lightning-text">
              ⚡🚀 LIGHTNING FAST ACCESS - SOCIAL LOGIN 🚀⚡
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <button 
                onClick={() => handleSocialLogin('google')}
                className="bg-deep-black border-4 border-pulsing-cyan text-white p-6 rounded-xl hover-explosion transition-all flex items-center justify-center space-x-4 font-bold text-lg animate-energy-pulse hover-lightning ultra-energy"
              >
                <span className="text-3xl animate-energy-orb">G</span>
                <span className="text-energy">GOOGLE POWER ACCESS</span>
              </button>
              
              <button 
                onClick={() => handleSocialLogin('facebook')}
                className="bg-deep-black border-4 border-blue-500 text-white p-6 rounded-xl hover-explosion transition-all flex items-center justify-center space-x-4 font-bold text-lg animate-power-surge hover-lightning ultra-energy"
              >
                <span className="text-3xl animate-energy-orb">f</span>
                <span className="text-energy">FACEBOOK BLAST LOGIN</span>
              </button>
              
              <button 
                onClick={() => handleSocialLogin('twitter')}
                className="bg-deep-black border-4 border-blue-400 text-white p-6 rounded-xl hover-explosion transition-all flex items-center justify-center space-x-4 font-bold text-lg animate-neon-flicker hover-lightning ultra-energy"
              >
                <span className="text-3xl animate-energy-orb">𝕏</span>
                <span className="text-energy">X ROCKET ACCESS</span>
              </button>
              
              <button 
                onClick={() => handleSocialLogin('apple')}
                className="bg-deep-black border-4 border-gray-400 text-white p-6 rounded-xl hover-explosion transition-all flex items-center justify-center space-x-4 font-bold text-lg animate-quantum-vibration hover-lightning ultra-energy"
              >
                <span className="text-3xl animate-energy-orb">🍎</span>
                <span className="text-energy">APPLE STORM LOGIN</span>
              </button>
            </div>
          </div>

          {/* Divider - SUPERCHARGED */}
          <div className="flex items-center ultra-energy energy-pulse">
            <div className="flex-1 h-2 bg-gradient-to-r from-pulsing-cyan via-electric-yellow to-fluorescent-pink animate-energy-pulse"></div>
            <span className="px-6 text-explosive font-bold text-2xl animate-quantum-vibration">⚡ OR ⚡</span>
            <div className="flex-1 h-2 bg-gradient-to-r from-fluorescent-pink via-electric-yellow to-pulsing-cyan animate-energy-pulse"></div>
          </div>

          {/* Email Login Form - SUPERCHARGED */}
          <form onSubmit={handleEmailLogin} className="space-y-8 ultra-energy cyber-explosion">
            <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-cyan-900/20 via-blue-900/20 to-purple-900/20 p-4 border-4 border-cyan-500/50 energy-wave">
              <label className="block text-explosive font-bold mb-4 text-xl animate-quantum-vibration lightning-text">⚡ QUANTUM EMAIL ADDRESS ⚡</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                className="w-full p-6 bg-black/80 border-2 border-pulsing-cyan text-fluorescent-pink rounded-lg focus:border-electric-yellow focus:shadow-neon-yellow focus:ring-4 focus:ring-cyan-400/30 transition-all text-lg font-bold backdrop-blur-sm ultra-energy"
                placeholder="⚡ quantum.trader@matrix.com ⚡"
              />
            </div>
            
            <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-purple-900/20 via-pink-900/20 to-red-900/20 p-4 border-4 border-purple-500/50 lightning-strike">
              <label className="block text-explosive font-bold mb-4 text-xl animate-quantum-vibration lightning-text">⚡ QUANTUM PASSWORD MATRIX ⚡</label>
              <input
                type="password"
                required
                value={formData.password}
                onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                className="w-full p-6 bg-black/80 border-2 border-purple-500 text-fluorescent-pink rounded-lg focus:border-electric-yellow focus:shadow-neon-yellow focus:ring-4 focus:ring-purple-400/30 transition-all text-lg font-bold backdrop-blur-sm ultra-energy"
                placeholder="🔐••••••••••••🔐"
              />
            </div>
            
            <div className="flex items-center justify-between bg-gradient-to-r from-gray-900/30 to-black/50 p-4 rounded-xl border-2 border-gray-500/30 ultra-energy">
              <label className="flex items-center space-x-3 text-pulsing-cyan font-bold text-lg animate-neon-flicker">
                <input
                  type="checkbox"
                  checked={formData.rememberMe}
                  onChange={(e) => setFormData(prev => ({ ...prev, rememberMe: e.target.checked }))}
                  className="rounded border-pulsing-cyan w-5 h-5"
                />
                <span>⚡ Remember Quantum Session</span>
              </label>
              
              <button
                type="button"
                className="text-fluorescent-pink hover:text-electric-yellow transition-colors font-bold text-lg hover-explosion animate-energy-pulse"
              >
                🔓 Forgot Quantum Code?
              </button>
            </div>
            
            <button
              type="submit"
              className="w-full bg-energy-wave text-deep-black py-6 rounded-xl font-bold text-2xl hover-explosion transition-all ultra-energy animate-cyber-explosion btn-energy shadow-lg shadow-cyan-500/50 hover:shadow-xl hover:shadow-cyan-400/70 border-4 border-electric-yellow"
            >
              ⚡🚀 ACCESS QUANTUM PLATFORM 🚀⚡
            </button>
          </form>

          {/* Switch to Signup - SUPERCHARGED */}
          <div className="text-center ultra-energy energy-pulse">
            <div className="bg-gradient-to-r from-deep-black via-gray-900 to-deep-black p-6 rounded-xl border-2 border-fluorescent-pink/30">
              <p className="text-pulsing-cyan text-lg font-bold animate-neon-flicker">
                🚀 New to the Quantum Revolution?{' '}
                <button
                  onClick={onSwitchToSignup}
                  className="text-fluorescent-pink hover:text-electric-yellow font-bold transition-colors text-xl hover-explosion animate-quantum-vibration"
                >
                  ⚡ JOIN THE MATRIX ⚡
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}