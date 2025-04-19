import { useState } from "react";
import AccountModal from "../components/AccountModal";
import ViewAccountPage from "./ViewAccountPage";
import Pagination from "../components/Pagination";
import useAccountFetcher from "../components/useAccountFetcher";

const ViewAccountsPage = () => {
  const { loading, accounts, pageCount, currentPage, setCurrentPage } =
    useAccountFetcher();
  accounts.sort((a, b) => a.web_app_name.localeCompare(b.web_app_name));
  const [isShowVisible, setIsShowVisable] = useState(false);
  const [currentAccount, setCurrentAccount] = useState({});

  const handleView = (account) => {
    console.log(account);
    setIsShowVisable(true);
    setCurrentAccount(account);
  };

  return (
    <div id="view-accounts" className="container w-full max-w-xlg">
      <h1>View All Accounts</h1>
      <br />

      {loading ? (
        <div className="text-center text-5xl">Loading...</div>
      ) : (
        <>
          <div className="w -full grid md:grid-cols-3 md:gap-6">
            {accounts.map((account) => (
              <div
                key={account.id}
                className="max-w-sm p-6 bg-white border border-blue-700 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
              >
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  Account Name: {account.web_app_name}
                </p>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  URL: {account.url}
                </p>
                <br />
                <button
                  onClick={() => handleView(account)}
                  type="button"
                  className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 "
                >
                  View
                </button>
                <br />
                <a href="/createpasswordreminder" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Create a Password Update Reminder</a>
              </div>
            ))}
          </div>
          <AccountModal
            show={isShowVisible}
            onClose={() => setIsShowVisable(false)}
          >
            <ViewAccountPage
              account={currentAccount}
              onClose={() => setIsShowVisable(false)}
            />
          </AccountModal>
          <br />
          <Pagination
            pageCount={pageCount}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </>
      )}
    </div>
  );
};

export default ViewAccountsPage;
