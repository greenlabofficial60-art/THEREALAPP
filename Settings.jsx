import React from "react";
import { TopBar, ToggleRow, Row } from "./SharedUI";
import { ACCENTS } from "./constants";

export function Settings({ openMenu, dark, setDark, accent, setAccent }) {
  return (
    <div className="flex h-full flex-col bg-white">
      <TopBar today="$7.5k" openMenu={openMenu} />
      <div className="flex-1 overflow-y-auto px-6">
        <h1 className="py-6 text-4xl font-extrabold text-slate-900">Settings</h1>

        <div className="divide-y divide-slate-100">
          <ToggleRow l="Dark Mode" sub="Easier on the eyes at night" on={dark} set={setDark} />

          <div className="py-5">
            <div className="mb-3 font-bold text-slate-900">Theme Accent</div>
            <div className="flex gap-3">
              {ACCENTS.map((c) => (
                <button
                  key={c}
                  onClick={() => setAccent(c)}
                  className={`h-10 w-10 rounded-full transition-transform active:scale-90 ${accent === c ? "ring-4 ring-offset-2 ring-blue-500" : ""}`}
                  style={{ backgroundColor: c }}
                />
              ))}
            </div>
          </div>

          <Row l="Language" r="English" />
          <Row l="Currency" r="USD ($)" />
          <Row l="App Version" r="1.0.4 (Build 42)" />
        </div>

        <div className="mt-8 rounded-2xl bg-red-50 p-4">
          <button className="w-full text-center font-bold text-red-500">Reset All Data</button>
        </div>
      </div>
    </div>
  );
}
