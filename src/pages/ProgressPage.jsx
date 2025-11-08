import React, { useMemo } from "react";
import { useAuth } from "../context/AuthContext";
import {
  FaTrophy,
  FaHeart,
  FaCommentDots,
  FaLock,
  FaChartBar,
} from "react-icons/fa";

export default function ProgressPage() {
  const { currentUser, feed } = useAuth();

  // 🧠 Stats always computed first (safe)
  const myPosts = useMemo(() => {
    if (!currentUser) return [];
    return feed.filter((p) => p.userId === currentUser.id);
  }, [feed, currentUser]);

  const totalAchievements = myPosts.length;
  const totalLikes = myPosts.reduce((sum, p) => sum + (p.likes?.length || 0), 0);
  const totalComments = myPosts.reduce(
    (sum, p) => sum + (p.comments?.length || 0),
    0
  );
  const privateCount = myPosts.filter((p) => p.visibility === "private").length;

  // 🧩 Category breakdown for manual bars
  const categoryStats = myPosts.reduce((acc, post) => {
    if (!post.category) return acc;
    acc[post.category] = (acc[post.category] || 0) + 1;
    return acc;
  }, {});

  // 🔐 Not logged in
  if (!currentUser) {
    return (
      <section className="progress-page empty-state">
        <h2>🔐 Please log in to view your progress</h2>
        <p>Sign in to track your achievements.</p>
      </section>
    );
  }

  return (
    <section className="progress-page py-12 px-6 bg-gradient-to-b from-white to-purple-50 min-h-screen">
      <div className="container max-w-5xl mx-auto">
        <h2 className="section-title gradient-text mb-8 text-center">
          📈 Your Progress Overview
        </h2>

        {/* 📦 Summary Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <div className="stat-card glass hover:shadow-lg transition">
            <FaTrophy className="stat-icon text-yellow-500" />
            <h3>{totalAchievements}</h3>
            <p>Achievements</p>
          </div>

          <div className="stat-card glass hover:shadow-lg transition">
            <FaHeart className="stat-icon text-pink-500" />
            <h3>{totalLikes}</h3>
            <p>Total Likes</p>
          </div>

          <div className="stat-card glass hover:shadow-lg transition">
            <FaCommentDots className="stat-icon text-blue-500" />
            <h3>{totalComments}</h3>
            <p>Comments</p>
          </div>

          <div className="stat-card glass hover:shadow-lg transition">
            <FaLock className="stat-icon text-purple-500" />
            <h3>{privateCount}</h3>
            <p>Private Posts</p>
          </div>
        </div>

        {/* 📊 Manual Chart Section */}
        <div className="chart-section glass p-8 rounded-2xl shadow-lg">
          <div className="flex items-center gap-3 mb-4">
            <FaChartBar className="text-purple-600 text-xl" />
            <h3 className="text-lg font-semibold text-gray-800">
              Achievements by Category
            </h3>
          </div>

          {Object.keys(categoryStats).length > 0 ? (
            <div className="manual-chart mt-6 space-y-4">
              {Object.entries(categoryStats).map(([cat, value]) => (
                <div key={cat}>
                  <div className="flex justify-between mb-1 text-sm font-medium text-gray-700">
                    <span>{cat}</span>
                    <span>{value}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                    <div
                      className="h-4 rounded-full bg-gradient-to-r from-purple-500 to-pink-500"
                      style={{
                        width: `${(value / totalAchievements) * 100}%`,
                        transition: "width 0.6s ease-in-out",
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 py-10">
              🚀 No data yet — add your first achievement!
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
