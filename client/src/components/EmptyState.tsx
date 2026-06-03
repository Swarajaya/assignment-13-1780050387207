import React from 'react';

interface Props {
  hasSearch: boolean;
  onClear: () => void;
}

export const EmptyState: React.FC<Props> = ({ hasSearch, onClear }) => (
  <div className="empty-state">
    <div className="empty-state__icon">◎</div>
    <h3 className="empty-state__title">
      {hasSearch ? 'No matching orders' : 'No orders yet'}
    </h3>
    <p className="empty-state__desc">
      {hasSearch
        ? 'Try adjusting your search or clearing the filter.'
        : 'Orders will appear here once they come in.'}
    </p>
    {hasSearch && (
      <button className="empty-state__btn" onClick={onClear}>
        Clear search
      </button>
    )}
  </div>
);