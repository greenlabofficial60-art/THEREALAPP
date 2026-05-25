import React, { useState, useEffect } from "react";

export function SplashScreen({ onDone, duration = 1800 }) {
  const [entered, setEntered] = useState(false);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setEntered(true), 50);
    const t2 = setTimeout(() => setLeaving(true), duration - 400);
    const t3 = setTimeout(() => onDone?.(), duration);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  return (
    <div
      className={`absolute inset-0 z-50 grid place-items-center transition-opacity duration-500 ${leaving ? "opacity-0" : "opacity-100"}`}
      style={{ background: "#2ecc5f" }}
    >
      <span className={`text-7xl transition-all duration-700 ease-out ${entered ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}>
        ☀️
      </span>
    </div>
  );
}
