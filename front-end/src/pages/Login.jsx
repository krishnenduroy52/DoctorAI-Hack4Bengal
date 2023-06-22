import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import '../css/Signup.css';
import axios from 'axios';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const validateForm = () => {
        if (username.length < 3) {
            toast.error('Username must be of at least 3 characters');
            return false;
        } else if (password.length < 0) {
            toast.error("Password must be of at least 10 characters");
            return false;
        }
        return true;
    };

    const handleSubmitForm = async (e) => {
        e.preventDefault();
        console.log("Btn triggred")
        if (!validateForm()) {
            return;
        }
        else {
            try {
                await axios.post("http://localhost:3000/login", {
                    username,
                    password
                });
                // If the login request is successful, show a success toast message
                toast.success('User logged in successfully!');
                // Navigate to the profile page after a delay
                setTimeout(() => {
                    navigate('/profile');
                }, 2000); // Delay of 2 seconds before navigating
                // Additional actions or redirection can be performed here
            } catch (error) {
                console.log(error);
                if (error.response && error.response.data && error.response.data.error === 'Incorrect password') {
                    toast.error('Incorrect password!');
                } 
                else if(error.response && error.response.data && error.response.data.error === "User not found"){
                    toast.error('Incorrect username password');
                }
                else {
                    // If the login request encounters an error, show an error toast message
                    toast.error('An error occurred while logging in.');
                }
            }
        }
    }

    return (
        <div className="signup-page">
            <div className="left-section">
                <img className="image" src="./Image/signup-page-image.png" alt="Image" />
            </div>
            <div className="right-section">
                <h1>Login to your account</h1>
                <form action='POST'>
                    <label>
                        Username:
                        <input
                            type="text"
                            value={username}
                            name="username"
                            className="form-input"
                            onChange={(e) => setUsername(e.target.value)} />
                    </label>
                    <label>
                        Password:
                        <input type="password" name="password" className="form-input" onChange={(e) => { setPassword(e.target.value) }} placeholder='*****' />
                    </label>
                    <div className="form-footer">
                        <button type="button" className="submit-btn" onClick={handleSubmitForm}>
                            Login
                        </button>
                        <p className="already-account">Don't have an account? <a href="/signup">Sign Up</a></p>

                    </div>
                </form>
            </div>
        </div>
    );
};

export default () => (
    <>
        <ToastContainer
            position="bottom-right"
            theme='colored'
        />
        <Login />
    </>
);
