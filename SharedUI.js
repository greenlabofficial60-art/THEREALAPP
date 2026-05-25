import React, { useContext } from "react";
import { cx, TabCtx } from "./constants";

/* ---- shared SVG props ---- */
const ICON = { width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" };

/* ===================== SHARED UI ===================== */
export function PrimaryBtn({ children, onClick, disabled }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cx("flex items-center justify-center gap-2 rounded-full px-8 py-4 font-bold text-white transition active:scale-95",
      disabled ? "bg-slate-300" : "bg-blue-500 hover:bg-blue-600 shadow-lg shadow-blue-500/30")}
    >
      {children}
    </button>
  );
}

export function Pill({ active, children, onClick }) {
  return (
    <button
      onClick={onClick}
      className={cx("rounded-full px-5 py-3 text-sm font-semibold transition active:scale-95 border",
      active ? "bg-blue-500 text-white border-blue-500" : "bg-slate-100 text-slate-700 border-transparent hover:bg-slate-200")}
    >
      {children}
    </button>
  );
}

export function Check({ on }) {
  return (
    <span className={cx("flex h-7 w-7 items-center justify-center rounded-full text-white text-sm transition",
      on ? "bg-blue-500" : "bg-slate-200 text-transparent")}>✓</span>
  );
}

export function BackBtn({ onClick }) {
  return <button onClick={onClick} className="grid h-12 w-12 place-items-center rounded-full bg-slate-100 text-xl">‹</button>;
}

/* ===================== TOP BAR ===================== */
export function TopBar({ today = "$0.00", openMenu, openInsights, openCash, openWeather }) {
  return (
    <div className="safe-top flex items-center justify-between px-4 pt-3 pb-2">
      <div className="flex gap-2">
        <button onClick={openMenu} className="grid h-11 w-11 place-items-center rounded-full bg-slate-100 text-xl transition active:scale-90 text-slate-900">≡</button>
        <div className="grid h-11 w-11 place-items-center rounded-full bg-slate-100 text-lg">💬</div>
      </div>
      <button onClick={openCash} className="rounded-full bg-slate-100 px-6 py-1.5 text-center transition active:scale-95 text-slate-900">
        <div className="text-lg font-extrabold leading-none">{today}</div>
        <div className="text-[11px] font-semibold text-slate-500">Updated 2 days ago</div>
      </button>
      <div className="flex gap-2">
        <button onClick={openInsights} className="grid h-11 w-11 place-items-center rounded-full bg-slate-100 text-slate-500 transition active:scale-90">📊</button>
        <button onClick={openWeather} className="grid h-11 w-11 place-items-center rounded-full bg-slate-100 text-slate-400 transition active:scale-90">🏆</button>
      </div>
    </div>
  );
}

/* ===================== LAYOUT HELPERS ===================== */
export function Toggle({ on, onClick }) {
  return (
    <button onClick={onClick} className={cx("h-8 w-14 rounded-full p-1 transition", on ? "bg-blue-500" : "bg-slate-300")}>
      <div className={cx("h-6 w-6 rounded-full bg-white transition", on && "translate-x-6")} />
    </button>
  );
}

export function Row({ l, sub, r }) {
  return (
    <div className="flex items-center justify-between py-4">
      <div><div className="font-bold text-slate-900">{l}</div>{sub && <div className="text-sm text-slate-500">{sub}</div>}</div>
      <span className="text-slate-400">{r}</span>
    </div>
  );
}

export function ToggleRow({ l, sub, on, set }) {
  return (
    <div className="flex items-center justify-between py-4">
      <div className="flex-1 pr-3"><div className="font-bold text-slate-900">{l}</div>{sub && <div className="text-sm text-slate-500">{sub}</div>}</div>
      <Toggle on={on} onClick={() => set(!on)} />
    </div>
  );
}

export function Sheet2({ title, sub, children, footer, scroll = true }) {
  return (
    <div className="absolute inset-0 z-30 flex flex-col justify-end bg-black/30">
      <div className="flex max-h-[90%] flex-col rounded-t-[36px] bg-white px-6 pb-6 pt-7">
        <h1 className="text-3xl font-extrabold tracking-tight">{title}</h1>
        {sub && <p className="mt-1 text-slate-500">{sub}</p>}
        <div className={cx("mt-5 flex-1", scroll && "overflow-y-auto")}>{children}</div>
        <div className="mt-4 flex gap-3">{footer}</div>
      </div>
    </div>
  );
}

