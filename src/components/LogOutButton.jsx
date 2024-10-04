import axios from "axios";
import { useNavigate } from "react-router-dom";
import { IoIosLogOut } from "react-icons/io";

const LogOutButton = () => {
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    axios.delete("http://localhost:3000/sessions.json").then((res) => {
      console.log(res);
      navigate("/");
      window.location.reload();
    });
  };

  return (
    <button
      onClick={handleClick}
      className="bg-green-500 hover:bg-green-700 text-white font-bold rounded py-2 px-4 items-center"
    >
      <IoIosLogOut />
    </button>
  );
};

export default LogOutButton;
