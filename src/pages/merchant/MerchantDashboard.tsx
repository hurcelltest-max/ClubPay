import React from 'react';
import { Users, TrendingUp, AlertCircle, ScanLine, CreditCard, Heart, ShoppingBag, RefreshCw, MessageCircle, Sparkles, Activity, Clock, CheckCircle2 } from 'lucide-react';
import { useDemoStore } from '../../store/demoStore';
import { StatCard } from '../../components/ui/StatCard';
import { WHATSAPP_TEMPLATES, generateWhatsAppLink } from '../../services/whatsappService';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

import { Link } from 'react-router-dom';

const mockChartData = [
  { name: 'Pzt', satis: 4000, veresiye: 2400 },
  { name: 'Sal', satis: 3000, veresiye: 1398 },
  { name: 'Çar', satis: 2000, veresiye: 9800 },
  { name: 'Per', satis: 2780, veresiye: 3908 },
  { name: 'Cum', satis: 1890, veresiye: 4800 },
  { name: 'Cmt', satis: 2390, veresiye: 3800 },
  { name: 'Paz', satis: 3490, veresiye: 4300 },
];

export default function MerchantDashboard() {
  const { customers, transactions, user, generateCustomerInsights, addWhatsAppMessage } = useDemoStore();
  const insights = generateCustomerInsights();

  const totalDebt = customers.reduce((acc, c) => acc + c.usedCredit, 0);
  const totalSales = transactions.filter(t => t.type !== 'tahsilat').reduce((acc, t) => acc + t.amount, 0);
  const debtorsCount = customers.filter(c => c.usedCredit > 0).length;

  const todayTransactions = transactions.filter(t => {
    const today = new Date().toISOString().split('T')[0];
    return t.date.startsWith(today);
  });
  const todayCustomerCount = new Set(todayTransactions.map(t => t.customerId)).size;

  const repeatCustomers = customers.filter(c => c.totalTransactionsCount > 1).length;
  const repeatRate = customers.length > 0 ? Math.round((repeatCustomers / customers.length) * 100) : 0;

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Hoş Geldiniz, {user?.name || 'Esnaf'} 👋</h1>
          <p className="text-slate-500 mt-1 font-medium">İşletmenizin bugünkü finansal ve müşteri özeti</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link to="/merchant/transactions" className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white rounded-xl font-bold shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-all active:scale-95">
            <CreditCard size={18} /> Veresiye Satış Ekle
          </Link>
          <Link to="/merchant/transactions" className="flex items-center gap-2 px-5 py-2.5 bg-emerald-600 text-white rounded-xl font-bold shadow-lg shadow-emerald-200 hover:bg-emerald-700 transition-all active:scale-95">
            <TrendingUp size={18} /> Tahsilat Al
          </Link>
          <button className="flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-200 text-slate-700 rounded-xl font-bold shadow-sm hover:bg-slate-50 hover:border-slate-300 transition-all active:scale-95">
            <ScanLine size={18} /> QR Okut
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <StatCard 
          title="Toplam Satış Hacmi" 
          value={`₺${totalSales.toLocaleString()}`} 
          icon={TrendingUp} 
          trend="%12 artış" 
          trendDirection="up" 
          color="primary" 
        />
        <StatCard 
          title="Bugün Gelen" 
          value={`${todayCustomerCount} Müşteri`} 
          icon={Users} 
          trend="Düne göre +3" 
          trendDirection="up" 
          color="green" 
        />
        <StatCard 
          title="Tekrar Gelen Oranı" 
          value={`%${repeatRate}`} 
          icon={RefreshCw} 
          trend="Sadakat yüksek" 
          trendDirection="up" 
          color="purple" 
        />
        <StatCard 
          title="Bekleyen Alacak" 
          value={`₺${totalDebt.toLocaleString()}`} 
          icon={AlertCircle} 
          trend={`${debtorsCount} müşteride`} 
          trendDirection="down" 
          color="orange" 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* Charts Section */}
        <div className="lg:col-span-2 bg-white p-6 border border-slate-100 rounded-3xl shadow-card hover:shadow-premium transition-shadow group">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Activity className="text-primary-500" size={20} />
              Satış & Veresiye Trendi
            </h2>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={mockChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorSatis" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorVeresiye" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f97316" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#f97316" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 40px -10px rgba(0,0,0,0.1)' }}
                  itemStyle={{ fontSize: '14px', fontWeight: 'bold' }}
                />
                <Area type="monotone" dataKey="satis" name="Peşin Satış" stroke="#2563eb" strokeWidth={3} fillOpacity={1} fill="url(#colorSatis)" />
                <Area type="monotone" dataKey="veresiye" name="Veresiye" stroke="#f97316" strokeWidth={3} fillOpacity={1} fill="url(#colorVeresiye)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Son İşlemler Akışı */}
        <div className="bg-white border border-slate-100 rounded-3xl shadow-card hover:shadow-premium transition-shadow flex flex-col">
          <div className="p-6 border-b border-slate-50 flex justify-between items-center bg-slate-50/50 rounded-t-3xl">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Clock size={20} className="text-slate-400" />
              Canlı Akış
            </h2>
            <div className="flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 text-emerald-600 rounded-full text-xs font-bold animate-pulse">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div> Canlı
            </div>
          </div>
          <div className="p-6 flex-1 overflow-y-auto max-h-[300px] space-y-4">
            {transactions.slice(0, 5).map((tx) => {
              const customer = customers.find(c => c.id === tx.customerId);
              const isPositive = tx.type !== 'tahsilat';
              return (
                <div key={tx.id} className="flex items-center justify-between group">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-110 ${
                      tx.type === 'veresiye' ? 'bg-orange-50 text-orange-600' :
                      tx.type === 'tahsilat' ? 'bg-emerald-50 text-emerald-600' :
                      'bg-indigo-50 text-indigo-600'
                    }`}>
                      {tx.type === 'veresiye' ? <AlertCircle size={18} /> : tx.type === 'tahsilat' ? <CheckCircle2 size={18} /> : <CreditCard size={18} />}
                    </div>
                    <div>
                      <p className="font-bold text-slate-900 text-sm">{customer?.name || 'Bilinmiyor'}</p>
                      <p className="text-xs text-slate-500 font-medium truncate max-w-[120px]">{tx.description}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-black text-sm ${isPositive ? 'text-slate-900' : 'text-emerald-600'}`}>
                      {isPositive ? '' : '-'}₺{Math.abs(tx.amount).toLocaleString()}
                    </p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase">
                      {new Date(tx.date).toLocaleTimeString('tr-TR', {hour: '2-digit', minute:'2-digit'})}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Müşteri Alışkanlıkları & Akıllı Fırsatlar */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="text-amber-500" size={24} />
          <h2 className="text-xl font-bold text-slate-900">Müşteri Alışkanlıkları & Fırsatlar</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {insights.length === 0 ? (
             <div className="col-span-3 p-8 bg-slate-50 border border-slate-100 rounded-2xl text-center text-slate-500 font-medium">
               Henüz yeterli alışveriş verisi birikmedi. Sistem yakında öneriler sunmaya başlayacak.
             </div>
          ) : (
            insights.map((insight, idx) => {
              const customer = customers.find(c => c.id === insight.customerId);
              
              const getIcon = () => {
                if (insight.type === 'repurchase_warning') return <RefreshCw size={20} className="text-blue-500" />;
                if (insight.type === 'loyal_product') return <Heart size={20} className="text-rose-500" />;
                if (insight.type === 'silent_customer') return <Clock size={20} className="text-slate-500" />;
                if (insight.type === 'campaign_affinity') return <Sparkles size={20} className="text-amber-500" />;
                return <ShoppingBag size={20} className="text-emerald-500" />;
              };

              const getBgColor = () => {
                if (insight.type === 'repurchase_warning') return 'bg-blue-50 border-blue-100';
                if (insight.type === 'loyal_product') return 'bg-rose-50 border-rose-100';
                if (insight.type === 'silent_customer') return 'bg-slate-50 border-slate-200';
                if (insight.type === 'campaign_affinity') return 'bg-amber-50 border-amber-100';
                return 'bg-emerald-50 border-emerald-100';
              };

              const handleWhatsApp = () => {
                if (!customer) return; // Popüler ürün genel bir mesajdır, şimdilik atla
                
                const templateId = insight.type === 'repurchase_warning' ? 'repurchase_reminder' : 'product_campaign';
                const template = WHATSAPP_TEMPLATES.find(t => t.id === templateId) || WHATSAPP_TEMPLATES[0];
                
                const message = template.message({
                  customerName: customer.name,
                  merchantName: user?.name || 'Esnafımız',
                  productName: insight.productName
                });

                const link = generateWhatsAppLink(customer.phone!, message);
                addWhatsAppMessage(customer.id, templateId, message);
                window.open(link, '_blank');
              };

              return (
                <div key={idx} className={`p-5 rounded-2xl border ${getBgColor()} flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow`}>
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      {getIcon()}
                      <h3 className="font-bold text-slate-900 text-sm">{insight.title}</h3>
                    </div>
                    <p className="text-slate-600 text-sm leading-relaxed mb-4">{insight.description}</p>
                  </div>
                  {customer && (
                    <button 
                      onClick={handleWhatsApp}
                      className="flex items-center justify-center gap-2 w-full py-2.5 bg-white border border-slate-200 rounded-xl text-emerald-600 font-bold text-sm hover:bg-emerald-50 hover:border-emerald-200 transition-colors shadow-sm"
                    >
                      <MessageCircle size={16} /> WhatsApp ile Hatırlat
                    </button>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>


      {/* Debtors Table */}
      <div className="bg-white border border-slate-100 rounded-3xl shadow-card overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <CreditCard size={20} className="text-slate-400" />
            Yaklaşan Tahsilatlar
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white text-slate-400 text-xs uppercase tracking-wider">
                <th className="p-5 font-bold border-b border-slate-100">Müşteri</th>
                <th className="p-5 font-bold border-b border-slate-100">İletişim</th>
                <th className="p-5 font-bold border-b border-slate-100">Risk Durumu</th>
                <th className="p-5 font-bold border-b border-slate-100 text-right">Borç Tutarı</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {customers.filter(c => c.usedCredit > 0).length === 0 && (
                <tr>
                  <td colSpan={4} className="p-12 text-center text-slate-500 font-medium">Harika! Bekleyen hiçbir tahsilatınız yok.</td>
                </tr>
              )}
              {customers.filter(c => c.usedCredit > 0).map(customer => (
                <tr key={customer.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="p-5">
                    <p className="font-bold text-slate-900">{customer.name}</p>
                    <p className="text-xs text-slate-400 mt-0.5">{customer.qrCode}</p>
                  </td>
                  <td className="p-5 text-slate-600 text-sm font-medium">{customer.phone}</td>
                  <td className="p-5">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-bold ${
                      customer.riskLevel === 'Bronz' ? 'bg-red-50 text-red-700 border border-red-100' :
                      customer.riskLevel === 'Gümüş' ? 'bg-yellow-50 text-yellow-700 border border-yellow-100' :
                      'bg-emerald-50 text-emerald-700 border border-emerald-100'
                    }`}>
                      {customer.riskLevel}
                    </span>
                  </td>
                  <td className="p-5 text-right font-extrabold text-lg text-orange-600">
                    ₺{customer.usedCredit.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
