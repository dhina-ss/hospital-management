import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';


const Register = () => {
    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    const [isLoading, setIsLoading] = useState(false);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [mobilenumber, setMobileNumber] = useState('');
    const [gender, setGender] = useState('Male');
    const [dateofbirth, setDateOfBrth] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();
    const findAge = (dateofbirth) => {
        const today = new Date();
        const birthDate = new Date(dateofbirth)
        return today.getFullYear() - birthDate.getFullYear() - ((today.getMonth(), today.getDay()) < (birthDate.getMonth(), birthDate.getDay()))
    }

    const handleRegister = async (e) => {
        e.preventDefault();
        setIsLoading(true)
        try {
            const userData = { username, email, mobilenumber, gender, dateofbirth, password }
            const response = await axios.post('http://localhost:8000/api/v1/patient-register/', userData)
            setError('')
            navigate('/login')
        } catch (error) {
            setError(error.response.data)
        }finally{
            setIsLoading(false)
        }
    }
    return (
        <>
            <div className="login-container" style={{ margin: '3rem 0' }}>
                <div className="login-info register-info">
                    <h1>Sign up with details</h1>
                    <form onSubmit={handleRegister}>
                        <input type="text" className='mb-md-3 me-md-2' name='username' placeholder='Username' value={username} onChange={(e) => { setUsername(e.target.value) }} autoComplete='on' />
                        <input type="email" className='mb-md-3' name='emailaddress' placeholder='Email Address' value={email} onChange={(e) => { setEmail(e.target.value) }} autoComplete='on' />
                        <input type="tel" className='mb-md-3  me-md-2' name='mobilenumber' placeholder='Mobile Number' value={mobilenumber} onChange={(e) => { setMobileNumber(e.target.value) }} autoComplete='on' />
                        <select type="text" className='mb-md-3' name='gender' value={gender} onChange={(e) => { setGender(e.target.value) }} autoComplete='on'>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Trangender">Trangender</option>
                        </select>
                        <input type="date" className='mb-md-3 me-md-2' name='dateofbirth' placeholder='Date of Birth' value={dateofbirth} onChange={(e) => { setDateOfBrth(e.target.value) }} autoComplete='on' />
                        <div className="input-field" style={{ position: 'relative', display: 'inline' }}>
                            <input type={showPassword ? 'text' : 'password'} placeholder='Password' name='password' value={password} onChange={(e) => { setPassword(e.target.value) }} autoComplete='on' />
                            <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} onClick={togglePasswordVisibility}
                                style={{
                                    position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)',
                                    cursor: 'pointer', color: '#6b6b6b'
                                }} />
                        </div>
                        {error && (
                            Object.entries(error).map(([field, messages], index) => (
                                <p className="error-message" key={index}>
                                    <strong>{field}:</strong> {Array.isArray(messages) ? messages.join(', ') : messages}
                                </p>
                            ))
                        )}
                        <button className='mt-md-3'>{isLoading && <Spinner animation="border" size="sm" role="status"></Spinner>} Register</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Register
