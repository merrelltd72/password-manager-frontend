import axios from "axios";
import { useNavigate } from "react-router-dom";

const LogOut = () => {
  const navigate = useNavigate();

  const handleLogout = (e) => {
    console.log(e);
    e.preventDefault();
    delete axios.defaults.headers.common["Authorization"];
    localStorage.removeItem("jwt");
    navigate("/");
  };

  return (
    <>
      <button onClick={handleLogout}>Logout</button>
    </>
  );
};

export default LogOut;
