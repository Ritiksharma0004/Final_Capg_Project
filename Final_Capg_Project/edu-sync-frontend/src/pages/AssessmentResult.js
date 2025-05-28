//import React, { useEffect, useState } from 'react';
//import api from '../services/api';

//const AssessmentResult = () => {
//    const [courses, setCourses] = useState([]);
//    const [selectedCourse, setSelectedCourse] = useState('');
//    const [assessments, setAssessments] = useState([]);
//    const [selectedAssessment, setSelectedAssessment] = useState('');
//    const [result, setResult] = useState(null);

//    useEffect(() => {
//        const fetchCourses = async () => {
//            const res = await api.get('/Courses');
//            setCourses(res.data);
//        };
//        fetchCourses();
//    }, []);

//    useEffect(() => {
//        if (selectedCourse) {
//            const fetchAssessments = async () => {
//                const res = await api.get('/Assessments');
//                const filtered = res.data.filter(a => a.courseId === selectedCourse);
//                setAssessments(filtered);
//            };
//            fetchAssessments();
//        }
//    }, [selectedCourse]);

//    useEffect(() => {
//        if (selectedAssessment) {
//            const fetchResult = async () => {
//                const res = await api.get(`/Results/${selectedAssessment}`);
//                setResult(res.data);
//            };
//            fetchResult();
//        }
//    }, [selectedAssessment]);

//    return (
//        <div className="container py-5">
//            <h2 className="mb-4">Assessment Results</h2>

//            <div className="mb-3">
//                <label className="form-label">Select Course</label>
//                <select className="form-select" value={selectedCourse} onChange={(e) => {
//                    setSelectedCourse(e.target.value);
//                    setSelectedAssessment('');
//                    setResult(null);
//                }}>
//                    <option value="">-- Select Course --</option>
//                    {courses.map(course => (
//                        <option key={course.courseId} value={course.courseId}>
//                            {course.title.toUpperCase()}
//                        </option>
//                    ))}
//                </select>
//            </div>

//            {assessments.length > 0 && (
//                <div className="mb-4">
//                    <label className="form-label">Select Assessment</label>
//                    <select className="form-select" value={selectedAssessment} onChange={(e) => {
//                        setSelectedAssessment(e.target.value);
//                    }}>
//                        <option value="">-- Select Assessment --</option>
//                        {assessments.map(a => (
//                            <option key={a.assessmentId} value={a.assessmentId}>
//                                {a.title.toUpperCase()}
//                            </option>
//                        ))}
//                    </select>
//                </div>
//            )}

//            {result && (
//                <div className="border p-4 rounded shadow-sm bg-light">
//                    <h4 className="mb-3">Result</h4>
//                    <p><strong>Score:</strong> {result.score}</p>
//                    <p><strong>Total Questions:</strong> {result.totalQuestions}</p>
//                    <p><strong>Correct Answers:</strong> {result.correctAnswers}</p>
//                    <p><strong>Attempt Date:</strong> {new Date(result.date).toLocaleDateString()}</p>
//                </div>
//            )}
//        </div>
//    );
//};

//export default AssessmentResult;



//import React, { useEffect, useState } from 'react';
//import api from '../services/api';

//const AssessmentResult = () => {
//    const [courses, setCourses] = useState([]);
//    const [selectedCourse, setSelectedCourse] = useState('');
//    const [assessments, setAssessments] = useState([]);
//    const [selectedAssessment, setSelectedAssessment] = useState('');
//    const [results, setResults] = useState([]);
//    const [filteredResults, setFilteredResults] = useState([]);

//    // Fetch all courses
//    useEffect(() => {
//        const fetchCourses = async () => {
//            const res = await api.get('/Courses');
//            setCourses(res.data);
//        };
//        fetchCourses();
//    }, []);

//    // Fetch assessments for selected course
//    useEffect(() => {
//        if (selectedCourse) {
//            const fetchAssessments = async () => {
//                const res = await api.get('/Assessments');
//                const filtered = res.data.filter(a => a.courseId === selectedCourse);
//                setAssessments(filtered);
//            };
//            fetchAssessments();
//        }
//    }, [selectedCourse]);

