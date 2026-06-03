export type GarmentStatus = 'received' | 'in_cleaning' | 'ready' | 'delivered';

export interface Garment {
  id: string;
  name: string;
  status: GarmentStatus;
}

export interface Order {
  id: string;
  customerName: string;
  createdDate: string;
  garments: Garment[];
}

export interface Analytics {
  totalOrders: number;
  totalGarments: number;
  received: number;
  inCleaning: number;
  ready: number;
  delivered: number;
}

export interface ActivityItem {
  orderId: string;
  customerName: string;
  action: string;
  time: string;
  status: GarmentStatus;
}

export type FilterStatus = GarmentStatus | 'all';