import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Profile = () => {
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);

  const studentId = localStorage.getItem("studentId");

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        if (!studentId) {
          console.error("No student ID found in localStorage");
          setLoading(false);
          return;
        }
        const response = await axios.get(
          `http://127.0.0.1:8000/Account/studentprofile/${studentId}/`
        );
        setStudent(response.data);
      } catch (error) {
        console.error("Error fetching student data:", error);
        toast.error("Failed to fetch student profile");
      } finally {
        setLoading(false);
      }
    };
    fetchStudent();
  }, [studentId]);

  const handlePictureUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("Student_Image", file);

    try {
      const response = await axios.patch(
        `http://127.0.0.1:8000/Account/studentprofile/${studentId}/`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      setStudent(response.data);
      toast.success("Profile picture updated successfully!");
    } catch (error) {
      console.error("Error uploading picture:", error);
      toast.error("Failed to update profile picture");
    }
  };

  if (loading)
    return (
      <p style={{ color: "rgba(44, 44, 122, 1)", textAlign: "center", marginTop: "5%" }}>
        Loading profile...
      </p>
    );
  if (!student)
    return (
      <p style={{ color: "rgb(70, 4, 67)", textAlign: "center", marginTop: "5%" }}>
        Student not found
      </p>
    );

  return (
    <div
      style={{
        marginTop: "5%",
        padding: "20px",
        background: "linear-gradient(135deg, #ebeaf2ff, #f5ecf4ff)",
        minHeight: "100vh",
        fontFamily: "Segoe UI, sans-serif",
      }}
    >
      <div className="row justify-content-center g-4">

        
        <div className="col-12 col-md-4 d-flex justify-content-center">
          <div
            style={{
              background: "#f5ecf4ff",
              backdropFilter: "blur(10px)",
              padding: "20px",
              borderRadius: "20px",
              border: "1px solid rgba(255,255,255,0.3)",
              textAlign: "center",
              boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
              transition: "transform 0.3s",
              width: "100%",
              maxWidth: "350px",
            }}
          >
            <div
              style={{
                width: "160px",
                height: "160px",
                margin: "0 auto 15px auto",
                borderRadius: "50%",
                overflow: "hidden",
                border: "5px solid rgb(70, 4, 67)",
                boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
              }}
            >
              <img
                src={student.Student_Image || "/default-profile.png"}
                alt="Student"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>

            <h4 style={{ color: "rgba(44, 44, 122, 1)", fontWeight: "700", marginBottom: "5px" }}>
              {student.Student_Name}
            </h4>
            <p style={{ color: "rgba(44, 44, 122, 0.7)", marginBottom: "12px" }}>
              {student.Student_Email}
            </p>

            <label
              style={{
                display: "inline-block",
                padding: "10px 18px",
                background: "rgb(70, 4, 67)",
                color: "white",
                borderRadius: "10px",
                cursor: "pointer",
                fontSize: "0.9rem",
                fontWeight: "500",
                transition: "all 0.3s ease",
              }}
              onMouseOver={(e) => (e.currentTarget.style.background = "rgba(44, 44, 122, 1)")}
              onMouseOut={(e) => (e.currentTarget.style.background = "rgb(70, 4, 67)")}
            >
              Change Picture
              <input type="file" accept="image/*" hidden onChange={handlePictureUpload} />
            </label>
          </div>
        </div>

        
        <div className="col-12 col-md-6">
          <div
            style={{
              background: "#f5ecf4ff",
              backdropFilter: "blur(8px)",
              padding: "25px",
              borderRadius: "20px",
              border: "1px solid rgba(255,255,255,0.3)",
              boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
            }}
          >
            <h5
              style={{
                textAlign: "center",
                background: "rgb(70, 4, 67)",
                color: "white",
                padding: "12px 20px",
                borderRadius: "10px",
                marginBottom: "25px",
                maxWidth: "270px",
                marginLeft: "auto",
                marginRight: "auto",
                fontWeight: "600",
                boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
              }}
            >
              Personal Information
            </h5>

            {[ 
              { label: "Full Name", value: student.Student_Name },
              { label: "Father Name", value: student.Student_Father_Name },
              { label: "Registration No", value: student.Reg_No },
              { label: "Roll No", value: student.Roll_No },
              { label: "CNIC", value: student.Student_CNIC },
              { label: "Father CNIC", value: student.Father_CNIC_No },
              { label: "Email", value: student.Student_Email },
              { label: "Address", value: student.Address },
              { label: "Phone No", value: student.Student_Phone_No },
            ].map((field, index) => (
              <div style={{ marginBottom: "15px" }} key={index}>
                <label
                  style={{
                    display: "block",
                    marginBottom: "6px",
                    color: "rgba(44, 44, 122, 1)",
                    fontWeight: "500",
                  }}
                >
                  {field.label}
                </label>
                <input
                  type="text"
                  value={field.value || ""}
                  readOnly
                  className="form-control"
                  style={{
                    width: "100%",
                    padding: "10px 12px",
                    borderRadius: "10px",
                    border: "1px solid #ddd",
                    backgroundColor: "#f9f9f9",
                    fontSize: "0.95rem",
                    boxShadow: "inset 0 2px 5px rgba(0,0,0,0.05)",
                  }}
                />
              </div>
            ))}
          </div>
        </div>

    
        <div className="col-12 mt-4 mb-4">
          <div
            style={{
              background: "#f5ecf4ff",
              backdropFilter: "blur(8px)",
              padding: "25px",
              borderRadius: "20px",
              border: "1px solid rgba(255,255,255,0.3)",
              boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
              overflowX: "auto",
            }}
          >
            <h5
              style={{
                textAlign: "center",
                background: "rgb(70, 4, 67)",
                color: "white",
                padding: "12px 20px",
                borderRadius: "10px",
                marginBottom: "25px",
                maxWidth: "270px",
                marginLeft: "auto",
                marginRight: "auto",
                fontWeight: "600",
                boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
              }}
            >
              Academic Details
            </h5>
            <table className="table table-striped table-responsive">
              <thead>
                <tr>
                  <th>Level</th>
                  <th>Degree Title</th>
                  <th>Board/Institute</th>
                  <th>Roll No</th>
                  <th>Passing Year</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Matric</td>
                  <td>SSC</td>
                  <td>{student.Matric_Board || "-"}</td>
                  <td>{student.Matric_Roll_No || "-"}</td>
                  <td>{student.Matric_Year || "-"}</td>
                </tr>
                <tr>
                  <td>Intermediate</td>
                  <td>HSSC</td>
                  <td>{student.Intermediate_Board || "-"}</td>
                  <td>{student.Intermediate_Roll_No || "-"}</td>
                  <td>{student.Intermediate_Year || "-"}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      
      <ToastContainer position="top-center" autoClose={3000} hideProgressBar />
    </div>
  );
};

export default Profile;