//    // Fetch all results once
//    useEffect(() => {
//        const fetchResults = async () => {
//            const res = await api.get('/Results');
//            setResults(res.data);
//        };
//        fetchResults();
//    }, []);

//    // Filter all results that match the selected assessment
//    useEffect(() => {
//        if (selectedAssessment) {
//            const filtered = results.filter(r => r.assessmentId === selectedAssessment);
//            setFilteredResults(filtered);
//            console.log("Filtered Results:", filtered);
//        }
//    }, [selectedAssessment, results]);

//    return (
//        <div className="container py-5">
//            <h2 className="mb-4">Assessment Results</h2>

//            <div className="mb-3">
//                <label className="form-label">Select Course</label>
//                <select className="form-select" value={selectedCourse} onChange={(e) => {
//                    setSelectedCourse(e.target.value);
//                    setSelectedAssessment('');
//                    setFilteredResults([]);
//                }}>
//                    <option value="">-- Select Course --</option>
//                    {courses.map(course => (
//                        <option key={course.courseId} value={course.courseId}>
//                            {course.title.toUpperCase()}
//                        </option>
//                    ))}
//                </select>
//            </div>

//            {assessments.length > 0 && (
//                <div className="mb-4">
//                    <label className="form-label">Select Assessment</label>
//                    <select className="form-select" value={selectedAssessment} onChange={(e) => {
//                        setSelectedAssessment(e.target.value);
//                    }}>
//                        <option value="">-- Select Assessment --</option>
//                        {assessments.map(a => (
//                            <option key={a.assessmentId} value={a.assessmentId}>
//                                {a.title.toUpperCase()}
//                            </option>
//                        ))}
//                    </select>
//                </div>
//            )}

//            {filteredResults.length > 0 ? (
//                <div className="table-responsive mt-4">
//                    <table className="table table-bordered">
//                        <thead className="table-light">
//                            <tr>
//                                <th>Student Username</th>
//                                <th>Score</th>
//                                <th>Total Questions</th>
//                                <th>Correct Answers</th>
//                                <th>Date</th>
//                            </tr>
//                        </thead>
//                        <tbody>
//                            {filteredResults.map((result, index) => (
//                                <tr key={index}>
//                                    <td>{result.username || 'N/A'}</td>
//                                    <td>{result.score}</td>
//                                    <td>{result.totalQuestions}</td>
//                                    <td>{result.correctAnswers}</td>
//                                    <td>{new Date(result.date).toLocaleDateString()}</td>
//                                </tr>
//                            ))}
//                        </tbody>
//                    </table>
//                </div>
//            ) : selectedAssessment && (
//                <p className="text-danger">No results found for this assessment.</p>
//            )}
//        </div>
//    );
//};

//export default AssessmentResult;



//import React, { useEffect, useState } from 'react';
//import api from '../services/api';
//import '../../src/App.css'

//const AssessmentResult = () => {
//    const [courses, setCourses] = useState([]);
//    const [selectedCourse, setSelectedCourse] = useState('');
//    const [assessments, setAssessments] = useState([]);
//    const [selectedAssessment, setSelectedAssessment] = useState('');
//    const [results, setResults] = useState([]);
//    const [filteredResults, setFilteredResults] = useState([]);
//    const [maxScore, setMaxScore] = useState(0);
//    const [assessmentDate, setAssessmentDate] = useState(null);

//    useEffect(() => {
//        const fetchCourses = async () => {
//            const res = await api.get('/Courses');
//            setCourses(res.data);
//        };
//        fetchCourses();
//    }, []);

//    useEffect(() => {
//        if (selectedCourse) {
//            const fetchAssessments = async () => {
//                const res = await api.get('/Assessments');
//                const filtered = res.data.filter(a => a.courseId === selectedCourse);
//                setAssessments(filtered);
//            };
//            fetchAssessments();
//        } else {
//            setAssessments([]);
//            setSelectedAssessment('');
//        }
//    }, [selectedCourse]);

