import React from "react";
import { Link } from "react-router-dom";
import "../styles/App.css";
import "../styles/Landing.css";
import ShapeAnimation from "./ShapeAnimation";

function Landing() {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    };


    return (
        <div className="landing-container">
            {/* Header Bar */}
            {/*<div className="header">*/}
            {/*    <h2>Superforecasting</h2>*/}
            {/*</div>*/}

            {/* Main Content */}
            <div className="landing-main-content">
                {/* Two Columns */}
                <div className="left-column">
                    {/*<div className="shape-animation">*/}
                    {/*    <ShapeAnimation />*/}
                    {/*</div>*/}
                    <div className="text-area">
                    {/* Lottie Animation */}
                    {/*<Lottie options={defaultOptions} className="lottie-animation" />*/}
                    <h3>Make your forecasts today.</h3>
                        <p>Research has found that some people are exceptionally skilled at assigning realistic
                            probabilities to possible outcomes – even on topics outside their expertise or interest.
                            These people are called <a href="https://goodjudgment.com/about/"
                                                       className="superforecaster-link">Superforecasters</a>.</p>
                        <p>Are you one of these Superforecasters?</p>
                        <p>Compete against a pool of rivals, answering questions on the year ahead, covering categories
                            including Politics, Culture, and Sport to find out!</p>
                    </div>
                </div>
                <div className="right-column">

                    {/*<h3>Make your forecasts now!</h3>*/}
                    {/*<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>*/}
                    <div className="buttons">
                        <Link to="/signup" className="button blue-button">
                            Get Started
                        </Link>
                        <Link to="/login" className="button white-button">
                            I Already Have an Account
                        </Link>
                    </div>
                    <div className={"ourNames"}>
                        Created by<br/><b>Adnaan Jiwa</b> & <b>Brendan Machell</b>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Landing;
