//import React, { useState, useEffect } from 'react';
//import axios from 'axios';

//const AddAssessment = () => {
//    const [formData, setFormData] = useState({
//        courseId: '',
//        title: '',
//        maxScore: '',
//    });

//    const [questionCount, setQuestionCount] = useState('');
//    const [questions, setQuestions] = useState([]);
//    const [showQuestions, setShowQuestions] = useState(false);

//    useEffect(() => {
//        const pathParts = window.location.pathname.split('/');
//        const idFromUrl = pathParts[pathParts.length - 2];
//        setFormData(prev => ({ ...prev, courseId: idFromUrl }));
//    }, []);

//    const handleChange = (e) => {
//        const { name, value } = e.target;
//        setFormData(prev => ({
//            ...prev,
//            [name]: value,
//        }));
//    };

//    const handleQuestionChange = (index, value) => {
//        const updated = [...questions];
//        updated[index].questionText = value;
//        setQuestions(updated);
//    };

//    const handleOptionChange = (qIndex, optIndex, value) => {
//        const updated = [...questions];
//        updated[qIndex].options[optIndex] = value;
//        setQuestions(updated);
//    };

//    const handleCorrectOptionChange = (qIndex, optIndex) => {
//        const updated = [...questions];
//        updated[qIndex].correctOptionIndex = optIndex;
//        setQuestions(updated);
//    };

//    const addOption = (qIndex) => {
//        const updated = [...questions];
//        updated[qIndex].options.push('');
//        setQuestions(updated);
//    };

//    const removeOption = (qIndex, optIndex) => {
//        const updated = [...questions];
//        if (updated[qIndex].options.length === 1) return;
//        updated[qIndex].options.splice(optIndex, 1);
//        if (updated[qIndex].correctOptionIndex >= updated[qIndex].options.length) {
//            updated[qIndex].correctOptionIndex = 0;
//        }
//        setQuestions(updated);
//    };

//    const generateQuestions = () => {
//        if (!questionCount || isNaN(questionCount) || questionCount < 1) {
//            alert('Please enter a valid number of questions');
//            return;
//        }

//        const tempQuestions = Array.from({ length: Number(questionCount) }, () => ({
//            questionText: '',
//            options: [''],
//            correctOptionIndex: 0
//        }));

//        setQuestions(tempQuestions);
//        setShowQuestions(true);
//    };

//    const handleSubmit = async (e) => {
//        e.preventDefault();

//        if (!formData.courseId.trim() || !formData.title.trim() || !formData.maxScore) {
//            alert('Please fill in all fields.');
//            return;
//        }

//        for (const q of questions) {
//            if (!q.questionText.trim()) {
//                alert('Please fill in all question texts.');
//                return;
//            }
//            if (q.options.some(opt => !opt.trim())) {
//                alert('Please fill in all options for each question.');
//                return;
//            }
//        }

//        const payload = {
//            courseId: formData.courseId.trim(),
//            title: formData.title.trim(),
//            questions: JSON.stringify(questions),
//            maxScore: Number(formData.maxScore),
//        };

//        try {
//            await axios.post('https://localhost:7180/api/Assessments', payload);
//            alert('Assessment submitted successfully!');
//            setFormData(prev => ({ ...prev, title: '', maxScore: '' }));
//            setQuestionCount('');
//            setQuestions([]);
//            setShowQuestions(false);
//        } catch (error) {
//            alert(`Failed to submit assessment: ${error.response ? JSON.stringify(error.response.data) : error.message}`);
//        }
//    };

//    return (
//        <div className="container py-4">
//            <h2 className="mb-4">Add Assessment</h2>

//            <form onSubmit={handleSubmit}>
//                <div className="mb-3">
//                    <label htmlFor="courseId" className="form-label">Course ID</label>
//                    <input
//                        type="text"
//                        id="courseId"
//                        name="courseId"
//                        className="form-control"
//                        value={formData.courseId}
//                        readOnly
//                    />
//                </div>

//                <div className="mb-3">
//                    <label htmlFor="title" className="form-label">Assessment Title</label>
//                    <input
//                        type="text"
//                        id="title"
//                        name="title"
//                        className="form-control"
//                        value={formData.title}
//                        onChange={handleChange}
//                        required
//                    />
//                </div>

//                <div className="mb-3">
//                    <label htmlFor="maxScore" className="form-label">Max Score</label>
//                    <input
//                        type="number"
//                        id="maxScore"
//                        name="maxScore"
//                        className="form-control"
//                        value={formData.maxScore}
//                        onChange={handleChange}
//                        min="1"
//                        required
//                    />
//                </div>

