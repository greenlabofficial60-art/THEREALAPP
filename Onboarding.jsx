import React, { useState } from "react";
import { cx, LANGS } from "./constants";
import { PrimaryBtn, Check } from "./SharedUI";

export function Onboarding({ onDone }) {
  const [step, setStep] = useState(0);
  const [lang, setLang] = useState("English");
  const [name, setName] = useState("");
  const [country] = useState("United States");
  const [theme] = useState("light");

  const next = () => setStep((s) => s + 1);

  const Card = ({ icon, title, sub, children, footer }) => (
    <div className="flex flex-1 flex-col px-6 pt-6">
      {icon && <div className="mx-auto mb-3 grid h-16 w-16 place-items-center rounded-full bg-slate-100 text-3xl">{icon}</div>}
      <h1 className="text-center text-3xl font-extrabold tracking-tight">{title}</h1>
      {sub && <p className="mt-2 text-center text-slate-500">{sub}</p>}
      <div className="mt-6 flex-1 overflow-y-auto">{children}</div>
      <div className="safe-bottom sticky bottom-0 flex items-center justify-center gap-3 bg-white/80 py-4 backdrop-blur">{footer}</div>
    </div>
  );

  const steps = [
    <Card key="lang" icon="🗛" title="Choose your language" sub="You can change this later in Settings" footer={<PrimaryBtn onClick={next}>Next →</PrimaryBtn>}>
      <div className="space-y-3">
        {LANGS.map(([n, en]) => (
          <button key={n} onClick={() => setLang(n)} className={cx("flex w-full items-center justify-between rounded-2xl border px-5 py-4 text-left transition", lang === n ? "border-slate-400 bg-slate-50" : "border-slate-200")}>
            <div><div className="font-bold">{n}</div><div className="text-sm text-slate-500">{en}</div></div>
            <Check on={lang === n} />
          </button>
        ))}
      </div>
    </Card>,
    <Card key="name" icon="👤" title="What's your first name?" sub="We'll use this to personalize your experience">
      <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter your first name" className="w-full rounded-2xl border border-slate-200 px-5 py-4 text-lg outline-none focus:border-blue-400" />
      <button
        onClick={next}
        disabled={!name}
        className={cx("mt-4 w-full rounded-2xl py-4 font-bold text-white", name ? "bg-blue-500" : "bg-slate-200 text-slate-400")}
      >
        Continue
      </button>
    </Card>,
    <Card key="done" icon="🚀" title={`Welcome${name ? ", " + name : ""}!`} sub="Next, let's set up your accounts." footer={<PrimaryBtn onClick={() => onDone({ name })}>Get Started →</PrimaryBtn>}>
      <div className="rounded-2xl bg-slate-50 p-6 text-center text-slate-500">
        Language: <b>{lang}</b><br />
        Country: <b>{country}</b><br />
        Theme: <b>{theme}</b>
      </div>
    </Card>
  ];

  return (
    <div className="flex h-full flex-col">
      <div className="h-1.5 w-full bg-slate-100">
        <div
          className="h-full bg-blue-500 transition-all"
          style={{ width: `${((step + 1) / steps.length) * 100}%` }}
        />
      </div>
      {steps[step]}
    </div>
  );
}
