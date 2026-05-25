import React from "react";

export function Insights({ onClose }) {
  return (
    <div className="flex h-full flex-col bg-white p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-extrabold text-slate-900">Insights</h1>
        <button onClick={onClose} className="grid h-10 w-10 place-items-center rounded-full bg-slate-100 text-slate-500">✕</button>
      </div>

      <div className="rounded-3xl bg-blue-50 p-6">
        <div className="text-xs font-bold text-blue-500 uppercase tracking-widest">Projected Balance</div>
        <div className="mt-1 text-4xl font-extrabold text-blue-600">$8,200.00</div>
        <div className="mt-1 text-sm font-semibold text-blue-400">in 6 months</div>

        <div className="mt-6 h-32 w-full">
          <svg viewBox="0 0 100 40" className="h-full w-full overflow-visible">
            <path d="M0 35 Q 25 30, 50 20 T 100 5" fill="none" stroke="#3b82f6" strokeWidth="3" strokeLinecap="round" />
            <circle cx="100" cy="5" r="3" fill="#3b82f6" />
          </svg>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4">
        <div className="rounded-3xl bg-slate-50 p-5">
          <div className="text-[10px] font-bold text-slate-400 uppercase">Runway</div>
          <div className="mt-1 text-2xl font-extrabold">∞</div>
          <div className="text-xs text-slate-500">months</div>
        </div>
        <div className="rounded-3xl bg-slate-50 p-5">
          <div className="text-[10px] font-bold text-slate-400 uppercase">Savings Rate</div>
          <div className="mt-1 text-2xl font-extrabold">24%</div>
          <div className="text-xs text-emerald-500 font-bold">Excellent</div>
        </div>
      </div>

      <div className="mt-8 rounded-2xl border-2 border-dashed border-slate-200 p-8 text-center text-slate-400 font-medium">
        More insights coming soon...
      </div>
    </div>
  );
}
