import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const [userRole, setUserRole] = useState('');
    const [courses, setCourses] = useState([]);
    const [enrolledCourses, setEnrolledCourses] = useState([]);
    const [assessments, setAssessments] = useState([]); // store full assessments array
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const storedUser = JSON.parse(localStorage.getItem('user'));
    const userId = storedUser?.userId || null;

    useEffect(() => {
        if (!storedUser) {
            navigate('/login');
            return;
        }

        if (!storedUser.role) {
            setError('User role is missing. Please login again.');
            setLoading(false);
            return;
        }

        if (!userId) {
            setError('User ID missing. Cannot fetch data.');
            setLoading(false);
            return;
        }

        setUserRole(storedUser.role);
        fetchCourses();

        if (storedUser.role.toLowerCase() === 'student') {
            fetchEnrolledCourses();
            fetchAssessments();
        }
    }, [navigate]);

    const fetchCourses = async () => {
        try {
            const response = await api.get('Courses');
            setCourses(response.data);
        } catch (err) {
            setError('Failed to load courses');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const fetchEnrolledCourses = async () => {
        try {
            const res = await api.get(`/Enrollments/student/${userId}`);
            setEnrolledCourses(res.data);
        } catch (err) {
            console.error('Failed to load enrolled courses:', err);
        }
    };

    const fetchAssessments = async () => {
        try {
            const res = await api.get(`/Assessments`); // Fetch full assessments list
            setAssessments(res.data); // Expecting array of assessments
        } catch (err) {
            console.error('Failed to load assessments:', err);
            setAssessments([]);
        }
    };

    if (loading) return <p className="loading-text">Loading dashboard...</p>;

    if (error) {
        return (
            <div className="error-container">
                <h4>Error</h4>
                <p>{error}</p>
            </div>
        );
    }

    const roleLower = userRole.toLowerCase();
    const enrolledCourseIds = enrolledCourses.map((ec) => ec.courseId);
    const availableCourses = courses.filter(
        (course) => !enrolledCourseIds.includes(course.courseId)
    );

    const maxAssessmentsPerCourse = 5;
    const totalPossibleAssessments = enrolledCourses.length * maxAssessmentsPerCourse;
    const progressPercent =
        totalPossibleAssessments === 0
            ? 0
            : Math.min(100, Math.round((assessments.length / totalPossibleAssessments) * 100));

    const getImageForCourse = (course) =>
        'https://cdn-icons-png.flaticon.com/512/3135/3135755.png';

    return (
        <>
            {/* Google Fonts */}
            <link
                href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap"
                rel="stylesheet"
            />

            <div className="dashboard-container">
                {roleLower === 'student' && (
                    <>
                        <div className="stats-cards">
                            <div className="card enrolled">
                                <h3>Enrolled Courses</h3>
                                <p className="number">{enrolledCourses.length}</p>
                            </div>

                            <div className="card assessments">
                                <h3>Total Assessments</h3>
                                <p className="number">{assessments.length}</p>
                            </div>

                            <div className="card progress">
                                <h3>Progress</h3>
                                <p className="number">{progressPercent}%</p>
                                <div className="progress-bar">
                                    <div
                                        className="progress-fill"
                                        style={{ width: `${progressPercent}%` }}
                                    />
                                </div>
                            </div>
                        </div>

                        <section className="courses-section">
                            <h2>My Courses</h2>
                            {enrolledCourses.length === 0 ? (
                                <p className="empty-msg">You have not enrolled in any courses yet.</p>
                            ) : (
                                <div className="course-grid">
                                    {enrolledCourses.map((course) => (
                                        <div
                                            key={course.courseId}
                                            className="course-card"
                                            onClick={() => navigate(`/my-course/${course.courseId}`)}
                                        >
                                            <img
                                                src={getImageForCourse(course)}
                                                alt={course.title}
                                                className="course-img"
                                            />
                                            <h4>{course.title}</h4>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </section>

                        <section className="courses-section available">
                            <h2>Available Courses</h2>
                            {availableCourses.length === 0 ? (
                                <p className="empty-msg">No courses available to enroll.</p>
                            ) : (
                                <div className="course-grid">
                                    {availableCourses.map((course) => (
                                        <div
                                            key={course.courseId}
                                            className="course-card"
                                            onClick={() => navigate(`/courses/${course.courseId}`)}
                                        >
                                            <img
                                                src={getImageForCourse(course)}
                                                alt={course.title}
                                                className="course-img"
                                            />
                                            <h4>{course.title}</h4>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </section>
                    </>
                )}
                {roleLower === 'instructor' && (
                    <section className="instructor-dashboard">
                        <h2>Instructor Dashboard</h2>

                        <div className="instructor-stats">
                            <div className="stat-card total-courses">
                                <h3>Total Courses Created</h3>
                                <p className="number">{courses.length}</p>
                            </div>

                            <div className="stat-card total-assessments">
                                <h3>Total Assessments</h3>
                                <p className="number">{assessments.length}</p>
                            </div>
                        </div>

                        <section className="instructor-courses-section">
                            <h3>Your Courses</h3>
                            {courses.length === 0 ? (
                                <p className="empty-msg">You have not created any courses yet.</p>
                            ) : (
                                <div className="course-grid">
                                    {courses.map((course) => (
                                        <div
                                            key={course.courseId}
                                            className="course-card"
                                            onClick={() => navigate(`/instructor-course/${course.courseId}`)}
                                        >
                                            <img
                                                src={'https://cdn-icons-png.flaticon.com/512/3135/3135755.png'}
                                                alt={course.title}
                                                className="course-img"
                                            />
                                            <h4>{course.title}</h4>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </section>
                    </section>
                )}

            </div>

            <style>{`
        /* Fonts & Reset */
        .dashboard-container {
          font-family: 'Inter', sans-serif;
          max-width: 1200px;
          margin: 2rem auto 4rem;
          padding: 0 1rem;
          color: #2c3e50;
        }


        .instructor-dashboard {
  margin-top: 2rem;
  color: #34495e;
  font-family: 'Inter', sans-serif;
}

.instructor-dashboard h2 {
  font-weight: 700;
  font-size: 2rem;
  margin-bottom: 1.5rem;
  text-align: center;
}

.instructor-stats {
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}

.stat-card {
  background: linear-gradient(135deg, #f0f8ff, #d6eaff);
  border-radius: 12px;
  padding: 1.8rem 2rem;
  min-width: 200px;
  text-align: center;
  box-shadow: 0 6px 16px rgb(44 62 80 / 0.08);
  cursor: default;
  transition: box-shadow 0.3s ease;
}

.stat-card:hover {
  box-shadow: 0 10px 30px rgb(44 62 80 / 0.15);
}

.stat-card h3 {
  font-weight: 600;
  font-size: 1.1rem;
  margin-bottom: 0.8rem;
  color: #2c3e50;
}

.stat-card .number {
  font-size: 2.8rem;
  font-weight: 700;
  color: #2980b9;
}

.instructor-courses-section h3 {
  font-weight: 600;
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #2c3e50;
}

.empty-msg {
  font-style: italic;
  color: #7f8c8d;
  text-align: center;
  padding: 1rem 0;
}

        .loading-text {
          font-size: 1.2rem;
          text-align: center;
          margin-top: 5rem;
          color: #555;
        }

        .error-container {
          max-width: 400px;
          margin: 5rem auto;
          padding: 2rem;
          border-radius: 8px;
          background: #fdecea;
          color: #b00020;
          text-align: center;
          box-shadow: 0 2px 8px rgb(176 0 32 / 0.2);
        }
        .error-container h4 {
          margin-bottom: 1rem;
        }

        /* Stats Cards */
        .stats-cards {
          display: flex;
          gap: 2rem;
          margin-bottom: 3rem;
          flex-wrap: wrap;
          justify-content: center;
        }

        .stats-cards .card {
          flex: 1;
          min-width: 220px;
          background: linear-gradient(135deg, #ffffff, #f7f9fc);
          border-radius: 12px;
          box-shadow: 0 8px 24px rgb(44 62 80 / 0.1);
          padding: 2rem;
          text-align: center;
          transition: box-shadow 0.3s ease;
          cursor: default;
        }
        .stats-cards .card:hover {
          box-shadow: 0 12px 36px rgb(44 62 80 / 0.2);
        }

        .card.enrolled {
          border-left: 6px solid #2980b9; /* Blue */
        }
        .card.assessments {
          border-left: 6px solid #27ae60; /* Green */
        }
        .card.progress {
          border-left: 6px solid #f39c12; /* Orange */
        }

        .card h3 {
          margin-bottom: 1rem;
          font-weight: 600;
          font-size: 1.2rem;
          letter-spacing: 0.05em;
          color: #34495e;
        }
        .card .number {
          font-size: 3rem;
          font-weight: 700;
          color: #2c3e50;
          margin-bottom: 1rem;
        }

        /* Progress Bar */
        .progress-bar {
          background: #e1e5ea;
          border-radius: 6px;
          height: 12px;
          width: 100%;
          overflow: hidden;
        }
        .progress-fill {
          background: #f39c12;
          height: 100%;
          transition: width 0.5s ease;
          border-radius: 6px 0 0 6px;
        }

        /* Courses Section */
        .courses-section {
          margin-bottom: 3rem;
        }
        .courses-section h2 {
          font-weight: 600;
          font-size: 1.8rem;
          margin-bottom: 1.5rem;
          color: #34495e;
        }
        .empty-msg {
          font-style: italic;
          color: #7f8c8d;
        }

        .course-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 1.5rem;
        }

        .course-card {
          background: #fff;
          border-radius: 12px;
          box-shadow: 0 6px 20px rgb(0 0 0 / 0.05);
          padding: 1rem;
          cursor: pointer;
          transition: transform 0.25s ease, box-shadow 0.25s ease;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }
        .course-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 10px 30px rgb(0 0 0 / 0.1);
        }

        .course-img {
          width: 64px;
          height: 64px;
          margin-bottom: 1rem;
          object-fit: contain;
          filter: drop-shadow(0 1px 1px rgba(0,0,0,0.05));
        }

        .course-card h4 {
          font-weight: 600;
          font-size: 1.1rem;
          color: #2c3e50;
        }

        .instructor-msg {
          font-size: 1.3rem;
          color: #7f8c8d;
          text-align: center;
          margin-top: 5rem;
          font-style: italic;
        }
      `}</style>
        </>
    );
};

export default Dashboard;





