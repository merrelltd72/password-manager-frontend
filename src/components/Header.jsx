import { useState, useEffect } from "react";
import LogOut from "../pages/LogOut";

const Header = () => {
  const [jwt, setJwt] = useState("");

  useEffect(() => {
    const isLoggedIn = () => {
      if (localStorage.getItem("jwt")) {
        const jwt = localStorage.getItem("jwt");
        setJwt(jwt);
      } else {
        setJwt("");
      }
    };
    isLoggedIn();
  }, [setJwt]);

  return (
    <header className="flex items-center justify-between flex-wrap bg-blue-500 p-6 container">
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <span className="font-semibold text-lg tracking-tight">
          <a href="/">Password Manager</a>{" "}
        </span>
      </div>
      {jwt ? (
        <nav className="">
          <div className="text-lg lg:flex-grow">
            <a href="/accounts">Accounts</a> |{" "}
            <a href="/create">Create An Account</a> |{" "}
            <a href="/generatepassword">Generate A Password</a> | <LogOut />
          </div>
        </nav>
      ) : (
        <div className="w-full block flex-grow lg:flex lg:items-right lg:w-auto">
          <div className="text-sm lg:flex-grow">
            <a href="/signup">Sign Up</a> | <a href="/login">Login</a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
