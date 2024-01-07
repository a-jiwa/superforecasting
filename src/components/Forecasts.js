// Forecasts.js
import React, { useState, useEffect, useRef } from 'react';
import { db } from '../firebase';
import '../styles/Forecasts.css';
import { collection, query, where, getDocs, addDoc, doc, setDoc, getDoc } from 'firebase/firestore';
import ForecastQuestion from './ForecastQuestion';

// Debounce function
const debounce = (func, delay) => {
    let debounceTimer;
    return function() {
        const context = this;
        const args = arguments;
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => func.apply(context, args), delay);
    };
};


function Forecasts({ forecasts, onSliderChange, answeredQuestions, setAnsweredQuestions, userId, loadForecasts, user }) {
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [timeLeft, setTimeLeft] = useState('');
    const [allAnswered, setAllAnswered] = useState(false);
    // New local state for slider values
    const [sliderValues, setSliderValues] = useState({});
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    // Initialize countdown timer
    const deadline = new Date(2024, 0, 8, 1, 0, 0); // Jan 7th, 2024

    const categoryExplanations = {
        "UK POLITICS": 'A snapshot of elections, economy and wider government policy. What does the British Government and society look like in 2024?',
        "GEOPOLITICS": 'A snapshot of regime changes, conflict, and multilateral institutions. What will the world look like in 2024?',
        "POPULAR CULTURE": 'A snapshot of awards, zeitgeists and celebrities. What does popular culture look like on 2024?',
        "CELEBRITY DEATHS": 'How likely are these people to pass away in 2024',
        "BUSINESS": 'A snapshot of what the business world will look like in 2024.',
        "SPORT": 'A snapshot of key sporting events. Who will reign victorious in 2024?',
    };

    useEffect(() => {
        // Timer to update the remaining time
        const timer = setInterval(() => {
            const now = new Date();
            const difference = deadline - now;

            if (difference <= 0) {
                clearInterval(timer);
                setTimeLeft('Deadline has passed');
                setHasSubmitted(true); // Prevent further submissions if the deadline has passed
            } else {
                // Calculate time left
                let days = Math.floor(difference / (1000 * 60 * 60 * 24));
                let hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
                let minutes = Math.floor((difference / 1000 / 60) % 60);

                let timeString = '';
                if (days > 7) {
                    timeString = `${days} days`;
                } else if (days >= 1) {
                    timeString = `${days} days ${hours} hours`;
                } else {
                    // When less than one day, show only hours and minutes
                    timeString = `${hours} hours ${minutes} minutes`;
                }

                setTimeLeft(timeString);
            }
        }, 1000);

        return () => clearInterval(timer); // Cleanup the interval on unmount
    }, []);


    useEffect(() => {
        const checkSubmission = async () => {
            if (userId) {
                const q = query(collection(db, 'forecasts'), where('userId', '==', userId));
                const querySnapshot = await getDocs(q);
                if (!querySnapshot.empty) {
                    setHasSubmitted(true);
                }
            }
        };

        checkSubmission();
    }, [userId]);

    useEffect(() => {
        const fetchSliderState = async () => {
            if (userId) {
                const docRef = doc(db, 'sliderStates', userId);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    const fetchedForecasts = docSnap.data().forecasts;
                    const sliderState = fetchedForecasts.reduce((acc, forecast) => {
                        acc[forecast.id] = forecast.likelihood;
                        return acc;
                    }, {});
                    setSliderValues(sliderState);
                }
            }
        };

        fetchSliderState();
    }, [userId]);

    useEffect(() => {
        const checkSubmission = async () => {
            if (userId) {
                const q = query(collection(db, 'forecasts'), where('userId', '==', userId));

                const querySnapshot = await getDocs(q);
                if (!querySnapshot.empty) {
                    setHasSubmitted(true);
                }
            }
        };

        checkSubmission();
    }, [userId]);


    const handleSubmit = async () => {
        if (hasSubmitted) {
            console.error('You have already submitted your forecasts.');
            return;
        }

        setSubmitSuccess(false);
        setShowSuccessModal(true);

        // Convert likelihood values to integers and include question texts
        const forecastsToSubmit = forecasts.map(forecast => ({
            id: forecast.id,
            questionText: forecast.question,
            likelihood: parseInt(sliderValues[forecast.id] || forecast.likelihood, 10) // Use updated slider value
        }));

        // Prepare the submission object
        const submission = {
            userId: userId,
            username: user.displayName,
            email: user.email,
            forecasts: forecastsToSubmit,
            submittedAt: new Date()
        };

        try {
            const forecastsCollectionRef = collection(db, 'forecasts');
            const docRef = await addDoc(forecastsCollectionRef, submission);

            // Attempt to add user to the leaderboard
            const leaderboardRef = collection(db, 'leaderboard');

            // Format the username as "First Name Last Initial."
            const nameParts = user.displayName.split(' ');
            const formattedName = nameParts.length > 1
                ? `${nameParts[0]} ${nameParts[nameParts.length - 1].charAt(0)}.`
                : user.displayName;

            const leaderboardDocRef = await addDoc(leaderboardRef, {
                score: 0,
                userId: userId,
                userName: formattedName, // Use the formatted name
            });

            console.log('Leaderboard entry added with ID: ', leaderboardDocRef.id);
            setSubmitSuccess(true);
            setHasSubmitted(true);
        } catch (e) {
            console.error('Error in submission process: ', e);
            setSubmitSuccess(false);
        }
    };


    const handleCloseModal = () => {
        setShowSuccessModal(false);
    };

    const SuccessModal = () => (
        <div className="modal">
            <div className="modal-content">
                <span className="close-btn" onClick={handleCloseModal}>&times;</span>
                {/*<h2>Congratulations!</h2>*/}
                <p>Your forecasts have been submitted.</p>
                {/*<a href="/leaderboard">View Leaderboard</a>*/}
            </div>
        </div>
    );


    const groupForecastsByCategory = (forecasts) => {
        return forecasts.reduce((acc, forecast) => {
            (acc[forecast.category] = acc[forecast.category] || []).push(forecast);
            return acc;
        }, {});
    };

    const forecastsByCategory = groupForecastsByCategory(forecasts);

    const debouncedUpdateFirestore = debounce(async (updatedForecasts) => {
        const sliderStateRef = doc(db, 'sliderStates', userId);
        await setDoc(sliderStateRef, { forecasts: updatedForecasts });
    }, 5000);

    const handleSliderChange = (id, value) => {
        // Update local state immediately for responsive UI
        setSliderValues(prevValues => ({ ...prevValues, [id]: value }));

        // Update answeredQuestions state
        setAnsweredQuestions(prevQuestions => new Set(prevQuestions.add(id)));

        // Prepare updated forecasts for Firestore
        // This should be based on the local state, not the props
        const updatedForecasts = forecasts.map(forecast => {
            const updatedValue = id === forecast.id ? value : sliderValues[forecast.id] || forecast.likelihood;
            return { ...forecast, likelihood: updatedValue };
        });

        // Update Firestore (debounced)
        debouncedUpdateFirestore(updatedForecasts);
    };

    useEffect(() => {
        // Ensure there is a userId before attempting to fetch user-specific forecasts
        if (userId) {
            // Check if there are forecasts saved in Local Storage for the current user
            const savedForecasts = JSON.parse(localStorage.getItem(`forecasts_${userId}`));
            if (savedForecasts) {
                // Call a prop function to update the forecasts in the parent component
                loadForecasts(savedForecasts); // This function should be passed as a prop from Home.js
            }
        }
    }, [loadForecasts, userId]); // Add userId to the dependency array


    const [progressBarClass, setProgressBarClass] = useState('progress-container');
    const switchElementRef = useRef(null); // Ref for the element to switch on
    const progressBarRef = useRef(null); // Ref for the progress bar
    const placeholderRef = useRef(null); // Ref for the placeholder

    useEffect(() => {
        const handleScroll = () => {
            if (!switchElementRef.current || !progressBarRef.current) return;

            const switchPoint = switchElementRef.current.getBoundingClientRect().top + window.scrollY;
            const progressBarHeight = progressBarRef.current.offsetHeight;

            if (window.scrollY > switchPoint) {
                setProgressBarClass('sticky-progress-container');
                // Add a placeholder with the same height as the progress bar
                placeholderRef.current.style.height = `${progressBarHeight}px`;
            } else {
                setProgressBarClass('progress-container');
                // Remove the placeholder
                placeholderRef.current.style.height = '0px';
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="forecasts-container">
            <h1 className={"forecasts-header"}>Forecasts</h1>
            <p className="explanatory-text">
                For each question adjust the slider based on what you think the likelihood of the event happening is. Once you have set your forecasts for each question, submit them using the button provided. Remember, your final score is calculated from your answers to all the questions, so take your time to consider each question carefully.
            </p>
            {/* Element to switch on */}
            <div ref={switchElementRef}></div>

            {/* Placeholder to prevent layout shift */}
            <div ref={placeholderRef} style={{ height: '0', overflow: 'hidden' }}></div>

            <div ref={progressBarRef} className={progressBarClass}>
                <div className="answered-count">
                    {answeredQuestions.size} / {forecasts.length}
                </div>
                <div className="progress-bar-container">
                    <div className="progress-bar" style={{ width: `${(answeredQuestions.size / forecasts.length) * 100}%` }}></div>
                </div>
            </div>
            <div className="countdown-timer">
                <div className="time-remaining-container">
                    <strong>Deadline</strong>
                    <span>{timeLeft}</span>
                </div>
            </div>

            {/* Render forecasts by category */}
            {Object.entries(forecastsByCategory).map(([category, forecasts]) => (
                <div key={category} className="forecast-category">
                    <div className="category-title-container">
                        <h2 className="forecast-category-title">{category}</h2>
                    </div>
                    <p className="category-explanation">{categoryExplanations[category]}</p>

                    {forecasts.map(forecast => (
                        <ForecastQuestion
                            key={forecast.id}
                            id={forecast.id}
                            question={forecast.question}
                            explanation={forecast.explanation}
                            likelihood={sliderValues[forecast.id] || forecast.likelihood}
                            handleSliderChange={handleSliderChange}
                            hasSubmitted={hasSubmitted}
                        />
                    ))}
                </div>
            ))}

            {!hasSubmitted && (
                <button className="submit-button" onClick={handleSubmit}>
                    Submit
                </button>
            )}

            {showSuccessModal && <SuccessModal />}
        </div>
    );
}

export default Forecasts;