import { useState } from "react";
import axios from "axios";

export default function CodeEditor() {
  const [code, setCode] = useState("");
  const [result, setResult] = useState("");

  const runCode = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/run-qubit", { code });
      setResult(JSON.stringify(res.data, null, 2));
    } catch {
      setResult("Error connecting to backend.");
    }
  };

  return (
    <div className="p-6 space-y-3">
      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        className="w-full h-60 bg-black text-green-400 border border-neonPink p-2"
        placeholder="Write your QubitScript here..."
      />
      <button onClick={runCode} className="bg-neonPink px-4 py-2 rounded">
        Run
      </button>
      <pre className="text-sm bg-gray-900 p-3">{result}</pre>
    </div>
  );
}
