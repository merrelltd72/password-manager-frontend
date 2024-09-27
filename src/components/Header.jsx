import { useState, useEffect } from "react";
import LogOutButton from "./LogOutButton";
import axios from "axios";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const res = await axios.get("/isLoggedIn", { withCredentials: true });
        setIsLoggedIn(res.data.logged_in);
        setUser(res.data.user);
      } catch (error) {
        setIsLoggedIn(false);
      }
    };

    checkAuthStatus();
  }, []);

  return (
    <header className="flex items-center justify-between flex-wrap bg-blue-500 p-6 container">
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <span className="font-semibold text-lg tracking-tight">
          <a href="/">Password Manager</a>{" "}
        </span>
      </div>
      {isLoggedIn ? (
        <nav className="">
          <div className="text-lg lg:flex-grow">
            <p>Welcome {user.username}!</p>
            <a href="/accounts">Accounts</a> |{" "}
            <a href="/create">Create An Account</a> |{" "}
            <a href="/generatepassword">Generate A Password</a> |{" "}
            <LogOutButton />
          </div>
        </nav>
      ) : (
        <div className="w-full block flex-grow lg:flex lg:items-right lg:w-auto">
          <div className="text-sm lg:flex-grow">
            <a href="/signup">Sign Up</a> | <a href="/login">Login</a>
            <LogOutButton />
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