//    useEffect(() => {
//        const fetchResults = async () => {
//            const res = await api.get('/Results');
//            setResults(res.data);
//        };
//        fetchResults();
//    }, []);

//    useEffect(() => {
//        if (selectedAssessment) {
//            const filtered = results.filter(r => r.assessmentId === selectedAssessment);
//            setFilteredResults(filtered);

//            const selectedAssess = assessments.find(a => a.assessmentId === selectedAssessment);
//            setMaxScore(selectedAssess?.maxScore || 0);
//            setAssessmentDate(selectedAssess?.date ? new Date(selectedAssess.date) : null);
//        } else {
//            setFilteredResults([]);
//            setMaxScore(0);
//            setAssessmentDate(null);
//        }
//    }, [selectedAssessment, results, assessments]);

//    const PASS_THRESHOLD = 50;

//    return (
//        <div className="container py-5" style={{ maxWidth: '900px' }}>
//            <h2 className="mb-4 text-center glass-heading">Assessment Results</h2>

//            <div className="mb-4">
//                <label className="form-label fw-semibold glass-label">Select Course</label>
//                <select
//                    className="form-select glass-select"
//                    value={selectedCourse}
//                    onChange={(e) => {
//                        setSelectedCourse(e.target.value);
//                        setSelectedAssessment('');
//                        setFilteredResults([]);
//                    }}
//                >
//                    <option value="">-- Select Course --</option>
//                    {courses.map(course => (
//                        <option key={course.courseId} value={course.courseId}>
//                            {course.title.toUpperCase()}
//                        </option>
//                    ))}
//                </select>
//            </div>

//            {assessments.length > 0 && (
//                <div className="mb-4">
//                    <label className="form-label fw-semibold glass-label">Select Assessment</label>
//                    <select
//                        className="form-select glass-select"
//                        value={selectedAssessment}
//                        onChange={(e) => setSelectedAssessment(e.target.value)}
//                    >
//                        <option value="">-- Select Assessment --</option>
//                        {assessments.map(a => (
//                            <option key={a.assessmentId} value={a.assessmentId}>
//                                {a.title.toUpperCase()}
//                            </option>
//                        ))}
//                    </select>
//                </div>
//            )}

//            {assessmentDate && (
//                <p className="text-center mb-4 fs-5 glass-date">
//                    <strong>Assessment Date:</strong> {assessmentDate.toLocaleDateString()}
//                </p>
//            )}

//            {filteredResults.length > 0 ? (
//                <div className="table-responsive glass-table-container">
//                    <table className="table glass-table text-center align-middle mb-0">
//                        <thead>
//                            <tr>
//                                <th>Score</th>
//                                <th>Max Score</th>
//                                <th>Percentage (%)</th>
//                                <th>Status</th>
//                            </tr>
//                        </thead>
//                        <tbody>
//                            {filteredResults.map((result, idx) => {
//                                const percentage = maxScore > 0 ? (result.score / maxScore) * 100 : 0;
//                                const isPass = percentage >= PASS_THRESHOLD;
//                                return (
//                                    <tr key={idx} className={isPass ? 'pass-row' : 'fail-row'}>
//                                        <td>{result.score}</td>
//                                        <td>{maxScore}</td>
//                                        <td>{percentage.toFixed(2)}</td>
//                                        <td>
//                                            <span className={`badge ${isPass ? 'bg-success' : 'bg-danger'} fs-6`}>
//                                                {isPass ? 'Pass' : 'Fail'}
//                                            </span>
//                                        </td>
//                                    </tr>
//                                );
//                            })}
//                        </tbody>
//                    </table>
//                </div>
//            ) : selectedAssessment && (
//                <p className="text-muted text-center mt-3">No results available for this assessment.</p>
//            )}
//        </div>
//    );
//};

//export default AssessmentResult;

import React, { useEffect, useState } from 'react';
import api from '../services/api';

