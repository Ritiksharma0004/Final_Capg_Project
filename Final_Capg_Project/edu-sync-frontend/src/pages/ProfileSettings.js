import React, { useState } from 'react';
import { AiOutlineMail, AiOutlineLock } from 'react-icons/ai';
import api from '../services/api';

const ProfileSettings = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const [email, setEmail] = useState(user?.email || '');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setMessage('');

        if (password && password !== confirmPassword) {
            return setError('Passwords do not match.');
        }

        try {
            const updateData = {
                userId: user.userId,
                ...(email && { email }),
                ...(password && { password }),
            };

            await api.put(`/Users/${user.userId}`, updateData);
            setMessage('Profile updated successfully!');
        } catch (err) {
            console.error(err);
            setError('Failed to update profile.');
        }
    };

    return (
        <div className="container my-5" style={{ maxWidth: '600px' }}>
            <div className="card shadow-lg border-0 rounded-4 p-4">
                <h3 className="mb-4 text-center fw-bold text-dark">Profile Settings</h3>

                {message && (
                    <div className="alert alert-success rounded-pill text-center">{message}</div>
                )}
                {error && (
                    <div className="alert alert-danger rounded-pill text-center">{error}</div>
                )}

                <form onSubmit={handleSubmit}>
                    {/* Email input with icon */}
                    <div className="mb-3 position-relative">
                        <label htmlFor="email" className="form-label fw-semibold">Email Address</label>
                        <AiOutlineMail
                            style={{
                                position: 'absolute',
                                top: '45px',
                                left: '15px',
                                color: '#6c757d',
                                fontSize: '1.3rem',
                                pointerEvents: 'none',
                            }}
                        />
                        <input
                            type="email"
                            className="form-control form-control-lg rounded-pill ps-5"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            placeholder="your.email@example.com"
                        />
                    </div>

                    {/* Password input with icon */}
                    <div className="mb-3 position-relative">
                        <label htmlFor="password" className="form-label fw-semibold">New Password</label>
                        <AiOutlineLock
                            style={{
                                position: 'absolute',
                                top: '45px',
                                left: '15px',
                                color: '#6c757d',
                                fontSize: '1.3rem',
                                pointerEvents: 'none',
                            }}
                        />
                        <input
                            type="password"
                            className="form-control form-control-lg rounded-pill ps-5"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Leave blank to keep unchanged"
                        />
                    </div>

                    {/* Confirm Password input with icon */}
                    <div className="mb-4 position-relative">
                        <label htmlFor="confirmPassword" className="form-label fw-semibold">Confirm New Password</label>
                        <AiOutlineLock
                            style={{
                                position: 'absolute',
                                top: '45px',
                                left: '15px',
                                color: '#6c757d',
                                fontSize: '1.3rem',
                                pointerEvents: 'none',
                            }}
                        />
                        <input
                            type="password"
                            className="form-control form-control-lg rounded-pill ps-5"
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Re-type password"
                        />
                    </div>

                    <button type="submit" className="btn btn-dark w-100 py-2 fs-5 rounded-pill">
                        Update Profile
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ProfileSettings;
