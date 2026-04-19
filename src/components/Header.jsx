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
  ["app-nav-link", isActive ? "app-nav-link-active" : ""].join(" ");

const Header = () => {
  const { isAuthenticated, user } = useAuthState();
  const { theme } = useUIState();
  const dispatch = useUIDispatch();

  const handleThemeToggle = () => {
    dispatch({ type: "TOGGLE_THEME" });
  };

  return (
    <header className="app-topbar">
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
            className="btn btn-circle btn-ghost btn-sm"
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
            <p className="app-user-pill">
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
                    ? "btn btn-primary btn-sm"
                    : "app-nav-link"
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
