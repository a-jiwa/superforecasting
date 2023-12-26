import React, { useState, useEffect } from "react"; // Import useEffect here
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "../styles/App.css";

import closeIcon from '../styles/close-button.svg'; // Adjust the path to where your SVG is located
import showPasswordIcon from '../styles/show-password.svg'; // Adjust the path as needed
import hidePasswordIcon from '../styles/hide-password.svg'; // Adjust the path as needed


import {
    auth,
    googleProvider,
    appleProvider,
    facebookProvider,
    signInWithPopup
} from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { sendEmailVerification, isSignInWithEmailLink, signInWithEmailLink } from "firebase/auth";
import '../styles/App.css';

function Signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [error, setError] = useState("");
    const [lastName, setLastName] = useState("");
    const [passwordVisible, setPasswordVisible] = useState(false);

    // Using this state to show a verification sent message
    const [verificationSent, setVerificationSent] = useState(false);
    const navigate = useNavigate();
    const [justSignedUp, setJustSignedUp] = useState(false);

    // New state to check if email is verified
    const [emailVerified, setEmailVerified] = useState(false);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                setEmailVerified(user.emailVerified);
            }
        });
        return () => unsubscribe();
    }, [navigate]);

    const signUp = async () => {
        try {
            setJustSignedUp(true);
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            if (!user.emailVerified) {
                await sendEmailVerification(user);
                setVerificationSent(true);
            }
            // Update the profile with the concatenated first and last name
            await user.updateProfile({
                displayName: `${firstName} ${lastName}`,
            });
            setJustSignedUp(false);
            // Navigate to verification after sign up
            navigate('/verification');
        } catch (err) {
            const errorMessage = getErrorMessage(err.code); // Use the new function to get a human-readable message
            setError(errorMessage);
            setJustSignedUp(false);
        }
    };


    const signInWithGoogle = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
        } catch (err) {
            setError(err.message);
        }
    };

    const signInWithApple = async () => {
        try {
            await signInWithPopup(auth, appleProvider);
        } catch (err) {
            setError(err.message);
        }
    };

    const signInWithFacebook = async () => {
        try {
            await signInWithPopup(auth, facebookProvider);
        } catch (err) {
            setError(err.message);
        }
    };

    // Function to handle the "X" button click
    const handleClose = () => {
        navigate('/'); // This will navigate to the landing page
    };

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    // New function to handle the click on the "I've verified my email" button
    const handleContinue = async () => {
        try {
            // Reload the user's auth state
            await auth.currentUser.reload();
            // Check if the email has been verified after the reload
            if (auth.currentUser.emailVerified) {
                setEmailVerified(true);
                navigate("/home");
            } else {
                setError("Your email has not been verified yet. Please check your inbox and verify your email.");
            }
        } catch (err) {
            setError(err.message);
        }
    };

    // Function to handle key press
    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            signUp();
        }
    };

    useEffect(() => {
        // Add event listener
        window.addEventListener('keypress', handleKeyPress);

        // Cleanup event listener
        return () => {
            window.removeEventListener('keypress', handleKeyPress);
        };
    }, []); // Empty dependency array ensures this runs once on mount


    const getErrorMessage = (errorCode) => {
        switch (errorCode) {
            case 'auth/email-already-in-use':
                return 'This email is already in use by another account.';
            case 'auth/invalid-email':
                return 'The email address is not valid.';
            case 'auth/operation-not-allowed':
                return 'Email/password accounts are not enabled.';
            case 'auth/weak-password':
                return 'The password is too weak. It must be at least 6 characters.';
            case 'auth/too-many-requests':
                return 'We have blocked all requests from this device due to unusual activity. Try again later.';
            case 'auth/user-disabled':
                return 'The user account has been disabled by an administrator.';
            case 'auth/user-not-found':
                return 'There is no user record corresponding to this identifier. The user may have been deleted.';
            case 'auth/wrong-password':
                return 'The password is invalid for the given email, or the account corresponding to the email does not have a password set.';
            default:
                return 'An unexpected error occurred. Please try again.';
        }
    };

    return (
        <div className="container">
            <button onClick={handleClose} className="closeButton">
                <img src={closeIcon} alt="Close" />
            </button>
                <h1>Create your profile</h1>
                {error && <p className="error-message">{getErrorMessage(error.code)}</p>}
                <input className="input" type="text" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                <input className="input" type="text" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                <input className="input" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <div className="passwordInputContainer">
                    <input
                        className="input"
                        type={passwordVisible ? "text" : "password"}
                        placeholder="Create a password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button onClick={togglePasswordVisibility} className="togglePasswordButton">
                        <img
                            src={passwordVisible ? hidePasswordIcon : showPasswordIcon}
                            alt="Toggle Password"
                            width="20"
                            height="20"
                        />
                    </button>
                </div>
                <button className="button" onClick={signUp}>Create Account</button>
                <div className="loginLink">
                    <span>Already have an account? </span>
                    <Link to="/login">Log in</Link>
                </div>
                <div className="orContainer">
                    <hr className="orLine"/>
                    <span className="orText">OR</span>
                    <hr className="orLine"/>
                </div>
                <button className="googleButton" onClick={signInWithGoogle}>
                    <div className="buttonIconContainer">
                        <img className="buttonIcon" src="https://img.icons8.com/color/452/google-logo.png" alt="Google Logo"/>
                    </div>
                    Continue with Google
                </button>
                <button className="appleButton" onClick={signInWithApple}>
                    <div className="buttonIconContainer">
                        <img className="buttonIcon" src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/1920px-Apple_logo_black.svg.png" alt="Apple Logo"/>
                    </div>
                    Continue with Apple
                </button>
                <button className="facebookButton" onClick={signInWithFacebook}>
                    <div className="buttonIconContainer">
                        <img className="buttonIcon" src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg" alt="Facebook Logo"/>
                    </div>
                    Continue with Facebook
                </button>
        </div>
    );
}

export default Signup;
