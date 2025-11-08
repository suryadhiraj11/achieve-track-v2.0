import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";

export default function AchievementsPanel() {
  const { currentUser, addAchievement } = useAuth();
  const [text, setText] = useState("");
  const [image, setImage] = useState("");
  const [pdf, setPdf] = useState("");
  const [category, setCategory] = useState("");
  const [visibility, setVisibility] = useState("public");

  const categories = [
    "Academic",
    "Coding",
    "Sports",
    "Creative",
    "Volunteering",
    "Others",
  ];

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      if (file.type === "application/pdf") setPdf(reader.result);
      else setImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handlePost = () => {
    if (!text.trim() || !category) return alert("Fill all fields!");

    const newAchievement = {
      id: Date.now().toString(),
      userId: currentUser.id,
      userName: currentUser.name,
      userAvatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(
        currentUser.name
      )}&background=7C3AED&color=fff`,
      title: category + " Achievement",
      description: text,
      image,
      pdf,
      category,
      visibility,
      date: new Date().toISOString(),
      likes: [],
      comments: [],
    };

    addAchievement(newAchievement);
    setText("");
    setImage("");
    setPdf("");
    setCategory("");
    setVisibility("public");
  };

  return (
    <section className="my-achievements-section">
      <div className="container">
        <h2 className="section-title">🏆 My Achievements</h2>

        {/* Post Form */}
        <div className="achievement-form glass-box fade-up">
          <div className="form-header">
            <img
              src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                currentUser.name
              )}&background=7C3AED&color=fff`}
              alt="User Avatar"
              className="user-avatar"
            />
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Write about your latest achievement..."
            />
          </div>

          <div className="form-options">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Select Category</option>
              {categories.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>

            <select
              value={visibility}
              onChange={(e) => setVisibility(e.target.value)}
            >
              <option value="public">🌍 Public</option>
              <option value="private">🔒 Private</option>
            </select>
          </div>

          <label className="upload-field">
            <i className="fa-solid fa-upload"></i> Upload Image / PDF
            <input type="file" hidden accept="image/*,.pdf" onChange={handleFile} />
          </label>

          {/* Previews */}
          <div className="preview-area">
            {image && (
              <div className="img-preview">
                <img src={image} alt="Preview" />
                <button onClick={() => setImage("")}>×</button>
              </div>
            )}
            {pdf && (
              <div className="pdf-preview">
                <iframe src={pdf} title="Certificate"></iframe>
                <button onClick={() => setPdf("")}>×</button>
              </div>
            )}
          </div>

          <button className="post-btn" onClick={handlePost}>
            🚀 Post Achievement
          </button>
        </div>
      </div>
    </section>
  );
}
