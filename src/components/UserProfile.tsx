import { useState } from 'react';

interface UserProfileData {
  username: string;
  bio: string;
  location: string;
  profileMedia?: {
    type: 'image' | 'video';
    url: string;
  };
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
  stats: {
    level: string;
    reputation: number;
    winRate: number;
    totalTrades: number;
    followers: number;
    following: number;
    joinDate: Date;
  };
  badges: string[];
}

interface UserProfileProps {
  user: UserProfileData;
  isOwnProfile?: boolean;
  onFollow?: () => void;
  onMessage?: () => void;
}

export default function UserProfile({ user, isOwnProfile = false, onFollow, onMessage }: UserProfileProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'ideas' | 'activity' | 'followers'>('overview');

  const socialPlatforms = [
    { name: 'twitter', label: 'Twitter/X', icon: '𝕏', color: 'text-white', baseUrl: 'https://twitter.com/' },
    { name: 'youtube', label: 'YouTube', icon: '⏵', color: 'text-red-500', baseUrl: 'https://youtube.com/@' },
    { name: 'instagram', label: 'Instagram', icon: '⬛', color: 'text-pink-500', baseUrl: 'https://instagram.com/' },
    { name: 'tiktok', label: 'TikTok', icon: '♪', color: 'text-white', baseUrl: 'https://tiktok.com/@' },
    { name: 'linkedin', label: 'LinkedIn', icon: 'in', color: 'text-blue-600', baseUrl: 'https://linkedin.com/in/' },
    { name: 'discord', label: 'Discord', icon: '⚡', color: 'text-indigo-400', baseUrl: '' },
    { name: 'telegram', label: 'Telegram', icon: '↗', color: 'text-blue-400', baseUrl: 'https://t.me/' },
    { name: 'reddit', label: 'Reddit', icon: 'r/', color: 'text-orange-500', baseUrl: 'https://reddit.com/u/' }
  ];

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Quantum Master': return 'text-fluorescent-pink';
      case 'Elite': return 'text-electric-purple';
      case 'Pro': return 'text-neon-green';
      case 'Trader': return 'text-electric-yellow';
      default: return 'text-pulsing-cyan';
    }
  };

  return (
    <div className="min-h-screen bg-charcoal-gradient text-white p-6">
      <div className="max-w-6xl mx-auto">
        {/* Profile Header */}
        <div className="bg-deep-black border-2 border-fluorescent-pink rounded-lg p-8 shadow-neon-pink animate-pulse-glow mb-8">
          <div className="flex flex-col lg:flex-row items-start lg:items-center space-y-6 lg:space-y-0 lg:space-x-8">
            
            {/* Profile Media */}
            <div className="flex-shrink-0">
              <div className="w-32 h-32 lg:w-48 lg:h-48 rounded-lg border-4 border-pulsing-cyan shadow-neon-cyan overflow-hidden">
                {user.profileMedia ? (
                  user.profileMedia.type === 'video' ? (
                    <video 
                      src={user.profileMedia.url}
                      autoPlay
                      muted
                      loop
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <img 
                      src={user.profileMedia.url}
                      alt={`${user.username}'s profile`}
                      className="w-full h-full object-cover"
                    />
                  )
                ) : (
                  <div className="w-full h-full bg-fluorescent-gradient flex items-center justify-center">
                    <span className="text-6xl">👤</span>
                  </div>
                )}
              </div>
            </div>

            {/* Profile Info */}
            <div className="flex-1 min-w-0">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4">
                <div>
                  <h1 className="text-4xl font-bold text-fluorescent-pink mb-2">{user.username}</h1>
                  <div className="flex items-center space-x-4 mb-3">
                    <span className={`text-lg font-bold ${getLevelColor(user.stats.level)}`}>
                      {user.stats.level}
                    </span>
                    <span className="text-electric-yellow">
                      ⭐ {user.stats.reputation} Reputation
                    </span>
                    {user.location && (
                      <span className="text-pulsing-cyan">
                        📍 {user.location}
                      </span>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                {!isOwnProfile && (
                  <div className="flex space-x-3">
                    <button 
                      onClick={onFollow}
                      className="bg-neon-green text-deep-black px-6 py-2 rounded-lg font-bold hover:bg-electric-yellow transition-colors"
                    >
                      ➕ Follow
                    </button>
                    <button 
                      onClick={onMessage}
                      className="bg-pulsing-cyan text-deep-black px-6 py-2 rounded-lg font-bold hover:bg-fluorescent-pink transition-colors"
                    >
                      💬 Message
                    </button>
                  </div>
                )}

                {isOwnProfile && (
                  <button 
                    onClick={() => console.log('Edit profile functionality coming soon')}
                    className="bg-electric-orange text-deep-black px-6 py-2 rounded-lg font-bold hover:bg-fluorescent-pink transition-colors"
                  >
                    ✏️ Edit Profile
                  </button>
                )}
              </div>

              {/* Bio */}
              {user.bio && (
                <div className="bg-charcoal border border-pulsing-cyan rounded-lg p-4 mb-4">
                  <p className="text-fluorescent-pink whitespace-pre-line">{user.bio}</p>
                </div>
              )}

              {/* Stats Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-neon-green">{user.stats.winRate}%</div>
                  <div className="text-pulsing-cyan text-sm">Win Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-electric-yellow">{user.stats.totalTrades}</div>
                  <div className="text-pulsing-cyan text-sm">Total Trades</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-fluorescent-pink">{user.stats.followers}</div>
                  <div className="text-pulsing-cyan text-sm">Followers</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-electric-orange">{user.stats.following}</div>
                  <div className="text-pulsing-cyan text-sm">Following</div>
                </div>
              </div>

              {/* Badges */}
              {user.badges.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-electric-yellow font-bold mb-3">🏆 Achievements</h3>
                  <div className="flex flex-wrap gap-2">
                    {user.badges.map((badge, index) => (
                      <span 
                        key={index}
                        className="bg-fluorescent-pink text-deep-black px-3 py-1 rounded-full text-sm font-bold"
                      >
                        {badge}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Social Links */}
              <div>
                <h3 className="text-electric-yellow font-bold mb-3">🌐 Social Presence</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
                  {socialPlatforms.map((platform) => {
                    const username = user.socialLinks[platform.name as keyof typeof user.socialLinks];
                    if (!username) return null;

                    return (
                      <a
                        key={platform.name}
                        href={platform.baseUrl ? `${platform.baseUrl}${username.replace('@', '')}` : '#'}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-deep-black border border-pulsing-cyan rounded-lg p-3 hover:border-fluorescent-pink hover:shadow-neon-pink transition-all text-center group"
                      >
                        <div className="text-2xl mb-1">{platform.icon}</div>
                        <div className={`text-xs font-bold ${platform.color} group-hover:text-fluorescent-pink transition-colors`}>
                          {platform.label}
                        </div>
                        <div className="text-xs text-pulsing-cyan truncate">
                          {username}
                        </div>
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Tabs */}
        <div className="bg-deep-black border-2 border-pulsing-cyan rounded-lg shadow-neon-cyan">
          {/* Tab Navigation */}
          <div className="flex border-b border-pulsing-cyan">
            {[
              { id: 'overview', label: '📊 Overview', icon: '📊' },
              { id: 'ideas', label: '💡 Trading Ideas', icon: '💡' },
              { id: 'activity', label: '⚡ Activity', icon: '⚡' },
              { id: 'followers', label: '👥 Network', icon: '👥' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as 'overview' | 'ideas' | 'activity' | 'followers')}
                className={`px-6 py-4 font-bold transition-all ${
                  activeTab === tab.id
                    ? 'bg-fluorescent-pink text-deep-black'
                    : 'text-pulsing-cyan hover:text-fluorescent-pink hover:bg-charcoal/50'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="p-8">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-fluorescent-pink">📊 Trading Overview</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="bg-charcoal border border-neon-green rounded-lg p-6 shadow-neon-green">
                    <h4 className="text-neon-green font-bold mb-4">📈 Performance</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-pulsing-cyan">Monthly Return:</span>
                        <span className="text-neon-green font-bold">+24.7%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-pulsing-cyan">Best Trade:</span>
                        <span className="text-electric-yellow font-bold">+156%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-pulsing-cyan">Avg Hold Time:</span>
                        <span className="text-fluorescent-pink font-bold">3.2 days</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-charcoal border border-electric-yellow rounded-lg p-6 shadow-neon-yellow">
                    <h4 className="text-electric-yellow font-bold mb-4">🎯 Specializations</h4>
                    <div className="space-y-2">
                      <div className="bg-deep-black px-3 py-1 rounded text-sm">Day Trading</div>
                      <div className="bg-deep-black px-3 py-1 rounded text-sm">Crypto Analysis</div>
                      <div className="bg-deep-black px-3 py-1 rounded text-sm">Technical Analysis</div>
                    </div>
                  </div>

                  <div className="bg-charcoal border border-fluorescent-pink rounded-lg p-6 shadow-neon-pink">
                    <h4 className="text-fluorescent-pink font-bold mb-4">⏰ Activity</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-pulsing-cyan">Member Since:</span>
                        <span className="text-fluorescent-pink font-bold">
                          {user.stats.joinDate.toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-pulsing-cyan">Last Active:</span>
                        <span className="text-neon-green font-bold">Online</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-pulsing-cyan">Response Rate:</span>
                        <span className="text-electric-yellow font-bold">94%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'ideas' && (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">💡</div>
                <h3 className="text-2xl font-bold text-fluorescent-pink mb-4">Trading Ideas Coming Soon</h3>
                <p className="text-pulsing-cyan">This section will show all trading ideas shared by {user.username}</p>
              </div>
            )}

            {activeTab === 'activity' && (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">⚡</div>
                <h3 className="text-2xl font-bold text-fluorescent-pink mb-4">Activity Feed Coming Soon</h3>
                <p className="text-pulsing-cyan">Recent activity and interactions will be displayed here</p>
              </div>
            )}

            {activeTab === 'followers' && (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">👥</div>
                <h3 className="text-2xl font-bold text-fluorescent-pink mb-4">Network Coming Soon</h3>
                <p className="text-pulsing-cyan">Followers and following lists will be shown here</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}