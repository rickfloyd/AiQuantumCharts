import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Define the structure for a personality/source
interface Personality {
  name: string;
  category: string;
  rssFeedUrl: string;
  leaning: 'Republican' | 'Democrat';
  logoUrl?: string; // Optional: for displaying logos
}

// Define the structure for a single news item from the feed
interface FeedItem {
  title: string;
  link: string;
  pubDate: string;
  contentSnippet?: string;
  isoDate?: string;
}

// List of personalities based on your request
const personalities: Personality[] = [
  // Republican Leaning
  { name: 'Fox News', category: 'News Network', rssFeedUrl: 'http://feeds.foxnews.com/foxnews/latest', leaning: 'Republican' },
  { name: 'The Daily Wire', category: 'Commentary', rssFeedUrl: 'https://www.dailywire.com/feeds/rss.xml', leaning: 'Republican' },
  { name: 'Newsmax', category: 'News Network', rssFeedUrl: 'https://www.newsmax.com/rss/Major-News/1/', leaning: 'Republican' },
  { name: 'Breitbart News', category: 'News & Opinion', rssFeedUrl: 'http://feeds.breitbart.com/breitbart', leaning: 'Republican' },
  { name: 'The Wall Street Journal', category: 'Business News', rssFeedUrl: 'https://feeds.a.dj.com/rss/RSSWorldNews.xml', leaning: 'Republican' },
  { name: 'The Joe Rogan Experience', category: 'Podcast', rssFeedUrl: 'https://joeroganexp.libsyn.com/rss', leaning: 'Republican' }, // Note: This is a podcast feed
  { name: 'The New York Post', category: 'Newspaper', rssFeedUrl: 'https://nypost.com/feed/', leaning: 'Republican' },
  { name: 'The Dispatch', category: 'Commentary', rssFeedUrl: 'https://thedispatch.com/feed', leaning: 'Republican' },
  { name: 'Forbes', category: 'Business News', rssFeedUrl: 'https://www.forbes.com/real-time/feed2/', leaning: 'Republican' },
  { name: 'Fox Business', category: 'Business News', rssFeedUrl: 'http://feeds.foxbusiness.com/foxbusiness/latest', leaning: 'Republican' },
  { name: 'RedState', category: 'Political Blog', rssFeedUrl: 'https://redstate.com/feed', leaning: 'Republican' },
  { name: 'The Washington Times', category: 'Newspaper', rssFeedUrl: 'https://www.washingtontimes.com/rss/headlines/news/', leaning: 'Republican' },
  { name: 'PJ Media', category: 'Commentary', rssFeedUrl: 'https://pjmedia.com/feed/', leaning: 'Republican' },
  { name: 'Townhall', category: 'News & Opinion', rssFeedUrl: 'https://townhall.com/rss/columnists/', leaning: 'Republican' },
  { name: 'The Blaze', category: 'Media Network', rssFeedUrl: 'https://www.theblaze.com/feeds/rss', leaning: 'Republican' },

  // Democrat Leaning
  { name: 'CNN', category: 'News Network', rssFeedUrl: 'http://rss.cnn.com/rss/cnn_topstories.rss', leaning: 'Democrat' },
  { name: 'The New York Times', category: 'Newspaper', rssFeedUrl: 'https://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml', leaning: 'Democrat' },
  { name: 'MSNBC', category: 'News Network', rssFeedUrl: 'http://www.msnbc.com/feeds/latest', leaning: 'Democrat' },
  { name: 'The Washington Post', category: 'Newspaper', rssFeedUrl: 'http://feeds.washingtonpost.com/rss/politics', leaning: 'Democrat' },
  { name: 'NPR', category: 'Public Radio', rssFeedUrl: 'https://feeds.npr.org/1001/rss.xml', leaning: 'Democrat' },
  { name: 'PBS', category: 'Public Television', rssFeedUrl: 'https://www.pbs.org/newshour/feeds/rss/headlines', leaning: 'Democrat' },
  { name: 'ABC News', category: 'Broadcast Network', rssFeedUrl: 'https://abcnews.go.com/abcnews/topstories', leaning: 'Democrat' },
  { name: 'NBC News', category: 'Broadcast Network', rssFeedUrl: 'http://feeds.nbcnews.com/nbcnews/public/news', leaning: 'Democrat' },
  { name: 'CBS News', category: 'Broadcast Network', rssFeedUrl: 'https://www.cbsnews.com/latest/rss/main', leaning: 'Democrat' },
  { name: 'BBC News', category: 'International Broadcast', rssFeedUrl: 'http://feeds.bbci.co.uk/news/world/us_and_canada/rss.xml', leaning: 'Democrat' },
  { name: 'The Associated Press', category: 'News Agency', rssFeedUrl: 'https://apnews.com/hub/ap-top-news/rss.xml', leaning: 'Democrat' },
  { name: 'The Atlantic', category: 'Magazine', rssFeedUrl: 'https://www.theatlantic.com/feed/all/', leaning: 'Democrat' },
  { name: 'HuffPost', category: 'Website/Blog', rssFeedUrl: 'https://www.huffpost.com/section/front-page/feed', leaning: 'Democrat' },
  { name: 'Vox', category: 'Website/Blog', rssFeedUrl: 'https://www.vox.com/rss/index.xml', leaning: 'Democrat' },
];

