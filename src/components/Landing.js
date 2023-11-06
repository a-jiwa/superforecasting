import React from "react";
import { Link } from "react-router-dom";
import Lottie from "react-lottie";
import whale from "../styles/globe-3.json"; // Replace with the path to your Lottie JSON file
import "../styles/App.css";
import "../styles/Landing.css";

function Landing() {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: whale,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    };

    return (
        <div className="landing-container">
            {/* Header Bar */}
            <div className="header">
                <h2>Superforecasting</h2>
            </div>

            {/* Main Content */}
            <div className="main-content">
                {/* Two Columns */}
                <div className="left-column">
                    {/* Lottie Animation */}
                    <Lottie options={defaultOptions} className="lottie-animation" />
                </div>
                <div className="right-column">
                    <h3>Make your forecasts now!</h3>
                    <div className="buttons">
                        <Link to="/signup" className="button blue-button">
                            GET STARTED
                        </Link>
                        <Link to="/login" className="button white-button">
                            I ALREADY HAVE AN ACCOUNT
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Landing;
