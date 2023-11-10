import React, { useEffect, useState } from 'react';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '../firebase';
import '../styles/Leaderboard.css';

import FirstPlaceIcon from '../icons/first.svg';
import SecondPlaceIcon from '../icons/second.svg';
import ThirdPlaceIcon from '../icons/third.svg';

function Leaderboard({ activeUserId }) {
    const [scores, setScores] = useState([]);
    const colors = ["#FFADAD", "#FFD6A5", "#FDFFB6", "#CAFFBF", "#9BF6FF", "#A0C4FF", "#BDB2FF", "#FFC6FF"]; // Preset colors

    useEffect(() => {
        const fetchScores = async () => {
            try {
                const q = query(collection(db, "leaderboard"), orderBy("score", "desc"));
                const querySnapshot = await getDocs(q);
                const scoresData = [];
                querySnapshot.forEach((doc) => {
                    scoresData.push({
                        ...doc.data(),
                        id: doc.id
                    });
                });
                setScores(scoresData);
            } catch (error) {
                console.error("Error getting documents: ", error);
            }
        };

        fetchScores();
    }, []);

    const defaultProfilePic = (
        <svg height="50" width="50" viewBox="0 0 50 50" className="profile-svg">
            <circle cx="25" cy="25" r="20" stroke="black" strokeWidth="3" fill="gray" />
        </svg>
    );

    const getRandomColor = () => {
        return colors[Math.floor(Math.random() * colors.length)];
    };

    // Helper function to generate color based on the string
    const stringToColor = (str) => {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            hash = str.charCodeAt(i) + ((hash << 5) - hash);
        }
        let color = '#';
        for (let i = 0; i < 3; i++) {
            const value = (hash >> (i * 8)) & 0xFF;
            color += ('00' + value.toString(16)).substr(-2);
        }
        return color;
    };
    
    const ProfilePicture = ({ name }) => {
        const initial = name ? name.charAt(0).toUpperCase() : '';
        const bgColor = stringToColor(name || '');

        return (
            <svg height="50" width="50" viewBox="0 0 50 50" className="profile-svg">
                <circle cx="25" cy="25" r="20" fill={bgColor} />
                <text x="50%" y="50%" dy=".35em" textAnchor="middle" fill="#FFFFFF" fontSize="20px" fontFamily="Arial">
                    {initial}
                </text>
            </svg>
        );
    };

    const TopRankSVG = ({ rank }) => (
        <svg height="30" width="30" className={`rank-svg rank-${rank}`}>
            {/* SVG content here. Example: A star or medal icon */}
            <text x="50%" y="50%" dy=".3em" textAnchor="middle" fill="#000" fontSize="20px" fontFamily="Arial">
                {rank}
            </text>
        </svg>
    );

    const renderRank = (index) => {
        switch (index) {
            case 0:
                return <img src={FirstPlaceIcon} alt="1st Place" className="rank-icon" />;
            case 1:
                return <img src={SecondPlaceIcon} alt="2nd Place" className="rank-icon" />;
            case 2:
                return <img src={ThirdPlaceIcon} alt="3rd Place" className="rank-icon" />;
            default:
                return index + 1;
        }
    };

    return (
        <div className="leaderboard">
            <div className="leaderboard-header">
                <h1>Leaderboard</h1>
                <h2>Top Players</h2>
            </div>
            <ul className="leaderboard-list">
                {scores.map((score, index) => (
                    <li key={score.id || index}
                        className={`leaderboard-entry ${score.userId === activeUserId ? 'active-user-row' : ''}`}>
                        <span className="rank">{renderRank(index)}</span>
                        <div className="profile-pic-container">
                            <ProfilePicture name={score.userName} />
                        </div>
                        <span className="name">
                        {score.userName}
                    </span>
                        <span className="score">{score.score}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Leaderboard;
