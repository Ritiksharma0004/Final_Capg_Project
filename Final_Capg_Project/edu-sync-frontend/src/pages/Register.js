import React, { useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom'; // if you want to redirect

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: 'student',
    });

    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const navigate = useNavigate(); // optional for redirection

    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMsg('');
        setLoading(true);

        console.log('Form Submitted', formData);

        const payload = {
            Name: formData.name,
            Email: formData.email,
            PasswordHash: formData.password,
            Role: formData.role,
        };

        try {
            const response = await api.post('/Users', payload);
            console.log('User registered:', response.data);
            alert('Registration successful!');
            // Optional: Redirect to login or dashboard
            navigate('/login');
        } catch (error) {
            console.error('Registration failed:', error);
            if (error.response) {
                setErrorMsg(error.response.data || 'Server error occurred.');
            } else if (error.request) {
                setErrorMsg('No response from server. Check your backend is running.');
            } else {
                setErrorMsg('Unexpected error occurred.');
            }
        } finally {
            // Optional: Add cleanup logic here if needed (e.g. set loading to false)
        }

    };

    return (
        <div className="container mt-4">
            <h2>Register</h2>
            {errorMsg && <div className="alert alert-danger">{errorMsg}</div>}
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label>Name</label>
                    <input
                        type="text"
                        className="form-control"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label>Email</label>
                    <input
                        type="email"
                        className="form-control"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label>Password</label>
                    <input
                        type="password"
                        className="form-control"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label>Role</label>
                    <select
                        className="form-control"
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        required
                    >
                        <option value="student">Student</option>
                        <option value="instructor">Instructor</option>
                    </select>
                </div>

                <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={loading}
                >
                    {loading ? 'Registering...' : 'Register'}
                </button>
            </form>
        </div>
    );
};

export default Register;
