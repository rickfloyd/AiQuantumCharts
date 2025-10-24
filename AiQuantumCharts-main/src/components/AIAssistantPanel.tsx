import React, { useState } from "react";
import styles from "./AIAssistantPanel.module.css";

export const AIAssistantPanel: React.FC = () => {
  const [messages, setMessages] = useState([
    { sender: "ai", text: "Hi! Ask me anything about your chart." }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const send = async () => {
    if (!input.trim()) return;
    setMessages([...messages, { sender: "user", text: input }]);
    setLoading(true);
    // TODO: Call backend AI API
    setTimeout(() => {
      setMessages(msgs => [...msgs, { sender: "ai", text: "[AI response goes here]" }]);
      setLoading(false);
    }, 1000);
    setInput("");
  };

  return (
    <div className="fixed bottom-4 right-4 w-96 bg-black/90 border border-pink-400 rounded-xl shadow-lg z-50 flex flex-col">
      <div className="p-3 border-b border-pink-400 font-bold text-pink-300">AI Chart Assistant</div>
  <div className={`flex-1 p-3 overflow-y-auto space-y-2 ${styles.aiAssistantMessages}`}> 
        {messages.map((m, i) => (
          <div key={i} className={m.sender === "ai" ? "text-cyan-200" : "text-white text-right"}>{m.text}</div>
        ))}
        {loading && <div className="text-cyan-400">Thinking...</div>}
      </div>
      <div className="flex border-t border-pink-400">
        <input
          className="flex-1 bg-transparent px-3 py-2 outline-none text-white"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && send()}
          placeholder="Ask about this chart..."
        />
        <button className="px-4 py-2 text-pink-400 font-bold" onClick={send} disabled={loading}>Send</button>
      </div>
    </div>
  );
};
