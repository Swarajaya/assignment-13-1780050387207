import React, { useState, useEffect } from 'react';
import { formatLiveClock } from '../utils/formatters';

interface Props {
  totalOrders: number;
  dark: boolean;
  onToggleDark: () => void;
  onRefresh: () => void;
  lastRefreshed: Date | null;
}

export const Header: React.FC<Props> = ({ totalOrders, dark, onToggleDark, onRefresh, lastRefreshed }) => {
  const [clock, setClock] = useState(formatLiveClock(new Date()));

  useEffect(() => {
    const id = setInterval(() => setClock(formatLiveClock(new Date())), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <header className="header">
      <div className="header__left">
        <div className="header__logo">
          <div className="header__logo-mark">
            <span>✦</span>
          </div>
          <div>
            <div className="header__app-name">LaundryOS</div>
            <div className="header__app-sub">Operations Dashboard</div>
          </div>
        </div>
      </div>

      <div className="header__center">
        <div className="header__clock">{clock}</div>
      </div>

      <div className="header__right">
        <div className="header__orders-pill">
          <span className="header__orders-dot" />
          <span>{totalOrders} orders</span>
        </div>
        {lastRefreshed && (
          <span className="header__refreshed">
            Updated {new Intl.DateTimeFormat('en-US', { hour: '2-digit', minute: '2-digit' }).format(lastRefreshed)}
          </span>
        )}
        <button className="header__btn" onClick={onRefresh} title="Refresh data">
          ↺
        </button>
        <button className="header__btn" onClick={onToggleDark} title="Toggle theme">
          {dark ? '☀' : '◑'}
        </button>
      </div>
    </header>
  );
};