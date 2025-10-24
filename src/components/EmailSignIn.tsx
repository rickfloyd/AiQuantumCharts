import React from "react";
import { emailProviders } from "../authProviders";

export default function EmailSignIn() {
  return (
    <div className="p-8 bg-black text-white rounded-xl shadow-lg max-w-xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-6 text-pink-400">Sign in to Email</h2>
      <div className="flex flex-wrap gap-4">
        {emailProviders.map((p) => (
          <button
            key={p.name}
            className="px-4 py-2 bg-cyan-800 hover:bg-cyan-600 rounded-lg font-semibold shadow border border-cyan-400"
            onClick={() => {
              const url = `${p.authUrl}?client_id=${p.clientId}&redirect_uri=${encodeURIComponent(p.redirectUri)}&response_type=code&scope=${encodeURIComponent(p.scopes.join(" "))}`;
              window.open(url, "_blank");
            }}
          >
            Sign in with {p.name}
          </button>
        ))}
      </div>
    </div>
  );
}
