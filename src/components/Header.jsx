import { useAuthState } from "../context/AuthContext";
import { useUIState, useUIDispatch } from "../context/UIContext";
import LogOutButton from "./LogOutButton";
import { Link, NavLink } from "react-router";
import {
  ROUTES,
  AUTHENTICATED_NAV_ITEMS,
  GUEST_NAV_ITEMS,
} from "../constants/routes";

const authLinkClassName = ({ isActive }) =>
  [
    "rounded-md border px-3 py-1.5 text-sm font-medium transition",
    isActive
      ? "border-white bg-white text-blue-700"
      : "border-white/35 bg-white/10 hover:bg-white hover:text-blue-700",
  ].join(" ");

const Header = () => {
  const { isAuthenticated, user } = useAuthState();
  const { theme } = useUIState();
  const dispatch = useUIDispatch();

  const handleThemeToggle = () => {
    dispatch({ type: "TOGGLE_THEME" });
  };

  return (
    <header className="sticky top-0 z-50 border-b border-blue-300/30 bg-blue-500/95 text-white shadow-md backdrop-blur">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-3 px-4 py-3 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
        <Link
          to={ROUTES.home}
          className="text-lg font-bold tracking-tight transition-opacity hover:opacity-90 sm:text-xl"
        >
          Password Manager
        </Link>

        <div className="flex-none gap-2">
          <button
            onClick={handleThemeToggle}
            className="btn btn-ghost btn-circle"
            title={`Current theme: ${theme}`}
          >
            {theme === "light" && "☀️"}
            {theme === "dark" && "🌙"}
            {theme === "nord" && "❄️"}
          </button>
          {/* Other header items */}
        </div>

        {isAuthenticated ? (
          <nav className="flex w-full flex-wrap items-center gap-2 lg:w-auto lg:justify-end">
            <p className="rounded-full border border-white/35 bg-white/10 px-3 py-1 text-xs font-semibold tracking-wide">
              Welcome {user?.username || user?.email}!
            </p>

            {AUTHENTICATED_NAV_ITEMS.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === ROUTES.accounts}
                className={authLinkClassName}
              >
                {item.label}
              </NavLink>
            ))}

            <div className="ml-1">
              <LogOutButton />
            </div>
          </nav>
        ) : (
          <nav className="flex items-center gap-2">
            {GUEST_NAV_ITEMS.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={
                  item.to === ROUTES.login
                    ? "rounded-md border border-white bg-white px-3 py-1.5 text-sm font-semibold text-blue-700 transition hover:bg-blue-50"
                    : "rounded-md border border-white/35 bg-white/10 px-3 py-1.5 text-sm font-semibold transition hover:bg-white hover:text-blue-700"
                }
              >
                {item.label}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