const AssessmentResult = () => {
    const [courses, setCourses] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState('');
    const [assessments, setAssessments] = useState([]);
    const [selectedAssessment, setSelectedAssessment] = useState('');
    const [results, setResults] = useState([]);
    const [filteredResults, setFilteredResults] = useState([]);
    const [maxScore, setMaxScore] = useState(0);
    const [assessmentDate, setAssessmentDate] = useState(null);

    useEffect(() => {
        const fetchCourses = async () => {
            const res = await api.get('/Courses');
            setCourses(res.data);
        };
        fetchCourses();
    }, []);

    useEffect(() => {
        if (selectedCourse) {
            const fetchAssessments = async () => {
                const res = await api.get('/Assessments');
                const filtered = res.data.filter(a => a.courseId === selectedCourse);
                setAssessments(filtered);
            };
            fetchAssessments();
        } else {
            setAssessments([]);
            setSelectedAssessment('');
        }
    }, [selectedCourse]);

    useEffect(() => {
        const fetchResults = async () => {
            const res = await api.get('/Results');
            setResults(res.data);
        };
        fetchResults();
    }, []);

    useEffect(() => {
        if (selectedAssessment) {
            const filtered = results.filter(r => r.assessmentId === selectedAssessment);
            setFilteredResults(filtered);

            const selectedAssess = assessments.find(a => a.assessmentId === selectedAssessment);
            setMaxScore(selectedAssess?.maxScore || 0);
            setAssessmentDate(selectedAssess?.date ? new Date(selectedAssess.date) : null);
        } else {
            setFilteredResults([]);
            setMaxScore(0);
            setAssessmentDate(null);
        }
    }, [selectedAssessment, results, assessments]);

    const PASS_THRESHOLD = 50;

    return (
        <div className="container py-5" style={{ maxWidth: '900px' }}>
            <h2 className="mb-4 text-center">Assessment Results</h2>

            <div className="mb-4">
                <label className="form-label fw-semibold">Select Course</label>
                <select
                    className="form-select"
                    value={selectedCourse}
                    onChange={(e) => {
                        setSelectedCourse(e.target.value);
                        setSelectedAssessment('');
                        setFilteredResults([]);
                    }}
                >
                    <option value="">-- Select Course --</option>
                    {courses.map(course => (
                        <option key={course.courseId} value={course.courseId}>
                            {course.title.toUpperCase()}
                        </option>
                    ))}
                </select>
            </div>

            {assessments.length > 0 && (
                <div className="mb-4">
                    <label className="form-label fw-semibold">Select Assessment</label>
                    <select
                        className="form-select"
                        value={selectedAssessment}
                        onChange={(e) => setSelectedAssessment(e.target.value)}
                    >
                        <option value="">-- Select Assessment --</option>
                        {assessments.map(a => (
                            <option key={a.assessmentId} value={a.assessmentId}>
                                {a.title.toUpperCase()}
                            </option>
                        ))}
                    </select>
                </div>
            )}

            {assessmentDate && (
                <p className="text-center mb-4 fs-5">
                    <strong>Assessment Date:</strong> {assessmentDate.toLocaleDateString()}
                </p>
            )}

            {filteredResults.length > 0 ? (
                <div className="table-responsive">
                    <table className="table table-bordered text-center align-middle mb-0">
                        <thead className="table-light">
                            <tr>
                                <th>Score</th>
                                <th>Max Score</th>
                                <th>Percentage (%)</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredResults.map((result, idx) => {
                                const percentage = maxScore > 0 ? (result.score / maxScore) * 100 : 0;
                                const isPass = percentage >= PASS_THRESHOLD;
                                return (
                                    <tr key={idx} className={isPass ? 'table-success' : 'table-danger'}>
                                        <td>{result.score}</td>
                                        <td>{maxScore}</td>
                                        <td>{percentage.toFixed(2)}</td>
                                        <td>
                                            <span className={`badge ${isPass ? 'bg-success' : 'bg-danger'}`}>
                                                {isPass ? 'Pass' : 'Fail'}
                                            </span>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            ) : selectedAssessment && (
                <p className="text-muted text-center mt-3">No results available for this assessment.</p>
            )}
        </div>
    );
};

export default AssessmentResult;

