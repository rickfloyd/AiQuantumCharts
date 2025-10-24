        {/* VR/Metaverse Trading Portal */}
        <div className="border border-cyan-500 rounded-xl p-4 bg-black/80">
          <div className="font-bold text-cyan-300 mb-2 text-lg flex items-center gap-2">
            <span>VR Trading Portal</span>
            <span className="bg-cyan-700 text-white text-xs px-2 py-1 rounded-full">VR/AR</span>
          </div>
          <div className="mb-2 text-sm">Trade in 3D/VR—Meta, Apple, Sony, NVIDIA, and more.</div>
          <a href="/vr" className="px-3 py-1 rounded bg-cyan-600 text-white text-xs inline-block mb-2">Launch in VR</a>
          <div className="text-xs text-cyan-200">WebXR ready. Plug and play with your headset.</div>
        </div>
        {/* Fashion AI Mentor for Men */}
        <div className="border border-indigo-500 rounded-xl p-4 bg-black/80">
          <div className="font-bold text-indigo-300 mb-2 text-lg flex items-center gap-2">
            <span>Fashion AI Mentor</span>
            <span className="bg-indigo-700 text-white text-xs px-2 py-1 rounded-full">STYLE</span>
          </div>
          <div className="mb-2 text-sm">Personalized style advice for every occasion—business, dates, travel, and more.</div>
          <div className="flex flex-wrap gap-2 mb-2">
            <button className="px-3 py-1 rounded bg-indigo-600 text-white text-xs">Get Outfit Suggestion</button>
            <button className="px-3 py-1 rounded bg-pink-500 text-white text-xs">Upload Photo</button>
            <button className="px-3 py-1 rounded bg-yellow-400 text-black text-xs">Classic Suit Guide</button>
            <button className="px-3 py-1 rounded bg-green-500 text-white text-xs">Date Night Looks</button>
          </div>
          <div className="mb-2 text-xs text-indigo-200">AI curates outfits, brands, and shopping links based on your goals and budget.</div>
          <div className="mb-2 text-xs text-indigo-400">Earn points for learning about menswear, grooming, and etiquette.</div>
          <div className="text-xs text-indigo-500">Want to feature your brand or store? <a href="#" className="underline">Partner with us</a></div>
        </div>
        {/* Privacy & Discretion (Stealth Mode) */}
        <div className="border border-gray-500 rounded-xl p-4 bg-black/80">
          <div className="font-bold text-gray-200 mb-2 text-lg flex items-center gap-2">
            <span>Stealth Mode</span>
            <span className="bg-gray-700 text-white text-xs px-2 py-1 rounded-full">PRIVATE</span>
          </div>
          <div className="mb-2 text-sm">For high-profile users: maximum privacy and discretion.</div>
          <div className="flex flex-wrap gap-2 mb-2">
            <button className="px-3 py-1 rounded bg-gray-700 text-white text-xs">Enable Private Room</button>
            <button className="px-3 py-1 rounded bg-gray-900 text-cyan-300 text-xs">Anonymous Browsing</button>
            <button className="px-3 py-1 rounded bg-cyan-900 text-white text-xs">Encrypted Chat</button>
          </div>
          <div className="text-xs text-gray-400 mb-1">All activity is hidden, encrypted, and never logged. Perfect for celebrities, executives, and VIPs.</div>
          <div className="text-xs text-gray-500">Need custom privacy? <a href="#" className="underline">Contact our team</a></div>
        </div>
        {/* Gamified Achievements & Luxury Rewards */}
        <div className="border border-fuchsia-500 rounded-xl p-4 bg-black/80">
          <div className="font-bold text-fuchsia-300 mb-2 text-lg flex items-center gap-2">
            <span>Achievements & Rewards</span>
            <span className="bg-yellow-400 text-black text-xs px-2 py-1 rounded-full">NEW</span>
          </div>
          <div className="mb-2 text-sm">Earn points for trading, learning, and community engagement.</div>
          <div className="flex flex-wrap gap-2 mb-2">
            <span className="bg-fuchsia-600 text-white text-xs px-3 py-1 rounded-full">Points: <b>2,350</b></span>
            <span className="bg-yellow-300 text-black text-xs px-3 py-1 rounded-full">Badges: <b>5</b></span>
            <span className="bg-pink-400 text-white text-xs px-3 py-1 rounded-full">Level: <b>Elite</b></span>
          </div>
          <div className="mb-2 text-xs text-fuchsia-200">Redeem points for luxury goods, travel, or exclusive experiences.</div>
          <div className="flex flex-wrap gap-2 mb-2">
            <button className="px-3 py-1 rounded bg-yellow-400 text-black text-xs">Redeem: Supercar Test Drive</button>
            <button className="px-3 py-1 rounded bg-pink-500 text-white text-xs">Redeem: Private Jet Trip</button>
            <button className="px-3 py-1 rounded bg-cyan-500 text-white text-xs">Redeem: VIP Event</button>
          </div>
          <div className="text-xs text-fuchsia-400">Want to sponsor a reward? <a href="#" className="underline">Contact us</a></div>
        </div>
