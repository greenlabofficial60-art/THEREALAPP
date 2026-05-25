import { createContext } from "react";

export const cx = (...a) => a.filter(Boolean).join(" ");
export const fmt = (n) => n >= 1000 ? `$${(n / 1000).toFixed(n % 1000 === 0 ? 0 : 1)}k` : `$${n}`;
export const money = (n) => n.toLocaleString("en-US", { style: "currency", currency: "USD" });

export const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];
export const DOW = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export const FREQ_LABEL = {
  once: "One-time", daily: "Daily", weekly: "Weekly",
  biweekly: "Every 2 weeks", monthly: "Monthly", yearly: "Yearly",
};

export const CATS = {
  income: [
    { id: "hourly", label: "Hourly", icon: "⏱️" },
    { id: "salary", label: "Paycheck", icon: "💵" },
    { id: "freelance", label: "Freelance", icon: "💻" },
    { id: "other-in", label: "Other income", icon: "➕" },
  ],
  expense: [
    { id: "rent", label: "Rent", icon: "🏠" },
    { id: "car", label: "Car payment", icon: "🚗" },
    { id: "phone", label: "Phone", icon: "📱" },
    { id: "bills", label: "Bills", icon: "💡" },
    { id: "food", label: "Food", icon: "🍔" },
    { id: "subs", label: "Subscriptions", icon: "📺" },
    { id: "other-out", label: "Other", icon: "➖" },
  ],
};

export const TINT = {
  income:  { bg: "#d6f5e3", accent: "#30d158", text: "#0b6b39" },
  rent:    { bg: "#e7ddd6", accent: "#a07d63", text: "#5c4631" },
  car:     { bg: "#cfeafe", accent: "#0a84ff", text: "#0a4a8a" },
  phone:   { bg: "#dcdcf7", accent: "#5e5ce6", text: "#3a3a8a" },
  bills:   { bg: "#fff0c9", accent: "#ff9f0a", text: "#8a5a00" },
  food:    { bg: "#ffe0d6", accent: "#ff6b3d", text: "#8a3a1a" },
  subs:    { bg: "#f3d9f0", accent: "#bf5af2", text: "#7a2e8a" },
  goal:    { bg: "#dcf5dc", accent: "#34c759", text: "#1a6e2e" },
  default: { bg: "#eaeaef", accent: "#8e8e93", text: "#444" },
};

export const BUDGET_CATEGORIES = [
  { id: "personal", label: "Personal", icon: "🛍️", bg: "#fbdce7" },
  { id: "transport", label: "Transportation", icon: "🚗", bg: "#cfe9fb" },
  { id: "education", label: "Education", icon: "📚", bg: "#d3f1e4" },
  { id: "entertainment", label: "Entertainment", icon: "🎬", bg: "#e7dcf6" },
  { id: "food", label: "Food", icon: "🍔", bg: "#fdefc8" },
  { id: "healthcare", label: "Healthcare", icon: "🏥", bg: "#fbd9dd" },
  { id: "housing", label: "Housing", icon: "🏠", bg: "#e7ddd0" },
  { id: "utilities", label: "Utilities", icon: "💡", bg: "#fdf0c4" },
  { id: "savings", label: "Savings", icon: "🌱", bg: "#d8f3d8" },
];

export const PERIODS = [
  { id: "weekly", label: "Weekly", days: 7, sub: "Plan your budget week by week", icon: "📅", bg: "#d3f1d8", confirm: false },
  { id: "monthly", label: "Monthly", days: 30, sub: "Traditional monthly budgeting", icon: "🗓️", bg: "#efdcf7", confirm: true },
  { id: "payperiod", label: "Pay Period", days: 14, sub: "Match your specific pay schedule", icon: "💵", bg: "#fde7c4", confirm: true },
  { id: "custom", label: "Custom Range", days: 14, sub: "Choose your own start and end dates", icon: "🎚️", bg: "#ececef", confirm: true },
];

export const US_BANKS = [
  "Chase", "Bank of America", "Wells Fargo", "Citibank", "PNC Bank", "U.S. Bank",
  "Capital One", "TD Bank", "Truist", "Goldman Sachs (Marcus)", "American Express",
  "Discover", "Ally Bank", "Charles Schwab Bank", "Fifth Third Bank", "Citizens Bank",
  "KeyBank", "Regions Bank", "Huntington Bank", "M&T Bank", "BMO Harris", "HSBC",
  "Navy Federal Credit Union", "USAA", "SoFi", "Chime", "Synchrony Bank",
  "Barclays", "First Citizens Bank", "Comerica", "Other / Local bank",
];

