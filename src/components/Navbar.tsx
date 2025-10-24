import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-[rgba(0,0,0,0.85)] border-b border-cyan-400 flex justify-between items-center px-10 py-4 z-50 relative">
      <h1 className="text-2xl font-bold text-pink-500">Quantum Charts</h1>
      <div className="flex gap-6 items-center">
        <Link to="/" className="hover:text-cyan-300">Home</Link>

        {/* Markets Dropdown */}
        <div className="relative group">
          <button className="hover:text-cyan-300 focus:outline-none">Markets ▾</button>
          <div className="absolute left-0 mt-2 w-44 bg-black border border-cyan-400 rounded shadow-lg opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-200 pointer-events-none group-hover:pointer-events-auto z-50">
            <Link to="/markets" className="block px-4 py-2 hover:bg-cyan-900">Overview</Link>
            <Link to="/markets/stocks" className="block px-4 py-2 hover:bg-cyan-900">Stocks</Link>
            <Link to="/markets/crypto" className="block px-4 py-2 hover:bg-cyan-900">Crypto</Link>
            <Link to="/markets/futures" className="block px-4 py-2 hover:bg-cyan-900">Futures</Link>
          </div>
        </div>

        {/* Sports Dropdown */}
        <div className="relative group">
          <button className="hover:text-fuchsia-300 focus:outline-none">Sports ▾</button>
          <div className="absolute left-0 mt-2 w-44 bg-black border border-fuchsia-400 rounded shadow-lg opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-200 pointer-events-none group-hover:pointer-events-auto z-50">
            <Link to="/sports" className="block px-4 py-2 hover:bg-fuchsia-900">Overview</Link>
            <Link to="/sports/world-sports" className="block px-4 py-2 hover:bg-fuchsia-900">World Sports</Link>
            <Link to="/sports/betting" className="block px-4 py-2 hover:bg-fuchsia-900">Betting</Link>
          </div>
        </div>

        {/* Products Dropdown */}
        <div className="relative group">
          <button className="hover:text-orange-300 focus:outline-none">Products ▾</button>
          <div className="absolute left-0 mt-2 w-44 bg-black border border-orange-400 rounded shadow-lg opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-200 pointer-events-none group-hover:pointer-events-auto z-50">
            <Link to="/products" className="block px-4 py-2 hover:bg-orange-900">Overview</Link>
            {/* Uncomment if subpages exist
            <Link to="/products/ai-products" className="block px-4 py-2 hover:bg-orange-900">AI Products</Link>
            <Link to="/products/quantum-products" className="block px-4 py-2 hover:bg-orange-900">Quantum Products</Link>
            */}
          </div>
        </div>

        {/* Community Dropdown */}
        <div className="relative group">
          <button className="hover:text-pink-300 focus:outline-none">Community ▾</button>
          <div className="absolute left-0 mt-2 w-44 bg-black border border-pink-400 rounded shadow-lg opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-200 pointer-events-none group-hover:pointer-events-auto z-50">
            <Link to="/community" className="block px-4 py-2 hover:bg-pink-900">Overview</Link>
            {/* Uncomment if subpages exist
            <Link to="/community/forums" className="block px-4 py-2 hover:bg-pink-900">Forums</Link>
            <Link to="/community/events" className="block px-4 py-2 hover:bg-pink-900">Events</Link>
            */}
          </div>
        </div>


        {/* Free Miners Dropdown */}
        <div className="relative group">
          <button className="hover:text-yellow-300 font-semibold focus:outline-none">Free Miners ▾</button>
          <div className="absolute left-0 mt-2 w-52 bg-black border border-yellow-400 rounded shadow-lg opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-200 pointer-events-none group-hover:pointer-events-auto z-50">
            <Link to="/free-miners" className="block px-4 py-2 hover:bg-yellow-900">Dashboard</Link>
            <Link to="/free-miners/community" className="block px-4 py-2 hover:bg-yellow-900">Community</Link>
            <Link to="/free-miners/how-to" className="block px-4 py-2 hover:bg-yellow-900">How To</Link>
          </div>
        </div>

        <Link to="/economics" className="hover:text-blue-300">Economics</Link>
        <Link to="/node" className="hover:text-cyan-400">Quantum Node</Link>
        <Link to="/education" className="hover:text-green-300">Education</Link>
        <Link to="/personality" className="hover:text-pink-300">Personality</Link>
        <Link to="/about" className="hover:text-cyan-300">About</Link>
      </div>
    </nav>
  );
}
