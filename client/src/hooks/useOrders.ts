import { useState, useEffect, useCallback } from 'react';
import { Order } from '../types';

interface UseOrdersResult {
  orders: Order[];
  loading: boolean;
  error: string | null;
  lastRefreshed: Date | null;
  refresh: () => void;
}

// ── Mock data (replace with your real API call) ──────────────────────────────
const MOCK_ORDERS: Order[] = [
  {
    id: 'ORD-001',
    customerName: 'Alice Johnson',
    createdDate: new Date(Date.now() - 3600_000).toISOString(),
    garments: [
      { id: 'g1', name: 'White Shirt',   status: 'in_cleaning' },
      { id: 'g2', name: 'Black Trousers', status: 'received' },
    ],
  },
  {
    id: 'ORD-002',
    customerName: 'Bob Smith',
    createdDate: new Date(Date.now() - 7200_000).toISOString(),
    garments: [
      { id: 'g3', name: 'Suit Jacket', status: 'ready' },
      { id: 'g4', name: 'Tie',         status: 'delivered' },
    ],
  },
  {
    id: 'ORD-003',
    customerName: 'Carol White',
    createdDate: new Date(Date.now() - 86400_000).toISOString(),
    garments: [
      { id: 'g5', name: 'Evening Gown', status: 'delivered' },
    ],
  },
];

async function fetchOrders(): Promise<Order[]> {
  // Swap this with your real fetch(), e.g.:
  // const res = await fetch('/api/orders');
  // if (!res.ok) throw new Error('Failed to load orders');
  // return res.json();
  await new Promise((r) => setTimeout(r, 800)); // simulate network delay
  return MOCK_ORDERS;
}
// ─────────────────────────────────────────────────────────────────────────────

export function useOrders(): UseOrdersResult {
  // ✅ KEY FIX: initialize as [] — never undefined — so consumers are safe
  const [orders, setOrders]               = useState<Order[]>([]);
  const [loading, setLoading]             = useState(true);
  const [error, setError]                 = useState<string | null>(null);
  const [lastRefreshed, setLastRefreshed] = useState<Date | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchOrders();
      setOrders(data);          // always an Order[]
      setLastRefreshed(new Date());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      setOrders([]);            // keep orders as [] on error
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  return { orders, loading, error, lastRefreshed, refresh: load };
}
