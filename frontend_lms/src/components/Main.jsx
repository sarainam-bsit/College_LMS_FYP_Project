import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Home from './Home';
import About from './About';
import Registration from './Registration';
import Contactus from './Contactus';
import Login from './Login';
import Profile from './Profile';
import BSprogram from './BSprogram';
import CourseCategories from './CourseCategories';
import Categorypage from './Categorypage';
import ITsemester1timetable from './ITsemesters/ITsemester1timetable';
import ITsemester1courses from './ITsemesters/ITsemester1courses';
import ITsemester1AQ from './ITsemesters/ITsemester1AQ';
import ITsemester1grades from './ITsemesters/ITsemester1grades';
import ITsemester1lectures from './ITsemesters/ITsemester1lectures';
import Library from './Library/Library';
import Libraryform from './Library/Libraryform';
import Feedbackform from './Feedbackform';
import Librarycard from './Library/Librarycard';
import Hostel from './Hostel/Hostel';
import Singlerooms from './Hostel/Singlerooms';
import Doublerooms from './Hostel/Doublerooms';
import Dormitoryrooms from './Hostel/Dormitoryrooms';
import HostelAdmissionForm from './Hostel/HostelAdmissionForm';
import Hostelcancelform from './Hostel/Hostelcancelform';
import Feevoucher from './FeeVoucher/Feevoucher';
import Challanform from './FeeVoucher/Challanform';
import TeacherDashboard from './Teacher/TeacherDashboard';
import UploadLectures from './Teacher/UploadLectures';
import UploadGrades from './Teacher/UploadGrades';
import OTPverification from './OTPverification';
import ForgetPassword from './ForgetPassword';
import ResetPassword from './Resetpassword';
import Navbar from './Navbar';
import TeacherNavbar from './Teacher/TeacherNavbar';
import CourseCategoriesAdmin from "./Admin/CourseCategoriesAdmin";
import DepartmentAdmin from './Admin/DepartmentAdmin';



// ProtectedRoute component
function ProtectedRoute({ children }) {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  return isLoggedIn ? children : <Navigate to="/login" />;
}

// Registration Protected Route (only if allowed)
function RegistrationRoute({ children }) {
  const location = useLocation();
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const fromLogin = location.state?.fromLogin || false;

  if (isLoggedIn) {
    return <Navigate to="/home" replace />;
  }

  return fromLogin ? children : <Navigate to="/login" replace />;
}

const Main = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => localStorage.getItem("isLoggedIn") === "true");
const [userRole, setUserRole] = useState(() => localStorage.getItem("userRole"));
  

  useEffect(() => {
  const savedRole = localStorage.getItem('userRole');
  if (savedRole) {
    setUserRole(savedRole);
  }
  const loggedIn = localStorage.getItem('isLoggedIn');
  setIsLoggedIn(loggedIn === 'true');
}, []);
  


    const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userRole");
    setIsLoggedIn(false);
    setUserRole(null);
  };
  

  return (
    <>
    {/* Show Navbar only when logged in */}
      {isLoggedIn && (
  userRole === 'student' ? (
    <Navbar isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
  ) : (
    <TeacherNavbar isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
  )
)}

    {/* <Navbar setIsLoggedIn={setIsLoggedIn} /> */}
{/*     */}
    <Routes>
     
      {/* Login & Reset */}
      <Route path="/login" element={isLoggedIn ? <Navigate to="/" /> : <Login setIsLoggedIn={setIsLoggedIn} />} />
      <Route path="/reset" element={<ForgetPassword />} />
      <Route path="/reset_password" element={<ResetPassword />} />

      {/* Registration only if navigated from login */}
      <Route path="/registration" element={<RegistrationRoute><Registration setIsLoggedIn={setIsLoggedIn} /></RegistrationRoute>} />
      <Route path="/reset" element={<ForgetPassword />} />

      {/* All Protected Pages */}
      <Route path="/" element={<ProtectedRoute><Home  /></ProtectedRoute>} />
      <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
      <Route path="/about" element={<ProtectedRoute><About /></ProtectedRoute>} />
      <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
      <Route path="/feevoucher" element={<ProtectedRoute><Feevoucher /></ProtectedRoute>} />
      <Route path="/contact" element={<ProtectedRoute><Contactus /></ProtectedRoute>} />
      <Route path="/programs" element={<ProtectedRoute><BSprogram /></ProtectedRoute>} />
      <Route path="/categories/:deptId" element={<ProtectedRoute><CourseCategories /></ProtectedRoute>} />
      <Route path="/Categorypage/:categoryName" element={<ProtectedRoute><Categorypage /></ProtectedRoute>} />
      <Route path="/ITsemester1timetable" element={<ProtectedRoute><ITsemester1timetable /></ProtectedRoute>} />
      <Route path="/ITsemester1courses" element={<ProtectedRoute><ITsemester1courses /></ProtectedRoute>} />
      <Route path="/ITsemester1AQ" element={<ProtectedRoute><ITsemester1AQ /></ProtectedRoute>} />
      <Route path="/ITsemester1grades" element={<ProtectedRoute><ITsemester1grades /></ProtectedRoute>} />
      <Route path="/ITsemester1lectures" element={<ProtectedRoute><ITsemester1lectures /></ProtectedRoute>} />
      <Route path="/library" element={<ProtectedRoute><Library /></ProtectedRoute>} />
      <Route path="/libraryform" element={<ProtectedRoute><Libraryform /></ProtectedRoute>} />
      <Route path="/librarycard" element={<ProtectedRoute><Librarycard /></ProtectedRoute>} />
      <Route path="/feedbackform" element={<ProtectedRoute><Feedbackform /></ProtectedRoute>} />
      <Route path="/hostel" element={<ProtectedRoute><Hostel /></ProtectedRoute>} />
      <Route path="/singlerooms" element={<ProtectedRoute><Singlerooms /></ProtectedRoute>} />
      <Route path="/doublerooms" element={<ProtectedRoute><Doublerooms /></ProtectedRoute>} />
      <Route path="/dormitoryrooms" element={<ProtectedRoute><Dormitoryrooms /></ProtectedRoute>} />
      <Route path="/hosteladmissionform" element={<ProtectedRoute><HostelAdmissionForm /></ProtectedRoute>} />
      <Route path="/hostelcancelform" element={<ProtectedRoute><Hostelcancelform /></ProtectedRoute>} />
      <Route path="/challanform" element={<ProtectedRoute><Challanform /></ProtectedRoute>} />
      <Route path="/TeacherDashboard" element={<ProtectedRoute><TeacherDashboard /></ProtectedRoute>} />
      <Route path="/uploadlectures" element={<ProtectedRoute><UploadLectures /></ProtectedRoute>} />
      <Route path="/uploadgrades" element={<ProtectedRoute><UploadGrades /></ProtectedRoute>} />
      <Route path='/OTPverification' element={<ProtectedRoute><OTPverification /></ProtectedRoute>} />
      <Route path="/admin/departments" element={<DepartmentAdmin />} />
      <Route path="/admin/course-categories" element={<CourseCategoriesAdmin />} />
      
    </Routes>
    </>
  );
};

export default Main;
