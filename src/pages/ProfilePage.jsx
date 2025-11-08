import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function ProfilePage() {
  const { currentUser, feed } = useAuth();
  const [filter, setFilter] = useState("all"); // all, public, private

  if (!currentUser) {
    return (
      <p className="text-center mt-20 text-gray-500 text-lg">
        Please log in to view your profile.
      </p>
    );
  }

  // Filter posts by user
  const userPosts = feed.filter((p) => p.userId === currentUser.id);

  const filteredPosts =
    filter === "public"
      ? userPosts.filter((p) => p.visibility === "public")
      : filter === "private"
      ? userPosts.filter((p) => p.visibility === "private")
      : userPosts;

  return (
    <section className="profile-section py-12 px-6 bg-gradient-to-b from-white to-purple-50 min-h-screen">
      <div className="container max-w-5xl mx-auto">
        {/* 💫 Profile Header */}
        <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow-lg p-8 mb-8 flex flex-col md:flex-row items-center gap-8 border border-white/40">
          <img
            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
              currentUser.name
            )}&background=8b5cf6&color=fff&size=150`}
            alt="Avatar"
            className="w-32 h-32 rounded-full shadow-md border-4 border-purple-300"
          />

          <div className="flex-1 text-center md:text-left">
            <h2 className="text-3xl font-bold text-gray-800">
              {currentUser.name}
            </h2>
            <p className="text-gray-500">{currentUser.email}</p>
            <div className="flex justify-center md:justify-start gap-8 mt-4">
              <div className="text-center">
                <h3 className="text-xl font-semibold text-purple-600">
                  {userPosts.length}
                </h3>
                <p className="text-sm text-gray-500">Total Posts</p>
              </div>
              <div className="text-center">
                <h3 className="text-xl font-semibold text-purple-600">
                  {
                    userPosts.filter((p) => p.visibility === "public").length
                  }
                </h3>
                <p className="text-sm text-gray-500">Public</p>
              </div>
              <div className="text-center">
                <h3 className="text-xl font-semibold text-purple-600">
                  {
                    userPosts.filter((p) => p.visibility === "private").length
                  }
                </h3>
                <p className="text-sm text-gray-500">Private</p>
              </div>
            </div>
          </div>
        </div>

        {/* ⚙️ Account Info Section */}
        <div className="account-info mb-10 bg-white/60 backdrop-blur-lg rounded-xl p-6 shadow border border-white/40">
          <h3 className="text-xl font-semibold text-gray-800 mb-3">
            Account Info
          </h3>
          <p className="text-gray-600">
            <b>Name:</b> {currentUser.name}
          </p>
          <p className="text-gray-600">
            <b>Email:</b> {currentUser.email}
          </p>
          <p className="text-gray-600">
            <b>User ID:</b> {currentUser.id}
          </p>
        </div>

        {/* 🌗 Filter Tabs */}
        <div className="flex justify-center gap-4 mb-8">
          {["all", "public", "private"].map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-5 py-2 rounded-full font-semibold capitalize transition-all ${
                filter === tab
                  ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md"
                  : "bg-white/70 text-gray-700 hover:bg-purple-100"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* 🏆 Achievements Feed */}
        {filteredPosts.length === 0 ? (
          <p className="text-center text-gray-500">
            No {filter !== "all" ? filter : ""} achievements yet.
          </p>
        ) : (
          <div className="grid md:grid-cols-2 gap-8">
            {filteredPosts.map((post) => (
              <div
                key={post.id}
                className="achievement-card bg-white/80 backdrop-blur-md p-5 rounded-2xl shadow-lg hover:shadow-xl transition-all"
              >
                <div className="flex items-center gap-3 mb-3">
                  <img
                    src={post.userAvatar}
                    alt={post.userName}
                    className="w-10 h-10 rounded-full border border-purple-300"
                  />
                  <div>
                    <p className="font-semibold text-gray-800">
                      {post.userName}
                    </p>
                    <p className="text-xs text-gray-500">
                      {new Date(post.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                {post.image && (
                  <div className="w-full h-56 rounded-xl overflow-hidden mb-3">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform"
                    />
                  </div>
                )}
                {/* PDF Viewer */}
{post.pdf && (
  <div className="pdf-preview mt-3 rounded-lg overflow-hidden border border-gray-300 shadow-sm">
    <iframe
      src={post.pdf}
      title="Certificate Preview"
      className="w-full h-96"
      frameBorder="0"
    ></iframe>
  </div>
)}


                <h3 className="text-lg font-semibold text-gray-800 mb-1">
                  {post.title}
                </h3>
                <p className="text-gray-600 text-sm mb-3">
                  {post.description}
                </p>
                <div className="flex justify-between items-center text-sm text-gray-500">
                  <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full font-medium">
                    {post.category}
                  </span>
                  <span>
                    ❤️ {post.likes?.length || 0} · 💬 {post.comments?.length || 0}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
