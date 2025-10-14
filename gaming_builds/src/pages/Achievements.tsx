import React, { useEffect, useState } from "react";
import axios from "axios";

interface Achievement {
  id: number;
  platform: string;
  game_id: string;
  name: string;
  unlocked: boolean;
  unlocked_at: string;
}

const Achievements: React.FC = () => {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/achievements/all");
        setAchievements(res.data);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : "Failed to load achievements.");
      } finally {
        setLoading(false);
      }
    };
    fetchAchievements();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading achievements...</p>;
  if (error) return <p className="text-center text-red-400 mt-10">{error}</p>;

  return (
    <div className="mt-10 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center">🏆 Achievements</h2>
      {achievements.length === 0 ? (
        <p className="text-gray-400 text-center">No achievements found. Start playing to unlock them!</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {achievements.map((ach) => (
            <div
              key={ach.id}
              className={`p-4 rounded-lg shadow-md transition ${
                ach.unlocked ? "bg-green-800" : "bg-gray-800"
              }`}
            >
              <h3 className="text-lg font-semibold">{ach.name}</h3>
              <p className="text-sm text-gray-400">Platform: {ach.platform}</p>
              <p className="text-sm text-gray-400">Game ID: {ach.game_id}</p>
              <p className="text-sm text-gray-400">
                Status: {ach.unlocked ? "✅ Unlocked" : "🔒 Locked"}
              </p>
              {ach.unlocked && (
                <p className="text-sm text-gray-500">
                  Unlocked At: {new Date(ach.unlocked_at).toLocaleDateString()}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Achievements;