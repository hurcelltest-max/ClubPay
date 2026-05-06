import React from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { Activity, Store, Package } from 'lucide-react';
import AdminDashboard from './AdminDashboard';
import AdminMerchants from './AdminMerchants';
import { Logo } from '../../components/ui/Logo';

function AdminSidebar() {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path || location.pathname.startsWith(path + '/');

  const menuItems = [
    { path: '/super-admin-hidden', icon: Activity, label: 'Platform Özeti', exact: true },
    { path: '/super-admin-hidden/merchants', icon: Store, label: 'Esnaflar' },
    { path: '/super-admin-hidden/plans', icon: Package, label: 'Abonelik Paketleri' },
  ];

  return (
    <div className="w-64 bg-slate-900 text-slate-300 h-screen fixed left-0 top-0 flex flex-col hidden md:flex shadow-2xl">
      <div className="p-6 border-b border-slate-800">
        <Logo variant="light" />
        <div className="mt-3 inline-flex items-center px-2 py-1 rounded bg-red-500/10 text-red-400 text-xs font-bold tracking-wider uppercase border border-red-500/20">
          Süper Admin
        </div>
      </div>
      <div className="flex-1 py-6 px-4 space-y-1">
        <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 px-3">Sistem Yönetimi</div>
        {menuItems.map((item) => {
          const active = item.exact ? location.pathname === item.path : isActive(item.path);
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 font-medium text-sm ${
                active ? 'bg-primary-600 text-white shadow-lg shadow-primary-600/20' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <item.icon size={20} className={active ? 'text-white' : 'text-slate-500'} />
              {item.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default function AdminApp() {
  return (
    <div className="bg-slate-50 min-h-screen font-sans flex">
      <AdminSidebar />
      <div className="flex-1 md:ml-64 p-8">
        <div className="max-w-6xl mx-auto">
          <Routes>
            <Route path="/" element={<AdminDashboard />} />
            <Route path="/merchants" element={<AdminMerchants />} />
            <Route path="/plans" element={<div className="p-8 bg-white rounded-3xl shadow-card border border-slate-100"><h2 className="text-xl font-bold text-slate-900">Abonelik Paketleri</h2><p className="text-slate-500 mt-2">Bu modül yapım aşamasındadır.</p></div>} />
          </Routes>
        </div>
      </div>
    </div>
  );
}
