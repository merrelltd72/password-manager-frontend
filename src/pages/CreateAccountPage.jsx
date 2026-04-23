import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import TogglePasswordVisibility from "../components/TogglePasswordVisibility";
import accountCreation from "../assets/images/account-creation.jpg";

const CreateAccountPage = () => {
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    setErrors([]);
    const params = new FormData(e.target);

    axios
      .post(`${import.meta.env.VITE_API_BASE_URL}/accounts.json`, params)
      .then((response) => {
        console.log(response);
        toast.success("Account created successfully");
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
    <div id="createAccount" className="app-page">
      <ul className="mx-auto mt-6 w-full max-w-md space-y-2">
        {errors.map((error) => (
          <li key={error} className="alert alert-error text-sm">
            {error}
          </li>
        ))}
      </ul>
      <div className="flex flex-col justify-center items-center h-screen ">
        <form onSubmit={submitHandler} className="app-card-form mb-4 max-w-xl">
          <figure>
            <img
              className="object-scale-down"
              src={accountCreation}
              alt="Account Creation"
            />
          </figure>
          <fieldset className="app-fieldset">
            <legend className="app-fieldset-legend">Create Account</legend>
            <div className=" card-body mb-6">
              <label htmlFor="web_app_name" className="app_label">
                Account Name:
              </label>
              <input
                id="web_app_name"
                name="web_app_name"
                type="text"
                required
                placeholder="ex. Facebook"
                className="app-input"
              />

              <label htmlFor="url" className="app-label">
                Account URL:
              </label>
              <input
                id="url"
                name="url"
                type="text"
                placeholder="ex. www.facebook.com"
                className="app-input mb-2"
              />

              <label htmlFor="username" className="app-label">
                Account Username:
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                className="app-input mb-2"
              />

              <label htmlFor="password" className="app=label">
                Account Password:
              </label>
              <input
                name="password"
                type="password"
                id="password"
                required
                className="app-input mb-2"
              />
              <TogglePasswordVisibility />

              <label htmlFor="notes" className="app-label">
                Notes:
              </label>
              <textarea
                id="notes"
                name="notes"
                rows="5"
                cols="35"
                className="app-textarea"
              ></textarea>
              <br />
              <label htmlFor="category" className="app-label">
                Category:
              </label>
              <select name="category_id" id="category" className="app-select">
                <option value="1">Personal</option>
                <option value="2">Work</option>
                <option value="3">Shared</option>
              </select>

              <br />
              <br />
              <button type="submit" className="app-btn-primary">
                Create Account
              </button>
            </div>
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default CreateAccountPage;
