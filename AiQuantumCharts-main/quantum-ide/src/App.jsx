import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import SenseiChat from "./components/SenseiChat";
import CodeEditor from "./components/CodeEditor";
import MinerPanel from "./components/MinerPanel";
import CommunityHub from "./components/CommunityHub";

export default function App() {
  return (
    <BrowserRouter>
      <nav className="p-4 flex gap-4 bg-black/80 border-b border-neonPink">
        <Link to="/">IDE</Link>
        <Link to="/chat">Sensei</Link>
        <Link to="/miner">Miner</Link>
        <Link to="/community">Community</Link>
      </nav>
      <Routes>
        <Route path="/" element={<CodeEditor />} />
        <Route path="/chat" element={<SenseiChat />} />
        <Route path="/miner" element={<MinerPanel />} />
        <Route path="/community" element={<CommunityHub />} />
      </Routes>
    </BrowserRouter>
  );
}
