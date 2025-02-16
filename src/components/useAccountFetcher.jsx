import axios from "axios";
import { useEffect, useState } from "react";

const useAccountFetcher = () => {
  const BACKEND_URL = "http://localhost:3000/accounts.json";
  const [loading, setLoading] = useState(true);
  const [accounts, setAccounts] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fechAccounts = async () => {
      const result = await axios.get(`${BACKEND_URL}?page=${currentPage + 1}`);
      console.log(result);
      setAccounts(result.data.data);
      setPageCount(Math.ceil(result.data.meta.total_pages));
      setLoading(false);
    };
    fechAccounts();
  }, [currentPage]);
  return {
    loading,
    accounts,
    currentPage,
    setCurrentPage,
    pageCount,
  };
};

export default useAccountFetcher;
