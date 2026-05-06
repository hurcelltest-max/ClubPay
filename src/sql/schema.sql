-- ClubPay MVP SQL Schema & RLS Policies

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. ENUMS
CREATE TYPE user_role AS ENUM ('customer', 'merchant_admin', 'super_admin');
CREATE TYPE risk_level AS ENUM ('Bronze', 'Silver', 'Gold');
CREATE TYPE tx_type AS ENUM ('purchase', 'payment', 'points_earned', 'points_spent');

-- 3. TABLES

-- Users (Extends auth.users if using Supabase Auth directly, but we keep a profile table)
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  role user_role NOT NULL DEFAULT 'customer',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Plans & Subscriptions
CREATE TABLE public.plans (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  price_monthly DECIMAL(10,2) NOT NULL,
  features JSONB
);

-- Merchants
CREATE TABLE public.merchants (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  owner_id UUID REFERENCES public.profiles(id) NOT NULL,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  status TEXT DEFAULT 'active',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE public.subscriptions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  merchant_id UUID REFERENCES public.merchants(id) ON DELETE CASCADE,
  plan_id UUID REFERENCES public.plans(id),
  status TEXT DEFAULT 'active',
  start_date TIMESTAMPTZ DEFAULT NOW(),
  end_date TIMESTAMPTZ
);

CREATE TABLE public.merchant_settings (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  merchant_id UUID REFERENCES public.merchants(id) ON DELETE CASCADE UNIQUE,
  point_rate_per_100 DECIMAL(5,2) DEFAULT 10.0,
  default_credit_limit DECIMAL(10,2) DEFAULT 1000.0,
  currency TEXT DEFAULT 'TRY'
);

-- Customers
CREATE TABLE public.customers (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  merchant_id UUID REFERENCES public.merchants(id) ON DELETE CASCADE,
  user_id UUID REFERENCES public.profiles(id), -- Nullable for merchant-created offline customers
  qr_id TEXT UNIQUE NOT NULL,
  full_name TEXT NOT NULL,
  phone TEXT,
  total_points INTEGER DEFAULT 0,
  credit_limit DECIMAL(10,2) DEFAULT 0,
  used_credit DECIMAL(10,2) DEFAULT 0,
  risk_level risk_level DEFAULT 'Silver',
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Transactions & Orders
CREATE TABLE public.orders (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  merchant_id UUID REFERENCES public.merchants(id) ON DELETE CASCADE,
  customer_id UUID REFERENCES public.customers(id) ON DELETE CASCADE,
  total_amount DECIMAL(10,2) NOT NULL,
  payment_type TEXT NOT NULL,
  status TEXT DEFAULT 'completed',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE public.order_items (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE,
  product_name TEXT NOT NULL,
  quantity INTEGER DEFAULT 1,
  price DECIMAL(10,2) NOT NULL
);

CREATE TABLE public.credit_transactions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  merchant_id UUID REFERENCES public.merchants(id) ON DELETE CASCADE,
  customer_id UUID REFERENCES public.customers(id) ON DELETE CASCADE,
  amount DECIMAL(10,2) NOT NULL,
  type tx_type NOT NULL,
  due_date TIMESTAMPTZ,
  status TEXT DEFAULT 'completed',
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE public.points_transactions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  merchant_id UUID REFERENCES public.merchants(id) ON DELETE CASCADE,
  customer_id UUID REFERENCES public.customers(id) ON DELETE CASCADE,
  points INTEGER NOT NULL,
  type tx_type NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Campaigns
CREATE TABLE public.campaigns (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  merchant_id UUID REFERENCES public.merchants(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  discount_value DECIMAL(10,2),
  target_segment risk_level,
  start_date TIMESTAMPTZ,
  end_date TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Notifications
CREATE TABLE public.notifications (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  body TEXT NOT NULL,
  is_read BOOLEAN DEFAULT false,
  type TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Audit Logs
CREATE TABLE public.audit_logs (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  merchant_id UUID REFERENCES public.merchants(id) ON DELETE CASCADE,
  user_id UUID REFERENCES public.profiles(id),
  action TEXT NOT NULL,
  table_name TEXT NOT NULL,
  record_id UUID,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. ROW LEVEL SECURITY (RLS) POLICIES

-- Enable RLS
ALTER TABLE public.merchants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.merchant_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.credit_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.points_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

-- Helper Function: Check if user is Super Admin
CREATE OR REPLACE FUNCTION public.is_super_admin() RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'super_admin'
  );
$$ LANGUAGE sql SECURITY DEFINER;

-- Super Admin can do everything
CREATE POLICY "Super admin has full access" ON public.merchants FOR ALL USING (public.is_super_admin());
CREATE POLICY "Super admin has full access" ON public.customers FOR ALL USING (public.is_super_admin());

-- Merchants can read/write their own data
CREATE POLICY "Merchant owner can view their merchant" ON public.merchants
  FOR SELECT USING (owner_id = auth.uid());

CREATE POLICY "Merchant owner can manage their customers" ON public.customers
  FOR ALL USING (merchant_id IN (SELECT id FROM public.merchants WHERE owner_id = auth.uid()));

CREATE POLICY "Merchant owner can manage their transactions" ON public.credit_transactions
  FOR ALL USING (merchant_id IN (SELECT id FROM public.merchants WHERE owner_id = auth.uid()));

CREATE POLICY "Merchant owner can manage their campaigns" ON public.campaigns
  FOR ALL USING (merchant_id IN (SELECT id FROM public.merchants WHERE owner_id = auth.uid()));

-- Customers can read only their own data
CREATE POLICY "Customer can view their own profile" ON public.customers
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Customer can view their own transactions" ON public.credit_transactions
  FOR SELECT USING (customer_id IN (SELECT id FROM public.customers WHERE user_id = auth.uid()));

CREATE POLICY "Customer can view campaigns of their merchant" ON public.campaigns
  FOR SELECT USING (merchant_id IN (SELECT merchant_id FROM public.customers WHERE user_id = auth.uid()));
