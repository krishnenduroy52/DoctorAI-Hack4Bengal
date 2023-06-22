import React, { useState } from 'react';
import '../css/Signup.css';
import bcrypt from 'bcryptjs';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'


const Signup = () => {
    const [state, setState] = useState({
        username: '',
        email: '',
        phoneNumber: '',
        gender: '',
        age: '',
        password: '',
        confirmPassword: '',
    });

    const handleChange = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value,
        });
    };

    const { username, email, phoneNumber, gender, age, password, confirmPassword } = state;

    const validateForm = () => {
        if (phoneNumber.length < 10) {
            toast.error('Phone Number must be at least 10 characters long.');
            return false;
        }
        if (username.length < 3) {
            toast.error('Username must be at least 3 characters long.');
            return false;
        }
        if (email.trim() === '') {
            toast.error('Please enter an email.');
            return false;
        }
        // if (password.length < 8) {
        //     toast.error('Password must be at least 8 characters long.');
        //     return false;
        // }
        // if (!/[A-Z]/.test(password)) {
        //     toast.error('Password must contain at least one uppercase letter.');
        //     return false;
        // }
        // if (!/[a-z]/.test(password)) {
        //     toast.error('Password must contain at least one lowercase letter.');
        //     return false;
        // }
        // if (!/\d/.test(password)) {
        //     toast.error('Password must contain at least one digit.');
        //     return false;
        // }
        // if (!/[@#$%^&*]/.test(password)) {
        //     toast.error('Password must contain at least one special character (@, #, $, %, ^, &, *).');
        //     return false;
        // }
        if (password !== confirmPassword) {
            toast.error('Passwords do not match.');
            return false;
        }
        return true;
    };


    const handleSubmitForm = async () => {
        if (!validateForm()) {
            return;
        }

        try {
            const hashedPassword = await bcrypt.hash(password, 10);
            await axios.post("http://localhost:3000/signup", {
                username,
                email,
                phoneNumber,
                gender,
                age,
                password: hashedPassword
            })
                .then(res => {
                    console.log(res);
                    console.log(res.data);
                    // Additional actions or redirection can be performed here
                    toast.success('User created successfully!');
                    setTimeout(() => {
                        navigate('/login');
                    }, 2000);
                })
                .catch(error => {
                    // Error message for existing email
                    console.error('Error while sending signup request:', error);
                    if (error.response && error.response.data && error.response.data.error === 'Email already exists') {
                        toast.error('Email already exists. Please use a different email.');
                    }
                    // Error message for existing username
                    else if (error.response && error.response.data && error.response.data.error === 'Username already exists') {
                        toast.error('Username already exists. Please use a different username.');
                    }
                    else {
                        toast.error('An error occurred while signing up.');
                    }
                });
        } catch (error) {
            console.error('Error while sending signup request:', error);
            toast.error('An error occurred while signing up.');
        }
    };





    return (
        <div className="signup-page">
            <div className="left-section">
                <img className="image" src="./Image/signup-page-image.png" alt="Image" />
            </div>
            <div className="right-section">
                <h1>Create your account</h1>
                <form>
                    <div className="name-number">
                        <label>
                            Username:
                            <input
                                type="text"
                                value={username}
                                name="username"
                                className="form-input"
                                required  // Make username required
                                onChange={handleChange}
                            />
                        </label>
                        <label>
                            Phone Number:
                            <input
                                type="text"
                                value={phoneNumber}
                                name="phoneNumber"
                                className="form-input"
                                onChange={handleChange}
                            />
                        </label>
                    </div>

                    <div className="name-number">
                        <label>
                            Gender:
                            <select
                                value={gender}
                                name="gender"
                                className="form-input"
                                onChange={handleChange}
                            >
                                <option value="">Select Gender</option>
                                <option value="M">M</option>
                                <option value="F">F</option>
                            </select>
                        </label>
                        <label>
                            Age:
                            <input
                                type="text"
                                value={age}
                                name="age"
                                className="form-input"
                                onChange={handleChange}
                            />
                        </label>
                    </div>
                    <label>
                        Email:
                        <input
                            value={email}
                            type="email"
                            name="email"
                            className="form-input"
                            required  // Make email required
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        Password:
                        <span className="password-requirements">
                            Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character (@, #, $, %, ^, &, *).
                        </span>
                        <input
                            type="password"
                            value={password}
                            name="password"
                            className="form-input"
                            required  // Make password required
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        Confirm Password:
                        <input
                            type="password"
                            value={confirmPassword}
                            name="confirmPassword"
                            className="form-input"
                            onChange={handleChange}
                        />
                    </label>
                    <div className="form-footer">
                        <button type="button" className="submit-btn" onClick={handleSubmitForm}>
                            Sign Up
                        </button>
                        <p className="already-account">
                            Already have an account? <a href="/login">Log in</a>
                        </p>
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
        <Signup />
    </>
);