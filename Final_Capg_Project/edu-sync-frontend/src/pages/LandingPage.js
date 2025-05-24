import React from 'react';
import { FaChalkboardTeacher, FaBookOpen, FaLaptopCode } from 'react-icons/fa';

const LandingPage = () => {
    return (
        <div className="bg-light min-vh-100 d-flex flex-column justify-content-center align-items-center text-center px-3">
            <div className="mb-4">
                <h1 className="display-4 fw-bold" style={{ color: '#4e54c8' }}>
                    Welcome to <span className="text-gradient">EduSync</span>
                </h1>
                <p className="lead text-secondary mt-3">
                    Empowering Smart Learning, Seamless Assessments & Growth for Students and Instructors.
                </p>
            </div>

            <div className="row text-start w-100 justify-content-center">
                <div className="col-md-3 m-3 p-4 bg-white rounded-4 shadow-sm">
                    <FaChalkboardTeacher size={40} color="#6c63ff" className="mb-3" />
                    <h5 className="fw-semibold">Instructor Tools</h5>
                    <p className="text-muted">
                        Easily upload courses, create quizzes, and track learner performance.
                    </p>
                </div>

                <div className="col-md-3 m-3 p-4 bg-white rounded-4 shadow-sm">
                    <FaBookOpen size={40} color="#6c63ff" className="mb-3" />
                    <h5 className="fw-semibold">Interactive Learning</h5>
                    <p className="text-muted">
                        Access course material, attempt quizzes, and monitor your own progress.
                    </p>
                </div>

                <div className="col-md-3 m-3 p-4 bg-white rounded-4 shadow-sm">
                    <FaLaptopCode size={40} color="#6c63ff" className="mb-3" />
                    <h5 className="fw-semibold">Seamless Integration</h5>
                    <p className="text-muted">
                        Cloud-based architecture with analytics, security and real-time sync.
                    </p>
                </div>
            </div>

            <footer className="mt-5 text-muted small">
                © 2025 EduSync. All rights reserved.
            </footer>

            <style>{`
                .text-gradient {
                    background: linear-gradient(45deg, #4e54c8, #8f94fb);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                }
            `}</style>
        </div>
    );
};

export default LandingPage;







