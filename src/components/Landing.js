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
                    <h3>Make your forecasts today.</h3>
                        <div className="text-area-bigscreen">
                            <p className="landing-p-text">Research has found that some people are exceptionally skilled at assigning realistic
                                probabilities to possible outcomes – even on topics outside their expertise or interest.
                                These people are called <a href="https://goodjudgment.com/about/"
                                                           className="superforecaster-link">Superforecasters</a>.</p>
                            <p className="landing-p-text">Are you one of these Superforecasters?</p>
                            <p className="landing-p-text">Compete against a pool of rivals for a <b className="landing-b-text">£100 Amazon voucher</b>, answering questions from global politics to popular culture in  <b className="landing-b-text"> the year ahead</b>, to find out!</p>
                        </div>
                        <div className="text-area-smallscreen">
                            <p className="landing-p-text">Compete against a pool of rivals for a <b className="landing-b-text">£100 amazon voucher</b>, answering
                                questions from global politics to popular culture in  <b className="landing-b-text"> the year ahead</b>. Find out just
                                how good at political and social punditry you really are.</p>
                        </div>
                    </div>
                </div>
                <div className="right-column">

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
