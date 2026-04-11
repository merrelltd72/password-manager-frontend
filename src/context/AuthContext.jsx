import { func } from "prop-types";
import { createContext, useContext, useMemo, useReducer } from "react";

const AuthStateContext = createContext(null);
const AuthDispatchContext = createContext(null);

const initialAuthState = {
  isAuthenticated: false,
  user: null,
  token: null,
};

function authReducer(state, action) {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return {
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token,
      };
    case "LOGOUT":
      return {
        isAuthenticated: false,
        user: null,
        token: null,
      };

    case "RESTORE_SESSION":
      return {
        isAuthenticated: !!action.payload?.token,
        user: action.payload?.user ?? null,
        token: action.payload?.token ?? null,
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
