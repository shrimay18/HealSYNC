import React, { useState, useEffect, useContext } from "react";
import "./login.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../../Components/Navbar/Navbar";
import { AppContext } from '../../Context/AppContext';

function Login() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const { login } = useContext(AppContext);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            navigate('/dashboard');
        }
    }, [navigate]);

    const googleAuth = (e) => {
        e.preventDefault();
        window.open(
            `${process.env.REACT_APP_API_URL}/auth/google`,
            "_self"
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/login',
                {
                    username: username,
                    password: password
                },
                { 
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );
            if (response.data.success) {
                await login(response.data.token); 
                navigate('/dashboard');
            } else {
                setMessage(response.data.message || 'Login failed');
            }
        } catch (error) {
            console.error('Login error:', error);
            setMessage(error.response?.data?.message || 'Please verify your credentials');
        }
    };

    return (
        <div className="login">
            <Navbar />
            <div className="loginBody">
                <div className="loginblock">
                    <h1>Login</h1>
                    <form className="login-form" onSubmit={handleSubmit}>
                        <div className="username">
                            <label>Username:</label>
                            <input 
                                type="text" 
                                value={username} 
                                placeholder="Username" 
                                onChange={(e) => setUsername(e.target.value)} 
                                required 
                            />
                        </div>
                        <div className="pass">
                            <label>Password:</label>
                            <input 
                                type="password" 
                                value={password} 
                                placeholder="Password" 
                                onChange={(e) => setPassword(e.target.value)} 
                                required 
                            />
                        </div>
                        <div className="button-holder">
                            <button id="lgn-btn" type="submit">Login</button>
                        </div>
                    </form>
                    <div className="register">
                        <p>Don't have an account? </p>
                        <Link to="/signup">Sign Up</Link>
                    </div>
                </div>
                {message && <p className="error-message">{message}</p>}
            </div>
        </div>
    );
}

export default Login;