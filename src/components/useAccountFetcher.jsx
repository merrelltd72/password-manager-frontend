import axios from "axios";
import { useEffect, useState, useCallback, useRef } from "react";

const useAccountFetcher = () => {
  const BACKEND_URL = `${import.meta.env.VITE_API_BASE_URL}/accounts.json`;
  const [loading, setLoading] = useState(true);
  const [accounts, setAccounts] = useState([]);
  const [error, setError] = useState(null);
  const abortControllerRef = useRef(null);

  const fetchAccounts = useCallback(async () => {
    // Cancel any request already in flight before starting a new one
    abortControllerRef.current?.abort();
    const abortController = new AbortController();
    abortControllerRef.current = abortController;
    const { signal } = abortController;

    setLoading(true);
    setError(null);

    try {
      const firstRes = await axios.get(BACKEND_URL, { signal });
      const totalPages = firstRes.data.meta?.total_pages || 1;

      const remainingPages = Array.from(
        { length: Math.max(totalPages - 1, 0) },
        (_, i) => i + 2,
      );

      const remainingResults = await Promise.all(
        remainingPages.map((page) =>
          axios.get(`${BACKEND_URL}?page=${page}`, { signal }),
        ),
      );

      const allAccounts = [
        ...(firstRes.data.data || []),
        ...remainingResults.flatMap((res) => res.data.data || []),
      ];

      if (!signal.aborted) {
        setAccounts(allAccounts);
      }
    } catch (err) {
      if (err.name !== "CanceledError" && !signal.aborted) {
        setError(err.message || "Failed to fetch accounts");
      }
    } finally {
      if (!signal.aborted) {
        setLoading(false);
      }
    }
  }, [BACKEND_URL]);

  useEffect(() => {
    fetchAccounts();
    return () => abortControllerRef.current?.abort();
  }, [fetchAccounts]);

  return {
    loading,
    accounts,
    error,
    refetch: fetchAccounts,
  };
};

export default useAccountFetcher;
