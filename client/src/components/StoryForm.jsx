import React, { useState } from "react";

export default function StoryForm({ t, onAddStory }) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Traffic & Highway");
  const [body, setBody] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !body) return;

    onAddStory({
      title,
      category,
      body,
      upvotes: 0,
      downvotes: 0,
    });

    setTitle("");
    setCategory("Traffic & Highway");
    setBody("");
  };

  return (
    <div className="sidebar-widget">
      <div className="widget-title">
        <i
          className="fa-solid fa-pen-to-square"
          style={{ color: "var(--primary)" }}
        ></i>{" "}
        <span>{t.formTitle}</span>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>{t.formInputTitle}</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Speed post sent to SP resolved my FIR issue..."
            required
          />
        </div>
        <div className="form-group">
          <label>{t.formInputCat}</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="Traffic & Highway">Traffic & Highway</option>
            <option value="FIR & Complaints">FIR & Complaints</option>
            <option value="Arrest & Detention">Arrest & Detention</option>
            <option value="Search & Seizure">Search & Seizure</option>
            <option value="Bribery & Harassment">Bribery & Harassment</option>
            <option value="Police Misconduct & Misbehave">
              Police Misconduct & Misbehave
            </option>
            <option value="Women & Night Safety">Women & Night Safety</option>
            <option value="Cyber Crime & Fraud">Cyber Crime & Fraud</option>
            <option value="Tenant & Property">Tenant & Property</option>
          </select>
        </div>
        <div className="form-group">
          <label>{t.formInputBody}</label>
          <textarea
            rows="4"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Share what happened and how you handled it..."
            required
          />
        </div>
        <button type="submit" className="btn-submit">
          {t.formSubmit}
        </button>
      </form>
    </div>
  );
}
