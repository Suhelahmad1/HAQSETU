import React from "react";

export default function Header({ currentLang, setCurrentLang, t }) {
  return (
    <header>
      <div className="nav-container">
        <a href="#" className="logo">
          {/* SVG Scale (Tarazu) Icon explicitly embedded so it always renders */}
          <svg
            className="logo-svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" />
            <path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" />
            <path d="M7 21h10" />
            <path d="M12 3v18" />
            <path d="M3 7h18" />
          </svg>
          HAQ<span>SETU</span>
        </a>

        <div className="nav-actions">
          <div className="lang-select-wrapper">
            <i className="fa-solid fa-globe lang-select-icon"></i>
            <select
              value={currentLang}
              onChange={(e) => setCurrentLang(e.target.value)}
              className="lang-dropdown"
            >
              <option value="en">English</option>
              <option value="hi">हिंदी (Hindi)</option>
            </select>
          </div>

          <a
            href="tel:112"
            className="emergency-badge"
            title="Call Emergency Helpline"
          >
            <i className="fa-solid fa-phone-volume"></i>
            <span>{t.emergency}</span>
          </a>
        </div>
      </div>
    </header>
  );
}
