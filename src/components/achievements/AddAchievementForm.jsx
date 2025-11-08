import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";

export default function AddAchievementForm() {
  const { currentUser, addAchievement } = useAuth();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [visibility, setVisibility] = useState("public");

  const categories = [
    "Academic",
    "Coding",
    "Sports",
    "Creative",
    "Volunteering",
    "Others",
  ];

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setImage(reader.result);
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !category || !description) {
      toast.error("Please fill all fields before posting!");
      return;
    }

    const newAchievement = {
      id: Date.now().toString(),
      userId: currentUser.id,
      userName: currentUser.name,
      userAvatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(
        currentUser.name
      )}&background=7C3AED&color=fff`,
      title,
      category,
      description,
      image,
      visibility,
      date: new Date().toISOString(),
      likes: [],
      comments: [],
    };

    addAchievement(newAchievement);
    toast.success(
      visibility === "public"
        ? "🚀 Achievement posted publicly!"
        : "🔒 Saved privately!"
    );

    setTitle("");
    setCategory("");
    setDescription("");
    setImage("");
    setVisibility("public");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-2xl mx-auto p-8 bg-white/40 backdrop-blur-lg border border-white/50 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500"
    >
      <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent mb-6">
        Share Your Achievement 🚀
      </h2>

      {/* Title */}
      <input
        type="text"
        placeholder="Enter a catchy title..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="input-glass mb-4"
      />

      {/* Category + Visibility */}
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="input-glass flex-1"
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <select
          value={visibility}
          onChange={(e) => setVisibility(e.target.value)}
          className="input-glass flex-1"
        >
          <option value="public">🌍 Public</option>
          <option value="private">🔒 Private</option>
        </select>
      </div>

      {/* Description */}
      <textarea
        placeholder="Write about your achievement..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="input-glass min-h-[100px] mb-4"
      ></textarea>

      {/* Image Upload */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
        <label className="upload-btn">
          <i className="fa-solid fa-image mr-2"></i> Upload Image
          <input
            type="file"
            accept="image/*"
            hidden
            onChange={handleImageUpload}
          />
        </label>

        {image && (
          <div className="relative w-32 h-32">
            <img
              src={image}
              alt="Preview"
              className="w-full h-full object-cover rounded-xl border border-gray-300 shadow"
            />
            <button
              type="button"
              onClick={() => setImage("")}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:scale-110 transition"
            >
              ✖
            </button>
          </div>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-500 via-fuchsia-500 to-pink-500 text-white font-semibold shadow-md hover:scale-[1.03] hover:shadow-lg transition-all duration-300"
      >
        🚀 Post Achievement
      </button>
    </form>
  );
}
