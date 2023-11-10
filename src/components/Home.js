// Home.js
import React, { useState, useEffect } from 'react';
import { auth } from '../firebase';
import Menu from './Menu';
import Forecasts from './Forecasts';
import Leaderboard from './Leaderboard';
import HowItWorks from './HowItWorks';
import Profile from './Profile';
import '../styles/App.css';
import '../styles/Home.css';

function Home() {
    // Load initial forecasts state from Local Storage or fallback to default if not available
    const [forecasts, setForecasts] = useState(() => {
        const savedForecasts = JSON.parse(localStorage.getItem('forecasts'));
        return savedForecasts || [
                {
                    id: 1,
                    question: 'What is the likelihood of a recession in the next year?',
                    explanation: 'Consider economic indicators and historical trends to estimate the probability of a recession.',
                    likelihood: 50,
                    category: 'ECONOMICS',
                },
                {
                    id: 2,
                    question: 'How likely is it that Uganda will have a significant political reform by the end of this decade?',
                    explanation: 'Assess political stability, reform movements, and international pressures to forecast potential changes.',
                    likelihood: 50,
                    category: 'POLITICS',
                },
                {
                    id: 3,
                    question: 'What are the chances of a major breakthrough in renewable energy technology in the next five years?',
                    explanation: 'Evaluate ongoing research, investments, and technological trends to estimate the probability of a breakthrough.',
                    likelihood: 50,
                    category: 'SCIENCE',
                },
                // ... other questions with their respective categories
                {
                    id: 4,
                    question: 'Will the annual GDP growth rate of the United States for the fiscal year 2024 exceed 2.5% as reported by the U.S. Bureau of Economic Analysis?',
                    explanation: 'Assess economic data and trends to forecast the GDP growth rate.',
                    likelihood: 50,
                    category: 'ECONOMICS',
                },
                {
                    id: 5,
                    question: 'Will NASA confirm the launch of the Artemis III mission to land humans on the moon by December 31, 2024?',
                    explanation: 'Monitor NASA announcements and space exploration developments.',
                    likelihood: 50,
                    category: 'SCIENCE',
                },
];
    });

    const [user, setUser] = useState(null);
    const [selectedMenuItem, setSelectedMenuItem] = useState('Forecasts');
    const [userId, setUserId] = useState(null);

    // Function to update the forecasts state
    const loadForecasts = (forecastsFromStorage) => {
        setForecasts(forecastsFromStorage);
    };

    useEffect(() => {
        // Authentication state listener
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setUser(user);
            if (user) {
                setUserId(user.uid); // Set the userId when the user logs in
            }
        });
        return () => {
            unsubscribe();
        };
    }, []);

    const handleMenuSelect = (menuItem) => {
        setSelectedMenuItem(menuItem);
    };

    const [answeredQuestions, setAnsweredQuestions] = useState(() => {
        const savedAnsweredQuestions = JSON.parse(localStorage.getItem('answeredQuestions'));
        return savedAnsweredQuestions ? new Set(savedAnsweredQuestions) : new Set();
    });

    const handleSliderChange = (id, value) => {
        setForecasts(currentForecasts =>
            currentForecasts.map(forecast =>
                forecast.id === id ? { ...forecast, likelihood: value } : forecast
            )
        );
        setAnsweredQuestions(currentAnswered => {
            const updatedAnswered = new Set(currentAnswered).add(id);
            localStorage.setItem('answeredQuestions', JSON.stringify(Array.from(updatedAnswered)));
            return updatedAnswered;
        });
    };

    const renderContent = () => {
        switch (selectedMenuItem) {
            case 'FORECASTS':
                return <Forecasts
                    forecasts={forecasts}
                    onSliderChange={handleSliderChange}
                    answeredQuestions={answeredQuestions}
                    setAnsweredQuestions={setAnsweredQuestions}
                    userId={userId}
                    loadForecasts={loadForecasts}
                />;
            case 'LEADERBOARD':
                return <Leaderboard activeUserId={userId} />;
            case 'HOW IT WORKS':
                return <HowItWorks />;
            case 'PROFILE':
                return <Profile user={user} />;
            default:
                return <Forecasts
                    forecasts={forecasts}
                    onSliderChange={handleSliderChange}
                    answeredQuestions={answeredQuestions}
                    setAnsweredQuestions={setAnsweredQuestions}
                    userId={userId}
                    loadForecasts={loadForecasts}
                />;
        }
    };

    return (
        <div className="home-layout">
            <Menu selected={selectedMenuItem} onSelect={handleMenuSelect} />
            <div className="main-content">
                {user ? (
                    <>
                        {/* User related content */}
                    </>
                ) : (
                    <p>Loading...</p>
                )}
                {renderContent()}
            </div>
        </div>
    );
}

export default Home;
