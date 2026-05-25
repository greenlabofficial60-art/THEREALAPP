import React, { useState } from "react";
import { cx, money } from "./constants";

export function CashBalance({ onClose, totalBalance = 7500 }) {
  const [tab, setTab] = useState("Accounts");
  const accounts = [
    { name: "Checking", balance: 2500, type: "checking" },
    { name: "Savings", balance: 5000, type: "savings" },
  ];

  return (
    <div className="flex h-full flex-col px-5 pt-8 text-slate-900">
      <div className="text-center relative">
        <button onClick={onClose} className="absolute right-0 top-0 grid h-10 w-10 place-items-center rounded-full bg-slate-100 text-slate-500">✕</button>
        <div className="text-xs font-bold tracking-widest text-slate-400 uppercase">Total Balance</div>
        <div className="text-5xl font-extrabold mt-1">{money(totalBalance)}</div>
      </div>

      <div className="mt-8 flex rounded-2xl bg-slate-100 p-1 font-bold text-sm">
        {["Accounts", "History"].map(t => (
          <button key={t} onClick={() => setTab(t)} className={cx("flex-1 rounded-xl py-3 transition", tab === t ? "bg-white shadow-sm text-slate-900" : "text-slate-400")}>
            {t}
          </button>
        ))}
      </div>

      <div className="mt-6 flex-1 overflow-y-auto space-y-3">
        {tab === "Accounts" && accounts.map((a, i) => (
          <div key={i} className="flex items-center justify-between rounded-2xl border border-slate-100 bg-slate-50 p-4">
            <span className="flex items-center gap-3 font-bold">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-blue-500 text-white text-sm">{a.type === "checking" ? "🏦" : "💰"}</span>
              {a.name}
            </span>
            <span className="text-lg font-extrabold text-blue-500">{money(a.balance)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
