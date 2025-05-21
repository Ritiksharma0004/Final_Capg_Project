//import React, { useEffect, useState } from 'react';
//import { useParams } from 'react-router-dom';
//import axios from 'axios';
//import api from '../services/api';

//const CourseDetails = () => {
//    const { courseId } = useParams();
//    const [course, setCourse] = useState(null);
//    const [instructorName, setInstructorName] = useState('');
//    const [loading, setLoading] = useState(true);
//    const [error, setError] = useState('');
//    const [enrollSuccess, setEnrollSuccess] = useState('');
//    const [enrollError, setEnrollError] = useState('');


//    useEffect(() => {
//        const fetchCourse = async () => {
//            try {
//                const courseRes = await axios.get(`https://localhost:7180/api/Courses/${courseId}`);
//                const courseData = courseRes.data;
//                const id = courseRes.id
//                console.log(courseId)
//                setCourse(courseData);

//                if (courseData.instructorId) {
//                    const instructorRes = await axios.get(`https://localhost:7180/api/Users/${courseData.instructorId}`);
//                    setInstructorName(instructorRes.data.name || instructorRes.data.email || 'Instructor');
//                } else {
//                    setInstructorName('N/A');
//                }
//            } catch (err) {
//                console.error(err);
//                setError('Failed to load course details.');
//            } finally {
//                setLoading(false);
//            }
//        };

//        fetchCourse();
//    }, [courseId]);

//    const enrollInCourse = async () => {
//        try {
//            const storedUser = JSON.parse(localStorage.getItem('user'));
//            const userId = storedUser?.userId;

//            if (!userId || storedUser?.role !== 'student') {
//                alert('Please log in as a student to enroll.');
//                return;
//            }

//            // Fetch course data fresh before enrolling
//            const courseRes = await axios.get(`https://localhost:7180/api/Courses/${courseId}`);
//            const courseData = courseRes.data;
//            console.log(courseData); // just log courseData directly


//            console.log("User found: " + storedUser?.userId);


//            const payload = {
//                UserId: userId,
//                CourseId: courseId
//            };

//            console.log("id od course",courseId)

//            if (!courseData.id) {
//                alert('Course ID not found. Please try again.');
//                return;
//            }



//            console.log("Payload being sent:", payload); // Debug

//            const response = await api.post('/Enrollments', payload, {
//                headers: {
//                    'Content-Type': 'application/json'
//                }
//            });

//            setEnrollSuccess(response.data.message || `Successfully enrolled in "${course?.title}"`);


//            setEnrollSuccess(response.data.message || `Successfully enrolled in "${courseData?.title}"`);
//        } catch (error) {
//            console.error('Enrollment Error:', error);

//            // Check if the error is a 400 Bad Request with "already enrolled" message
//            if (error.response) {
//                if (error.response.status === 400) {
//                    const serverMsg = error.response.data;
//                    if (typeof serverMsg === 'string' && serverMsg.toLowerCase().includes('already enrolled')) {
//                        setEnrollError('You are already enrolled in this course.');
//                    } else if (serverMsg.message) {
//                        setEnrollError(serverMsg.message);
//                    } else {
//                        setEnrollError('Enrollment failed due to bad request.');
//                    }
//                } else {
//                    setEnrollError(`Enrollment failed: ${error.response.statusText}`);
//                }
//            } else {
//                setEnrollError('Enrollment failed. Please try again later.');
//            }
//        }
//    };


//    if (loading) {
//        return (
//            <div className="text-center mt-5">
//                <div className="spinner-border text-primary" role="status"></div>
//                <p className="mt-3">Loading course details...</p>
//            </div>
//        );
//    }

//    if (error || !course) {
//        return (
//            <div className="container mt-5 text-center text-danger">
//                <h4>{error || 'Course not found.'}</h4>
//            </div>
//        );
//    }

