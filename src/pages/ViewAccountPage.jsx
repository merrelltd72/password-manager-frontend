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
      <h1>{account.web_app_name}</h1>
      <form onSubmit={handleUpdate}>
        <div>
          <label className="block text-gray-600 text-lg font-bold mb-2">
            Account Name:
          </label>
          <input
            defaultValue={account.web_app_name}
            name="web_app_name"
            type="text"
            className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
          />

          <label className="block text-gray-600 text-lg font-bold mb-2">
            Account URL:
          </label>
          <input
            defaultValue={account.url}
            name="url"
            type="text"
            className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
          />

          <label className="block text-gray-600 text-lg font-bold mb-2">
            Account Username:
          </label>
          <input
            defaultValue={account.username}
            name="username"
            type="text"
            className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
          />

          <label className="block text-gray-600 text-lg font-bold mb-2">
            Account Password:
          </label>
          <input
            defaultValue={account.password}
            name="password"
            type="password"
            id="password"
            className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline mb-2"
          />
          <TogglePasswordVisibility />
        </div>

        <label className="block text-gray-600 text-lg font-bold mb-2">
          Notes:
        </label>
        <input
          defaultValue={account.notes}
          name="notes"
          type="text"
          className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
        />
        <br />
        <br />
        <button
          className="bg-blue-500 hover:bg-green-700 text-white font-bold rounded py-2 px-4"
          type="submit"
        >
          Update Account
        </button>
      </form>
      <br />
      <button
        className="bg-blue-500 hover:bg-green-700 text-white font-bold rounded py-2 px-4"
        onClick={() => handleDestroy(account.id)}
      >
        Delete Account
      </button>
    </div>
  );
};

export default ViewAccountPage;
