import React, { useState } from 'react';

const newsCategories = [
  { label: 'Local News', key: 'local', apiKey: '' },
  { label: 'Statewide News', key: 'statewide', apiKey: '' },
  { label: 'National News', key: 'national', apiKey: '' },
  { label: 'Financial Markets News', key: 'financial', apiKey: '' },
];

interface NewsDropdownProps {
  selected: string;
  onSelect: (key: string) => void;
  apiKeys?: { [key: string]: string };
  className?: string;
}

const NewsDropdown: React.FC<NewsDropdownProps> = ({ selected, onSelect, apiKeys, className }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className={`relative ${className || ''}`}>
      <button
        className="bg-gray-800 text-neon-pink px-4 py-2 rounded shadow border border-neon-pink"
        onClick={() => setOpen(o => !o)}
      >
        {newsCategories.find(cat => cat.key === selected)?.label || 'Select News'} <span className="ml-2">▼</span>
      </button>
      {open && (
        <ul className="absolute left-0 mt-2 w-full bg-gray-900 border border-neon-pink rounded shadow-lg z-10">
          {newsCategories.map(cat => (
            <li
              key={cat.key}
              className={`px-4 py-2 cursor-pointer hover:bg-neon-pink/20 ${cat.key === selected ? 'font-bold text-neon-pink' : 'text-white'}`}
              onClick={() => { onSelect(cat.key); setOpen(false); }}
            >
              {cat.label}
              {apiKeys && apiKeys[cat.key] && (
                <span className="ml-2 text-xs text-green-400">API Key Set</span>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default NewsDropdown;
