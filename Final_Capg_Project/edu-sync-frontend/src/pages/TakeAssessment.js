//import React, { useEffect, useState } from 'react';
//import { useParams } from 'react-router-dom';
//import api from '../services/api';

//const TakeAssessment = () => {
//    const { courseId, assessmentId } = useParams();

//    const [assessment, setAssessment] = useState(null);
//    const [questions, setQuestions] = useState([]);
//    const [loading, setLoading] = useState(true);
//    const [error, setError] = useState('');
//    const [selectedAnswers, setSelectedAnswers] = useState({});
//    const [score, setScore] = useState(null);
//    const [submitting, setSubmitting] = useState(false);
//    const [timeLeft, setTimeLeft] = useState(300); // Default 5 min timer

//    const user = JSON.parse(localStorage.getItem('user'));
//    const userId = user?.userId || 'user-unique-id-placeholder';
//    const username = user?.username || 'Ritik Sharma';

//    useEffect(() => {
//        const fetchAssessments = async () => {
//            try {
//                const res = await api.get('/Assessments');
//                const allAssessments = res.data;

//                const foundAssessment = allAssessments.find(
//                    (a) => a.assessmentId === assessmentId && a.courseId === courseId
//                );

//                if (!foundAssessment) {
//                    setError('Assessment not found for this course.');
//                    setLoading(false);
//                    return;
//                }

//                setAssessment(foundAssessment);
//                const parsedQuestions = JSON.parse(foundAssessment.questions || '[]');
//                setQuestions(parsedQuestions);

//                // Optional: use duration from assessment
//                if (foundAssessment.durationInMinutes) {
//                    setTimeLeft(foundAssessment.durationInMinutes * 60);
//                }

//            } catch (err) {
//                console.error(err);
//                setError('Failed to load assessments.');
//            } finally {
//                setLoading(false);
//            }
//        };

//        if (assessmentId && courseId) {
//            fetchAssessments();
//        } else {
//            setError('Invalid URL parameters.');
//            setLoading(false);
//        }
//    }, [assessmentId, courseId]);

//    useEffect(() => {
//        if (score !== null || submitting) return;

//        if (timeLeft <= 0) {
//            handleSubmit(); // Auto-submit
//            return;
//        }

//        const timer = setInterval(() => {
//            setTimeLeft((prev) => prev - 1);
//        }, 1000);

//        return () => clearInterval(timer);
//    }, [timeLeft, score, submitting]);

//    const formatTime = (seconds) => {
//        const mins = Math.floor(seconds / 60);
//        const secs = seconds % 60;
//        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
//    };

//    const handleAnswerChange = (questionIndex, selectedOptionIndex) => {
//        if (score !== null || submitting) return;
//        setSelectedAnswers((prev) => ({
//            ...prev,
//            [questionIndex]: selectedOptionIndex,
//        }));
//    };

//    const handleSubmit = async () => {
//        if (submitting || score !== null) return;

//        setSubmitting(true);

//        setTimeout(async () => {
//            let calculatedScore = 0;
//            questions.forEach((q, idx) => {
//                const selectedIndex = selectedAnswers[idx];
//                if (selectedIndex !== undefined && selectedIndex === q.correctOptionIndex) {
//                    calculatedScore += 1;
//                }
//            });

//            setScore(calculatedScore);

//            const resultData = {
//                assessmentId: assessment.assessmentId,
//                userId: userId,
//                score: calculatedScore,
//                attemptDate: new Date().toISOString(),
//            };

//            try {
//                await api.post('/Results', resultData, {
//                    headers: {
//                        'Content-Type': 'application/json',
//                    },
//                });

//                console.log('Result saved successfully');
//            } catch (err) {
//                console.error('Failed to save results:', err.response?.data || err.message);
//            }

//            setSubmitting(false);
//        }, 1500);
//    };

//    const totalAnswered = Object.keys(selectedAnswers).length;
//    const totalQuestions = questions.length;

