import { useMemo } from "react";
import {
  usePaginationState,
  usePaginationDispatch,
} from "../context/PaginationContext";

export function useClientPagination(items = []) {
  const { currentPage, pageSize } = usePaginationState();
  const dispatch = usePaginationDispatch();

  const pageCount = Math.ceil(items.length / pageSize) || 1;

  const paginatedItems = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    const end = start + pageSize;
    return items.slice(start, end);
  }, [items, currentPage, pageSize]);

  const setCurrentPage = (page) => {
    const boundedPage = Math.max(1, Math.min(page, pageCount));
    dispatch({ type: "SET_CURRENT_PAGE", payload: boundedPage });
  };

  const reset = () => {
    dispatch({ type: "RESET" });
  };

  return {
    paginatedItems,
    pageCount,
    currentPage,
    pageSize,
    setCurrentPage,
    reset,
  };
}
