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
                "id": 1,
                "question": "The UK Prime Minister will hold a snap general election before June 1st.",
                "explanation": "",
                "likelihood": 50,
                "category": "UK POLITICS"
            },
            {
                "id": 2,
                "question": "A UK political party other than The Conservative Party, The Labour Party, Liberal Democrats or SNP will win more than 5% of the popular vote in the next general election.",
                "explanation": "",
                "likelihood": 50,
                "category": "UK POLITICS"
            },
            {
                "id": 3,
                "question": "The Conservative party will win the next General Election.",
                "explanation": "",
                "likelihood": 50,
                "category": "UK POLITICS"
            },
            {
                "id": 4,
                "question": "The Conservative party will undergo a change in leadership.",
                "explanation": "",
                "likelihood": 50,
                "category": "UK POLITICS"
            },
            {
                "id": 5,
                "question": "The Labour party will undergo a change in leadership.",
                "explanation": "",
                "likelihood": 50,
                "category": "UK POLITICS"
            },
            {
                "id": 6,
                "question": "The Scottish Parliament will pass a bill calling for a new referendum on Scottish independence.",
                "explanation": "",
                "likelihood": 50,
                "category": "UK POLITICS"
            },
            {
                "id": 7,
                "question": "The Northern Irish Parliament will pass a bill calling for a new referendum on joining the EU.",
                "explanation": "",
                "likelihood": 50,
                "category": "UK POLITICS"
            },
            {
                "id": 8,
                "question": "Jeremy Corbyn will appear on the ballot for the London Mayoral election.",
                "explanation": "",
                "likelihood": 50,
                "category": "UK POLITICS"
            },
            {
                "id": 9,
                "question": "Sadiq Khan will win the next London Mayoral election.",
                "explanation": "",
                "likelihood": 50,
                "category": "UK POLITICS"
            },
            {
                "id": 10,
                "question": "The average UK house price will exceed £300,000, as officially reported by the ONS.",
                "explanation": "",
                "likelihood": 50,
                "category": "UK POLITICS"
            },
            {
                "id": 11,
                "question": "The UK will enter a recession, as reported by the BBC.",
                "explanation": "",
                "likelihood": 50,
                "category": "UK POLITICS"
            },
            {
                "id": 12,
                "question": "The UK's annual inflation rate will drop below 3%, as reported on by the ONS.",
                "explanation": "",
                "likelihood": 50,
                "category": "UK POLITICS"
            },
            {
                "id": 13,
                "question": "A general strike will take place in the UK, as reported on by the BBC.",
                "explanation": "",
                "likelihood": 50,
                "category": "UK POLITICS"
            },
            {
                "id": 14,
                "question": "The UK Government will pass legislation banning the sale of single-use (disposable) vapes.",
                "explanation": "",
                "likelihood": 50,
                "category": "UK POLITICS"
            },
            {
                "id": 15,
                "question": "A sovereign state will declare independence from the British monarchy.",
                "explanation": "",
                "likelihood": 50,
                "category": "UK POLITICS"
            },
            {
                "id": 16,
                "question": "The ONS will report an increase in the number of people working fully remote jobs.",
                "explanation": "",
                "likelihood": 50,
                "category": "UK POLITICS"
            },
            {
                "id": 17,
                "question": "The UK Government will transport a group of asylum seekers from the UK to Rwanda.",
                "explanation": "",
                "likelihood": 50,
                "category": "UK POLITICS"
            },
            {
                "id": 18,
                "question": "The UK government will formally announce that it will return the Elgin Marbles to Greece, as confirmed by the BBC.",
                "explanation": "",
                "likelihood": 50,
                "category": "UK POLITICS"
            },
            {
                "id": 19,
                "question": "The percentage of electricity derived from renewable sources will rise above 55% in the UK for any quarter, as reported by gov.uk. ",
                "explanation": "",
                "likelihood": 50,
                "category": "UK POLITICS"
            },
            {
                "id": 20,
                "question": "Donald Trump will win the Republican nomination for the 2024 Presidential election.",
                "explanation": "",
                "likelihood": 50,
                "category": "GEOPOLITICS"
            },
            {
                "id": 21,
                "question": "Joe Biden will win the Democratic nomination for the 2024 Presidential election.",
                "explanation": "",
                "likelihood": 50,
                "category": "GEOPOLITICS"
            },
            {
                "id": 22,
                "question": "The Republican Party will win the 2024 US presidential election.",
                "explanation": "",
                "likelihood": 50,
                "category": "GEOPOLITICS"
            },
            {
                "id": 23,
                "question": "Narendra Modi will continue as the Prime Minister of India following the 2024 Indian General Election.",
                "explanation": "",
                "likelihood": 50,
                "category": "GEOPOLITICS"
            },
            {
                "id": 24,
                "question": "Benjamin Netanyahu will cease to be the Prime Minister of Israel.",
                "explanation": "",
                "likelihood": 50,
                "category": "GEOPOLITICS"
            },
            {
                "id": 25,
                "question": "Vladimir Putin will cease to be the President of Russia.",
                "explanation": "",
                "likelihood": 50,
                "category": "GEOPOLITICS"
            },
            {
                "id": 26,
                "question": "Xi Jinping will cease to be the President of the People's Republic of China.",
                "explanation": "",
                "likelihood": 50,
                "category": "GEOPOLITICS"
            },
            {
                "id": 27,
                "question": "There will be a lasting ceasefire between Russia and Ukraine, as acknowledged by both sides. ",
                "explanation": "",
                "likelihood": 50,
                "category": "GEOPOLITICS"
            },
            {
                "id": 28,
                "question": "The United States or UK will publicly announce or acknowledge that it has executed a military strike within the territory of Israel, Gaza Strip, Golan Heights, or the West Bank.",
                "explanation": "",
                "likelihood": 50,
                "category": "GEOPOLITICS"
            },
            {
                "id": 29,
                "question": "Israel will publicly announce or acknowledge that IDF (Israel Defence Forces) ground forces have completely withdrawn from the Gaza Strip, as confirmed by an official statement from the Israeli government or the IDF.",
                "explanation": "",
                "likelihood": 50,
                "category": "GEOPOLITICS"
            },
            {
                "id": 30,
                "question": "There will be a lethal confrontation between the national military forces of India and China as confirmed by an official statement from the government of India or China.",
                "explanation": "",
                "likelihood": 50,
                "category": "GEOPOLITICS"
            },
            {
                "id": 31,
                "question": "There will be an lethal confrontation between China and Taiwan as confirmed by an official statement from the government of Taiwan or China.",
                "explanation": "",
                "likelihood": 50,
                "category": "GEOPOLITICS"
            },
            {
                "id": 32,
                "question": "The Russian or Belarusian government will publicly announce the deployment of one or more nuclear weapons into Ukrainian territory, as confirmed by an official government statement from Russian or Belarus.",
                "explanation": "",
                "likelihood": 50,
                "category": "GEOPOLITICS"
            },
            {
                "id": 33,
                "question": "The United Nations Security Council will expand to include an additional permanent member. ",
                "explanation": "",
                "likelihood": 50,
                "category": "GEOPOLITICS"
            },
            {
                "id": 34,
                "question": "A new country will be admitted as a full member of the European Union.",
                "explanation": "",
                "likelihood": 50,
                "category": "GEOPOLITICS"
            },
            {
                "id": 35,
                "question": "NATO will admit a new country or part of a country as a member.",
                "explanation": "",
                "likelihood": 50,
                "category": "GEOPOLITICS"
            },
            {
                "id": 36,
                "question": "The World Health Organisation will declare a new global health emergency due to an infectious disease outbreak.",
                "explanation": "",
                "likelihood": 50,
                "category": "GEOPOLITICS"
            },
            {
                "id": 37,
                "question": "Argentina will reduce its annual inflation rate to below 50%.",
                "explanation": "",
                "likelihood": 50,
                "category": "GEOPOLITICS"
            },
            {
                "id": 38,
                "question": "A P5 country will officially announce their withdrawal from participation in COP 29, before the commencement of the conference.",
                "explanation": "",
                "likelihood": 50,
                "category": "GEOPOLITICS"
            },
            {
                "id": 39,
                "question": "Electric vehicle sales will account for more than 10% of total global car sales.",
                "explanation": "",
                "likelihood": 50,
                "category": "GEOPOLITICS"
            },
            {
                "id": 40,
                "question": "The UK will come in the bottom 10 countries in the Eurovision song contest.",
                "explanation": "",
                "likelihood": 50,
                "category": "POPULAR CULTURE"
            },
            {
                "id": 41,
                "question": "Barbie will win more Golden Globe awards than Oppenheimer.",
                "explanation": "",
                "likelihood": 50,
                "category": "POPULAR CULTURE"
            },
            {
                "id": 42,
                "question": "A non-English language film will win the Academy Award for Best Picture at the Oscars.",
                "explanation": "",
                "likelihood": 50,
                "category": "POPULAR CULTURE"
            },
            {
                "id": 43,
                "question": "A film will break the record for the highest-grossing opening weekend in movie history worldwide, surpassing the current record as reported by Box Office Mojo.",
                "explanation": "",
                "likelihood": 50,
                "category": "POPULAR CULTURE"
            },
            {
                "id": 44,
                "question": "A television series will break the record for the most-viewed season, as reported by Netflix's official press statements.",
                "explanation": "",
                "likelihood": 50,
                "category": "POPULAR CULTURE"
            },
            {
                "id": 45,
                "question": "Marvel Studios will gross an average revenue higher than £802m per film.",
                "explanation": "",
                "likelihood": 50,
                "category": "POPULAR CULTURE"
            },
            {
                "id": 46,
                "question": "A Marvel or DC superhero movie released after January 1st will receive a rating of above 90% on the Rotten Tomatoes as of December 31st. ",
                "explanation": "",
                "likelihood": 50,
                "category": "POPULAR CULTURE"
            },
            {
                "id": 47,
                "question": "Oasis will officially announce a reunion, either for a tour, a single performance, or a new music project.",
                "explanation": "",
                "likelihood": 50,
                "category": "POPULAR CULTURE"
            },
            {
                "id": 48,
                "question": "Kanye West will make a publicly confirmed trip to either Israel or Palestine.",
                "explanation": "",
                "likelihood": 50,
                "category": "POPULAR CULTURE"
            },
            {
                "id": 49,
                "question": "Travis Kelce and Taylor Swift will announce or acknowledge that they are engaged to be married.",
                "explanation": "",
                "likelihood": 50,
                "category": "POPULAR CULTURE"
            },
            {
                "id": 50,
                "question": "David Attenborough",
                "explanation": "",
                "likelihood": 50,
                "category": "CELEBRITY DEATHS"
            },
            {
                "id": 51,
                "question": "Buzz Aldrin",
                "explanation": "",
                "likelihood": 50,
                "category": "CELEBRITY DEATHS"
            },
            {
                "id": 52,
                "question": "Clint Eastwood",
                "explanation": "",
                "likelihood": 50,
                "category": "CELEBRITY DEATHS"
            },
            {
                "id": 53,
                "question": "Julie Andrews",
                "explanation": "",
                "likelihood": 50,
                "category": "CELEBRITY DEATHS"
            },
            {
                "id": 54,
                "question": "Paul McCartney",
                "explanation": "",
                "likelihood": 50,
                "category": "CELEBRITY DEATHS"
            },
            {
                "id": 55,
                "question": "Joe Biden",
                "explanation": "",
                "likelihood": 50,
                "category": "CELEBRITY DEATHS"
            },
            {
                "id": 56,
                "question": "Charles III",
                "explanation": "",
                "likelihood": 50,
                "category": "CELEBRITY DEATHS"
            },
            {
                "id": 57,
                "question": "Kanye West",
                "explanation": "",
                "likelihood": 50,
                "category": "CELEBRITY DEATHS"
            },
            {
                "id": 58,
                "question": "Pete Davidson",
                "explanation": "",
                "likelihood": 50,
                "category": "CELEBRITY DEATHS"
            },
            {
                "id": 59,
                "question": "Johnny Depp",
                "explanation": "",
                "likelihood": 50,
                "category": "CELEBRITY DEATHS"
            },
            {
                "id": 60,
                "question": "Britney Spears",
                "explanation": "",
                "likelihood": 50,
                "category": "CELEBRITY DEATHS"
            },
            {
                "id": 61,
                "question": "Barack Obama",
                "explanation": "",
                "likelihood": 50,
                "category": "CELEBRITY DEATHS"
            },
            {
                "id": 62,
                "question": "The price of Bitcoin will exceed its previous all-time high of $68,789.63.",
                "explanation": "",
                "likelihood": 50,
                "category": "BUSINESS"
            },
            {
                "id": 63,
                "question": "A FAANG company will report a quarterly loss in 2024, as reported in their official quarterly financial statements.",
                "explanation": "",
                "likelihood": 50,
                "category": "BUSINESS"
            },
            {
                "id": 64,
                "question": "A current CEO of a FAANG company will step down or be replaced, as confirmed by an official company announcement.",
                "explanation": "",
                "likelihood": 50,
                "category": "BUSINESS"
            },
            {
                "id": 65,
                "question": "The England men's team will win the 2024 Euros.",
                "explanation": "",
                "likelihood": 50,
                "category": "SPORT"
            },
            {
                "id": 66,
                "question": "A UK side will win the 2023/24 men’s Champions League.",
                "explanation": "",
                "likelihood": 50,
                "category": "SPORT"
            },
            {
                "id": 67,
                "question": "Manchester City will win the 2024 men’s Premier League.",
                "explanation": "",
                "likelihood": 50,
                "category": "SPORT"
            },
            {
                "id": 68,
                "question": "An African or Asian country will win the 2024 Men's T20 Cricket World Cup.",
                "explanation": "",
                "likelihood": 50,
                "category": "SPORT"
            },
            {
                "id": 69,
                "question": "The 2024 Paris Summer Olympics will see a country win its first ever gold medal in any event.",
                "explanation": "",
                "likelihood": 50,
                "category": "SPORT"
            },
            {
                "id": 70,
                "question": "Max Verstappen will win the Formula 1 Drivers' Championship for the 2024 season.",
                "explanation": "",
                "likelihood": 50,
                "category": "SPORT"
            }
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