//    if (loading)
//        return (
//            <div className="d-flex flex-column align-items-center mt-5">
//                <div className="spinner-border text-primary" role="status" style={{ width: '3rem', height: '3rem' }} />
//                <small className="mt-3 fs-5 text-secondary">Loading assessment...</small>
//            </div>
//        );

//    if (error)
//        return (
//            <div className="alert alert-danger text-center mt-5 fs-5">
//                <strong>{error}</strong>
//            </div>
//        );

//    if (!assessment)
//        return <div className="text-center mt-5 fs-5">Assessment not found.</div>;

//    return (
//        <div className="container-fluid">
//            <div className="row">
//                {/* Sidebar - fixed to the left */}
//                <div className="col-md-4 col-lg-3 bg-light vh-100 position-sticky top-0 p-4 shadow-sm border-end">
//                    <h2 className="fw-bold">{username}</h2>
//                    <h5 className="text-muted">
//                        {score !== null
//                            ? `Score: ${score} / ${totalQuestions}`
//                            : submitting
//                                ? 'Submitting...'
//                                : 'Assessment in progress'}
//                    </h5>
//                    <small className="text-muted d-block mb-3">
//                        {totalAnswered} of {totalQuestions} answered
//                    </small>
//                    {score === null && !submitting && (
//                        <div className="badge bg-dark text-white fs-6 px-3 py-2 rounded-pill shadow-sm">
//                            ⏳ {formatTime(timeLeft)}
//                        </div>
//                    )}
//                    <hr />
//                    <p className="fw-semibold mb-1">Assessment:</p>
//                    <p className="text-truncate" title={assessment.title}>{assessment.title}</p>
//                </div>

//                {/* Main Content - scrollable question section */}
//                <div className="col-md-8 col-lg-9 p-4 overflow-auto" style={{ maxHeight: '100vh' }}>
//                    {questions.length > 0 ? (
//                        questions.map((q, idx) => {
//                            const userAnswerIndex = selectedAnswers[idx];
//                            const isCorrect = userAnswerIndex === q.correctOptionIndex;

//                            return (
//                                <div
//                                    key={q.questionText || idx}
//                                    className={`card mb-4 shadow-sm rounded-4 ${score !== null
//                                        ? isCorrect
//                                            ? 'border-success'
//                                            : 'border-danger'
//                                        : 'border-secondary'
//                                        }`}
//                                >
//                                    <div className="card-body">
//                                        <h5 className="card-title mb-3">
//                                            Q{idx + 1}: {q.questionText}
//                                        </h5>

//                                        <div className="list-group">
//                                            {q.options.map((opt, i) => {
//                                                const isSelected = userAnswerIndex === i;

//                                                let variant = '';
//                                                let icon = null;

//                                                if (score !== null) {
//                                                    if (i === q.correctOptionIndex) {
//                                                        variant = 'list-group-item-success';
//                                                        icon = '✔️';
//                                                    } else if (isSelected && !isCorrect) {
//                                                        variant = 'list-group-item-danger';
//                                                        icon = '✘';
//                                                    }
//                                                } else if (isSelected) {
//                                                    variant = 'list-group-item-primary';
//                                                }

//                                                return (
//                                                    <button
//                                                        key={opt + i}
//                                                        type="button"
//                                                        className={`list-group-item list-group-item-action d-flex justify-content-between align-items-center ${variant}`}
//                                                        onClick={() => handleAnswerChange(idx, i)}
//                                                        disabled={score !== null || submitting}
//                                                        aria-pressed={isSelected}
//                                                    >
//                                                        <span>{opt}</span>
//                                                        <span style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>
//                                                            {icon}
//                                                        </span>
//                                                    </button>
//                                                );
//                                            })}
//                                        </div>
//                                    </div>
//                                </div>
//                            );
//                        })
//                    ) : (
//                        <p className="text-center fs-5">No questions found.</p>
//                    )}

