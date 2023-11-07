import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import '../styles/Forecasts.css';
import { collection, query, where, getDocs, addDoc } from 'firebase/firestore';
import { auth } from '../firebase';
import ForecastQuestion from './ForecastQuestion'; // Import the new component

function Forecasts() {
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [userId, setUserId] = useState(null);
    const [timeLeft, setTimeLeft] = useState('');

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
                let seconds = Math.floor((difference / 1000) % 60);

                setTimeLeft(`${days} days ${hours} hours ${minutes} minutes ${seconds} seconds`);
            }
        }, 1000);

        return () => clearInterval(timer); // Cleanup the interval on unmount
    }, []);

    // Keep track of all the forecast values
    const [forecasts, setForecasts] = useState([
        {
            id: 1,
            question: 'What is the likelihood of a recession in the next year?',
            explanation: 'Consider economic indicators and historical trends to estimate the probability of a recession.',
            likelihood: 50
        },
        {
            id: 2,
            question: 'How likely is it that Country X will have a significant political reform by the end of this decade?',
            explanation: 'Assess political stability, reform movements, and international pressures to forecast potential changes.',
            likelihood: 50
        },
        {
            id: 3,
            question: 'What are the chances of a major breakthrough in renewable energy technology in the next five years?',
            explanation: 'Evaluate ongoing research, investments, and technological trends to estimate the probability of a breakthrough.',
            likelihood: 50
        },
        // Add more questions as needed
    ]);

    useEffect(() => {
        // You should replace 'userId' with the actual logged-in user's ID
        const checkSubmission = async () => {
            if (auth.currentUser) {
                const uid = auth.currentUser.uid;
                setUserId(uid); // Set the user ID state
                const q = query(collection(db, 'forecasts'), where('userId', '==', uid));

                const querySnapshot = await getDocs(q);
                if (!querySnapshot.empty) {
                    const userForecast = querySnapshot.docs[0].data();
                    setForecasts(userForecast.forecasts);
                    setHasSubmitted(true);
                }
            }
        };

        checkSubmission();
    }, []); // If auth or db changes over time, include them in this dependency array

    const handleSliderChange = (id, value) => {
        setForecasts(currentForecasts =>
            currentForecasts.map(forecast =>
                forecast.id === id ? {...forecast, likelihood: value} : forecast
            )
        );
    };

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

    return (
        <div className="forecasts-container">
            <h1>Forecast Questions</h1>
            <div className="countdown-timer">
                Time remaining: {timeLeft}
            </div>
            {hasSubmitted && <div className="success-message">You have already submitted your forecasts:</div>}
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
            {!hasSubmitted && (
                <button className="submit-button" onClick={handleSubmit}>
                    Submit
                </button>
            )}
        </div>
    );
}
export default Forecasts;
