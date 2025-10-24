import { useState } from "react";

export function useSensei() {
  const [messages, setMessages] = useState<{ sender: "user" | "sensei"; text: string }[]>([]);
  const [loading, setLoading] = useState(false);

  async function send(msg: string) {
    setMessages(m => [...m, { sender: "user", text: msg }]);
    setLoading(true);
    // Call backend endpoint (to be implemented)
    const res = await fetch("/api/ai/assist", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: msg })
    });
    const data = await res.json();
    setMessages(m => [...m, { sender: "sensei", text: data.reply }]);
    setLoading(false);
  }

  return { messages, send, loading };
}
