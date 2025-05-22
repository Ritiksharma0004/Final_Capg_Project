//import React, { useEffect, useState } from 'react';
//import { useParams } from 'react-router-dom';
//import api from '../services/api';

//const TakeAssessment = () => {
//    const { courseId, assessmentId } = useParams();

//    const [assessment, setAssessment] = useState(null);
//    const [questions, setQuestions] = useState([]);
//    const [loading, setLoading] = useState(true);
//    const [error, setError] = useState('');

//    useEffect(() => {
//        const fetchAssessments = async () => {
//            try {
//                // Fetch all assessments
//                const res = await api.get('/Assessments');
//                const allAssessments = res.data;

//                // Find the assessment matching assessmentId and courseId
//                const foundAssessment = allAssessments.find(
//                    (a) => a.id === assessmentId && a.courseId === courseId
//                );

//                if (!foundAssessment) {
//                    setError('Assessment not found for this course.');
//                    setLoading(false);
//                    return;
//                }

//                setAssessment(foundAssessment);

//                // Parse questions JSON string into array
//                const parsedQuestions = JSON.parse(foundAssessment.questions || '[]');
//                setQuestions(parsedQuestions);
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

//    if (loading) return <div className="text-center mt-5">Loading assessment...</div>;
//    if (error) return <div className="text-danger text-center mt-5">{error}</div>;
//    if (!assessment) return <div className="text-center mt-5">Assessment not found.</div>;

//    return (
//        <div className="container mt-5">
//            <h2>{assessment.title}</h2>
//            <p className="text-muted">Max Score: {assessment.maxScore}</p>

//            {questions.length > 0 ? (
//                questions.map((q, idx) => (
//                    <div key={idx} className="mb-4 border p-3 rounded">
//                        <strong>Q{idx + 1}: {q.questionText}</strong>
//                        <div className="mt-2">
//                            {q.options.map((opt, optIdx) => (
//                                <div key={optIdx} className="form-check">
//                                    <input
//                                        type="radio"
//                                        name={`q-${idx}`}
//                                        id={`q-${idx}-opt-${optIdx}`}
//                                        className="form-check-input"
//                                    />
//                                    <label htmlFor={`q-${idx}-opt-${optIdx}`} className="form-check-label">
//                                        {opt}
//                                    </label>
//                                </div>
//                            ))}
//                        </div>
//                    </div>
//                ))
//            ) : (
//                <p>No questions found.</p>
//            )}

//            <button className="btn btn-success">Submit Answers</button>
//        </div>
//    );
//};

//export default TakeAssessment;


//import React, { useEffect, useState } from 'react';
//import { useParams } from 'react-router-dom';
//import api from '../services/api';

//const TakeAssessment = () => {
//    const { courseId, assessmentId } = useParams();

//    const [assessment, setAssessment] = useState(null);
//    const [questions, setQuestions] = useState([]);
//    const [loading, setLoading] = useState(true);
//    const [error, setError] = useState('');

//    useEffect(() => {
//        const fetchAssessments = async () => {
//            try {
//                // Fetch all assessments
//                const res = await api.get('/Assessments');
//                const allAssessments = res.data;

//                // Find the assessment matching assessmentId and courseId
//                const foundAssessment = allAssessments.find(
//                    (a) => a.assessmentId === assessmentId && a.courseId === courseId
//                );

//                if (!foundAssessment) {
//                    setError('Assessment not found for this course.');
//                    setLoading(false);
//                    return;
//                }

//                setAssessment(foundAssessment);

//                // Parse questions JSON string into array
//                const parsedQuestions = JSON.parse(foundAssessment.questions || '[]');
//                setQuestions(parsedQuestions);
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

//    if (loading) return <div className="text-center mt-5">Loading assessment...</div>;
//    if (error) return <div className="text-danger text-center mt-5">{error}</div>;
//    if (!assessment) return <div className="text-center mt-5">Assessment not found.</div>;

//    return (
//        <div className="container mt-5">
//            <h2>{assessment.title}</h2>
//            <p className="text-muted">Max Score: {assessment.maxScore}</p>

