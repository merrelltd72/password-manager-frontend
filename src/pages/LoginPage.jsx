import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import GoogleLoginButton from "../components/GoogleLoginButton";

const jwt = localStorage.getItem("jwt");
if (jwt) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;
}

const LoginPage = () => {
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    setErrors([]);
    const params = new FormData(e.target);
    axios
      .post("http://localhost:3000/sessions.json", params)
      .then((res) => {
        console.log(res.data);
        axios.defaults.headers.common["Authorization"] =
          "Bearer " + res.data.jwt;
        localStorage.setItem("jwt", res.data.jwt);
        e.target.reset();
        navigate("/accounts", {
          state: { message: "Logged in successfully!" },
        });
      })
      .catch((error) => {
        console.log(error.response);
        setErrors(["Invalid email and/or password."]);
      });
  };

  return (
    <div id="login" className="container w-full max-w-sm">
      <ul>
        {errors.map((error) => (
          <li key={error}>{error}</li>
        ))}
      </ul>
      <form
        onSubmit={submitHandler}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-4">
          <label className="block text-gray-600 text-lg font-bold mb-2">
            Email address:
          </label>
          <input
            name="email"
            type="email"
            placeholder="user.email@example.com"
            className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
          />
          <br />
          <br />
          <label className="block text-gray-600 text-lg font-bold mb-2">
            Password:
          </label>
          <input
            name="password"
            type="password"
            className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
          />

          <button
            type="submit"
            className="bg-blue-500 hover:bg-green-700 text-white font-bold rounded py-2 px-4"
          >
            Login
          </button>
        </div>
      </form>
      <br />
      <GoogleLoginButton />
    </div>
  );
};

export default LoginPage;
