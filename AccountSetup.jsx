import React, { useState } from "react";
import { cx, money } from "./constants";

export function AccountSetup({ onDone }) {
  const [step, setStep] = useState(0);
  const [accts, setAccts] = useState([
    { icon: "🏦", name: "Checking", amt: 2500, on: true },
    { icon: "💰", name: "Savings", amt: 5000, on: true },
    { icon: "💵", name: "Cash", amt: 200, on: false },
  ]);
  const [income] = useState(["Hourly Job"]);

  const next = () => setStep((s) => s + 1);
  const back = () => setStep((s) => Math.max(0, s - 1));
  const toggle = (i) => setAccts((p) => p.map((a, k) => k === i ? { ...a, on: !a.on } : a));

  const Sheet = ({ title, sub, children, footer }) => (
    <div className="absolute inset-0 flex flex-col justify-end bg-black/30">
      <div className="flex max-h-[88%] flex-col rounded-t-[36px] bg-white px-6 pb-6 pt-7">
        <h1 className="text-3xl font-extrabold">{title}</h1>
        {sub && <p className="mt-1 text-slate-500">{sub}</p>}
        <div className="mt-5 flex-1 overflow-y-auto">{children}</div>
        <div className="mt-4 flex gap-3">{footer}</div>
      </div>
    </div>
  );

  const SetupNext = (props) => (
    <button {...props} className="flex-1 rounded-2xl bg-blue-500 py-4 text-center font-bold text-white">Next →</button>
  );
  const SetupBack = () => (
    <button onClick={back} className="rounded-2xl bg-slate-100 px-6 py-4 font-bold text-slate-600">‹ Back</button>
  );

  const screens = [
    <div key="w" className="absolute inset-0 flex flex-col justify-end bg-black/30">
      <div className="m-4 rounded-[36px] bg-white p-8 text-center" style={{ paddingBottom: "max(56px, env(safe-area-inset-bottom))" }}>
        <div className="mx-auto mb-4 grid h-20 w-20 place-items-center rounded-full bg-slate-100 text-4xl">🚀</div>
        <h1 className="text-3xl font-extrabold">Welcome to CashCycle</h1>
        <p className="mt-2 text-slate-500">Set up your finances in just a few minutes.</p>
        <button onClick={next} className="mt-6 w-full rounded-2xl bg-blue-500 py-4 font-bold text-white">Next →</button>
      </div>
    </div>,
    <Sheet key="s" title="Select Your Accounts" sub="Choose the accounts you want to track" footer={<><SetupBack /><SetupNext onClick={next} /></>}>
      <div className="flex flex-wrap gap-2">
        {accts.map((a, i) => (
          <button key={a.name} onClick={() => toggle(i)} className={cx("rounded-full px-5 py-3 font-semibold transition", a.on ? "bg-blue-500 text-white" : "bg-slate-100 text-slate-600")}>
            {a.icon} {a.name} <span>{money(a.amt)}</span>
          </button>
        ))}
      </div>
    </Sheet>,
    <Sheet key="ri" title="Review Your Income" sub="Edit amounts or delete income sources" footer={<><SetupBack /><button onClick={onDone} className="flex-1 rounded-2xl bg-blue-500 py-4 font-bold text-white">Next →</button></>}>
      {income.map((n) => (
        <div key={n} className="flex items-center justify-between rounded-2xl bg-slate-50 p-4">
          <div className="flex items-center gap-3"><span>🕐</span><div><div className="font-semibold">{n}</div></div></div>
          <div className="text-right"><div className="text-2xl font-extrabold">$1,600.00</div></div>
        </div>
      ))}
    </Sheet>
  ];

  return <div className="relative h-full">{screens[step]}</div>;
}
