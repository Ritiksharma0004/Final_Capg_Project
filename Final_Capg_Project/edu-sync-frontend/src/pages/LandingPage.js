import React from 'react';
import { FaGraduationCap, FaUsers, FaRocket } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const LandingPage = () => {
    return (
        <div
            style={{
                fontFamily: "'Segoe UI', sans-serif",
                backgroundColor: '#fff',
                minHeight: '100vh',
                overflow: 'hidden',
            }}
        >
            <div className="container text-center d-flex flex-column justify-content-center align-items-center" style={{ height: '100vh' }}>
                <h1 className="fw-bold display-4 mb-3 text-dark">
                    Smart Learning & Assessment
                </h1>
                <p className="text-muted lead mb-4" style={{ maxWidth: '600px' }}>
                    A seamless learning platform for students and instructors to connect, grow, and succeed through interactive tools and smart analytics.
                </p>

                <div className="d-flex gap-4 justify-content-center mb-5 flex-wrap">
                    <Feature icon={<FaGraduationCap size={24} />} title="Learn Smarter" />
                    <Feature icon={<FaUsers size={24} />} title="Collaborate" />
                    <Feature icon={<FaRocket size={24} />} title="Achieve Goals" />
                </div>

                <Link to="/register" className="btn btn-dark px-4 py-2 fw-semibold">
                    Get Started
                </Link>
            </div>
        </div>
    );
};

const Feature = ({ icon, title }) => (
    <div className="d-flex flex-column align-items-center">
        <div className="mb-2 text-primary">{icon}</div>
        <div style={{ fontSize: '0.9rem', fontWeight: '600' }}>{title}</div>
    </div>
);

export default LandingPage;
