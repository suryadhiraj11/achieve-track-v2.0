import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import useLocalStorage from "../../hooks/useLocalStorage";
import toast from "react-hot-toast";

export default function PostCard({ post, showControls=false }) {
  const { currentUser, removeAchievement } = useAuth();
  const [feed, setFeed] = useLocalStorage("ach_feed", []);
  const [likes, setLikes] = useState(post.likes || 0);
  const [comments, setComments] = useState(post.comments || []);
  const [commentText, setCommentText] = useState("");

  const handleLike = () => {
    setLikes(l => l + 1);
    // update feed item if present
    setFeed(prev => prev.map(f => f.id === post.id ? {...f, likes: (f.likes||0)+1} : f));
  };

  const handleComment = () => {
    if (!commentText.trim()) return;
    const c = { id: Date.now(), text: commentText.trim(), user: currentUser ? currentUser.name : "Guest", date: new Date().toISOString() };
    setComments(prev => [...prev, c]);
    setCommentText("");
    setFeed(prev => prev.map(f => f.id === post.id ? {...f, comments: [...(f.comments||[]), c]} : f));
  };

  const handleDelete = () => {
    if (!window.confirm("Delete this post?")) return;

    removeAchievement(post.id);
    toast.success("Deleted");
  };

  const isOwner = currentUser?.id === post.userId;

  return (
    <div className="post-card fade-up">
      <div className="post-top">
        <div style={{width:48,height:48,borderRadius:10,background:'linear-gradient(90deg,var(--accent),var(--accent-2))',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:700}}>
          {post.userName.split(" ").map(s=>s[0]).slice(0,2).join("")}
        </div>
        <div style={{flex:1}}>
          <div className="post-meta">
            <div style={{display:'flex',alignItems:'center',gap:8}}>
              <div className="post-title">{post.title || "Achievement"}</div>
              <div className="small muted">• {post.category}</div>
            </div>
            <div className="small muted">{new Date(post.date).toLocaleString()}</div>
          </div>
        </div>
        {isOwner && <button className="icon-btn" onClick={handleDelete}>Delete</button>}
      </div>

      {post.text && <div className="post-body">{post.text}</div>}
      {post.image && <div className="post-media"><img src={post.image} alt="post" /></div>}

      <div className="post-actions">
        <button className="icon-btn" onClick={handleLike}>👍 Like <span className="small muted" style={{marginLeft:6}}>{likes}</span></button>
        <button className="icon-btn" onClick={()=>{ const el = document.getElementById(`comment-${post.id}`); if(el) el.focus(); }}>💬 Comment <span className="small muted" style={{marginLeft:6}}>{comments.length}</span></button>
      </div>

      <div className="comments">
        {comments.map(c => (
          <div className="comment" key={c.id}>
            <div className="av">{c.user.split(" ").map(s=>s[0]).slice(0,2).join("")}</div>
            <div className="text">
              <div style={{fontWeight:700}}>{c.user}</div>
              <div style={{fontSize:13, color:'var(--white)'}}>{c.text}</div>
              <div className="small muted" style={{marginTop:6}}>{new Date(c.date).toLocaleString()}</div>
            </div>
          </div>
        ))}

        <div style={{display:'flex',gap:8, marginTop:10}}>
          <input id={`comment-${post.id}`} className="input" placeholder="Write a comment..." value={commentText} onChange={(e)=>setCommentText(e.target.value)} />
          <button className="btn btn-primary" onClick={handleComment}>Send</button>
        </div>
      </div>
    </div>
  );
}
