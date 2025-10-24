import React, { useState } from 'react';

const personalities = [
  { label: 'Republican', key: 'republican' },
  { label: 'Democrat', key: 'democrat' },
  { label: 'Liberal', key: 'liberal' },
  { label: 'Independent', key: 'independent' },
];

interface PersonalitiesDropdownProps {
  selected: string;
  onSelect: (key: string) => void;
  className?: string;
}

const PersonalitiesDropdown: React.FC<PersonalitiesDropdownProps> = ({ selected, onSelect, className }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className={`relative ${className || ''}`}>
      <button
        className="bg-gray-800 text-neon-pink px-4 py-2 rounded shadow border border-neon-pink"
        onClick={() => setOpen(o => !o)}
      >
        {personalities.find(p => p.key === selected)?.label || 'Select Personality'} <span className="ml-2">▼</span>
      </button>
      {open && (
        <ul className="absolute left-0 mt-2 w-full bg-gray-900 border border-neon-pink rounded shadow-lg z-10">
          {personalities.map(p => (
            <li
              key={p.key}
              className={`px-4 py-2 cursor-pointer hover:bg-neon-pink/20 ${p.key === selected ? 'font-bold text-neon-pink' : 'text-white'}`}
              onClick={() => { onSelect(p.key); setOpen(false); }}
            >
              {p.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PersonalitiesDropdown;
