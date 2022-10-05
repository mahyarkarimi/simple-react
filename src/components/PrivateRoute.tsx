import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate, Outlet } from 'react-router-dom';

function PrivateRoute({ children }) {
    let auth = useAuth();
    if (!auth.isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return (
        <>
            {children ? (
                children
            ) : (
                <Outlet />
            )}
        </>
    );
}

export default PrivateRoute;
