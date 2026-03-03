/* eslint-disable react/prop-types */
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import TogglePasswordVisibility from "../components/TogglePasswordVisibility";

const ViewAccountPage = ({ account, onClose }) => {
  const navigate = useNavigate();

  const handleUpdate = (e) => {
    e.preventDefault();
    const params = new FormData(e.target);
    axios
      .patch(`http://localhost:3000/accounts/${account.id}.json`, params)
      .then(() => {
        toast.info("Account successfully updated!");
        onClose();
        navigate("/accounts");
      });
  };

  const handleDestroy = () => {
    axios
      .delete(`http://localhost:3000/accounts/${account.id}.json`)
      .then(() => {
        toast.info("Account successfully deleted!");
        onClose();
        console.log("Account Deleted!");
        navigate("/accounts");
      });
  };

  return (
    <div>
      <form onSubmit={handleUpdate} className="form">
        <fieldset className="fieldset">
          <legend className="fieldset-legend text-xl">
            {account.web_app_name}
          </legend>
          <label className="label">Account Name:</label>
          <input
            defaultValue={account.web_app_name}
            name="web_app_name"
            type="text"
            className="input"
          />

          <label className="label">Account URL:</label>
          <input
            defaultValue={account.url}
            name="url"
            type="text"
            className="input"
          />

          <label className="label">Account Username:</label>
          <input
            defaultValue={account.username}
            name="username"
            type="text"
            className="input"
          />

          <label className="label">Account Password:</label>
          <input
            defaultValue={account.password}
            name="password"
            type="password"
            id="password"
            className="input"
          />
          <TogglePasswordVisibility />

          <label className="label">Notes:</label>
          <textarea
            defaultValue={account.notes}
            name="notes"
            type="text"
            className="textarea h-24"
          />
          <br />
          <br />
          <button className="btn btn-info mt-4" type="submit">
            Update Account
          </button>
        </fieldset>
      </form>
      <br />
      <button
        className="btn btn-error"
        onClick={() => handleDestroy(account.id)}
      >
        Delete Account
      </button>
    </div>
  );
};

export default ViewAccountPage;
