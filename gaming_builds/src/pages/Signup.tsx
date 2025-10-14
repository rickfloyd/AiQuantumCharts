import React, { useState } from "react";
import { signupUser } from "../api/backend";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";

interface User {
    id: string;
    email: string;
    username?: string;
    avatar?: string;
}

interface Props {
  setUser: (user: User | null) => void;
}

const Signup: React.FC<Props> = ({ setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await signupUser(email, password);
      if (res?.token) {
        localStorage.setItem("token", res.token);
        setUser(res.user);
        navigate("/");
      }
    } catch (err) {
      const error = err as AxiosError<{ error: string }>;
      setError(error.response?.data?.error || "Signup failed");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12 bg-gray-800 p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">🆕 Create Account</h2>
      {error && <p className="text-red-400 mb-3">{error}</p>}
      <form onSubmit={handleSignup}>
        <input
          type="email"
          placeholder="Email"
          className="mb-3"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="mb-3"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="w-full">Sign Up</button>
      </form>
      <p className="text-sm text-gray-400 mt-4 text-center">
        Already have an account? <a href="/login" className="text-blue-400">Login</a>
      </p>
    </div>
  );
};

export default Signup;