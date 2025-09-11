import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API_BASE = "http://127.0.0.1:8000"; // apna backend base URL lagao

const AdminHostelApplications = () => {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const response = await axios.get(`${API_BASE}/hostel/hostelapplication/`);
      setApplications(response.data);
    } catch (error) {
      console.error("Error fetching applications", error);
      toast.error("⚠️ Error fetching applications");
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await axios.patch(`${API_BASE}/hostel/hostelapplication/${id}/`, {
        status: status,
      });
      toast.success(
        status === "Approved"
          ? "✅ Application Approved"
          : "❌ Application Rejected"
      );
      fetchApplications();
    } catch (error) {
      console.error("Error updating status", error);
      toast.error("⚠️ Error updating status");
    }
  };

  return (
    <div
      style={{
        backgroundColor: "#ebeaf2ff",
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      <div
        style={{
          background: "#f5ecf4ff",
          borderRadius: "12px",
          padding: "25px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
          maxWidth: "1000px",
          margin: "0 auto",
        }}
      >
        <h2
          className="mb-4 text-center"
          style={{ color: "rgba(44,44,122,1)", fontWeight: "bold", marginTop: '40px' }}
        >
          Hostel Applications 
        </h2>

        <div className="table-responsive">
          <table
            className="table table-hover text-center align-middle"
            style={{
              border: "1px solid #ddd",
              borderRadius: "10px",
              overflow: "hidden",
            }}
          >
            <thead style={{ backgroundColor: "rgb(70,4,67)", color: "white" }}>
              <tr>
                <th>Application ID</th>
                <th>Student Email</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {applications.length > 0 ? (
                applications.map((app) => (
                  <tr key={app.id}>
                    <td>{app.id}</td>
                    <td>{app.Email}</td>
                    <td>
                      <span
                        className={`badge ${
                          app.status === "Pending"
                            ? "bg-warning text-dark"
                            : app.status === "Approved"
                            ? "bg-success"
                            : "bg-danger"
                        }`}
                        style={{ fontSize: "14px", padding: "6px 12px" }}
                      >
                        {app.status}
                      </span>
                    </td>
                    <td>
                      {app.status === "Pending" && (
                        <div className="d-flex justify-content-center gap-2">
                          <button
                            className="btn btn-sm"
                            style={{
                              backgroundColor: "green",
                              color: "white",
                              borderRadius: "8px",
                            }}
                            onClick={() => updateStatus(app.id, "Approved")}
                          >
                            ✅ Accept
                          </button>
                          <button
                            className="btn btn-sm"
                            style={{
                              backgroundColor: "red",
                              color: "white",
                              borderRadius: "8px",
                            }}
                            onClick={() => updateStatus(app.id, "Rejected")}
                          >
                            ❌ Reject
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center text-muted">
                    No applications found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
};

export default AdminHostelApplications;
