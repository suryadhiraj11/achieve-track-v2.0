import React from "react";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container" style={{display:'flex', justifyContent:'space-between', alignItems:'center', gap:12}}>
        <div>
          <strong>AchieveTrack</strong>
          <div className="small">Showcase your journey — beyond the grades</div>
        </div>
        <div className="small">© {new Date().getFullYear()} AchieveTrack</div>
      </div>
    </footer>
  );
}
