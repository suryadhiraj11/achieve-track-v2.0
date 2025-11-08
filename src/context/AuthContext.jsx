import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [feed, setFeed] = useState([]);

  // 🧠 Load all data on startup
  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    const storedUser = JSON.parse(localStorage.getItem("currentUser"));
    const storedFeed = JSON.parse(localStorage.getItem("feed")) || [];

    setUsers(storedUsers);
    setCurrentUser(storedUser);
    setFeed(storedFeed);
  }, []);

  // 💾 Persist data
  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    if (currentUser)
      localStorage.setItem("currentUser", JSON.stringify(currentUser));
    else localStorage.removeItem("currentUser");
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem("feed", JSON.stringify(feed));
  }, [feed]);

  // ✨ Signup
  function signup(name, email, password) {
    if (!name || !email || !password) return false;
    if (users.find((u) => u.email === email)) return false;

    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      password,
      achievements: [],
    };

    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    setCurrentUser(newUser);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    localStorage.setItem("currentUser", JSON.stringify(newUser));
    return true;
  }

  // 🔑 Login
  function login(email, password) {
    const user = users.find((u) => u.email === email && u.password === password);
    if (!user) return false;
    setCurrentUser(user);
    localStorage.setItem("currentUser", JSON.stringify(user));
    return true;
  }

  // 🚪 Logout
  function logout() {
    setCurrentUser(null);
    localStorage.removeItem("currentUser");
  }

  // 🏆 Add achievement with visibility (Public/Private)
  function addAchievement(achievement) {
    if (!currentUser) return;

    const updatedUsers = users.map((u) =>
      u.id === currentUser.id
        ? { ...u, achievements: [...u.achievements, achievement] }
        : u
    );

    const updatedCurrentUser = {
      ...currentUser,
      achievements: [...currentUser.achievements, achievement],
    };

    // Add to global feed only if public
    const updatedFeed = achievement.visibility === "public"
      ? [achievement, ...feed]
      : [...feed];

    // Update states
    setUsers(updatedUsers);
    setCurrentUser(updatedCurrentUser);
    setFeed(updatedFeed);

    // Persist
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    localStorage.setItem("currentUser", JSON.stringify(updatedCurrentUser));
    localStorage.setItem("feed", JSON.stringify(updatedFeed));
  }

  // ❤️ Like post
  function toggleLike(postId, userId) {
    const updatedFeed = feed.map((post) => {
      if (post.id === postId) {
        const liked = post.likes?.includes(userId);
        const likes = liked
          ? post.likes.filter((id) => id !== userId)
          : [...(post.likes || []), userId];
        return { ...post, likes };
      }
      return post;
    });
    setFeed(updatedFeed);
    localStorage.setItem("feed", JSON.stringify(updatedFeed));
  }

  // 💬 Comment
  function addComment(postId, comment) {
    const updatedFeed = feed.map((post) => {
      if (post.id === postId) {
        return { ...post, comments: [...(post.comments || []), comment] };
      }
      return post;
    });
    setFeed(updatedFeed);
    localStorage.setItem("feed", JSON.stringify(updatedFeed));
  }

  return (
    <AuthContext.Provider
      value={{
        users,
        currentUser,
        feed,
        signup,
        login,
        logout,
        addAchievement,
        toggleLike,
        addComment,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
