import React, { useState } from "react";
import "./login.css";
import { Link } from "react-router-dom";
import axios from "axios";


function Login() {
    const googleAuth = async (e) => {
        e.preventDefault();
        window.open(
            `${process.env.REACT_APP_API_URL}/auth/google/callback`,
            "_self" // <- This is what makes it open in a new window.
        )
    };

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) =>  {
        e.preventDefault();
        console.log("Submitting form:", { username, password }); // Log form submission data
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
            setMessage(response.data);
        } catch (error) {
            if (error.response) {
                setMessage(error.response.data);
            } else {
                setMessage('Error occurred');
            }
        }
    };

    return (
        <div className="login">
            <div className="loginheader">
                <p>HealSYNC</p>
            </div>
            {/* <Navbar /> */}

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
                        <div className="forgot"><Link to="/forgot" className="no-underline"><p>Forgot Password?</p></Link></div>
                        <div className="button-holder">
                            <button id="lgn-btn" type="submit">Login</button>
                            <p>Or</p>
                            <button id="sign-btn" type="button" onClick={googleAuth}>Sign in using Google</button>
                        </div>
                    </form>
                    <div className="register">
                        <p>Don't have an account? </p>
                        <Link to="/signup">Sign Up</Link>
                    </div>
                </div>
                {message && <p>{message}</p>}
            </div>
        </div>
    );
}

export default Login;
