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
            {
                id: 21,
                question: 'Will Joe Biden be the Democratic nominee in the 2024 US elections?\n',
                explanation: 'Track party nominations and political announcements to estimate the likelihood of Donald Trump being the nominee.',
                likelihood: 50,
                category: 'Geopolitics',
            },
            {
                id: 22,
                question: 'Will the Bharatiya Janata Party be in power for a third term following the election in India in 2024?',
                explanation: 'Track party nominations and political announcements to estimate the likelihood of Donald Trump being the nominee.',
                likelihood: 50,
                category: 'Geopolitics',
            },
            {
                id: 23,
                question: 'Will there be an armed confrontation between China and Taiwan in 2024? \n',
                explanation: 'Track party nominations and political announcements to estimate the likelihood of Donald Trump being the nominee.',
                likelihood: 50,
                category: 'Geopolitics',
            },
            {
                id: 24,
                question: 'Will Argentina end its hyperinflation by the end of 2024? Argentina\'s annual inflation rate hit 161% in November, faster than expected and the highest monthly figure this year.',
                explanation: 'Track party nominations and political announcements to estimate the likelihood of Donald Trump being the nominee.',
                likelihood: 50,
                category: 'Geopolitics',
            },
            {
                id: 25,
                question: 'Will the Israeli Defense Forces (IDF) invade Lebanon with tanks and/or armored vehicles before 15 March 2024?',
                explanation: 'Track party nominations and political announcements to estimate the likelihood of Donald Trump being the nominee.',
                likelihood: 50,
                category: 'Geopolitics',
            },
            {
                id: 26,
                question: 'Will there be a lethal confrontation between the national military forces, militia, and/or law enforcement personnel of India and China?',
                explanation: 'Track party nominations and political announcements to estimate the likelihood of Donald Trump being the nominee.',
                likelihood: 50,
                category: 'Geopolitics',
            },
            {
                id: 27,
                question: 'Will the United States or UK publicly acknowledge that it has executed a military strike within the territory of Israel, Gaza Strip, Golan Heights, the West Bank?',
                explanation: 'Track party nominations and political announcements to estimate the likelihood of Donald Trump being the nominee.',
                likelihood: 50,
                category: 'Geopolitics',
            },
            {
                id: 28,
                question: 'Will Benjamin Netanyahu cease to be prime minister of israel?',
                explanation: 'Track party nominations and political announcements to estimate the likelihood of Donald Trump being the nominee.',
                likelihood: 50,
                category: 'Geopolitics',
            },
            {
                id: 29,
                question: 'Will Israel publicly announce or acknowledge that IDF ground forces have left the Gaza Strip?',
                explanation: 'Track party nominations and political announcements to estimate the likelihood of Donald Trump being the nominee.',
                likelihood: 50,
                category: 'Geopolitics',
            },
            {
                id: 30,
                question: 'Will Russia or Belarus publicly announce that it has moved a nuclear weapon or weapons into Ukraine?',
                explanation: 'Track party nominations and political announcements to estimate the likelihood of Donald Trump being the nominee.',
                likelihood: 50,
                category: 'Geopolitics',
            },
            {
                id: 31,
                question: 'Will the United Nations Security Council expand to include additional permanent members in 2024, as announced by an official UN press release?\n',
                explanation: 'Track party nominations and political announcements to estimate the likelihood of Donald Trump being the nominee.',
                likelihood: 50,
                category: 'Geopolitics',
            },
            {
                id: 32,
                question: 'Will a new country be admitted as a full member of the European Union in 2024, as confirmed by an EU press release?',
                explanation: 'Track party nominations and political announcements to estimate the likelihood of Donald Trump being the nominee.',
                likelihood: 50,
                category: 'Geopolitics',
            },
            {
                id: 33,
                question: 'Will there be a new leader in Russia or China in 2024, as confirmed by official state communications from the respective countries?',
                explanation: 'Track party nominations and political announcements to estimate the likelihood of Donald Trump being the nominee.',
                likelihood: 50,
                category: 'Geopolitics',
            },
            {
                id: 34,
                question: 'Will any country deploy nuclear weapons in war during 2024, as reported on by the BBC?',
                explanation: 'Track party nominations and political announcements to estimate the likelihood of Donald Trump being the nominee.',
                likelihood: 50,
                category: 'Geopolitics',
            },
            {
                id: 35,
                question: 'Will NATO admit a country or part of a country as part of the organisation in 2024? ',
                explanation: 'Track party nominations and political announcements to estimate the likelihood of Donald Trump being the nominee.',
                likelihood: 50,
                category: 'Geopolitics',
            },
            {
                id: 36,
                question: 'In 2024 will the UK come in the bottom 10 countries in the Eurovision song contest, as reported on by the European Broadcasting Union.',
                explanation: 'Track party nominations and political announcements to estimate the likelihood of Donald Trump being the nominee.',
                likelihood: 50,
                category: 'Culture',
            },
            {
                id: 37,
                question: 'Will Oasis get back together in 2024?',
                explanation: 'Track party nominations and political announcements to estimate the likelihood of Donald Trump being the nominee.',
                likelihood: 50,
                category: 'Culture',
            },
            {
                id: 38,
                question: 'Marvel Productions studio grossed around $2bn in 2023 from films in the MCU. Will Marvel Productions studio gross less than $2bn in 2024? Look at average film gross?',
                explanation: 'Track party nominations and political announcements to estimate the likelihood of Donald Trump being the nominee.',
                likelihood: 50,
                category: 'Culture',
            },
            {
                id: 39,
                question: 'Will a superhero film get above 90% on rotten tomatoes in 2024',
                explanation: 'Track party nominations and political announcements to estimate the likelihood of Donald Trump being the nominee.',
                likelihood: 50,
                category: 'Culture',
            },
            {
                id: 40,
                question: 'Will Kanye West make a trip to Israel or Palestine in 2024?',
                explanation: 'Track party nominations and political announcements to estimate the likelihood of Donald Trump being the nominee.',
                likelihood: 50,
                category: 'Culture',
            },
            {
                id: 41,
                question: 'The Golden Globes will take place on the 7th of January 2024, will Barbie win more awards than Oppenheimer?',
                explanation: 'Track party nominations and political announcements to estimate the likelihood of Donald Trump being the nominee.',
                likelihood: 50,
                category: 'Culture',
            },
            {
                id: 42,
                question: 'Will Travis Kelce and Taylor Swift announce or acknowledge that they are engaged to be married?',
                explanation: 'Track party nominations and political announcements to estimate the likelihood of Donald Trump being the nominee.',
                likelihood: 50,
                category: 'Culture',
            },
            {
                id: 43,
                question: 'Will a film released in 2024 break the record for the highest-grossing opening weekend in movie history, surpassing the current record as reported by Box Office Mojo?',
                explanation: 'Track party nominations and political announcements to estimate the likelihood of Donald Trump being the nominee.',
                likelihood: 50,
                category: 'Culture',
            },
            {
                id: 44,
                question: 'Will any single television series released in 2024 break the record for the most-watched season premiere in the first 24 hours on Netflix, as reported by Netflix\'s official press statements?',
                explanation: 'Track party nominations and political announcements to estimate the likelihood of Donald Trump being the nominee.',
                likelihood: 50,
                category: 'Culture',
            },
            {
                id: 45,
                question: 'Will a non-English language film win the Academy Award for Best Picture at the 2024 Oscars, as announced during the official ceremony?',
                explanation: 'Track party nominations and political announcements to estimate the likelihood of Donald Trump being the nominee.',
                likelihood: 50,
                category: 'Culture',
            },
            {
                id: 46,
                question: 'Will a documentary featuring a member of the British Royal Family become the most-streamed documentary on any UK-based streaming platform in 2024, as reported by official streaming data?',
                explanation: 'Track party nominations and political announcements to estimate the likelihood of Donald Trump being the nominee.',
                likelihood: 50,
                category: 'Culture',
            },
            {
                id: 47,
                question: 'Will a podcast hosted by a UK presenter become the most downloaded podcast in the UK for the year 2024, as reported by a recognised media tracking service?',
                explanation: 'Track party nominations and political announcements to estimate the likelihood of Donald Trump being the nominee.',
                likelihood: 50,
                category: 'Culture',
            },
            {
                id: 48,
                question: 'Marvel Productions studio grossed around $2bn in 2023 from films in the MCU. Will Marvel Productions studio gross less than $2bn in 2024? Look at average film gross?',
                explanation: 'Track party nominations and political announcements to estimate the likelihood of Donald Trump being the nominee.',
                likelihood: 50,
                category: 'Culture',
            },
            {
                id: 49,
                question: 'Will England win the Euros 2024?',
                explanation: 'Analyze team performances, player injuries, and historical data to estimate the likelihood of England winning the Euros 2024.',
                likelihood: 50,
                category: 'Sport',
            },
            {
                id: 50,
                question: 'Will Manchester City win the Champions League final in 2024?',
                explanation: 'Evaluate Manchester City\'s season performance, squad strength, and competition strategies to estimate their chances of winning the Champions League final in 2024.',
                likelihood: 50,
                category: 'Sport',
            },
            {
                id: 51,
                question: 'Will Arsenal win the Premier League final in May 2024?',
                explanation: 'Assess Arsenal\'s team form, league standings, and historical achievements to estimate their probability of winning the Premier League final in May 2024.',
                likelihood: 50,
                category: 'Sport',
            },
            {
                id: 52,
                question: 'Which cricket team will win the 2024 Men\'s T20 World Cup Final?',
                explanation: 'Analyze the performances of various cricket teams, player form, and past tournament results to predict the winner of the 2024 Men\'s T20 World Cup Final.',
                likelihood: 50,
                category: 'Sport',
            },
            {
                id: 53,
                question: 'Will the 2024 Summer Olympics in Paris see a new country win its first ever gold medal in any event, as confirmed by the official Olympic Committee\'s records?',
                explanation: 'Review historical Olympic records, emerging athletes, and national team improvements to assess the likelihood of a new country winning its first ever gold medal at the 2024 Summer Olympics.',
                likelihood: 50,
                category: 'Sport',
            },
            {
                id: 54,
                question: 'Will Max Verstappen be the Grand Prix winner of the 2024 Formula 1 championship?',
                explanation: 'Examine Max Verstappen\'s racing performance, team dynamics, and competition level to estimate his chances of winning the 2024 Formula 1 championship.',
                likelihood: 50,
                category: 'Sport',
            },
            {
                id: 55,
                question: 'Will Apple release a new iPhone model with a foldable screen feature, as confirmed by an official company press release?',
                explanation: 'Monitor Apple\'s product development trends and technological advancements to estimate the likelihood of a foldable iPhone release.',
                likelihood: 50,
                category: 'Science and Technology',
            },
            {
                id: 56,
                question: 'Will the World Health Organisation declare a new global health emergency due to an infectious disease outbreak?',
                explanation: 'Analyze global health trends, emerging infectious diseases, and WHO announcements to estimate the likelihood of a new global health emergency.',
                likelihood: 50,
                category: 'Health',
            },
            {
                id: 57,
                question: 'Will the market capitalisation of Bitcoin exceed its previous all-time high at any point in 2024, as reported by a major financial news outlet?',
                explanation: 'Examine market trends, economic factors, and investor sentiment to estimate if Bitcoin\'s market capitalization will surpass its previous all-time high in 2024.',
                likelihood: 50,
                category: 'Business',
            },
            {
                id: 58,
                question: 'Will any of the FAANG companies (Facebook, Amazon, Apple, Netflix, Google) report a quarterly loss in 2024, as reported in their official quarterly financial statements?',
                explanation: 'Review the financial health, market conditions, and revenue streams of FAANG companies to assess the likelihood of any reporting a quarterly loss in 2024.',
                likelihood: 50,
                category: 'Business',
            },
            {
                id: 59,
                question: 'Will any of the current CEOs of the FAANG companies (Meta/Facebook, Amazon, Apple, Netflix, Google/Alphabet) step down or be replaced in 2024, as confirmed by an official company announcement?',
                explanation: 'Track leadership trends, company performance, and executive announcements to predict any potential CEO changes within FAANG companies in 2024.',
                likelihood: 50,
                category: 'Business',
            },
            {
                id: 60,
                question: 'Will COP 29 be hosted in Azerbaijan?',
                explanation: 'Follow updates from the United Nations Framework Convention on Climate Change (UNFCCC) and other relevant sources to determine the likelihood of Azerbaijan hosting COP 29.',
                likelihood: 50,
                category: 'Environment',
            },
            {
                id: 61,
                question: 'Will a P5 country back out of COP 29?',
                explanation: 'Monitor diplomatic relations, climate policy stances, and official statements from P5 countries to assess the probability of any withdrawing from COP 29.',
                likelihood: 50,
                category: 'Environment',
            },
            {
                id: 62,
                question: 'Will the percentage of renewable electricity rise above 55% for any quarter of 2024? According to GOV.UK, the percentage of electricity derived from renewable sources was 44.5% in Q3 2023.',
                explanation: 'Analyze energy trends, government policies, and renewable energy advancements to estimate if the percentage of renewable electricity will exceed 55% in 2024.',
                likelihood: 50,
                category: 'Environment',
            },
            {
                id: 63,
                question: 'Will electric vehicle sales account for more than 10% of total global car sales in 2024, as reported by the International Energy Agency?',
                explanation: 'Evaluate global car sales trends, EV market growth, and technological developments to assess if electric vehicle sales will surpass 10% of the total in 2024.',
                likelihood: 50,
                category: 'Environment',
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
