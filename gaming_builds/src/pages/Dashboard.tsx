import React, { useEffect, useState } from "react";
import { fetchUserData } from "../api/backend";

interface UserData {
  id: string;
  email: string;
  username?: string;
  avatar?: string;
  created_at: string;
}

const Dashboard: React.FC = () => {
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetchUserData(token)
        .then(setUserData)
        .catch((err) => console.error("Failed to fetch user data:", err));
    }
  }, []);

  return (
    <div className="mt-8 text-center">
      <h1 className="text-3xl font-bold mb-4">🎮 Welcome to Your Gaming Portal</h1>
      {userData ? (
        <div>
          <p className="text-lg">Hello, {userData.email}</p>
          <p className="text-sm text-gray-400 mt-2">Member since: {new Date(userData.created_at).toLocaleDateString()}</p>
        </div>
      ) : (
        <p className="text-gray-400">Log in to view your gaming data.</p>
      )}
    </div>
  );
};

export default Dashboard;