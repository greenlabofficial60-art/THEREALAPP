import { CATS, TINT, PERIODS } from '../constants';

export const uid = () => Math.random().toString(36).slice(2, 9);
export const todayISO = () => new Date().toISOString().slice(0, 10);
export const dISO = (d) => d.toISOString().slice(0, 10);

export const fmtK = (n) => {
  const a = Math.abs(n);
  const s = n < 0 ? "-" : "";
  if (a >= 1000) return s + "$" + (a / 1000).toFixed(1).replace(/\.0$/, "") + "k";
  return s + "$" + Math.round(a);
};

export const fmtFull = (n) =>
  (n < 0 ? "-" : "") + "$" + Math.abs(n).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export function step(d, f) {
  const n = new Date(d);
  if (f === "daily") n.setDate(n.getDate() + 1);
  else if (f === "weekly") n.setDate(n.getDate() + 7);
  else if (f === "biweekly") n.setDate(n.getDate() + 14);
  else if (f === "monthly") n.setMonth(n.getMonth() + 1);
  else if (f === "yearly") n.setFullYear(n.getFullYear() + 1);
  else n.setDate(n.getDate() + 1e6);
  return n;
}

export function occurrences(tx, start, end) {
  const out = [];
  let cur = new Date(tx.date + "T00:00:00");
  if (tx.frequency === "once") return cur >= start && cur <= end ? [new Date(cur)] : [];
  let g = 0;
  while (cur < start && g++ < 6000) cur = step(cur, tx.frequency);
  g = 0;
  while (cur <= end && g++ < 6000) { if (cur >= start) out.push(new Date(cur)); cur = step(cur, tx.frequency); }
  return out;
}

export const tintFor = (tx) => (tx.type === "income" ? TINT.income : tx.type === "goal" ? TINT.goal : TINT[tx.category] || TINT.default);

export const catMeta = (id) => {
  if (id === "goal") return { id: "goal", label: "Goal", icon: "🌱" };
  for (const k of ["income", "expense"]) for (const c of CATS[k]) if (c.id === id) return c;
  return { id, label: "Other", icon: "•" };
};

export function startOfPeriod(d, period) {
  const x = new Date(d); x.setHours(0, 0, 0, 0);
  if (period === "monthly") { x.setDate(1); return dISO(x); }
  x.setDate(x.getDate() - x.getDay());
  return dISO(x);
}

export function endOfPeriod(startISO, period) {
  const days = PERIODS.find((p) => p.id === period)?.days || 7;
  const e = new Date(startISO + "T00:00:00");
  if (period === "monthly") { e.setMonth(e.getMonth() + 1); e.setDate(0); return dISO(e); }
  e.setDate(e.getDate() + days - 1);
  return dISO(e);
}

export function buildForecastSentence(accTxns, balance, dayMap, thresholds) {
  const th = thresholds || { clear: 500, partly: 300, rain: 100, storm: 0 };
  const tier = (bal) => {
    if (bal >= th.clear) return { icon: "☀️", color: "#1a8a4a", bg: "#e3f7e8", accent: "#30d158", title: "Clear Skies" };
    if (bal >= th.partly) return { icon: "⛅", color: "#0a64d6", bg: "#e3f0ff", accent: "#0a84ff", title: "Partly Cloudy" };
    if (bal >= th.rain) return { icon: "🌧️", color: "#8a5a00", bg: "#fff3d6", accent: "#ff9f0a", title: "Rain Expected" };
    return { icon: "⛈️", color: "#9b1c1c", bg: "#fde8e8", accent: "#ff453a", title: "Storm Warning" };
  };
  const keys = Object.keys(dayMap).filter((k) => k > todayISO() && dayMap[k].changed).sort();
  if (!keys.length) return { ...tier(balance), body: "No upcoming activity. Tap + to add activity." };

  const k = keys.find((kk) => dayMap[kk].txs.some((t) => t.type === "expense")) || keys[0];
  const day = new Date(k + "T00:00:00");
  const dayTxs = dayMap[k].txs;
  const exp = dayTxs.filter((t) => t.type === "expense");
  const bal = dayMap[k].balance;
  const lead = exp[0];
  const m = lead ? catMeta(lead.category) : null;
  const dateStr = day.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  const extra = dayTxs.length - 1;
  const desc = lead
    ? `After ${m.icon} ${lead.name}${extra > 0 ? ` + ${extra} more` : ""} on ${dateStr}, you'll have ${fmtK(bal)} left`
    : `On ${dateStr} you'll have ${fmtK(bal)}`;
  return { ...tier(bal), body: desc };
}
