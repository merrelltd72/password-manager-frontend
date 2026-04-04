import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import PasswordStrengthChecker from "../components/PasswordStrengthChecker";

const SignupPage = () => {
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    setErrors([]);
    const params = new FormData(e.target);
    axios
      .post(`${import.meta.env.VITE_API_BASE_URL}/users.json`, params)
      .then((res) => {
        console.log(res.data);
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
    <div
      id="signup"
      className="container mx-auto w-full px-4 place-content-center"
    >
      <ul>
        {errors.map((error) => (
          <li key={error}>{error}</li>
        ))}
      </ul>
      <div className="flex flex-col justify-center items-center h-screen">
        <form
          onSubmit={submitHandler}
          className="bg-white shadow-md rounded-sm px-8 pt-6 pb-8 mb-4"
        >
          <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-sm border p-4">
            <legend className="fieldset-legend text-xl">Sign Up</legend>
            <div className="mb-4">
              <label className="label block text-gray-600 text-lg font-bold mb-2">
                Username:
              </label>
              <input
                name="username"
                type="text"
                className="input shadow appearance-none border rounded-sm w-full py-1 px-3 text-gray-600 leading-tight focus:outline-hidden focus:shadow-outline"
              />
              <br />
              <label className="label block text-gray-600 text-lg font-bold mb-2">
                Email Address:
              </label>
              <input
                name="email"
                type="email"
                className="input shadow appearance-none border rounded-sm w-full py-1 px-3 text-gray-600 leading-tight focus:outline-hidden focus:shadow-outline"
              />
              <br />
              <label className="label block text-gray-600 text-lg font-bold mb-2">
                Password:
              </label>
              <PasswordStrengthChecker />
              <br />
              <label className=" label block text-gray-600 text-lg font-bold mb-2">
                Password Confirmation:
              </label>
              <input
                name="password_confirmation"
                type="password"
                className="input shadow appearance-none border rounded-sm w-full py-1 px-3 text-gray-600 leading-tight focus:outline-hidden focus:shadow-outline"
              />
              <br />
              <br />
              <button
                type="submit"
                className="bg-blue-500 hover:bg-green-700 text-white font-bold rounded-sm py-2 px-4"
              >
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
