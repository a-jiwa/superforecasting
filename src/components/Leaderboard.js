import React, { useEffect, useState } from 'react';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '../firebase';

function Leaderboard() {
    const [scores, setScores] = useState([]);

    useEffect(() => {
        const fetchScores = async () => {
            try {
                const q = query(collection(db, "leaderboard"), orderBy("score", "desc"));
                const querySnapshot = await getDocs(q);
                const scores = [];
                querySnapshot.forEach((doc) => {
                    scores.push(doc.data());
                });
                setScores(scores);
            } catch (error) {
                console.error("Error getting documents: ", error);
            }
        };

        fetchScores();
    }, []);

    return (
        <div>
            <h1>Leaderboard</h1>
            <ul>
                {scores.map((score, index) => (
                    <li key={index}>{score.userName} - {score.score}</li>
                ))}
            </ul>
        </div>
    );
}

export default Leaderboard;
