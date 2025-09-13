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
import HostelAdmissionForm from './Hostel/HostelAdmissionForm';
import Hostelcancelform from './Hostel/Hostelcancelform';
import Feevoucher from './FeeVoucher/Feevoucher';
import Challanform from './FeeVoucher/Challanform';
import TeacherDashboard from './Teacher/TeacherDashboard';
import UploadLectures from './Teacher/UploadLectures';
import UploadTasks from './Teacher/UploadTasks';
import StudentCourses from './StudentCourses';
import StudentTasks from './StudentTasks';
import ForgetPassword from './ForgetPassword';
import ResetPassword from './Resetpassword';
import Navbar from './Navbar';
import AdminNavbar from './Admin/AdminNavbar';
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
import TeacherNotifications from './Teacher/TeacherNotifications';
import TeacherSendNotification from './Teacher/TeacherSendNotification';
import AdminContact from './Admin/AdminContact';
import TeacherContact from './Teacher/TeacherContact';
import AdminFeedback from './Admin/AdminFeedback';
import AdminHome from './Admin/AdminHome';
import AdminLogin from './Admin/AdminLogin';
import TeacherNavbar from './Teacher/TeacherNavbar';
import { useNavigate } from 'react-router-dom';
import PublicRoute from './PublicRoute';
import TeacherProfile from './Teacher/TeacherProfile';
import Staff from './Staff';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminForgetPassword from './Admin/AdminForgetPassword';
import AdminResetPassword from './Admin/AdminResetPassword';
import AdminDateSheet from './Admin/AdminDateSheet';
import StudentDateSheet from './StudentDateSheet';
import TeacherDateSheet from './Teacher/TeacherDateSheet';



function ProtectedRoute({ children, allowedRoles }) {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const userRole = localStorage.getItem("userRole");


  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  if (allowedRoles && !allowedRoles.includes(userRole)) {
    return <Navigate to="/login" />;
  }


  return children;
}