const republicanPersonalities = personalities.filter(p => p.leaning === 'Republican');
const democratPersonalities = personalities.filter(p => p.leaning === 'Democrat');

const Personalities: React.FC = () => {
  const [selectedPersonality, setSelectedPersonality] = useState<Personality | null>(republicanPersonalities[0]);
  const [activeTab, setActiveTab] = useState<'Republican' | 'Democrat'>('Republican');
  const [feed, setFeed] = useState<FeedItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (selectedPersonality) {
      fetchFeed(selectedPersonality.rssFeedUrl);
    }
  }, [selectedPersonality]);

  const fetchFeed = async (feedUrl: string) => {
    setIsLoading(true);
    setError(null);
    try {
      // We will create this backend endpoint next
      const response = await axios.get('/api/personalities/feed', {
        params: { url: feedUrl },
      });
      setFeed(response.data.items);
    } catch (err) {
      setError('Failed to fetch the news feed. The backend service may not be running or the feed URL is invalid.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-full bg-gray-900 text-white">
      {/* Sidebar with the list of personalities */}
      <aside className="w-1/4 bg-gray-800 p-4 overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">Personalities</h2>
        
        <div className="flex border-b border-gray-700 mb-4">
          <button 
            className={`flex-1 py-2 text-sm font-semibold ${activeTab === 'Republican' ? 'text-white border-b-2 border-blue-500' : 'text-gray-400'}`}
            onClick={() => setActiveTab('Republican')}
          >
            Republican
          </button>
          <button 
            className={`flex-1 py-2 text-sm font-semibold ${activeTab === 'Democrat' ? 'text-white border-b-2 border-blue-500' : 'text-gray-400'}`}
            onClick={() => setActiveTab('Democrat')}
          >
            Democrat
          </button>
        </div>

        <ul>
          {(activeTab === 'Republican' ? republicanPersonalities : democratPersonalities).map((p) => (
            <li
              key={p.name}
              className={`p-2 rounded cursor-pointer ${selectedPersonality?.name === p.name ? 'bg-blue-600' : 'hover:bg-gray-700'}`}
              onClick={() => setSelectedPersonality(p)}
            >
              <div className="font-semibold">{p.name}</div>
              <div className="text-sm text-gray-400">{p.category}</div>
            </li>
          ))}
        </ul>
      </aside>

      {/* Main content area for displaying the feed */}
      <main className="w-3/4 p-6 overflow-y-auto">
        {selectedPersonality && (
          <h1 className="text-3xl font-bold mb-6">Feed for {selectedPersonality.name}</h1>
        )}

        {isLoading && <p>Loading feed...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {!isLoading && !error && (
          <div className="space-y-4">
            {feed.map((item, index) => (
              <a
                key={index}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
              >
                <h3 className="text-lg font-semibold text-blue-400">{item.title}</h3>
                <p className="text-sm text-gray-400 mt-1">{new Date(item.pubDate).toLocaleString()}</p>
                <p className="text-gray-300 mt-2">{item.contentSnippet}</p>
              </a>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Personalities;
