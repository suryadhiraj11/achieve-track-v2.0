// src/pages/Explore.jsx
import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import AddAchievementForm from "../achievements/AddAchievementForm";
import "../../style.css";
import toast from "react-hot-toast";

export default function Explore() {
  const {
    feed,
    currentUser,
    toggleLike,
    addComment,
    removeAchievementFromUser,
  } = useAuth();

  const [showForm, setShowForm] = useState(false);
  const [commentText, setCommentText] = useState({});

  const publicFeed = Array.isArray(feed)
    ? feed.filter((post) => post.visibility === "public")
    : [];

  const handleDelete = (post) => {
    if (!currentUser) {
      toast.error("You must be logged in to delete.");
      return;
    }
    const ok = window.confirm("Delete this achievement? This cannot be undone.");
    if (!ok) return;

    removeAchievementFromUser(currentUser.id, post.id);
    toast.success("Deleted");
  };

  return (
    <section className="explore-section">
      <div className="container">
        {/* Header */}
        <div className="feed-header">
          <h2 className="feed-title">🌍 Explore Achievements</h2>
          {currentUser && (
            <button
              className="btn-primary add-btn"
              onClick={() => setShowForm((s) => !s)}
            >
              {showForm ? "Close ✖️" : "➕ Share Achievement"}
            </button>
          )}
        </div>

        {/* Add Achievement Form */}
        {showForm && (
          <div className="glass-form fade-up">
            <AddAchievementForm />
          </div>
        )}

        {/* Empty Feed */}
        {publicFeed.length === 0 && (
          <p className="empty-feed">Be the first to inspire others 💡</p>
        )}

        {/* Feed */}
        <div className="feed-grid">
          {publicFeed.map((post) => {
            const isLiked = post.likes?.includes(currentUser?.id);
            const likeCount = post.likes?.length || 0;

            const isOwner =
              currentUser?.id === post.userId ||
              currentUser?.achievements?.some((a) => a.id === post.id);

            return (
              <article key={post.id} className="post-card fade-up">
                {/* Header */}
                <div className="post-header">
                  <img
                    src={post.userAvatar}
                    alt={post.userName}
                    className="post-avatar"
                  />
                  <div>
                    <h4 className="username">{post.userName}</h4>
                    <p className="date">
                      {new Date(post.date).toLocaleDateString()}
                    </p>
                  </div>
                  <span className="category-tag">{post.category}</span>
                </div>

                {/* Media */}
                {post.image && (
                  <div className="post-media">
                    <img src={post.image} alt="post" />
                  </div>
                )}

                {post.pdf && (
                  <div className="post-media pdf-container">
                    <iframe
                      src={post.pdf}
                      title="Certificate"
                      className="post-pdf"
                    ></iframe>
                  </div>
                )}

                {/* Body */}
                <div className="post-body">
                  <h3>{post.title}</h3>
                  <p>{post.description}</p>
                </div>

                {/* Actions */}
                <div
                  className="actions"
                  style={{ display: "flex", gap: 8, alignItems: "center" }}
                >
                  <button
                    className={`like-btn ${isLiked ? "liked" : ""}`}
                    onClick={() => {
                      if (!currentUser) {
                        toast.error("Log in to like posts.");
                        return;
                      }
                      toggleLike(post.id, currentUser.id);
                    }}
                  >
                    ❤️ {likeCount}
                  </button>

                  {isOwner && (
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(post)}
                      style={{ marginLeft: 8 }}
                      aria-label="Delete achievement"
                    >
                      🗑
                    </button>
                  )}
                </div>

                {/* Comments */}
                <div className="comment-section">
                  <div className="comment-box">
                    <input
                      type="text"
                      placeholder="💬 Add a comment..."
                      value={commentText[post.id] || ""}
                      onChange={(e) =>
                        setCommentText((prev) => ({
                          ...prev,
                          [post.id]: e.target.value,
                        }))
                      }
                    />
                    <button
                      onClick={() => {
                        if (!currentUser) {
                          toast.error("Log in to comment.");
                          return;
                        }
                        if (commentText[post.id]?.trim()) {
                          addComment(post.id, {
                            userName: currentUser.name,
                            text: commentText[post.id],
                          });
                          setCommentText((prev) => ({
                            ...prev,
                            [post.id]: "",
                          }));
                        }
                      }}
                    >
                      🚀
                    </button>
                  </div>

                  <div className="comments-list">
                    {post.comments?.length > 0 ? (
                      post.comments.map((c, i) => (
                        <p key={i} className="comment-line">
                          <b>{c.userName}</b> {c.text}
                        </p>
                      ))
                    ) : (
                      <p className="no-comments">No comments yet 💤</p>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