//            {questions.length > 0 ? (
//                questions.map((q, idx) => (
//                    <div key={q.questionText || idx} className="mb-4 border p-3 rounded">
//                        <strong>Q{idx + 1}: {q.questionText}</strong>
//                        <div className="mt-2">
//                            {q.options.map((opt, i) => (
//                                <div key={opt + i} className="form-check">
//                                    <input
//                                        type="radio"
//                                        name={`q-${idx}`}
//                                        id={`q-${idx}-opt-${i}`}
//                                        className="form-check-input"
//                                    />
//                                    <label htmlFor={`q-${idx}-opt-${i}`} className="form-check-label">
//                                        {opt}
//                                    </label>
//                                </div>
//                            ))}
//                        </div>
//                    </div>
//                ))
//            ) : (
//                <p>No questions found.</p>
//            )}

//            <button className="btn btn-success">Submit Answers</button>
//        </div>
//    );
//};

//export default TakeAssessment;



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

//    const handleAnswerChange = (questionIndex, selectedOption) => {
//        setSelectedAnswers((prev) => ({
//            ...prev,
//            [questionIndex]: selectedOption,
//        }));
//    };

//    const handleSubmit = () => {
//        let calculatedScore = 0;
//        questions.forEach((q, idx) => {
//            if (selectedAnswers[idx] && selectedAnswers[idx] === q.correctAnswer) {
//                calculatedScore += 1;
//            }
//        });
//        setScore(calculatedScore);
//    };

//    const totalAnswered = Object.keys(selectedAnswers).length;
//    const totalQuestions = questions.length;

//    if (loading) return <div className="text-center mt-5">Loading assessment...</div>;
//    if (error) return <div className="text-danger text-center mt-5">{error}</div>;
//    if (!assessment) return <div className="text-center mt-5">Assessment not found.</div>;

//    return (
//        <div className="container my-5" style={{ maxWidth: '800px' }}>
//            {/* Header */}
//            <header className="mb-4 d-flex justify-content-between align-items-center">
//                <h1
//                    className="h3 fw-bold mb-0"
//                    style={{ fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif', color: '#212529' }}
//                    title={assessment.title}
//                >
//                    {assessment.title}
//                </h1>
//                <div
//                    style={{
//                        fontWeight: '600',
//                        fontSize: '1.1rem',
//                        color: '#495057',
//                        minWidth: '120px',
//                        textAlign: 'right',
//                    }}
//                >
//                    Max Score: <span style={{ fontWeight: '700' }}>{assessment.maxScore}</span>
//                </div>
//            </header>


//            {/* Progress Bar */}
//            <div className="mb-4">
//                <div className="d-flex justify-content-between align-items-center mb-2">
//                    <small className="text-muted fw-semibold">
//                        Answered: {totalAnswered} / {totalQuestions}
//                    </small>
//                    <small className={`fw-bold ${score !== null ? 'text-success' : 'text-primary'}`}>
//                        {score !== null ? 'Assessment Completed' : 'In Progress'}
//                    </small>
//                </div>
//                <div className="progress" style={{ height: '22px', borderRadius: '12px', overflow: 'hidden', boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.2)' }}>
//                    <div
//                        className={`progress-bar ${score !== null ? 'bg-success' : 'bg-primary'}`}
//                        role="progressbar"
//                        style={{
//                            width: `${(totalAnswered / totalQuestions) * 100}%`,
//                            transition: 'width 0.4s ease-in-out',
//                            boxShadow: score !== null ? '0 0 8px #28a745' : '0 0 8px #0d6efd',
//                        }}
//                        aria-valuenow={totalAnswered}
//                        aria-valuemin="0"
//                        aria-valuemax={totalQuestions}
//                    />
//                </div>
//            </div>

//            {/* Questions */}
//            {questions.length > 0 ? (
//                questions.map((q, idx) => {
//                    const userAnswer = selectedAnswers[idx];
//                    const isCorrect = userAnswer === q.correctAnswer;

