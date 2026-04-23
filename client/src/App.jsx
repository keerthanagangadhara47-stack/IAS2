import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';

// Pages
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ManageSubjects from './pages/admin/ManageSubjects';
import CreateQuiz from './pages/mentor/CreateQuiz';
import TakeQuiz from './pages/student/TakeQuiz';

const ProtectedRoute = ({ children, allowedRoles }) => {
    const { user, loading } = useAuth();

    if (loading) return <div>Loading...</div>;
    if (!user) return <Navigate to="/login" />;
    if (allowedRoles && !allowedRoles.includes(user.role)) return <Navigate to="/" />;

    return children;
};

function App() {
    return (
        <AuthProvider>
            <Router>
                <div className="min-h-screen p-4">
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route path="/" element={
                            <ProtectedRoute>
                                <Dashboard />
                            </ProtectedRoute>
                        } />
                        <Route path="/admin/subjects" element={
                            <ProtectedRoute allowedRoles={['admin']}>
                                <ManageSubjects />
                            </ProtectedRoute>
                        } />
                        <Route path="/mentor/create-quiz" element={
                            <ProtectedRoute allowedRoles={['mentor']}>
                                <CreateQuiz />
                            </ProtectedRoute>
                        } />
                        <Route path="/student/take-quiz" element={
                            <ProtectedRoute allowedRoles={['student']}>
                                <TakeQuiz />
                            </ProtectedRoute>
                        } />
                        {/* Add more routes here */}
                    </Routes>
                </div>
            </Router>
        </AuthProvider>
    );
}

export default App;
