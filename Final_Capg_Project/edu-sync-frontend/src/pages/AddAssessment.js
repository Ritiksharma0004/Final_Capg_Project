//import React, { useState } from 'react';
//import axios from 'axios';

//const AddAssessment = () => {
//    const [formData, setFormData] = useState({
//        courseId: '',
//        title: '',
//        maxScore: '',
//    });

//    const [questions, setQuestions] = useState(['']);

//    const handleChange = (e) => {
//        setFormData(prev => ({
//            ...prev,
//            [e.target.name]: e.target.value,
//        }));
//    };

//    const handleQuestionChange = (index, value) => {
//        const updated = [...questions];
//        updated[index] = value;
//        setQuestions(updated);
//    };

//    const addQuestion = () => setQuestions(prev => [...prev, '']);

//    const removeQuestion = (index) => {
//        if (questions.length === 1) return; // at least one question
//        const updated = [...questions];
//        updated.splice(index, 1);
//        setQuestions(updated);
//    };

//    const handleSubmit = async (e) => {
//        e.preventDefault();

//        if (!formData.courseId.trim() || !formData.title.trim() || !formData.maxScore) {
//            alert('Please fill in all fields.');
//            return;
//        }
//        if (questions.some(q => !q.trim())) {
//            alert('Please fill in all questions.');
//            return;
//        }

//        const payload = {
//            courseId: formData.courseId.trim(),
//            title: formData.title.trim(),
//            questions: JSON.stringify(questions),  // <-- key fix here
//            maxScore: Number(formData.maxScore),
//        };

//        try {
//            await axios.post('https://localhost:7180/api/Assessments', payload);
//            alert('Assessment submitted successfully!');
//            setFormData({ courseId: '', title: '', maxScore: '' });
//            setQuestions(['']);
//        } catch (error) {
//            alert(`Failed to submit assessment: ${error.response ? JSON.stringify(error.response.data) : error.message}`);
//        }
//    };


//    return (
//        <div className="container mt-5">
//            <h2>Add Assessment</h2>
//            <form onSubmit={handleSubmit}>
//                <div className="mb-3">
//                    <label htmlFor="courseId" className="form-label">Course ID</label>
//                    <input
//                        type="text"
//                        id="courseId"
//                        name="courseId"
//                        className="form-control"
//                        value={formData.courseId}
//                        onChange={handleChange}
//                        placeholder="Enter Course GUID"
//                        required
//                    />
//                </div>

//                <div className="mb-3">
//                    <label htmlFor="title" className="form-label">Title</label>
//                    <input
//                        type="text"
//                        id="title"
//                        name="title"
//                        className="form-control"
//                        value={formData.title}
//                        onChange={handleChange}
//                        placeholder="Assessment Title"
//                        required
//                    />
//                </div>

//                <div className="mb-3">
//                    <label className="form-label">Questions</label>
//                    {questions.map((question, index) => (
//                        <div className="input-group mb-2" key={index}>
//                            <input
//                                type="text"
//                                className="form-control"
//                                placeholder={`Question ${index + 1}`}
//                                value={question}
//                                onChange={(e) => handleQuestionChange(index, e.target.value)}
//                                required
//                            />
//                            <button
//                                type="button"
//                                className="btn btn-danger"
//                                onClick={() => removeQuestion(index)}
//                                disabled={questions.length === 1}
//                            >
//                                Remove
//                            </button>
//                        </div>
//                    ))}
//                    <button type="button" className="btn btn-secondary" onClick={addQuestion}>
//                        Add Question
//                    </button>
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
//                        placeholder="Enter maximum score"
//                        min="1"
//                        required
//                    />
//                </div>

//                <button type="submit" className="btn btn-primary">
//                    Submit Assessment
//                </button>
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

    const [questions, setQuestions] = useState(['']);

    useEffect(() => {
        const pathParts = window.location.pathname.split('/');
        const idFromUrl = pathParts[pathParts.length - 2]; // second last part
        setFormData(prev => ({ ...prev, courseId: idFromUrl }));
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleQuestionChange = (index, value) => {
        const updated = [...questions];
        updated[index] = value;
        setQuestions(updated);
    };

    const addQuestion = () => setQuestions(prev => [...prev, '']);

    const removeQuestion = (index) => {
        if (questions.length === 1) return;
        const updated = [...questions];
        updated.splice(index, 1);
        setQuestions(updated);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.courseId.trim() || !formData.title.trim() || !formData.maxScore) {
            alert('Please fill in all fields.');
            return;
        }
        if (questions.some(q => !q.trim())) {
            alert('Please fill in all questions.');
            return;
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
            setFormData({ courseId: formData.courseId, title: '', maxScore: '' });
            setQuestions(['']);
        } catch (error) {
            alert(`Failed to submit assessment: ${error.response ? JSON.stringify(error.response.data) : error.message}`);
        }
    };

    return (
        <div className="container mt-5">
            <h2>Add Assessment</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="courseId" className="form-label">Course ID</label>
                    <input
                        type="text"
                        id="courseId"
                        name="courseId"
                        className="form-control"
                        value={formData.courseId}
                        readOnly
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        className="form-control"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="Assessment Title"
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Questions</label>
                    {questions.map((question, index) => (
                        <div className="input-group mb-2" key={index}>
                            <input
                                type="text"
                                className="form-control"
                                placeholder={`Question ${index + 1}`}
                                value={question}
                                onChange={(e) => handleQuestionChange(index, e.target.value)}
                                required
                            />
                            <button
                                type="button"
                                className="btn btn-danger"
                                onClick={() => removeQuestion(index)}
                                disabled={questions.length === 1}
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                    <button type="button" className="btn btn-secondary" onClick={addQuestion}>
                        Add Question
                    </button>
                </div>

                <div className="mb-3">
                    <label htmlFor="maxScore" className="form-label">Max Score</label>
                    <input
                        type="number"
                        id="maxScore"
                        name="maxScore"
                        className="form-control"
                        value={formData.maxScore}
                        onChange={handleChange}
                        placeholder="Enter maximum score"
                        min="1"
                        required
                    />
                </div>

                <button type="submit" className="btn btn-primary">
                    Submit Assessment
                </button>
            </form>
        </div>
    );
};

export default AddAssessment;

