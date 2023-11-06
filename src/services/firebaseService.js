// src/services/firebaseService.js
import { collection, addDoc, getFirestore } from 'firebase/firestore';

const db = getFirestore();

export const updateScore = async (userId, userName, score) => {
    try {
        const docRef = await addDoc(collection(db, "leaderboard"), {
            userId,
            userName,
            score
        });
        console.log("Document written with ID: ", docRef.id);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
};
