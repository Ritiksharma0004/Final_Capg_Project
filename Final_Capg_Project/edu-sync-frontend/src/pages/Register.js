import React, { useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: 'student',
    });

    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const navigate = useNavigate();

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

        const payload = {
            Name: formData.name,
            Email: formData.email,
            PasswordHash: formData.password,
            Role: formData.role,
        };

        try {
            const response = await api.post('/Users', payload);
            alert('Registration successful!');
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
            setLoading(false);
        }
    };

    return (
        <div
            className="d-flex justify-content-center align-items-start"
            style={{
                minHeight: '100vh',
                backgroundColor: '#fff',
                padding: '2rem 1rem',
                fontFamily: "'Segoe UI', sans-serif",
            }}
        >
            <div
                style={{
                    background: '#fff',
                    borderRadius: '12px',
                    width: '100%',
                    maxWidth: '380px',
                    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.08)',
                    marginTop: '6vh',
                    padding: '2rem',
                    color: '#1f2937',
                }}
            >
                <h3 className="text-center mb-4" style={{ fontWeight: 600 }}>
                    Register Account
                </h3>

                {errorMsg && (
                    <div className="alert alert-danger" style={{ fontSize: '0.9rem' }}>
                        {errorMsg}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label style={{ fontWeight: 500, fontSize: '0.9rem' }}>Name</label>
                        <input
                            type="text"
                            name="name"
                            className="form-control"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            placeholder="Your full name"
                            style={inputStyle}
                        />
                    </div>

                    <div className="mb-3">
                        <label style={{ fontWeight: 500, fontSize: '0.9rem' }}>Email</label>
                        <input
                            type="email"
                            name="email"
                            className="form-control"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            placeholder="you@example.com"
                            style={inputStyle}
                        />
                    </div>

                    <div className="mb-3">
                        <label style={{ fontWeight: 500, fontSize: '0.9rem' }}>Password</label>
                        <input
                            type="password"
                            name="password"
                            className="form-control"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            placeholder="••••••••"
                            style={inputStyle}
                        />
                    </div>

                    <div className="mb-4">
                        <label style={{ fontWeight: 500, fontSize: '0.9rem' }}>Role</label>
                        <select
                            name="role"
                            className="form-control"
                            value={formData.role}
                            onChange={handleChange}
                            required
                            style={{ ...inputStyle, height: '38px' }}
                        >
                            <option value="student">Student</option>
                            <option value="instructor">Instructor</option>
                        </select>
                    </div>

                    <button
                        type="submit"
                        className="btn w-100"
                        style={buttonStyle}
                        onMouseEnter={e => {
                            e.currentTarget.style.backgroundColor = '#fff';
                            e.currentTarget.style.color = '#000';
                        }}
                        onMouseLeave={e => {
                            e.currentTarget.style.backgroundColor = '#000';
                            e.currentTarget.style.color = '#fff';
                        }}
                        disabled={loading}
                    >
                        {loading ? 'Registering...' : 'Register'}
                    </button>
                </form>
            </div>
        </div>
    );
};

// Inline shared styles
const inputStyle = {
    height: '36px',
    fontSize: '0.9rem',
    borderRadius: '6px',
    border: '1px solid #ced4da',
    padding: '6px 10px',
    color: '#1f2937',
    transition: 'border 0.3s',
};

const buttonStyle = {
    backgroundColor: '#000',
    borderRadius: '6px',
    fontWeight: '600',
    fontSize: '1rem',
    padding: '10px 0',
    color: '#fff',
    border: '1.5px solid #000',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
};

export default Register;
