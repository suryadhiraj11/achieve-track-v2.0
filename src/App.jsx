import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext.jsx";

import ProgressPage from "./pages/ProgressPage"; // at the top
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import Explore from "./components/explore/Explore";
import AchievementsPanel from "./components/achievements/AchievementsPanel";
import ProfilePage from "./pages/ProfilePage";
import HomePage from "./pages/HomePage";
import Navbar from "./components/layout/Navbar";

function AppRoutes() {
  const { currentUser } = useAuth();

  return (
    <>
      {currentUser && <Navbar />}

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected Routes */}
        {currentUser ? (
          <>
            <Route path="/progress" element={<ProgressPage />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/achievements" element={<AchievementsPanel />} />
            <Route path="/profile" element={<ProfilePage />} />
          </>
        ) : (
          <>
            

            <Route path="/explore" element={<Navigate to="/login" />} />
            <Route path="/achievements" element={<Navigate to="/login" />} />
            <Route path="/profile" element={<Navigate to="/login" />} />
          </>
        )}

        {/* 404 fallback */}
        <Route path="*" element={<h2 style={{ textAlign: "center" }}>404 Page Not Found</h2>} />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}
