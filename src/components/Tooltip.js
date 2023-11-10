// Tooltip.js
import React from 'react';
import '../styles/Tooltip.css'; // create appropriate styles for the tooltip

const Tooltip = ({ children, description }) => {
    return (
        <span className="tooltip">
      {children}
            <span className="tooltip-text">{description}</span>
    </span>
    );
};

export default Tooltip;
