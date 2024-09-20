import axios from "axios";
import PasswordStrengthChecker from "../components/PasswordStrengthChecker";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignupPage = () => {
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    setErrors([]);
    const params = new FormData(e.target);
    axios.post("http://localhost:3000/users.json", params).then((res) => {
      console.log(res.data);
      e.target.reset();
      navigate("/");
    });
  };

  return (
    <div id="signup" className="container w-full max-w-sm">
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
            Username:
          </label>
          <input
            name="username"
            type="text"
            className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
          />
          <br />
          <label className="block text-gray-600 text-lg font-bold mb-2">
            Email Address:
          </label>
          <input
            name="email"
            type="email"
            className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
          />
          <br />
          <label className="block text-gray-600 text-lg font-bold mb-2">
            Password:
          </label>
          <PasswordStrengthChecker />
          <br />
          <label className="block text-gray-600 text-lg font-bold mb-2">
            Password Confirmation:
          </label>
          <input
            name="password_confirmation"
            type="password"
            className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
          />
          <br />
          <br />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-green-700 text-white font-bold rounded py-2 px-4"
          >
            Signup
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignupPage;
