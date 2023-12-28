// Forecasts.js
import React, { useState, useEffect } from 'react';
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

    // Initialize countdown timer
    const deadline = new Date(2024, 0, 7, 23, 59, 59); // Jan 7th, 2024

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

            console.log('Document written with ID: ', docRef.id);
            setSubmitSuccess(true);
            setHasSubmitted(true);
        } catch (e) {
            console.error('Error adding document: ', e);
            setSubmitSuccess(false);
        }
    };


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


    return (
        <div className="forecasts-container">
            <h1 className={"forecasts-header"}>Forecasts</h1>
            <p className="explanatory-text">
                For each question adjust the slider based on what you think the liklihood of the event happening is. Once you have set your forecasts for each question, submit them using the button provided. Remember, your final score is calculated from your answers to all the questions, so take your time to consider each question carefully.
            </p>
            <div className="sticky-progress-container">
                {/*<div className="progress-text">*/}
                {/*    Questions answered: {answeredQuestions.size} of {forecasts.length}*/}
                {/*</div>*/}
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
        </div>
    );
}

export default Forecasts;