import { useState, useEffect } from "react";
import LogOutButton from "./LogOutButton";
import axios from "axios";
import { useLocation } from "react-router";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const res = await axios.get("/isLoggedIn", { withCredentials: true });
        setIsLoggedIn(res.data.logged_in);
        setUser(res.data.user);
      } catch (error) {
        setIsLoggedIn(false);
        console.log(error);
      }
    };

    checkAuthStatus();
  }, [location]);

  return (
    <header className="sticky top-0 z-50 border-b border-blue-300/30 bg-blue-500/95 text-white shadow-md backdrop-blur">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-3 px-4 py-3 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
        <a
          href="/"
          className="text-lg font-bold tracking-tight transition-opacity hover:opacity-90 sm:text-xl"
        >
          Password Manager
        </a>

        {isLoggedIn ? (
          <nav className="flex w-full flex-wrap items-center gap-2 lg:w-auto lg:justify-end">
            <p className="rounded-full border border-white/35 bg-white/10 px-3 py-1 text-xs font-semibold tracking-wide">
              Welcome {user?.username}!
            </p>

            <a
              href="/accounts"
              className="rounded-md border border-white/35 bg-white/10 px-3 py-1.5 text-sm font-medium transition hover:bg-white hover:text-blue-700"
            >
              Accounts
            </a>
            <a
              href="/create"
              className="rounded-md border border-white/35 bg-white/10 px-3 py-1.5 text-sm font-medium transition hover:bg-white hover:text-blue-700"
            >
              Create Account
            </a>
            <a
              href="/generatepassword"
              className="rounded-md border border-white/35 bg-white/10 px-3 py-1.5 text-sm font-medium transition hover:bg-white hover:text-blue-700"
            >
              Generate Password
            </a>
            <a
              href="/accountupload"
              className="rounded-md border border-white/35 bg-white/10 px-3 py-1.5 text-sm font-medium transition hover:bg-white hover:text-blue-700"
            >
              Upload File
            </a>

            <div className="ml-1">
              <LogOutButton />
            </div>
          </nav>
        ) : (
          <nav className="flex items-center gap-2">
            <a
              href="/signup"
              className="rounded-md border border-white/35 bg-white/10 px-3 py-1.5 text-sm font-semibold transition hover:bg-white hover:text-blue-700"
            >
              Sign Up
            </a>
            <a
              href="/login"
              className="rounded-md border border-white bg-white px-3 py-1.5 text-sm font-semibold text-blue-700 transition hover:bg-blue-50"
            >
              Login
            </a>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