//                {!showQuestions && (
//                    <div className="mb-3">
//                        <label htmlFor="questionCount" className="form-label">How many questions?</label>
//                        <input
//                            type="number"
//                            id="questionCount"
//                            className="form-control"
//                            value={questionCount}
//                            onChange={(e) => setQuestionCount(e.target.value)}
//                            min="1"
//                        />
//                        <button type="button" className="btn btn-outline-primary mt-2" onClick={generateQuestions}>
//                            Generate Questions
//                        </button>
//                    </div>
//                )}

//                {showQuestions && (
//                    <>
//                        <h4 className="mt-4 mb-3">Questions</h4>
//                        {questions.map((q, qIndex) => (
//                            <div key={qIndex} className="card mb-4">
//                                <div className="card-body">
//                                    <div className="mb-3">
//                                        <label className="form-label">Question {qIndex + 1}</label>
//                                        <input
//                                            type="text"
//                                            className="form-control"
//                                            value={q.questionText}
//                                            onChange={(e) => handleQuestionChange(qIndex, e.target.value)}
//                                            required
//                                        />
//                                    </div>

//                                    <label className="form-label">Options (select correct):</label>
//                                    {q.options.map((opt, optIndex) => (
//                                        <div key={optIndex} className="input-group mb-2">
//                                            <div className="input-group-text">
//                                                <input
//                                                    type="radio"
//                                                    name={`correctOption-${qIndex}`}
//                                                    checked={q.correctOptionIndex === optIndex}
//                                                    onChange={() => handleCorrectOptionChange(qIndex, optIndex)}
//                                                />
//                                            </div>
//                                            <input
//                                                type="text"
//                                                className="form-control"
//                                                placeholder={`Option ${optIndex + 1}`}
//                                                value={opt}
//                                                onChange={(e) => handleOptionChange(qIndex, optIndex, e.target.value)}
//                                                required
//                                            />
//                                            <button
//                                                type="button"
//                                                className="btn btn-outline-danger"
//                                                onClick={() => removeOption(qIndex, optIndex)}
//                                                disabled={q.options.length === 1}
//                                            >
//                                                Remove
//                                            </button>
//                                        </div>
//                                    ))}

//                                    <button
//                                        type="button"
//                                        className="btn btn-outline-secondary btn-sm"
//                                        onClick={() => addOption(qIndex)}
//                                    >
//                                        Add Option
//                                    </button>
//                                </div>
//                            </div>
//                        ))}
//                        <button type="submit" className="btn btn-success">
//                            Submit Assessment
//                        </button>
//                    </>
//                )}
//            </form>
//        </div>
//    );
//};

//export default AddAssessment;



