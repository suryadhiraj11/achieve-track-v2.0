// src/context/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [feed, setFeed] = useState([]);

  useEffect(() => {
    try {
      const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
      const storedUser = JSON.parse(localStorage.getItem("currentUser")) || null;
      const storedFeed = JSON.parse(localStorage.getItem("feed")) || [];

      setUsers(storedUsers);
      setCurrentUser(storedUser);
      setFeed(storedFeed);
    } catch (err) {
      console.error("AuthContext: error reading localStorage", err);
    }
  }, []);

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

    setUsers([...users, newUser]);
    setCurrentUser(newUser);
    return true;
  }

  function login(email, password) {
    const user = users.find((u) => u.email === email && u.password === password);
    if (!user) return false;
    setCurrentUser(user);
    return true;
  }

  function logout() {
    setCurrentUser(null);
  }

  function addAchievement(achievement) {
    if (!currentUser) return;

    const updatedUsers = users.map((u) =>
      u.id === currentUser.id
        ? { ...u, achievements: [...(u.achievements || []), achievement] }
        : u
    );

    const updatedCurrentUser = {
      ...currentUser,
      achievements: [...(currentUser.achievements || []), achievement],
    };

    const updatedFeed =
      achievement.visibility === "public"
        ? [achievement, ...feed]
        : feed;

    setUsers(updatedUsers);
    setCurrentUser(updatedCurrentUser);
    setFeed(updatedFeed);
  }

  function removeAchievementFromUser(userId, achievementId) {
    const updatedUsers = users.map((u) =>
      u.id === userId
        ? {
            ...u,
            achievements: (u.achievements || []).filter(
              (a) => a.id !== achievementId
            ),
          }
        : u
    );

    let updatedCurrentUser = currentUser;
    if (currentUser?.id === userId) {
      updatedCurrentUser = {
        ...currentUser,
        achievements: (currentUser.achievements || []).filter(
          (a) => a.id !== achievementId
        ),
      };
    }

    const updatedFeed = (feed || []).filter((p) => p.id !== achievementId);

    setUsers(updatedUsers);
    setCurrentUser(updatedCurrentUser);
    setFeed(updatedFeed);
  }

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
  }

  function addComment(postId, comment) {
    const updatedFeed = feed.map((post) => {
      if (post.id === postId) {
        return {
          ...post,
          comments: [...(post.comments || []), comment],
        };
      }
      return post;
    });

    setFeed(updatedFeed);
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
        removeAchievementFromUser,
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
