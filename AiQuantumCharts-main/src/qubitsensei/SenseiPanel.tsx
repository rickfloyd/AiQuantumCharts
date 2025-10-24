import React, { useState } from "react";

interface SenseiPanelProps {
  onSend: (msg: string) => void;
  messages: { sender: "user" | "sensei"; text: string }[];
  loading: boolean;
}

export const SenseiPanel: React.FC<SenseiPanelProps> = ({ onSend, messages, loading }) => {
  const [input, setInput] = useState("");
  return (
    <div className="flex flex-col h-full bg-gray-900 border-l border-cyan-400">
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {messages.map((m, i) => (
          <div key={i} className={m.sender === "user" ? "text-right" : "text-left"}>
            <span className={m.sender === "user" ? "bg-cyan-800 text-white px-3 py-1 rounded" : "bg-pink-800 text-white px-3 py-1 rounded"}>
              {m.text}
            </span>
          </div>
        ))}
        {loading && <div className="text-cyan-300">QubitSensei is thinking...</div>}
      </div>
      <form
        className="flex border-t border-cyan-400"
        onSubmit={e => {
          e.preventDefault();
          if (input.trim()) {
            onSend(input);
            setInput("");
          }
        }}
      >
        <input
          className="flex-1 bg-gray-800 text-white px-3 py-2 outline-none"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Ask QubitSensei anything..."
        />
        <button className="bg-cyan-600 px-4 py-2 text-white font-bold" type="submit">
          Send
        </button>
      </form>
    </div>
  );
};
