import React, { useState, useEffect } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button, Box, Container } from "@mui/material";
import ConnectController from "./bluetooth/ConnectController";
import AgeVerification from "./components/AgeVerification";

// Pages
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Games from "./pages/Games";
import Achievements from "./pages/Achievements";
import Friends from "./pages/Friends";

const API_BASE = "http://localhost:3000";

interface User {
  id: string;
  email: string;
  username?: string;
  avatar?: string;
}

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isAgeVerified, setIsAgeVerified] = useState<boolean>(false);
  const [isCheckingAge, setIsCheckingAge] = useState<boolean>(true);
  const navigate = useNavigate();

  // Check age verification on app start
  useEffect(() => {
    const checkAgeVerification = () => {
      const ageVerified = localStorage.getItem('age_verified');
      const ageVerifiedDate = localStorage.getItem('age_verified_date');
      
      if (ageVerified === 'true' && ageVerifiedDate) {
        // Check if verification is still valid (24 hours)
        const verificationDate = new Date(ageVerifiedDate);
        const currentDate = new Date();
        const timeDiff = currentDate.getTime() - verificationDate.getTime();
        const hoursDiff = timeDiff / (1000 * 3600);
        
        if (hoursDiff < 24) {
          setIsAgeVerified(true);
        } else {
          // Clear expired verification
          localStorage.removeItem('age_verified');
          localStorage.removeItem('age_verified_date');
        }
      }
      setIsCheckingAge(false);
    };

    checkAgeVerification();
  }, []);

  const handleAgeVerified = () => {
    setIsAgeVerified(true);
  };

  const handleLogout = () => {
    setUser(null);
    navigate("/login");
  };

  const oauthLogin = (platform: string) => {
    window.location.href = `${API_BASE}/auth/${platform}`;
  };

  // Show loading while checking age verification
  if (isCheckingAge) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  // Show age verification if not verified
  if (!isAgeVerified) {
    return <AgeVerification onVerified={handleAgeVerified} />;
  }

  return (
    <>
      <Navbar user={user} onLogout={handleLogout} />

      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/signup" element={<Signup setUser={setUser} />} />
          <Route path="/games" element={<Games />} />
          <Route path="/achievements" element={<Achievements />} />
          <Route path="/friends" element={<Friends />} />
        </Routes>

        {/* OAuth Connect Section */}
        <Box sx={{ mt: 6, textAlign: "center" }}>
          <Typography variant="h5" sx={{ mb: 2 }}>Connect Your Platforms</Typography>
          <Box sx={{ display: "flex", gap: 2, justifyContent: "center", flexWrap: "wrap" }}>
            <Button variant="contained" color="primary" onClick={() => oauthLogin("xbox")}>Connect Xbox</Button>
            <Button variant="contained" color="secondary" onClick={() => oauthLogin("steam")}>Connect Steam</Button>
            <Button variant="contained" sx={{ backgroundColor: "#9146FF", color: "#fff" }} onClick={() => oauthLogin("epic")}>Connect Epic</Button>
            <Button variant="outlined" disabled>PlayStation (Coming Soon)</Button>
          </Box>
        </Box>

        {/* Bluetooth Pairing Section */}
        <Box sx={{ mt: 8 }}>
          <Typography variant="h5" sx={{ mb: 2 }}>🎮 Connect a Bluetooth Controller</Typography>
          <ConnectController />
        </Box>
      </Container>
    </>
  );
};

export default App;

// -----------------------------------------------------------
// 🧭 NAVBAR COMPONENT
// -----------------------------------------------------------

const Navbar: React.FC<{ user: User | null; onLogout: () => void }> = ({ user, onLogout }) => {
  return (
    <AppBar position="static" sx={{ backgroundColor: "#111" }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          🎮 Complete Gaming Portal
        </Typography>
        <Button color="inherit" component={Link} to="/">Dashboard</Button>
        <Button color="inherit" component={Link} to="/games">Games</Button>
        <Button color="inherit" component={Link} to="/achievements">Achievements</Button>
        <Button color="inherit" component={Link} to="/friends">Friends</Button>

        {user ? (
          <Button color="error" onClick={onLogout}>Logout</Button>
        ) : (
          <>
            <Button color="inherit" component={Link} to="/login">Login</Button>
            <Button color="inherit" component={Link} to="/signup">Signup</Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};