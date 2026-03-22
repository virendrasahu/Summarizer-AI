import React from 'react';
import '../App.css';

const ResultCard = ({ result }) => {
  if (!result) return null;

  const { summary, keyPoints, sentiment } = result;

  return (
    <div className="result-section">
      <div className="result-card">
        <div className="summary-title">Executive Summary</div>
        <p className="summary-text">{summary}</p>
        
        <div className="summary-title">Key Insights</div>
        <ul className="key-points">
          {keyPoints.map((point, index) => (
            <li key={index}>{point}</li>
          ))}
        </ul>

        <div className="summary-title">Analysis Tone</div>
        <div className={`sentiment-badge sentiment-${sentiment}`}>
          {sentiment}
        </div>
      </div>
    </div>
  );
};

export default ResultCard;
