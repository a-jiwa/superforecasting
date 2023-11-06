// src/components/VerificationPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from "../firebase";
import { sendEmailVerification } from "firebase/auth";
import closeIcon from "../styles/close-button.svg";
import '../styles/App.css';


function VerificationPage({ setUser }) {
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const resendVerificationEmail = async () => {
        if (auth.currentUser && !auth.currentUser.emailVerified) {
            try {
                await sendEmailVerification(auth.currentUser);
                alert("Verification email sent!");
            } catch (err) {
                setError(err.message);
            }
        } else {
            setError("User not found or email already verified.");
        }
    };

    const checkVerification = async () => {
        await auth.currentUser.reload();
        const updatedUser = auth.currentUser;

        setUser(updatedUser); // Update user state

        if (updatedUser.emailVerified) {
            window.location.reload(); // Refresh the page
        } else {
            setError("Your email has not been verified yet. Please check your inbox and verify your email.");
        }
    };

    const handleClose = () => {
        navigate('/'); // This will navigate to the landing page
    };

    return (
        <div className="container">
            <button onClick={handleClose} className="closeButton">
                <img src={closeIcon} alt="Close" />
            </button>
            <h1>Email Verification</h1>
            <p>Please verify your email address. Check your inbox for the verification email.</p>
            <button className="red-button button" onClick={resendVerificationEmail}>Resend Email</button>
            <button className="button" onClick={checkVerification}>Log In</button> {/* Renamed button */}
            {error && <p className="error-message">{error}</p>}
        </div>
    );
}

export default VerificationPage;
