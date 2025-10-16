import { useState } from 'react';

interface UserData {
  username: string;
  bio: string;
  location: string;
  profileMedia: File | null;
  socialLinks: {
    twitter: string;
    youtube: string;
    instagram: string;
    tiktok: string;
    linkedin: string;
    discord: string;
    telegram: string;
    reddit: string;
  };
}

interface SignupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (userData: UserData) => void;
}

export default function SignupModal({ isOpen, onClose, onSuccess }: SignupModalProps) {
  const [currentStep, setCurrentStep] = useState<'signup' | 'profile'>('signup');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    username: '',
    bio: '',
    location: '',
    profileImage: null as File | null,
    profileVideo: null as File | null,
    socialLinks: {
      twitter: '',
      youtube: '',
      instagram: '',
      tiktok: '',
      linkedin: '',
      discord: '',
      telegram: '',
      reddit: ''
    }
  });
  
  const [dragActive, setDragActive] = useState(false);
  const [previewType, setPreviewType] = useState<'image' | 'video' | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');

  const socialPlatforms = [
    { name: 'twitter', label: 'Twitter/X', icon: '𝕏', color: 'text-white' },
    { name: 'youtube', label: 'YouTube', icon: '⏵', color: 'text-red-500' },
    { name: 'instagram', label: 'Instagram', icon: '⬛', color: 'text-pink-500' },
    { name: 'tiktok', label: 'TikTok', icon: '♪', color: 'text-white' },
    { name: 'linkedin', label: 'LinkedIn', icon: 'in', color: 'text-blue-600' },
    { name: 'discord', label: 'Discord', icon: '⚡', color: 'text-indigo-400' },
    { name: 'telegram', label: 'Telegram', icon: '↗', color: 'text-blue-400' },
    { name: 'reddit', label: 'Reddit', icon: 'r/', color: 'text-orange-500' }
  ];

  const handleFileUpload = (file: File) => {
    const isVideo = file.type.startsWith('video/');
    const isImage = file.type.startsWith('image/');
    
    if (isVideo) {
      setFormData(prev => ({ ...prev, profileVideo: file, profileImage: null }));
      setPreviewType('video');
    } else if (isImage) {
      setFormData(prev => ({ ...prev, profileImage: file, profileVideo: null }));
      setPreviewType('image');
    }
    
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const handleSocialSignup = (provider: string) => {
    // Simulate social login
    console.log(`Signing up with ${provider}`);
    setCurrentStep('profile');
  };

  const handleEmailSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    setCurrentStep('profile');
  };

  const handleProfileComplete = (e: React.FormEvent) => {
    e.preventDefault();
    const userData = {
      username: formData.username,
      bio: formData.bio,
      location: formData.location,
      profileMedia: formData.profileImage || formData.profileVideo,
      socialLinks: formData.socialLinks
    };
    onSuccess(userData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-deep-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4 particle-field">
      <div className="bg-deep-black border-4 border-fluorescent-pink rounded-lg shadow-neon-pink max-w-4xl w-full max-h-[90vh] overflow-y-auto ultra-energy animate-cyber-explosion">
        
        {/* Header */}
        <div className="bg-energy-wave p-8 border-b-4 border-electric-yellow animate-energy-pulse">
          <div className="flex justify-between items-center">
            <h2 className="text-4xl font-bold text-deep-black text-explosive animate-quantum-vibration">
              {currentStep === 'signup' ? '⚡◢ JOIN THE QUANTUM REVOLUTION ◣⚡' : '▲⚡ CUSTOMIZE YOUR QUANTUM PROFILE ⚡▲'}
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
              🔥 MAXIMUM ENERGY MODE ACTIVATED 🔥
            </div>
          </div>
        </div>

        <div className="p-8">
          {currentStep === 'signup' && (
            <div className="space-y-8">
              {/* Social Signup Options */}
              <div>
                <h3 className="text-3xl font-bold text-energy mb-8 text-center animate-cyber-explosion">
                  ⚡◥ LIGHTNING FAST SOCIAL SIGNUP ◤⚡
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
                  <button 
                    onClick={() => handleSocialSignup('google')}
                    className="bg-deep-black border-2 border-pulsing-cyan text-white p-6 rounded-xl hover-explosion transition-all flex items-center justify-center space-x-3 font-bold text-lg animate-energy-pulse hover-lightning ultra-energy"
                  >
                    <span className="text-3xl animate-energy-orb">G</span>
                    <span className="text-energy">GOOGLE POWER</span>
                  </button>
                  
                  <button 
                    onClick={() => handleSocialSignup('facebook')}
                    className="bg-deep-black border-2 border-blue-500 text-white p-6 rounded-xl hover-explosion transition-all flex items-center justify-center space-x-3 font-bold text-lg animate-power-surge hover-lightning ultra-energy"
                  >
                    <span className="text-3xl animate-energy-orb">f</span>
                    <span className="text-energy">FACEBOOK BLAST</span>
                  </button>
                  
                  <button 
                    onClick={() => handleSocialSignup('twitter')}
                    className="bg-deep-black border-2 border-blue-400 text-white p-6 rounded-xl hover-explosion transition-all flex items-center justify-center space-x-3 font-bold text-lg animate-neon-flicker hover-lightning ultra-energy"
                  >
                    <span className="text-3xl animate-energy-orb">𝕏</span>
                    <span className="text-energy">X MATRIX</span>
                  </button>
                  
                  <button 
                    onClick={() => handleSocialSignup('apple')}
                    className="bg-deep-black border-2 border-gray-400 text-white p-6 rounded-xl hover-explosion transition-all flex items-center justify-center space-x-3 font-bold text-lg animate-quantum-vibration hover-lightning ultra-energy"
                  >
                    <span className="text-3xl animate-energy-orb">🍎</span>
                    <span className="text-energy">APPLE STORM</span>
                  </button>
                  
                  <button 
                    onClick={() => handleSocialSignup('discord')}
                    className="bg-deep-black border-2 border-indigo-500 text-white p-6 rounded-xl hover-explosion transition-all flex items-center justify-center space-x-3 font-bold text-lg animate-energy-pulse hover-lightning ultra-energy"
                  >
                    <span className="text-3xl animate-energy-orb">⚡</span>
                    <span className="text-energy">DISCORD FURY</span>
                  </button>
                  
                  <button 
                    onClick={() => handleSocialSignup('github')}
                    className="bg-deep-black border-2 border-gray-600 text-white p-6 rounded-xl hover-explosion transition-all flex items-center justify-center space-x-3 font-bold text-lg animate-cyber-explosion hover-lightning ultra-energy"
                  >
                    <span className="text-3xl animate-energy-orb">⚡</span>
                    <span className="text-energy">GITHUB LIGHTNING</span>
                  </button>
                </div>
              </div>

              {/* Divider */}
              <div className="flex items-center my-8">
                <div className="flex-1 h-1 bg-energy-wave animate-lightning-strike"></div>
                <span className="px-6 text-explosive font-bold text-2xl animate-quantum-vibration">⚡ OR ⚡</span>
                <div className="flex-1 h-1 bg-energy-wave animate-lightning-strike"></div>
              </div>

              {/* Email Signup Form */}
              <div className="bg-quantum-matrix p-8 rounded-xl border-2 border-neon-green animate-power-surge">
                <h3 className="text-3xl font-bold text-energy mb-8 text-center animate-neon-flicker">
                  🔥📧 HARDCORE EMAIL REGISTRATION 📧🔥
                </h3>
                
                <form onSubmit={handleEmailSignup} className="space-y-8">
                  <div className="ultra-energy">
                    <label className="block text-explosive font-bold mb-3 text-lg animate-quantum-vibration">⚡ QUANTUM EMAIL ADDRESS ⚡</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full p-6 bg-deep-black border-4 border-pulsing-cyan text-fluorescent-pink rounded-xl focus:border-electric-yellow focus:shadow-neon-yellow transition-all text-lg font-bold animate-power-surge hover-lightning"
                      placeholder="⚡ quantum.master@universe.com"
                    />
                  </div>
                  
                  <div className="ultra-energy">
                    <label className="block text-explosive font-bold mb-3 text-lg animate-quantum-vibration">🔐 MAXIMUM SECURITY PASSWORD 🔐</label>
                    <input
                      type="password"
                      required
                      value={formData.password}
                      onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                      className="w-full p-6 bg-deep-black border-4 border-pulsing-cyan text-fluorescent-pink rounded-xl focus:border-electric-yellow focus:shadow-neon-yellow transition-all text-lg font-bold animate-power-surge hover-lightning"
                      placeholder="🔥••••••••••••🔥"
                    />
                  </div>
                  
                  <div className="ultra-energy">
                    <label className="block text-explosive font-bold mb-3 text-lg animate-quantum-vibration">🛡️ CONFIRM ULTRA PASSWORD 🛡️</label>
                    <input
                      type="password"
                      required
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                      className="w-full p-6 bg-deep-black border-4 border-pulsing-cyan text-fluorescent-pink rounded-xl focus:border-electric-yellow focus:shadow-neon-yellow transition-all text-lg font-bold animate-power-surge hover-lightning"
                      placeholder="⚡••••••••••••⚡"
                    />
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full bg-energy-wave text-deep-black py-6 rounded-xl font-bold text-2xl animate-cyber-explosion hover-explosion transition-all ultra-energy btn-energy"
                  >
                    ⚡◢ UNLEASH QUANTUM POWER ◣⚡
                  </button>
                </form>
              </div>
            </div>
          )}

          {currentStep === 'profile' && (
            <form onSubmit={handleProfileComplete} className="space-y-8">
              {/* Username - SUPERCHARGED */}
              <div className="ultra-energy cyber-explosion">
                <label className="block text-explosive font-bold mb-4 text-2xl animate-quantum-vibration lightning-text">
                  ⚡🎯 CHOOSE YOUR QUANTUM USERNAME 🎯⚡
                </label>
                <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-pink-900/20 via-purple-900/20 to-blue-900/20 p-2 border-4 border-fluorescent-pink/50 energy-pulse">
                  <input
                    type="text"
                    required
                    value={formData.username}
                    onChange={(e) => setFormData(prev => ({ ...prev, username: e.target.value }))}
                    className="w-full p-6 bg-black/80 border-2 border-fluorescent-pink/50 text-fluorescent-pink rounded-lg focus:border-electric-yellow focus:shadow-neon-yellow focus:ring-4 focus:ring-pink-400/30 transition-all text-2xl font-bold backdrop-blur-sm ultra-energy"
                    placeholder="⚡ QuantumTrader2025 ⚡"
                  />
                  <div className="absolute top-2 right-2 text-sm text-pink-300 font-bold animate-pulse">🎯 REQUIRED 🎯</div>
                </div>
                <p className="text-pulsing-cyan text-lg font-bold mt-4 animate-neon-flicker">
                  ◢ THIS WILL BE YOUR LEGENDARY IDENTITY IN THE QUANTUM COMMUNITY! ◣
                </p>
              </div>

              {/* Profile Media Upload - SUPERCHARGED */}
              <div className="ultra-energy cyber-explosion">
                <label className="block text-explosive font-bold mb-4 text-2xl animate-quantum-vibration lightning-text">
                  ⚡🎥 QUANTUM PROFILE MEDIA UPLOAD 🎥⚡
                </label>
                
                <div 
                  className={`border-4 border-dashed rounded-xl p-10 text-center transition-all ultra-energy energy-wave ${
                    dragActive 
                      ? 'border-fluorescent-pink bg-fluorescent-pink/20 animate-cyber-explosion' 
                      : 'border-pulsing-cyan hover:border-fluorescent-pink animate-energy-pulse'
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  {previewUrl ? (
                    <div className="space-y-6">
                      <div className="relative">
                        {previewType === 'video' ? (
                          <video 
                            src={previewUrl} 
                            controls 
                            className="max-w-sm mx-auto rounded-xl border-4 border-fluorescent-pink shadow-lg shadow-fluorescent-pink/50 quantum-vibration"
                          />
                        ) : (
                          <img 
                            src={previewUrl} 
                            alt="Preview" 
                            className="max-w-sm mx-auto rounded-xl border-4 border-fluorescent-pink shadow-lg shadow-fluorescent-pink/50 quantum-vibration"
                          />
                        )}
                        <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-green-400 to-cyan-400 rounded-full animate-pulse border-4 border-white"></div>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setPreviewUrl('');
                          setPreviewType(null);
                          setFormData(prev => ({ ...prev, profileImage: null, profileVideo: null }));
                        }}
                        className="bg-hot-pink text-deep-black px-6 py-3 rounded-xl font-bold text-lg hover:bg-fluorescent-pink transition-all hover-explosion ultra-energy animate-power-surge"
                      >
                        ⚡🗑️ QUANTUM DELETE 🗑️⚡
                      </button>
                    </div>
                  ) : (
                    <div className="energy-pulse">
                      <div className="text-8xl mb-6 animate-energy-orb">📸⚡🎬</div>
                      <p className="text-fluorescent-pink font-bold text-2xl mb-4 animate-neon-flicker">
                        🚀 DRAG & DROP OR CLICK TO UNLEASH 🚀
                      </p>
                      <p className="text-pulsing-cyan text-lg font-bold">
                        ⚡ Images: JPG, PNG, GIF | Videos: MP4, WebM (Max 50MB) ⚡
                      </p>
                      <input
                        type="file"
                        accept="image/*,video/*"
                        onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0])}
                        className="hidden"
                        id="fileInput"
                      />
                      <label
                        htmlFor="fileInput"
                        className="inline-block mt-6 bg-energy-wave text-deep-black px-8 py-4 rounded-xl font-bold text-xl cursor-pointer hover-explosion transition-all ultra-energy animate-cyber-explosion btn-energy"
                      >
                        ⚡📁 QUANTUM FILE SELECT 📁⚡
                      </label>
                    </div>
                  )}
                </div>
              </div>

              {/* Bio Section - SUPERCHARGED */}
              <div className="ultra-energy energy-pulse">
                <label className="block text-explosive font-bold mb-4 text-2xl animate-quantum-vibration lightning-text">
                  ⚡📝 UNLIMITED QUANTUM BIO MATRIX 📝⚡
                </label>
                <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-purple-900/20 via-pink-900/20 to-cyan-900/20 p-2 border-4 border-purple-500/50 cyber-explosion">
                  <textarea
                    value={formData.bio}
                    onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
                    rows={8}
                    className="w-full p-6 bg-black/80 border-2 border-purple-500/50 text-fluorescent-pink rounded-lg focus:border-electric-yellow focus:shadow-neon-yellow focus:ring-4 focus:ring-purple-400/30 transition-all resize-y text-lg font-bold backdrop-blur-sm ultra-energy"
                    placeholder="�⚡ UNLEASH YOUR QUANTUM TRADING STORY... MAXIMUM ENERGY! NO LIMITS! ⚡🔥

🚀 EXAMPLE QUANTUM BIO:
• 🚀 5+ years of EXPLOSIVE crypto trading experience
• ⚡ Specialized in technical analysis and QUANTUM momentum trading  
• 💎 Generated 340% LEGENDARY returns in 2024
• 🔥 Love helping new traders DOMINATE the markets
• ⚡ Always hunting for the next QUANTUM opportunity
• 🌟 Living the ENERGY lifestyle - trades with MAXIMUM POWER
• 💰 From $1K to $100K in 6 months using QUANTUM strategies
• 🎯 My motto: GO BIG OR GO QUANTUM! ⚡🚀💎"
                  />
                  <div className="absolute top-2 right-2 text-sm text-purple-300 font-bold animate-pulse">∞ UNLIMITED POWER ∞</div>
                </div>
                <div className="flex justify-between text-lg mt-4 font-bold">
                  <span className="text-pulsing-cyan animate-neon-flicker">🚀 EXPRESS YOURSELF WITHOUT LIMITS! 🚀</span>
                  <span className="text-electric-yellow animate-energy-pulse">{formData.bio.length} ⚡ QUANTUM CHARACTERS ⚡</span>
                </div>
              </div>

              {/* Location - SUPERCHARGED */}
              <div className="ultra-energy lightning-strike">
                <label className="block text-explosive font-bold mb-4 text-2xl animate-quantum-vibration lightning-text">
                  ⚡🌍 QUANTUM LOCATION COORDINATES 🌍⚡
                </label>
                <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-blue-900/20 via-cyan-900/20 to-teal-900/20 p-2 border-4 border-cyan-500/50 energy-wave">
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                    className="w-full p-6 bg-black/80 border-2 border-cyan-500/50 text-fluorescent-pink rounded-lg focus:border-electric-yellow focus:shadow-neon-yellow focus:ring-4 focus:ring-cyan-400/30 transition-all font-bold text-lg backdrop-blur-sm ultra-energy"
                    placeholder="⚡ New York Quantum Zone | Tokyo Energy Hub | London Power Center ⚡"
                  />
                  <div className="absolute top-2 right-2 text-sm text-cyan-300 font-bold animate-pulse">🌍 OPTIONAL 🌍</div>
                </div>
              </div>

              {/* Social Media Links - SUPERCHARGED */}
              <div className="ultra-energy cyber-explosion">
                <label className="block text-explosive font-bold mb-6 text-2xl animate-quantum-vibration lightning-text">
                  ⚡🌐 QUANTUM SOCIAL NETWORK MATRIX 🌐⚡
                </label>
                <p className="text-pulsing-cyan mb-8 text-lg font-bold animate-neon-flicker">
                  🚀 CONNECT YOUR SOCIAL PROFILES TO BUILD TRUST AND DOMINATE THE QUANTUM COMMUNITY! 🚀
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {socialPlatforms.map((platform) => (
                    <div key={platform.name} className="space-y-3 bg-gradient-to-br from-gray-900/30 via-black/50 to-gray-800/30 rounded-xl p-4 border-2 border-gray-500/30 hover:border-gray-400/70 hover:shadow-lg hover:shadow-gray-500/30 transition-all duration-300 ultra-energy energy-pulse">
                      <div className="flex items-center space-x-4">
                        <div className="relative">
                          <span className="text-3xl animate-energy-orb">{platform.icon}</span>
                          <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-green-400 to-cyan-400 rounded-full animate-ping"></div>
                        </div>
                        <span className={`font-bold text-lg ${platform.color} animate-quantum-vibration`}>{platform.label} QUANTUM</span>
                      </div>
                      <input
                        type="text"
                        value={formData.socialLinks[platform.name as keyof typeof formData.socialLinks]}
                        onChange={(e) => setFormData(prev => ({
                          ...prev,
                          socialLinks: {
                            ...prev.socialLinks,
                            [platform.name]: e.target.value
                          }
                        }))}
                        className="w-full p-4 bg-black/70 border-2 border-gray-500/50 text-fluorescent-pink rounded-lg focus:border-electric-yellow focus:shadow-neon-yellow focus:ring-2 focus:ring-yellow-400/50 transition-all font-bold text-lg ultra-energy"
                        placeholder={`⚡ @your${platform.name}quantum ⚡`}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Submit Button - SUPERCHARGED */}
              <div className="text-center pt-8">
                <button
                  type="submit"
                  className="bg-energy-wave text-deep-black px-16 py-6 rounded-xl font-bold text-3xl hover-explosion transition-all ultra-energy animate-cyber-explosion btn-energy shadow-lg shadow-cyan-500/50 hover:shadow-xl hover:shadow-cyan-400/70 border-4 border-electric-yellow"
                >
                  ⚡🚀💎 UNLEASH QUANTUM PROFILE POWER 💎🚀⚡
                </button>
                <div className="mt-4 text-explosive font-bold text-lg animate-neon-flicker">
                  🔥 MAXIMUM ENERGY MODE: ACTIVATED 🔥
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}