import { createContext, useContext, useMemo, useReducer } from "react";

const AuthStateContext = createContext(null);
const AuthDispatchContext = createContext(null);

const initialAuthState = {
  isAuthenticated: false,
  user: null,
  isAuthResolved: false,
};

export function authReducer(state, action) {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return {
        isAuthenticated: true,
        user: action.payload.user,
        isAuthResolved: true,
      };
    case "LOGOUT":
      return {
        isAuthenticated: false,
        user: null,
        isAuthResolved: true,
      };

    case "RESTORE_SESSION":
      return {
        isAuthenticated: !!action.payload?.user,
        user: action.payload?.user ?? null,
        isAuthResolved: true,
      };

    default:
      return state;
  }
}

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialAuthState);
  const value = useMemo(() => state, [state]);

  return (
    <AuthStateContext.Provider value={value}>
      <AuthDispatchContext.Provider value={dispatch}>
        {children}
      </AuthDispatchContext.Provider>
    </AuthStateContext.Provider>
  );
}

export function useAuthState() {
  const context = useContext(AuthStateContext);
  if (!context) {
    throw new Error("useAuthState must be used within an AuthProvider");
  }
  return context;
}

export function useAuthDispatch() {
  const context = useContext(AuthDispatchContext);
  if (!context) {
    throw new Error("useAuthDispatch must be used within an AuthProvider");
  }
  return context;
}
