import React from "react";

// Sentiment & News AI Fusion: overlays for real-time market mood
export const SentimentNewsOverlay: React.FC<{ sentiment: string; news: string[] }> = ({ sentiment, news }) => (
  <div className="absolute top-16 left-1/2 -translate-x-1/2 bg-black/80 border border-yellow-400 rounded-xl px-6 py-3 z-40 text-yellow-200 w-[32rem] max-w-full">
    <div className="font-bold text-yellow-300 mb-2">Market Sentiment: <span className="text-lg">{sentiment}</span></div>
    <ul className="list-disc pl-6 text-sm">
      {news.map((n, i) => <li key={i}>{n}</li>)}
    </ul>
  </div>
);
