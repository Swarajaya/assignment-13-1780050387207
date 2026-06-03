import React from 'react';

export const SkeletonCard: React.FC = () => (
  <div className="skeleton-card">
    <div className="skeleton-card__header">
      <div>
        <div className="skel skel--sm" />
        <div className="skel skel--lg" style={{ marginTop: 6 }} />
      </div>
      <div style={{ textAlign: 'right' }}>
        <div className="skel skel--sm" style={{ marginLeft: 'auto' }} />
        <div className="skel skel--md" style={{ marginTop: 6, marginLeft: 'auto' }} />
      </div>
    </div>
  </div>
);