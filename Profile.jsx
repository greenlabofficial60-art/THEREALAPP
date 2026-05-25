import React from "react";
import { TopBar, Row } from "./SharedUI";

export function Profile({ openMenu }) {
  return (
    <div className="flex h-full flex-col bg-white">
      <TopBar today="$7.5k" openMenu={openMenu} />
      <div className="px-6">
        <div className="flex flex-col items-center py-8">
          <div className="grid h-24 w-24 place-items-center rounded-full bg-blue-100 text-4xl shadow-inner">👤</div>
          <h1 className="mt-4 text-2xl font-extrabold text-slate-900">Alex Henderson</h1>
          <p className="text-sm font-medium text-slate-400 uppercase tracking-widest">Premium Member</p>
        </div>

        <div className="space-y-1 divide-y divide-slate-50">
          <Row l="Email" r="alex@example.com" />
          <Row l="Member Since" r="June 2023" />
          <Row l="Subscription" r="Monthly Plan" />
        </div>

        <div className="mt-10 space-y-3">
          <button className="w-full rounded-2xl bg-blue-50 py-4 font-bold text-blue-600">Export Financial Report</button>
          <button className="w-full rounded-2xl py-4 font-bold text-slate-400">Log Out</button>
        </div>
      </div>
    </div>
  );
}
