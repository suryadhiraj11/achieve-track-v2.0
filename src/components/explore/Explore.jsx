import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import AddAchievementForm from "../achievements/AddAchievementForm";
import "../../style.css";

export default function Explore() {
  const { feed, currentUser, toggleLike, addComment } = useAuth();
  const [showForm, setShowForm] = useState(false);
  const [commentText, setCommentText] = useState({});

  const publicFeed = feed.filter((post) => post.visibility === "public");

  return (
    <section className="explore-section">
      <div className="container">
        {/* Header */}
        <div className="feed-header">
          <h2 className="feed-title">🌍 Explore Achievements</h2>
          {currentUser && (
            <button
              className="btn-primary add-btn"
              onClick={() => setShowForm(!showForm)}
            >
              {showForm ? "Close ✖" : "➕ Share Achievement"}
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

            return (
              <article key={post.id} className="post-card fade-up">
                {/* Header */}
                <div className="post-header">
                  <img
                    src={post.userAvatar}
                    alt="user"
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
                <div className="actions">
                  <button
                    className={`like-btn ${isLiked ? "liked" : ""}`}
                    onClick={() => toggleLike(post.id, currentUser.id)}
                  >
                    ❤️ {likeCount}
                  </button>
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
