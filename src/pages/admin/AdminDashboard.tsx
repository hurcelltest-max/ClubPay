import React from 'react';
import { Store, Users, CreditCard, Activity } from 'lucide-react';
import { useDemoStore } from '../../store/demoStore';
import { StatCard } from '../../components/ui/StatCard';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const mrrData = [
  { name: 'Oca', mrr: 8500 },
  { name: 'Şub', mrr: 9200 },
  { name: 'Mar', mrr: 10500 },
  { name: 'Nis', mrr: 11200 },
  { name: 'May', mrr: 12500 },
];

export default function AdminDashboard() {
  const { customers, transactions, campaigns } = useDemoStore();
  
  const platformCustomers = customers.length * 45; // Mock data multiplication to simulate large scale
  
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Platform Özeti</h1>
        <p className="text-slate-500 mt-1 font-medium">SaaS iş modelinin canlı büyüme metrikleri</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard 
          title="Aylık MRR (Abonelik Geliri)" 
          value="₺12,500" 
          icon={CreditCard} 
          trend="%15 artış" 
          trendDirection="up" 
          color="purple" 
        />
        <StatCard 
          title="Aktif Esnaf (Aboneler)" 
          value="42" 
          icon={Store} 
          trend="Yeni 3 kayıt" 
          trendDirection="up" 
          color="primary" 
        />
        <StatCard 
          title="Toplam Son Kullanıcı (Ağ)" 
          value={platformCustomers.toLocaleString()} 
          icon={Users} 
          color="slate" 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-6 border border-slate-100 rounded-3xl shadow-card">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold text-slate-900">MRR Büyüme Trendi (Son 5 Ay)</h2>
          </div>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mrrData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <Tooltip 
                  cursor={{fill: '#f8fafc'}}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px -2px rgba(0,0,0,0.1)' }}
                  itemStyle={{ fontSize: '14px', fontWeight: '700', color: '#1e3a8a' }}
                />
                <Bar dataKey="mrr" fill="#8b5cf6" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white border border-slate-100 rounded-3xl shadow-card p-6 flex flex-col">
          <h2 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
            <Activity size={20} className="text-primary-600" />
            Canlı Demo Metrikleri
          </h2>
          <div className="space-y-4 flex-1">
            <div className="p-4 bg-slate-50 rounded-2xl flex items-center justify-between border border-slate-100">
               <span className="text-slate-600 font-medium">Oluşturulan Müşteri</span>
               <span className="font-extrabold text-xl text-slate-900">{customers.length}</span>
            </div>
            <div className="p-4 bg-slate-50 rounded-2xl flex items-center justify-between border border-slate-100">
               <span className="text-slate-600 font-medium">Toplam İşlem Adedi</span>
               <span className="font-extrabold text-xl text-slate-900">{transactions.length}</span>
            </div>
            <div className="p-4 bg-slate-50 rounded-2xl flex items-center justify-between border border-slate-100">
               <span className="text-slate-600 font-medium">Aktif Kampanyalar</span>
               <span className="font-extrabold text-xl text-slate-900">{campaigns.length}</span>
            </div>
          </div>
          <div className="mt-4 text-xs text-center text-slate-400 font-medium">
            Veriler Zustand Global State üzerinden çekilmektedir.
          </div>
        </div>
      </div>
    </div>
  );
}
