import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { AiFillHome } from 'react-icons/ai';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
            <div className="container-fluid d-flex justify-content-between align-items-center w-100">
                {/* Left: Brand */}
                <Link className="navbar-brand" to="/">EduSync</Link>

                {/* Center: Dashboard button */}
                {user && (
                    <div className="position-absolute start-50 translate-middle-x">
                        <Link to="/dashboard" className="btn btn-outline-light">
                            <AiFillHome size={18} />
                        </Link>
                    </div>
                )}

                {/* Right: Auth actions */}
                <div className="d-flex align-items-center ms-auto">
                    {user ? (
                        <>
                            <span className="text-white me-3">
                                Welcome, <strong>{user.name}</strong>
                            </span>
                            <button onClick={handleLogout} className="btn btn-outline-light btn-sm">
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="btn btn-outline-light me-2">Login</Link>
                            <Link to="/register" className="btn btn-light">Sign Up</Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
