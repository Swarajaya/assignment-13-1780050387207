import React from 'react';
import { ActivityItem } from '../types';
import { StatusBadge } from './StatusBadge';
import { timeAgo } from '../utils/formatters';

interface Props {
  items: ActivityItem[];
}

export const ActivityPanel: React.FC<Props> = ({ items }) => (
  <div className="activity-panel">
    <div className="panel-title">Recent Activity</div>
    {items.length === 0 ? (
      <p className="panel-empty">No activity yet.</p>
    ) : (
      <ul className="activity-list">
        {items.map((item, i) => (
          <li key={i} className="activity-item">
            <div className="activity-item__dot" data-status={item.status} />
            <div className="activity-item__body">
              <div className="activity-item__action">{item.action}</div>
              <div className="activity-item__meta">
                <span className="activity-item__customer">{item.customerName}</span>
                <span className="activity-item__sep">·</span>
                <span className="activity-item__order">#{item.orderId}</span>
              </div>
            </div>
            <div className="activity-item__time">{timeAgo(item.time)}</div>
          </li>
        ))}
      </ul>
    )}
  </div>
);