import React from "react";
import { cx } from "./constants";

export function WeatherWarnings({ onClose }) {
  const tiers = [
    { icon: "☀️", label: "Clear Skies",   sub: "Above $500", color: "text-emerald-500", bg: "bg-emerald-50" },
    { icon: "⛅", label: "Partly Cloudy", sub: "Above $300", color: "text-blue-500",    bg: "bg-blue-50" },
    { icon: "🌧️", label: "Rain Expected", sub: "Above $100", color: "text-amber-500",   bg: "bg-amber-50" },
    { icon: "⛈️", label: "Storm Warning", sub: "At $0",      color: "text-red-500",     bg: "bg-red-50" },
  ];

  return (
    <div className="flex h-full flex-col bg-white p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900">Weather Warnings</h1>
          <p className="text-sm text-slate-500">Adjust your balance thresholds</p>
        </div>
        <button onClick={onClose} className="grid h-10 w-10 place-items-center rounded-full bg-slate-100 text-slate-500">✕</button>
      </div>

      <div className="mt-4 space-y-3">
        {tiers.map((t, i) => (
          <div key={i} className={cx("flex items-center gap-4 rounded-2xl p-4", t.bg)}>
            <span className="text-3xl">{t.icon}</span>
            <div className="flex-1">
              <div className={cx("font-bold", t.color)}>{t.label}</div>
              <div className="text-xs font-medium opacity-70">{t.sub}</div>
            </div>
            <button className="rounded-lg bg-white px-3 py-1.5 text-xs font-bold text-slate-600 shadow-sm">Edit</button>
          </div>
        ))}
      </div>

      <button onClick={onClose} className="mt-8 w-full rounded-2xl bg-slate-900 py-4 font-bold text-white">Save Changes</button>
    </div>
  );
}
