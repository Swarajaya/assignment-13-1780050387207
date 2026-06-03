import React from 'react';
import { useAnimatedCounter } from '../hooks/useAnimatedCounter';

interface Props {
  label: string;
  value: number;
  icon: string;
  accentColor: string;
  subtitle?: string;
}

export const StatCard: React.FC<Props> = ({ label, value, icon, accentColor, subtitle }) => {
  const animated = useAnimatedCounter(value);

  return (
    <div className="stat-card">
      <div className="stat-card__icon" style={{ background: accentColor + '18', color: accentColor }}>
        {icon}
      </div>
      <div className="stat-card__body">
        <div className="stat-card__value">{animated.toLocaleString()}</div>
        <div className="stat-card__label">{label}</div>
        {subtitle && <div className="stat-card__subtitle">{subtitle}</div>}
      </div>
      <div className="stat-card__accent" style={{ background: accentColor }} />
    </div>
  );
};