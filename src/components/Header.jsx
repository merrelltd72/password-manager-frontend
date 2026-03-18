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
    <div className="navbar bg-blue-500 shadow-sm">
      <div className="flex-1">
        <span className="font-semibold text-lg tracking-tight">
          <a href="/">Password Manager</a>{" "}
        </span>
      </div>
      {isLoggedIn ? (
        <nav className="flex-none">
          <div className="">
            <p>Welcome {user.username}!</p>
            <a href="/accounts">Accounts</a> |{" "}
            <a href="/create">Create An Account</a> |{" "}
            <a href="/generatepassword">Generate A Password</a> |{" "}
            <a href="/accountupload">Upload Accounts from a File</a> |{" "}
            <LogOutButton />
          </div>
        </nav>
      ) : (
        <div className="flex-none">
          <div className="text-sm lg:grow">
            <a href="/signup">Sign Up</a> | <a href="/login">Login</a>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
