import React, { useEffect, useState } from "react";
import axios from "axios";
import SendTestEmail from "../components/SendTestEmail";

export default function AuthCallback() {
  const [status, setStatus] = useState("Loading...");
  const [accessToken, setAccessToken] = useState("");
  const [provider, setProvider] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");
    const prov = params.get("provider");
    if (!code || !prov) {
      setStatus("Missing code or provider in URL");
      return;
    }
    setProvider(prov);
    axios
      .get(`/auth/callback?code=${encodeURIComponent(code)}&provider=${encodeURIComponent(prov)}`)
      .then(res => {
        setAccessToken(res.data.accessToken);
        setStatus("Success! Access token received.");
      })
      .catch(err => {
        setStatus("Error: " + (err.response?.data?.error || err.message));
      });
  }, []);

  return (
    <div className="p-10 text-white bg-black min-h-screen">
      <h1 className="text-2xl font-bold mb-4 text-cyan-400">OAuth Callback</h1>
      <p>{status}</p>
      {accessToken && (
        <div className="mt-4">
          <div className="font-mono text-xs break-all">Access Token: {accessToken}</div>
          <SendTestEmail provider={provider} accessToken={accessToken} />
        </div>
      )}
    </div>
  );
}
