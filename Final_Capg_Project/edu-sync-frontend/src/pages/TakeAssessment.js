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

    const username = 'Ritik Sharma';

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

    const handleAnswerChange = (questionIndex, selectedOptionIndex) => {
        if (score !== null || submitting) return;
        setSelectedAnswers((prev) => ({
            ...prev,
            [questionIndex]: selectedOptionIndex,
        }));
    };

    const handleSubmit = () => {
        setSubmitting(true);

        setTimeout(() => {
            let calculatedScore = 0;
            questions.forEach((q, idx) => {
                const selectedIndex = selectedAnswers[idx];
                if (selectedIndex !== undefined && selectedIndex === q.correctOptionIndex) {
                    calculatedScore += 1;
                }
            });
            setScore(calculatedScore);
            setSubmitting(false);
        }, 1500);
    };

    const totalAnswered = Object.keys(selectedAnswers).length;
    const totalQuestions = questions.length;

    if (loading)
        return (
            <div className="d-flex flex-column align-items-center mt-5">
                <div className="spinner-border text-primary" role="status" style={{ width: '3rem', height: '3rem' }} />
                <small className="mt-3 fs-5 text-secondary">Loading assessment...</small>
            </div>
        );

    if (error)
        return (
            <div className="alert alert-danger text-center mt-5 fs-5">
                <strong>{error}</strong>
            </div>
        );

    if (!assessment)
        return <div className="text-center mt-5 fs-5">Assessment not found.</div>;

    return (
        <div className="container my-5" style={{ maxWidth: '700px' }}>
            <header className="text-center mb-4">
                <h2 className="fw-bold display-6">{username}</h2>
                <h5 className="text-muted">
                    {score !== null
                        ? `Your Score: ${score} / ${totalQuestions}`
                        : submitting
                            ? 'Submitting your answers...'
                            : 'Assessment in progress...'}
                </h5>

                {/* Progress bar */}
                <div className="progress mt-3" style={{ height: '10px', borderRadius: '10px' }}>
                    <div
                        className="progress-bar progress-bar-striped progress-bar-animated"
                        role="progressbar"
                        style={{ width: `${(totalAnswered / totalQuestions) * 100}%` }}
                        aria-valuenow={totalAnswered}
                        aria-valuemin="0"
                        aria-valuemax={totalQuestions}
                    ></div>
                </div>
                <small className="text-muted mt-1">{totalAnswered} of {totalQuestions} answered</small>
            </header>

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

                                        // Determine list group item variant
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

            {score === null ? (
                <button
                    className="btn btn-primary w-100 py-3 fs-5 rounded-pill shadow-sm"
                    onClick={handleSubmit}
                    disabled={totalAnswered !== totalQuestions || submitting}
                    title={totalAnswered !== totalQuestions ? 'Please answer all questions' : 'Submit your answers'}
                >
                    {submitting && (
                        <span
                            className="spinner-border spinner-border-sm me-2"
                            role="status"
                            aria-hidden="true"
                        ></span>
                    )}
                    Submit Answers
                </button>
            ) : (
                <div
                    className="alert alert-success text-center fs-5 mt-4 rounded-4 shadow"
                    role="alert"
                    style={{ letterSpacing: '0.05em' }}
                >
                    🎉 You scored <strong>{score}</strong> out of <strong>{questions.length}</strong>!
                </div>
            )}
        </div>
    );
};

export default TakeAssessment;
