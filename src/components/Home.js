// Home.js
import React, { useState, useEffect } from 'react';
import { auth } from '../firebase';
import UpdateScoreButton from './UpdateScoreButton';
import Menu from './Menu';
import Forecasts from './Forecasts';
import Leaderboard from './Leaderboard';
import HowItWorks from './HowItWorks';
import Profile from './Profile';
import '../styles/App.css';
import '../styles/Home.css';

function Home() {
    const [user, setUser] = useState(null);
    const [selectedMenuItem, setSelectedMenuItem] = useState('Forecasts');

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setUser(user);
        });
        return () => unsubscribe();
    }, []);

    const handleMenuSelect = (menuItem) => {
        setSelectedMenuItem(menuItem);
    };

    const renderContent = () => {
        switch (selectedMenuItem) {
            case 'Forecasts':
                return <Forecasts />;
            case 'Leaderboard':
                return <Leaderboard />;
            case 'How it works':
                return <HowItWorks />;
            case 'Profile':
                return <Profile user={user} />;
            default:
                return <div>Select a menu item</div>;
        }
    };

    return (
        <div className="home-layout">
            <Menu selected={selectedMenuItem} onSelect={handleMenuSelect} />
            <div className="main-content">
                {user ? (
                    <>
                        {/*<h2>Welcome back {user.email}!</h2>*/}
                        {/*<UpdateScoreButton userId={user.uid} userName={user.displayName} />*/}
                        {/*<button onClick={() => auth.signOut()}>Logout</button>*/}
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
