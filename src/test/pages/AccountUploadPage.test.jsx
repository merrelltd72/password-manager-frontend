import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import AccountUploadPage from "../../pages/AccountUploadPage";

vi.mock("../../components/FIleUploader", () => ({
  default: () => (
    <div data-testid="file-uploader-mock">Mocked File Uploader</div>
  )
}));

describe("AccountUploadPage", () => {
  it("renders the mocked FIleUploader component", () => {
    render(<AccountUploadPage />);

    expect(screen.getByTestId("file-uploader-mock")).toBeInTheDocument();
    expect(screen.getByText("Mocked File Uploader")).toBeInTheDocument();
  });
});
