import { useNavigate } from "react-router-dom";

const PageNotFoundPage = () => {
  const navigate = useNavigate();

  const returnHome = () => {
    navigate("/");
  };

  return (
    <div>
      <h1>404 - Page Not Found</h1>
      <p className="mb-4">
        Unfortunately, the page you are looking for does not exist.
      </p>
      <button onClick={returnHome}>Take me home!</button>
    </div>
  );
};

export default PageNotFoundPage;
