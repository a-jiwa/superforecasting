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
                question: 'Will the average UK house price rise above £300,000 in 2024?',
                explanation: 'According to the ONS, the average UK house price was £291,000 in September 2023, up from £241,541 in 2020. Analyze housing market trends and economic factors to make a prediction.',
                likelihood: 50,
                category: 'UK POLITICS',
            },
            {
                id: 2,
                question: 'Will the UK enter a recession in 2024, as reported on by the BBC?',
                explanation: 'Assess economic indicators and quarterly GDP reports to determine the likelihood of a recession.',
                likelihood: 50,
                category: 'UK POLITICS',
            },
            {
                id: 3,
                question: 'Will the UK’s inflation rate drop below 2.4% by the end of 2024?',
                explanation: 'Examine historical inflation data and economic policies to estimate the probability of a drop in inflation rate.',
                likelihood: 50,
                category: 'UK POLITICS',
            },
            {
                id: 4,
                question: 'Will the UK pass legislation banning single-use (disposable) vapes in 2024, as reported on by the BBC?',
                explanation: 'Monitor legislative proposals and government actions to assess the likelihood of a vaping ban.',
                likelihood: 50,
                category: 'UK POLITICS',
            },
            {
                id: 5,
                question: 'King Charles III is currently the head of state of 14 sovereign states, will this reduce to 10 by the end of 2024, as reported by the BBC?',
                explanation: 'Track changes in the composition of the Commonwealth to estimate the likelihood of this reduction.',
                likelihood: 50,
                category: 'UK POLITICS',
            },
            {
                id: 6,
                question: 'Will the numbers of employed people reporting to work from home or hybrid increase in 2024?',
                explanation: 'Analyze workplace trends and employment surveys to estimate the likelihood of an increase in remote work.',
                likelihood: 50,
                category: 'UK POLITICS',
            },
            {
                id: 7,
                question: 'The last General strike was called in 1926, will there be a general strike in 2024?',
                explanation: 'Monitor labor union activities and economic conditions to assess the likelihood of a general strike.',
                likelihood: 50,
                category: 'UK POLITICS',
            },
            {
                id: 8,
                question: 'Will the Government publicly endorse the use of Chat GPT by Government and Civil Service employees, as confirmed by a No.10 press release?',
                explanation: 'Track government statements and announcements to determine the likelihood of such an endorsement.',
                likelihood: 50,
                category: 'UK POLITICS',
            },
            {
                id: 9,
                question: 'Will the UK Prime Minister announce a snap general election to be held at any point in 2024, as confirmed by an official statement from 10 Downing Street?',
                explanation: 'Monitor political developments and official statements to assess the likelihood of a snap election.',
                likelihood: 50,
                category: 'UK POLITICS',
            },
            {
                id: 10,
                question: 'Will a UK political party that is not one of the current main parties (Conservative, Labour, Liberal Democrats, SNP) win more than 5% of the popular vote in any UK-wide elections held in 2024, as reported by the UK Electoral Commission?',
                explanation: 'Track election results and party campaigns to estimate the probability of a non-main party winning votes.',
                likelihood: 50,
                category: 'UK POLITICS',
            },
            {
                id: 11,
                question: 'This year there have been two cabinet reshuffles under a single Prime Minister. Will there be two or more cabinet reshuffles under a single Prime Minister by the end of 2024, as confirmed by press releases from No.10 Downing Street?',
                explanation: 'Monitor government announcements and political developments to assess the likelihood of cabinet reshuffles.',
                likelihood: 50,
                category: 'UK POLITICS',
            },
            {
                id: 12,
                question: 'Will the UK\'s ruling party change its leader in 2024, as confirmed by an official announcement from the party?',
                explanation: 'Track party leadership announcements and internal party dynamics to estimate the likelihood of a leadership change.',
                likelihood: 50,
                category: 'UK POLITICS',
            },
            {
                id: 13,
                question: 'Will the UK\'s opposition party change its leader in 2024, as confirmed by an official announcement from the party?',
                explanation: 'Monitor opposition party leadership changes and political events to assess the likelihood of a new leader.',
                likelihood: 50,
                category: 'UK POLITICS',
            },
            {
                id: 14,
                question: 'Will the Scottish Parliament pass a bill in 2024 that calls for a new referendum on Scottish independence, as confirmed by official legislative records?',
                explanation: 'Track legislative developments and official records to estimate the likelihood of a new independence referendum bill.',
                likelihood: 50,
                category: 'UK POLITICS',
            },
            {
                id: 15,
                question: 'Will Northern Ireland commence the process of joining the EU in 2024?',
                explanation: 'Assess political developments and public sentiment in Northern Ireland to estimate the likelihood of EU integration.',
                likelihood: 50,
                category: 'UK POLITICS',
            },
            {
                id: 16,
                question: 'Will a plane containing asylum seekers fly from the UK to Rwanda in 2024?',
                explanation: 'Monitor government policies and immigration developments to assess the likelihood of such flights.',
                likelihood: 50,
                category: 'UK POLITICS',
            },
            {
                id: 17,
                question: 'Will Sadiq Khan win the London Mayoral election in 2024?',
                explanation: 'Analyze election campaigns and public sentiment to estimate the likelihood of Sadiq Khan winning the election.',
                likelihood: 50,
                category: 'UK POLITICS',
            },
            {
                id: 18,
                question: 'Will there be a lasting bilateral Ceasefire in the Russian invasion of Ukraine, where lasting is defined as over 3 months?',
                explanation: 'Monitor international negotiations and conflict developments to assess the likelihood of a lasting ceasefire in Ukraine.',
                likelihood: 50,
                category: 'Geopolitics',
            },
            {
                id: 19,
                question: 'Will the Republican Party win the 2024 US presidential election?',
                explanation: 'Analyze election campaigns and polling data to estimate the likelihood of the Republican Party winning the presidential election.',
                likelihood: 50,
                category: 'Geopolitics',
            },
            {
                id: 20,
                question: 'Will Donald Trump be the Republican nominee in the 2024 US elections?',
                explanation: 'Track party nominations and political announcements to estimate the likelihood of Donald Trump being the nominee.',
                likelihood: 50,
                category: 'Geopolitics',
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
            case 'Forecasts':
                return <Forecasts
                    forecasts={forecasts}
                    onSliderChange={handleSliderChange}
                    answeredQuestions={answeredQuestions}
                    setAnsweredQuestions={setAnsweredQuestions}
                    userId={userId}
                    user={user}
                    loadForecasts={loadForecasts}
                />;
            case 'Leaderboard':
                return <Leaderboard activeUserId={userId} />;
            case 'How it works':
                return <HowItWorks />;
            case 'Profile':
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
