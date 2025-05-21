// src/pages/InstructorDashboard.jsx
import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

const InstructorDashboard = () => {
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
            setError('Failed to load courses');
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <p className="text-center mt-5">Loading courses...</p>;

    return (
        <div className="container mt-4">
            <h3 className="mb-4">Instructor Dashboard</h3>
            <div className="text-end mb-4">
                <button className="btn btn-success" onClick={() => navigate('/upload-course')}>
                    Upload New Course
                </button>
            </div>
            {error && <p className="text-danger">{error}</p>}
            <div className="row">
                {courses.map(course => (
                    <div key={course.courseId} className="col-md-4 mb-4">
                        <div className="card">
                            <div className="card-body">
                                <h5>{course.title}</h5>
                                <p>{course.description}</p>
                                <button className="btn btn-primary" onClick={() => navigate(`/courses/${course.courseId}`)}>View</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default InstructorDashboard;
