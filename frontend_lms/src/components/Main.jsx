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

import Lectures from './Lectures';
import Library from './Library/Library';
import Libraryform from './Library/Libraryform';
import Feedbackform from './Feedbackform';
import Librarycard from './Library/Librarycard';
import Hostel from './Hostel/Hostel';
import RoomDetail from './Hostel/RoomDetail';
import Doublerooms from './Hostel/Doublerooms';
import Dormitoryrooms from './Hostel/Dormitoryrooms';
import HostelAdmissionForm from './Hostel/HostelAdmissionForm';
import Hostelcancelform from './Hostel/Hostelcancelform';
import Feevoucher from './FeeVoucher/Feevoucher';
import Challanform from './FeeVoucher/Challanform';
import TeacherDashboard from './Teacher/TeacherDashboard';
import UploadLectures from './Teacher/UploadLectures';
import UploadGrades from './Teacher/UploadGrades';
import UploadTasks from './Teacher/UploadTasks';
import StudentCourses from './StudentCourses';
import StudentTasks from './StudentTasks';
import OTPverification from './OTPverification';
import ForgetPassword from './ForgetPassword';
import ResetPassword from './Resetpassword';
import Navbar from './Navbar';
import CourseCategoriesAdmin from "./Admin/CourseCategoriesAdmin";
import DepartmentAdmin from './Admin/DepartmentAdmin';
import CoursesAdmin from './Admin/CoursesAdmin';
import AdminTimetable from './Admin/AdminTimeTable';
import StudentTimetable from './StudentTimetable';
import TeacherDepartment from './Teacher/TeacherDepartment';
import TeacherCategory from './Teacher/TeacherCategory';
import TeacherCategoryDetails from './Teacher/TeacherCategoryDetails';
import TeacherTimetable from './Teacher/TeacherTimetable';
import TeacherCourses from './Teacher/TeacherCourses';
import TeacherLecture from './Teacher/TeacherLectures';
import TeacherTaskDetail from './Teacher/TeacherTaskDetail';
import TeacherTasks from './Teacher/TeacherTasks';
import TeacherGradesStudent from './Teacher/TeacherGradesStudent';
import TeacherGradesStuDetail from './Teacher/TeacherGradesStuDetail';
import UploadStudentGrades from './Teacher/UploadStudentGrades';
import StudentGrades from './StudentGrades';
import AdminFeeVoucher from './Admin/AdminFeeVoucher';
import AdminLibraryApplications from './Admin/AdminLibraryApplications';
import AdminHostelDetail from './Admin/AdminHostelDetail';
import AdminRoomDetail from './Admin/AdminRoomDetail';
import AdminHostelApplications from './Admin/AdminHostelApplication';
import LibraryFeeVoucherPage from './Admin/LibraryFeeVoucherPage';
import HostelFeeVoucher from './Admin/HostelFeeVoucher';
import CancelHostelApplication from './Admin/CancelHostelApplication';
import AdminNotifications from './Admin/AdminNotification';
import StudentNotifications from './StudentNoifications';

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
    if (savedRole) setUserRole(savedRole);

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
      {/* Navbar */}
      {isLoggedIn && (
        <Navbar isLoggedIn={isLoggedIn} handleLogout={handleLogout} role={userRole} />
      )}

      {/* Routes */}
      <Routes>
        {/* Login & Reset */}
        <Route
  path="/login"
  element={
    isLoggedIn ? (
      <Navigate to="/" />
    ) : (
      <Login setIsLoggedIn={setIsLoggedIn} setUserRole={setUserRole} />
    )
  }
/>
        <Route path="/reset" element={<ForgetPassword />} />
        <Route path="/reset_password" element={<ResetPassword />} />

        {/* Registration */}
<Route
  path="/registration"
  element={
    <RegistrationRoute>
      <Registration setIsLoggedIn={setIsLoggedIn} setUserRole={setUserRole} />
    </RegistrationRoute>
  }