//    return (
//        <>
//            <style>{`
//                body, html, #root {
//                    height: 100%;
//                    margin: 0;
//                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
//                }
//                .background-texture {
//                    min-height: 100vh;
//                    padding: 3rem 1rem;
//                    background: linear-gradient(135deg, #e0f2f1 0%, #80cbc4 100%);
//                    background-image:
//                      linear-gradient(45deg, rgba(255,255,255,0.1) 25%, transparent 25%),
//                      linear-gradient(-45deg, rgba(255,255,255,0.1) 25%, transparent 25%),
//                      linear-gradient(45deg, transparent 75%, rgba(255,255,255,0.1) 75%),
//                      linear-gradient(-45deg, transparent 75%, rgba(255,255,255,0.1) 75%);
//                    background-size: 40px 40px;
//                    background-position: 0 0, 0 20px, 20px -20px, -20px 0px;
//                    display: flex;
//                    justify-content: center;
//                    align-items: center;
//                }
//                .course-card {
//                    max-width: 720px;
//                    width: 100%;
//                    background: #ffffffdd;
//                    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.12);
//                    border-radius: 16px;
//                    padding: 2.5rem 2rem;
//                    transition: box-shadow 0.3s ease;
//                }
//                .course-card:hover {
//                    box-shadow: 0 20px 45px rgba(0, 0, 0, 0.18);
//                }
//                h1.text-primary {
//                    color: #00796b;
//                }
//                p.text-muted {
//                    color: #4f6367;
//                }
//                button.btn-success {
//                    background-color: #00796b;
//                    border-color: #00796b;
//                    font-weight: 600;
//                    padding: 0.7rem 1.6rem;
//                }
//                button.btn-success:hover {
//                    background-color: #004d40;
//                    border-color: #004d40;
//                }
//                button.btn-success:disabled {
//                    background-color: #a7c1bb;
//                    border-color: #a7c1bb;
//                    cursor: not-allowed;
//                }
//                button.btn-outline-secondary {
//                    color: #4f6367;
//                    border-color: #4f6367;
//                }
//                button.btn-outline-secondary:hover {
//                    background-color: #4f6367;
//                    color: white;
//                }
//                .alert-success {
//                    background-color: #b2dfdb;
//                    border-color: #4db6ac;
//                    color: #004d40;
//                    font-weight: 600;
//                }
//            `}</style>

//            <div className="background-texture">
//                <div className="course-card">
//                    <div className="d-flex justify-content-between align-items-start flex-wrap">
//                        <div>
//                            <h1 className="text-primary">{course?.title}</h1>
//                            <p className="text-muted fs-5 mb-2">
//                                by <strong className="text-dark">{instructorName}</strong>
//                            </p>
//                        </div>
//                        <div>
//                            <button
//                                className="btn btn-success btn-lg"
//                                onClick={enrollInCourse}

//                            >
//                                Enroll Now
//                            </button>
//                        </div>
//                    </div>

//                    {enrollSuccess && (
//                        <div className="alert alert-success mt-3">{enrollSuccess}</div>
//                    )}

//                    <hr />

//                    <div className="mt-4">
//                        <h4 className="mb-3">About This Course</h4>
//                        <p className="fs-5" style={{ whiteSpace: 'pre-line' }}>{course?.description}</p>
//                    </div>

//                    <div className="mt-4 text-end">
//                        <button
//                            className="btn btn-outline-secondary"
//                            onClick={() => window.history.back()}
//                        >
//                            ← Back to Courses
//                        </button>
//                    </div>
//                </div>
//            </div>
//        </>
//    );
//};

//export default CourseDetails;



//import React, { useEffect, useState } from 'react';
//import { useParams } from 'react-router-dom';
//import axios from 'axios';
//import api from '../services/api';

//const CourseDetails = () => {
//    const { courseId } = useParams();
//    const [course, setCourse] = useState(null);
//    const [instructorName, setInstructorName] = useState('');
//    const [loading, setLoading] = useState(true);
//    const [error, setError] = useState('');
//    const [enrollSuccess, setEnrollSuccess] = useState('');
//    const [enrollError, setEnrollError] = useState(''); // <-- new error state

//    useEffect(() => {
//        const fetchCourse = async () => {
//            try {
//                const courseRes = await axios.get(`https://localhost:7180/api/Courses/${courseId}`);
//                const courseData = courseRes.data;
//                setCourse(courseData);

//                if (courseData.instructorId) {
//                    const instructorRes = await axios.get(`https://localhost:7180/api/Users/${courseData.instructorId}`);
//                    setInstructorName(instructorRes.data.name || instructorRes.data.email || 'Instructor');
//                } else {
//                    setInstructorName('N/A');
//                }
//            } catch (err) {
//                console.error(err);
//                setError('Failed to load course details.');
//            } finally {
//                setLoading(false);
//            }
//        };

//        fetchCourse();
//    }, [courseId]);

//    const enrollInCourse = async () => {
//        setEnrollSuccess('');  // Clear previous messages
//        setEnrollError('');

