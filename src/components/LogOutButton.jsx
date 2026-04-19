import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuthDispatch } from "../context/AuthContext";
import { IoIosLogOut } from "react-icons/io";

const LogOutButton = () => {
  const navigate = useNavigate();
  const authDispatch = useAuthDispatch();

  const handleClick = (e) => {
    e.preventDefault();
    axios
      .delete(`${import.meta.env.VITE_API_BASE_URL}/sessions.json`)
      .then((res) => {
        console.log(res);
        authDispatch({ type: "LOGOUT" });
        navigate("/");
        window.location.reload();
      });
  };

  return (
    <button
      onClick={handleClick}
      className="btn btn-outline btn-sm"
      aria-label="Log out"
    >
      <IoIosLogOut />
    </button>
  );
};

export default LogOutButton;
