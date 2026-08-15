import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import SituationCard from "./components/SituationCard";
import HelplineWidget from "./components/HelplineWidget";
import StoryForm from "./components/StoryForm";
import ExperienceList from "./components/ExperienceList"; // Imported

import { uiTranslations } from "./data/uiTranslations";
import { filterCategories } from "./data/filterCategories";
import { situationsData } from "./data/situationsData";
import "./App.css";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function App() {
  const [currentLang, setCurrentLang] = useState("en");
  const [activeTab, setActiveTab] = useState("situations");
  const [currentCategory, setCurrentCategory] = useState("all");
  const [stories, setStories] = useState([]);
  const [toastMsg, setToastMsg] = useState("");
  const [loading, setLoading] = useState(true);

  const t = uiTranslations[currentLang];

  useEffect(() => {
    setLoading(true);
    fetch(`${API_BASE_URL}/stories`)
      .then((res) => res.json())
      .then((data) => {
        setStories(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading stories:", err);
        setLoading(false);
      });
  }, []);

  const handleVote = async (storyId, targetVote) => {
    const stringId = String(storyId);
    const votedStories = JSON.parse(
      localStorage.getItem("voted_stories") || "{}",
    );
    const previousVote = votedStories[stringId] || null;

    const newVote = previousVote === targetVote ? null : targetVote;

    try {
      const res = await fetch(`${API_BASE_URL}/stories/${stringId}/vote`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentVote: newVote, previousVote }),
      });

      if (!res.ok) throw new Error("Voting API error");

      const updatedStory = await res.json();

      if (newVote) {
        votedStories[stringId] = newVote;
      } else {
        delete votedStories[stringId];
      }
      localStorage.setItem("voted_stories", JSON.stringify(votedStories));

      setStories((prevStories) =>
        prevStories.map((story) => {
          const currentId = String(story._id || story.id);
          return currentId === stringId ? updatedStory : story;
        }),
      );
    } catch (err) {
      console.error("Voting frontend error:", err);
    }
  };

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(""), 3000);
  };

  const handleAddStory = async (newStoryData) => {
    try {
      const res = await fetch(`${API_BASE_URL}/stories`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newStoryData),
      });
      const savedStory = await res.json();
      setStories([savedStory, ...stories]);
      showToast(t.toastMsg);
      setActiveTab("community");
    } catch (err) {
      console.error("Error saving story:", err);
    }
  };

  const filteredSituations =
    currentCategory === "all"
      ? situationsData
      : situationsData.filter((item) => item.category === currentCategory);

  return (
    <div>
      <div className="top-hero-wrapper">
        <div className="hero-overlay">
          <Header
            currentLang={currentLang}
            setCurrentLang={setCurrentLang}
            t={t}
          />
          <Hero currentLang={currentLang} t={t} onSelectTab={setActiveTab} />
        </div>
      </div>

      <div className="container">
        <main>
          <div className="tab-header">
            <button
              className={`tab-btn ${activeTab === "situations" ? "active" : ""}`}
              onClick={() => setActiveTab("situations")}
            >
              <i className="fa-solid fa-shield-halved"></i>{" "}
              <span>{t.tabSituations}</span>
            </button>
            <button
              className={`tab-btn ${activeTab === "community" ? "active" : ""}`}
              onClick={() => setActiveTab("community")}
            >
              <i className="fa-solid fa-users"></i>{" "}
              <span>{t.tabCommunity}</span>
            </button>
          </div>

          {activeTab === "situations" ? (
            <div>
              <div className="filter-wrapper">
                {filterCategories.map((cat) => (
                  <button
                    key={cat.id}
                    className={`chip ${currentCategory === cat.id ? "active" : ""}`}
                    onClick={() => setCurrentCategory(cat.id)}
                  >
                    {cat[currentLang]}
                  </button>
                ))}
              </div>
              {filteredSituations.map((item) => (
                <SituationCard
                  key={item.id}
                  item={item}
                  currentLang={currentLang}
                  t={t}
                />
              ))}
            </div>
          ) : (
            <ExperienceList
              stories={stories}
              onVote={handleVote}
              t={t}
              loading={loading}
            />
          )}
        </main>

        <aside>
          <HelplineWidget t={t} />
          <StoryForm t={t} onAddStory={handleAddStory} />
        </aside>
      </div>

      {toastMsg && <div className="toast">{toastMsg}</div>}
    </div>
  );
}
