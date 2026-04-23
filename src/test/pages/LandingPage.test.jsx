import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import LandingPage from "../../pages/LandingPage";

describe("LandingPage", () => {
  const originalLocation = window.location;

  beforeEach(() => {
    localStorage.clear();
    window.history.replaceState({}, "", "/");
  });

  afterEach(() => {
    vi.restoreAllMocks();
    window.history.replaceState({}, "", "/");
  });

  it("renders the landing page content and calls to action", () => {
    render(<LandingPage />);

    expect(screen.getByText(/secure by design/i)).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /password manager/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /store credentials safely, generate strong passwords instantly/i,
      ),
    ).toBeInTheDocument();

    expect(screen.getByRole("link", { name: /get started/i })).toHaveAttribute(
      "href",
      "/signup",
    );

    expect(screen.getByRole("link", { name: /login/i })).toHaveAttribute(
      "href",
      "/login",
    );
  });

  it("stores the jwt from the query string in localStorage", () => {
    const setItemSpy = vi.spyOn(Storage.prototype, "setItem");
    window.history.replaceState({}, "", "/?jwt=test-token-123");

    render(<LandingPage />);

    expect(setItemSpy).toHaveBeenCalledWith("jwt", "test-token-123");
    expect(localStorage.getItem("jwt")).toBe("test-token-123");
  });

  it("does not write to localStorage when jwt is missing", () => {
    const setItemSpy = vi.spyOn(Storage.prototype, "setItem");

    render(<LandingPage />);

    expect(setItemSpy).not.toHaveBeenCalled();
    expect(localStorage.getItem("jwt")).toBeNull();
  });
});
