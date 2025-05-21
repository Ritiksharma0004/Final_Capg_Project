import React, { useEffect, useState } from 'react';
import api from '../services/api';  // your axios instance or API helper
import { useNavigate } from 'react-router-dom';

const Courses = () => {
    const [courses, setCourses] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    // Form state for adding new course
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [addError, setAddError] = useState('');
    const [addSuccess, setAddSuccess] = useState('');

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const res = await api.get('Courses');  // Adjust your endpoint if needed
                setCourses(res.data);
            } catch (err) {
                console.error(err);
                setError('Failed to fetch courses.');
            } finally {
                setLoading(false);
            }
        };

        fetchCourses();
    }, []);

    const handleEnroll = async (courseId) => {
        setError('');
        setMessage('');
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user) {
            navigate('/login');
            return;
        }

        try {
            // Adjust endpoint and payload as per your backend
            await api.post('Enrollments', {
                userId: user.userId,
                courseId: courseId,
            });

            setMessage('Successfully enrolled in the course!');
        } catch (err) {
            console.error(err);
            setError('Enrollment failed. Please try again.');
        }
    };

    const handleAddCourse = async (e) => {
        e.preventDefault();
        setAddError('');
        setAddSuccess('');

        const user = JSON.parse(localStorage.getItem('user'));
        if (!user) {
            setAddError('You must be logged in to add a course.');
            return;
        }

        if (!title.trim() || !description.trim()) {
            setAddError('Title and description are required.');
            return;
        }

        try {
            // Your backend expects courseId to be auto-generated, so do not send it here
            const newCourse = {
                title,
                description,
                userId: user.userId  // Associate course with logged-in user
            };

            await api.post('Courses', newCourse);

            setAddSuccess('Course added successfully!');
            setTitle('');
            setDescription('');

            // Refresh courses list after adding new one
            const res = await api.get('Courses');
            setCourses(res.data);
        } catch (err) {
            console.error(err);
            setAddError('Failed to add course. Please try again.');
        }
    };

    if (loading) return <p className="text-center mt-5">Loading courses...</p>;

    return (
        <div className="container mt-4">
            <h2 className="mb-4">Available Courses</h2>

            {error && <div className="alert alert-danger">{error}</div>}
            {message && <div className="alert alert-success">{message}</div>}

            {courses.length === 0 ? (
                <p className="text-muted">No courses available at the moment.</p>
            ) : (
                <table className="table table-bordered">
                    <thead className="table-dark">
                        <tr>
                            <th>Course ID</th>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {courses.map(course => (
                            <tr key={course.courseId}>
                                <td>{course.courseId}</td>
                                <td>{course.title}</td>
                                <td>{course.description}</td>
                                <td>
                                    <button
                                        className="btn btn-primary"
                                        onClick={() => handleEnroll(course.courseId)}
                                    >
                                        Enroll
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            <hr />

            <h3>Add New Course</h3>
            {addError && <div className="alert alert-danger">{addError}</div>}
            {addSuccess && <div className="alert alert-success">{addSuccess}</div>}

            <form onSubmit={handleAddCourse}>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Course Title</label>
                    <input
                        type="text"
                        id="title"
                        className="form-control"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Course Description</label>
                    <textarea
                        id="description"
                        className="form-control"
                        rows="3"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    ></textarea>
                </div>

                <button type="submit" className="btn btn-success">Add Course</button>
            </form>
        </div>
    );
};

export default Courses;
