import React, { useState } from 'react';

interface SearchProps {
  placeholder?: string;
  onSearch: (query: string) => void;
  className?: string;
}

const Search: React.FC<SearchProps> = ({ placeholder, onSearch, className }) => {
  const [query, setQuery] = useState('');
  return (
    <form
      className={`flex items-center gap-2 ${className || ''}`}
      onSubmit={e => { e.preventDefault(); onSearch(query); }}
    >
      <input
        type="text"
        className="bg-gray-800 border border-neon-pink rounded px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-neon-pink"
        placeholder={placeholder || 'Search...'}
        value={query}
        onChange={e => setQuery(e.target.value)}
      />
      <button
        type="submit"
        className="bg-neon-pink text-white px-4 py-2 rounded shadow hover:bg-pink-600"
      >
        Search
      </button>
    </form>
  );
};

export default Search;
