import React from 'react';
import { GarmentStatus } from '../types';
import { capitalize } from '../utils/formatters';

interface Props {
  status: GarmentStatus;
}

const STATUS_CONFIG: Record<GarmentStatus, { bg: string; text: string; dot: string }> = {
  received:    { bg: 'var(--badge-received-bg)',    text: 'var(--badge-received-text)',    dot: '#3b82f6' },
  in_cleaning: { bg: 'var(--badge-cleaning-bg)',   text: 'var(--badge-cleaning-text)',   dot: '#f97316' },
  ready:       { bg: 'var(--badge-ready-bg)',       text: 'var(--badge-ready-text)',       dot: '#22c55e' },
  delivered:   { bg: 'var(--badge-delivered-bg)',   text: 'var(--badge-delivered-text)',   dot: '#a855f7' },
};

export const StatusBadge: React.FC<Props> = ({ status }) => {
  const cfg = STATUS_CONFIG[status];
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '5px',
        padding: '3px 10px',
        borderRadius: '999px',
        fontSize: '11px',
        fontWeight: 600,
        letterSpacing: '0.02em',
        background: cfg.bg,
        color: cfg.text,
        whiteSpace: 'nowrap',
      }}
    >
      <span style={{ width: 6, height: 6, borderRadius: '50%', background: cfg.dot, flexShrink: 0 }} />
      {capitalize(status)}
    </span>
  );
};