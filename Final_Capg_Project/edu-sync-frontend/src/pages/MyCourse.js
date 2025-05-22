//import React, { useEffect, useState } from 'react';
//import { useParams, Link } from 'react-router-dom';
//import api from '../services/api';

//const MyCourse = () => {
//    const { courseId } = useParams();
//    const [course, setCourse] = useState(null);
//    const [assessments, setAssessments] = useState([]);
//    const [loading, setLoading] = useState(true);
//    const [error, setError] = useState('');

//    useEffect(() => {
//        const fetchCourseAndAssessments = async () => {
//            try {
//                const [courseRes, allAssessmentsRes] = await Promise.all([
//                    api.get(`/Courses/${courseId}`),
//                    api.get('/Assessments') // get all assessments
//                ]);

//                setCourse(courseRes.data);

//                // Filter assessments for this course
//                const filtered = (allAssessmentsRes.data || []).filter(
//                    (a) => a.courseId === courseId
//                );

//                setAssessments(filtered);
//                console.log('Filtered assessments:', filtered);  // Check if assessment.id exists
//            } catch (err) {
//                console.error('Error fetching data:', err);
//                setError('Failed to load course or assessments.');
//            } finally {
//                setLoading(false);
//            }
//        };

//        fetchCourseAndAssessments();
//    }, [courseId]);

//    if (loading) return <div className="text-center mt-5">Loading course...</div>;
//    if (error) return <div className="text-danger text-center mt-5">{error}</div>;
//    if (!course) return <div className="text-center mt-5">Course not found.</div>;

//    return (
//        <div className="container mt-5">
//            <div className="card shadow p-4">
//                <h2 className="mb-3">{course.title}</h2>
//                <p className="mb-4">{course.description}</p>

//                <hr />
//                <h4 className="mt-4">Assessments</h4>

//                {assessments.length > 0 ? (
//                    <ul className="list-group mt-3">
//                        {assessments.map((assessment) => (
//                            <li
//                                key={assessment.id}
//                                className="list-group-item d-flex flex-column align-items-start"
//                            >
//                                <strong>{assessment.title}</strong>

//                                {assessment.description && (
//                                    <p className="text-muted mb-1">{assessment.description}</p>
//                                )}

//                                {assessment.dueDate ? (
//                                    <small className="text-muted mb-2">
//                                        Due Date: {new Date(assessment.dueDate).toLocaleDateString()}
//                                    </small>
//                                ) : (
//                                    <small className="text-muted mb-2">No due date</small>
//                                )}

//                                <Link to={`/my-course/${courseId}/take-assessment/${assessment.id}`}>
//                                    Take Assessment for {assessment.title}
//                                </Link>


//                            </li>
//                        ))}
//                    </ul>
//                ) : (
//                    <p className="text-muted mt-2">No assessments added for this course.</p>
//                )}

//                <div className="mt-4">
//                    <Link to="/dashboard" className="btn btn-secondary">
//                        ← Back to Dashboard
//                    </Link>
//                </div>
//            </div>
//        </div>
//    );
//};

//export default MyCourse;



import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../services/api';

const MyCourse = () => {
    const { courseId } = useParams();
    const [course, setCourse] = useState(null);
    const [assessments, setAssessments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchCourseAndAssessments = async () => {
            try {
                const [courseRes, allAssessmentsRes] = await Promise.all([
                    api.get(`/Courses/${courseId}`),
                    api.get('/Assessments') // get all assessments
                ]);

                setCourse(courseRes.data);

                // Filter assessments for this course
                const filtered = (allAssessmentsRes.data || []).filter(
                    (a) => a.courseId === courseId
                );

                setAssessments(filtered);
                console.log('Filtered assessments:', filtered);  // Check if assessment.assessmentId exists
            } catch (err) {
                console.error('Error fetching data:', err);
                setError('Failed to load course or assessments.');
            } finally {
                setLoading(false);
            }
        };

        fetchCourseAndAssessments();
    }, [courseId]);

    if (loading) return <div className="text-center mt-5">Loading course...</div>;
    if (error) return <div className="text-danger text-center mt-5">{error}</div>;
    if (!course) return <div className="text-center mt-5">Course not found.</div>;

    return (
        <div className="container mt-5">
            <div className="card shadow p-4">
                <h2 className="mb-3">{course.title}</h2>
                <p className="mb-4">{course.description}</p>

                <hr />
                <h4 className="mt-4">Assessments</h4>

                {assessments.length > 0 ? (
                    <ul className="list-group mt-3">
                        {assessments.map((assessment) => (
                            <li
                                key={assessment.assessmentId}
                                className="list-group-item d-flex flex-column align-items-start"
                            >
                                <strong>{assessment.title}</strong>

                                {assessment.description && (
                                    <p className="text-muted mb-1">{assessment.description}</p>
                                )}

                                {assessment.dueDate ? (
                                    <small className="text-muted mb-2">
                                        Due Date: {new Date(assessment.dueDate).toLocaleDateString()}
                                    </small>
                                ) : (
                                    <small className="text-muted mb-2">No due date</small>
                                )}

                                <Link to={`/my-course/${courseId}/take-assessment/${assessment.assessmentId}`}>
                                    Take Assessment for {assessment.title}
                                </Link>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-muted mt-2">No assessments added for this course.</p>
                )}

                <div className="mt-4">
                    <Link to="/dashboard" className="btn btn-secondary">
                        ← Back to Dashboard
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default MyCourse;

