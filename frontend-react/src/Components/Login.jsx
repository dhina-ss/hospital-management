import axios from 'axios';
import {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const userData = { username, password };
        try{
            const response = await axios.post('http://localhost:8000/token/', userData);
            localStorage.setItem('access', response.data.access);
            localStorage.setItem('refresh', response.data.refresh);
            setError('');
            navigate('/');
        }catch(error) {
            localStorage.removeItem('access');
            localStorage.removeItem('refresh');
            setError('Login failed. Please check your credentials.');
        }finally{
            setIsLoading(false);
        }
    }

    useEffect(() =>{
        const accessToken = localStorage.getItem('access');
        if (accessToken) {
            navigate('/dashboard');
        }
    }, [])

    return (
        <>
            <div className="login-container">
                <div className="login-info">
                    <h1>Sign in</h1>
                    <form onSubmit={handleLogin}>
                        <input type="text" className='mb-md-3' placeholder='Username' value={username} onChange={(e)=>{setUsername(e.target.value)}}/>
                        <div className="input-field" style={{ position: 'relative' }}>
                            <input type={showPassword ? 'text' : 'password'} placeholder='Password' id='password' value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
                            <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} onClick={togglePasswordVisibility} 
                                style={{position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', 
                                    cursor: 'pointer', color: '#6b6b6b'}} />
                        </div>
                        {error && <p className="error-message">{error}</p>}
                        <button className='mt-md-3'>{isLoading && <Spinner animation="border" size="sm" role="status"></Spinner>} Login</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Login
