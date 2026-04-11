import { useAuthState } from "../context/AuthContext";
import LogOutButton from "./LogOutButton";
import { Link } from "react-router";

const Header = () => {
  const { isAuthenticated, user } = useAuthState();

  return (
    <header className="sticky top-0 z-50 border-b border-blue-300/30 bg-blue-500/95 text-white shadow-md backdrop-blur">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-3 px-4 py-3 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
        <Link
          to="/"
          className="text-lg font-bold tracking-tight transition-opacity hover:opacity-90 sm:text-xl"
        >
          Password Manager
        </Link>

        {isAuthenticated ? (
          <nav className="flex w-full flex-wrap items-center gap-2 lg:w-auto lg:justify-end">
            <p className="rounded-full border border-white/35 bg-white/10 px-3 py-1 text-xs font-semibold tracking-wide">
              Welcome {user?.username || user?.email}!
            </p>

            <Link
              to="/accounts"
              className="rounded-md border border-white/35 bg-white/10 px-3 py-1.5 text-sm font-medium transition hover:bg-white hover:text-blue-700"
            >
              Accounts
            </Link>
            <Link
              to="/create"
              className="rounded-md border border-white/35 bg-white/10 px-3 py-1.5 text-sm font-medium transition hover:bg-white hover:text-blue-700"
            >
              Create Account
            </Link>
            <Link
              to="/generatepassword"
              className="rounded-md border border-white/35 bg-white/10 px-3 py-1.5 text-sm font-medium transition hover:bg-white hover:text-blue-700"
            >
              Generate Password
            </Link>
            <Link
              to="/accountupload"
              className="rounded-md border border-white/35 bg-white/10 px-3 py-1.5 text-sm font-medium transition hover:bg-white hover:text-blue-700"
            >
              Upload File
            </Link>

            <div className="ml-1">
              <LogOutButton />
            </div>
          </nav>
        ) : (
          <nav className="flex items-center gap-2">
            <Link
              to="/signup"
              className="rounded-md border border-white/35 bg-white/10 px-3 py-1.5 text-sm font-semibold transition hover:bg-white hover:text-blue-700"
            >
              Sign Up
            </Link>
            <Link
              to="/login"
              className="rounded-md border border-white bg-white px-3 py-1.5 text-sm font-semibold text-blue-700 transition hover:bg-blue-50"
            >
              Login
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
