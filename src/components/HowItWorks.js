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
                        The game is designed to test your prediction skills.
                        At the end the year, you answer questions predicting the likelihood of various events occurring in
                        the upcoming year. These predictions are then evaluated at the end of next year, comparing
                        what you thought would happen with what actually happened. Your forecasting skills will be measured to
                        see how you stack up against others.
                    </p>
                </div>

                <div className="how-it-works-section">
                    <h2>Gameplay Mechanics</h2>
                    <p>
                        The game centers around predicting the likelihood of various events. You are asked to
                        assign a probability to each event, ranging from 0% (impossible)
                        to 100% (certain).
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
                    <h2>Scoring System</h2>
                    <p>
                        The accuracy of predictions is measured using Brier Scoring, a method that calculates the difference
                        between the predicted probability and the actual outcome. For example, if you predict a 60%
                        chance of a specific event occurring and it does happen, the score for that prediction is computed
                        as (60% - 100%)^2 = 0.16. The player's final score is an average of these squared differences across
                        all predictions, with a lower score indicating more accurate forecasting.
                    </p>
                    <h4>Can't I just put 50% for all questions?</h4>
                    <p>You might be wondering, why not assign a 50% likelihood to every event, as it seems a safe middle ground.
                        However, this strategy is flawed because it ignores the varying probabilities of real-life events.
                        Assigning more accurate probabilities, even if they entail greater risk, typically results in better
                        scores. This aspect of the game challenges players to move beyond mere guesswork and develop a more
                        nuanced understanding of probability and event likelihood.
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
