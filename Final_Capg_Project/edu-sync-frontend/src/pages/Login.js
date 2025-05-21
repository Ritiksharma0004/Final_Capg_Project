//import React, { useState } from 'react';
//import axios from 'axios';
//import api from '../services/api'; 


//const Login = () => {
//    const [email, setEmail] = useState('');
//    const [password, setPassword] = useState('');
//    const [error, setError] = useState('');
//    const [success, setSuccess] = useState('');

//    // Example React login function
//    const handleLogin = async (e) => {
//        e.preventDefault();
//        setError('');
//        setSuccess('');
//        try {
//            const response = await api.post('Users/login', {
//                Email: email,
//                PasswordHash: password,
//            });
//            setSuccess('Login successful');
//            localStorage.setItem('token', response.data.token);  // if token is returned
//            // redirect or update UI
//        } catch (err) {
//            setError(err.response?.data ?? 'Login failed');
//        }
//    };




//    return (
//        <div className="container mt-4" style={{ maxWidth: '400px' }}>
//            <h2>Login</h2>
//            {error && <div className="alert alert-danger">{error}</div>}
//            {success && <div className="alert alert-success">{success}</div>}
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


//import React, { useState } from 'react';
//import { useNavigate } from 'react-router-dom';
//import api from '../services/api'; // adjust the path based on your folder structure

//const Login = () => {
//    const [email, setEmail] = useState('');
//    const [password, setPassword] = useState('');
//    const [error, setError] = useState('');
//    const navigate = useNavigate();

//    const handleLogin = async (e) => {
//        e.preventDefault();
//        try {
//            const response = await api.post('Users/login', {
//                Email: email,
//                PasswordHash: password
//            });

//            // Optional: Save user info for personalization
//            localStorage.setItem('user', JSON.stringify(response.data));

//            // ✅ Redirect to dashboard
//            navigate('/dashboard');
//        } catch (err) {
//            console.error('Login failed:', err);
//            setError('Invalid email or password.');
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
import api from '../services/api'; // your axios instance
import { useAuth } from '../contexts/AuthContext'; // your AuthContext hook

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();  // get login function from context
    const navigate = useNavigate();


    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('Users/login', {
                Email: email,
                PasswordHash: password, // match C# property name
            });

            login(response.data); // assuming response contains user data/token
            navigate('/dashboard');
        } catch (err) {
            console.error('Login failed:', err);
            setError(err.response?.data || 'Invalid email or password.');
        }
    };


    return (
        <div className="container mt-4" style={{ maxWidth: '400px' }}>
            <h2>Login</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleLogin}>
                <div className="mb-3">
                    <label>Email</label>
                    <input
                        type="email"
                        className="form-control"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label>Password</label>
                    <input
                        type="password"
                        className="form-control"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary w-100">Login</button>
            </form>
        </div>
    );
};

export default Login;