import React, { useState } from "react";


const defaultTiles = [
  { id: 'chart', label: 'Chart', visible: true },
  { id: 'news', label: 'News & Magazines', visible: true },
  { id: 'lifestyle', label: 'Lifestyle Feed', visible: false },
  { id: 'luxury', label: 'Luxury & Travel', visible: false },
  { id: 'food', label: 'Food Delivery', visible: false },
  { id: 'ride', label: 'Ride Share', visible: false },
  { id: 'concierge', label: 'Trader\'s Concierge', visible: false },
];


interface ModularDashboardProps {
  mode?: 'quantum' | 'classic';
  theme?: 'neon' | 'minimal';
}

export const ModularDashboard: React.FC<ModularDashboardProps> = ({ mode = 'quantum', theme = 'neon' }) => {
  const [tiles, setTiles] = useState(defaultTiles);

  const toggleTile = (id: string) => {
    setTiles(tiles => tiles.map(t => t.id === id ? { ...t, visible: !t.visible } : t));
  };

  return (
    <div className="my-8 flex flex-col items-center">
      <h2 className="text-2xl font-bold text-purple-400 mb-2">Your Modular Hub</h2>
      <div className="mb-4 flex gap-2 flex-wrap">
        {tiles.map(t => (
          <button key={t.id} className={`px-4 py-2 rounded-xl border ${t.visible ? 'bg-purple-700 text-white' : 'bg-gray-800 text-purple-300'}`} onClick={() => toggleTile(t.id)}>
            {t.label}
          </button>
        ))}
      </div>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
        {/* Social & Community Layer */}
        <div className="border border-orange-400 rounded-xl p-4 bg-black/80">
          <div className="font-bold text-orange-300 mb-2 text-lg flex items-center gap-2">
            <span>Community & Social</span>
            <span className="bg-pink-600 text-white text-xs px-2 py-1 rounded-full">LIVE</span>
          </div>
          <div className="mb-2 text-sm">Connect, chat, and learn with others in real time.</div>
          <div className="flex flex-wrap gap-2 mb-2">
            <button className="px-3 py-1 rounded bg-pink-600 text-white text-xs">Live Chat</button>
            <button className="px-3 py-1 rounded bg-cyan-600 text-white text-xs">Voice Room</button>
            <button className="px-3 py-1 rounded bg-yellow-500 text-white text-xs">Video Room</button>
            <button className="px-3 py-1 rounded bg-green-500 text-white text-xs">Mentor Marketplace</button>
          </div>
          <div className="text-xs text-orange-200 mb-1">Find mentors, join pro rooms, or network with peers. All activity is private and secure.</div>
          <div className="text-xs text-orange-400">Want to host a room or become a mentor? <a href="#" className="underline">Apply here</a></div>
        </div>
        {tiles.find(t => t.id === 'chart' && t.visible) && (
          <div className="border border-cyan-400 rounded-xl p-4 bg-black/80">[Chart Tile]</div>
        )}
        {tiles.find(t => t.id === 'news' && t.visible) && (
          <div className="border border-yellow-400 rounded-xl p-4 bg-black/80">
            <div className="font-bold text-yellow-300 mb-2">Curated News & Magazines</div>
            <ul className="text-sm mb-2">
              <li><b>GQ:</b> "The 2025 Supercar Guide"</li>
              <li><b>Vogue:</b> "AI-Driven Fashion Trends"</li>
              <li><b>Robb Report:</b> "Top 10 Luxury Destinations"</li>
              <li><b>Condé Nast Traveler:</b> "Quantum Travel: The Next Wave"</li>
            </ul>
            <div className="text-xs text-yellow-200">AI will recommend content based on your interests and trading activity.</div>
            <div className="mt-2 text-xs text-yellow-400">Want your brand featured? <a href="#" className="underline">Partner with us</a></div>
          </div>
        )}
        {tiles.find(t => t.id === 'lifestyle' && t.visible) && (
          <div className="border border-fuchsia-400 rounded-xl p-4 bg-black/80">
            <div className="font-bold text-fuchsia-300 mb-2">Lifestyle Feed</div>
            <ul className="text-sm mb-2">
              <li>"5 Must-Have Watches for 2025"</li>
              <li>"Inside the Monaco Yacht Show"</li>
              <li>"AI Curated: Trending Streetwear"</li>
            </ul>
            <div className="text-xs text-fuchsia-200">Fashion, cars, travel, and luxury content—AI personalized.</div>
            <div className="mt-2 text-xs text-fuchsia-400">Brand or influencer? <a href="#" className="underline">Apply to be featured</a></div>
          </div>
        )}
        {tiles.find(t => t.id === 'luxury' && t.visible) && (
          <div className="border border-pink-400 rounded-xl p-4 bg-black/80">
            <div className="font-bold text-pink-300 mb-2">Luxury & Travel</div>
            <ul className="text-sm mb-2">
              <li>"Book a private jet to Davos"</li>
              <li>"Test drive the new Ferrari EV"</li>
              <li>"VIP invite: Art Basel Miami"</li>
            </ul>
            <div className="text-xs text-pink-200">Book trips, test drive supercars, or get exclusive event invites as rewards.</div>
            <div className="mt-2 text-xs text-pink-400">Luxury brand? <a href="#" className="underline">Contact us for partnerships</a></div>
          </div>
        )}
        {tiles.find(t => t.id === 'food' && t.visible) && (
          <div className="border border-green-400 rounded-xl p-4 bg-black/80">
            <div className="font-bold text-green-300 mb-2">Food Delivery</div>
            <div className="mb-2 text-sm">Order your favorite food without leaving the platform.</div>
            <button className="px-3 py-1 rounded bg-green-600 text-white text-xs mb-1">Order via DoorDash</button>
            <button className="px-3 py-1 rounded bg-yellow-500 text-white text-xs ml-2 mb-1">Order via Uber Eats</button>
            <div className="mt-2 text-xs text-green-200">AI will suggest meals based on your trading schedule, mood, or market hours.</div>
            <div className="mt-2 text-xs text-green-400">Want your restaurant featured? <a href="#" className="underline">Partner with us</a></div>
          </div>
        )}
        {tiles.find(t => t.id === 'ride' && t.visible) && (
          <div className="border border-blue-400 rounded-xl p-4 bg-black/80">
            <div className="font-bold text-blue-300 mb-2">Ride Share</div>
            <div className="mb-2 text-sm">Book a ride instantly while you trade.</div>
            <button className="px-3 py-1 rounded bg-blue-600 text-white text-xs mb-1">Order Uber</button>
            <button className="px-3 py-1 rounded bg-purple-500 text-white text-xs ml-2 mb-1">Order Lyft</button>
            <div className="mt-2 text-xs text-blue-200">AI will recommend rides based on your meetings, events, or market close times.</div>
            <div className="mt-2 text-xs text-blue-400">Ride share partner? <a href="#" className="underline">Contact us</a></div>
          </div>
        )}
        {tiles.find(t => t.id === 'concierge' && t.visible) && (
          <div className="border border-cyan-400 rounded-xl p-4 bg-black/80">
            <div className="font-bold text-cyan-300 mb-2">Trader's Concierge</div>
            <div className="mb-2 text-sm">Let AI handle your food and ride needs automatically.</div>
            <button className="px-3 py-1 rounded bg-cyan-600 text-white text-xs mb-1">AI: Suggest Now</button>
            <div className="mt-2 text-xs text-cyan-200">AI will proactively suggest or order food/rides based on your stress, schedule, or market activity.</div>
          </div>
        )}
      </div>
      <div className="mt-6 text-xs text-gray-400">Mode: <b>{mode}</b> | Theme: <b>{theme}</b> | <span className="italic">Personalize your hub by toggling tiles. More integrations coming soon!</span></div>
    </div>
  );
};
