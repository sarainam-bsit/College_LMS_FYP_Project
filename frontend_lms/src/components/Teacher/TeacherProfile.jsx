import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TeacherProfile = () => {
  const [teacher, setTeacher] = useState(null);
  const [loading, setLoading] = useState(true);

  const teacherId = localStorage.getItem("teacherId");

  useEffect(() => {
    const fetchTeacher = async () => {
      try {
        if (!teacherId) {
          console.error("No teacher ID found in localStorage");
          setLoading(false);
          return;
        }

        const response = await axios.get(
          `http://127.0.0.1:8000/Account/teacherprofile/${teacherId}/`
        );
        setTeacher(response.data);
      } catch (error) {
        console.error("Error fetching teacher data:", error);
        toast.error("Failed to fetch teacher profile");
      } finally {
        setLoading(false);
      }
    };

    fetchTeacher();
  }, [teacherId]);

  const handlePictureUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("Teacher_Image", file);

    try {
      const response = await axios.patch(
        `http://127.0.0.1:8000/Account/teacherprofile/${teacherId}/`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setTeacher(response.data);
      toast.success("Profile picture updated successfully!");
    } catch (error) {
      console.error("Error uploading picture:", error);
      toast.error("Failed to update profile picture");
    }
  };

  if (loading)
    return (
      <p
        style={{
          color: "rgba(44, 44, 122, 1)",
          textAlign: "center",
          marginTop: "5%",
        }}
      >
        Loading profile...
      </p>
    );
  if (!teacher)
    return (
      <p
        style={{
          color: "rgb(70, 4, 67)",
          textAlign: "center",
          marginTop: "5%",
        }}
      >
        Teacher not found
      </p>
    );

  return (
    <div
      style={{
        marginTop: "5%",
        padding: "30px",
        background: "linear-gradient(135deg, #ebeaf2ff, #f5ecf4ff)",
        minHeight: "100vh",
        fontFamily: "Segoe UI, sans-serif",
      }}
    >
      <div className="row justify-content-center g-4">
     
        <div className="col-12 col-md-4">
          <div
            style={{
              background: "#f5ecf4ff",
              backdropFilter: "blur(10px)",
              padding: "25px",
              borderRadius: "20px",
              border: "1px solid rgba(255,255,255,0.3)",
              textAlign: "center",
              boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
              transition: "transform 0.3s",
            }}
          >
            <img
              src={teacher.Teacher_Image || "/default-profile.png"}
              alt="Teacher"
              style={{
                width: "160px",
                height: "160px",
                objectFit: "cover",
                borderRadius: "50%",
                border: "5px solid rgb(70, 4, 67)",
                marginBottom: "15px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
              }}
            />
            <h4
              style={{
                color: "rgba(44, 44, 122, 1)",
                fontWeight: "700",
                marginBottom: "5px",
              }}
            >
              {teacher.Teacher_Name}
            </h4>
            <p style={{ color: "rgba(44, 44, 122, 0.7)" }}>
              {teacher.Teacher_Email}
            </p>

            <label
              style={{
                marginTop: "12px",
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
              onMouseOver={(e) =>
                (e.currentTarget.style.background = "rgba(44, 44, 122, 1)")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.background = "rgb(70, 4, 67)")
              }
            >
              Change Picture
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={handlePictureUpload}
              />
            </label>
          </div>
        </div>

        <div className="col-12 col-md-6">
          <div
            style={{
              background: "#f5ecf4ff",
              backdropFilter: "blur(8px)",
              padding: "30px",
              borderRadius: "20px",
              border: "1px solid rgba(255,255,255,0.3)",
              boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
              minHeight: "600px",
            }}
          >
            <h5
              style={{
                textAlign: "center",
                background: "rgb(70, 4, 67)",
                color: "white",
                padding: "12px 20px",
                borderRadius: "10px",
                marginBottom: "30px",
                marginTop: "10px",
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
              { label: "Full Name", value: teacher.Teacher_Name },
              { label: "Email", value: teacher.Teacher_Email },
              {
                label: "Qualification",
                value: teacher.Qualification || "Not Available",
              },
              { label: "Department", value: teacher.Department_Name },
            ].map((field, index) => (
              <div style={{ marginBottom: "18px" }} key={index}>
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
      </div>

     
      <ToastContainer position="top-center" autoClose={3000} hideProgressBar />
    </div>
  );
};

export default TeacherProfile;
