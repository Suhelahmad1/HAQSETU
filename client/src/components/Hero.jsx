import React, { useState, useEffect } from "react";

const typewriterPhrases = {
  en: [
    {
      full: "During police encounter don't panic",
      prefix: "During police encounter don't ",
    },
    { full: "During police encounter don't fear", prefix: "" },
    { full: "Just know your rights", prefix: "" },
  ],
  hi: [
    { full: "पुलिस सामना होने पर घबराएं नहीं", prefix: "पुलिस सामना होने पर " },
    { full: "पुलिस सामना होने पर डरे नहीं", prefix: "" },
    { full: "बस अपने अधिकार जानें", prefix: "" },
  ],
};

export default function Hero({ currentLang, t, onSelectTab }) {
  const [twText, setTwText] = useState("");
  const [twIndex, setTwIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    setTwText("");
    setTwIndex(0);
    setIsDeleting(false);
  }, [currentLang]);

  useEffect(() => {
    const phrases = typewriterPhrases[currentLang];
    const currentPhraseObj = phrases[twIndex];
    const typeSpeed = 70;
    const backspaceSpeed = 40;
    const pauseDelay = 1200;

    let timeout;

    if (twIndex === 0) {
      if (!isDeleting) {
        if (twText !== currentPhraseObj.full) {
          timeout = setTimeout(() => {
            setTwText(currentPhraseObj.full.substring(0, twText.length + 1));
          }, typeSpeed);
        } else {
          timeout = setTimeout(() => setIsDeleting(true), pauseDelay);
        }
      } else {
        if (twText !== currentPhraseObj.prefix) {
          timeout = setTimeout(() => {
            setTwText(twText.substring(0, twText.length - 1));
          }, backspaceSpeed);
        } else {
          setIsDeleting(false);
          setTwIndex(1);
        }
      }
    } else if (twIndex === 1) {
      if (!isDeleting) {
        if (twText !== currentPhraseObj.full) {
          timeout = setTimeout(() => {
            setTwText(currentPhraseObj.full.substring(0, twText.length + 1));
          }, typeSpeed);
        } else {
          timeout = setTimeout(() => setIsDeleting(true), pauseDelay + 300);
        }
      } else {
        if (twText !== "") {
          timeout = setTimeout(() => {
            setTwText(twText.substring(0, twText.length - 1));
          }, backspaceSpeed);
        } else {
          setIsDeleting(false);
          setTwIndex(2);
        }
      }
    } else if (twIndex === 2) {
      if (!isDeleting) {
        if (twText !== currentPhraseObj.full) {
          timeout = setTimeout(() => {
            setTwText(currentPhraseObj.full.substring(0, twText.length + 1));
          }, typeSpeed);
        } else {
          timeout = setTimeout(() => setIsDeleting(true), pauseDelay + 600);
        }
      } else {
        if (twText !== "") {
          timeout = setTimeout(() => {
            setTwText(twText.substring(0, twText.length - 1));
          }, backspaceSpeed);
        } else {
          setIsDeleting(false);
          setTwIndex(0);
        }
      }
    }

    return () => clearTimeout(timeout);
  }, [twText, isDeleting, twIndex, currentLang]);

  return (
    <section class="hero">
      <div class="hero-container">
        <div class="hero-badge">
          <i class="fa-solid fa-gavel"></i> <span>{t.heroBadge}</span>
        </div>

        <h1>
          <span>{twText}</span>
          <span class="typewriter-cursor"></span>
        </h1>

        <p>{t.heroSubtitle}</p>

        <div class="hero-highlights">
          <div class="highlight-card" onClick={() => onSelectTab("situations")}>
            <i class="fa-solid fa-shield-halved"></i>
            <div class="highlight-text">
              <div class="highlight-title">{t.hlSituationsTitle}</div>
              <div class="highlight-desc">{t.hlSituationsDesc}</div>
            </div>
          </div>
          <div class="highlight-card" onClick={() => onSelectTab("community")}>
            <i class="fa-solid fa-users"></i>
            <div class="highlight-text">
              <div class="highlight-title">{t.hlCommunityTitle}</div>
              <div class="highlight-desc">{t.hlCommunityDesc}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
