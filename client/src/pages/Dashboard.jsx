import React from 'react';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import { 
    BookOpen, 
    CheckSquare, 
    BarChart2, 
    Users, 
    Calendar,
    Award
} from 'lucide-react';

const StatCard = ({ title, value, icon: Icon, color }) => (
    <div className="glass-card" style={{ padding: '1.5rem', flex: 1, minWidth: '200px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
            <div>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '0.25rem' }}>{title}</p>
                <h3 style={{ fontSize: '1.5rem', margin: 0, color: 'white', background: 'none', WebkitTextFillColor: 'white' }}>{value}</h3>
            </div>
            <div style={{ 
                padding: '0.75rem', 
                borderRadius: '12px', 
                background: `${color}20`, 
                color: color 
            }}>
                <Icon size={24} />
            </div>
        </div>
    </div>
);

const Dashboard = () => {
    const { user } = useAuth();

    const renderStudentView = () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
                <StatCard title="Quizzes Taken" value="12" icon={BookOpen} color="#6366f1" />
                <StatCard title="Average Score" value="78%" icon={Award} color="#10b981" />
                <StatCard title="Weak Topics" value="3" icon={BarChart2} color="#ef4444" />
                <StatCard title="Next Mock Test" value="Tomorrow" icon={Calendar} color="#f59e0b" />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
                <div className="glass-card" style={{ padding: '1.5rem' }}>
                    <h3 style={{ marginBottom: '1.5rem' }}>AI Recommendations</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div style={{ padding: '1rem', background: 'var(--surface)', borderRadius: '0.75rem', borderLeft: '4px solid var(--primary)' }}>
                            <p style={{ fontSize: '0.875rem' }}>Focus on <b>Fundamental Rights</b> today. You missed 3 questions on this in your last quiz.</p>
                        </div>
                        <div style={{ padding: '1rem', background: 'var(--surface)', borderRadius: '0.75rem', borderLeft: '4px solid var(--secondary)' }}>
                            <p style={{ fontSize: '0.875rem' }}>New <b>Current Affairs</b> quiz is available for April Week 3.</p>
                        </div>
                    </div>
                </div>

                <div className="glass-card" style={{ padding: '1.5rem' }}>
                    <h3 style={{ marginBottom: '1.5rem' }}>Quick Actions</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <button 
                            onClick={() => window.location.href = '/student/take-quiz'}
                            className="btn btn-primary" 
                            style={{ height: '100px', flexDirection: 'column' }}
                        >
                            <BookOpen size={24} /> Start Quiz
                        </button>
                        <button className="btn" style={{ height: '100px', flexDirection: 'column', background: 'var(--surface)' }}>
                            <Calendar size={24} /> Planner
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );

    const renderMentorView = () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
                <StatCard title="Assigned Students" value="24" icon={Users} color="#6366f1" />
                <StatCard title="Pending Evaluations" value="8" icon={CheckSquare} color="#f59e0b" />
                <StatCard title="Quizzes Created" value="45" icon={BookOpen} color="#10b981" />
            </div>
            <div className="glass-card" style={{ padding: '1.5rem' }}>
                <h3>Quick Actions</h3>
                <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
                    <button 
                        onClick={() => window.location.href = '/mentor/create-quiz'}
                        className="btn btn-primary"
                    >
                        Create Quiz
                    </button>
                    <button className="btn" style={{ background: 'var(--surface)' }}>
                        Evaluate Answers
                    </button>
                </div>
            </div>
        </div>
    );

    const renderAdminView = () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
                <StatCard title="Total Users" value="1,240" icon={Users} color="#6366f1" />
                <StatCard title="Total Mentors" value="42" icon={Award} color="#accent" />
                <StatCard title="Subjects" value="12" icon={BookOpen} color="#10b981" />
            </div>
            <div className="glass-card" style={{ padding: '1.5rem' }}>
                <h3>Quick Actions</h3>
                <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
                    <button 
                        onClick={() => window.location.href = '/admin/subjects'}
                        className="btn btn-primary"
                    >
                        Manage Subjects
                    </button>
                    <button className="btn" style={{ background: 'var(--surface)' }}>
                        Manage Users
                    </button>
                </div>
            </div>
        </div>
    );

    return (
        <div>
            <Navbar />
            <main>
                <div style={{ marginBottom: '2rem' }}>
                    <h2 style={{ fontSize: '2rem', marginBottom: '0.25rem', background: 'none', WebkitTextFillColor: 'white' }}>
                        Hello, {user?.name} 👋
                    </h2>
                    <p style={{ color: 'var(--text-muted)' }}>
                        Here's what's happening on your {user?.role} dashboard today.
                    </p>
                </div>

                {user?.role === 'student' && renderStudentView()}
                {user?.role === 'mentor' && renderMentorView()}
                {user?.role === 'admin' && renderAdminView()}
            </main>
        </div>
    );
};

export default Dashboard;
