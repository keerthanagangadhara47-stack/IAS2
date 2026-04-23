import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, HelpCircle, Save } from 'lucide-react';
import Navbar from '../../components/Navbar';

const CreateQuiz = () => {
    const [subjects, setSubjects] = useState([]);
    const [selectedSubject, setSelectedSubject] = useState('');
    const [quizTitle, setQuizTitle] = useState('');
    const [questions, setQuestions] = useState([
        { text: '', options: ['', '', '', ''], correctOption: 0, difficulty: 1 }
    ]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchSubjects = async () => {
            const res = await axios.get('http://localhost:5000/api/subjects');
            setSubjects(res.data.data.subjects);
        };
        fetchSubjects();
    }, []);

    const addQuestion = () => {
        setQuestions([...questions, { text: '', options: ['', '', '', ''], correctOption: 0, difficulty: 1 }]);
    };

    const handleQuestionChange = (index, field, value) => {
        const newQuestions = [...questions];
        newQuestions[index][field] = value;
        setQuestions(newQuestions);
    };

    const handleOptionChange = (qIndex, oIndex, value) => {
        const newQuestions = [...questions];
        newQuestions[qIndex].options[oIndex] = value;
        setQuestions(newQuestions);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            // Logic to save quiz and questions
            // In this demo, we'll just alert success
            alert('Quiz Created Successfully! (API integration in progress)');
            setQuizTitle('');
            setQuestions([{ text: '', options: ['', '', '', ''], correctOption: 0, difficulty: 1 }]);
        } catch (err) {
            alert('Error creating quiz');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <Navbar />
            <main>
                <div style={{ marginBottom: '2rem' }}>
                    <h2 style={{ background: 'none', WebkitTextFillColor: 'white' }}>Create New Quiz</h2>
                    <p style={{ color: 'var(--text-muted)' }}>Draft your questions and publish for students.</p>
                </div>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    <div className="glass-card" style={{ padding: '1.5rem' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                <label>Quiz Title</label>
                                <input 
                                    className="input-field" 
                                    placeholder="e.g. Weekly Polity Mock 1"
                                    value={quizTitle}
                                    onChange={(e) => setQuizTitle(e.target.value)}
                                    required 
                                />
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                <label>Subject</label>
                                <select 
                                    className="input-field"
                                    value={selectedSubject}
                                    onChange={(e) => setSelectedSubject(e.target.value)}
                                    required
                                >
                                    <option value="">Select a Subject</option>
                                    {subjects.map(s => <option key={s._id} value={s._id}>{s.name}</option>)}
                                </select>
                            </div>
                        </div>
                    </div>

                    {questions.map((q, qIndex) => (
                        <div key={qIndex} className="glass-card" style={{ padding: '1.5rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                                <h4 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <HelpCircle size={20} color="var(--primary)" /> Question {qIndex + 1}
                                </h4>
                                <select 
                                    className="input-field" 
                                    style={{ width: '150px' }}
                                    value={q.difficulty}
                                    onChange={(e) => handleQuestionChange(qIndex, 'difficulty', e.target.value)}
                                >
                                    <option value="1">Difficulty 1</option>
                                    <option value="2">Difficulty 2</option>
                                    <option value="3">Difficulty 3</option>
                                    <option value="4">Difficulty 4</option>
                                    <option value="5">Difficulty 5</option>
                                </select>
                            </div>
                            
                            <textarea 
                                className="input-field" 
                                placeholder="Enter your question text..."
                                style={{ marginBottom: '1.5rem', height: '80px' }}
                                value={q.text}
                                onChange={(e) => handleQuestionChange(qIndex, 'text', e.target.value)}
                                required
                            />

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                {q.options.map((opt, oIndex) => (
                                    <div key={oIndex} style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                                        <input 
                                            type="radio" 
                                            name={`q-${qIndex}`} 
                                            checked={q.correctOption === oIndex}
                                            onChange={() => handleQuestionChange(qIndex, 'correctOption', oIndex)}
                                        />
                                        <input 
                                            className="input-field" 
                                            placeholder={`Option ${oIndex + 1}`}
                                            value={opt}
                                            onChange={(e) => handleOptionChange(qIndex, oIndex, e.target.value)}
                                            required
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}

                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <button type="button" className="btn" style={{ background: 'var(--surface)', flex: 1 }} onClick={addQuestion}>
                            <Plus size={18} /> Add Another Question
                        </button>
                        <button type="submit" className="btn btn-primary" style={{ flex: 1 }} disabled={loading}>
                            <Save size={18} /> {loading ? 'Saving...' : 'Publish Quiz'}
                        </button>
                    </div>
                </form>
            </main>
        </div>
    );
};

export default CreateQuiz;
