import axios from "axios";
import { useNavigate } from "react-router-dom";
import { IoIosLogOut } from "react-icons/io";

const LogOutButton = () => {
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    axios
      .delete(`${import.meta.env.VITE_API_BASE_URL}/sessions.json`)
      .then((res) => {
        console.log(res);
        navigate("/");
        window.location.reload();
      });
  };

  return (
    <button
      onClick={handleClick}
      className="bg-green-500 hover:bg-green-700 text-white font-bold rounded-sm py-2 px-4 items-center"
    >
      <IoIosLogOut />
    </button>
  );
};

export default LogOutButton;
