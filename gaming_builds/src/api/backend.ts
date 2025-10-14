import axios from "axios";

const API_BASE = "http://localhost:3000";

export const api = axios.create({
  baseURL: API_BASE,
  withCredentials: true,
});

export const signupUser = async (email: string, password: string) => {
  const res = await api.post("/signup", { email, password });
  return res.data;
};

export const loginUser = async (email: string, password: string) => {
  const res = await api.post("/login", { email, password });
  return res.data;
};

export const fetchUserData = async (token: string) => {
  const res = await api.get("/me", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};