//                    return (
//                        <div
//                            key={q.questionText || idx}
//                            className={`card mb-4 shadow-sm ${score !== null ? (isCorrect ? 'border-success' : 'border-danger') : ''}`}
//                        >
//                            <div className="card-body">
//                                <h5 className="card-title fw-semibold">
//                                    Q{idx + 1}: {q.questionText}
//                                </h5>
//                                <div className="mt-3">
//                                    {q.options.map((opt, i) => (
//                                        <div key={opt + i} className="form-check">
//                                            <input
//                                                type="radio"
//                                                name={`q-${idx}`}
//                                                id={`q-${idx}-opt-${i}`}
//                                                className="form-check-input"
//                                                disabled={score !== null}
//                                                checked={userAnswer === opt}
//                                                onChange={() => handleAnswerChange(idx, opt)}
//                                            />
//                                            <label htmlFor={`q-${idx}-opt-${i}`} className="form-check-label">
//                                                {opt}
//                                            </label>
//                                        </div>
//                                    ))}
//                                </div>

//                                {/* Show correct/incorrect feedback after submit */}
//                                {score !== null && (
//                                    <div className={`mt-3 fw-bold ${isCorrect ? 'text-success' : 'text-danger'}`}>
//                                        {isCorrect
//                                            ? 'Correct ✔️'
//                                            : (
//                                                <>
//                                                    Incorrect ✘ <br />
//                                                    <small className="text-muted">Correct Answer: {q.correctAnswer}</small>
//                                                </>
//                                            )}
//                                    </div>
//                                )}
//                            </div>
//                        </div>
//                    );
//                })
//            ) : (
//                <p className="text-center">No questions found.</p>
//            )}

