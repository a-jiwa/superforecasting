import React, { useEffect, useState } from "react";
import { auth } from "../firebase";
import UpdateScoreButton from "./UpdateScoreButton";
import '../styles/App.css';

function Home() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Subscribe to user on auth state changed.
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                console.log("User Name: ", user.displayName); // Log the displayName to see if it is updated
            }
            setUser(user);
        });

        // Unsubscribe to avoid memory leaks
        return () => unsubscribe();
    }, []);

    const userId = user ? user.uid : null;
    const userName = user ? user.displayName : null;
    const userEmail = user ? user.email : null;

    return (
        <div className="container">
            <h2>Welcome back {userEmail}!</h2>
            {user ? (
                <UpdateScoreButton userId={userId} userName={userName} />
            ) : (
                <p>Loading...</p>
            )}
            <button onClick={() => auth.signOut()}>Logout</button>
        </div>
    );
}

export default Home;
