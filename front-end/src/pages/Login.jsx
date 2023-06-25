import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import "../css/Signup.css";
import axios from "axios";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    useEffect( () => {
        const userId = localStorage.getItem("doctor_ai_userID");
        if (userId) {
            navigate("/");
        }
    })

    const validateForm = () => {
        if (username.length < 3) {
            toast.error("Username must be of at least 3 characters");
            return false;
        } else if (password.length < 0) {
            toast.error("Password must be of at least 10 characters");
            return false;
        }
        return true;
    };

    const handleSubmitForm = async (e) => {
        e.preventDefault();
        console.log("Btn triggred");
        if (!validateForm()) {
            return;
        } else {
            try {
                const res = await axios.post("http://localhost:3000/login", {
                    username,
                    password,
                });
                console.log(res.data);
                localStorage.setItem("doctor_ai_userID", res.data.user);
                // If the login request is successful, show a success toast message
                toast.success("User logged in successfully!");
                // Navigate to the profile page after a delay
                setTimeout(() => {
                    // navigate("/");
                    window.location.href = "/";
                }, 1500); // Delay of 1.5 seconds before navigating
                // Additional actions or redirection can be performed here
            } catch (error) {
                console.log(error);
                if (
                    error.response &&
                    error.response.data &&
                    error.response.data.error === "Incorrect password"
                ) {
                    toast.error("Incorrect password!");
                } else if (
                    error.response &&
                    error.response.data &&
                    error.response.data.error === "User not found"
                ) {
                    toast.error("Incorrect username password");
                } else {
                    // If the login request encounters an error, show an error toast message
                    toast.error("An error occurred while logging in.");
                }
            }
        }
    };

    return (
        <div className="signup-page">
            <div className="left-section">
                <img
                    className="image"
                    // src="./Image/doctors.gif"
                    src='/Image/Login_page_image.png'
                    alt="Image"
                />
            </div>
            <div className="right-section">
                <h1>Login to <span>DOCTOR.AI</span></h1>
                <form action="POST">
                    <div className="name-number">
                        <label className="label">
                            Username
                            <input
                                type="text"
                                value={username}
                                name="username"
                                className="form-input input"
                                placeholder="Username"
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </label>
                        <label className="label">
                            Password
                            <input
                                type="password"
                                name="password"
                                className="form-input input"
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                }}
                                placeholder="*****"
                            />
                        </label>
                    </div>
                    <div className="form-footer">
                        <button
                            type="button"
                            className="action_btn"
                            onClick={handleSubmitForm}
                        >
                            Login
                        </button>

                    </div>
                    <p className="already-account">
                        Don't have an account? <a href="/signup">Sign Up</a>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default () => (
    <>
        <ToastContainer position="bottom-right" theme="colored" />
        <Login />
    </>
);
