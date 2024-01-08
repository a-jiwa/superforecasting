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
                let scoresData = [];
                querySnapshot.forEach((doc) => {
                    scoresData.push({
                        ...doc.data(),
                        id: doc.id
                    });
                });

                // Sorting by score and then alphabetically in case of a tie
                scoresData.sort((a, b) => {
                    if (a.score === b.score) {
                        return a.userName.localeCompare(b.userName);
                    }
                    return b.score - a.score;
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

    // Function to assign ranks with ties
    const assignRanksWithTies = (scores) => {
        let currentRank = 1;
        let prevScore = null;
        let usersAtCurrentRank = 0;

        scores.forEach((score, index) => {
            if (score.score === prevScore) {
                // Same score as previous, assign same rank and increment the users at this rank
                score.rank = currentRank;
                usersAtCurrentRank++;
            } else {
                // New score, update currentRank considering the number of users at previous rank
                currentRank += (prevScore === null ? 0 : usersAtCurrentRank);
                score.rank = currentRank;
                prevScore = score.score;
                usersAtCurrentRank = 1; // Reset the counter for the new rank
            }
        });

        return scores;
    };


    // Call assignRanks and store the result in a state or variable
    const scoresWithRanks = assignRanksWithTies(scores);

    const renderRankIcon = (rank) => {
        switch (rank) {
            case 1:
                return <img src={FirstPlaceIcon} alt="1st Place" className="rank-icon" />;
            case 2:
                return <img src={SecondPlaceIcon} alt="2nd Place" className="rank-icon" />;
            case 3:
                return <img src={ThirdPlaceIcon} alt="3rd Place" className="rank-icon" />;
            default:
                return rank;
        }
    };

    return (
        <div className="leaderboard">
            <div className="leaderboard-header">
                <h1>Leaderboard</h1>
                <h2>Top Players</h2>
            </div>
            <ul className="leaderboard-list">
                {scoresWithRanks.map((score) => (
                    <li key={score.id} className={`leaderboard-entry ${score.userId === activeUserId ? 'active-user-row' : ''}`}>
                        <span className="rank">{renderRankIcon(score.rank)}</span>
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
