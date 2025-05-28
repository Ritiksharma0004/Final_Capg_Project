import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';
import '../../src/App.css'


const Dashboard = () => {
    const [userRole, setUserRole] = useState('');
    const [courses, setCourses] = useState([]);
    const [enrolledCourses, setEnrolledCourses] = useState([]);
    const [assessments, setAssessments] = useState([]); // store full assessments array
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const storedUser = JSON.parse(localStorage.getItem('user'));
    const userId = storedUser?.userId || null;

    useEffect(() => {
        if (!storedUser) {
            navigate('/login');
            return;
        }

        if (!storedUser.role) {
            setError('User role is missing. Please login again.');
            setLoading(false);
            return;
        }

        if (!userId) {
            setError('User ID missing. Cannot fetch data.');
            setLoading(false);
            return;
        }

        setUserRole(storedUser.role);
        fetchCourses();

        if (storedUser.role.toLowerCase() === 'student') {
            fetchEnrolledCourses();
            fetchAssessments();
        }
    }, [navigate]);

    const fetchCourses = async () => {
        try {
            const response = await api.get('Courses');
            setCourses(response.data);
        } catch (err) {
            setError('Failed to load courses');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const fetchEnrolledCourses = async () => {
        try {
            const res = await api.get(`/Enrollments/student/${userId}`);
            setEnrolledCourses(res.data);
        } catch (err) {
            console.error('Failed to load enrolled courses:', err);
        }
    };

    const fetchAssessments = async () => {
        try {
            const res = await api.get(`/Assessments`); // Fetch full assessments list
            setAssessments(res.data); // Expecting array of assessments
        } catch (err) {
            console.error('Failed to load assessments:', err);
            setAssessments([]);
        }
    };

    if (loading) return <p className="loading-text">Loading dashboard...</p>;

    if (error) {
        return (
            <div className="error-container">
                <h4>Error</h4>
                <p>{error}</p>
            </div>
        );
    }

    const roleLower = userRole.toLowerCase();
    const enrolledCourseIds = enrolledCourses.map((ec) => ec.courseId);
    const availableCourses = courses.filter(
        (course) => !enrolledCourseIds.includes(course.courseId)
    );

    const maxAssessmentsPerCourse = 5;
    const totalPossibleAssessments = enrolledCourses.length * maxAssessmentsPerCourse;
    const progressPercent =
        totalPossibleAssessments === 0
            ? 0
            : Math.min(100, Math.round((assessments.length / totalPossibleAssessments) * 100));

    const getImageForCourse = (course) =>
        'https://cdn-icons-png.flaticon.com/512/3135/3135755.png';

    return (
        <>
            {/* Google Fonts */}
            <link
                href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap"
                rel="stylesheet"
            />

            <div className="dashboard-container">
                {roleLower === 'student' && (
                    <>
                        <div className="stats-cards">
                            <div className="card enrolled">
                                <h3>Enrolled Courses</h3>
                                <p className="number">{enrolledCourses.length}</p>
                            </div>

                            <div className="card assessments">
                                <h3>Total Assessments</h3>
                                <p className="number">{assessments.length}</p>
                            </div>

                            <div className="card progress">
                                <h3>Progress</h3>
                                <p className="number">{progressPercent}%</p>
                                <div className="progress-bar">
                                    <div
                                        className="progress-fill"
                                        style={{ width: `${progressPercent}%` }}
                                    />
                                </div>
                            </div>
                        </div>

                        <section className="courses-section">
                            <h2>My Courses</h2>
                            {enrolledCourses.length === 0 ? (
                                <p className="empty-msg">You have not enrolled in any courses yet.</p>
                            ) : (
                                <div className="course-grid">
                                    {enrolledCourses.map((course) => (
                                        <div
                                            key={course.courseId}
                                            className="course-card"
                                            onClick={() => navigate(`/my-course/${course.courseId}`)}
                                        >
                                            <img
                                                src={getImageForCourse(course)}
                                                alt={course.title}
                                                className="course-img"
                                            />
                                            <h4>{course.title}</h4>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </section>

                        {/* <-- Add the View Results button here --> */}
                        <section className="results-section mt-4 text-center">
                            <Link to="/assessment-result" className="btn btn-dark px-4 py-2">
                                View My Assessment Results
                            </Link>
                        </section>

                        <section className="courses-section available">
                            <h2>Available Courses</h2>
                            {availableCourses.length === 0 ? (
                                <p className="empty-msg">No courses available to enroll.</p>
                            ) : (
                                <div className="course-grid">
                                    {availableCourses.map((course) => (
                                        <div
                                            key={course.courseId}
                                            className="course-card"
                                            onClick={() => navigate(`/courses/${course.courseId}`)}
                                        >
                                            <img
                                                src={getImageForCourse(course)}
                                                alt={course.title}
                                                className="course-img"
                                            />
                                            <h4>{course.title}</h4>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </section>
                    </>
                )}
                {/* Instructor part unchanged */}
                {roleLower === 'instructor' && (
                    <section className="instructor-dashboard">
                        {/* ... rest of instructor JSX ... */}
                    </section>
                )}
            </div>
        </>

    );
};

export default Dashboard;





