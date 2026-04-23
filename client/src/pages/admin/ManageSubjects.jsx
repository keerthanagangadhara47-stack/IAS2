import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, Trash2, BookOpen } from 'lucide-react';
import Navbar from '../../components/Navbar';

const ManageSubjects = () => {
    const [subjects, setSubjects] = useState([]);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchSubjects();
    }, []);

    const fetchSubjects = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/subjects');
            setSubjects(res.data.data.subjects);
        } catch (err) {
            console.error('Error fetching subjects');
        }
    };

    const handleAddSubject = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            await axios.post('http://localhost:5000/api/subjects', 
                { name, description },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setName('');
            setDescription('');
            fetchSubjects();
        } catch (err) {
            alert(err.response?.data?.message || 'Error adding subject');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <Navbar />
            <main>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                    <h2 style={{ background: 'none', WebkitTextFillColor: 'white' }}>Manage Subjects</h2>
                    <p style={{ color: 'var(--text-muted)' }}>{subjects.length} Subjects Total</p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2rem' }}>
                    {/* Add Form */}
                    <div className="glass-card" style={{ padding: '1.5rem', height: 'fit-content' }}>
                        <h3 style={{ marginBottom: '1.5rem', fontSize: '1.25rem' }}>Add New Subject</h3>
                        <form onSubmit={handleAddSubject} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                <label style={{ fontSize: '0.875rem' }}>Subject Name</label>
                                <input 
                                    className="input-field" 
                                    placeholder="e.g. Modern History"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required 
                                />
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                <label style={{ fontSize: '0.875rem' }}>Description</label>
                                <textarea 
                                    className="input-field" 
                                    placeholder="Brief overview..."
                                    style={{ height: '100px', resize: 'none' }}
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </div>
                            <button className="btn btn-primary" type="submit" disabled={loading}>
                                <Plus size={18} /> {loading ? 'Adding...' : 'Add Subject'}
                            </button>
                        </form>
                    </div>

                    {/* List */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {subjects.map(subject => (
                            <div key={subject._id} className="glass-card" style={{ padding: '1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                    <div style={{ padding: '0.75rem', background: 'var(--surface)', borderRadius: '12px', color: 'var(--primary)' }}>
                                        <BookOpen size={24} />
                                    </div>
                                    <div>
                                        <h4 style={{ margin: 0, fontSize: '1.1rem' }}>{subject.name}</h4>
                                        <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--text-muted)' }}>{subject.description || 'No description'}</p>
                                    </div>
                                </div>
                                <button style={{ background: 'none', border: 'none', color: 'var(--error)', cursor: 'pointer' }}>
                                    <Trash2 size={20} />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default ManageSubjects;
