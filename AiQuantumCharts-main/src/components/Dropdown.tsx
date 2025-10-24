import React, { useState } from 'react';

interface DropdownProps {
  options: string[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

const Dropdown: React.FC<DropdownProps> = ({ options, value, onChange, className }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className={`relative ${className || ''}`}>
      <button
        className="bg-gray-800 text-neon-pink px-4 py-2 rounded shadow border border-neon-pink"
        onClick={() => setOpen(o => !o)}
      >
        {value} <span className="ml-2">▼</span>
      </button>
      {open && (
        <ul className="absolute left-0 mt-2 w-full bg-gray-900 border border-neon-pink rounded shadow-lg z-10">
          {options.map(opt => (
            <li
              key={opt}
              className={`px-4 py-2 cursor-pointer hover:bg-neon-pink/20 ${opt === value ? 'font-bold text-neon-pink' : 'text-white'}`}
              onClick={() => { onChange(opt); setOpen(false); }}
            >
              {opt}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
