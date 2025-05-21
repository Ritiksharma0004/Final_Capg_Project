import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const [userRole, setUserRole] = useState('');
    const [courses, setCourses] = useState([]);
    const [enrolledCourses, setEnrolledCourses] = useState([]);
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

        setUserRole(storedUser.role);
        fetchCourses();
        if (storedUser.role.toLowerCase() === 'student') {
            fetchEnrolledCourses();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [navigate]);

    const fetchCourses = async () => {
        try {
            const response = await api.get('Courses');
            setCourses(response.data);
        } catch (err) {
            console.error('API error:', err);
            setError('Failed to load courses');
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


    //const handleEnroll = async (courseId) => {
    //    try {
    //        console.log("Enrolling userId:", userId, "courseId:", courseId);
    //        await api.post('/Enrollments', {
    //            userId: userId,
    //            courseId: courseId,
    //        });
    //        // Show success message or update UI
    //        // Fetch enrolled courses again
    //        fetchEnrolledCourses();
    //    } catch (err) {
    //        alert('Failed to enroll in course');
    //        console.error(err);
    //    }
    //};

    if (loading) return <p className="text-center mt-5">Loading dashboard...</p>;

    if (error) {
        return (
            <div className="d-flex justify-content-center align-items-center vh-100">
                <div
                    className="text-center p-4 border rounded shadow"
                    style={{ background: '#fff', maxWidth: '400px' }}
                >
                    <h4 className="text-danger mb-3">Error</h4>
                    <p>{error}</p>
                </div>
            </div>
        );
    }

    const roleLower = userRole.toLowerCase();

    // Filter courses to show available ones (not enrolled)
    const enrolledCourseIds = enrolledCourses.map(ec => ec.courseId);
    const availableCourses = courses.filter(course => !enrolledCourseIds.includes(course.courseId));
    return (
        <div className="container mt-5">
            {roleLower === 'instructor' && (
                <>
                    {/* Header */}
                    <div
                        className="d-flex justify-content-between align-items-center mb-5 p-4 rounded shadow-sm"
                        style={{
                            background: 'linear-gradient(to right, #f8f9fa, #e9ecef)',
                            border: '1px solid #dee2e6',
                        }}
                    >
                        <h3 className="fw-bold mb-0 text-dark">Instructor Dashboard</h3>
                        <button
                            className="btn btn-dark fw-semibold px-4 py-2"
                            onClick={() => navigate('/upload-course')}
                            style={{ borderRadius: '10px' }}
                        >
                            Upload New Course
                        </button>
                    </div>

                    {/* Course Cards */}
                    <div className="row">
                        {courses.length > 0 ? (
                            courses.map((course) => (
                                <div key={course.courseId} className="col-md-4 mb-4">
                                    <div
                                        className="card h-100 shadow-sm border-0"
                                        style={{
                                            borderRadius: '16px',
                                            backgroundColor: '#ffffff',
                                        }}
                                    >
                                        <div className="card-body d-flex flex-column">
                                            <h5 className="fw-bold text-dark">{course.title}</h5>
                                            <p className="text-muted small">{course.description}</p>
                                            <div className="mt-auto d-flex justify-content-between gap-2">
                                                <button
                                                    className="btn btn-outline-dark"
                                                    onClick={() => navigate(`/courses/${course.courseId}`)}
                                                >
                                                    View Course
                                                </button>
                                                <button
                                                    className="btn btn-dark"
                                                    onClick={() => navigate(`/courses/${course.courseId}/add-assessment`)}
                                                >
                                                    Add Assessment
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="col-12 text-center text-muted">
                                No courses uploaded yet.
                            </div>
                        )}
                    </div>
                </>
            )}
   


        

            {roleLower === 'student' && (
                <>
                    {/* My Courses */}
                    {/* My Courses Section */}
                    {/* My Courses Section */}
                    {enrolledCourses.length > 0 && (
                        <>
                            <h2 className="section-heading my-courses-heading">📚 My Courses</h2><br />
                            <div className="row mb-5">
                                {enrolledCourses.map(course => (
                                    <div key={course.courseId} className="col-md-4 mb-4">
                                        <div className="glass-card">
                                            <div className="card-body d-flex flex-column text-dark">
                                                <h5 className="fw-semibold">{course.title}</h5>
                                                <p className="text-muted">{course.description}</p>
                                                <button
                                                    className="btn btn-outline-dark mt-auto"
                                                    onClick={() => navigate(`/my-course/${course.courseId}`)}
                                                >
                                                    View Course
                                                </button>

                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}


                    {/* Available Courses */}
                    {/* Available Courses Section */}
                    <h2 className="section-heading available-courses-heading">🧠 Available Courses</h2>  <br></br>
                    <div className="row">
                        {availableCourses.length > 0 ? (
                            availableCourses.map(course => (
                                <div key={course.courseId} className="col-md-4 mb-4">
                                    <div className="glass-card">
                                        <div className="card-body d-flex flex-column text-dark">
                                            <h5 className="fw-semibold">{course.title}</h5>
                                            <p className="text-muted">{course.description}</p>
                                            <button
                                                className="btn btn-dark mt-auto"
                                                onClick={() => navigate(`/courses/${course.courseId}`)}
                                            >
                                                View Course
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-muted">No courses available to enroll.</p>
                        )}
                    </div>
                </>
            )}
        </div>
    );

};

export default Dashboard;
   
