import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const Lectures = () => {
  const { courseId } = useParams();
  const [lectures, setLectures] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [selectedTitle, setSelectedTitle] = useState("");
  const videoRef = useRef(null);

  useEffect(() => {
    const fetchLectures = async () => {
      try {
        const res = await axios.get(
          `http://127.0.0.1:8000/Lecture/lectures/by_course/?course_id=${courseId}`
        );
        setLectures(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchLectures();
  }, [courseId]);

  const openModal = (lecture) => {
    setSelectedVideo(lecture.Video);
    setSelectedTitle(lecture.Title);
  };

  const closeModal = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <>
      
      <div
        className="container p-1 text-center"
        style={{ marginTop: "80px", minHeight: "90vh" }}
      >
        
        <h2
          className="mb-4 py-2 px-3 mx-auto rounded shadow-lg"
          style={{
            maxWidth: "350px",
            backgroundColor: "rgb(70, 4, 67)", 
            color: "white",
            fontWeight: "bold",
          }}
        >
          Lectures
        </h2>

        {/* Table */}
        <div className="table-responsive card shadow-lg mt-3">
          <table className="table table-bordered table-hover text-center align-middle mb-0">
            <thead>
              <tr>
                <th style={{ backgroundColor: "rgb(70, 4, 67)", color: "white" }}>
                  C. Code
                </th>
                <th style={{ backgroundColor: "rgb(70, 4, 67)", color: "white" }}>
                  C. Name
                </th>
                <th style={{ backgroundColor: "rgb(70, 4, 67)", color: "white" }}>
                  Title
                </th>
                <th style={{ backgroundColor: "rgb(70, 4, 67)", color: "white" }}>
                  Time
                </th>
                <th style={{ backgroundColor: "rgb(70, 4, 67)", color: "white" }}>
                  Date
                </th>
                <th style={{ backgroundColor: "rgb(70, 4, 67)", color: "white" }}>
                  Videos
                </th>
              </tr>
            </thead>
            <tbody>
              {lectures.length > 0 ? (
                lectures.map((lec) => (
                  <tr key={lec.id}>
                    <td>{lec.Lec_course_code}</td>
                    <td>{lec.Lec_course_name}</td>
                    <td>{lec.Title}</td>
                    <td>{lec.Time}</td>
                    <td>{lec.Date}</td>
                    <td>
                      {lec.Video ? (
                        <button
                          className="btn btn-sm"
                          style={{
                            backgroundColor: "rgb(2, 2, 40)",
                            color: "white",
                            fontWeight: "bold",
                          }}
                          data-bs-toggle="modal"
                          data-bs-target="#videoModal"
                          onClick={() => openModal(lec)}
                        >
                          <i className="fa-solid fa-play"></i>
                        </button>
                      ) : (
                        "No Video"
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="py-3">
                    No lectures found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        
        <div
          className="modal fade modal-xl"
          id="videoModal"
          tabIndex="-1"
          aria-labelledby="videoModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered modal-xl">
            <div className="modal-content shadow-lg">
              <div
                className="modal-header"
                style={{ backgroundColor: "rgb(70, 4, 67)", color: "white" }}
              >
                <h5 className="modal-title">{selectedTitle}</h5>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  data-bs-dismiss="modal"
                  onClick={closeModal}
                ></button>
              </div>
              <div className="modal-body bg-light">
                {selectedVideo ? (
                  <div className="ratio ratio-16x9">
                    <video
                      ref={videoRef}
                      controls
                      src={selectedVideo}
                      style={{ width: "100%" }}
                    />
                  </div>
                ) : (
                  <p>No video available</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Lectures;
