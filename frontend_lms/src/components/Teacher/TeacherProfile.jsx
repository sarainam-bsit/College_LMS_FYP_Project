import React, { useEffect, useState } from "react";
import axios from "axios";

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
      } finally {
        setLoading(false);
      }
    };

    fetchTeacher();
  }, [teacherId]);

  // Profile picture change
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
      alert("Profile picture updated!");
    } catch (error) {
      console.error("Error uploading picture:", error);
    }
  };

  if (loading) return <p className="text-white text-center mt-5">Loading profile...</p>;
  if (!teacher) return <p className="text-danger text-center mt-5">Teacher not found</p>;

  return (
    <div className="container " style={{marginTop: '6%'}}>
      <div className="row justify-content-center g-4">
        {/* Profile Card */}
        <div className="col-12 col-md-4">
          <div className="card shadow-lg border-0 h-100 text-center p-4">
            <img
              src={teacher.Teacher_Image || "/default-profile.png"}
              alt="Teacher"
              className="rounded-circle mx-auto"
              style={{
                width: "150px",
                height: "150px",
                objectFit: "cover",
                border: "4px solid #0d6efd",
              }}
            />
            <h5 className="card-title mt-3">{teacher.Teacher_Name}</h5>
            <p className="text-muted">{teacher.Teacher_Email}</p>

            <label className="btn btn-primary btn-sm mt-2">
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

        {/* Info Card */}
        <div className="col-12 col-md-6">
          <div className="card shadow-lg border-0 h-100">
            <div className="card-body">
              <h5 className="text-center bg-dark text-white py-2 rounded shadow-sm mb-4">
                Personal Information
              </h5>

              <div className="mb-3">
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={teacher.Teacher_Name || ""}
                  readOnly
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="text"
                  className="form-control"
                  value={teacher.Teacher_Email || ""}
                  readOnly
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Qualification</label>
                <input
                  type="text"
                  className="form-control"
                  value={teacher.Qualification || "Not Available"}
                  readOnly
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Department</label>
                <input
                  type="text"
                  className="form-control"
                  value={teacher.Department_Name}
                  readOnly
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherProfile;
