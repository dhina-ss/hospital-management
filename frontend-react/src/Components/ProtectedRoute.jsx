import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';

const ProtectedRoute = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    useEffect(() => {
        const validateToken = async () => {
            const accessToken = localStorage.getItem('access');

            if (!accessToken) {
                setIsAuthenticated(false);
                return;
            }
            try {
                const decoded = jwtDecode(accessToken);
                const now = Date.now() / 1000;

                if (decoded.exp < now) {
                    localStorage.removeItem('access');
                    localStorage.removeItem('refresh');
                    setIsAuthenticated(false);
                } else {
                    setIsAuthenticated(true);
                }
            } catch (error) {
                console.error('Token validation failed:', error);
                localStorage.removeItem('access');
                localStorage.removeItem('refresh');
                setIsAuthenticated(false);
            }
        };
        validateToken();
    }, []);

    if (isAuthenticated === null) {
        return <div>Loading...</div>;
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default ProtectedRoute;
