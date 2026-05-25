import React from "react";
import { TopBar, TabBar } from "./SharedUI";
import { money } from "./constants";

export function Debt(props) {
  const cards = [
    { name: "Visa Rewards", bank: "Chase", balance: 1250, limit: 5000, apr: 18.2 },
    { name: "Apple Card", bank: "Goldman Sachs", balance: 450, limit: 3000, apr: 15.9 },
  ];

  const totalOwed = cards.reduce((s, c) => s + c.balance, 0);
  const totalLimit = cards.reduce((s, c) => s + c.limit, 0);
  const util = Math.round((totalOwed / totalLimit) * 100);

  return (
    <div className="flex h-full flex-col bg-white">
      <TopBar today="$7.5k" {...props} />
      <div className="flex-1 overflow-y-auto px-4 pb-24">
        <div className="flex items-center justify-between py-4">
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900">Cards & Debts</h1>
            <p className="text-sm text-slate-500">{cards.length} cards tracked</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="grid h-16 w-16 place-items-center rounded-full border-4 border-emerald-500 font-bold text-emerald-600">
              {util}%
            </div>
            <span className="mt-1 text-[10px] font-bold text-slate-400 uppercase">Utilization</span>
          </div>
        </div>

        <div className="space-y-3">
          {cards.map((c, i) => (
            <div key={i} className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
              <div className="flex justify-between">
                <div>
                  <div className="font-bold text-slate-900">{c.name}</div>
                  <div className="text-xs text-slate-400">{c.bank} • {c.apr}% APR</div>
                </div>
                <div className="text-right font-extrabold text-red-500">{money(c.balance)}</div>
              </div>
              <div className="mt-3 h-1.5 w-full rounded-full bg-slate-200">
                <div className="h-full rounded-full bg-red-400" style={{ width: `${(c.balance / c.limit) * 100}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
      <TabBar />
    </div>
  );
}
