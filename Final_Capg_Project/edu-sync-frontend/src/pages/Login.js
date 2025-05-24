//import React, { useState } from 'react';
//import { useNavigate } from 'react-router-dom';
//import api from '../services/api'; // your axios instance
//import { useAuth } from '../contexts/AuthContext'; // your AuthContext hook

//const Login = () => {
//    const [email, setEmail] = useState('');
//    const [password, setPassword] = useState('');
//    const [error, setError] = useState('');
//    const { login } = useAuth();  // get login function from context
//    const navigate = useNavigate();


//    const handleLogin = async (e) => {
//        e.preventDefault();
//        try {
//            const response = await api.post('Users/login', {
//                Email: email,
//                PasswordHash: password, // match C# property name
//            });

//            login(response.data); // assuming response contains user data/token
//            navigate('/dashboard');
//        } catch (err) {
//            console.error('Login failed:', err);
//            setError(err.response?.data || 'Invalid email or password.');
//        }
//    };


//    return (
//        <div className="container mt-4" style={{ maxWidth: '400px' }}>
//            <h2>Login</h2>
//            {error && <div className="alert alert-danger">{error}</div>}
//            <form onSubmit={handleLogin}>
//                <div className="mb-3">
//                    <label>Email</label>
//                    <input
//                        type="email"
//                        className="form-control"
//                        value={email}
//                        onChange={e => setEmail(e.target.value)}
//                        required
//                    />
//                </div>
//                <div className="mb-3">
//                    <label>Password</label>
//                    <input
//                        type="password"
//                        className="form-control"
//                        value={password}
//                        onChange={e => setPassword(e.target.value)}
//                        required
//                    />
//                </div>
//                <button type="submit" className="btn btn-primary w-100">Login</button>
//            </form>
//        </div>
//    );
//};

//export default Login;



import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../contexts/AuthContext';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('Users/login', {
                Email: email,
                PasswordHash: password,
            });

            login(response.data);
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data || 'Invalid email or password.');
        }
    };

    return (
        <div
            className="d-flex justify-content-center align-items-start"
            style={{
                minHeight: '100vh',
                backgroundColor: '#ffffff',
                padding: '2rem 1rem',
                fontFamily: "'Segoe UI', sans-serif",
            }}
        >
            <div
                style={{
                    background: '#fff',
                    borderRadius: '12px',
                    width: '100%',
                    maxWidth: '360px',
                    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.08)',
                    marginTop: '8vh',
                    padding: '2rem',
                    color: '#1f2937',
                }}
            >
                <h3 className="text-center mb-4" style={{ fontWeight: 600, fontSize: '1.4rem' }}>
                    Login to Dashboard
                </h3>

                {error && (
                    <div
                        className="alert alert-danger"
                        role="alert"
                        style={{
                            fontSize: '0.9rem',
                            padding: '0.5rem 1rem',
                            marginBottom: '1rem',
                            borderRadius: '6px',
                        }}
                    >
                        {error}
                    </div>
                )}

                <form onSubmit={handleLogin}>
                    <div className="mb-3">
                        <label
                            htmlFor="email"
                            style={{ fontWeight: 500, fontSize: '0.9rem', color: '#374151' }}
                        >
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            className="form-control"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            required
                            placeholder="you@example.com"
                            style={{
                                height: '36px',
                                fontSize: '0.9rem',
                                borderRadius: '6px',
                                border: '1px solid #ced4da',
                                padding: '6px 10px',
                                color: '#1f2937',
                                transition: 'border 0.3s',
                            }}
                            onFocus={e => (e.target.style.borderColor = '#3b82f6')}
                            onBlur={e => (e.target.style.borderColor = '#ced4da')}
                        />
                    </div>

                    <div className="mb-4">
                        <label
                            htmlFor="password"
                            style={{ fontWeight: 500, fontSize: '0.9rem', color: '#374151' }}
                        >
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            className="form-control"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            required
                            placeholder="••••••••"
                            style={{
                                height: '36px',
                                fontSize: '0.9rem',
                                borderRadius: '6px',
                                border: '1px solid #ced4da',
                                padding: '6px 10px',
                                color: '#1f2937',
                                transition: 'border 0.3s',
                            }}
                            onFocus={e => (e.target.style.borderColor = '#3b82f6')}
                            onBlur={e => (e.target.style.borderColor = '#ced4da')}
                        />
                    </div>

                    <button
                        type="submit"
                        className="btn w-100"
                        style={{
                            backgroundColor: '#000',
                            borderRadius: '6px',
                            fontWeight: '600',
                            fontSize: '1rem',
                            padding: '10px 0',
                            color: '#fff',
                            border: '1.5px solid #000',
                            transition: 'all 0.3s ease',
                            cursor: 'pointer',
                        }}
                        onMouseEnter={e => {
                            e.currentTarget.style.backgroundColor = '#fff';
                            e.currentTarget.style.color = '#000';
                        }}
                        onMouseLeave={e => {
                            e.currentTarget.style.backgroundColor = '#000';
                            e.currentTarget.style.color = '#fff';
                        }}
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>

    );
};

export default Login;



