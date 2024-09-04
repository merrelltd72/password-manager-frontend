import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LogOut = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const handleLogout = (e) => {
    console.log(e);
    e.preventDefault();
    delete axios.defaults.headers.common["Authorization"];
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <>
      {isLoggedIn ? (
        <a onClick={handleLogout}>Logout</a>
      ) : (
        <a href="/login">Login</a>
      )}
    </>
  );
};

export default LogOut;
