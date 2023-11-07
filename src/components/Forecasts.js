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
    const [answeredQuestions, setAnsweredQuestions] = useState(new Set());
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
                let seconds = Math.floor((difference / 1000) % 60);

                setTimeLeft(`${days} days ${hours} hours ${minutes} minutes ${seconds} seconds`);
            }
        }, 1000);

        return () => clearInterval(timer); // Cleanup the interval on unmount
    }, []);

    const [forecasts, setForecasts] = useState([
        {
            id: 1,
            question: 'What is the likelihood of a recession in the next year?',
            explanation: 'Consider economic indicators and historical trends to estimate the probability of a recession.',
            likelihood: 50,
            category: 'Economics',
        },
        {
            id: 2,
            question: 'How likely is it that Country X will have a significant political reform by the end of this decade?',
            explanation: 'Assess political stability, reform movements, and international pressures to forecast potential changes.',
            likelihood: 50,
            category: 'Politics',
        },
        {
            id: 3,
            question: 'What are the chances of a major breakthrough in renewable energy technology in the next five years?',
            explanation: 'Evaluate ongoing research, investments, and technological trends to estimate the probability of a breakthrough.',
            likelihood: 50,
            category: 'Science',
        },
        // ... other questions with their respective categories
        {
            id: 4,
            question: 'Economic Growth: Will the annual GDP growth rate of the United States for the fiscal year 2024 exceed 2.5% as reported by the U.S. Bureau of Economic Analysis?',
            explanation: 'Assess economic data and trends to forecast the GDP growth rate.',
            likelihood: 50,
            category: 'Economics',
        },
        {
            id: 5,
            question: 'Space Exploration: Will NASA confirm the launch of the Artemis III mission to land humans on the moon by December 31, 2024?',
            explanation: 'Monitor NASA announcements and space exploration developments.',
            likelihood: 50,
            category: 'Science',
        },
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
        setAnsweredQuestions(currentAnswered => new Set(currentAnswered).add(id));
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

    const groupForecastsByCategory = (forecasts) => {
        return forecasts.reduce((acc, forecast) => {
            (acc[forecast.category] = acc[forecast.category] || []).push(forecast);
            return acc;
        }, {});
    };

    const forecastsByCategory = groupForecastsByCategory(forecasts);

    return (
        <div className="forecasts-container">
            <h1>Forecast Questions</h1>
            <div className="answered-questions">
                <strong>Questions answered:</strong> {answeredQuestions.size} of {forecasts.length}
            </div>
            <div className="countdown-timer">
                <strong>Time remaining:</strong> {timeLeft}
            </div>

            {/* Render forecasts by category */}
            {Object.entries(forecastsByCategory).map(([category, forecasts]) => (
                <div key={category} className="forecast-category">
                    <h2>{category}</h2>
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