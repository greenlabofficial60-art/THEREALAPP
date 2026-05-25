import React, { useState } from "react";
import { cx, BUDGET_CYCLES, WEEKLY_BUDGET_ROWS, ASSETS, LIABILITIES } from "./constants";
import { Sheet2, FlowBack, FlowNext, SelectPill } from "./SharedUI";

export function BudgetWizard({ onDone, onBack }) {
  const [step, setStep] = useState(0);
  const [cycle, setCycle] = useState("Weekly");
  const [rows, setRows] = useState(WEEKLY_BUDGET_ROWS);

  const setVal = (i, v) => setRows((p) => p.map((r, k) => k === i ? { ...r, val: Number(v) || 0 } : r));

  if (step === 0) return (
    <Sheet2 title="Budget Cycle" sub="Choose how you think about spending" footer={<><FlowBack onClick={onBack} /><FlowNext onClick={() => setStep(1)} /></>}>
      <div className="space-y-3">
        {BUDGET_CYCLES.map(([ic, t, s]) => (
          <button key={t} onClick={() => setCycle(t)} className={cx("flex w-full items-center gap-4 rounded-2xl border-2 p-4 text-left transition", cycle === t ? "border-blue-500 bg-blue-50" : "border-transparent bg-slate-50")}>
            <span className="text-2xl">{ic}</span>
            <div className="flex-1"><div className="font-extrabold">{t}</div><div className="text-sm text-slate-500">{s}</div></div>
          </button>
        ))}
      </div>
    </Sheet2>
  );

  return (
    <Sheet2 title="Set Budgets" sub={`Projections for your ${cycle} cycle`} footer={<><FlowBack onClick={() => setStep(0)} /><FlowNext onClick={onDone} /></>}>
      <div className="space-y-3">
        {rows.map((r, i) => (
          <div key={r.name} className={cx("rounded-2xl border-l-4 p-4", r.bar)}>
            <div className="flex items-center gap-3">
              <span className="text-2xl">{r.icon}</span>
              <div className="flex-1 font-bold text-slate-900">{r.name}</div>
              <div className="flex items-center gap-1">
                <span className="text-slate-400 font-bold">$</span>
                <input
                  type="number"
                  value={r.val || ""}
                  placeholder="0"
                  onChange={(e) => setVal(i, e.target.value)}
                  className="w-20 rounded-lg border bg-white p-1.5 text-right font-bold outline-none focus:border-blue-400 transition-colors"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </Sheet2>
  );
}

export function NetWorthFlow({ onDone, onBack }) {
  const [step, setStep] = useState(0);
  const [assets, setAssets] = useState([]);
  const [liabs, setLiabs] = useState([]);
  const toggle = (set, val) => set((p) => p.includes(val) ? p.filter((x) => x !== val) : [...p, val]);

  return (
    <Sheet2 title={step === 0 ? "Select Assets" : "Select Liabilities"} sub="Track what you own and owe" footer={<><FlowBack onClick={step === 0 ? onBack : () => setStep(0)} /><FlowNext onClick={step === 0 ? () => setStep(1) : onDone} /></>}>
      <div className="flex flex-wrap gap-2">
        {(step === 0 ? ASSETS : LIABILITIES).map(([ic, n]) => (
          <SelectPill key={n} icon={ic} label={n} active={(step === 0 ? assets : liabs).includes(n)} onClick={() => toggle(step === 0 ? setAssets : setLiabs, n)} />
        ))}
      </div>
    </Sheet2>
  );
}

export function AllSet({ onDone }) {
  return (
    <div className="absolute inset-0 z-30 flex flex-col justify-end bg-black/30">
      <div className="rounded-t-[36px] bg-white px-6 pb-8 pt-7 text-center shadow-2xl">
        <span className="rounded-full bg-purple-100 px-4 py-1.5 text-sm font-bold text-purple-600">🎉 Ready!</span>
        <h1 className="mt-4 text-4xl font-extrabold leading-tight text-slate-900">You're all set!</h1>
        <p className="mt-3 text-slate-500 font-medium">We've unlocked full access for 30 days.</p>
        <button onClick={onDone} className="mt-8 w-full rounded-full bg-blue-500 py-5 text-xl font-bold text-white shadow-lg active:scale-95 transition-transform">Get Started</button>
      </div>
    </div>
  );
}
