import React, { useState } from 'react';
import { Search, Filter, PlusCircle, Globe, ShieldCheck } from 'lucide-react';
import { useDemoStore } from '../../store/demoStore';

export default function MerchantCustomers() {
  const { customers, addCustomer } = useDemoStore();
  const [showAdd, setShowAdd] = useState(false);
  const [newCustomer, setNewCustomer] = useState({ name: '', phone: '', creditLimit: 2000 });

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCustomer.name || !newCustomer.phone) return;
    addCustomer({ ...newCustomer, creditLimit: Number(newCustomer.creditLimit) });
    setNewCustomer({ name: '', phone: '', creditLimit: 2000 });
    setShowAdd(false);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Müşteriler</h1>
          <p className="text-gray-500 mt-1">Tüm müşteri veritabanınızı yönetin</p>
        </div>
        <button 
          onClick={() => setShowAdd(!showAdd)}
          className="flex items-center gap-2 px-4 py-2.5 bg-primary-600 text-white rounded-xl font-medium shadow-lg hover:bg-primary-700 transition-colors"
        >
          <PlusCircle size={18} /> Yeni Müşteri
        </button>
      </div>

      {showAdd && (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-6 max-w-xl">
          <h2 className="text-lg font-bold mb-4">Yeni Müşteri Ekle</h2>
          <form onSubmit={handleAdd} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Ad Soyad</label>
              <input type="text" value={newCustomer.name} onChange={e => setNewCustomer({...newCustomer, name: e.target.value})} className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500/20" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Telefon</label>
              <input type="text" value={newCustomer.phone} onChange={e => setNewCustomer({...newCustomer, phone: e.target.value})} className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500/20" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Veresiye Limiti (₺)</label>
              <input type="number" value={newCustomer.creditLimit} onChange={e => setNewCustomer({...newCustomer, creditLimit: Number(e.target.value)})} className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500/20" required />
            </div>
            <button type="submit" className="w-full py-2 bg-gray-900 text-white rounded-lg font-bold">Kaydet</button>
          </form>
        </div>
      )}

      <div className="bg-white border border-slate-100 rounded-[2rem] shadow-card overflow-hidden flex flex-col">
        <div className="p-5 border-b border-slate-100 flex gap-4 bg-slate-50/50">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Müşteri adı veya telefon numarası ile hızlı ara..." 
              className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-sm font-medium focus:outline-none focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 transition-all"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/30 text-slate-400 text-[10px] uppercase tracking-[0.15em]">
                <th className="p-6 font-extrabold border-b border-slate-100">Müşteri Bilgisi</th>
                <th className="p-6 font-extrabold border-b border-slate-100">İletişim</th>
                <th className="p-6 font-extrabold border-b border-slate-100 text-right">Puan Bakiyesi</th>
                <th className="p-6 font-extrabold border-b border-slate-100 text-right">Limit / Borç</th>
                <th className="p-6 font-extrabold border-b border-slate-100 text-center">Global Güven (Network)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {customers.map(customer => (
                <tr key={customer.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="p-6">
                    <div className="flex items-center gap-2">
                      <p className="font-bold text-slate-900 group-hover:text-primary-600 transition-colors">{customer.name}</p>
                      {customer.networkOptIn && (
                        <span className="inline-flex items-center gap-1 px-1.5 py-0.5 bg-indigo-50 text-indigo-600 rounded-md text-[10px] font-bold border border-indigo-100" title="Shared Network Üyesi">
                          <Globe size={10} /> Verified
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-400 mt-1 font-mono">{customer.qrCode}</p>
                  </td>
                  <td className="p-6 text-slate-600 text-sm font-medium">{customer.phone}</td>
                  <td className="p-6 text-right">
                    <span className="px-3 py-1.5 bg-primary-50 text-primary-700 rounded-full font-extrabold text-sm border border-primary-100">
                      {customer.points.toLocaleString()}
                    </span>
                  </td>
                  <td className="p-6 text-right">
                    <p className="font-bold text-slate-400 text-xs">₺{customer.creditLimit.toLocaleString()}</p>
                    {customer.usedCredit > 0 ? (
                      <p className="text-sm font-extrabold text-orange-600 mt-1">₺{customer.usedCredit.toLocaleString()}</p>
                    ) : (
                      <p className="text-sm font-extrabold text-emerald-600 mt-1">Borç Yok</p>
                    )}
                  </td>
                  <td className="p-6">
                    <div className="flex flex-col items-center gap-1">
                      {customer.networkOptIn ? (
                        <>
                          <div className="flex items-center gap-1.5">
                            <span className="text-sm font-black text-slate-900">{customer.clubScore}</span>
                            <span className="text-[10px] font-bold text-slate-400">/100</span>
                          </div>
                          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider border ${
                            customer.trustLevel === 'Güvenilir' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
                            customer.trustLevel === 'Düzenli' ? 'bg-blue-50 text-blue-700 border-blue-100' :
                            'bg-amber-50 text-amber-700 border-amber-100'
                          }`}>
                            {customer.trustLevel}
                          </span>
                        </>
                      ) : (
                        <span className="text-[10px] font-bold text-slate-300 italic">Ağ Dışı (Private)</span>
                      )}
                    </div>
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