import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddAssessment = () => {
    const [formData, setFormData] = useState({
        courseId: '',
        title: '',
        maxScore: '',
    });

    const [questionCount, setQuestionCount] = useState('');
    const [questions, setQuestions] = useState([]);
    const [showQuestions, setShowQuestions] = useState(false);

    useEffect(() => {
        const pathParts = window.location.pathname.split('/');
        const idFromUrl = pathParts[pathParts.length - 2];
        setFormData((prev) => ({ ...prev, courseId: idFromUrl }));
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleQuestionChange = (index, value) => {
        const updated = [...questions];
        updated[index].questionText = value;
        setQuestions(updated);
    };

    const handleOptionChange = (qIndex, optIndex, value) => {
        const updated = [...questions];
        updated[qIndex].options[optIndex] = value;
        setQuestions(updated);
    };

    const handleCorrectOptionChange = (qIndex, optIndex) => {
        const updated = [...questions];
        updated[qIndex].correctOptionIndex = optIndex;
        setQuestions(updated);
    };

    const addOption = (qIndex) => {
        const updated = [...questions];
        updated[qIndex].options.push('');
        setQuestions(updated);
    };

    const removeOption = (qIndex, optIndex) => {
        const updated = [...questions];
        if (updated[qIndex].options.length === 1) return;
        updated[qIndex].options.splice(optIndex, 1);
        if (updated[qIndex].correctOptionIndex >= updated[qIndex].options.length) {
            updated[qIndex].correctOptionIndex = 0;
        }
        setQuestions(updated);
    };

    const generateQuestions = () => {
        if (!questionCount || isNaN(questionCount) || questionCount < 1) {
            alert('Please enter a valid number of questions');
            return;
        }

        const tempQuestions = Array.from({ length: Number(questionCount) }, () => ({
            questionText: '',
            options: [''],
            correctOptionIndex: 0,
        }));

        setQuestions(tempQuestions);
        setShowQuestions(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.courseId.trim() || !formData.title.trim() || !formData.maxScore) {
            alert('Please fill in all fields.');
            return;
        }

        for (const q of questions) {
            if (!q.questionText.trim()) {
                alert('Please fill in all question texts.');
                return;
            }
            if (q.options.some((opt) => !opt.trim())) {
                alert('Please fill in all options for each question.');
                return;
            }
        }

        const payload = {
            courseId: formData.courseId.trim(),
            title: formData.title.trim(),
            questions: JSON.stringify(questions),
            maxScore: Number(formData.maxScore),
        };

        try {
            await axios.post('https://localhost:7180/api/Assessments', payload);
            alert('Assessment submitted successfully!');
            setFormData((prev) => ({ ...prev, title: '', maxScore: '' }));
            setQuestionCount('');
            setQuestions([]);
            setShowQuestions(false);
        } catch (error) {
            alert(`Failed to submit assessment: ${error.response ? JSON.stringify(error.response.data) : error.message}`);
        }
    };

    return (
        <div className="container py-5" style={{ maxWidth: 900 }}>
            <h2 className="mb-4 text-primary fw-bold">Add New Assessment</h2>

            <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow-sm">
                <div className="mb-4">
                    <label htmlFor="courseId" className="form-label fw-semibold">
                        Course ID
                    </label>
                    <input
                        type="text"
                        id="courseId"
                        name="courseId"
                        className="form-control"
                        value={formData.courseId}
                        readOnly
                        style={{ backgroundColor: '#e9ecef' }}
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="title" className="form-label fw-semibold">
                        Assessment Title
                    </label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        className="form-control"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="Enter assessment title"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="maxScore" className="form-label fw-semibold">
                        Maximum Score
                    </label>
                    <input
                        type="number"
                        id="maxScore"
                        name="maxScore"
                        className="form-control"
                        value={formData.maxScore}
                        onChange={handleChange}
                        min="1"
                        placeholder="e.g., 100"
                        required
                    />
                </div>

                {!showQuestions && (
                    <div className="mb-4">
                        <label htmlFor="questionCount" className="form-label fw-semibold">
                            Number of Questions
                        </label>
                        <input
                            type="number"
                            id="questionCount"
                            className="form-control"
                            value={questionCount}
                            onChange={(e) => setQuestionCount(e.target.value)}
                            min="1"
                            placeholder="Enter number of questions"
                        />
                        <button type="button" className="btn btn-outline-primary mt-3" onClick={generateQuestions}>
                            Generate Questions
                        </button>
                    </div>
                )}

                {showQuestions && (
                    <>
                        <h4 className="mb-3 text-secondary">Questions</h4>

                        {questions.map((q, qIndex) => (
                            <div
                                key={qIndex}
                                className="card mb-4 border-0 shadow-sm rounded"
                                style={{ backgroundColor: '#f8f9fa' }}
                            >
                                <div className="card-body">
                                    <div className="mb-3">
                                        <label className="form-label fw-semibold">Question {qIndex + 1}</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={q.questionText}
                                            onChange={(e) => handleQuestionChange(qIndex, e.target.value)}
                                            placeholder="Enter question text"
                                            required
                                        />
                                    </div>

                                    <label className="form-label fw-semibold mb-2">Options (select correct answer):</label>
                                    {q.options.map((opt, optIndex) => (
                                        <div key={optIndex} className="input-group mb-2 align-items-center">
                                            <div className="input-group-text bg-white border-end-0">
                                                <input
                                                    type="radio"
                                                    name={`correctOption-${qIndex}`}
                                                    checked={q.correctOptionIndex === optIndex}
                                                    onChange={() => handleCorrectOptionChange(qIndex, optIndex)}
                                                />
                                            </div>
                                            <input
                                                type="text"
                                                className="form-control border-start-0"
                                                placeholder={`Option ${optIndex + 1}`}
                                                value={opt}
                                                onChange={(e) => handleOptionChange(qIndex, optIndex, e.target.value)}
                                                required
                                            />
                                            <button
                                                type="button"
                                                className="btn btn-outline-danger"
                                                onClick={() => removeOption(qIndex, optIndex)}
                                                disabled={q.options.length === 1}
                                                title="Remove option"
                                            >
                                                &times;
                                            </button>
                                        </div>
                                    ))}

                                    <button
                                        type="button"
                                        className="btn btn-outline-secondary btn-sm mt-2"
                                        onClick={() => addOption(qIndex)}
                                    >
                                        + Add Option
                                    </button>
                                </div>
                            </div>
                        ))}

                        <button type="submit" className="btn btn-success w-100 py-2 fs-5">
                            Submit Assessment
                        </button>
                    </>
                )}
            </form>
        </div>
    );
};

export default AddAssessment;