/>
        {/* Protected Pages */}
        <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/about" element={<ProtectedRoute><About /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/feevoucher" element={<ProtectedRoute><Feevoucher /></ProtectedRoute>} />
        <Route path="/contact" element={<ProtectedRoute><Contactus /></ProtectedRoute>} />
        <Route path="/programs" element={<ProtectedRoute><BSprogram /></ProtectedRoute>} />
        <Route path="/teacher/programs" element={<ProtectedRoute><TeacherDepartment /></ProtectedRoute>} />
        <Route path="/teacher/teacherlecture/:courseId" element={<ProtectedRoute><TeacherLecture /></ProtectedRoute>} />
        <Route path="/teacher/department/:deptId/categories" element={<ProtectedRoute><TeacherCategory /></ProtectedRoute>} />
        <Route path="/teacher/department/:departmentId/category/:categoryId" element={<ProtectedRoute><TeacherCategoryDetails /></ProtectedRoute>} />
        <Route path="/teacher/department/:departmentId/category/:categoryId/timetable" element={<ProtectedRoute><TeacherTimetable /></ProtectedRoute>} />
        <Route path="/teacher/department/:departmentId/category/:categoryId/courses" element={<ProtectedRoute><TeacherCourses /></ProtectedRoute>} />
        <Route path="/teacher/department/:departmentId/category/:categoryId/TaskDetail" element={<ProtectedRoute><TeacherTaskDetail /></ProtectedRoute>} />
        <Route path="/teacher/teachertask/:courseId" element={<ProtectedRoute><TeacherTasks /></ProtectedRoute>} />
        <Route path="/categories/:deptId" element={<ProtectedRoute><CourseCategories /></ProtectedRoute>} />
        <Route path="/teacher/department/:departmentId/category/:categoryId/gradeStudents" element={<ProtectedRoute><TeacherGradesStudent /></ProtectedRoute>} />
        <Route path="/department/:departmentId/category/:categoryId" element={<ProtectedRoute><Categorypage /></ProtectedRoute>} />
        <Route path="/department/:departmentId/category/:categoryId/timetable" element={<ProtectedRoute><StudentTimetable /></ProtectedRoute>} />
        <Route path="/department/:departmentId/category/:categoryId/courses" element={<ProtectedRoute><StudentCourses /></ProtectedRoute>} />
        <Route path="/department/:departmentId/category/:categoryId/tasks" element={<ProtectedRoute><StudentTasks /></ProtectedRoute>} />

        <Route path="/teacher/coursestudents/:courseId" element={<ProtectedRoute><TeacherGradesStuDetail /></ProtectedRoute>} />
        <Route path="/teacher/uploadstudentgrades" element={<ProtectedRoute><UploadStudentGrades /></ProtectedRoute>} />
        <Route path="/feevoucher" element={<ProtectedRoute><Feevoucher /></ProtectedRoute>} />
        <Route path="/course/:courseId/lectures" element={<ProtectedRoute><Lectures /></ProtectedRoute>} />
        <Route path="/library" element={<ProtectedRoute><Library /></ProtectedRoute>} />
        <Route path="/libraryform" element={<ProtectedRoute><Libraryform /></ProtectedRoute>} />
        <Route path="/librarycard" element={<ProtectedRoute><Librarycard /></ProtectedRoute>} />
        <Route path="/feedbackform" element={<ProtectedRoute><Feedbackform /></ProtectedRoute>} />
<Route path="/notifications" element={<ProtectedRoute><StudentNotifications /></ProtectedRoute>} />
        <Route path="/studentgrades" element={<ProtectedRoute><StudentGrades /></ProtectedRoute>} />
        <Route path="/hostel" element={<ProtectedRoute><Hostel /></ProtectedRoute>} />
        <Route path="/hostel/roomdetail/:id" element={<ProtectedRoute><RoomDetail /></ProtectedRoute>} />
        <Route path="/doublerooms" element={<ProtectedRoute><Doublerooms /></ProtectedRoute>} />
        <Route path="/dormitoryrooms" element={<ProtectedRoute><Dormitoryrooms /></ProtectedRoute>} />
        <Route path="/hosteladmissionform" element={<ProtectedRoute><HostelAdmissionForm /></ProtectedRoute>} />
        <Route path="/hostelcancelform" element={<ProtectedRoute><Hostelcancelform /></ProtectedRoute>} />
        <Route path="/challan-form/:id" element={<ProtectedRoute><Challanform /></ProtectedRoute>} />
        <Route path="/TeacherDashboard" element={<ProtectedRoute><TeacherDashboard /></ProtectedRoute>} />
        <Route path="/uploadlectures" element={<ProtectedRoute><UploadLectures /></ProtectedRoute>} />
        <Route path="/uploadTasks" element={<ProtectedRoute><UploadTasks /></ProtectedRoute>} />
        <Route path="/uploadgrades" element={<ProtectedRoute><UploadGrades /></ProtectedRoute>} />
        <Route path='/OTPverification' element={<ProtectedRoute><OTPverification /></ProtectedRoute>} />

        {/* Admin */}
        <Route path="/admin/departments" element={<DepartmentAdmin />} />
        <Route path="/admin/course-categories" element={<CourseCategoriesAdmin />} />
        <Route path="/admin/courses" element={<CoursesAdmin />} />
        <Route path="/admin/timetable" element={<AdminTimetable />} />
        <Route path="/admin/feevoucher" element={<AdminFeeVoucher />} />
        <Route path="/admin/libraryapplications" element={<AdminLibraryApplications />} />
        <Route path="/admin/hosteldetail" element={<AdminHostelDetail />} />
        <Route path="/admin/roomdetail" element={<AdminRoomDetail />} />
        <Route path="/admin/hostelapplication" element={<AdminHostelApplications />} />
        <Route path="/admin/libraryfeevoucher" element={<LibraryFeeVoucherPage />} />
        <Route path="/admin/hostelfeevoucher" element={<HostelFeeVoucher />} />
        <Route path="/admin/cancelhostelapplication" element={<CancelHostelApplication />} />
       <Route path="/admin/notifications" element={<AdminNotifications />} />
      </Routes>
    </>
  );
};

export default Main;