export function SummaryCard({ title, total, rows }) {
  return (
    <div className="mb-4 rounded-2xl bg-slate-50 p-4 text-slate-900">
      <div className="flex items-center justify-between font-bold"><span>{title}</span><span>{total}</span></div>
      <div className="mt-2 divide-y">
        {rows.map(([l, v]) => (
          <div key={l} className="flex items-center justify-between py-2 text-slate-600"><span>{l}</span><span className="font-semibold text-slate-700">{v}</span></div>
        ))}
      </div>
    </div>
  );
}

/* ---- Flow Navigation Helpers ---- */
export function SelectPill({ icon, label, active, onClick }) {
  return (
    <button onClick={onClick} className={cx("flex items-center gap-2 rounded-full border px-4 py-3 text-sm font-semibold transition active:scale-95",
      active ? "border-blue-500 bg-blue-50 text-blue-700" : "border-slate-200 bg-slate-50 text-slate-700")}>
      <span>{icon}</span>{label}{active && <span className="text-blue-500">✓</span>}
    </button>
  );
}

export function FlowBack({ onClick }) {
  return <button onClick={onClick} className="rounded-2xl bg-slate-100 px-6 py-4 font-bold text-slate-600">‹ Back</button>;
}

export function FlowNext({ onClick, label = "Next →" }) {
  return <button onClick={onClick} className="flex-1 rounded-2xl bg-blue-500 py-4 font-bold text-white active:scale-95">{label}</button>;
}

export function SideMenu({ open, onClose, go, dark, setDark, onCheckUpdate }) {
  if (!open) return null;
  const items = [
    { key: "home",     label: "Forecast",         dest: "home",      icon: <CalendarIcon /> },
    { key: "trading",  label: "Trading",            dest: "trading",   icon: <BarsIcon /> },
    { key: "profile",  label: "Profile",           dest: "profile",   icon: <UserIcon /> },
    { key: "settings", label: "Settings",          dest: "settings",  icon: <GearIcon /> },
    { key: "update",   label: "Check for Update",  dest: null,        icon: <DownloadIcon /> },
  ];
  return (
    <div className="absolute inset-0 z-40 flex" onClick={onClose}>
      <div
        className="flex h-full w-[80%] flex-col bg-[#f4f4f5] px-5 pt-6 shadow-2xl"
        style={{ animation: "slideIn .25s ease-out" }}
        onClick={(e) => e.stopPropagation()}
      >
        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">Menu</h1>
        <div className="mt-6 flex items-center justify-between px-1">
          <span className="flex items-center gap-3 text-lg font-semibold text-slate-900">
            <SunIcon /> Dark Mode
          </span>
          <Toggle on={dark} onClick={() => setDark(!dark)} />
        </div>
        <div className="mt-4 space-y-3">
          {items.map((it) => (
            <button
              key={it.key}
              onClick={() => { onClose(); it.dest ? go(it.dest) : it.key === "update" ? onCheckUpdate?.() : null; }}
              className="flex w-full items-center gap-4 rounded-2xl bg-white px-5 py-5 text-left text-xl font-semibold shadow-sm transition active:scale-[0.98] text-slate-900"
            >
              <span className="text-slate-900">{it.icon}</span>
              {it.label}
            </button>
          ))}
        </div>
      </div>
      <div className="h-full flex-1 bg-black/30" />
    </div>
  );
}

/* --- Menu Icons --- */
export function UserIcon() {
  return <svg {...ICON}><circle cx="12" cy="8" r="4" /><path d="M5 21c0-3.9 3.1-7 7-7s7 3.1 7 7" /></svg>;
}
export function GearIcon() {
  return (
    <svg {...ICON}>
      <circle cx="12" cy="12" r="3.2" />
      <path d="M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3M5 5l2.1 2.1M16.9 16.9 19 19M19 5l-2.1 2.1M7.1 16.9 5 19" />
    </svg>
  );
}
export function DownloadIcon() {
  return <svg {...ICON}><path d="M12 3v12M7 11l5 5 5-5M4 20h16" /></svg>;
}
export function SunIcon() {
  return <svg {...ICON}><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.5 1.5M17.5 17.5 19 19M19 5l-1.5 1.5M6.5 17.5 5 19" /></svg>;
}

/* --- Top Bar Icons --- */
export function MenuIcon()   { return <svg {...ICON}><path d="M4 7h16M4 12h16M4 17h16" /></svg>; }
export function ChatIcon()   { return <svg {...ICON}><path d="M21 12a8 8 0 0 1-11.5 7.2L4 20l1-4.5A8 8 0 1 1 21 12z" /></svg>; }
export function BarsIcon()   { return <svg {...ICON}><path d="M6 20V10M12 20V4M18 20v-7" /></svg>; }
export function TrophyIcon() { return <svg {...ICON}><path d="M7 4h10v4a5 5 0 0 1-10 0V4zM5 5H3v2a3 3 0 0 0 3 3M19 5h2v2a3 3 0 0 1-3 3M9 18h6M10 18l.5-3h3l.5 3" /></svg>; }

