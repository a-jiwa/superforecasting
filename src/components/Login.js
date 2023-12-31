// src/components/Login.js
import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import {
    auth,
    googleProvider,
    appleProvider,
    facebookProvider,
    signInWithPopup,
    signInWithEmailAndPassword
} from "../firebase";
import { sendEmailVerification, isSignInWithEmailLink, signInWithEmailLink } from "firebase/auth";
import '../styles/App.css';

import { doc, setDoc, serverTimestamp, Firestore } from "firebase/firestore";
import { db } from "../firebase"; // Ensure db is a Firestore instance

import closeIcon from '../icons/close-button.svg';
import showPasswordIcon from '../icons/show-password.svg';
import hidePasswordIcon from '../icons/hide-password.svg';



function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [verificationSent, setVerificationSent] = useState(false);
    const [emailVerified, setEmailVerified] = useState(false);
    const navigate = useNavigate();
    const [passwordVisible, setPasswordVisible] = useState(false);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                setEmailVerified(user.emailVerified);
            }
        });
        return () => unsubscribe();
    }, [navigate]);

    const recordLogin = async (user) => {
        const loginRef = doc(db, 'logins', user.uid);
        await setDoc(loginRef, {
            email: user.email,
            timestamp: serverTimestamp()
        }, { merge: true });
    };

    const signIn = async () => {
        if (!email || !password) {
            setError("Please enter both email and password.");
            return;
        }

        try {
            const { user } = await signInWithEmailAndPassword(auth, email, password);
            if (!user.emailVerified) {
                await sendEmailVerification(user);
                setVerificationSent(true);
                navigate('/verification');
            }
            else {
                await recordLogin(user);
                navigate('/'); // Navigates to home if already verified
            }
        } catch (error) {
            setError(getErrorMessage(error.code));
        }
    };

    const signInWithGoogle = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            const user = result.user;
            await recordLogin(user);
            navigate('/'); // Navigate to home after successful login
        } catch (err) {
            setError(err.message);
        }
    };

    const signInWithApple = async () => {
        try {
            const result = await signInWithPopup(auth, appleProvider);
            const user = result.user;
            await recordLogin(user);
            navigate('/'); // Navigate to home after successful login
        } catch (err) {
            setError(err.message);
        }
    };

    const signInWithFacebook = async () => {
        try {
            const result = await signInWithPopup(auth, facebookProvider);
            const user = result.user;
            await recordLogin(user);
            navigate('/'); // Navigate to home after successful login
        } catch (err) {
            setError(err.message);
        }
    };

    // Function to handle the "X" button click
    const handleClose = () => {
        navigate('/'); // This will navigate to the landing page
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            signIn();
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
            case 'auth/account-exists-with-different-credential':
                return 'An account already exists with the same email address but different sign-in credentials. Sign in using a provider associated with this email address.';
            default:
                return 'An unexpected error occurred. Please try again.';
        }
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

    // Function to send a verification email
    const sendVerification = async () => {
        if (auth.currentUser && !auth.currentUser.emailVerified) {
            await auth.currentUser.sendEmailVerification();
            setVerificationSent(true);
        }
    };

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    return (
        <div className="container">
            <button onClick={handleClose} className="closeButton">
                <img src={closeIcon} alt="Close" />
            </button>
            {verificationSent ? (
                <div className="verificationSection">
                    <h1>Verification email sent!</h1>
                    <p>Please check your email and click on the verification link. Once verified, click the button below.</p>
                    <button className="button" onClick={handleContinue}>I've verified my email</button>
                    {error && <p className="error-message">{error}</p>}
                </div>
            ) : (
                <>
                <h1>Welcome back</h1>
            {error && <p className="error-message">{getErrorMessage(error.code)}</p>}
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
            <button className="button" onClick={signIn}>LOG IN</button>
            <div className="loginLink">
                <span>Don’t have an account? </span>
                <Link to="/signup">Sign up</Link>
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
            {/*<button className="appleButton" onClick={signInWithApple}>*/}
            {/*    <div className="buttonIconContainer">*/}
            {/*        <img className="buttonIcon" src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/1920px-Apple_logo_black.svg.png" alt="Apple Logo"/>*/}
            {/*    </div>*/}
            {/*    Continue with Apple*/}
            {/*</button>*/}
            {/*<button className="facebookButton" onClick={signInWithFacebook}>*/}
            {/*    <div className="buttonIconContainer">*/}
            {/*        <img className="buttonIcon" src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg" alt="Facebook Logo"/>*/}
            {/*    </div>*/}
            {/*    Continue with Facebook*/}
            {/*</button>*/}
                </>
            )}
        </div>
    );
}

export default Login;