//        try {
//            const storedUser = JSON.parse(localStorage.getItem('user'));
//            const userId = storedUser?.userId;

//            if (!userId || storedUser?.role !== 'student') {
//                alert('Please log in as a student to enroll.');
//                return;
//            }

//            const payload = {
//                UserId: userId,
//                CourseId: courseId
//            };

//            const response = await api.post('/Enrollments', payload, {
//                headers: {
//                    'Content-Type': 'application/json'
//                }
//            });

//            // Backend returns message in response.data, e.g. { message: "User X enrolled in course Y." }
//            setEnrollSuccess(response.data.message || `Successfully enrolled in "${course?.title}"`);
//        } catch (error) {
//            console.error('Enrollment Error:', error);

//            // Check if the error is a 400 Bad Request with "already enrolled" message
//            if (error.response) {
//                if (error.response.status === 400) {
//                    const serverMsg = error.response.data;
//                    if (typeof serverMsg === 'string' && serverMsg.toLowerCase().includes('already enrolled')) {
//                        setEnrollError('You are already enrolled in this course.');
//                    } else if (serverMsg.message) {
//                        setEnrollError(serverMsg.message);
//                    } else {
//                        setEnrollError('Enrollment failed due to bad request.');
//                    }
//                } else {
//                    setEnrollError(`Enrollment failed: ${error.response.statusText}`);
//                }
//            } else {
//                setEnrollError('Enrollment failed. Please try again later.');
//            }
//        }
//    };

//    if (loading) {
//        return (
//            <div className="text-center mt-5">
//                <div className="spinner-border text-primary" role="status"></div>
//                <p className="mt-3">Loading course details...</p>
//            </div>
//        );
//    }

//    if (error || !course) {
//        return (
//            <div className="container mt-5 text-center text-danger">
//                <h4>{error || 'Course not found.'}</h4>
//            </div>
//        );
//    }

//    return (
//        <>
//            <style>{`
//                /* existing styles */
//            `}</style>

//            <div className="background-texture">
//                <div className="course-card">
//                    <div className="d-flex justify-content-between align-items-start flex-wrap">
//                        <div>
//                            <h1 className="text-primary">{course?.title}</h1>
//                            <p className="text-muted fs-5 mb-2">
//                                by <strong className="text-dark">{instructorName}</strong>
//                            </p>
//                        </div>
//                        <div>
//                            <button
//                                className="btn btn-success btn-lg"
//                                onClick={enrollInCourse}
//                            >
//                                Enroll Now
//                            </button>
//                        </div>
//                    </div>

//                    {enrollSuccess && (
//                        <div className="alert alert-success mt-3">{enrollSuccess}</div>
//                    )}

//                    {enrollError && (
//                        <div className="alert alert-danger mt-3">{enrollError}</div>
//                    )}

//                    <hr />

//                    <div className="mt-4">
//                        <h4 className="mb-3">About This Course</h4>
//                        <p className="fs-5" style={{ whiteSpace: 'pre-line' }}>{course?.description}</p>
//                    </div>

//                    <div className="mt-4 text-end">
//                        <button
//                            className="btn btn-outline-secondary"
//                            onClick={() => window.history.back()}
//                        >
//                            ← Back to Courses
//                        </button>
//                    </div>
//                </div>
//            </div>
//        </>
//    );
//};

//export default CourseDetails;



//import React, { useEffect, useState } from 'react';
//import { useParams } from 'react-router-dom';
//import axios from 'axios';
//import api from '../services/api';



//const CourseDetails = () => {
//    const { courseId } = useParams();
//    const [course, setCourse] = useState(null);
//    const [instructorName, setInstructorName] = useState('');
//    const [loading, setLoading] = useState(true);
//    const [assessments, setAssessments] = useState([]);
//    const [error, setError] = useState('');
//    const [enrollSuccess, setEnrollSuccess] = useState('');
//    const [enrollError, setEnrollError] = useState('');


//    useEffect(() => {









//        const fetchCourse = async () => {
//            try {
//                const courseRes = await axios.get(`https://localhost:7180/api/Courses/${courseId}`);
//                const courseData = courseRes.data;
//                setCourse(courseData);

//                if (courseData.instructorId) {
//                    const instructorRes = await axios.get(`https://localhost:7180/api/Users/${courseData.instructorId}`);
//                    setInstructorName(instructorRes.data.name || instructorRes.data.email || 'Instructor');
//                } else {
//                    setInstructorName('N/A');
//                }
//            } catch (err) {
//                console.error(err);
//                setError('Failed to load course details.');
//            } finally {
//                setLoading(false);
//            }
//        };

