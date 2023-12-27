import React from 'react';
import '../styles/HowItWorks.css'; // Import the external stylesheet

function HowItWorks() {
    return (
        <div className="how-it-works-container">
            <h1 className="how-it-works-heading">How it works</h1>
            <div className="how-it-works-content">

                <div className="how-it-works-section">
                    <h2>Overview</h2>
                    <p>
                        The game is designed to test your prediction skills. You will be going head-to-head against other competitors, including Chat GPT, to see who is the most dialed in to categories including Politics, Culture, and Sport. Here is your chance to back up the spurious claims you make to family, friends, and colleagues with data!</p>
                    <p>
                    By the 7th of January, you will answer questions predicting the likelihood of various events occurring in 2024. These predictions will be monitored throughout the year, and by the time 2025 comes around, your overall ranking and level of accuracy will be calculated and awarded to you.                    </p>
                </div>

                <div className="how-it-works-section">
                    <h2>Gameplay Mechanics</h2>
                    <p>
                        For each question, you are asked to assign a probability to an event, ranging from 0% (impossible) to 100% (certain).
                        </p>
                    <p>
                        After completing all the questions, you can submit your predictions by clicking the "Submit" button. You can review and adjust your answers until the submission deadline on the 7th of January.                    </p>
                </div>

                <div className="how-it-works-section">
                    <h2>Scoring System</h2>
                    <p>
                        The accuracy of predictions is measured using Brier Scoring, a method that calculates the difference between the predicted probability and the actual outcome. For example, if you predict a 60% chance of a specific event occurring and it does happen, the score for that prediction is computed as (60% - 100%)^2 = 0.16. The player's final score is an average of these squared differences across all predictions, with a lower score indicating more accurate forecasting.
                    </p>
                    <h4>Can't I just put 50% for all questions?</h4>
                    <p>You might be wondering, why not assign a 50% likelihood to every event, and guarantee an averaging score? This strategy is flawed because it ignores the varying probabilities of real-life events. Assigning less neutral probabilities, even if they entail greater risk, typically results in better scores. To do well, you will need to move beyond guesswork and be willing to take informed risks.
                    </p>
                </div>

                <div className="how-it-works-section">
                    <h2>I've submitted my answers, what now?
                    </h2>
                    <p>
                        Thanks for playing! Now that you have finished, sit back and enjoy 2024! We will monitor events as they come and update the leaderboard each quarter. When that happens, we will let you know, and you can check where you are stacking up.

                    </p>
                </div>

                {/*<div className="how-it-works-section">*/}
                {/*    <p>*/}
                {/*        Remember, the more accurate your predictions, the better your chances of earning the title of a*/}
                {/*        superforecaster.*/}
                {/*    </p>*/}
                {/*</div>*/}
            </div>
        </div>
    );
}

export default HowItWorks;
