//import React, { useEffect, useState } from 'react';
//import { useParams, useNavigate } from 'react-router-dom';
//import api from '../services/api';

//const toTitleCase = (str) =>
//    str.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());

//const MyCourse = () => {
//    const { courseId } = useParams();
//    const navigate = useNavigate();

//    const [course, setCourse] = useState(null);
//    const [assessments, setAssessments] = useState([]);
//    const [loading, setLoading] = useState(true);
//    const [error, setError] = useState('');
//    const [redirecting, setRedirecting] = useState(false);

//    useEffect(() => {
//        const fetchCourseAndAssessments = async () => {
//            try {
//                const [courseRes, assessmentsRes] = await Promise.all([
//                    api.get(`/Courses/${courseId}`),
//                    api.get('/Assessments'),
//                ]);

//                setCourse(courseRes.data);

//                const filtered = (assessmentsRes.data || []).filter((a) => a.courseId === courseId);
//                setAssessments(filtered);
//            } catch (err) {
//                console.error('Fetch error:', err);
//                setError('Failed to load course or assessments.');
//            } finally {
//                setLoading(false);
//            }
//        };

//        fetchCourseAndAssessments();
//    }, [courseId]);

//    const handleTakeAssessment = (assessmentId) => {
//        setRedirecting(true);
//        setTimeout(() => {
//            navigate(`/my-course/${courseId}/take-assessment/${assessmentId}`);
//        }, 1000);
//    };

//    if (loading) return <div className="text-center mt-5 text-secondary">Loading course...</div>;
//    if (error) return <div className="text-danger text-center mt-5">{error}</div>;
//    if (!course) return <div className="text-center mt-5 text-secondary">Course not found.</div>;
//    if (redirecting) return <div className="text-center mt-5 text-info">Redirecting to assessment...</div>;

//    const getYouTubeEmbedUrl = (url) => {
//        if (!url) return '';
//        const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]+)/;
//        const match = url.match(regex);
//        return match ? `https://www.youtube.com/embed/${match[1]}` : '';
//    };

//    const videoEmbedUrl = getYouTubeEmbedUrl(course.videoUrl);

//    return (
//        <div className="container-fluid bg-light min-vh-100 py-5 px-4 px-md-5 text-dark">
//            {videoEmbedUrl && (
//                <div className="ratio ratio-16x9 mb-5 shadow-sm rounded-4" style={{ backgroundColor: '#f0f0f3' }}>
//                    <iframe
//                        src={videoEmbedUrl}
//                        title={course.title}
//                        allowFullScreen
//                        frameBorder="0"
//                        className="rounded-4"
//                    ></iframe>
//                </div>
//            )}

//            {/* Big Heading without bold, subtle shadow, smooth color */}
//            <div className="mb-4 display-3 border-bottom pb-3 rounded-4 text-center"
//                style={{ color: '#3b3e46', textShadow: '1px 1px 3px rgba(0,0,0,0.1)' }}>
//                Assessments
//            </div>

//            {assessments.length > 0 ? (
//                <div className="d-flex flex-column gap-3">
//                    {assessments.map((assessment) => {
//                        const isTaken = assessment.isTaken;

//                        return (
//                            <div
//                                key={assessment.assessmentId}
//                                className="p-4 rounded-4 d-flex justify-content-between align-items-center w-100 shadow-sm"
//                                style={{
//                                    backgroundColor: '#ffffffcc',
//                                    border: '1px solid #ddd',
//                                    boxShadow: '0 2px 6px rgba(0,0,0,0.08)',
//                                    transition: 'background-color 0.3s ease',
//                                }}
//                                onMouseEnter={(e) => {
//                                    e.currentTarget.style.backgroundColor = '#e6f0ff';
//                                }}
//                                onMouseLeave={(e) => {
//                                    e.currentTarget.style.backgroundColor = '#ffffffcc';
//                                }}
//                            >
//                                <div className="fs-4 text-capitalize" style={{ color: '#2a2d34' }}>
//                                    {toTitleCase(assessment.title)}
//                                </div>
//                                {isTaken ? (
//                                    <span className="badge bg-success fs-6 py-2 px-3">Taken</span>
//                                ) : (
//                                    <button
//                                        className="btn btn-outline-primary btn-lg"
//                                        onClick={() => handleTakeAssessment(assessment.assessmentId)}
//                                        style={{ minWidth: '160px' }}
//                                        onMouseEnter={(e) => {
//                                            e.currentTarget.classList.remove('btn-outline-primary');
//                                            e.currentTarget.classList.add('btn-primary');
//                                        }}
//                                        onMouseLeave={(e) => {
//                                            e.currentTarget.classList.remove('btn-primary');
//                                            e.currentTarget.classList.add('btn-outline-primary');
//                                        }}
//                                    >
//                                        Take Assessment
//                                    </button>
//                                )}
//                            </div>
//                        );
//                    })}
//                </div>
//            ) : (
//                <p className="text-muted">No assessments available for this course.</p>
//            )}
//        </div>
//    );
//};

