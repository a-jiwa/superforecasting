import React from 'react';
import '../styles/Menu.css'; // Import the CSS for Menu

// Import or define your SVG icon components here
import { ReactComponent as ForecastIcon } from '../icons/home.svg';
import { ReactComponent as LeaderboardIcon } from '../icons/leaderboard.svg';
import { ReactComponent as HowItWorksIcon } from '../icons/how-it-works.svg';
import { ReactComponent as ProfileIcon } from '../icons/profile.svg';
import { ReactComponent as LogoIcon } from '../icons/home.svg';

function MenuItem({ label, Icon, isSelected, onClick }) {
    return (
        <div className={`menu-item ${isSelected ? 'selected' : ''}`} onClick={onClick}>
            <Icon className="menu-icon" />
            <span className="menu-text">{label}</span>
        </div>
    );
}

function Menu({ selected, onSelect }) {
    const menuItems = [
        { label: 'Forecasts', Icon: ForecastIcon },
        { label: 'Leaderboard', Icon: LeaderboardIcon },
        { label: 'How it works', Icon: HowItWorksIcon },
        { label: 'Profile', Icon: ProfileIcon },
    ];

    return (
        <div className="menu">
            <div className="logo-container">
                <LogoIcon className="logo-icon" />
                <span className="logo-text"><h2>Forecasting</h2></span>
            </div>
            {menuItems.map((item) => (
                <MenuItem
                    key={item.label}
                    label={item.label}
                    Icon={item.Icon}
                    isSelected={selected === item.label}
                    onClick={() => onSelect(item.label)}
                />
            ))}
        </div>
    );
}

export default Menu;
