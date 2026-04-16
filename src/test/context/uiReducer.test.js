import { describe, it, expect } from "vitest";
import { uiReducer } from "../../context/UIContext";

const initialUIState = {
  isAccountModalOpen: false,
  isSidebarOpen: false,
  isLoading: false,
  toastQueue: [],
  error: null,
};

describe("uiReducer", () => {
  it("returns isAccountModalOpen true when OPEN_ACCOUNT_MODAL is dispatched", () => {
    const state = uiReducer(initialUIState, { type: "OPEN_ACCOUNT_MODAL" });
    expect(state.isAccountModalOpen).toBe(true);
  });

  it("returns isAccountModalOpen false when CLOSE_ACCOUNT_MODAL is dispatched", () => {
    const openState = { ...initialUIState, isAccountModalOpen: true };
    const state = uiReducer(openState, { type: "CLOSE_ACCOUNT_MODAL" });
    expect(state.isAccountModalOpen).toBe(false);
  });

  it("toggles isSidebarOpen when TOGGLE_SIDEBAR is dispatched", () => {
    const state1 = uiReducer(initialUIState, { type: "TOGGLE_SIDEBAR" });
    expect(state1.isSidebarOpen).toBe(true);
    const state2 = uiReducer(state1, { type: "TOGGLE_SIDEBAR" });
    expect(state2.isSidebarOpen).toBe(false);
  });

  it("sets isLoading when SET_LOADING is dispatched", () => {
    const state = uiReducer(initialUIState, {
      type: "SET_LOADING",
      payload: true,
    });
    expect(state.isLoading).toBe(true);
  });

  it("adds a toast to the queue when ADD_TOAST is dispatched", () => {
    const toast = { id: 1, message: "Test Toast" };
    const state = uiReducer(initialUIState, {
      type: "ADD_TOAST",
      payload: toast,
    });
    expect(state.toastQueue).toContain(toast);
  });

  it("removes a toast from the queue when REMOVE_TOAST is dispatched", () => {
    const toast1 = { id: 1, message: "Toast 1" };
    const toast2 = { id: 2, message: "Toast 2" };
    const stateWithToasts = {
      ...initialUIState,
      toastQueue: [toast1, toast2],
    };
    const state = uiReducer(stateWithToasts, {
      type: "REMOVE_TOAST",
      payload: 1,
    });
    expect(state.toastQueue).not.toContain(toast1);
    expect(state.toastQueue).toContain(toast2);
  });

  it("sets error when SET_ERROR is dispatched", () => {
    const errorMessage = "An error occurred";
    const state = uiReducer(initialUIState, {
      type: "SET_ERROR",
      payload: errorMessage,
    });
    expect(state.error).toBe(errorMessage);
  });

  it("clears error when CLEAR_ERROR is dispatched", () => {
    const stateWithError = { ...initialUIState, error: "Error" };
    const state = uiReducer(stateWithError, { type: "CLEAR_ERROR" });
    expect(state.error).toBeNull();
  });
});
