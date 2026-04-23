import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import CreatePasswordReminder from "../../pages/CreatePasswordReminder";

const mockUseLocation = vi.fn();
const mockUseParams = vi.fn();
const mockPasswordReminders = vi.fn(({ accountId }) => (
  <div data-testid="password-reminders-mock">Account ID: {accountId}</div>
));

vi.mock("react-router", () => ({
  useLocation: () => mockUseLocation(),
  useParams: () => mockUseParams(),
}));

vi.mock("../../components/PasswordReminders", () => ({
  default: (props) => mockPasswordReminders(props),
}));

describe("CreatePasswordReminder", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockUseLocation.mockReturnValue({ state: undefined });
    mockUseParams.mockReturnValue({ accountId: undefined });
  });

  it("renders the page heading and helper text", () => {
    render(<CreatePasswordReminder />);

    expect(screen.getByText(/create password reminder/i)).toBeInTheDocument();
    expect(
      screen.getByText(/select a date to create a password reminder/i),
    ).toBeInTheDocument();
  });

  it("shows account name from location state when available", () => {
    mockUseLocation.mockReturnValue({
      state: { app_name: "Github" },
    });
    mockUseParams.mockReturnValue({ accountId: "12" });

    render(<CreatePasswordReminder />);

    expect(screen.getByText(/account name: github/i)).toBeInTheDocument();
  });

  it("renders PasswordReminders when accountId is valid", () => {
    mockUseParams.mockReturnValue({ accountId: "42" });

    render(<CreatePasswordReminder />);

    expect(screen.getByTestId("password-reminders-mock")).toBeInTheDocument();
    expect(mockPasswordReminders).toHaveBeenCalledWith(
      expect.objectContaining({ accountId: 42 }),
    );
  });
  it("shows warning and does not render PasswordReminders when accountId is invalid", () => {
    mockUseParams.mockReturnValue({ accountId: "abc" });

    render(<CreatePasswordReminder />);

    expect(screen.getByText(/invalid account selected/i)).toBeInTheDocument();
    expect(
      screen.queryByTestId("password-reminders-mock"),
    ).not.toBeInTheDocument();
  });

  it("shows warning when accountId is missing", () => {
    mockUseParams.mockReturnValue({});

    render(<CreatePasswordReminder />);

    expect(
      screen.getByText(/please go back to accounts and choose an account/i),
    ).toBeInTheDocument();
  });
});
