import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TogglePasswordVisibility from "../components/TogglePasswordVisibility";

const CreateAccountPage = () => {
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    setErrors([]);
    const params = new FormData(e.target);

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
            required
            placeholder="ex. Facebook"
            className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
          />

          <label className="block text-gray-600 text-lg font-bold mb-2">
            Account URL:
          </label>
          <input
            name="url"
            type="text"
            placeholder="ex. www.facebook.com"
            className="shadow appearance-none border rounded w-full mb-2 py-1 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
          />

          <label className="block text-gray-600 text-lg font-bold mb-2">
            Account Username:
          </label>
          <input
            name="username"
            type="text"
            required
            className="shadow appearance-none border rounded w-full mb-2 py-1 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
          />

          <label className="block text-gray-600 text-lg font-bold mb-2">
            Account Password:
          </label>
          <input
            name="password"
            type="password"
            id="password"
            required
            className="shadow appearance-none border rounded w-full mb-2 py-1 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
          />
          <TogglePasswordVisibility />

          <label className="block text-gray-600 text-lg font-bold mb-2">
            Notes:
          </label>
          <textarea
            name="notes"
            rows="5"
            cols="35"
            className="rounded"
          ></textarea>
          <br />
          <label className="block text-gray-600 text-lg font-bold mb-2">
            Category:
          </label>
          <select name="category_id" id="category">
            <option value="1">Personal</option>
            <option value="2">Work</option>
            <option value="3">Shared</option>
          </select>

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
