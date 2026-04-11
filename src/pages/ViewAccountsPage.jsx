import { useState, useMemo } from "react";
import { Link } from "react-router";
import AccountModal from "../components/AccountModal";
import ViewAccountPage from "./ViewAccountPage";
import Pagination from "../components/Pagination";
import useAccountFetcher from "../components/useAccountFetcher";
import { useUIDispatch } from "../context/UIContext";

const CATEGORY_LABELS = { 1: "Personal", 2: "Work", 3: "Shared" };

const ViewAccountsPage = () => {
  const { loading, accounts, pageCount, currentPage, setCurrentPage } =
    useAccountFetcher();
  const uiDispatch = useUIDispatch();
  const [isShowVisible, setIsShowVisable] = useState(false);
  const [currentAccount, setCurrentAccount] = useState({});
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState(0);

  const filteredAccounts = useMemo(() => {
    const normalizedSearch = search.toLowerCase();

    return [...accounts]
      .sort((a, b) => a.web_app_name.localeCompare(b.web_app_name))
      .filter((account) => {
        const matchesSearch = account.web_app_name
          .toLowerCase()
          .includes(normalizedSearch);
        const matchesCategory =
          categoryFilter === 0 || account.category_id === categoryFilter;
        return matchesSearch && matchesCategory;
      });
  }, [accounts, search, categoryFilter]);

  const handleOpenModal = (account) => {
    setCurrentAccount(account);
    uiDispatch({ type: "OPEN_ACCOUNT_MODAL" });
  };

  const handleCloseModal = () => {
    uiDispatch({ type: "CLOSE_ACCOUNT_MODAL" });
  };

  return (
    <div id="view-accounts" className="container w-full max-w-xlg">
      <h1>View All Accounts</h1>
      <br />

      {loading ? (
        <div className="text-center text-5xl">Loading...</div>
      ) : (
        <>
          <div className="flex flex-col sm:flex-row gap-3 mb-4">
            <input
              type="text"
              placeholder="Search accounts..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              aria-label="Search accounts"
              className="input input-bordered w-full sm:max-w-xs"
            />
            <div className="flex gap-2">
              {[
                { id: 0, label: "All" },
                { id: 1, label: "Personal" },
                { id: 2, label: "Work" },
                { id: 3, label: "Shared" },
              ].map(({ id, label }) => (
                <button
                  key={id}
                  onClick={() => setCategoryFilter(id)}
                  className={`btn btn-sm ${categoryFilter === id ? "btn-primary" : "btn-outline"}`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {filteredAccounts.length === 0 ? (
            <p className="text-center text-gray-500 mt-8">No accounts found.</p>
          ) : (
            <div className="w-full grid md:grid-cols-3 md:gap-6">
              {filteredAccounts.map((account) => (
                <div
                  key={account.id}
                  className="max-w-sm p-6 bg-white border border-blue-700 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700"
                >
                  <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                    Account Name: {account.web_app_name}
                  </p>
                  <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                    URL: {account.url}
                  </p>
                  {account.category_id && (
                    <span className="badge badge-outline mb-3">
                      {CATEGORY_LABELS[account.category_id] ?? "Unknown"}
                    </span>
                  )}
                  <br />
                  <button
                    onClick={() => handleOpenModal(account)}
                    type="button"
                    className="text-white bg-linear-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-linear-to-br focus:ring-4 focus:outline-hidden focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                  >
                    View
                  </button>
                  <br />
                  <Link
                    to={`/createpasswordreminder/${account.id}`}
                    state={{
                      app_name: account.web_app_name,
                    }}
                  >
                    <button className="text-white bg-linear-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-linear-to-br focus:ring-4 focus:outline-hidden focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                      Create Password Update Reminder
                    </button>
                  </Link>
                </div>
              ))}
            </div>
          )}
          <AccountModal>
            <ViewAccountPage
              account={currentAccount}
              onClose={handleCloseModal}
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
