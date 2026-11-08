import { useState, useEffect } from "react";

export const Files = () => {
  const [files, setFiles] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleting, setDeleting] = useState(null);

  const token = localStorage.getItem("token");

 
  const fetchFiles = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        "http://localhost:5000/uploads/getUploads",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch files");
      }

      setFiles(Array.isArray(data) ? data : data.files || []);

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  // FORMAT SIZE
  const formatSize = (bytes) => {
    if (bytes < 1024) return `${bytes} B`;

    if (bytes < 1024 * 1024) {
      return `${(bytes / 1024).toFixed(1)} KB`;
    }

    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };


  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "2-digit",
    });
  };


  const getFileType = (mimetype) => {
    if (mimetype === "application/pdf") return "PDF";

    if (mimetype.startsWith("image/")) return "Image";

    if (mimetype.startsWith("video/")) return "Video";

    if (mimetype.includes("zip") || mimetype.includes("compressed")) {
      return "Archive";
    }

    return "Document";
  };

  
  const filteredFiles = files.filter((file) => {
    const matchesSearch = file.originalname
      .toLowerCase()
      .includes(search.toLowerCase());

    const fileType = getFileType(file.mimetype);

    const matchesFilter = filter === "All" || fileType === filter;

    return matchesSearch && matchesFilter;
  });

 
  const handleDownload = async (file) => {
    try {
      const response = await fetch(
        `http://localhost:5000/uploads/${file._id}/download`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to download file");
      }

      const blob = await response.blob();

      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");

      link.href = url;
      link.download = file.originalname;

      document.body.appendChild(link);

      link.click();

      link.remove();

      window.URL.revokeObjectURL(url);

    } catch (err) {
      alert(err.message);
    }
  };

  
  const handleDelete = async (file) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete ${file.originalname}?`
    );

    if (!confirmDelete) return;

    try {
      setDeleting(file._id);

      const response = await fetch(
        `http://localhost:5000/uploads/deletefilebyid/${file._id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to delete file");
      }

      setFiles((prev) =>
        prev.filter((item) => item._id !== file._id)
      );

    } catch (err) {
      alert(err.message);
    } finally {
      setDeleting(null);
    }
  };

  if (loading) {
    return <div className="files-page">Loading files...</div>;
  }

  if (error) {
    return (
      <div className="files-page">
        <p className="error-message">{error}</p>
      </div>
    );
  }

  return (
    <div className="files-page">

      <div className="files-heading">
        <div>
          <h1>My Files</h1>
          <p>Manage and organize all your uploaded files.</p>
        </div>

        <button
          className="files-upload-btn"
          onClick={() => (window.location.href = "/upload")}
        >
          + Upload File
        </button>
      </div>

      <div className="files-toolbar">

        <input
          type="search"
          placeholder="Search files..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="All">All Files</option>
          <option value="PDF">PDF</option>
          <option value="Image">Images</option>
          <option value="Archive">Archives</option>
          <option value="Document">Documents</option>
          <option value="Video">Videos</option>
        </select>

      </div>

      <div className="files-table-container">

        <table className="files-table">

          <thead>
            <tr>
              <th>File Name</th>
              <th>Type</th>
              <th>Size</th>
              <th>Upload Date</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>

            {filteredFiles.length > 0 ? (

              filteredFiles.map((file) => {

                const fileType = getFileType(file.mimetype);

                return (
                  <tr key={file._id}>

                    <td className="file-name">
                      <span className="file-icon">📄</span>
                      {file.originalname}
                    </td>

                    <td>
                      <span className={`file-type ${fileType.toLowerCase()}`}>
                        {fileType}
                      </span>
                    </td>

                    <td>{formatSize(file.size)}</td>

                    <td>{formatDate(file.createdAt)}</td>

                    <td>
                      <div className="file-actions">

                        <button
                          className="download-btn"
                          onClick={() => handleDownload(file)}
                        >
                          Download
                        </button>

                        <button
                          className="delete-btn"
                          onClick={() => handleDelete(file)}
                          disabled={deleting === file._id}
                        >
                          {deleting === file._id ? "Deleting..." : "Delete"}
                        </button>

                      </div>
                    </td>

                  </tr>
                );

              })

            ) : (

              <tr>
                <td colSpan="5" className="empty-files">
                  No files found.
                </td>
              </tr>

            )}

          </tbody>

        </table>

      </div>

      <div className="files-footer">
        Showing {filteredFiles.length} of {files.length} files
      </div>

    </div>
  );
};