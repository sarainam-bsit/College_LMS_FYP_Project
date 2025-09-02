import React, { useEffect, useState } from "react";
import axios from "axios";

const Profile = () => {
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

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
      } finally {
        setLoading(false);
      }
    };

    fetchStudent();
  }, [studentId]);

  // Handle input changes
  const handleChange = (e) => {
    setStudent({
      ...student,
      [e.target.name]: e.target.value,
    });
  };

  // Profile update
  const handleUpdate = async () => {
    try {
      const response = await axios.patch(
        `http://127.0.0.1:8000/Account/studentprofile/${studentId}/`,
        student
      );
      setStudent(response.data);
      setIsEditing(false);
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  // Profile picture change
  const handlePictureUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("Student_Image", file);

    try {
      const response = await axios.patch(
        `http://127.0.0.1:8000/Account/studentprofile/${studentId}/`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setStudent(response.data);
      alert("Profile picture updated!");
    } catch (error) {
      console.error("Error uploading picture:", error);
    }
  };

  if (loading) return <p className="text-white text-center mt-5">Loading profile...</p>;
  if (!student) return <p className="text-danger text-center mt-5">Student not found</p>;

  return (
    <div className="container-fluid d-flex justify-content-center align-items-center min-vh-100 bg-dark" style={{ marginTop: "4%" }}>
      <div className="row justify-content-center">
        {/* Profile Picture */}
        <div className="col-12 col-md-4 mt-4">
          <div className="card">
            <img
              src={student.Student_Image}
              alt="Student"
              className="card-img-top mt-4"
              style={{
                width: "150px",
                height: "150px",
                borderRadius: "50%", // ye circle banayega
                objectFit: "cover",  // image stretch na ho
                margin: "auto",      // center karne ke liye
                display: "block"
              }}
            />
            <div className="card-body">
              <ul className="list-group">
                <li className="list-group-item">
                  <input
                    type="text"
                    className="form-control"
                    value={student.Student_Name || ""}
                    readOnly
                  />
                </li>
                <li className="list-group-item">
                  <input
                    type="text"
                    className="form-control"
                    value="Government Graduate College Civil Line SKP"
                    readOnly
                  />
                </li>
              </ul>

              {/* Change Picture */}
              <div className="d-flex justify-content-center mt-3">
                <label className="btn btn-primary w-50">
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
          </div>
        </div>

        {/* Personal Information */}
        <div className="col-12 col-md-6 mt-4">
          <div className="card">
            <div className="card-body">
              <form>
                <h5 className="text-center mt-2 bg-dark text-white py-2 px-2 mx-auto rounded shadow-lg" style={{ maxWidth: "400px" }}>
                  Personal Information
                </h5>

                <div className="row mb-3 g-2 mt-3">
                  <div className="col-md-6">
                    <input
                      type="text"
                      name="Student_Name"
                      className="form-control"
                      value={student.Student_Name || ""}
                      onChange={handleChange}
                      readOnly
                    />
                  </div>
                  <div className="col-md-6">
                    <input
                      type="text"
                      name="Student_Father_Name"
                      className="form-control"
                      value={student.Student_Father_Name || ""}
                      onChange={handleChange}
                      readOnly
                    />
                  </div>
                </div>

                <div className="row mb-3 g-2 mt-3">
                  <div className="col-md-6">
                    <input
                      type="text"
                      name="Reg_No"
                      className="form-control"
                      value={student.Reg_No || ""}
                      readOnly
                    />
                  </div>
                  <div className="col-md-6">
                    <input
                      type="text"
                      name="Roll_No"
                      className="form-control"
                      value={student.Roll_No || ""}
                      readOnly
                    />
                  </div>
                </div>

                <div className="row mb-3 g-2 mt-3">
                  <div className="col-md-6">
                    <input
                      type="text"
                      name="Student_CNIC"
                      className="form-control"
                      value={student.Student_CNIC || ""}
                      readOnly
                    />
                  </div>
                  <div className="col-md-6">
                    <input
                      type="text"
                      name="Father_CNIC_No"
                      className="form-control"
                      value={student.Father_CNIC_No || ""}
                      readOnly
                    />
                  </div>
                </div>

                <div className="mb-3 mt-3">
                  <input
                    type="email"
                    name="Student_Email"
                    className="form-control"
                    value={student.Student_Email || ""}
                    onChange={handleChange}
                    readOnly
                  />
                </div>

                <div className="mb-3 mt-3">
                  <input
                    type="text"
                    name="Address"
                    className="form-control"
                    value={student.Address || ""}
                    onChange={handleChange}
                    readOnly
                  />
                </div>

                <div className="mb-3 mt-3">
                  <input
                    type="tel"
                    name="Student_Phone_No"
                    className="form-control"
                    value={student.Student_Phone_No || ""}
                    onChange={handleChange}
                    readOnly
                  />
                </div>






              </form>
            </div>
          </div>
        </div>

        {/* Academic Details */}
        <div className="col-12 mt-4 mb-4">
          <div className="card">
            <h5 className="text-center mt-2 bg-dark text-white py-2 px-2 mx-auto rounded shadow-lg" style={{ maxWidth: "400px" }}>
              Academic Details
            </h5>
            <table className="table mt-3">
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
    </div>
  );
};

export default Profile;
