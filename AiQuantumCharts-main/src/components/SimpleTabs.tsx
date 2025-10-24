import React, { useState } from 'react';

const SimpleTabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'analysis', label: 'Analysis' },
    { id: 'signals', label: 'Signals' },
  ];

  return (
    <div className="mb-8">
      <div className="flex space-x-2 border-b border-pink-900/30 mb-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 font-semibold text-sm transition-all ${
              activeTab === tab.id
                ? 'text-pink-400 border-b-2 border-pink-400'
                : 'text-gray-500 hover:text-pink-300'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="text-gray-300">
        {activeTab === 'overview' && (
          <p>Market overview and key metrics for the selected asset.</p>
        )}
        {activeTab === 'analysis' && (
          <p>Technical analysis and AI-powered insights.</p>
        )}
        {activeTab === 'signals' && (
          <p>Trading signals and quantum predictions.</p>
        )}
      </div>
    </div>
  );
};

export default SimpleTabs;
