import React, { useState } from 'react';
import '../css/Signup.css';

const Login = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    
    const handleSubmitForm = async (e) => {
        e.preventDefault()
        console.log(username + " " + password)
        try{
            await axios.post("http://localhost:5173/login", {
                username, password
            })
        }
        catch(e){
            console.log(e);
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
                        <input type="password" name="password" className="form-input" onChange={(e) => {setPassword(e.target.value)}} placeholder='*****' />
                    </label>
                    <div className="form-footer">
                        <button type="submit" className="submit-btn" onClick={handleSubmitForm}>Login</button>
                        <p className="already-account">Don't have an account? <a href="/signup">Sign Up</a></p>
                        
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
