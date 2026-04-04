import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import GoogleLoginButton from "../components/GoogleLoginButton";

const LoginPage = () => {
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
        console.log(res.data);
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
    <div
      id="login"
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
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-sm border p-4">
            <legend className="fieldset-legend text-xl">Login</legend>
            <div className="mb-4">
              <label className="label block text-gray-600 text-lg font-bold mb-2">
                Email address:
              </label>
              <input
                name="email"
                type="email"
                placeholder="user.email@example.com"
                className="input shadow appearance-none border rounded-sm w-full py-1 px-3 text-gray-600 leading-tight focus:outline-hidden focus:shadow-outline"
              />
              <br />
              <br />
              <label className="label block text-gray-600 text-lg font-bold mb-2">
                Password:
              </label>
              <input
                name="password"
                type="password"
                className="input shadow appearance-none border rounded-sm w-full py-1 px-3 text-gray-600 leading-tight focus:outline-hidden focus:shadow-outline"
              />
              <br />
              <br />
              <button
                type="submit"
                className="bg-blue-500 hover:bg-green-700 text-white font-bold rounded-sm py-2 px-4"
              >
                Login
              </button>
            </div>
          </fieldset>
        </form>
      </div>
      <div className="divider">OR</div>
      <div className="flex justify-center items-center">
        <GoogleLoginButton />
      </div>
    </div>
  );
};

export default LoginPage;