export const BUDGETS = {
  expense: [
    { id: "housing", label: "Housing", icon: "🏠", icons: ["🏠", "🏢", "🏘️", "🔑", "🛋️", "🧰"] },
    { id: "transport", label: "Transport", icon: "🚗", icons: ["🚗", "⛽", "🚕", "🚌", "🚲", "🛣️"] },
    { id: "food", label: "Food", icon: "🍔", icons: ["🍔", "🛒", "🍕", "☕", "🍽️", "🥗"] },
    { id: "utilities", label: "Utilities", icon: "💡", icons: ["💡", "💧", "🔥", "📶", "📱", "🗑️"] },
    { id: "fun", label: "Lifestyle", icon: "📺", icons: ["📺", "🎮", "🎬", "🛍️", "✈️", "🎁"] },
    { id: "health", label: "Health", icon: "💊", icons: ["💊", "🏥", "🦷", "🏋️", "🧘", "👓"] },
    { id: "other", label: "Other", icon: "💳", icons: ["💳", "📦", "📝", "❓", "💸", "🔖"] },
  ],
  income: [
    { id: "salary", label: "Salary", icon: "💵", icons: ["💵", "🏦", "💼", "📈", "🪙", "💰"] },
    { id: "side", label: "Side income", icon: "💻", icons: ["💻", "🛠️", "🎨", "📷", "🚚", "✍️"] },
    { id: "gift", label: "Gifts", icon: "🎁", icons: ["🎁", "❤️", "🎉", "🤝", "💌", "🧧"] },
    { id: "other-in", label: "Other", icon: "➕", icons: ["➕", "📥", "🔁", "🏷️", "💲", "📊"] },
  ],
  goal: [
    { id: "savings", label: "Savings", icon: "🌱", icons: ["🌱", "🏦", "🐷", "💰", "🌳", "🪴"] },
    { id: "emergency", label: "Emergency", icon: "🛟", icons: ["🛟", "🚨", "⛑️", "🔒", "🛡️", "📦"] },
    { id: "bigbuy", label: "Big purchase", icon: "🛍️", icons: ["🛍️", "🚗", "🏠", "✈️", "💍", "💻"] },
    { id: "debt", label: "Pay off debt", icon: "✂️", icons: ["✂️", "💳", "🎓", "🏦", "📉", "🆓"] },
  ],
};

export const RECURRENCE = [
  { id: "once", label: "None" },
  { id: "weekly", label: "Weekly" },
  { id: "biweekly", label: "Every 2 wks" },
  { id: "monthly", label: "Monthly" },
  { id: "yearly", label: "Yearly" },
];

export const INCOME_ICONS = ["💰", "💵", "💴", "💶", "💷", "🏢", "💼", "📈", "⏱️", "💻", "🎁", "🪙"];

export const SOURCE_TYPES = [
  { id: "salary", label: "Salary", icon: "💵" },
  { id: "hourly", label: "Hourly", icon: "⏱️" },
  { id: "freelance", label: "Freelance", icon: "💻" },
  { id: "business", label: "Business", icon: "🏢" },
  { id: "investments", label: "Investments", icon: "📈" },
  { id: "other", label: "Other", icon: "💰" },
];

export const RECUR_UNITS = [
  { id: "day", label: "Day(s)" },
  { id: "week", label: "Week(s)" },
  { id: "month", label: "Month(s)" },
  { id: "year", label: "Year(s)" },
];

export const LANGS = [
  ["English", "English"], ["Español", "Spanish"], ["Français", "French"],
  ["Italiano", "Italian"], ["Deutsch", "German"],
];

export const TabCtx = createContext({ tab: "home", setTab: () => {} });

export const ACCENTS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#ec4899"];

export const INCOME_SOURCES = [
  ["💵", "Salary"], ["🕐", "Hourly Job"], ["💻", "Freelance"], ["🚗", "Gig Work"],
];

export const BUDGET_CYCLES = [
  ["📅", "Weekly", "Plan your budget week by week"],
  ["🗓️", "Monthly", "Traditional monthly budgeting"],
];

export const WEEKLY_BUDGET_ROWS = [
  { icon: "🍔", name: "Food", bar: "border-amber-400 bg-amber-50", val: 0 },
  { icon: "🚗", name: "Transportation", bar: "border-sky-400 bg-sky-50", val: 400 },
];

export const ASSETS = [["🚗", "Vehicle"], ["🏠", "Home"], ["📈", "Investment"]];
export const LIABILITIES = [["🏠", "Mortgage"], ["🚗", "Auto Loan"], ["💳", "Credit Card"]];
export const GOAL_OPTIONS = { "Savings Goals": [["🚨", "Emergency Fund"], ["✈️", "Vacation"]] };
