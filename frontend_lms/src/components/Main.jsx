import React, { useState } from 'react';
import { Routes, Route, Navigate} from 'react-router-dom';
import Home from './Home';
import About from './About';
import Registration from './Registration';
import Contactus from './Contactus';
import Login from './Login';
import Resetpassword from './Resetpassword';
import Profile from './Profile';
import BSprogram from './BSprogram';
import SemesterIT from './ITsemesters/SemesterIT';
import Semester1IT from './ITsemesters/Semester1IT';
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

const Main = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <Routes>
      <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
      <Route path="/reset" element={<Resetpassword />} />
      <Route path="/registration" element={<Registration />} />
      <Route path="/" element={isLoggedIn ? <Home /> : <Navigate to="/login" />} />
      <Route path="/home" element={isLoggedIn ? <Home /> : <Navigate to="/login" />} />
      <Route path="/about" element={isLoggedIn ? <About /> : <Navigate to="/login" />} />
      <Route path="/profile" element= {<Profile /> }/>
      <Route path="/feevoucher" element={isLoggedIn ? <Feevoucher /> : <Navigate to="/login" />} />
      <Route path="/contact" element={isLoggedIn ? <Contactus /> : <Navigate to="/login" />} />
      <Route path="/programs" element={isLoggedIn ? <BSprogram /> : <Navigate to="/login" />} />
      <Route path="/semesterIT" element={isLoggedIn ? <SemesterIT /> : <Navigate to="/login" />} />
      <Route path="/semester1IT" element={isLoggedIn ? <Semester1IT /> : <Navigate to="/login" />} />
      <Route path="/ITsemester1timetable" element={isLoggedIn ? <ITsemester1timetable /> : <Navigate to="/login" />} />
      <Route path="/ITsemester1courses" element={isLoggedIn ? <ITsemester1courses /> : <Navigate to="/login" />} />
      <Route path="/ITsemester1AQ" element={isLoggedIn ? <ITsemester1AQ /> : <Navigate to="/login" />} />
      <Route path="/ITsemester1grades" element={isLoggedIn ? <ITsemester1grades /> : <Navigate to="/login" />} />
      <Route path="/ITsemester1lectures" element={isLoggedIn ? <ITsemester1lectures /> : <Navigate to="/login" />} />
      <Route path="/library" element={isLoggedIn ? <Library /> : <Navigate to="/login" />} />
      <Route path="/libraryform" element={isLoggedIn ? <Libraryform /> : <Navigate to="/login" />} />
      <Route path="/librarycard" element={isLoggedIn ? <Librarycard /> : <Navigate to="/login" />} />
      <Route path="/feedbackform" element={isLoggedIn ? <Feedbackform /> : <Navigate to="/login" />} />
      <Route path="/hostel" element={isLoggedIn ? <Hostel /> : <Navigate to="/login" />} />
      <Route path="/singlerooms" element={isLoggedIn ? <Singlerooms /> : <Navigate to="/login" />} />
      <Route path="/doublerooms" element={isLoggedIn ? <Doublerooms /> : <Navigate to="/login" />} />
      <Route path="/dormitoryrooms" element={isLoggedIn ? <Dormitoryrooms /> : <Navigate to="/login" />}/>
      <Route path="/hosteladmissionform" element={isLoggedIn ? <HostelAdmissionForm /> : <Navigate to="/login" />} />
      <Route path="/hostelcancelform" element={isLoggedIn ? <Hostelcancelform /> : <Navigate to="/login" />} />
      <Route path="/challanform" element={isLoggedIn ? <Challanform /> : <Navigate to="/login" />} />
      <Route path="/TeacherDashboard" element={isLoggedIn ? <TeacherDashboard /> : <Navigate to="/login" />} />
      <Route path="/uploadlectures" element={isLoggedIn ? <UploadLectures /> : <Navigate to="/login" />} />
      <Route path="/uploadgrades" element={isLoggedIn ? <UploadGrades /> : <Navigate to="/login" />} />
      <Route path='/OTPverification' element = {<OTPverification/>}/>
      
    </Routes>
  );
};

export default Main;
