import React from 'react';
import '../styles/HowItWorks.css'; // Import the external stylesheet

function HowItWorks() {
    return (
        <div className="how-it-works-container">
            <h1 className="how-it-works-heading">How It Works</h1>
            <div className="how-it-works-content">

                <div className="how-it-works-section">
                    <h2>Event Prediction Challenge</h2>
                    <p>
                        Welcome to our Event Prediction Challenge, inspired by the principles of <em>Superforecasting</em>.
                        Here's a step-by-step guide on how to participate and make accurate predictions for events
                        happening over the next year.
                    </p>
                </div>

                <div className="how-it-works-section">
                    <h2>Review Questions</h2>
                    <p>
                        You will find a set of carefully crafted questions about various events or situations that are
                        expected to unfold within the next year. These questions are designed to challenge your predictive
                        abilities.
                    </p>
                </div>

                <div className="how-it-works-section">
                    <h2>Assess Event Likelihood</h2>
                    <p>
                        For each question, you'll be asked to select a percentage likelihood of the event occurring in the
                        specified timeframe. Consider all available information and your intuition to make your prediction.
                    </p>
                </div>

                <div className="how-it-works-section">
                    <h2>Submit Your Answers</h2>
                    <p>
                        After evaluating all the questions, submit your predictions by clicking the "Submit" button.
                        You can review and adjust your answers until the submission deadline, typically set to one year
                        from the start of the challenge.
                    </p>
                </div>

                <div className="how-it-works-section">
                    <h2>Scoring and Rankings</h2>
                    <p>
                        Our scoring system will assess the accuracy of your predictions over the course of the year.
                        The closer your predictions align with actual outcomes, the higher your score will be.
                    </p>
                </div>

                <div className="how-it-works-section">
                    <h2>Track Your Progress</h2>
                    <p>
                        Keep an eye on your progress and ranking on our leaderboard. You can see how you stack up against
                        other participants and superforecasters.
                    </p>
                </div>

                <div className="how-it-works-section">
                    <p>
                        Remember, the more accurate your predictions, the better your chances of earning the title of a
                        superforecaster.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default HowItWorks;
