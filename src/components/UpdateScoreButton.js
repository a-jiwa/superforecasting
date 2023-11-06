import React from 'react';
import { updateScore } from '../services/firebaseService';

function UpdateScoreButton({ userId, userName }) {
    const score = 10;

    const handleClick = async () => {
        try {
            await updateScore(userId, userName, score);
            console.log("Score Updated Successfully");
        } catch (error) {
            console.error("Error updating score: ", error);
        }
    }

    return <button onClick={handleClick}>Update Score</button>;
}

export default UpdateScoreButton;
