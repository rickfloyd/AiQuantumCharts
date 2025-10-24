import { useState } from "react";
import axios from "axios";

export default function SenseiChat() {
  const [input, setInput] = useState("");
  const [chat, setChat] = useState([]);

  const send = async () => {
    const res = await axios.post("http://localhost:5000/api/sensei", {
      prompt: input,
      context: "Quantum IDE"
    });
    setChat([...chat, { me: input }, { ai: res.data.reply }]);
    setInput("");
  };

  return (
    <div className="p-6 space-y-3">
      <div className="h-96 overflow-y-auto border border-neonBlue p-2">
        {chat.map((c, i) =>
          c.me ? (
            <p key={i} className="text-neonPink">You: {c.me}</p>
          ) : (
            <p key={i} className="text-neonBlue">Sensei: {c.ai}</p>
          )
        )}
      </div>
      <div className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 bg-black border border-neonPink p-2"
          placeholder="Ask Sensei anything..."
        />
        <button onClick={send} className="bg-neonPink px-3">Send</button>
      </div>
    </div>
  );
}
