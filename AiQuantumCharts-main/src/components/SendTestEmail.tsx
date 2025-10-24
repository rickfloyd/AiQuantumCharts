import React, { useState } from "react";
import axios from "axios";

export default function SendTestEmail({ provider, accessToken }: { provider: string; accessToken: string }) {
  const [status, setStatus] = useState("");

  const handleSend = async () => {
    setStatus("Sending...");
    try {
      await axios.post("/auth/send-test-email", { provider, accessToken });
      setStatus("✅ Test email sent!");
    } catch (err: any) {
      setStatus("❌ Error: " + (err.response?.data?.error || err.message));
    }
  };

  return (
    <div className="mt-6">
      <button
        className="px-4 py-2 bg-pink-600 hover:bg-pink-400 rounded-lg text-white font-bold"
        onClick={handleSend}
      >
        Send Test Email
      </button>
      {status && <div className="mt-2 text-sm">{status}</div>}
    </div>
  );
}
