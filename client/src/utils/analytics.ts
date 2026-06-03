import { Order, Analytics, ActivityItem, GarmentStatus } from '../types';

export function computeAnalytics(orders: Order[]): Analytics {
  let totalGarments = 0;
  let received = 0;
  let inCleaning = 0;
  let ready = 0;
  let delivered = 0;

  for (const order of orders) {
    for (const g of order.garments) {
      totalGarments++;
      if (g.status === 'received') received++;
      else if (g.status === 'in_cleaning') inCleaning++;
      else if (g.status === 'ready') ready++;
      else if (g.status === 'delivered') delivered++;
    }
  }

  return {
    totalOrders: orders.length,
    totalGarments,
    received,
    inCleaning,
    ready,
    delivered,
  };
}

export function buildActivityFeed(orders: Order[]): ActivityItem[] {
  const items: ActivityItem[] = [];

  for (const order of orders) {
    for (const g of order.garments) {
      items.push({
        orderId: order.id,
        customerName: order.customerName,
        action: getActionLabel(g.status),
        time: order.createdDate,
        status: g.status,
      });
    }
  }

  return items
    .sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime())
    .slice(0, 8);
}

function getActionLabel(status: GarmentStatus): string {
  const map: Record<GarmentStatus, string> = {
    received: 'Item received at facility',
    in_cleaning: 'Cleaning in progress',
    ready: 'Ready for pickup',
    delivered: 'Successfully delivered',
  };
  return map[status];
}

export function computeInsights(analytics: Analytics): string[] {
  const insights: string[] = [];
  const { totalGarments, delivered, inCleaning, ready, received } = analytics;

  if (totalGarments === 0) return ['No data available yet.'];

  const deliveredPct = Math.round((delivered / totalGarments) * 100);
  const pendingPct = Math.round(((received + inCleaning) / totalGarments) * 100);
  const readyPct = Math.round((ready / totalGarments) * 100);

  if (deliveredPct >= 70) insights.push(`🚀 Strong throughput — ${deliveredPct}% of garments delivered.`);
  if (readyPct >= 20) insights.push(`📦 ${readyPct}% of garments await pickup — consider notifying customers.`);
  if (pendingPct >= 50) insights.push(`⚙️ High workload — ${pendingPct}% still in pipeline.`);
  if (inCleaning > received) insights.push('✅ Intake is controlled — cleaning queue is well-managed.');
  if (analytics.totalOrders > 10) insights.push(`📊 ${analytics.totalOrders} total orders tracked in the system.`);

  return insights.length > 0 ? insights : ['📈 Operations running smoothly.'];
}