//            {/* Submit / Score */}
//            {score === null ? (
//                <button
//                    className="btn btn-primary w-100 py-3 fs-5 rounded-3"
//                    onClick={handleSubmit}
//                    disabled={totalAnswered !== totalQuestions}
//                    title={totalAnswered !== totalQuestions ? 'Please answer all questions' : 'Submit your answers'}
//                >
//                    Submit Answers
//                </button>
//            ) : (
//                <div
//                    className="alert alert-success text-center fs-4 mt-4 rounded-3 shadow"
//                    role="alert"
//                    style={{ letterSpacing: '0.05em' }}
//                >
//                    🎉 You scored <strong>{score}</strong> out of <strong>{questions.length}</strong>!
//                </div>
//            )}
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

    // Store selected option index (number)
    const handleAnswerChange = (questionIndex, selectedOptionIndex) => {
        if (score !== null) return;
        setSelectedAnswers((prev) => ({
            ...prev,
            [questionIndex]: selectedOptionIndex,
        }));
    };

    const handleSubmit = () => {
        let calculatedScore = 0;
        questions.forEach((q, idx) => {
            const selectedIndex = selectedAnswers[idx];
            console.log(`Q${idx + 1}: selected index='${selectedIndex}', correct index='${q.correctOptionIndex}'`);
            if (selectedIndex !== undefined && selectedIndex === q.correctOptionIndex) {
                calculatedScore += 1;
            }
        });
        setScore(calculatedScore);
    };

    const totalAnswered = Object.keys(selectedAnswers).length;
    const totalQuestions = questions.length;

    if (loading) return <div className="text-center mt-5">Loading assessment...</div>;
    if (error) return <div className="text-danger text-center mt-5">{error}</div>;
    if (!assessment) return <div className="text-center mt-5">Assessment not found.</div>;

    return (
        <div className="container my-5" style={{ maxWidth: '800px' }}>
            <header className="mb-4">
                <h2
                    className="fw-bold"
                    style={{ fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif', color: '#212529' }}
                >
                    {username}
                </h2>
                <h5 className="text-secondary">
                    {score !== null
                        ? `Score: ${score} / ${totalQuestions}`
                        : 'Assessment in progress...'}
                </h5>
            </header>

            <h1
                className="h3 fw-bold mb-4"
                style={{ fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif', color: '#212529' }}
                title={assessment.title}
            >
                {assessment.title}
            </h1>

            {questions.length > 0 ? (
                questions.map((q, idx) => {
                    const userAnswerIndex = selectedAnswers[idx];
                    const isCorrect = userAnswerIndex === q.correctOptionIndex;

                    return (
                        <div
                            key={q.questionText || idx}
                            className={`card mb-4 shadow-sm`}
                            style={{
                                borderRadius: '12px',
                                border:
                                    score !== null
                                        ? isCorrect
                                            ? '3px solid #28a745'
                                            : '3px solid #dc3545'
                                        : '1px solid #ddd',
                            }}
                        >
                            <div className="card-body">
                                <h5 className="card-title fw-semibold mb-3">
                                    Q{idx + 1}: {q.questionText}
                                </h5>

                                <div>
                                    {q.options.map((opt, i) => {
                                        const isSelected = userAnswerIndex === i;
                                        let bgColor = '';
                                        let icon = null;

                                        if (score !== null) {
                                            if (i === q.correctOptionIndex) {
                                                // Highlight correct option always after submit
                                                bgColor = 'correct-option';
                                                icon = '✔️';
                                            }
                                            if (isSelected && !isCorrect) {
                                                // Selected wrong option
                                                bgColor = 'incorrect-option';
                                                icon = '✘';
                                            }
                                        } else {
                                            if (isSelected) {
                                                bgColor = 'selected-option';
                                            }
                                        }

                                        return (
                                            <div
                                                key={opt + i}
                                                className={`option-item ${bgColor}`}
                                                style={{ cursor: score === null ? 'pointer' : 'default', userSelect: 'none' }}
                                                onClick={() => handleAnswerChange(idx, i)}
                                                role="button"
                                                tabIndex={0}
                                                onKeyDown={(e) => {
                                                    if ((e.key === 'Enter' || e.key === ' ') && score === null) {
                                                        handleAnswerChange(idx, i);
                                                    }
                                                }}
                                            >
                                                <span className="option-icon" aria-hidden="true">
                                                    {icon}
                                                </span>
                                                <span>{opt}</span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    );
                })
            ) : (
                <p className="text-center">No questions found.</p>
            )}

            {score === null ? (
                <button
                    className="btn btn-primary w-100 py-3 fs-5 rounded-3"
                    onClick={handleSubmit}
                    disabled={totalAnswered !== totalQuestions}
                    title={totalAnswered !== totalQuestions ? 'Please answer all questions' : 'Submit your answers'}
                >
                    Submit Answers
                </button>
            ) : (
                <div
                    className="alert alert-success text-center fs-4 mt-4 rounded-3 shadow"
                    role="alert"
                    style={{ letterSpacing: '0.05em' }}
                >
                    🎉 You scored <strong>{score}</strong> out of <strong>{questions.length}</strong>!
                </div>
            )}

            <style jsx="true">{`
        .option-item {
          display: flex;
          align-items: center;
          padding: 12px 16px;
          margin-bottom: 10px;
          border: 2px solid #ddd;
          border-radius: 8px;
          transition: background-color 0.3s, box-shadow 0.3s, border-color 0.3s;
          font-size: 1rem;
          background-color: #fff;
          user-select: none;
        }
        .option-item:hover {
          background-color: #e9ecef;
          border-color: #adb5bd;
        }
        .selected-option {
          background-color: #cce5ff;
          border-color: #339af0;
          box-shadow: 0 0 8px rgba(51, 154, 240, 0.6);
        }
        .correct-option {
          background-color: #28a745;
          color: white;
          border-color: #1e7e34;
          box-shadow: 0 0 10px #28a745;
          font-weight: 600;
        }
        .incorrect-option {
          background-color: #dc3545;
          color: white;
          border-color: #a71d2a;
          box-shadow: 0 0 10px #dc3545;
          font-weight: 600;
        }
        .option-icon {
          display: inline-block;
          width: 28px;
          font-size: 1.3rem;
          margin-right: 12px;
          user-select: none;
        }
      `}</style>
        </div>
    );
};

export default TakeAssessment;

