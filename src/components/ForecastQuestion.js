// ForecastQuestion.js
import React from 'react';
import '../styles/Forecasts.css';
import { throttle } from 'lodash';
import Tooltip from './Tooltip';

const ForecastQuestion = ({ question, explanation, likelihood, handleSliderChange, id, hasSubmitted }) => {

    const wordDescriptions = {
        recession: 'A fall in GDP in two successive quarters',
        // Add more words and their descriptions here
    };

    // Define your styles as a dictionary or object
    const additionalStyles = {
        highlight: { color: 'rgb(28, 176, 246)', fontWeight: 'bold' }, // Example style
        // Add more styles as needed
    };

// Define the words and the styles you want to apply to them
    const styledWords = {
        // '2.5%': 'highlight',
        // ... other words
    };


    // Function to split the question into words and wrap with Tooltip if description exists
    const renderQuestionWithTooltips = (question) => {
        // Split the question into words, spaces, and numeric terms including '%'
        return question.split(/(\s+|%|\d+\.\d+%)/).map((word, index) => {
            // Directly check if the word matches one of the keys in styledWords
            if (wordDescriptions[word]) {
                return (
                    <Tooltip description={wordDescriptions[word]} key={index}>
                        <span className="glossary-word">{word}</span>
                    </Tooltip>
                );
            } else if (styledWords[word]) {
                // Apply the style from additionalStyles dictionary
                const styleKey = styledWords[word];
                const style = additionalStyles[styleKey];
                return (
                    <span style={style} key={index}>
          {word}
        </span>
                );
            }
            return word; // Return the word as is if no special styling
        });
    };




    const throttledHandleSliderChange = throttle((id, value) => {
        handleSliderChange(id, value);
    }, 200);

    const getPercentageColor = (value) => {
        // Define color stops as an array of [percentage, color] tuples
        const colorStops = [
            [0, 'rgb(213,14,14)'],    // Red at 0%
            [50, 'rgb(255, 165, 0)'], // Orange at 50%
            [100, 'rgb(14,194,14)'],  // Green at 100%
            // Add more color stops if needed
        ];

        // Find the two closest stops
        const lowerStop = colorStops.reduce((prev, curr) => (curr[0] <= value ? curr : prev));
        const upperStop = colorStops.find(stop => stop[0] >= value) || lowerStop;

        // Calculate the ratio between the two stops
        const range = upperStop[0] - lowerStop[0];
        const rangeValue = value - lowerStop[0];
        const ratio = range !== 0 ? rangeValue / range : 1;

        // Linear interpolation of the colors
        const lerpColor = (color1, color2, ratio) => {
            const rgb1 = color1.match(/\d+/g).map(Number);
            const rgb2 = color2.match(/\d+/g).map(Number);
            return `rgb(${
                rgb1.map((component, index) => Math.round(component + (rgb2[index] - component) * ratio)).join(', ')
            })`;
        };

        // Return the interpolated color
        return lerpColor(lowerStop[1], upperStop[1], ratio);
    };

    const percentageColor = getPercentageColor(likelihood);

    // Convert the likelihood into a descriptive label
    const getLikelihoodDescription = (value) => {
        if (value == 0) return 'Impossible';
        if (value > 0 && value < 10) return 'Extremely unlikely';
        if (value >= 10 && value < 20) return 'Highly unlikely';
        if (value >= 20 && value < 30) return 'Very unlikely';
        if (value >= 30 && value < 40) return 'Rather unlikely';
        if (value >= 40 && value < 50) return 'Somewhat unlikely';
        if (value == 50) return 'Fifty-fifty';
        if (value > 50 && value < 60) return 'Somewhat likely';
        if (value >= 60 && value < 70) return 'Rather likely';
        if (value >= 70 && value < 80) return 'Very likely';
        if (value >= 80 && value < 90) return 'Highly likely';
        if (value >= 90 && value < 100) return 'Extremely likely'; // Assuming the value can be 100 or more
        if (value == 100) return 'Certain';
    };

    const likelihoodDescription = getLikelihoodDescription(likelihood);


    return (
        <div className="forecast-question">
            <h2>{renderQuestionWithTooltips(question)}</h2>
            <p>{explanation}</p>
            <div className="slider-container">
                <span className="slider-label">Impossible</span>
                <input
                    type="range"
                    min="0"
                    max="100"
                    value={likelihood}
                    onChange={(e) => throttledHandleSliderChange(id, e.target.value)}
                    disabled={hasSubmitted}
                />
                <span className="slider-label">Certain</span>
                <span className="percentage-indicator" style={{ color: percentageColor, fontWeight: 'bold' }}>
                    {likelihood}%
                </span>
            </div>
            <div className="likelihood-description-container">
                <div className="likelihood-description" style={{ color: percentageColor, textAlign: 'center' }}>
                    <h1>{likelihoodDescription}</h1>
                </div>
            </div>
        </div>
    );
};

export default ForecastQuestion;
