import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Play, CheckCircle2, ChevronRight, Timer } from 'lucide-react';
import Navbar from '../../components/Navbar';

const TakeQuiz = () => {
    const [subjects, setSubjects] = useState([]);
    const [activeQuiz, setActiveQuiz] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [results, setResults] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchSubjects = async () => {
            const res = await axios.get('http://localhost:5000/api/subjects');
            setSubjects(res.data.data.subjects);
        };
        fetchSubjects();
    }, []);

    const startQuiz = async (subjectId) => {
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            const res = await axios.post('http://localhost:5000/api/quizzes/generate', 
                { subjectId, numQuestions: 5 },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setActiveQuiz(res.data.data.questions);
            setCurrentIndex(0);
        } catch (err) {
            alert('Error starting quiz');
        } finally {
            setLoading(false);
        }
    };

    const handleNext = () => {
        if (currentIndex < activeQuiz.length - 1) {
            setCurrentIndex(currentIndex + 1);
            setSelectedOption(null);
        } else {
            setResults({ score: 4, total: activeQuiz.length }); // Mock results
        }
    };

    if (results) {
        return (
            <div>
                <Navbar />
                <main style={{ textAlign: 'center', paddingTop: '4rem' }}>
                    <div className="glass-card" style={{ padding: '3rem', maxWidth: '500px', margin: '0 auto' }}>
                        <CheckCircle2 size={64} color="var(--success)" style={{ marginBottom: '1.5rem' }} />
                        <h2 style={{ background: 'none', WebkitTextFillColor: 'white' }}>Quiz Completed!</h2>
                        <p style={{ fontSize: '1.5rem', margin: '1rem 0' }}>Score: {results.score} / {results.total}</p>
                        <button className="btn btn-primary" onClick={() => window.location.href = '/'}>Back to Dashboard</button>
                    </div>
                </main>
            </div>
        );
    }

    if (activeQuiz) {
        const q = activeQuiz[currentIndex];
        return (
            <div>
                <Navbar />
                <main>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
                        <p style={{ color: 'var(--text-muted)' }}>Question {currentIndex + 1} of {activeQuiz.length}</p>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--warning)' }}>
                            <Timer size={18} /> 14:55
                        </div>
                    </div>

                    <div className="glass-card" style={{ padding: '2rem', marginBottom: '2rem' }}>
                        <h3 style={{ fontSize: '1.5rem', marginBottom: '2rem', background: 'none', WebkitTextFillColor: 'white' }}>
                            {q.text}
                        </h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {q.options.map((opt, i) => (
                                <button 
                                    key={i}
                                    className="glass-card"
                                    style={{ 
                                        padding: '1.25rem', 
                                        textAlign: 'left', 
                                        cursor: 'pointer',
                                        background: selectedOption === i ? 'rgba(99, 102, 241, 0.2)' : 'var(--glass)',
                                        borderColor: selectedOption === i ? 'var(--primary)' : 'var(--glass-border)'
                                    }}
                                    onClick={() => setSelectedOption(i)}
                                >
                                    {String.fromCharCode(65 + i)}. {opt}
                                </button>
                            ))}
                        </div>
                    </div>

                    <button 
                        className="btn btn-primary" 
                        style={{ float: 'right' }} 
                        disabled={selectedOption === null}
                        onClick={handleNext}
                    >
                        {currentIndex === activeQuiz.length - 1 ? 'Finish' : 'Next Question'} <ChevronRight size={18} />
                    </button>
                </main>
            </div>
        );
    }

    return (
        <div>
            <Navbar />
            <main>
                <div style={{ marginBottom: '2rem' }}>
                    <h2 style={{ background: 'none', WebkitTextFillColor: 'white' }}>Select Subject</h2>
                    <p style={{ color: 'var(--text-muted)' }}>Pick a topic to start your adaptive mock test.</p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
                    {subjects.map(subject => (
                        <div key={subject._id} className="glass-card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <h3 style={{ margin: 0 }}>{subject.name}</h3>
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', flex: 1 }}>{subject.description}</p>
                            <button className="btn btn-primary" onClick={() => startQuiz(subject._id)} disabled={loading}>
                                <Play size={18} /> {loading ? 'Loading...' : 'Start Mock Test'}
                            </button>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
};

export default TakeQuiz;
