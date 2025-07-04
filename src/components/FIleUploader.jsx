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
    <div className="container w-full max-w-lg mt-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-sm px-8 pt-6 pb-8 mb-4"
      >
        <input
          type="file"
          accept=".csv, .xlsx, .xls"
          onChange={handleFileChange}
          required
        />
        <br />
        <br />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-green-700 text-white font-bold rounded-sm py-2 px-4 mb-4 items-center flex justify-between"
        >
          Upload
        </button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
    </div>
  );
};

export default FIleUploader;
