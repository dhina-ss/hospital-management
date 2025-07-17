import axios from 'axios';
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faSpinner } from '@fortawesome/free-solid-svg-icons';

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const userData = { username, password };
        try{
            const response = await axios.post('http://localhost:8000/token/', userData);
            localStorage.setItem('access', response.data.access);
            localStorage.setItem('refresh', response.data.refresh);
            setError('');
        }catch(error) {
            setError('Login failed. Please check your credentials.');
        }finally{
            setIsLoading(false);
        }
    }

    return (
        <>
            <div className="login-container">
                <div className="login-info">
                    <h1>Sign in with email</h1>
                    <form onSubmit={handleLogin}>
                        <input type="text" className='mb-md-3' placeholder='Username' value={username} onChange={(e)=>{setUsername(e.target.value)}}/>
                        <div className="input-field" style={{ position: 'relative' }}>
                            <input type={showPassword ? 'text' : 'password'} placeholder='Password' id='password' value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
                            <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} onClick={togglePasswordVisibility} 
                                style={{position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', 
                                    cursor: 'pointer', color: '#6b6b6b'}} />
                        </div>
                        {error && <p className="error-message">{error}</p>}
                        <button className='mt-md-3'>{isLoading && <FontAwesomeIcon icon={faSpinner}/>} Login</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Login
