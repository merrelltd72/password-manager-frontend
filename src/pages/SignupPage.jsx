import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import PasswordStrengthChecker from "../components/PasswordStrengthChecker";
import { useAuthDispatch } from "../context/AuthContext";

const SignupPage = () => {
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();
  const dispatch = useAuthDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    setErrors([]);
    const params = new FormData(e.target);
    axios
      .post(`${import.meta.env.VITE_API_BASE_URL}/users.json`, params)
      .then((res) => {
        dispatch({
          type: "LOGIN_SUCCESS",
          payload: {
            user: res.data.user ?? {
              email: res.data.email,
              username: res.data.username,
              id: res.data.id,
            },
          },
        });
        toast.success(`${res.data.username}'s account created!`);
        e.target.reset();
        navigate("/accounts");
      })
      .catch((error) => {
        console.log(error.response);
        const serverErrors =
          error.response?.data?.errors || error.response?.data?.error;
        if (serverErrors) {
          const messages = Array.isArray(serverErrors)
            ? serverErrors
            : [serverErrors];
          setErrors(messages);
        } else {
          setErrors(["Account could not be created. Please try again."]);
        }
      });
  };

  return (
    <div id="signup" className="app-page">
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
            <legend className="app-fieldset-legend">Sign Up</legend>
            <div className="mb-4">
              <label className="app-label">Username:</label>
              <input name="username" type="text" className="app-input" />
              <br />
              <label className="app-label">Email Address:</label>
              <input name="email" type="email" className="app-input" />
              <br />
              <label className="app-label">Password:</label>
              <PasswordStrengthChecker />
              <br />
              <label className="app-label">Password Confirmation:</label>
              <input
                name="password_confirmation"
                type="password"
                className="app-input"
              />
              <br />
              <br />
              <button type="submit" className="app-btn-primary">
                Signup
              </button>
            </div>
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
