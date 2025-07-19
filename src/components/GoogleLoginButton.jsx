import { FaGoogle } from "react-icons/fa6";

const GoogleLoginButton = () => {
  const handlelogin = () => {
    window.location.href = "http://localhost:3000/auth/google_oauth2";
  };
  return (
    <button
      onClick={handlelogin}
      className="w-full bg-blue-500 hover:bg-green-700 text-white font-bold rounded-sm py-2 px-4 mb-4 items-center flex justify-between"
    >
      <FaGoogle /> Login with Google
    </button>
  );
};

export default GoogleLoginButton;