/* ===================== TAB BAR ===================== */
export function TabBar({ onInsights }) {
  const { tab, setTab } = useContext(TabCtx);
  const items = [["home", "📅"], ["trading", "📊"], ["add", "+"], ["debt", "⊞"], ["goals", "💳"]];
  return (
    <div className="absolute bottom-0 left-0 right-0 flex items-center justify-around border-t bg-white/95 px-4 py-3 backdrop-blur">
      {items.map(([k, ic]) => k === "add" ? (
        <button key={k} className="grid h-14 w-14 place-items-center rounded-full bg-[#5b7cfa] shadow-lg shadow-blue-500/30 active:scale-95 transition">
          <PlusIcon />
        </button>
      ) : (
        <DockBtn key={k} active={tab === k} label={k}
          onClick={() => k === "insights" ? onInsights?.() : setTab(k)}>
          {k === "home"    && <CalendarIcon />}
          {k === "insights"&& <PieIcon />}
          {k === "debt"    && <GridIcon />}
          {k === "goals"   && <CardIcon />}
        </DockBtn>
      ))}
    </div>
  );
}

/* ===================== DOCK NAV ICONS & HELPERS ===================== */
export function CalendarIcon() {
  return (
    <svg {...ICON}>
      <rect x="3" y="4.5" width="18" height="16" rx="3" />
      <path d="M3 9h18M8 2.5v4M16 2.5v4" />
      {[8,12,16].map((x) => [12,16].map((y) => <circle key={`${x}-${y}`} cx={x} cy={y} r="0.6" fill="currentColor" stroke="none" />))}
    </svg>
  );
}

export function PieIcon() {
  return (
    <svg {...ICON}>
      <path d="M12 3a9 9 0 1 0 9 9h-9V3z" />
      <path d="M12 3v9h9" opacity="0.35" />
    </svg>
  );
}

export function PlusIcon() {
  return <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round"><path d="M12 5v14M5 12h14" /></svg>;
}

export function GridIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
      {[5,12,19].map((x) => [5,12,19].map((y) => <circle key={`${x}-${y}`} cx={x} cy={y} r="1.6" />))}
    </svg>
  );
}

export function CardIcon() {
  return (
    <svg {...ICON}>
      <rect x="2.5" y="6" width="19" height="13" rx="2.5" />
      <path d="M2.5 10.5h6" />
    </svg>
  );
}

export function DockBtn({ active, onClick, label, children }) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      className={cx(
        "grid h-12 w-12 place-items-center rounded-full transition active:scale-90",
        active ? "text-[#5b7cfa]" : "text-slate-800"
      )}
    >
      {children}
    </button>
  );
}

/* ===================== DOCK NAV ===================== */
export function DockNav({ active, onSelect, onAdd }) {
  return (
    <div className="absolute bottom-5 left-1/2 z-20 -translate-x-1/2 w-full max-w-[360px] px-4">
      <div className="flex items-center justify-between rounded-full bg-white px-3 py-2 shadow-[0_8px_30px_rgba(0,0,0,0.12)] ring-1 ring-black/5">
        <DockBtn label="calendar" active={active === "home"} onClick={() => onSelect("home")}>
          <CalendarIcon />
        </DockBtn>

        <DockBtn label="insights" active={active === "insights"} onClick={() => onSelect("insights")}>
          <PieIcon />
        </DockBtn>

        <button
          onClick={onAdd}
          aria-label="Add"
          className="mx-1 grid h-14 w-14 place-items-center rounded-full bg-[#5b7cfa] text-white shadow-lg shadow-[#5b7cfa]/40 transition active:scale-90"
        >
          <PlusIcon />
        </button>

        <DockBtn label="debt" active={active === "debt"} onClick={() => onSelect("debt")}>
          <GridIcon />
        </DockBtn>

        <button
          onClick={() => onSelect("goals")}
          aria-label="cards"
          className={cx(
            "grid h-12 w-12 place-items-center rounded-full ring-1 transition active:scale-90",
            active === "goals" ? "ring-[#5b7cfa] text-[#5b7cfa]" : "ring-slate-200 text-slate-800"
          )}
        >
          <CardIcon />
        </button>
      </div>
    </div>
  );
}