//        fetchCourse();
//    }, [courseId]);





//    const enrollInCourse = async () => {
//        setEnrollSuccess('');
//        setEnrollError('');

//        try {
//            const storedUser = JSON.parse(localStorage.getItem('user'));
//            const userId = storedUser?.userId;

//            if (!userId || storedUser?.role !== 'student') {
//                alert('Please log in as a student to enroll.');
//                return;
//            }

//            const payload = {
//                UserId: userId,
//                CourseId: courseId
//            };

//            const response = await api.post('/Enrollments', payload, {
//                headers: {
//                    'Content-Type': 'application/json'
//                }
//            });

//            setEnrollSuccess(response.data.message || `Successfully enrolled in "${course?.title}"! 🎉`);
//        } catch (error) {
//            console.error('Enrollment Error:', error);

//            if (error.response) {
//                if (error.response.status === 400) {
//                    const serverMsg = error.response.data;
//                    if (typeof serverMsg === 'string' && serverMsg.toLowerCase().includes('already enrolled')) {
//                        setEnrollError('You are already enrolled in this course.');
//                    } else if (serverMsg.message) {
//                        setEnrollError(serverMsg.message);
//                    } else {
//                        setEnrollError('Enrollment failed due to bad request.');
//                    }
//                } else {
//                    setEnrollError(`Enrollment failed: ${error.response.statusText}`);
//                }
//            } else {
//                setEnrollError('Enrollment failed. Please try again later.');
//            }
//        }




//    };


//    if (loading) {
//        return (
//            <div className="text-center mt-5">
//                <div className="spinner-border text-primary" role="status"></div>
//                <p className="mt-3">Loading course details...</p>
//            </div>
//        );
//    }

//    if (error || !course) {
//        return (
//            <div className="container mt-5 text-center text-danger">
//                <h4>{error || 'Course not found.'}</h4>
//            </div>
//        );
//    }

//    return (
//        <>
//            <div
//                className="d-flex justify-content-center align-items-center min-vh-100 px-3 py-5"
//                style={{
//                    background: 'linear-gradient(135deg, #f8f9fa, #e9ecef)'
//                }}
//            >
//                <div className="card shadow-sm" style={{ maxWidth: '720px', width: '100%' }}>
//                    <div className="card-body">
//                        <div className="d-flex flex-column flex-md-row justify-content-between align-items-start mb-3 gap-3">
//                            <div>
//                                <h1 className="h3 text-primary">{course?.title}</h1>
//                                <p className="text-secondary mb-0">
//                                    by <strong className="text-dark">{instructorName}</strong>
//                                </p>
//                            </div>
//                            <button
//                                className="btn btn-success btn-lg align-self-start"
//                                onClick={enrollInCourse}
//                            >
//                                Enroll Now
//                            </button>
//                        </div>

//                        {enrollSuccess && (
//                            <div className="alert alert-success" role="alert">
//                                {enrollSuccess}
//                            </div>
//                        )}

//                        {enrollError && (
//                            <div className="alert alert-danger" role="alert">
//                                {enrollError}
//                            </div>
//                        )}

//                        <hr />

//                        <section className="mb-4">
//                            <h4 className="mb-3">About This Course</h4>
//                            <p className="fs-5" style={{ whiteSpace: 'pre-line' }}>
//                                {course?.description}
//                            </p>
//                        </section>

//                        <div className="text-end">
//                            <button
//                                className="btn btn-outline-secondary"
//                                onClick={() => window.history.back()}
//                            >
//                                &larr; Back to Courses
//                            </button>
//                        </div>
//                    </div>
//                </div>
//            </div>
//        </>
//    );



//};

//export default CourseDetails;

import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import axios from 'axios';
import api from '../services/api';

