import React, { useEffect, useState } from 'react';
import api from '../services/api';

const AddCourse = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [mediaUrl, setMediaUrl] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    // Get logged-in user from localStorage
    const storedUser = JSON.parse(localStorage.getItem('user'));
    const instructorId = storedUser?.userId || '';
    const instructorName = storedUser?.name || storedUser?.email || 'Instructor';

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (!title.trim() || !description.trim() || !mediaUrl.trim()) {
            setError('Please fill in all fields.');
            return;
        }

        if (!instructorId) {
            setError('Instructor information not found. Please log in.');
            return;
        }

        const payload = {
            Title: title.trim(),
            Description: description.trim(),
            InstructorId: instructorId,
            MediaUrl: mediaUrl.trim()
        };

        try {
            await api.post('/Courses', payload);
            setSuccess('Course added successfully!');
            // Clear form
            setTitle('');
            setDescription('');
            setMediaUrl('');
        } catch (err) {
            setError(err.response?.data || 'Failed to add course.');
        }
    };

    return (
        <div className="container mt-5" style={{ maxWidth: '600px' }}>
            <h2>Add New Course</h2>

            {error && <div className="alert alert-danger">{error}</div>}
            {success && <div className="alert alert-success">{success}</div>}

            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Course Title *</label>
                    <input
                        type="text"
                        className="form-control"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        placeholder="Enter course title"
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Description *</label>
                    <textarea
                        className="form-control"
                        rows="4"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                        placeholder="Enter course description"
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Media URL *</label>
                    <input
                        type="url"
                        className="form-control"
                        value={mediaUrl}
                        onChange={(e) => setMediaUrl(e.target.value)}
                        required
                        placeholder="Enter media URL"
                    />
                </div>

                {/* Show logged-in instructor name (readonly) */}
                <div className="mb-3">
                    <label className="form-label">Instructor</label>
                    <input
                        type="text"
                        className="form-control"
                        value={instructorName}
                        readOnly
                        disabled
                    />
                </div>

                {/* Hidden input for instructorId */}
                <input type="hidden" value={instructorId} />

                <button type="submit" className="btn btn-success">
                    Add Course
                </button>
            </form>
        </div>
    );
};

export default AddCourse;




