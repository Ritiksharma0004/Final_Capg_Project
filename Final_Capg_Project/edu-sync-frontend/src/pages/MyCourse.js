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
                const [courseRes, assessmentsRes] = await Promise.all([
                    api.get(`/Courses/${courseId}`),
                    api.get(`/Courses/${courseId}/Assessments`)
                ]);

                setCourse(courseRes.data);
                setAssessments(assessmentsRes.data || []);
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

                <h4 className="mt-4">Assessments</h4>
                {assessments.length > 0 ? (
                    <ul className="list-group mt-2">
                        {assessments.map((assessment) => (
                            <li key={assessment.id} className="list-group-item">
                                <strong>{assessment.title}</strong>
                                <br />
                                <small>{assessment.description}</small>
                                <div className="text-end text-muted">
                                    Due: {new Date(assessment.dueDate).toLocaleDateString()}
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-muted mt-2">No assessments yet.</p>
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