const CourseDetails = () => {
    const { courseId } = useParams();
    const location = useLocation();

    const [course, setCourse] = useState(null);
    const [instructorName, setInstructorName] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [enrollSuccess, setEnrollSuccess] = useState('');
    const [enrollError, setEnrollError] = useState('');

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const courseRes = await axios.get(`https://localhost:7180/api/Courses/${courseId}`);
                const courseData = courseRes.data;
                setCourse(courseData);

                if (courseData.instructorId) {
                    const instructorRes = await axios.get(`https://localhost:7180/api/Users/${courseData.instructorId}`);
                    setInstructorName(instructorRes.data.name || instructorRes.data.email || 'Instructor');
                } else {
                    setInstructorName('N/A');
                }
            } catch (err) {
                console.error(err);
                setError('Failed to load course details.');
            } finally {
                setLoading(false);
            }
        };

        fetchCourse();
    }, [courseId]);

    const enrollInCourse = async () => {
        setEnrollSuccess('');
        setEnrollError('');

        try {
            const storedUser = JSON.parse(localStorage.getItem('user'));
            const userId = storedUser?.userId;

            if (!userId || storedUser?.role !== 'student') {
                alert('Please log in as a student to enroll.');
                return;
            }

            const payload = {
                UserId: userId,
                CourseId: courseId,
            };

            await api.post('/Enrollments', payload, {
                headers: { 'Content-Type': 'application/json' },
            });

            setEnrollSuccess(`You have successfully enrolled in "${course?.title}"! Welcome aboard 🎉`);
        } catch (error) {
            console.error('Enrollment Error:', error);

            if (error.response) {
                if (error.response.status === 400) {
                    const serverMsg = error.response.data;
                    if (typeof serverMsg === 'string' && serverMsg.toLowerCase().includes('already enrolled')) {
                        setEnrollError(`Oops! You are already enrolled in "${course?.title}".`);
                    } else if (serverMsg.message) {
                        setEnrollError(serverMsg.message);
                    } else {
                        setEnrollError('Enrollment failed due to bad request.');
                    }
                } else {
                    setEnrollError(`Enrollment failed: ${error.response.statusText}`);
                }
            } else {
                setEnrollError('Enrollment failed. Please try again later.');
            }
        }
    };

    if (loading) {
        return (
            <div className="text-center mt-5">
                <div className="spinner-border text-primary" role="status"></div>
                <p className="mt-3">Loading course details...</p>
            </div>
        );
    }

    if (error || !course) {
        return (
            <div className="container mt-5 text-center text-danger">
                <h4>{error || 'Course not found.'}</h4>
            </div>
        );
    }

    const showEnrollButton = location.pathname.startsWith('/courses/');

    return (
        <div className="container my-5">
            <div
                className="card mx-auto"
                style={{
                    maxWidth: '850px',
                    borderRadius: '20px',
                    padding: '2.5rem',
                    backgroundColor: '#fff',
                    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)',
                }}
            >
                <div className="d-flex justify-content-between align-items-start flex-wrap mb-4">
                    <div>
                        <h1 className="fw-bold" style={{ color: '#009b9f' }}>{course?.title}</h1>

                        <p className="text-muted fs-5 mb-0">
                            by <strong className="text-dark">{instructorName}</strong>
                        </p>
                    </div>
                    {showEnrollButton && (
                        <div className="mt-3 mt-md-0">
                            <button
                                className="btn btn-dark fw-semibold px-4 py-2"
                                style={{
                                    borderRadius: '50px',
                                    transition: 'background-color 0.3s ease',
                                }}
                                onClick={enrollInCourse}
                                onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#007f87')}
                                onMouseLeave={e => (e.currentTarget.style.backgroundColor = '')}
                            >
                                Enroll Now
                            </button>
                        </div>
                    )}
                </div>

                {enrollSuccess && (
                    <div className="alert alert-success alert-dismissible fade show" role="alert">
                        {enrollSuccess}
                        <button
                            type="button"
                            className="btn-close"
                            aria-label="Close"
                            onClick={() => setEnrollSuccess('')}
                        ></button>
                    </div>
                )}

                {enrollError && (
                    <div className="alert alert-danger alert-dismissible fade show" role="alert">
                        {enrollError}
                        <button
                            type="button"
                            className="btn-close"
                            aria-label="Close"
                            onClick={() => setEnrollError('')}
                        ></button>
                    </div>
                )}

                <hr className="my-4" />

                <div>
                    <h4 className="mb-3 text-dark">About This Course</h4>
                    <p className="text-muted fs-5" style={{ whiteSpace: 'pre-line' }}>
                        {course?.description}
                    </p>
                </div>

                <div className="mt-5 text-end">
                    <button
                        className="btn btn-outline-secondary"
                        style={{ borderRadius: '50px', padding: '8px 20px' }}
                        onClick={() => window.history.back()}
                    >
                        ← Back to Courses
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CourseDetails;

