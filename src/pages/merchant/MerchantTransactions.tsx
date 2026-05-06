import React, { useState } from 'react';
import { CreditCard, ArrowDownCircle, CheckCircle2, Zap } from 'lucide-react';
import { useDemoStore } from '../../store/demoStore';

export default function MerchantTransactions() {
  const [activeTab, setActiveTab] = useState<'sale' | 'payment'>('sale');
  const { customers, addSale, addPayment } = useDemoStore();

  const [selectedCustomerId, setSelectedCustomerId] = useState('');
  const [amount, setAmount] = useState('');
  const [saleType, setSaleType] = useState<'peşin' | 'veresiye' | 'puan_kullanımı'>('peşin');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');

  const handleSaleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCustomerId || !amount) return;
    addSale(
      selectedCustomerId, 
      Number(amount), 
      saleType, 
      description || 'Mağaza Alışverişi', 
      saleType === 'puan_kullanımı' ? Number(amount) : 0,
      dueDate
    );
    setAmount('');
    setDescription('');
    setDueDate('');
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCustomerId || !amount) return;
    addPayment(selectedCustomerId, Number(amount));
    setAmount('');
  };

  return (
    <div className="animate-in fade-in duration-500">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Satış & Tahsilat</h1>
        <p className="text-slate-500 mt-1 font-medium">Veresiye satışlarınızı ve tahsilatlarınızı yönetin</p>
      </div>

      <div className="bg-white rounded-[2.5rem] shadow-premium border border-slate-100 overflow-hidden max-w-2xl">
        <div className="flex border-b border-slate-100 bg-slate-50/30 p-2">
          <button 
            className={`flex-1 py-4 rounded-2xl font-black text-xs uppercase tracking-widest text-center flex items-center justify-center gap-3 transition-all ${activeTab === 'sale' ? 'text-primary-600 bg-white shadow-sm' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'}`}
            onClick={() => setActiveTab('sale')}
          >
            <CreditCard size={18} /> Yeni Satış
          </button>
          <button 
            className={`flex-1 py-4 rounded-2xl font-black text-xs uppercase tracking-widest text-center flex items-center justify-center gap-3 transition-all ${activeTab === 'payment' ? 'text-emerald-600 bg-white shadow-sm' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'}`}
            onClick={() => setActiveTab('payment')}
          >
            <ArrowDownCircle size={18} /> Tahsilat Al
          </button>
        </div>

        <div className="p-10">
          {activeTab === 'sale' ? (
            <form onSubmit={handleSaleSubmit} className="space-y-6">
              <div>
                <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Müşteri Seçimi</label>
                <select 
                  className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 outline-none transition-all font-bold text-slate-700"
                  value={selectedCustomerId}
                  onChange={(e) => setSelectedCustomerId(e.target.value)}
                  required
                >
                  <option value="">İşlem yapılacak müşteriyi seçin...</option>
                  {customers.map(c => (
                    <option key={c.id} value={c.id}>{c.name} — (Kalan Limit: ₺{c.creditLimit - c.usedCredit})</option>
                  ))}
                </select>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-3">İşlem Tutarı (₺)</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">₺</span>
                    <input 
                      type="number" 
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder="0.00" 
                      className="w-full pl-10 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 outline-none transition-all font-black text-xl text-slate-900" 
                      required 
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Ödeme Türü</label>
                  <select 
                    className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 outline-none transition-all font-bold text-slate-700"
                    value={saleType}
                    onChange={(e) => setSaleType(e.target.value as any)}
                  >
                    <option value="peşin">Nakit / Kredi Kartı</option>
                    <option value="veresiye">Veresiye (Borca Ekle)</option>
                    <option value="puan_kullanımı">Puan İle Öde</option>
                  </select>
                </div>
              </div>

              {saleType === 'veresiye' && (
                <div className="animate-in slide-in-from-top-2 duration-300">
                  <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Son Ödeme Tarihi</label>
                  <input 
                    type="date" 
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 outline-none transition-all font-bold text-slate-700"
                    required={saleType === 'veresiye'}
                  />
                </div>
              )}

              <div>
                <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Açıklama</label>
                <input 
                  type="text" 
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Örn: Telefon tamiri, Aksesuar satışı..." 
                  className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 outline-none transition-all font-medium text-slate-600" 
                />
              </div>

              <div className="animate-in fade-in zoom-in-95 duration-300">
                {saleType === 'peşin' && (
                  <div className="bg-emerald-50 border border-emerald-100 text-emerald-700 p-5 rounded-2xl text-sm font-bold flex items-center gap-3">
                    <Zap size={18} /> Müşteri bu işlemden %10 puan kazanacaktır.
                  </div>
                )}
                {saleType === 'veresiye' && (
                  <div className="bg-indigo-50 border border-indigo-100 text-indigo-700 p-5 rounded-2xl text-sm font-bold flex items-center gap-3">
                    <CheckCircle2 size={18} /> Bu tutar müşterinin borç hanesine eklenecektir.
                  </div>
                )}
              </div>

              <button type="submit" className="w-full py-5 bg-slate-900 text-white rounded-2xl font-black text-lg hover:bg-primary-600 transition-all shadow-xl hover:shadow-primary-500/20 active:scale-[0.98]">
                Satışı Kaydet
              </button>
            </form>
          ) : (
            <form onSubmit={handlePaymentSubmit} className="space-y-6">
              <div>
                <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Borçlu Müşteri</label>
                <select 
                  className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all font-bold text-slate-700"
                  value={selectedCustomerId}
                  onChange={(e) => setSelectedCustomerId(e.target.value)}
                  required
                >
                  <option value="">Ödeme yapan müşteriyi seçin...</option>
                  {customers.filter(c => c.usedCredit > 0).map(c => (
                    <option key={c.id} value={c.id}>{c.name} — (Kalan Borç: ₺{c.usedCredit})</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Tahsil Edilen Tutar (₺)</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-600 font-bold">₺</span>
                  <input 
                    type="number" 
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="0.00" 
                    className="w-full pl-10 pr-4 py-4 bg-emerald-50/30 border border-emerald-100 rounded-2xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all font-black text-2xl text-emerald-900" 
                    required 
                  />
                </div>
              </div>
              
              <button 
                type="submit" 
                disabled={customers.filter(c => c.usedCredit > 0).length === 0}
                className="w-full py-5 bg-emerald-600 text-white rounded-2xl font-black text-lg hover:bg-emerald-700 transition-all shadow-xl hover:shadow-emerald-500/20 active:scale-[0.98] mt-4 disabled:opacity-30 disabled:cursor-not-allowed"
              >
                Ödemeyi Al ve Borcu Düş
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
