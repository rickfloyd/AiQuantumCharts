// © Quantum Charts – Political News Module
// File: src/modules/PersonalityTabs.tsx

import { useState, useEffect } from "react";
import { republicanSources } from "../components/Personalities/republicanSources";
import { democratSources } from "../components/Personalities/democratSources";
import { liberalSources } from "../components/Personalities/liberalSources";
import { independentSources } from "../components/Personalities/independentSources";
      {/* Independent Sources List */}
      {active === "independent" && (
        <div className="mb-10">
          <h2 className="text-2xl text-green-400 font-bold mb-3">Top Independent News & Commentary</h2>
          <ul className="grid md:grid-cols-2 gap-2">
            {independentSources.map((src) => (
              <li key={src.name}>
                <a
                  href={src.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block px-4 py-2 rounded bg-gray-900 border border-green-500 hover:bg-green-900 hover:text-white transition"
                >
                  {src.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
      {/* Liberal Sources List */}
      {active === "liberal" && (
        <div className="mb-10">
          <h2 className="text-2xl text-purple-400 font-bold mb-3">Top Liberal News & Commentary</h2>
          <ul className="grid md:grid-cols-2 gap-2">
            {liberalSources.map((src) => (
              <li key={src.name}>
                <a
                  href={src.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block px-4 py-2 rounded bg-gray-900 border border-purple-500 hover:bg-purple-900 hover:text-white transition"
                >
                  {src.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

interface Article {
  title: string;
  link: string;
  source_id: string;
  pubDate: string;
}

export default function PersonalityTabs() {
  const [tabs] = useState([
    { id: "republican", label: "Republican", color: "from-red-500 to-pink-600", query: "republican" },
    { id: "democrat", label: "Democrat", color: "from-blue-500 to-cyan-600", query: "democrat" },
    { id: "liberal", label: "Liberal", color: "from-purple-500 to-fuchsia-600", query: "liberal" },
    { id: "independent", label: "Independent", color: "from-green-500 to-teal-600", query: "independent" },
  ]);
  const [active, setActive] = useState<string>("republican");
  const [articles, setArticles] = useState<Article[]>([]);
  const API = "pub_7720545ede49aae44760ca989d86f285fb19a";

  async function loadNews(q: string) {
    try {
      const res = await fetch(
        `https://newsdata.io/api/1/news?apikey=${API}&q=${q}&language=en`
      );
      const data = await res.json();
      setArticles(data.results || []);
    } catch (err) {
      console.error("News API error:", err);
    }
  }

  useEffect(() => {
    const tab = tabs.find((t) => t.id === active);
    if (tab) loadNews(tab.query);
  }, [active]);

  return (
    <div className="min-h-screen bg-black text-white p-10">
      <h1 className="text-5xl font-bold text-pink-500 mb-8 drop-shadow-[0_0_10px_#ff00ff]">
        📰 Political Personality Feed
      </h1>

      <div className="flex gap-6 mb-10 flex-wrap">
        {tabs.map((t: { id: string; label: string; color: string }) => (
          <button
            key={t.id}
            onClick={() => setActive(t.id)}
            className={`px-6 py-2 rounded-xl text-white font-semibold transition-all duration-300 ${
              active === t.id
                ? `bg-gradient-to-r ${t.color} shadow-[0_0_20px_rgba(255,255,255,0.3)]`
                : "bg-black border border-gray-700 hover:border-cyan-400"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Republican Sources List */}
      {active === "republican" && (
        <div className="mb-10">
          <h2 className="text-2xl text-red-400 font-bold mb-3">Top Republican News & Commentary</h2>
          <ul className="grid md:grid-cols-2 gap-2">
            {republicanSources.map((src) => (
              <li key={src.name}>
                <a
                  href={src.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block px-4 py-2 rounded bg-gray-900 border border-red-500 hover:bg-red-900 hover:text-white transition"
                >
                  {src.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Democrat Sources List */}
      {active === "democrat" && (
        <div className="mb-10">
          <h2 className="text-2xl text-blue-400 font-bold mb-3">Top Democrat News & Commentary</h2>
          <ul className="grid md:grid-cols-2 gap-2">
            {democratSources.map((src) => (
              <li key={src.name}>
                <a
                  href={src.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block px-4 py-2 rounded bg-gray-900 border border-blue-500 hover:bg-blue-900 hover:text-white transition"
                >
                  {src.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="grid lg:grid-cols-2 gap-6">
        {articles.length === 0 ? (
          <p className="text-gray-400">Loading articles for {active}...</p>
        ) : (
          articles.map((a: Article, i: number) => (
            <a
              key={i}
              href={a.link}
              target="_blank"
              rel="noopener noreferrer"
              className="block p-5 border border-cyan-400 rounded-xl hover:scale-105 transition-all duration-300 shadow-[0_0_15px_#00ffff]"
            >
             <h2 className="text-xl text-cyan-300 font-bold mb-1">
              {a.title}
             </h2>
             <p className="text-sm text-gray-400">
              {a.source_id} • {new Date(a.pubDate).toLocaleString()}
             </p>
            </a>
          ))
        )}
      </div>
    </div>
  );
}
