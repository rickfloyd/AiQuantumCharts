import React, { useState } from "react";

// Global Live Collaboration Layer (voice/video chat, AI summaries)
export const LiveCollabRoom: React.FC = () => {
  const [joined, setJoined] = useState(false);
  // TODO: Integrate with real WebRTC/voice/video and AI summarization

  return (
    <div className="my-8 flex flex-col items-center">
      <h2 className="text-2xl font-bold text-yellow-400 mb-2">Live Collaboration Room</h2>
      {!joined ? (
        <button className="px-6 py-2 bg-yellow-700 text-white rounded-xl mb-4" onClick={() => setJoined(true)}>
          Join Voice/Video Room
        </button>
      ) : (
        <div className="bg-black/80 border border-yellow-400 rounded-xl p-4 text-yellow-200 w-full max-w-xl text-center">
          <div className="mb-2">[Voice/Video Chat UI Placeholder]</div>
          <div className="text-xs text-yellow-300">AI Summary: "Team discussed BTC breakout and agreed on a bullish strategy."</div>
        </div>
      )}
    </div>
  );
};
