import React from 'react';

interface Tab {
  label: string;
  key: string;
}

interface TabsProps {
  tabs: Tab[];
  activeKey: string;
  onChange: (key: string) => void;
  className?: string;
}

const Tabs: React.FC<TabsProps> = ({ tabs, activeKey, onChange, className }) => (
  <div className={`flex gap-2 ${className || ''}`}>
    {tabs.map(tab => (
      <button
        key={tab.key}
        className={`px-4 py-2 rounded-t-lg font-semibold transition-colors
          ${activeKey === tab.key ? 'bg-neon-pink text-white shadow' : 'bg-gray-800 text-neon-pink hover:bg-neon-pink/20'}`}
        onClick={() => onChange(tab.key)}
      >
        {tab.label}
      </button>
    ))}
  </div>
);

export default Tabs;
