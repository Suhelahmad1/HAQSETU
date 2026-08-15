import React, { useState } from "react";

export default function ExperienceList({ stories, onVote, t, loading }) {
  // Currently selected category track karne ke liye state (default 'All')
  const [activeCategory, setActiveCategory] = useState("All");

  if (loading) {
    return (
      <div style={{ padding: "20px", textAlign: "center" }}>
        Loading experiences...
      </div>
    );
  }

  // 1. Array me se saare Unique Categories nikalna (Filtering ke liye)
  const uniqueCategories = [
    "All",
    ...new Set(stories.map((s) => s.category).filter(Boolean)),
  ];

  // 2. Selected Category ke hisab se Stories Filter karna
  const filteredStories =
    activeCategory === "All"
      ? stories
      : stories.filter((s) => s.category === activeCategory);

  // 3. High to Low Upvotes Sort karna (Jispe sabse zyada upvote wo sabse upar)
  const sortedStories = [...filteredStories].sort(
    (a, b) => (b.upvotes || 0) - (a.upvotes || 0),
  );

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "10px 0" }}>
      {/* Dynamic Category Tags Filter Bar */}
      <div
        style={{
          display: "flex",
          gap: "8px",
          flexWrap: "wrap",
          alignItems: "center",
          marginBottom: "20px",
          padding: "10px",
          backgroundColor: "#f8fafc",
          borderRadius: "8px",
          border: "1px solid #e2e8f0",
        }}
      >
        <span
          style={{ fontWeight: "600", color: "#334155", marginRight: "6px" }}
        >
          Filter by Category:
        </span>

        {uniqueCategories.map((cat, idx) => {
          const isActive = activeCategory === cat;
          return (
            <button
              key={idx}
              type="button"
              onClick={() => setActiveCategory(cat)}
              style={{
                padding: "6px 14px",
                borderRadius: "20px",
                border: isActive ? "1px solid #0f172a" : "1px solid #cbd5e1",
                backgroundColor: isActive ? "#0f172a" : "#ffffff",
                color: isActive ? "#ffffff" : "#334155",
                fontWeight: isActive ? "600" : "400",
                cursor: "pointer",
                fontSize: "0.85rem",
                transition: "all 0.2s ease",
              }}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Stories Output (Highest Upvotes First) */}
      {sortedStories.length === 0 ? (
        <div style={{ color: "#64748b", padding: "20px", textAlign: "center" }}>
          Is category ke andar koi experience nahi mila.
        </div>
      ) : (
        sortedStories.map((story) => {
          const storyId = String(story._id || story.id);

          return (
            <div
              key={storyId}
              style={{
                border: "1px solid #e2e8f0",
                borderRadius: "8px",
                padding: "16px",
                marginBottom: "16px",
                backgroundColor: "#ffffff",
                boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
              }}
            >
              {/* Card Header: Title & Clickable Tag */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <h3 style={{ margin: 0, fontSize: "1.1rem", color: "#0f172a" }}>
                  {story.title}
                </h3>

                {/* Tag par click karne par direct filtering ho jayegi */}
                <span
                  onClick={() => setActiveCategory(story.category)}
                  title="Click to filter by this category"
                  style={{
                    background: "#f1f5f9",
                    color: "#475569",
                    padding: "4px 10px",
                    borderRadius: "4px",
                    fontSize: "0.8rem",
                    fontWeight: "600",
                    cursor: "pointer",
                    border: "1px solid #cbd5e1",
                  }}
                >
                  {story.category}
                </span>
              </div>

              {/* Story Content */}
              <p
                style={{
                  color: "#334155",
                  margin: "12px 0",
                  lineHeight: "1.5",
                }}
              >
                {story.body}
              </p>

              {/* Vote Display Bar */}
              <div
                style={{ display: "flex", gap: "10px", alignItems: "center" }}
              >
                <button
                  type="button"
                  onClick={() => onVote && onVote(storyId, "up")}
                  style={{
                    padding: "6px 12px",
                    borderRadius: "6px",
                    border: "1px solid #cbd5e1",
                    backgroundColor: "#f8fafc",
                    cursor: "pointer",
                  }}
                >
                  <i
                    className="fa-solid fa-thumbs-up"
                    style={{ marginRight: "6px" }}
                  ></i>
                  {t?.btnHelpful || "Helpful"} ({story.upvotes || 0})
                </button>

                <button
                  type="button"
                  onClick={() => onVote && onVote(storyId, "down")}
                  style={{
                    padding: "6px 12px",
                    borderRadius: "6px",
                    border: "1px solid #cbd5e1",
                    backgroundColor: "#f8fafc",
                    cursor: "pointer",
                  }}
                >
                  <i
                    className="fa-solid fa-thumbs-down"
                    style={{ marginRight: "6px" }}
                  ></i>
                  {t?.btnNotHelpful || "Not Helpful"} ({story.downvotes || 0})
                </button>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}
