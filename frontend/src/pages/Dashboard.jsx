export const Dashboard = () => {
  return (
    <div className="dashboard">
      <div className="dashboard-heading">
        <h1>Dashboard</h1>
        <p>Manage and organize your files.</p>
      </div>

      
      <div className="dashboard-cards">
        <div className="dashboard-card">
          <span>Total Files</span>
          <h2>24</h2>
          <p>Your uploaded files</p>
        </div>

        <div className="dashboard-card">
          <span>Storage Used</span>
          <h2>1.8 GB</h2>
          <p>Of 10 GB available</p>
        </div>

        <div className="dashboard-card">
          <span>Recent Uploads</span>
          <h2>5</h2>
          <p>Uploaded this week</p>
        </div>
      </div>

      
      <div className="recent-files">
        <h2>Recent Files</h2>

        <table>
          <thead>
            <tr>
              <th>File Name</th>
              <th>Type</th>
              <th>Size</th>
              <th>Date</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>Document.pdf</td>
              <td>PDF</td>
              <td>2.4 MB</td>
              <td>Nov 07, 2026</td>
            </tr>

            <tr>
              <td>Image.jpg</td>
              <td>Image</td>
              <td>1.2 MB</td>
              <td>Nov 06, 2026</td>
            </tr>

            <tr>
              <td>Project.zip</td>
              <td>Archive</td>
              <td>15 MB</td>
              <td>Nov 05, 2026</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
