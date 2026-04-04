import { useEffect } from "react";

const LandingPage = () => {
  const handleOAuth = () => {
    const params = new URLSearchParams(window.location.search);
    const jwt = params.get("jwt");
    if (jwt) {
      console.log(jwt);
      localStorage.setItem("jwt", jwt);
      window.location.href = "/";
    }
  };

  useEffect(handleOAuth, []);

  return (
    <div className="container justify-items-center">
      <div className="bg-[url('/src/assets/images/smoke-blue-background.jpg')] bg-cover bg-center min-h-screen">
        <h1 className="text-xlg text-white">Password Manager</h1>
      </div>
    </div>
  );
};

export default LandingPage;
