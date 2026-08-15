import React from "react";

export default function SituationCard({ item, currentLang, t }) {
  return (
    <div class="situation-card">
      <div class="card-header">
        <div class="card-title">{item.title[currentLang]}</div>
        <span class="law-badge">{item.law}</span>
      </div>
      <div class="step-box" style={{ borderColor: "#2563eb" }}>
        <div class="step-title">{t.labelRights}</div>
        <div class="step-content">{item.rights[currentLang]}</div>
      </div>
      <div class="step-box" style={{ borderColor: "#dc2626" }}>
        <div class="step-title">{t.labelAction}</div>
        <div class="step-content" style={{ whiteSpace: "pre-line" }}>
          {item.action[currentLang]}
        </div>
      </div>
      <div class="step-box" style={{ borderColor: "#16a34a" }}>
        <div class="step-title">{t.labelComplain}</div>
        <div class="step-content">{item.complain[currentLang]}</div>
      </div>
    </div>
  );
}
