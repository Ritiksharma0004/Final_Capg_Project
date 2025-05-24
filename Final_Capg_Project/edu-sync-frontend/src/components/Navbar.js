//import React from 'react';
//import { Link, useNavigate } from 'react-router-dom';
//import { useAuth } from '../contexts/AuthContext';
//import { AiFillHome } from 'react-icons/ai';

//const Navbar = () => {
//    const { user, logout } = useAuth();
//    const navigate = useNavigate();

//    const handleLogout = () => {
//        logout();
//        navigate('/');
//    };

//    return (
//        <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
//            <div className="container-fluid d-flex justify-content-between align-items-center w-100">
//                {/* Left: Brand */}
//                <Link className="navbar-brand" to="/">EduSync</Link>

//                {/* Center: Dashboard button */}
//                {user && (
//                    <div className="position-absolute start-50 translate-middle-x">
//                        <Link to="/dashboard" className="btn btn-outline-light">
//                            <AiFillHome size={18} />
//                        </Link>
//                    </div>
//                )}

//                {/* Right: Auth actions */}
//                <div className="d-flex align-items-center ms-auto">
//                    {user ? (
//                        <>
//                            <span className="text-white me-3">
//                                Welcome, <strong>{user.name}</strong>
//                            </span>
//                            <button onClick={handleLogout} className="btn btn-outline-light btn-sm">
//                                Logout
//                            </button>
//                        </>
//                    ) : (
//                        <>
//                            <Link to="/login" className="btn btn-outline-light me-2">Login</Link>
//                            <Link to="/register" className="btn btn-light">Sign Up</Link>
//                        </>
//                    )}
//                </div>
//            </div>
//        </nav>
//    );
//};

//export default Navbar;

import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import {
    AiOutlineLogin,
    AiOutlineUserAdd,
    AiOutlineLogout,
    AiFillHome,
} from 'react-icons/ai';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [hovered, setHovered] = useState(false);
    const [tooltipPos, setTooltipPos] = useState('center'); // 'center', 'start', 'end'
    const nameRef = useRef(null);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const capitalize = (str) => str?.toUpperCase();

    useEffect(() => {
        if (hovered && nameRef.current) {
            const rect = nameRef.current.getBoundingClientRect();
            if (window.innerWidth - rect.right < 150) {
                setTooltipPos('end');
            } else if (rect.left < 150) {
                setTooltipPos('start');
            } else {
                setTooltipPos('center');
            }
        }
    }, [hovered]);

    const tooltipPositionClass = {
        center: 'start-50 translate-middle-x',
        start: 'start-0',
        end: 'end-0',
    };

    const arrowStyle = {
        width: 0,
        height: 0,
        borderLeft: '6px solid transparent',
        borderRight: '6px solid transparent',
        borderBottom: '6px solid white',
        position: 'absolute',
        top: '-6px',
        left: tooltipPos === 'center' ? '50%' : tooltipPos === 'start' ? '12px' : 'auto',
        right: tooltipPos === 'end' ? '12px' : 'auto',
        transform: tooltipPos === 'center' ? 'translateX(-50%)' : 'none',
    };

    return (
        <nav className="navbar navbar-expand-lg bg-light shadow-sm sticky-top py-3">
            <div className="container-fluid px-4 d-flex justify-content-between align-items-center">
                {/* Left – Brand */}
                <Link
                    className="navbar-brand fw-bold fs-4 text-dark text-uppercase"
                    to="/dashboard"
                >
                    EduSync
                </Link>

                {/* Center – Home icon */}
                {user && (
                    <Link
                        to="/dashboard"
                        className="fs-4 text-dark d-flex align-items-center justify-content-center text-decoration-none"
                    >
                        <AiFillHome />
                    </Link>
                )}

                {/* Right – User info & auth */}
                <div className="d-flex align-items-center gap-3">
                    {user ? (
                        <>
                            <div
                                className="position-relative d-flex flex-column align-items-center"
                                onMouseEnter={() => setHovered(true)}
                                onMouseLeave={() => setHovered(false)}
                                ref={nameRef}
                                style={{ cursor: 'pointer' }}
                            >
                                <span className="fw-semibold text-dark fs-13 text-uppercase">
                                    {user.name}
                                </span>
                                {hovered && (
                                    <div
                                        className={`position-absolute top-100 ${tooltipPositionClass[tooltipPos]} mt-2 px-3 py-1 bg-white text-secondary border rounded shadow-sm small`}
                                        style={{ whiteSpace: 'normal', maxWidth: '100px', zIndex: 1050 }}
                                    >
                                        <div style={arrowStyle}></div>
                                        {capitalize(user.role || 'Student')}
                                    </div>
                                )}
                            </div>

                            <button
                                className="btn btn-dark btn-sm d-flex align-items-center gap-1"
                                onClick={handleLogout}
                            >
                                <AiOutlineLogout /> Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link
                                to="/login"
                                className="btn btn-outline-dark btn-sm d-flex align-items-center gap-1"
                            >
                                <AiOutlineLogin /> Login
                            </Link>
                            <Link
                                to="/register"
                                className="btn btn-dark btn-sm d-flex align-items-center gap-1"
                            >
                                <AiOutlineUserAdd /> Sign Up
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;

