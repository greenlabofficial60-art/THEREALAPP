import React, { useState } from "react";
import { TabCtx, cx } from "./constants";
import { Onboarding } from "./Onboarding";
import { AccountSetup } from "./AccountSetup";
import {
  CalendarHome, Budget, Debt, Goals, Profile, Settings,
  Insights, CashBalance, WeatherWarnings, SplashScreen
} from "./Views";
import { SideMenu, TopBar, DockNav, TabBar } from "./SharedUI";
import { BudgetWizard, NetWorthFlow, AllSet } from "./WizardViews";
import { DEFAULT_TXS } from "./mockData";

export function ForecastContainer() {
  const [booted, setBooted] = useState(false);
  const [phase, setPhase] = useState("onboarding");
  const [tab, setTab] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [overlay, setOverlay] = useState(null);
  const [dark, setDark] = useState(false);
  const [accent, setAccent] = useState("#3b82f6");
  const [toast, setToast] = useState(null);

  const go = (dest) => { setMenuOpen(false); setTab(dest); };

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  };

  const commonProps = {
    openMenu:     () => setMenuOpen(true),
    openCash:     () => setOverlay("cash"),
    openInsights: () => setOverlay("insights"),
    openWeather:  () => setOverlay("weather"),
  };

  return (
    <div className={cx(
      "relative w-full h-screen overflow-hidden transition-colors",
      dark ? "bg-slate-900 text-slate-100" : "bg-white"
    )}>
      {!booted ? (
        <SplashScreen onDone={() => setBooted(true)} />
      ) : (
        <>
          {phase === "onboarding"   && <Onboarding onDone={() => setPhase("setup")} />}
          {phase === "setup"        && <AccountSetup onDone={() => setPhase("budgetWizard")} />}
          {phase === "budgetWizard" && <BudgetWizard onBack={() => setPhase("setup")} onDone={() => setPhase("netWorth")} />}
          {phase === "netWorth"     && <NetWorthFlow onBack={() => setPhase("budgetWizard")} onDone={() => setPhase("allSet")} />}
          {phase === "allSet"       && <AllSet onDone={() => setPhase("app")} />}

          {phase === "app" && (
            <TabCtx.Provider value={{ tab, setTab }}>
              {tab === "home"     && <CalendarHome {...commonProps} />}
              {tab === "budget"   && <Budget {...commonProps} />}
              {tab === "debt"     && <Debt {...commonProps} />}
              {tab === "goals"    && <Goals {...commonProps} />}
              {tab === "profile"  && <Profile openMenu={commonProps.openMenu} />}
              {tab === "settings" && <Settings openMenu={commonProps.openMenu} dark={dark} setDark={setDark} accent={accent} setAccent={setAccent} />}

              {overlay === "insights" && <div className="absolute inset-0 z-30 bg-white"><Insights onClose={() => setOverlay(null)} /></div>}
              {overlay === "cash"     && <div className="absolute inset-0 z-30 bg-white"><CashBalance onClose={() => setOverlay(null)} /></div>}
              {overlay === "weather"  && <div className="absolute inset-0 z-30 bg-white"><WeatherWarnings onClose={() => setOverlay(null)} /></div>}

              <SideMenu
                open={menuOpen}
                onClose={() => setMenuOpen(false)}
                go={go}
                dark={dark}
                setDark={setDark}
                onCheckUpdate={() => showToast("You're on the latest version ✓")}
              />

              <DockNav
                active={tab}
                onSelect={(dest) => dest === "insights" ? setOverlay("insights") : setTab(dest)}
                onAdd={() => setOverlay("add")}
              />

              {toast && (
                <div className="absolute bottom-28 left-1/2 z-50 -translate-x-1/2 whitespace-nowrap rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-xl">
                  {toast}
                </div>
              )}
            </TabCtx.Provider>
          )}
        </>
      )}
    </div>
  );
}
