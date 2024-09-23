import axios from "axios";
import { useEffect, useState } from "react";

const useAccountFetcher = () => {
  const API_URL = "http://localhost:3000/accounts.json?per_page=6";
  const totalAccounts = 10;
  const [loading, setLoading] = useState(true);
  const [accounts, setAccounts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    const fechAccounts = async () => {
      const page = Math.min(currentPage + 1, totalAccounts);
      const result = await axios.get(`${API_URL}&page=${page}`);
      console.log(result.data);
      setAccounts(result.data);
      setLoading(false);
    };
    fechAccounts();
  }, [currentPage]);
  return {
    loading,
    accounts,
    totalAccounts,
    currentPage,
    setCurrentPage,
  };
};

export default useAccountFetcher;
