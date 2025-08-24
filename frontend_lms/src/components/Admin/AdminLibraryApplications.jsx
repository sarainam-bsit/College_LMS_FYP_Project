import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const API_BASE = "http://127.0.0.1:8000"; // apna backend base URL lagao

const AdminLibraryApplications = () => {
  const [applications, setApplications] = useState([]);

  // ✅ Load all applications
  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const response = await axios.get(`${API_BASE}/library/libraryform/`);
      setApplications(response.data);
    } catch (error) {
      console.error("Error fetching applications", error);
    }
  };

  // ✅ Update status
  const updateStatus = async (id, status) => {
    try {
      await axios.patch(`${API_BASE}/library/libraryform/${id}/`, {
        status: status,
      });
      fetchApplications(); // refresh list
    } catch (error) {
      console.error("Error updating status", error);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">📚 Library Card Applications (Admin Panel)</h2>

      <table className="table table-bordered table-hover shadow-sm">
        <thead className="table-dark">
          <tr>
            <th>Student ID</th>
            <th>Student Email</th>
            <th>Application Date</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {applications.length > 0 ? (
            applications.map((app) => (
              <tr key={app.id}>
                <td>{app.id}</td>
                <td>{app.email}</td>
                <td>{new Date(app.applied_at).toLocaleDateString()}</td>
                <td>
                  <span
                    className={`badge ${
                      app.status === "Pending"
                        ? "bg-warning"
                        : app.status === "Accepted"
                        ? "bg-success"
                        : "bg-danger"
                    }`}
                  >
                    {app.status}
                  </span>
                </td>
                <td>
                  {app.status === "Pending" && (
                    <>
                      <button
                        className="btn btn-success btn-sm me-2"
                        onClick={() => updateStatus(app.id, "Accepted")}
                      >
                        Accept
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => updateStatus(app.id, "Rejected")}
                      >
                        Reject
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center">
                No applications found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminLibraryApplications;
