"use client";

import { useEffect, useState } from "react";

export default function CustomCursor() {
  const [dotPos, setDotPos] = useState({ x: -100, y: -100 });
  const [ringPos, setRingPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Desktop screens only (>= 992px)
    if (window.innerWidth < 992) return;

    setIsVisible(true);

    const onMouseMove = (e) => {
      setDotPos({ x: e.clientX, y: e.clientY });
      setRingPos({ x: e.clientX, y: e.clientY });
    };

    const onMouseOver = (e) => {
      const target = e.target;
      if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.tagName === "INPUT" ||
        target.tagName === "SELECT" ||
        target.tagName === "TEXTAREA" ||
        target.closest("button") ||
        target.closest("a") ||
        target.closest(".hover-trigger")
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseover", onMouseOver);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseover", onMouseOver);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      {/* Sci-Fi Cyber Diamond Core */}
      <div
        className={`custom-cursor-dot ${isHovered ? "active" : ""}`}
        style={{
          left: `${dotPos.x}px`,
          top: `${dotPos.y}px`,
        }}
      />
      {/* Tech HUD Target Crosshair Ring */}
      <div
        className={`custom-cursor-ring ${isHovered ? "active" : ""}`}
        style={{
          left: `${ringPos.x}px`,
          top: `${ringPos.y}px`,
        }}
      >
        <span className="cursor-tick tick-top"></span>
        <span className="cursor-tick tick-bottom"></span>
        <span className="cursor-tick tick-left"></span>
        <span className="cursor-tick tick-right"></span>
      </div>
    </>
  );
}
