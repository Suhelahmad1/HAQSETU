import React, { useState } from "react";

function ExperienceCard({ story, onVote, onSelectCategory, t }) {
  const storyId = String(story._id || story.id);
  const votedStories = JSON.parse(
    localStorage.getItem("voted_stories") || "{}",
  );
  const userVote = votedStories[storyId] || null;

  const isUpvoted = userVote === "up";
  const isDownvoted = userVote === "down";

  return (
    <div
      className="story-card"
      style={{
        border: "1px solid #e2e8f0",
        borderRadius: "8px",
        padding: "16px",
        marginBottom: "16px",
        backgroundColor: "#ffffff",
      }}
    >
      <div
        className="story-header"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h3 className="story-title" style={{ margin: 0, fontSize: "1.1rem" }}>
          {story.title}
        </h3>

        {/* Category Tag Badge (Click karte hi filter apply karega) */}
        <span
          className="law-badge"
          onClick={() => onSelectCategory(story.category)}
          title="Click to filter by this tag"
        >
          {story.category}
        </span>
      </div>

      <p className="story-body" style={{ color: "#475569", margin: "12px 0" }}>
        {story.body}
      </p>

      <div className="vote-bar" style={{ display: "flex", gap: "10px" }}>
        {/* Upvote / Helpful Button */}
        <button
          type="button"
          className={`vote-btn ${isUpvoted ? "upvoted" : ""}`}
          onClick={() => onVote(storyId, "up")}
        >
          <i className="fa-solid fa-thumbs-up"></i>
          {t?.btnHelpful || "Helpful"} ({story.upvotes || 0})
        </button>

        {/* Downvote / Not Helpful Button */}
        <button
          type="button"
          className={`vote-btn ${isDownvoted ? "downvoted" : ""}`}
          onClick={() => onVote(storyId, "down")}
        >
          <i className="fa-solid fa-thumbs-down"></i>
          {t?.btnNotHelpful || "Not Helpful"} ({story.downvotes || 0})
        </button>
      </div>
    </div>
  );
}

export default function ExperienceList({ stories, onVote, t, loading }) {
  const [selectedCategory, setSelectedCategory] = useState("All");

  if (loading) {
    return (
      <div style={{ padding: "20px", textAlign: "center" }}>
        Loading experiences...
      </div>
    );
  }

  // 1. All unique categories
  const categories = [
    "All",
    ...new Set(stories.map((s) => s.category).filter(Boolean)),
  ];

  // 2. Filter stories by selected category
  const filteredStories =
    selectedCategory === "All"
      ? stories
      : stories.filter((s) => s.category === selectedCategory);

  // 3. Sort by highest upvotes first (Top Voted)
  const sortedStories = [...filteredStories].sort(
    (a, b) => (b.upvotes || 0) - (a.upvotes || 0),
  );

  return (
    <div
      className="experience-section"
      style={{ maxWidth: "800px", margin: "0 auto" }}
    >
      {/* Category Filter Pills / Tags Bar */}
      <div
        style={{
          marginBottom: "20px",
          display: "flex",
          gap: "8px",
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        <span
          style={{ fontWeight: "600", color: "#334155", marginRight: "4px" }}
        >
          Filter by Tag:
        </span>
        {categories.map((cat, idx) => (
          <button
            key={idx}
            type="button"
            className={`law-badge ${selectedCategory === cat ? "active" : ""}`}
            onClick={() => setSelectedCategory(cat)}
            style={{
              border: selectedCategory === cat ? "1px solid #475569" : "none",
              fontWeight: selectedCategory === cat ? "600" : "400",
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Stories list rendering */}
      {sortedStories.length === 0 ? (
        <div style={{ color: "#64748b", padding: "20px 0" }}>
          Is category ke under koi experience nahi mila.
        </div>
      ) : (
        sortedStories.map((story) => (
          <ExperienceCard
            key={String(story._id || story.id)}
            story={story}
            onVote={onVote}
            onSelectCategory={(cat) => setSelectedCategory(cat)}
            t={t}
          />
        ))
      )}
    </div>
  );
}
