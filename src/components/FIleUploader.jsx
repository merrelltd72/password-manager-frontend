import { useState } from "react";
import axios from "axios";

const FIleUploader = () => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];

    if (selectedFile) {
      setFile(selectedFile);
      setError(""); /* Reset any previous error messages */
      setSuccess(""); /* Reset any previous success messages */
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!file) {
      setError("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post("/account_upload", formData, {
        headers: {
          "Content-Type": "text/csv",
        },
      });
      setSuccess(response.data.message); /* Show success message */
      setFile(null); /* Clear the file input */
    } catch (error) {
      console.error("Error uploadingfile:", error);
      setError(error.response?.data?.error || "Error uploading file");
    }
  };

  return (
    <div className="app-page mt-4">
      <form onSubmit={handleSubmit} className="app-card max-w-lg">
        <input
          type="file"
          accept=".csv, .xlsx, .xls"
          onChange={handleFileChange}
          required
          className="file-input file-input-bordered w-full"
        />
        <br />
        <br />
        <button type="submit" className="app-btn-primary mb-4">
          Upload
        </button>
      </form>
      {error && <p className="alert alert-error max-w-lg text-sm">{error}</p>}
      {success && (
        <p className="alert alert-success mt-2 max-w-lg text-sm">{success}</p>
      )}
    </div>
  );
};

export default FIleUploader;
