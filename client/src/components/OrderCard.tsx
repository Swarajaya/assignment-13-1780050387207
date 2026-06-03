import React, { useState } from 'react';
import { Order, FilterStatus } from '../types';
import { StatusBadge } from './StatusBadge';
import { formatDate } from '../utils/formatters';

interface Props {
  order: Order;
  index: number;
  filter: FilterStatus;
}

export const OrderCard: React.FC<Props> = ({ order, index, filter }) => {
  const [expanded, setExpanded] = useState(false);

  const garmentCount = order.garments.length;

  const previewStatus =
    filter !== 'all'
      ? filter
      : (Object.entries(
          order.garments.reduce<Record<string, number>>((acc, g) => {
            acc[g.status] = (acc[g.status] || 0) + 1;
            return acc;
          }, {})
        ).sort((a, b) => b[1] - a[1])[0]?.[0] ?? 'received');

  return (
    <div className="order-card" style={{ animationDelay: `${index * 60}ms` }}>
      <div className="order-card__header" onClick={() => setExpanded((e) => !e)}>
        <div className="order-card__id-block">
          <div className="order-card__id">#{order.id}</div>
          <div className="order-card__customer">{order.customerName}</div>
        </div>
        <div className="order-card__meta">
          <div className="order-card__date">{formatDate(order.createdDate)}</div>
          <div className="order-card__count">
            {garmentCount} garment{garmentCount !== 1 ? 's' : ''}
          </div>
        </div>
        <div className="order-card__status-preview">
          <StatusBadge status={previewStatus as any} />
        </div>
        <button className={`order-card__toggle ${expanded ? 'open' : ''}`}>›</button>
      </div>

      {expanded && (
        <div className="order-card__garments">
          <div className="order-card__garments-grid">
            {order.garments.map((g) => (
              <div key={g.id} className="order-card__garment">
                <div className="order-card__garment-name">{g.name}</div>
                <StatusBadge status={g.status} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};