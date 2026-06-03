import React from 'react';
import { Analytics } from '../types';

interface Props {
  analytics: Analytics;
}

const SEGMENTS = [
  { key: 'received',    label: 'Received',    color: '#3b82f6' },
  { key: 'inCleaning',  label: 'In Cleaning', color: '#f97316' },
  { key: 'ready',       label: 'Ready',       color: '#22c55e' },
  { key: 'delivered',   label: 'Delivered',   color: '#a855f7' },
] as const;

export const DistributionBar: React.FC<Props> = ({ analytics }) => {
  const total = analytics.totalGarments || 1;
  const values: Record<string, number> = {
    received: analytics.received,
    inCleaning: analytics.inCleaning,
    ready: analytics.ready,
    delivered: analytics.delivered,
  };

  return (
    <div className="dist-bar">
      <div className="dist-bar__title">Garment Status Distribution</div>
      <div className="dist-bar__track">
        {SEGMENTS.map((seg) => {
          const pct = (values[seg.key] / total) * 100;
          return pct > 0 ? (
            <div
              key={seg.key}
              className="dist-bar__segment"
              style={{ width: `${pct}%`, background: seg.color }}
              title={`${seg.label}: ${Math.round(pct)}%`}
            />
          ) : null;
        })}
      </div>
      <div className="dist-bar__legend">
        {SEGMENTS.map((seg) => {
          const pct = Math.round((values[seg.key] / total) * 100);
          return (
            <div key={seg.key} className="dist-bar__legend-item">
              <span className="dist-bar__dot" style={{ background: seg.color }} />
              <span className="dist-bar__legend-label">{seg.label}</span>
              <span className="dist-bar__legend-pct">{pct}%</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};