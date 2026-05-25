import React from "react";
import { cx, money } from "./constants";
import { TopBar, TabBar } from "./SharedUI";
import { CATEGORIES } from "./mockData";

export function Budget({ openMenu, openCash, openInsights, openWeather }) {
  return (
    <div className="flex h-full flex-col">
      <TopBar today="$7.5k" openMenu={openMenu} openCash={openCash} openInsights={openInsights} openWeather={openWeather} />
      <div className="flex-1 overflow-y-auto px-4 pb-24">
        <h1 className="text-2xl font-extrabold text-slate-900 py-4">Budget</h1>
        {CATEGORIES.map((c) => (
          <div key={c.name} className="mb-4 rounded-2xl bg-slate-50 p-4">
            <div className="flex items-center gap-3">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-white text-xl shadow-sm">{c.icon}</div>
              <div className="flex-1"><div className="font-bold text-slate-900">{c.name}</div><div className="text-xs text-slate-400">of {money(c.planned)}</div></div>
              <div className={cx("font-bold", c.text)}>{money(c.used)}</div>
            </div>
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-200">
              <div className={cx("h-full rounded-full", c.bar)} style={{ width: `${c.pct}%` }} />
            </div>
          </div>
        ))}
      </div>
      <TabBar onInsights={openInsights} />
    </div>
  );
}
