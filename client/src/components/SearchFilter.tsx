import React from 'react';
import { FilterStatus, GarmentStatus } from '../types';

interface Props {
  search: string;
  onSearch: (v: string) => void;
  filter: FilterStatus;
  onFilter: (v: FilterStatus) => void;
  resultCount: number;
}

const STATUSES: { value: FilterStatus; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'received', label: 'Received' },
  { value: 'in_cleaning', label: 'In Cleaning' },
  { value: 'ready', label: 'Ready' },
  { value: 'delivered', label: 'Delivered' },
];

export const SearchFilter: React.FC<Props> = ({ search, onSearch, filter, onFilter, resultCount }) => {
  return (
    <div className="search-filter">
      <div className="search-filter__bar">
        <div className="search-filter__input-wrap">
          <span className="search-filter__icon">⌕</span>
          <input
            className="search-filter__input"
            type="text"
            placeholder="Search by name or order ID…"
            value={search}
            onChange={(e) => onSearch(e.target.value)}
          />
          {search && (
            <button className="search-filter__clear" onClick={() => onSearch('')}>✕</button>
          )}
        </div>

        <div className="search-filter__pills">
          {STATUSES.map((s) => (
            <button
              key={s.value}
              className={`search-filter__pill ${filter === s.value ? 'active' : ''}`}
              data-status={s.value}
              onClick={() => onFilter(s.value as FilterStatus)}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      <div className="search-filter__meta">
        Showing <strong>{resultCount}</strong> {resultCount === 1 ? 'order' : 'orders'}
        {search && <> matching "<em>{search}</em>"</>}
        {filter !== 'all' && <> · filtered by <strong>{filter.replace('_', ' ')}</strong></>}
      </div>
    </div>
  );
};