function AdminProtectedRoute({ children }) {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const userRole = localStorage.getItem("userRole");

  if (!isLoggedIn || userRole !== "admin") {
    return <Navigate to="/adminlogin" replace />;
  }

  return children;
}


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
  const navigate = useNavigate();
  const location = useLocation();
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

   
    if (location.pathname.includes("/admin")) {
      navigate("/adminlogin", { replace: true });
    } else {
      navigate("/login", { replace: true });
    }
  };
  useEffect(() => {
    
    document.title = "College LMS";

  }, [location]);


  return (

    <>
     
{(location.pathname === "/login" || location.pathname === "/adminlogin" || userRole === "admin") && (
  <AdminNavbar isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
)}

      
{(userRole === "student" || location.pathname === "/registration") && (
  <Navbar isLoggedIn={isLoggedIn} handleLogout={handleLogout} role={userRole} />
)}

      
      {userRole === "teacher" && isLoggedIn && (
        <TeacherNavbar isLoggedIn={isLoggedIn} handleLogout={handleLogout} role={userRole} />
      )}
      <Routes>
        
        <Route path="/login" element={
          <PublicRoute>
            <Login setIsLoggedIn={setIsLoggedIn} setUserRole={setUserRole} />
          </PublicRoute>
        } />
        <Route path="/adminlogin" element={
          <PublicRoute>
            <AdminLogin setIsLoggedIn={setIsLoggedIn} setUserRole={setUserRole} />
          </PublicRoute>
        } />
        <Route path="/reset" element={<ForgetPassword />} />
        <Route path="/reset_password" element={<ResetPassword />} />
        <Route path="/adminreset" element={<AdminForgetPassword />} />
        <Route path="/admin_reset_password" element={<AdminResetPassword />} />
        <Route path="/registration" element={<RegistrationRoute><Registration setIsLoggedIn={setIsLoggedIn} setUserRole={setUserRole} /></RegistrationRoute>} />

      
        <Route path="/" element={<ProtectedRoute allowedRoles={["student", "teacher"]}><Home /></ProtectedRoute>} />
        <Route path="/home" element={<ProtectedRoute allowedRoles={["student", "teacher"]}><Home /></ProtectedRoute>} />
        <Route path="/about" element={<ProtectedRoute allowedRoles={["student", "teacher", "admin"]}><About /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute allowedRoles={["student"]}><Profile /></ProtectedRoute>} />
        <Route path="/feevoucher" element={<ProtectedRoute allowedRoles={["student"]}><Feevoucher /></ProtectedRoute>} />
        <Route path="/contact" element={<ProtectedRoute allowedRoles={["student"]}><Contactus /></ProtectedRoute>} />
        <Route path="/programs" element={<ProtectedRoute allowedRoles={["student"]}><BSprogram /></ProtectedRoute>} />
        <Route path="/department/:departmentId/category/:categoryId" element={<ProtectedRoute allowedRoles={["student"]}><Categorypage /></ProtectedRoute>} />
        <Route path="/categories/:deptId" element={<ProtectedRoute allowedRoles={["student"]}><CourseCategories /></ProtectedRoute>} />
        <Route path="/hostel" element={<ProtectedRoute allowedRoles={["student"]}><Hostel /></ProtectedRoute>} />
        <Route path="/hostel/roomdetail/:id" element={<ProtectedRoute allowedRoles={["student"]}><RoomDetail /></ProtectedRoute>} />
        <Route path="/hosteladmissionform" element={<ProtectedRoute allowedRoles={["student"]}><HostelAdmissionForm /></ProtectedRoute>} />
        <Route path="/hostelcancelform" element={<ProtectedRoute allowedRoles={["student"]}><Hostelcancelform /></ProtectedRoute>} />
        <Route path="/challan-form/:id" element={<ProtectedRoute allowedRoles={["student"]}><Challanform /></ProtectedRoute>} />
        <Route path="/studentgrades" element={<ProtectedRoute allowedRoles={["student"]}><StudentGrades /></ProtectedRoute>} />
        <Route path="/notifications" element={<ProtectedRoute allowedRoles={["student"]}><StudentNotifications /></ProtectedRoute>} />
        <Route path="/library" element={<ProtectedRoute allowedRoles={["student"]}><Library /></ProtectedRoute>} />
        <Route path="/libraryform" element={<ProtectedRoute allowedRoles={["student"]}><Libraryform /></ProtectedRoute>} />
        <Route path="/librarycard" element={<ProtectedRoute allowedRoles={["student"]}><Librarycard /></ProtectedRoute>} />
        <Route path="/feedbackform" element={<ProtectedRoute allowedRoles={["student"]}><Feedbackform /></ProtectedRoute>} />
        <Route path="/course/:courseId/lectures" element={<ProtectedRoute allowedRoles={["student"]}><Lectures /></ProtectedRoute>} />
        <Route path="/department/:departmentId/category/:categoryId/courses" element={<ProtectedRoute allowedRoles={["student"]}><StudentCourses /></ProtectedRoute>} />
        <Route path="/department/:departmentId/category/:categoryId/tasks" element={<ProtectedRoute allowedRoles={["student"]}><StudentTasks /></ProtectedRoute>} />
        <Route path="/department/:departmentId/category/:categoryId/timetable" element={<ProtectedRoute allowedRoles={["student"]}><StudentTimetable /></ProtectedRoute>} />
        <Route path="/department/:departmentId/category/:categoryId/datesheet" element={<ProtectedRoute allowedRoles={["student"]}><StudentDateSheet /></ProtectedRoute>} />
        <Route path="/teacher/notifications" element={<ProtectedRoute allowedRoles={["teacher"]}><TeacherNotifications /></ProtectedRoute>} />
        <Route path="/teacher/sendnotification" element={<ProtectedRoute allowedRoles={["teacher"]}><TeacherSendNotification /></ProtectedRoute>} />
        <Route path="/teacher/contact" element={<ProtectedRoute allowedRoles={["teacher"]}><TeacherContact /></ProtectedRoute>} />
        <Route path="/teacherdashboard" element={<ProtectedRoute allowedRoles={["teacher"]}><TeacherDashboard /></ProtectedRoute>} />
        <Route path="/teacher/programs" element={<ProtectedRoute allowedRoles={["teacher"]}><TeacherDepartment /></ProtectedRoute>} />
        <Route path="/teacher/teacherlecture/:courseId" element={<ProtectedRoute allowedRoles={["teacher"]}><TeacherLecture /></ProtectedRoute>} />
        <Route path="/teacher/teachertask/:courseId" element={<ProtectedRoute allowedRoles={["teacher"]}><TeacherTasks /></ProtectedRoute>} />
        <Route path="/uploadlectures" element={<ProtectedRoute allowedRoles={["teacher"]}><UploadLectures /></ProtectedRoute>} />
        <Route path="/uploadTasks" element={<ProtectedRoute allowedRoles={["teacher"]}><UploadTasks /></ProtectedRoute>} />
        <Route path="/teacher/department/:departmentId/category/:categoryId/gradeStudents" element={<ProtectedRoute allowedRoles={["teacher"]}><TeacherGradesStudent /></ProtectedRoute>} />
        <Route path="/teacher/coursestudents/:courseId" element={<ProtectedRoute allowedRoles={["teacher"]}><TeacherGradesStuDetail /></ProtectedRoute>} />
        <Route path="/teacher/department/:deptId/categories" element={<ProtectedRoute allowedRoles={["teacher"]}><TeacherCategory /></ProtectedRoute>} />
        <Route path="/teacher/department/:departmentId/category/:categoryId" element={<ProtectedRoute allowedRoles={["teacher"]}><TeacherCategoryDetails /></ProtectedRoute>} />
        <Route path="/teacher/department/:departmentId/category/:categoryId/timetable" element={<ProtectedRoute allowedRoles={["teacher"]}><TeacherTimetable /></ProtectedRoute>} />
        <Route path="/teacher/department/:departmentId/category/:categoryId/datesheet" element={<ProtectedRoute allowedRoles={["teacher"]}><TeacherDateSheet /></ProtectedRoute>} />
        <Route path="/teacher/department/:departmentId/category/:categoryId/courses" element={<ProtectedRoute allowedRoles={["teacher"]}><TeacherCourses /></ProtectedRoute>} />
        <Route path="/teacher/department/:departmentId/category/:categoryId/TaskDetail" element={<ProtectedRoute allowedRoles={["teacher"]}><TeacherTaskDetail /></ProtectedRoute>} />
        <Route path="/teacher/uploadstudentgrades" element={<ProtectedRoute allowedRoles={["teacher"]}><UploadStudentGrades /></ProtectedRoute>} />
        <Route path="/teacherprofile" element={<ProtectedRoute allowedRoles={["teacher"]}><TeacherProfile /></ProtectedRoute>} />
        <Route path="/staff" element={<ProtectedRoute allowedRoles={["student","teacher", "admin"]}><Staff /></ProtectedRoute>} />

      
        <Route path="/adminhome" element={<AdminProtectedRoute><AdminHome /></AdminProtectedRoute>} />
        <Route path="/admin/departments" element={<AdminProtectedRoute><DepartmentAdmin /></AdminProtectedRoute>} />
        <Route path="/admin/course-categories" element={<AdminProtectedRoute><CourseCategoriesAdmin /></AdminProtectedRoute>} />
        <Route path="/admin/courses" element={<AdminProtectedRoute><CoursesAdmin /></AdminProtectedRoute>} />
        <Route path="/admin/feevoucher" element={<AdminProtectedRoute><AdminFeeVoucher /></AdminProtectedRoute>} />
        <Route path="/admin/libraryapplications" element={<AdminProtectedRoute><AdminLibraryApplications /></AdminProtectedRoute>} />
        <Route path="/admin/hosteldetail" element={<AdminProtectedRoute><AdminHostelDetail /></AdminProtectedRoute>} />
        <Route path="/admin/roomdetail" element={<AdminProtectedRoute><AdminRoomDetail /></AdminProtectedRoute>} />
        <Route path="/admin/hostelapplication" element={<AdminProtectedRoute><AdminHostelApplications /></AdminProtectedRoute>} />
        <Route path="/admin/libraryfeevoucher" element={<AdminProtectedRoute><LibraryFeeVoucherPage /></AdminProtectedRoute>} />
        <Route path="/admin/hostelfeevoucher" element={<AdminProtectedRoute><HostelFeeVoucher /></AdminProtectedRoute>} />
        <Route path="/admin/cancelhostelapplication" element={<AdminProtectedRoute><CancelHostelApplication /></AdminProtectedRoute>} />
        <Route path="/admin/notifications" element={<AdminProtectedRoute><AdminNotifications /></AdminProtectedRoute>} />
        <Route path="/admin/contact" element={<AdminProtectedRoute><AdminContact /></AdminProtectedRoute>} />
        <Route path="/admin/feedback" element={<AdminProtectedRoute><AdminFeedback /></AdminProtectedRoute>} />
        <Route path="/admin/timetable" element={<AdminProtectedRoute><AdminTimetable /></AdminProtectedRoute>} />
        <Route path="/admin/datesheet" element={<AdminProtectedRoute><AdminDateSheet /></AdminProtectedRoute>} />

      </Routes>
       
      <ToastContainer 
    position="top-center"
    autoClose={3000}
    hideProgressBar={false}
    newestOnTop
    closeOnClick
    pauseOnHover
  />
    </>
  );
};

export default Main;
