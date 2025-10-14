import React, { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";

interface Game {
  id: number;
  name: string;
  platform: string;
  playtime: number;
  last_played: string;
}

const Games: React.FC = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/games/all");
        setGames(res.data);
      } catch (err) {
        const error = err as AxiosError<{ error: string }>;
        setError(error.message || "Failed to load games.");
      } finally {
        setLoading(false);
      }
    };
    fetchGames();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading games...</p>;
  if (error) return <p className="text-center text-red-400 mt-10">{error}</p>;

  return (
    <div className="mt-10 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center">🎮 Your Game Library</h2>
      {games.length === 0 ? (
        <p className="text-gray-400 text-center">No games found. Connect your accounts to load your library.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {games.map((game) => (
            <div key={game.id} className="bg-gray-800 p-4 rounded-lg shadow-md hover:shadow-lg transition">
              <h3 className="text-xl font-semibold">{game.name}</h3>
              <p className="text-sm text-gray-400">Platform: {game.platform}</p>
              <p className="text-sm text-gray-400">Playtime: {game.playtime} hrs</p>
              <p className="text-sm text-gray-500">Last Played: {new Date(game.last_played).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Games;