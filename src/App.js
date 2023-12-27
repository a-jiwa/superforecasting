import React, { useState, useEffect } from "react";
import { HashRouter as Router, Route, Routes, Navigate } from "react-router-dom"; // Modified import
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";

import Landing from "./components/Landing";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Home from "./components/Home";
import Verification from "./components/Verification";

function App() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    if (loading) {
        return <div>Loading...</div>; // Or some loading spinner component
    }

    return (
        <Router> {/* Using HashRouter now */}
            <Routes>
                {/* If user is logged in but not verified, navigate to Verification page */}
                <Route path="/" element={user ? (user.emailVerified ? <Home /> : <Verification setUser={setUser} />) : <Landing />} />
                <Route path="/login" element={user ? (user.emailVerified ? <Navigate to="/" /> : <Navigate to="/verification" />) : <Login />} />
                <Route path="/signup" element={user ? <Navigate to="/" /> : <Signup />} />
                {/* Only navigate to Verification if the user is logged in and not verified */}
                <Route path="/verification" element={user ? (user.emailVerified ? <Navigate to="/" /> : <Verification setUser={setUser} />) : <Navigate to="/login" />} />
            </Routes>
        </Router>
    );
}

export default App;
