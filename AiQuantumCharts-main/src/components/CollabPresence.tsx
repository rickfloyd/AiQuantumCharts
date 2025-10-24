import React from "react";

// Simple presence indicator for collaborative charting
export const CollabPresence: React.FC<{ users: string[] }> = ({ users }) => (
  <div className="absolute top-2 right-2 bg-black/70 px-3 py-1 rounded-xl border border-cyan-400 text-cyan-200 text-sm flex items-center gap-2 z-10">
    <span className="font-bold">Online:</span>
    {users.length === 0 ? <span>No one</span> : users.map(u => <span key={u}>{u}</span>)}
  </div>
);
