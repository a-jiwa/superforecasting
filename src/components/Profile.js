// Profile.js
import React from 'react';
import { auth } from '../firebase'; // Ensure this is correctly imported from your Firebase configuration
import '../styles/Profile.css'; // Import the external stylesheet

function Profile({ user }) {
    // Function to generate a background color based on the user ID
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

    return (
        <div className="profile-container">
            <div className="profile-header">
                <div className="profile-name-email">
                    <h1>{user.displayName}</h1>
                    <p>{user.email}</p>
                </div>
                <div className="profile-picture" style={{ backgroundColor: stringToColor(user.uid) }}>
                    {user.displayName[0]}
                </div>
            </div>
            <div className="score">
                {user.score}
            </div>
            <button className="logout-button" onClick={() => auth.signOut()}>
                Log Out
            </button>
        </div>
    );
}

export default Profile;
