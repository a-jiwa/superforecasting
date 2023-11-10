// Forecasts.js
import React, { useState, useEffect } from 'react';
import { db, auth } from '../firebase';
import '../styles/Forecasts.css';
import { collection, query, where, getDocs, addDoc } from 'firebase/firestore';
import ForecastQuestion from './ForecastQuestion';

function Forecasts({ forecasts, onSliderChange, answeredQuestions, setAnsweredQuestions, userId, loadForecasts }) {
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [timeLeft, setTimeLeft] = useState('');
    const [allAnswered, setAllAnswered] = useState(false);

    // Initialize countdown timer
    const deadline = new Date(new Date().getFullYear(), 11, 31, 23, 59, 59); // December 31st of the current year

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


    const handleSubmit = async () => {
        if (hasSubmitted) {
            console.error('You have already submitted your forecasts.');
            return;
        }

        setSubmitSuccess(false);

        // Convert likelihood values to integers
        const forecastsToSubmit = forecasts.map(forecast => ({
            id: forecast.id,
            likelihood: parseInt(forecast.likelihood, 10)
        }));

        // Prepare the submission object
        const submission = {
            userId: userId,
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

    const handleSliderChange = (id, value) => {
        onSliderChange(id, value);
        setAnsweredQuestions(currentAnswered => new Set(currentAnswered).add(id));

        // Save the updated forecasts to Local Storage
        const updatedForecasts = forecasts.map(forecast =>
            forecast.id === id ? { ...forecast, likelihood: value } : forecast
        );
        localStorage.setItem('forecasts', JSON.stringify(updatedForecasts));
    };

    useEffect(() => {
        // Check if there are forecasts saved in Local Storage
        const savedForecasts = JSON.parse(localStorage.getItem('forecasts'));
        if (savedForecasts) {
            // Call a prop function to update the forecasts in the parent component
            loadForecasts(savedForecasts); // This function should be passed as a prop from Home.js
        }
    }, [loadForecasts]); // Add loadForecasts to the dependency array

    return (
        <div className="forecasts-container">
            <h1 className={"forecasts-header"}>Questions</h1>
            <p className="explanatory-text">
                Browse through a collection of questions, each accompanied by a slider to indicate your predicted likelihood of the event in question. Your task is to adjust these sliders based on your assessment. Once you have set your forecasts, submit them using the button provided. Remember, your predictions matter, so take your time to consider each question carefully.
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
                    <strong>Time remaining:</strong>
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
                            likelihood={forecast.likelihood}
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