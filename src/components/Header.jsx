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
    /* <header className="bg-blue-500 flex justify-between items-center h-24 max-w-[1240px] mx-auto px-4 text-white">
      <div>
       <a href="/">Home</a>
      </div>
      <nav>
        <a href="/signup">Sign Up</a> | <LogOut />
      </nav>
    </header>
    */

    <nav className="flex items-center justify-between flex-wrap bg-blue-500 p-6 container">
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <span className="font-semibold text-x1 tracking-tight">
          Password Manager
        </span>
      </div>
      {jwt ? (
        <div className="w-full block flex-grow lg:flex lg:items-right lg:w-auto">
          <div className="text-sm lg:flex-grow">
            <a href="/accounts">Accounts</a> |{" "}
            <a href="/create">Create An Account</a> |{" "}
            <a href="/generatepassword">Generate A Password</a> | <LogOut />
          </div>
        </div>
      ) : (
        <div className="w-full block flex-grow lg:flex lg:items-right lg:w-auto">
          <div className="text-sm lg:flex-grow">
            <a href="/signup">Sign Up</a> | <a href="/login">Login</a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Header;
