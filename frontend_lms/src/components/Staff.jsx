import React, { useEffect, useState } from "react";
import axios from "axios";

const Staff = () => {
    const [departments, setDepartments] = useState([]);
    const [teachersByDept, setTeachersByDept] = useState({});

    useEffect(() => {
        axios
            .get("http://127.0.0.1:8000/dept/dept_api/")
            .then((res) => {
                setDepartments(res.data);

                res.data.forEach((dept) => {
                    axios
                        .get(
                            `http://127.0.0.1:8000/Account/teachers/department/${dept.id}/`
                        )
                        .then((teacherRes) => {
                            setTeachersByDept((prev) => ({
                                ...prev,
                                [dept.id]: teacherRes.data,
                            }));
                        })
                        .catch((err) => console.error(err));
                });
            })
            .catch((err) => console.error(err));
    }, []);

    return (
        <div
            className="container"
            style={{
                marginTop: "5%",
                marginBottom: "5%",
                fontFamily: "Arial, sans-serif",
            }}
        >
            <div style={{ textAlign: "center", marginTop: '3%' }}>
                <h1 className="text-center mb-5" style={{
                    display: "inline-block",
                    backgroundColor: "rgb(70, 4, 67)",
                    color: "white",
                    padding: "10px 25px",
                    borderRadius: "5px",
                    fontSize: "30px",
                    fontWeight: "bold",
                    boxShadow: "0px 4px 8px rgba(0,0,0,0.2)",
                }}>
                    Meet Our Staff
                </h1>
            </div>

            {departments.map((dept) => (
                <div
                    key={dept.id}
                    className="p-4 mb-5 shadow"
                    style={{
                        background: "white",
                        borderRadius: "12px",
                    }}
                >
                    {/* Department Name in a Box */}
                    <div style={{ textAlign: "center", marginBottom: '4%' }}>
                        <div
                            style={{
                                display: "inline-block",
                                backgroundColor: "rgb(4, 4, 63)",
                                color: "white",
                                padding: "10px 25px",
                                borderRadius: "5px",
                                fontSize: "20px",
                                fontWeight: "bold",
                                boxShadow: "0px 4px 8px rgba(0,0,0,0.2)",
                            }}
                        >
                            {dept.Department_Name} - {dept.Discription}
                        </div>
                    </div>

                    <div className="table-responsive">
                        <table className="table table-bordered table-hover align-middle">
                            <thead style={{ backgroundColor: "#007bff", color: "white" }}>
                                <tr>
                                    <th style={{ textAlign: "center" }}>Image</th>
                                    <th>Name</th>
                                    <th>Department</th>
                                    <th>Qualification</th>
                                </tr>
                            </thead>
                            <tbody>
                                {teachersByDept[dept.id] &&
                                    teachersByDept[dept.id].length > 0 ? (
                                    teachersByDept[dept.id].map((teacher) => (
                                        <tr key={teacher.id}>
                                            <td style={{ textAlign: "center" }}>
                                                <img
                                                    src={`http://127.0.0.1:8000${teacher.Teacher_Image}`}
                                                    alt="Teacher"
                                                    width="70"
                                                    height="70"
                                                    style={{
                                                        borderRadius: "50%",
                                                        objectFit: "cover",
                                                        border: "3px solid #007bff",
                                                    }}
                                                />
                                            </td>
                                            <td
                                                style={{
                                                    fontWeight: "bold",
                                                    color: "#007bff",
                                                }}
                                            >
                                                {teacher.Teacher_Name}
                                            </td>
                                            <td>{teacher.Department_Name}</td>
                                            <td>{teacher.Qualification}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="4" className="text-center text-danger fw-bold">
                                            No teachers found
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Staff;