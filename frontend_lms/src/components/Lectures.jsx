import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from './Navbar';
import axios from 'axios';

const Lectures = () => {
  const { courseId } = useParams();
  const [lectures, setLectures] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [selectedTitle, setSelectedTitle] = useState('');
  const videoRef = useRef(null); // ✅ video element ka ref

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
      videoRef.current.currentTime = 0; // ✅ video reset
    }
  };

  return (
    <>
      <Navbar />
      <div
        className="container p-1"
        style={{ marginTop: '80px', minHeight: '90vh' }}
      >
        <h2 className="text-center mt-4">Lectures</h2>

        <div className="table-responsive">
          <table className="table mt-4">
            <thead>
              <tr>
                <th>C. Code</th>
                <th>C. Name</th>
                <th>Title</th>
                <th>Time</th>
                <th>Date</th>
                <th>Videos</th>
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
                          className="btn btn-sm btn-danger"
                          data-bs-toggle="modal"
                          data-bs-target="#videoModal"
                          onClick={() => openModal(lec)}
                        >
                          <i className="fa-solid fa-play"></i>
                        </button>
                      ) : (
                        'No Video'
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="text-center">
                    No lectures found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Video Modal */}
        <div
          className="modal fade modal-xl"
          id="videoModal"
          tabIndex="-1"
          aria-labelledby="videoModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{selectedTitle}</h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  onClick={closeModal} // ✅ close button click par stop
                ></button>
              </div>
              <div className="modal-body">
                {selectedVideo ? (
                  <div className="ratio ratio-16x9">
                    <video
                      ref={videoRef} // ✅ videoRef attach
                      controls
                      src={selectedVideo}
                      style={{ width: '100%' }}
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
