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

