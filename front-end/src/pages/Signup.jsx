import React, { useState } from 'react';
import '../css/Signup.css';

const Signup = () => {

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');


    const handleSubmitForm = () => {
        (
            console.log(username + " " + email)
        )
    }

    return (
        <div className="signup-page">
            <div className="left-section">
                <img className="image" src="./Image/signup-page-image.png" alt="Image" />
            </div>
            <div className="right-section">
                <h1>Create your account</h1>
                <form>
                    <div className='name-number'>
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
                            Phone Number:
                            <input type="text" name="phoneNumber" className="form-input" />
                        </label>
                    </div>

                    <div className='name-number'>
                        <label>
                            Gender:
                            <input
                                type="text"
                                value={username}
                                name="username"
                                className="form-input"
                                onChange={(e) => setUsername(e.target.value)} />
                        </label>
                        <label>
                            Age:
                            <input type="text" name="phoneNumber" className="form-input" />
                        </label>
                    </div>
                    <label>
                        Email:
                        <input
                            value={email}
                            type="email"
                            name="email"
                            className="form-input"
                            onChange={(e) => setEmail(e.target.value)} />
                    </label>
                    <label>
                        Password:
                        <input type="password" name="password" className="form-input" />
                    </label>
                    <label>
                        Confirm Password:
                        <input type="password" name="confirmPassword" className="form-input" />
                    </label>
                    <div className="form-footer">
                        <button type="button" className="submit-btn" onClick={handleSubmitForm}>Sign Up</button>
                        <p className="already-account">Already have an account? <a href="/login">Log in</a></p>

                    </div>
                </form>
            </div>
        </div>
    );
};

export default Signup;
