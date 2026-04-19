import { FaGoogle } from "react-icons/fa6";

const GoogleLoginButton = () => {
  const handlelogin = () => {
    window.location.href = `${import.meta.env.VITE_API_BASE_URL}/auth/google_oauth2`;
  };
  return (
    <button onClick={handlelogin} className="btn btn-primary mb-4">
      <FaGoogle /> &nbsp; Login with Google
    </button>
  );
};

export default GoogleLoginButton;
