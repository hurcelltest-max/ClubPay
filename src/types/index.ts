export type Role = 'customer' | 'merchant_admin' | 'super_admin';

export interface User {
  id: string;
  email: string;
  role: Role;
  created_at: string;
}

export interface Merchant {
  id: string;
  owner_id: string;
  name: string;
  slug: string;
  status: 'active' | 'inactive';
  created_at: string;
}

export type DemoUser = {
  id: string;
  name: string;
  role: 'customer' | 'merchant' | 'admin';
  phone?: string;
  points: number;
  creditLimit: number;
  usedCredit: number;
  riskLevel: 'Bronz' | 'Gümüş' | 'Altın';
  qrCode: string;
  // Shared Network Layer
  clubScore: number;
  trustLevel: 'Güvenilir' | 'Düzenli' | 'Orta Risk' | 'Dikkatli';
  networkOptIn: boolean;
  totalTransactionsCount: number;
};

export interface Customer {
  id: string;
  merchant_id: string;
  user_id?: string;
  qr_id: string;
  full_name: string;
  phone: string;
  total_points: number;
  credit_limit: number;
  used_credit: number;
  risk_level: 'Bronze' | 'Silver' | 'Gold';
  notes?: string;
  created_at: string;
}

export interface Transaction {
  id: string;
  merchant_id: string;
  customer_id: string;
  amount: number;
  type: 'purchase' | 'payment' | 'points_earned' | 'points_spent';
  status: 'completed' | 'pending' | 'late';
  description: string;
  created_at: string;
}

export interface Campaign {
  id: string;
  merchant_id: string;
  title: string;
  description: string;
  discount_value: number;
  target_segment?: string;
  start_date: string;
  end_date: string;
}

// Supabase Database Tipi (Gelecekte CLI ile generate edilecek)
export interface Database {
  public: {
    Tables: {
      merchants: { Row: Merchant; Insert: Omit<Merchant, 'id' | 'created_at'>; Update: Partial<Merchant> };
      customers: { Row: Customer; Insert: Omit<Customer, 'id' | 'created_at'>; Update: Partial<Customer> };
      transactions: { Row: Transaction; Insert: Omit<Transaction, 'id' | 'created_at'>; Update: Partial<Transaction> };
      campaigns: { Row: Campaign; Insert: Omit<Campaign, 'id'>; Update: Partial<Campaign> };
    }
  }
}
