import React, { useMemo, useState } from 'react';
import { useOrders } from './hooks/useOrders';
import { useDarkMode } from './hooks/useDarkMode';
import { computeAnalytics, buildActivityFeed, computeInsights } from './utils/analytics';
import { FilterStatus } from './types';

import { Header } from './components/Header';
import { StatCard } from './components/StatCard';
import { SearchFilter } from './components/SearchFilter';
import { OrderCard } from './components/OrderCard';
import { SkeletonCard } from './components/SkeletonCard';
import { EmptyState } from './components/EmptyState';
import { ErrorState } from './components/ErrorState';
import { DistributionBar } from './components/DistributionBar';
import { ActivityPanel } from './components/ActivityPanel';
import { InsightsPanel } from './components/InsightsPanel';
import { Footer } from './components/Footer';

import './App.css';

const App: React.FC = () => {
  const { orders, loading, error, lastRefreshed, refresh } = useOrders();
  const [dark, toggleDark] = useDarkMode();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<FilterStatus>('all');

  const analytics = useMemo(() => computeAnalytics(orders), [orders]);
  const activity = useMemo(() => buildActivityFeed(orders), [orders]);
  const insights = useMemo(() => computeInsights(analytics), [analytics]);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return orders.filter((o) => {
      const matchSearch =
        !q ||
        o.customerName.toLowerCase().includes(q) ||
        o.id.toLowerCase().includes(q);
      const matchFilter =
        filter === 'all' ||
        o.garments.some((g) => g.status === filter);
      return matchSearch && matchFilter;
    });
  }, [orders, search, filter]);

  const STAT_CARDS = [
    { label: 'Total Orders',   value: analytics.totalOrders,   icon: '⊞', accentColor: '#6366f1', subtitle: 'All time' },
    { label: 'Total Garments', value: analytics.totalGarments, icon: '◈', accentColor: '#06b6d4', subtitle: 'Across all orders' },
    { label: 'Received',       value: analytics.received,       icon: '⬇', accentColor: '#3b82f6', subtitle: 'Awaiting processing' },
    { label: 'In Cleaning',    value: analytics.inCleaning,     icon: '⟳', accentColor: '#f97316', subtitle: 'Currently active' },
    { label: 'Ready',          value: analytics.ready,          icon: '✓', accentColor: '#22c55e', subtitle: 'Awaiting pickup' },
    { label: 'Delivered',      value: analytics.delivered,      icon: '◎', accentColor: '#a855f7', subtitle: 'Completed' },
  ];

  return (
    <div className="app">
      <Header
        totalOrders={analytics.totalOrders}
        dark={dark}
        onToggleDark={toggleDark}
        onRefresh={refresh}
        lastRefreshed={lastRefreshed}
      />

      <main className="main">
        <section className="stats-grid">
          {STAT_CARDS.map((card) => (
            <StatCard key={card.label} {...card} />
          ))}
        </section>

        {!loading && !error && analytics.totalGarments > 0 && (
          <DistributionBar analytics={analytics} />
        )}

        <div className="content-layout">
          <div className="content-layout__main">
            <SearchFilter
              search={search}
              onSearch={setSearch}
              filter={filter}
              onFilter={setFilter}
              resultCount={filtered.length}
            />

            {loading && (
              <div className="orders-grid">
                {Array.from({ length: 6 }).map((_, i) => (
                  <SkeletonCard key={i} />
                ))}
              </div>
            )}

            {!loading && error && (
              <ErrorState message={error} onRetry={refresh} />
            )}

            {!loading && !error && filtered.length === 0 && (
              <EmptyState
                hasSearch={search.length > 0 || filter !== 'all'}
                onClear={() => { setSearch(''); setFilter('all'); }}
              />
            )}

            {!loading && !error && filtered.length > 0 && (
              <div className="orders-grid">
                {filtered.map((order, i) => (
                  <OrderCard
                    key={order.id}
                    order={order}
                    index={i}
                    filter={filter}
                  />
                ))}
              </div>
            )}
          </div>

          <aside className="content-layout__side">
            <InsightsPanel insights={insights} />
            <ActivityPanel items={activity} />
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default App;