import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { motion } from "framer-motion";

export default function Header() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <>
      <header className="app-header">
        <div className="inner container">
          <div style={{display:'flex', alignItems:'center', gap:14}}>
            <Link to="/" className="brand" style={{textDecoration:'none'}}>
              <span className="logo-dot" />
              <span>AchieveTrack</span>
            </Link>

            <nav className="app-nav">
              <Link to="/" className="nav-link">Home</Link>
              <Link to="/explore" className="nav-link">Explore</Link>
            </nav>
          </div>

          <div style={{display:'flex', alignItems:'center', gap:12}}>
            <input className="search-input" placeholder="Search achievements or people" />

            {currentUser ? (
              <div style={{position:'relative'}}>
                <motion.button
                  className="avatar-btn"
                  onClick={() => setOpen(!open)}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="avatar">{currentUser.name.split(" ").map(n=>n[0]).slice(0,2).join("")}</div>
                  <div style={{textAlign:'left'}}>
                    <div style={{fontSize:13, fontWeight:800}}>{currentUser.name.split(" ")[0]}</div>
                    <div style={{fontSize:12, color:'#6b6b7a'}}>@{currentUser.email.split("@")[0]}</div>
                  </div>
                </motion.button>

                {open && (
                  <motion.div
                    className="dropdown-menu"
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                  >
                    <Link to={`/profile/${currentUser.id}`} onClick={()=>setOpen(false)}>View Profile</Link>
                    <Link to="/explore" onClick={()=>setOpen(false)}>Explore</Link>
                    <button
                      onClick={() => {
                        setOpen(false);
                        handleLogout();
                      }}
                      className="dropdown-btn"
                      style={{
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        width: "100%",
                        textAlign: "left",
                        padding: "10px 14px",
                        fontWeight: "600",
                      }}
                    >
                      Logout
                    </button>
                  </motion.div>
                )}
              </div>
            ) : (
              <>
                <Link to="/login" className="nav-link">Login</Link>
                <Link to="/signup" className="btn btn-primary" style={{textDecoration:'none'}}>Sign up</Link>
              </>
            )}
          </div>
        </div>
      </header>
      <div className="header-space" />
    </>
  );
}
