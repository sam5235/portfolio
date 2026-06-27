import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Icon, type IconName } from "../ui/Icon";

const tabs: { to: string; key: string; icon: IconName }[] = [
  { to: "/", key: "nav.home", icon: "home" },
  { to: "/projects", key: "nav.projects", icon: "layers" },
  { to: "/experience", key: "nav.experience", icon: "briefcase" },
  { to: "/blog", key: "nav.blog", icon: "book" },
  { to: "/contact", key: "nav.contact", icon: "mail" },
];

// Floating app-style bottom navigation (mobile only) with an iOS "liquid glass"
// finish. The active tab is marked by a gradient glass pill that springs between
// tabs (shared layout via layoutId); the active icon lifts, scales and glows.
export function MobileTabBar() {
  const { t } = useTranslation();
  return (
    <nav
      aria-label="Primary"
      className="fixed inset-x-0 bottom-[max(0.5rem,env(safe-area-inset-bottom))] z-50 flex justify-center px-4 md:hidden"
    >
      <div className="relative flex w-full max-w-md items-stretch gap-1 overflow-hidden rounded-pill border border-white/50 bg-white/60 px-2 py-2 shadow-[0_10px_40px_-6px_rgba(15,18,32,0.35)] ring-1 ring-inset ring-white/40 backdrop-blur-md backdrop-saturate-150 dark:border-white/10 dark:bg-[#0a0f1a]/55 dark:ring-white/10">
        {tabs.map((tab) => (
          <NavLink
            key={tab.to}
            to={tab.to}
            end={tab.to === "/"}
            className="relative z-10 flex flex-1 flex-col items-center text-[11px] font-medium"
          >
            {({ isActive }) => (
              <>
                {isActive && (
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 rounded-pill bg-violet-500/10 dark:bg-white/10"
                  />
                )}
                <span
                  className={`relative h-full py-1 w-full transition-color duration-300 ${
                    isActive
                      ? "text-violet-600 dark:text-violet-300"
                      : "text-slate-500 dark:text-slate-400"
                  }`}
                >
                  <span className="flex flex-col items-center justify-center">
                    <Icon name={tab.icon} size={22} />
                    <span>{t(tab.key)}</span>
                  </span>
                </span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
