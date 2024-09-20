import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import AccountModal from "../components/AccountModal";
import ViewAccountPage from "./ViewAccountPage";
import Pagination from "../components/Pagination";

const ViewAccountsPage = () => {
  const [isShowVisible, setIsShowVisable] = useState(false);
  const [currentAccount, setCurrentAccount] = useState({});
  const accounts = useLoaderData();

  const handleView = (account) => {
    console.log(account);
    setIsShowVisable(true);
    setCurrentAccount(account);
  };

  return (
    <div id="view-accounts" className="container w-full max-w-xlg">
      <h1>View All Accounts</h1>
      <br />
      <div className="w -full grid md:grid-cols-3 md:gap-6">
        {accounts.map((account) => (
          <div
            key={account.id}
            className="max-w-sm p-6 bg-white border border-blue-700 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
          >
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              Accouont Name: {account.web_app_name}
            </p>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              URL: {account.url}
            </p>
            <br />
            <button
              onClick={handleView}
              type="button"
              className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 "
            >
              View
            </button>
          </div>
        ))}
      </div>
      <AccountModal
        show={isShowVisible}
        onClose={() => setIsShowVisable(false)}
      >
        <ViewAccountPage account={currentAccount} />
      </AccountModal>
      <br />
      <Pagination />
    </div>
  );
};

export default ViewAccountsPage;
