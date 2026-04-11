import { createContext, useContext, useMemo, useReducer } from "react";

const UIStateContext = createContext(null);
const UIDispatchContext = createContext(null);

const initialUIState = {
  isAccountModalOpen: false,
  isSidebarOpen: false,
  isLoading: false,
  toastQueue: [],
  error: null,
};

function uiReducer(state, action) {
  switch (action.type) {
    case "OPEN_ACCOUNT_MODAL":
      return { ...state, isAccountModalOpen: true };
    case "CLOSE_ACCOUNT_MODAL":
      return { ...state, isAccountModalOpen: false };
    case "TOGGLE_SIDEBAR":
      return { ...state, isSidebarOpen: !state.isSidebarOpen };
    case "SET_LOADING":
      return { ...state, isLoading: action.payload };
    case "ADD_TOAST":
      return { ...state, toastQueue: [...state.toastQueue, action.payload] };
    case "REMOVE_TOAST":
      return {
        ...state,
        toastQueue: state.toastQueue.filter(
          (toast) => toast.id !== action.payload,
        ),
      };
    case "SET_ERROR":
      return { ...state, error: action.payload };
    case "CLEAR_ERROR":
      return { ...state, error: null };
    default:
      return state;
  }
}

export function UIProvider({ children }) {
  const [state, dispatch] = useReducer(uiReducer, initialUIState);
  const value = useMemo(() => state, [state]);

  return (
    <UIStateContext.Provider value={value}>
      <UIDispatchContext.Provider value={dispatch}>
        {children}
      </UIDispatchContext.Provider>
    </UIStateContext.Provider>
  );
}

export function useUIState() {
  const context = useContext(UIStateContext);
  if (!context) {
    throw new Error("useUIState must be used within a UIProvider");
  }
  return context;
}

export function useUIDispatch() {
  const context = useContext(UIDispatchContext);
  if (!context) {
    throw new Error("useUIDispatch must be used within a UIProvider");
  }
  return context;
}
