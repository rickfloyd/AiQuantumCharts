import React, { useState } from "react";

const defaultTiles = [
  { id: 'chart', label: 'Chart', visible: true },
  { id: 'news', label: 'News', visible: true },
  { id: 'food', label: 'Food Delivery', visible: false },
  { id: 'ride', label: 'Ride Share', visible: false },
  { id: 'luxury', label: 'Luxury & Travel', visible: false },
];

export const ModularDashboard: React.FC = () => {
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
        {tiles.find(t => t.id === 'chart' && t.visible) && <div className="border border-cyan-400 rounded-xl p-4 bg-black/80">[Chart Tile]</div>}
        {tiles.find(t => t.id === 'news' && t.visible) && <div className="border border-yellow-400 rounded-xl p-4 bg-black/80">[News & Magazines Tile]</div>}
        {tiles.find(t => t.id === 'food' && t.visible) && <div className="border border-green-400 rounded-xl p-4 bg-black/80">[Food Delivery Tile]</div>}
        {tiles.find(t => t.id === 'ride' && t.visible) && <div className="border border-blue-400 rounded-xl p-4 bg-black/80">[Ride Share Tile]</div>}
        {tiles.find(t => t.id === 'luxury' && t.visible) && <div className="border border-pink-400 rounded-xl p-4 bg-black/80">[Luxury & Travel Tile]</div>}
      </div>
    </div>
  );
};
