// Quantum Charts Router
// File: src/router.tsx

import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NeonTheme from "./components/NeonTheme";
import MinimalTheme from "./components/MinimalTheme";
import SportsModule from "./modules/SportsModule";
import EconomicDashboard from "./modules/EconomicDashboard";
import QuantumNode from "./modules/QuantumNode";
import EducationHub from "./modules/EducationHub";
import PersonalityTabs from "./modules/PersonalityTabs";
// Pages
import MarketsOverview from "./pages/markets/index";
import Stocks from "./pages/markets/stocks";
import Crypto from "./pages/markets/crypto";
import Futures from "./pages/markets/futures";
import SportsOverview from "./pages/sports/index";
import WorldSports from "./pages/sports/world-sports";
import SportsBetting from "./pages/sports/betting";
import ProductsOverview from "./pages/products/index";
import Tools from "./pages/products/tools";
import Courses from "./pages/products/courses";
import CommunityOverview from "./pages/community/index";
import Forum from "./pages/community/forum";
import Social from "./pages/community/social";

// Miner dashboard stubs
import MinerDashboard from "./components/miner/MinerDashboard";
import PoolManager from "./components/miner/PoolManager";
import ProfitSimulator from "./components/miner/ProfitSimulator";
import MinerCommunity from "./components/miner/MinerCommunity";
import MinerHowTo from "./components/miner/MinerHowTo";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Main and legacy routes */}
        <Route path="/" element={<NeonTheme />} />
        <Route path="/minimal" element={<MinimalTheme />} />
        <Route path="/sports" element={<SportsModule />} />
        <Route path="/economics" element={<EconomicDashboard />} />
        <Route path="/node" element={<QuantumNode />} />
        <Route path="/education" element={<EducationHub />} />
        <Route path="/personality" element={<PersonalityTabs />} />

        {/* Markets */}
        <Route path="/markets" element={<MarketsOverview />} />
        <Route path="/markets/stocks" element={<Stocks />} />
        <Route path="/markets/crypto" element={<Crypto />} />
        <Route path="/markets/futures" element={<Futures />} />

        {/* Sports */}
        <Route path="/sports/" element={<SportsOverview />} />
        <Route path="/sports/world-sports" element={<WorldSports />} />
        <Route path="/sports/betting" element={<SportsBetting />} />

        {/* Products */}
        <Route path="/products" element={<ProductsOverview />} />
        <Route path="/products/tools" element={<Tools />} />
        <Route path="/products/courses" element={<Courses />} />

        {/* Community */}
        <Route path="/community" element={<CommunityOverview />} />
        <Route path="/community/forum" element={<Forum />} />
        <Route path="/community/social" element={<Social />} />

        {/* Free Miners */}
        <Route path="/free-miners" element={
          <div className="max-w-3xl mx-auto py-8 space-y-8">
            <MinerDashboard />
            <PoolManager />
            <ProfitSimulator />
          </div>
        } />
        <Route path="/free-miners/community" element={<MinerCommunity />} />
        <Route path="/free-miners/how-to" element={<MinerHowTo />} />
      </Routes>
    </BrowserRouter>
  );
}
