import { createContext, useContext, useMemo, useReducer } from "react";

const PaginationStateContext = createContext(null);
const PaginationDispatchContext = createContext(null);

const initialState = {
  currentPage: 1,
  pageSize: 9,
};

export function paginationReducer(state, action) {
  switch (action.type) {
    case "SET_CURRENT_PAGE":
      return { ...state, currentPage: action.payload };
    case "SET_PAGE_SIZE":
      return { ...state, pageSize: action.payload, currentPage: 1 };
    case "RESET":
      return { ...state, currentPage: 1 };
    default:
      return state;
  }
}

export function PaginationProvider({ children }) {
  const [state, dispatch] = useReducer(paginationReducer, initialState);
  const stateValue = useMemo(() => state, [state]);
  const dispatchValue = useMemo(() => dispatch, []);

  return (
    <PaginationStateContext.Provider value={stateValue}>
      <PaginationDispatchContext.Provider value={dispatchValue}>
        {children}
      </PaginationDispatchContext.Provider>
    </PaginationStateContext.Provider>
  );
}

export function usePaginationState() {
  const context = useContext(PaginationStateContext);
  if (!context) {
    throw new Error(
      "usePaginationState must be used within a PaginationProvider",
    );
  }
  return context;
}

export function usePaginationDispatch() {
  const context = useContext(PaginationDispatchContext);
  if (!context) {
    throw new Error(
      "usePaginationDispatch must be used within a PaginationProvider",
    );
  }
  return context;
}
