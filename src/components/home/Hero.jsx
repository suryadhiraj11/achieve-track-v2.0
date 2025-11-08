import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-inner container">
        <div className="hero-left">
          <span className="kicker">Your achievements — beautifully organized</span>
          <motion.h1
            className="hero-title"
            initial={{ y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            Showcase your journey, <br/> beyond the grades.
          </motion.h1>

          <motion.p className="hero-sub" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
            Track awards, projects, and milestones — publish the ones you’re proud of and connect with achievers worldwide.
          </motion.p>

          <div className="hero-cta">
            <Link to="/signup" className="btn btn-primary">Get Started</Link>
            <Link to="/login" className="btn btn-ghost">Login</Link>
          </div>
        </div>

        <motion.div className="hero-card" initial={{ scale: 0.98, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.6 }}>
          <strong style={{display:'block', marginBottom:8}}>Latest from AchieveTrack</strong>
          <p style={{color:'#6b6b7a', marginBottom:8}}>Students are publishing achievements every day — share yours with the community.</p>
          <div style={{display:'flex', gap:8, alignItems:'center'}}>
            <div style={{width:40,height:40,borderRadius:10, background:'linear-gradient(90deg,var(--accent-1),var(--accent-2))', color:'#fff', display:'flex', alignItems:'center', justifyContent:'center', fontWeight:800}}>SS</div>
            <div>
              <div style={{fontWeight:700}}>Samira S.</div>
              <div style={{fontSize:13, color:'#6b6b7a'}}>Published - Hackathon Winner</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
