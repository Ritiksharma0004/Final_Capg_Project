// src/pages/StudentDashboard.jsx
import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

const StudentDashboard = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetchCourses();
    }, []);

    const fetchCourses = async () => {
        try {
            const response = await api.get('Courses');
            setCourses(response.data);
        } catch (err) {
            setError('Failed to fetch available courses.');
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <p className="text-center mt-5">Loading courses...</p>;

    if (error) {
        return <div className="alert alert-danger text-center">{error}</div>;
    }

    return (
        <div className="container mt-4">
            <h3 className="mb-4">Available Courses</h3>
            <div className="row">
                {courses.length > 0 ? (
                    courses.map(course => (
                        <div key={course.courseId} className="col-md-4 mb-4">
                            <div className="card h-100 shadow-sm">
                                <div className="card-body d-flex flex-column">
                                    <h5 className="card-title">{course.title}</h5>
                                    <p className="card-text">{course.description}</p>
                                    <button
                                        className="btn btn-primary mt-auto"
                                        onClick={() => navigate(`/courses/${course.courseId}`)}
                                    >
                                        View Course
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-muted">No courses available at the moment.</p>
                )}
            </div>
        </div>
    );
};

export default StudentDashboard;
