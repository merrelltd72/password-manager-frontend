import axios from "axios";
import { useEffect, useState, useCallback } from "react";

const useAccountFetcher = () => {
  const BACKEND_URL = `${import.meta.env.VITE_API_BASE_URL}/accounts.json`;
  const [loading, setLoading] = useState(true);
  const [accounts, setAccounts] = useState([]);
  const [error, setError] = useState(null);

  const fetchAccounts = useCallback(
    async (signal) => {
      try {
        setLoading(true);
        setError(null);

        // Fetch first page to get total_pages
        const firstRes = await axios.get(BACKEND_URL, { signal });
        const allAccounts = [...(firstRes.data.data || [])];
        const totalPages = firstRes.data.meta?.total_pages || 1;

        // Fetch remaining pages if there are more
        for (let page = 2; page <= totalPages; page++) {
          if (signal.aborted) break;
          const res = await axios.get(`${BACKEND_URL}?page=${page}`, {
            signal,
          });
          allAccounts.push(...(res.data.data || []));
        }

        setAccounts(allAccounts);
      } catch (err) {
        if (err.name !== "CanceledError") {
          setError(err.message || "Failed to fetch accounts");
        }
      } finally {
        setLoading(false);
      }
    },
    [BACKEND_URL],
  );

  useEffect(() => {
    const abortController = new AbortController();
    fetchAccounts(abortController.signal);
    return () => abortController.abort();
  }, [fetchAccounts]);

  const refetch = useCallback(() => {
    const abortController = new AbortController();
    fetchAccounts(abortController.signal);
  }, [fetchAccounts]);

  return {
    loading,
    accounts,
    error,
    refetch,
  };
};

export default useAccountFetcher;
