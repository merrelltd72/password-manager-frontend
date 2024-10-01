import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateAccountPage = () => {
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();
  const jwt = localStorage.getItem("jwt");

  const submitHandler = (e) => {
    e.preventDefault();
    setErrors([]);
    const params = new FormData(e.target);
    if (jwt) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;
      axios
        .post("http://localhost:3000/accounts.json", params)
        .then((response) => {
          console.log(response);
          navigate("/accounts", {
            state: { message: "Account created successfully" },
          });
        })
        .catch((error) => {
          console.log(error.response);
          setErrors(["Account could not be created!"]);
        });
    }
  };

  return (
    <div id="createAccount" className="container w-full max-w-sm mt-4">
      <ul>
        {errors.map((error) => (
          <li key={error}>{error}</li>
        ))}
      </ul>
      <h1>Create Account</h1>
      <form
        onSubmit={submitHandler}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-6">
          <label className="block text-gray-600 text-lg font-bold mb-2">
            Account Name:
          </label>
          <input
            name="web_app_name"
            type="text"
            placeholder="Facebook"
            className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
          />

          <label className="block text-gray-600 text-lg font-bold mb-2">
            Account URL:
          </label>
          <input
            name="url"
            type="text"
            placeholder="www.facebook.com"
            className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
          />

          <label className="block text-gray-600 text-lg font-bold mb-2">
            Account Username:
          </label>
          <input
            name="username"
            type="text"
            className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
          />

          <label className="block text-gray-600 text-lg font-bold mb-2">
            Account Password:
          </label>
          <input
            name="password"
            type="password"
            className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
          />

          <label className="block text-gray-600 text-lg font-bold mb-2">
            Category:
          </label>
          <input
            name="category_id"
            type="number"
            className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
          />

          <br />
          <br />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-green-700 text-white font-bold rounded py-2 px-4"
          >
            Create Account
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateAccountPage;