//                    {score === null ? (
//                        <button
//                            className="btn btn-primary w-100 py-3 fs-5 rounded-pill shadow-sm"
//                            onClick={handleSubmit}
//                            disabled={totalAnswered !== totalQuestions || submitting}
//                            title={totalAnswered !== totalQuestions ? 'Please answer all questions' : 'Submit your answers'}
//                        >
//                            {submitting && (
//                                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true" />
//                            )}
//                            Submit Answers
//                        </button>
//                    ) : (
//                        <div className="alert alert-success text-center fs-5 mt-4 rounded-4 shadow" role="alert">
//                            🎉 You scored <strong>{score}</strong> out of <strong>{questions.length}</strong>!
//                        </div>
//                    )}
//                </div>
//            </div>
//        </div>

//    );
//};

//export default TakeAssessment;


import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';

const TakeAssessment = () => {
    const { courseId, assessmentId } = useParams();

    const [assessment, setAssessment] = useState(null);
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [score, setScore] = useState(null);
    const [submitting, setSubmitting] = useState(false);
    const [timeLeft, setTimeLeft] = useState(900);

    const user = JSON.parse(localStorage.getItem('user'));
    const userId = user?.userId || 'user-unique-id-placeholder';
    const username = user?.username || 'Ritik Sharma';

    useEffect(() => {
        const fetchAssessments = async () => {
            try {
                const res = await api.get('/Assessments');
                const allAssessments = res.data;

                const foundAssessment = allAssessments.find(
                    (a) => a.assessmentId === assessmentId && a.courseId === courseId
                );

                if (!foundAssessment) {
                    setError('Assessment not found for this course.');
                    setLoading(false);
                    return;
                }

                setAssessment(foundAssessment);
                const parsedQuestions = JSON.parse(foundAssessment.questions || '[]');
                setQuestions(parsedQuestions);

                if (foundAssessment.durationInMinutes) {
                    setTimeLeft(foundAssessment.durationInMinutes * 60);
                }
            } catch (err) {
                console.error(err);
                setError('Failed to load assessments.');
            } finally {
                setLoading(false);
            }
        };

        if (assessmentId && courseId) {
            fetchAssessments();
        } else {
            setError('Invalid URL parameters.');
            setLoading(false);
        }
    }, [assessmentId, courseId]);

    useEffect(() => {
        if (score !== null || submitting) return;
        if (timeLeft <= 0) {
            handleSubmit();
            return;
        }

        const timer = setInterval(() => {
            setTimeLeft((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [timeLeft, score, submitting]);

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const handleAnswerChange = (questionIndex, selectedOptionIndex) => {
        if (score !== null || submitting) return;
        setSelectedAnswers((prev) => ({
            ...prev,
            [questionIndex]: selectedOptionIndex,
        }));
    };

    const handleSubmit = async () => {
        if (submitting || score !== null) return;

        setSubmitting(true);

        setTimeout(async () => {
            let calculatedScore = 0;
            questions.forEach((q, idx) => {
                const selectedIndex = selectedAnswers[idx];
                if (selectedIndex !== undefined && selectedIndex === q.correctOptionIndex) {
                    calculatedScore += 1;
                }
            });

            setScore(calculatedScore);

            const resultData = {
                assessmentId: assessment.assessmentId,
                userId: userId,
                score: calculatedScore,
                attemptDate: new Date().toISOString(),
            };

            try {
                await api.post('/Results', resultData, {
                    headers: { 'Content-Type': 'application/json' },
                });
                console.log('Result saved successfully');
            } catch (err) {
                console.error('Failed to save results:', err.response?.data || err.message);
            }

            setSubmitting(false);
        }, 1500);
    };

    const totalAnswered = Object.keys(selectedAnswers).length;
    const totalQuestions = questions.length;

    if (loading) {
        return (
            <div className="d-flex flex-column align-items-center mt-5">
                <div className="spinner-border text-primary" role="status" style={{ width: '3rem', height: '3rem' }} />
                <small className="mt-3 fs-5 text-secondary">Loading assessment...</small>
            </div>
        );
    }

    if (error) {
        return (
            <div className="alert alert-danger text-center mt-5 fs-5">
                <strong>{error}</strong>
            </div>
        );
    }

    return (
        <div className="container-fluid">
            <div className="row">
                {/* Sidebar */}
                <div
                    className="col-md-4 bg-light border-end d-flex flex-column justify-content-between"
                    style={{ height: '100vh', position: 'sticky', top: 0 }}
                >
                    <div className="p-4">
                        <h2 className="fw-bold">{username}</h2>
                        <h5 className="text-muted">
                            {score !== null
                                ? `Score: ${score} / ${totalQuestions}`
                                : submitting
                                    ? 'Submitting...'
                                    : 'Assessment in progress'}
                        </h5>
                        <p className="text-muted">{totalAnswered} of {totalQuestions} answered</p>
                        {score === null && !submitting && (
                            <div className="badge bg-dark text-white fs-6 px-3 py-2 rounded-pill shadow-sm">
                                ⏳ Time Left: {formatTime(timeLeft)}
                            </div>
                        )}
                    </div>
                    <div className="p-4 border-top">
                        {score === null ? (
                            <button
                                className="btn btn-success btn-sm w-100 rounded-pill"
                                onClick={handleSubmit}
                                disabled={totalAnswered !== totalQuestions || submitting}
                            >
                                {submitting && (
                                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true" />
                                )}
                                Submit
                            </button>
                        ) : (
                            <div className="alert alert-success text-center fs-6 mt-2 rounded-4 shadow-sm mb-0" role="alert">
                                🎉 You scored <strong>{score}</strong> out of <strong>{questions.length}</strong>!
                            </div>
                        )}
                    </div>
                </div>

                {/* Questions Section */}
                <div className="col-md-8 p-4" style={{ height: '100vh', overflowY: 'auto' }}>
                    <h1 className="h4 fw-bold mb-4 text-center" title={assessment.title}>
                        {assessment.title}
                    </h1>

                    {questions.length > 0 ? (
                        questions.map((q, idx) => {
                            const userAnswerIndex = selectedAnswers[idx];
                            const isCorrect = userAnswerIndex === q.correctOptionIndex;

                            return (
                                <div
                                    key={q.questionText || idx}
                                    className={`card mb-4 shadow-sm rounded-4 ${score !== null
                                        ? isCorrect
                                            ? 'border-success'
                                            : 'border-danger'
                                        : 'border-secondary'
                                        }`}
                                >
                                    <div className="card-body">
                                        <h5 className="card-title mb-3">
                                            Q{idx + 1}: {q.questionText}
                                        </h5>
                                        <div className="list-group">
                                            {q.options.map((opt, i) => {
                                                const isSelected = userAnswerIndex === i;
                                                let variant = '';
                                                let icon = null;

                                                if (score !== null) {
                                                    if (i === q.correctOptionIndex) {
                                                        variant = 'list-group-item-success';
                                                        icon = '✔️';
                                                    } else if (isSelected && !isCorrect) {
                                                        variant = 'list-group-item-danger';
                                                        icon = '✘';
                                                    }
                                                } else if (isSelected) {
                                                    variant = 'list-group-item-primary';
                                                }

                                                return (
                                                    <button
                                                        key={opt + i}
                                                        type="button"
                                                        className={`list-group-item list-group-item-action d-flex justify-content-between align-items-center ${variant}`}
                                                        onClick={() => handleAnswerChange(idx, i)}
                                                        disabled={score !== null || submitting}
                                                        aria-pressed={isSelected}
                                                    >
                                                        <span>{opt}</span>
                                                        <span style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>
                                                            {icon}
                                                        </span>
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <p className="text-center fs-5">No questions found.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TakeAssessment;



