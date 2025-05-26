/* eslint-disable react/jsx-no-undef */
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';  // path as per your structure
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import UploadCourse from './pages/UploadCourse';
import Courses from './pages/Courses';
import CourseDetails from './pages/CourseDetails'
import MyCourse from './pages/MyCourse';
import AddAssessment from './pages/AddAssessment';
import TakeAssessment from './pages/TakeAssessment';
import ProfileSettings from './pages/ProfileSettings';



function App() {
    return (
        <Router>
            <Navbar />
            {/* Add padding top equal to navbar height */}
            <div style={{ paddingTop: '70px' }}>
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/courses" element={<Courses />} />
                    <Route path="/courses/:courseId" element={<CourseDetails />} />
                    <Route path="/upload-course" element={<UploadCourse />} />
                    <Route path="/my-course/:courseId" element={<MyCourse />} />
                    <Route path="/my-course/:courseId/take-assessment/:assessmentId" element={<TakeAssessment />} />
                    <Route path="/courses/:courseId/add-assessment" element={<AddAssessment />} />
                    <Route path="/profile-settings" element={<ProfileSettings />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;

