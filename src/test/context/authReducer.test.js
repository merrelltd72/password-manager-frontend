import { describe, it, expect } from "vitest";
import { authReducer } from "../../context/AuthContext";

const initialState = {
  isAuthenticated: false,
  user: null,
  isAuthResolved: false,
};

describe("authReducer", () => {
  it("returns initial state for unknown actions", () => {
    const state = authReducer(initialState, { type: "UNKNOWN" });
    expect(state).toEqual(initialState);
  });

  it("LOGIN_SUCCESS sets isAuthenticated and user", () => {
    const user = { id: 1, email: "test@example.com" };
    const state = authReducer(initialState, {
      type: "LOGIN_SUCCESS",
      payload: { user },
    });
    expect(state).toEqual({
      isAuthenticated: true,
      user,
      isAuthResolved: true,
    });
  });

  it("LOGOUT clears user and sets isAuthenticated to false", () => {
    const loggedInState = {
      isAuthenticated: true,
      user: { id: 1 },
      isAuthResolved: true,
    };
    const state = authReducer(loggedInState, { type: "LOGOUT" });
    expect(state).toEqual({
      isAuthenticated: false,
      user: null,
      isAuthResolved: true,
    });
  });

  describe("RESTORE_SESSION", () => {
    it("sets isAuthenticated true when user is present", () => {
      const user = { id: 2, email: "user@example.com" };
      const state = authReducer(initialState, {
        type: "RESTORE_SESSION",
        payload: { user },
      });
      expect(state.isAuthenticated).toBe(true);
      expect(state.user).toEqual(user);
      expect(state.isAuthResolved).toBe(true);
    });

    it("sets isAuthenticated false when user is null", () => {
      const state = authReducer(initialState, {
        type: "RESTORE_SESSION",
        payload: { user: null },
      });
      expect(state.isAuthenticated).toBe(false);
      expect(state.user).toBeNull();
    });

    it("handles missing payload gracefully", () => {
      const state = authReducer(initialState, {
        type: "RESTORE_SESSION",
        payload: undefined,
      });
      expect(state.isAuthenticated).toBe(false);
      expect(state.user).toBeNull();
    });
  });
});
