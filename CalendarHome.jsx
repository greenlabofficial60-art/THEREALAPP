import React, { useState } from "react";
import { cx, fmt } from "./constants";
import { TopBar, TabBar } from "./SharedUI";
import { EVENTS, BALANCES } from "./mockData";

const DAY_HEADERS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export function CalendarHome({ openMenu, openCash, openInsights, openWeather }) {
  const [viewDate, setViewDate] = useState(new Date());

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const firstDayRaw = new Date(year, month, 1).getDay();
  const firstDay = (firstDayRaw + 6) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const monthLabel = viewDate.toLocaleString("default", { month: "long", year: "numeric" });

  const changeMonth = (offset) => setViewDate(new Date(year, month + offset, 1));
  const now = new Date();
  const isCurrentMonth = now.getFullYear() === year && now.getMonth() === month;

  const cells = [];
  for (let i = 0; i < firstDay; i++) cells.push({ blank: true });
  for (let d = 1; d <= daysInMonth; d++) cells.push({ day: d });

  return (
    <div className="flex h-full flex-col bg-white">
      <TopBar today="$7.5k" openMenu={openMenu} openCash={openCash} openInsights={openInsights} openWeather={openWeather} />

      <div className="mx-3 mb-1 rounded-2xl border border-emerald-100 bg-emerald-50 px-4 py-2.5">
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1.5 text-sm font-bold text-emerald-700">☀️ Clear Skies</span>
          <button onClick={openWeather} className="rounded-lg border border-emerald-200 bg-white px-2.5 py-0.5 text-xs font-semibold text-emerald-600">Edit</button>
        </div>
        <p className="mt-0.5 text-xs text-emerald-700">After 🏠 Rent on Jun 1, you'll have <b>$7.3k left</b></p>
      </div>

      <div className="flex items-center justify-center gap-3 py-1">
        <button onClick={() => changeMonth(-1)} className="px-2 text-lg text-slate-400">‹</button>
        <span className="text-sm font-bold text-slate-700">{monthLabel}</span>
        <button onClick={() => changeMonth(1)} className="px-2 text-lg text-slate-400">›</button>
      </div>

      <div className="flex-1 overflow-y-auto pb-24">
        <div className="grid grid-cols-7">
          {DAY_HEADERS.map(h => (
            <div key={h} className="border-b border-slate-200 py-1 text-center text-[10px] font-semibold text-slate-400 uppercase">{h}</div>
          ))}
          {cells.map((c, i) => (
            <DayCell key={i} {...c} isToday={isCurrentMonth && c.day === now.getDate()} />
          ))}
        </div>
      </div>
      <TabBar onInsights={openInsights} />
    </div>
  );
}

function DayCell({ day, blank, isToday }) {
  if (blank) return <div className="min-h-[80px] border-b border-r border-slate-50" />;
  const evs = EVENTS[day] || [];
  const bal = BALANCES[day];
  return (
    <div className={cx("min-h-[80px] border-b border-r border-slate-50 p-1", isToday && "bg-blue-50/30")}>
      <div className={cx("mb-0.5 grid h-6 w-6 place-items-center rounded-full text-[11px] font-bold", isToday ? "bg-blue-500 text-white" : "text-slate-700")}>{day}</div>
      {bal != null && <div className="text-[8px] font-bold text-slate-400 mb-0.5">{fmt(Math.abs(bal))}</div>}
      <div className="space-y-0.5">
        {evs.slice(0, 2).map((e, k) => (
          <div key={k} className={cx("rounded border-l-2 px-1 py-0.5 text-[8px] leading-tight", e.color)}>
            <div className="truncate font-semibold">{e.emoji} {e.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
