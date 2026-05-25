import React from "react";
import { TopBar, TabBar } from "./SharedUI";
import { cx, money } from "./constants";

export function Goals(props) {
  const goals = [
    { icon: "🏔️", name: "Vacation", saved: 1200, target: 3000, color: "bg-blue-500" },
    { icon: "🚨", name: "Emergency Fund", saved: 5000, target: 10000, color: "bg-purple-500" },
  ];

  return (
    <div className="flex h-full flex-col bg-white">
      <TopBar today="$7.5k" {...props} />
      <div className="flex-1 overflow-y-auto px-4 pb-24">
        <h1 className="py-4 text-2xl font-extrabold text-slate-900">Savings Goals</h1>
        <div className="space-y-4">
          {goals.map((g, i) => {
            const pct = Math.round((g.saved / g.target) * 100);
            return (
              <div key={i} className="rounded-2xl bg-slate-50 p-5">
                <div className="flex items-center gap-4">
                  <div className="grid h-12 w-12 place-items-center rounded-xl bg-white text-2xl shadow-sm">{g.icon}</div>
                  <div className="flex-1">
                    <div className="flex justify-between font-bold">
                      <span>{g.name}</span>
                      <span className="text-slate-400">{pct}%</span>
                    </div>
                    <div className="text-xs text-slate-400">{money(g.saved)} of {money(g.target)}</div>
                  </div>
                </div>
                <div className="mt-4 h-2.5 w-full rounded-full bg-slate-200 overflow-hidden">
                  <div className={cx("h-full transition-all", g.color)} style={{ width: `${pct}%` }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <TabBar />
    </div>
  );
}
