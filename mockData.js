export const DEFAULT_TXS = [
  { id: 1, type: "expense", emoji: "🛒", label: "Groceries", amt: 75, date: "Today", category: "Food" },
  { id: 2, type: "expense", emoji: "📺", label: "Netflix", amt: 20, date: "Today", category: "Entertainment" },
  { id: 3, type: "income", emoji: "💰", label: "Paycheck", amt: 1600, date: "Today", category: "Income" },
];

export const CATEGORIES = [
  { icon: "🍔", name: "Food", used: 95, planned: 232, pct: 41, bar: "bg-amber-400", text: "text-amber-500" },
  { icon: "🚗", name: "Transportation", used: 5, planned: 173, pct: 3, bar: "bg-sky-400", text: "text-sky-500" },
];

export const EVENTS = {
  1:  [{ emoji: "🏠", label: "Rent",     color: "border-red-400 bg-red-50" }],
  5:  [{ emoji: "🚗", label: "Car Pay",  color: "border-blue-400 bg-blue-50" }],
  12: [{ emoji: "📱", label: "Phone",    color: "border-purple-400 bg-purple-50" }],
  15: [{ emoji: "💰", label: "Paycheck", color: "border-green-400 bg-green-50" }],
  24: [{ emoji: "💡", label: "Lights",   color: "border-amber-400 bg-amber-50" }],
};

export const BALANCES = { 1: 7500, 2: 7425, 15: 9025, 30: 8200 };
