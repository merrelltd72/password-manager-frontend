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
    // http://localhost:5173/?state=f9586ffeced154908d31213b8afe21163ad5ab3f50188b3b&code=4%2F0AQlEd8y9t-W2AkNa4M6DNml2V7z5l9zXOb3Vvs1fFjwJ29QsRy4JpqLbos5VGeS-s9NIAg&scope=email+profile+openid+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email&authuser=0&prompt=consent
  };

  useEffect(handleOAuth, []);

  return (
    <div className="container flex items-center justify-between p-6 flex-wrap">
      LandingPage
    </div>
  );
};

export default LandingPage;
