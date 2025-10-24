import React, { useState } from 'react';
import Card from './Card';
import Tabs from './Tabs';
import Dropdown from './Dropdown';
import NewsDropdown from './NewsDropdown';
import PersonalitiesDropdown from './PersonalitiesDropdown';

const tabOptions = [
  { label: 'Markets', key: 'markets' },
  { label: 'Portfolio', key: 'portfolio' },
  { label: 'Mining', key: 'mining' },
  { label: 'Community', key: 'community' },
];

const dropdownOptions = ['All', 'Crypto', 'Stocks', 'Forex', 'Sports'];

const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('markets');
  const [dropdown, setDropdown] = useState(dropdownOptions[0]);
  // const [search, setSearch] = useState('');
  const [newsCategory, setNewsCategory] = useState('local');
  const [personality, setPersonality] = useState('republican');
  const [apiKeys, setApiKeys] = useState<{ [key: string]: string }>({
    local: '',
    statewide: '',
    national: '',
    financial: '',
  });
  const [newsArticles, setNewsArticles] = useState<Array<{ title: string; url: string; source?: string }>>([]);

  // Example API endpoints (replace with real ones)
  const newsEndpoints: { [key: string]: string } = {
    local: 'https://newsapi.org/v2/top-headlines?country=us&category=general',
    statewide: 'https://newsapi.org/v2/top-headlines?country=us&category=general',
    national: 'https://newsapi.org/v2/top-headlines?country=us',
    financial: 'https://newsapi.org/v2/top-headlines?category=business',
  };

  // Fetch news when category or API key changes
  React.useEffect(() => {
    const fetchNews = async () => {
      const apiKey = apiKeys[newsCategory];
      if (!apiKey) {
        // Show mock data if no API key
        setNewsArticles([
          { title: 'Sample Local News Headline', url: '#', source: 'Local News' },
          { title: 'Sample Statewide News Headline', url: '#', source: 'Statewide News' },
          { title: 'Sample National News Headline', url: '#', source: 'National News' },
          { title: 'Sample Financial News Headline', url: '#', source: 'Financial Markets News' },
        ]);
        return;
      }
      try {
        const endpoint = newsEndpoints[newsCategory] + `&apiKey=${apiKey}`;
        const res = await fetch(endpoint);
        const data = await res.json();
        if (data.articles) {
          setNewsArticles(
            data.articles.map((a: any) => ({
              title: a.title,
              url: a.url,
              source: a.source?.name || '',
            }))
          );
        } else {
          setNewsArticles([]);
        }
      } catch (err) {
        setNewsArticles([]);
      }
    };
    fetchNews();
  }, [newsCategory, apiKeys]);

  // Mock data for cards
  const cards = [
    { title: 'BTC/USD', value: '$67,000', icon: '₿' },
    { title: 'ETH/USD', value: '$3,200', icon: 'Ξ' },
    { title: 'AAPL', value: '$180.50', icon: '🍏' },
    { title: 'Mining Hashrate', value: '1.2 GH/s', icon: '⛏️' },
  ];

  return (
    <div className="p-6 bg-gradient-to-br from-gray-900 via-black to-gray-800 min-h-screen">
      <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
        <Tabs tabs={tabOptions} activeKey={activeTab} onChange={setActiveTab} />
        <Dropdown options={dropdownOptions} value={dropdown} onChange={setDropdown} className="ml-auto" />
  {/* <Search onSearch={setSearch} className="w-full md:w-64" /> */}
      </div>
      {/* Personalities Section */}
      <div className="mb-8">
        <h2 className="text-neon-pink text-xl font-bold mb-2">Personalities</h2>
        <PersonalitiesDropdown selected={personality} onSelect={setPersonality} />
        {/* Future: Filter or display content based on selected personality */}
      </div>
      {/* News Section */}
      <div className="mb-8">
        <h2 className="text-neon-pink text-xl font-bold mb-2">News</h2>
        <NewsDropdown selected={newsCategory} onSelect={setNewsCategory} apiKeys={apiKeys} />
        {/* API Key input for demo purposes */}
        <div className="mt-2 flex gap-2 items-center">
          <label htmlFor="apiKeyInput" className="text-white text-sm">API Key:</label>
          <input
            id="apiKeyInput"
            type="text"
            className="bg-gray-800 border border-neon-pink rounded px-2 py-1 text-white w-64"
            placeholder={`Enter ${newsCategory} API Key`}
            value={apiKeys[newsCategory]}
            onChange={e => setApiKeys(keys => ({ ...keys, [newsCategory]: e.target.value }))}
          />
        </div>
        <ul className="mt-4 space-y-2">
          {newsArticles.length === 0 && (
            <li className="text-gray-400">No news articles found.</li>
          )}
          {newsArticles.map((article, idx) => (
            <li key={idx} className="bg-gray-800/80 border-l-4 border-neon-pink p-3 rounded shadow">
              <a href={article.url} target="_blank" rel="noopener noreferrer" className="text-neon-pink font-semibold hover:underline">
                {article.title}
              </a>
              {article.source && <span className="ml-2 text-xs text-gray-400">{article.source}</span>}
            </li>
          ))}
        </ul>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {cards.map(card => (
          <Card key={card.title} title={card.title} value={card.value} icon={card.icon as React.ReactNode} />
        ))}
      </div>
      {/* Add more dashboard sections here as needed */}
    </div>
  );
};

export default Dashboard;
