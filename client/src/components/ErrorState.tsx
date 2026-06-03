import React from 'react';

interface Props {
  message: string;
  onRetry: () => void;
}

export const ErrorState: React.FC<Props> = ({ message, onRetry }) => (
  <div className="error-state">
    <div className="error-state__icon">⚠</div>
    <h3 className="error-state__title">Failed to load orders</h3>
    <p className="error-state__desc">{message}</p>
    <button className="error-state__btn" onClick={onRetry}>
      Try again
    </button>
  </div>
);