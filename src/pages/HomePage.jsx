import React from "react";
import { useAuth } from "../context/AuthContext";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import Hero from "../components/home/Hero";
import About from "../components/home/About";
import Features from "../components/home/Features";
import AchievementsPanel from "../components/achievements/AchievementsPanel";

/**
 * HomePage: shows marketing landing when logged out,
 * shows Dashboard (AchievementsPanel) when logged in.
 */
export default function HomePage() {
  const { currentUser } = useAuth();

  return (
    <>
      <Header />
      <main style={{paddingTop:72}}>
        {!currentUser ? (
          <>
            <Hero />
            <About />
            <Features />
          </>
        ) : (
          <AchievementsPanel />
        )}
      </main>
      <Footer />
    </>
  );
}
