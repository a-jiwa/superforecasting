// ForecastQuestion.js
import React from 'react';
import '../styles/Forecasts.css';

import { ReactComponent as Face1 } from '../styles/face-10.svg';
import { ReactComponent as Face2 } from '../styles/face-4.svg';
import { ReactComponent as Face3 } from '../styles/face-11.svg';
import { ReactComponent as Face4 } from '../styles/face-9.svg';
import { ReactComponent as Face5 } from '../styles/face-7.svg';
import { ReactComponent as Face6 } from '../styles/face-2.svg';
import { ReactComponent as Face7 } from '../styles/face-12.svg';
import { ReactComponent as Face8 } from '../styles/face-8.svg';
import { ReactComponent as Face9 } from '../styles/face-5.svg';
import { ReactComponent as Face10 } from '../styles/face-2.svg';
import { ReactComponent as Face11 } from '../styles/face-3.svg';
import { ReactComponent as Face12 } from '../styles/face-1.svg';

// A simple function to select SVG based on the slider value
// A function to select an SVG based on the slider value
const selectExpression = (likelihood) => {
    // Divide the 0-100 range into 12 increments of approximately 8.33 each
    const increment = 100 / 12;

    if (likelihood < increment) return <Face1 />;
    else if (likelihood < increment * 2) return <Face2 />;
    else if (likelihood < increment * 3) return <Face3 />;
    else if (likelihood < increment * 4) return <Face4 />;
    else if (likelihood < increment * 5) return <Face6 />;
    else if (likelihood < increment * 6) return <Face6 />;
    else if (likelihood < increment * 7) return <Face7 />;
    else if (likelihood < increment * 8) return <Face9 />;
    else if (likelihood < increment * 10) return <Face10 />;
    else if (likelihood < increment * 11) return <Face11 />;
    else return <Face12 />;
};
const ForecastQuestion = ({ question, explanation, likelihood, handleSliderChange, id, hasSubmitted }) => {
    return (
        <div className="forecast-question">
            <h2>{question}</h2>
            <p>{explanation}</p>
            <div className="slider-container">
                <span className="slider-label">Unlikely</span>
                <input
                    type="range"
                    min="0"
                    max="100"
                    value={likelihood}
                    onChange={(e) => handleSliderChange(id, e.target.value)}
                    disabled={hasSubmitted}
                />
                <span className="slider-label">Likely</span>
                <div className="expression-face">
                    {selectExpression(likelihood)}
                </div>
            </div>
            <span className="likelihood-percentage">{likelihood}%</span>
        </div>
    );
};

export default ForecastQuestion;
