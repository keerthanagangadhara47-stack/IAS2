import React from 'react';
import { useAuth } from '../context/AuthContext';
import { LogOut, User, Bell } from 'lucide-react';

const Navbar = () => {
    const { user, logout } = useAuth();

    return (
        <nav className="glass-card" style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'between',
            padding: '1rem 1.5rem',
            marginBottom: '1.5rem',
            position: 'sticky',
            top: 0,
            zIndex: 50,
            justifyContent: 'space-between'
        }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{
                    width: '40px',
                    height: '40px',
                    background: 'linear-gradient(135deg, var(--primary), var(--accent))',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 'bold',
                    fontSize: '1.25rem',
                    boxShadow: '0 4px 15px rgba(99, 102, 241, 0.3)'
                }}>
                    U
                </div>
                <h1 style={{ fontSize: '1.25rem', margin: 0 }}>UPSC <span style={{ color: 'var(--primary)' }}>AI</span></h1>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                <button style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
                    <Bell size={20} />
                </button>
                
                <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '0.75rem', 
                    paddingLeft: '1.5rem', 
                    borderLeft: '1px solid var(--glass-border)' 
                }}>
                    <div style={{ textAlign: 'right' }}>
                        <p style={{ fontSize: '0.875rem', fontWeight: 600, margin: 0 }}>{user?.name}</p>
                        <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'capitalize', margin: 0 }}>{user?.role}</p>
                    </div>
                    <div style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        background: 'var(--surface)',
                        border: '1px solid var(--glass-border)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'var(--primary)'
                    }}>
                        <User size={24} />
                    </div>
                    <button 
                        onClick={logout}
                        className="btn"
                        style={{ 
                            padding: '0.5rem', 
                            background: 'rgba(239, 68, 68, 0.1)', 
                            color: 'var(--error)'
                        }}
                        title="Logout"
                    >
                        <LogOut size={20} />
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