//export default MyCourse;



import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';

const toTitleCase = (str) =>
    str.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());

const MyCourse = () => {
    const { courseId } = useParams();
    const navigate = useNavigate();

    const [course, setCourse] = useState(null);
    const [assessments, setAssessments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [redirecting, setRedirecting] = useState(false);
    const [videoError, setVideoError] = useState(false);

    useEffect(() => {
        const fetchCourseAndAssessments = async () => {
            try {
                const [courseRes, assessmentsRes] = await Promise.all([
                    api.get(`/Courses/${courseId}`),
                    api.get('/Assessments'),
                ]);

                setCourse(courseRes.data);
                const filtered = (assessmentsRes.data || []).filter((a) => a.courseId === courseId);
                setAssessments(filtered);
            } catch (err) {
                console.error('Fetch error:', err);
                setError('Failed to load course or assessments.');
            } finally {
                setLoading(false);
            }
        };

        fetchCourseAndAssessments();
    }, [courseId]);

    const handleTakeAssessment = (assessmentId) => {
        setRedirecting(true);
        setTimeout(() => {
            navigate(`/my-course/${courseId}/take-assessment/${assessmentId}`);
        }, 1000);
    };

    const getYouTubeEmbedUrl = (url) => {
        if (!url) return '';
        const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]+)/;
        const match = url.match(regex);
        return match ? `https://www.youtube.com/embed/${match[1]}` : '';
    };

    const videoEmbedUrl = getYouTubeEmbedUrl(course?.videoUrl);

    if (loading) return <div className="text-center text-muted mt-5">Loading...</div>;
    if (error) return <div className="text-center text-danger mt-5">{error}</div>;
    if (!course) return <div className="text-center text-muted mt-5">Course not found.</div>;
    if (redirecting) return <div className="text-center text-secondary mt-5">Redirecting to assessment...</div>;

    return (
        <div className="container-fluid bg-white text-black py-4 px-4 px-md-5 min-vh-100" style={{ fontFamily: 'Segoe UI, sans-serif' }}>
            {/* Welcome Message */}
            <div className="mb-4">
                <h2 className="fw-bold">Welcome to {toTitleCase(course.title)}</h2>
                <p className="text-muted">{course.description}</p>
            </div>

            {/* Video or Error */}
            {videoEmbedUrl && !videoError ? (
                <div className="ratio ratio-16x9 mb-5 border rounded-4 shadow-sm overflow-hidden">
                    <iframe
                        src={videoEmbedUrl}
                        title="Course Video"
                        allowFullScreen
                        className="w-100 h-100"
                        style={{ border: 'none' }}
                        onError={() => setVideoError(true)}
                    />
                </div>
            ) : videoError ? (
                <div className="alert alert-warning rounded-4 text-center">Failed to load the course video. Please try again later.</div>
            ) : null}

            {/* Assessments Section */}
            <div className="mb-4 border-bottom pb-3">
                <h3 className="fw-semibold">Assessments</h3>
            </div>

            {assessments.length > 0 ? (
                <div className="row g-4">
                    {assessments.map((assessment) => (
                        <div className="col-md-6 col-lg-4" key={assessment.assessmentId}>
                            <div className="border rounded-4 p-4 shadow-sm h-100 d-flex flex-column justify-content-between bg-light">
                                <h5 className="mb-3">{toTitleCase(assessment.title)}</h5>
                                {assessment.isTaken ? (
                                    <span className="badge bg-success align-self-start">Taken</span>
                                ) : (
                                    <button
                                        className="btn btn-dark w-100 mt-auto"
                                        onClick={() => handleTakeAssessment(assessment.assessmentId)}
                                    >
                                        Take Assessment
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-muted">No assessments available for this course.</p>
            )}
        </div>
    );
};

export default MyCourse;





