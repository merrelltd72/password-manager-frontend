import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axios from "axios";
import { toast } from "react-toastify";
import CreateAccountPage from "../../pages/CreateAccountPage";

const mockNavigate = vi.fn();

vi.mock("axios");
vi.mock("react-toastify", () => ({
  toast: {
    success: vi.fn(),
  },
}));
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});
vi.mock("../../components/TogglePasswordVisibility", () => ({
  default: () => <div data-testid="toggle-password-visibility" />,
}));

describe("CreateAccountPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the create account form fields", () => {
    render(<CreateAccountPage />);

    expect(screen.getByLabelText(/account name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/account url/i)).toBeInTheDocument();
    expect(
      screen.getByRole("textbox", { name: /account username/i }),
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/account password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/notes/i)).toBeInTheDocument();
    expect(
      screen.getByRole("combobox", { name: /category/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByTestId("toggle-password-visibility"),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /create account/i }),
    ).toBeInTheDocument();
  });

  it("submits the form and navigates on success", async () => {
    const user = userEvent.setup();
    axios.post.mockResolvedValueOnce({ data: { id: 1 } });

    render(<CreateAccountPage />);

    await user.type(
      screen.getByRole("textbox", { name: /account name/i }),
      "Test Account",
    );
    await user.type(
      screen.getByRole("textbox", { name: /account url/i }),
      "https://example.com",
    );
    await user.type(
      screen.getByRole("textbox", { name: /account username/i }),
      "testuser",
    );
    await user.type(screen.getByLabelText(/account password/i), "password123");
    await user.type(
      screen.getByLabelText(/notes/i),
      "Some notes about the account",
    );
    await user.selectOptions(
      screen.getByRole("combobox", { name: /category/i }),
      "1",
    );
    await user.click(screen.getByRole("button", { name: /create account/i }));

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledTimes(1);
    });

    expect(toast.success).toHaveBeenCalledWith("Account created successfully");
    expect(mockNavigate).toHaveBeenCalledWith("/accounts", {
      state: { message: "Account created successfully" },
    });
  });

  it("returns an error message on failed submission", async () => {
    const user = userEvent.setup();
    axios.post.mockRejectedValueOnce({
      response: { status: 422 },
    });

    render(<CreateAccountPage />);

    await user.type(
      screen.getByRole("textbox", { name: /account name/i }),
      "Test Account",
    );
    await user.type(
      screen.getByRole("textbox", { name: /account username/i }),
      "testuser",
    );
    await user.type(screen.getByLabelText(/account password/i), "password123");
    await user.click(screen.getByRole("button", { name: /create account/i }));

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledTimes(1);
    });

    expect(
      screen.getByText("Account could not be created!"),
    ).toBeInTheDocument();
    expect(toast.success).not.toHaveBeenCalled();
    expect(mockNavigate).not.toHaveBeenCalled();
  });
});
