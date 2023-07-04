import React from 'react'
import "../css/Error.css";

const Error = () => {

    const handleNavigate =  ( () => {
        window.location.href = "/"
    })

    return (
        <div className="error-page">
            <img src="../public/svg/error.svg" alt="404 error" />
                <button onClick={handleNavigate} type="button" className="action_btn" style= {{"margin": "1rem"}}>
                    Back to Home
                </button>
        </div>
    )
}

export default Error