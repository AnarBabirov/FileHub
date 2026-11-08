import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Upload = () => {
  const [file, setFile] = useState(null);
  const [dragging, setDragging] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const MAX_SIZE = 5 * 1024 * 1024;

  const handleFile = (selectedFile) => {
    if (!selectedFile) return;

    setError("");

    if (selectedFile.size > MAX_SIZE) {
      setError("File size cannot exceed 5 MB.");
      setFile(null);
      return;
    }

    setFile(selectedFile);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);

    const droppedFile = e.dataTransfer.files[0];

    handleFile(droppedFile);
  };

  const handleUpload = async () => {
    if (!file) return;

    try {
      setLoading(true);
      setError("");

      const formData = new FormData();
      formData.append("file", file);

      const token = localStorage.getItem("token");

      const response = await fetch(
        "http://localhost:5000/uploads/upload",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Upload failed.");
      }

      alert("File uploaded successfully!");
      navigate("/files");

    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="upload-page">

      <div className="upload-heading">
        <h1>Upload Files</h1>
        <p>Upload and manage your documents securely.</p>
      </div>

      <div className="upload-card">

        <div
          className={`upload-dropzone ${dragging ? "dragging" : ""}`}
          onDragOver={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
        >

          <div className="upload-icon">☁️</div>

          <h2>Drag & Drop your files here</h2>

          <p>or click the button below to browse</p>

          <label className="browse-btn">
            Browse Files

            <input
              type="file"
              hidden
              onChange={(e) => {
                handleFile(e.target.files[0]);
                e.target.value = "";
              }}
            />
          </label>

          <span className="upload-hint">
            Maximum file size: 5 MB
          </span>

        </div>

        {file && (
          <div className="selected-file">

            <div className="selected-file-info">
              <span className="selected-file-icon">📄</span>

              <div>
                <h4>{file.name}</h4>
                <p>
                  {(file.size / (1024 * 1024)).toFixed(2)} MB
                </p>
              </div>
            </div>

            <button
              className="remove-file-btn"
              onClick={() => setFile(null)}
              disabled={loading}
            >
              ✕
            </button>

          </div>
        )}

        {error && (
          <p className="upload-error">{error}</p>
        )}

        <div className="upload-actions">

          <button
            className="cancel-btn"
            onClick={() => navigate("/files")}
            disabled={loading}
          >
            Cancel
          </button>

          <button
            disabled={!file || loading}
            onClick={handleUpload}
          >
            {loading ? "Uploading..." : "Upload File"}
          </button>

        </div>

      </div>

    </div>
  );
};
