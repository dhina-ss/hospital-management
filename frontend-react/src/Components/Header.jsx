import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    useEffect(() => {
        const accessToken = localStorage.getItem('access');
        if (accessToken) {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
    }, [location.pathname]);
    const isLoginPage = location.pathname === '/login';
    const isRegisterPage = location.pathname === '/register';

    const handleLogout = () =>{
        localStorage.removeItem('access')
        localStorage.removeItem('refresh')
        setIsLoggedIn(false)
        navigate('/login')
    }

    const handleLogin = () =>{
        navigate('/login')
    }

    const handleRegister = () =>{
        navigate('/register')
    }
    return (
        <>
            <header className="header">
                <h1>Hospital Management System</h1>
                <div className="head-link">
                    {isLoggedIn ? (
                        <>
                            <button onClick={handleLogout}>Logout</button>
                        </>) : (
                        <>
                            {isLoginPage && <button onClick={handleRegister}>Register</button>}
                            {isRegisterPage && <button onClick={handleLogin}>Login</button>}
                        </>)}
                </div>
            </header>
        </>
    )
}

export default Header
