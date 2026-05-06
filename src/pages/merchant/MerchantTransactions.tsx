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

  const handleSaleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCustomerId || !amount) return;
    addSale(selectedCustomerId, Number(amount), saleType, description || 'Mağaza Alışverişi', saleType === 'puan_kullanımı' ? Number(amount) : 0);
    setAmount('');
    setDescription('');
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCustomerId || !amount) return;
    addPayment(selectedCustomerId, Number(amount));
    setAmount('');
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Satış & Tahsilat İşlemleri</h1>
        <p className="text-gray-500 mt-1">Veresiye işlemlerinizi ve tahsilatlarınızı yönetin</p>
      </div>

      <div className="bg-white rounded-[2rem] shadow-card border border-slate-100 overflow-hidden max-w-2xl">
        <div className="flex border-b border-slate-100 bg-slate-50/30">
          <button 
            className={`flex-1 py-6 font-extrabold text-sm uppercase tracking-wider text-center flex items-center justify-center gap-3 transition-all ${activeTab === 'sale' ? 'text-primary-600 bg-white shadow-sm border-r border-slate-100' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'}`}
            onClick={() => setActiveTab('sale')}
          >
            <CreditCard size={18} /> Yeni Satış
          </button>
          <button 
            className={`flex-1 py-6 font-extrabold text-sm uppercase tracking-wider text-center flex items-center justify-center gap-3 transition-all ${activeTab === 'payment' ? 'text-emerald-600 bg-white shadow-sm border-l border-slate-100' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'}`}
            onClick={() => setActiveTab('payment')}
          >
            <ArrowDownCircle size={18} /> Borç Tahsilatı
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
                    <option key={c.id} value={c.id}>{c.name} — (Limit: ₺{c.creditLimit - c.usedCredit})</option>
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
                  <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Ödeme Yöntemi</label>
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

              <div>
                <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-3">İşlem Notu</label>
                <input 
                  type="text" 
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Örn: Tamir ücreti, Aksesuar satışı vb." 
                  className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 outline-none transition-all font-medium text-slate-600" 
                />
              </div>

              {/* Dynamic Info Cards */}
              <div className="animate-in fade-in zoom-in-95 duration-300">
                {saleType === 'peşin' && (
                  <div className="bg-primary-50 border border-primary-100 text-primary-700 p-5 rounded-2xl text-sm font-bold flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0">
                      <Zap size={16} />
                    </div>
                    Müşteri bu işlemden %10 sadakat puanı kazanacaktır.
                  </div>
                )}
                {saleType === 'veresiye' && (
                  <div className="bg-amber-50 border border-amber-100 text-amber-700 p-5 rounded-2xl text-sm font-bold flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
                      <CreditCard size={16} />
                    </div>
                    Bu tutar müşterinin açık hesabına (veresiye) eklenecektir.
                  </div>
                )}
              </div>

              <button type="submit" className="w-full py-5 bg-slate-900 text-white rounded-2xl font-black text-lg hover:bg-primary-600 transition-all shadow-xl hover:shadow-primary-500/20 active:scale-[0.98] mt-4">
                İşlemi Tamamla ve Yazdır
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
