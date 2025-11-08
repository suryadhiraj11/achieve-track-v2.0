import React from "react";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

export default function AchievementCard({ ach }) {
  const { currentUser, removeAchievementFromUser } = useAuth();
  const isOwner = currentUser?.id === ach.userId || currentUser?.achievements?.some(a=>a.id===ach.id);

  const handleDelete = () => {
    if (!window.confirm("Delete this achievement?")) return;
    removeAchievementFromUser(currentUser.id, ach.id);
    toast.success("Deleted");
  };

  return (
    <motion.div className="achievement-card" whileHover={{ y:-6 }} initial={{ opacity:0 }} animate={{ opacity:1 }}>
      <div className="achievement-info">
        <h3>{ach.title}</h3>
        {ach.category && <div style={{marginTop:6}} className="achievement-category">{ach.category}</div>}
        <p className="achievement-notes">{ach.description}</p>
        <small className="achievement-date">{new Date(ach.date).toLocaleDateString()}</small>
      </div>

      <div className="achievement-actions">
        <div className={`visibility ${ach.isPublic ? "public" : "private"}`}>{ach.isPublic ? '🌍 Public' : '🔒 Private'}</div>
        {isOwner && <button className="delete-btn" onClick={handleDelete}>🗑</button>}
      </div>
    </motion.div>
  );
}
