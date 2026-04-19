import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import GoogleLoginButton from "../components/GoogleLoginButton";
import { useAuthDispatch } from "../context/AuthContext";

const LoginPage = () => {
  const dispatch = useAuthDispatch();
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    setErrors([]);
    const params = new FormData(e.target);
    axios
      .post(`${import.meta.env.VITE_API_BASE_URL}/sessions.json`, params)
      .then((res) => {
        toast.success(`${res.data.email} logged in successfuly!`);
        dispatch({
          type: "LOGIN_SUCCESS",
          payload: {
            user: {
              email: res.data.email,
              username: res.data.username,
              id: res.data.id,
            },
          },
        });
        e.target.reset();
        navigate("/accounts", {
          state: { message: "Logged in successfully!" },
        });
      })
      .catch((error) => {
        toast.error("Unsuccessful login attempt");
        console.log(error.response);
        setErrors(["Invalid email and/or password."]);
      });
  };

  return (
    <div id="login" className="app-page">
      <ul className="mx-auto mt-6 w-full max-w-md space-y-2">
        {errors.map((error) => (
          <li key={error} className="alert alert-error text-sm">
            {error}
          </li>
        ))}
      </ul>
      <div className="flex flex-col justify-center items-center h-screen">
        <form onSubmit={submitHandler} className="app-card mb-4 max-w-md">
          <fieldset className="app-fieldset">
            <legend className="app-fieldset-legend">Login</legend>
            <div className="mb-4">
              <label className="app-label">Email address:</label>
              <input
                name="email"
                type="email"
                placeholder="user.email@example.com"
                className="app-input"
              />
              <br />
              <br />
              <label className="app-label">Password:</label>
              <input name="password" type="password" className="app-input" />
              <br />
              <br />
              <button type="submit" className="app-btn-primary">
                Login
              </button>
              <div className="divider">OR</div>
              <div className="flex justify-center items-center">
                <GoogleLoginButton />
              </div>
            </div>
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
