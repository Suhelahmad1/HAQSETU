import React from "react";

export default function HelplineWidget({ t }) {
  const helplineList = [
    { name: t.hl1, number: "112" },
    { name: t.hl2, number: "1091" },
    { name: t.hl3, number: "14433" },
    { name: t.hl4, number: "1930" },
    { name: t.hl5, number: "1064" },
  ];

  return (
    <div class="sidebar-widget">
      <div class="widget-title">
        <i
          class="fa-solid fa-phone-flip"
          style={{ color: "var(--accent)" }}
        ></i>{" "}
        <span>{t.helplinesTitle}</span>
      </div>

      {helplineList.map((hl, idx) => (
        <a key={idx} href={`tel:${hl.number}`} class="helpline-item-link">
          <div class="helpline-item">
            <span class="helpline-name">{hl.name}</span>
            <span class="helpline-number">{hl.number}</span>
          </div>
        </a>
      ))}
    </div>
  );
}
