import React from 'react';

interface Props {
  insights: string[];
}

export const InsightsPanel: React.FC<Props> = ({ insights }) => (
  <div className="insights-panel">
    <div className="panel-title">Smart Insights</div>
    <ul className="insights-list">
      {insights.map((insight, i) => (
        <li key={i} className="insights-item">{insight}</li>
      ))}
    </ul>
  </div>
);