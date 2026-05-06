import React from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Users, CreditCard, Settings, Megaphone } from 'lucide-react';
import MerchantDashboard from './MerchantDashboard';
import MerchantCustomers from './MerchantCustomers';
import MerchantTransactions from './MerchantTransactions';
import MerchantCampaigns from './MerchantCampaigns';
import { Logo } from '../../components/ui/Logo';

function Sidebar() {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path || location.pathname.startsWith(path + '/');

  const menuItems = [
    { path: '/merchant', icon: LayoutDashboard, label: 'Dashboard', exact: true },
    { path: '/merchant/customers', icon: Users, label: 'Müşteriler' },
    { path: '/merchant/transactions', icon: CreditCard, label: 'Satış & Tahsilat' },
    { path: '/merchant/campaigns', icon: Megaphone, label: 'Kampanyalar' },
    { path: '/merchant/settings', icon: Settings, label: 'Ayarlar' },
  ];

  return (
    <div className="w-64 bg-white border-r border-slate-200 h-screen fixed left-0 top-0 flex flex-col hidden md:flex z-10 shadow-sm">
      <div className="p-6 border-b border-slate-100 flex items-center justify-between">
        <Logo />
      </div>
      <div className="px-6 py-4">
        <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">İşletme Menüsü</div>
        <div className="space-y-1">
          {menuItems.map((item) => {
            const active = item.exact ? location.pathname === item.path : isActive(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 font-medium text-sm ${
                  active ? 'bg-primary-50 text-primary-700 shadow-sm' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <item.icon size={20} className={active ? 'text-primary-600' : 'text-slate-400'} />
                {item.label}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default function MerchantApp() {
  return (
    <div className="bg-slate-50 min-h-screen font-sans flex">
      <Sidebar />
      <div className="flex-1 md:ml-64 p-8">
        <div className="max-w-6xl mx-auto">
          <Routes>
            <Route path="/" element={<MerchantDashboard />} />
            <Route path="/customers" element={<MerchantCustomers />} />
            <Route path="/transactions" element={<MerchantTransactions />} />
            <Route path="/campaigns" element={<MerchantCampaigns />} />
            <Route path="/settings" element={<div className="p-8 bg-white rounded-3xl shadow-card border border-slate-100"><h2 className="text-xl font-bold text-slate-900">Ayarlar</h2><p className="text-slate-500 mt-2">Bu modül yapım aşamasındadır.</p></div>} />
          </Routes>
        </div>
      </div>
    </div>
  );
}
