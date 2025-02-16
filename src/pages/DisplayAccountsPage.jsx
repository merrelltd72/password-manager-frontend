import { useState, useEffect } from "react";
import axios from "axios";
import Pagination from "../components/Pagination";

const DisplayAccountsPage = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const Account_URL = "http://localhost:3000/accounts.json";

  useEffect(() => {
    const getAccounts = async () => {
      const response = await axios.get(
        `${Account_URL}?page=${currentPage}&per_page=${itemsPerPage}`
      );
      setData(response.data);
    };
    getAccounts();
  }, [currentPage, itemsPerPage]);

  const totalPages = Math.ceil(data.lentgh / itemsPerPage);
  console.log(totalPages);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = data.slice(startIndex, endIndex);

  return (
    <div id="view-accounts" className="container w-full max-w-xlg">
      <div className="w -full grid md:grid-cols-3 md:gap-6">
        {currentItems.map((item) => (
          <div
            key={item.id}
            className="max-w-sm p-6 bg-white border border-blue-700 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
          >
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              Account Name: {item.web_app_name}
            </p>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              URL: {item.url}
            </p>
          </div>
        ))}
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default DisplayAccountsPage;
