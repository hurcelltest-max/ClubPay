import React, { useState } from 'react';
import { CreditCard, ArrowDownCircle, CheckCircle2, Zap, ShoppingCart, Plus, Minus, Search, User } from 'lucide-react';
import { useDemoStore } from '../../store/demoStore';

export default function MerchantTransactions() {
  const [activeTab, setActiveTab] = useState<'sale' | 'payment'>('sale');
  const { customers, products, addSale, addPayment } = useDemoStore();

  const [selectedCustomerId, setSelectedCustomerId] = useState('');
  const [amount, setAmount] = useState('');
  const [saleType, setSaleType] = useState<'peşin' | 'veresiye' | 'puan_kullanımı'>('peşin');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [selectedProducts, setSelectedProducts] = useState<{productId: string, quantity: number}[]>([]);

  // Hızlı Seçim İçin Son İşlem Yapılan Müşteriler
  const recentCustomers = [...customers].sort((a, b) => b.totalTransactionsCount - a.totalTransactionsCount).slice(0, 4);

  const handleProductToggle = (productId: string) => {
    setSelectedProducts(prev => {
      const existing = prev.find(p => p.productId === productId);
      if (existing) {
        return prev.filter(p => p.productId !== productId);
      } else {
        return [...prev, { productId, quantity: 1 }];
      }
    });
  };

  const handleQuantityChange = (productId: string, delta: number) => {
    setSelectedProducts(prev => prev.map(p => {
      if (p.productId === productId) {
        const newQuantity = Math.max(1, p.quantity + delta);
        return { ...p, quantity: newQuantity };
      }
      return p;
    }));
  };

  const handleSaleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCustomerId || !amount) return;
    addSale(
      selectedCustomerId, 
      Number(amount), 
      saleType, 
      description || 'Mağaza Alışverişi', 
      saleType === 'puan_kullanımı' ? Number(amount) : 0,
      dueDate,
      selectedProducts.length > 0 ? selectedProducts : undefined
    );
    setAmount('');
    setDescription('');
    setDueDate('');
    setSelectedProducts([]);
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
            <form onSubmit={handleSaleSubmit} className="space-y-8">
              
              {/* Ödeme Türü Hızlı Toggle */}
              <div className="flex p-1.5 bg-slate-100 rounded-2xl">
                <button 
                  type="button"
                  onClick={() => setSaleType('peşin')}
                  className={`flex-1 py-3.5 rounded-xl font-bold text-sm transition-all ${saleType === 'peşin' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                >
                  💳 Nakit / K.Kartı
                </button>
                <button 
                  type="button"
                  onClick={() => setSaleType('veresiye')}
                  className={`flex-1 py-3.5 rounded-xl font-bold text-sm transition-all ${saleType === 'veresiye' ? 'bg-orange-500 text-white shadow-md shadow-orange-500/20' : 'text-slate-500 hover:text-slate-700'}`}
                >
                  📝 Veresiye Ekle
                </button>
              </div>

              {/* Hızlı Müşteri Seçimi */}
              <div>
                <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Müşteri Seç</label>
                
                {/* Son Müşteriler Hızlı Butonlar */}
                <div className="flex gap-3 mb-3 overflow-x-auto pb-2 -mx-2 px-2 snap-x">
                  {recentCustomers.map(c => (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => setSelectedCustomerId(c.id)}
                      className={`flex flex-col items-center gap-2 min-w-[72px] snap-start transition-transform active:scale-95 ${selectedCustomerId === c.id ? 'opacity-100' : 'opacity-60 hover:opacity-100'}`}
                    >
                      <div className={`w-14 h-14 rounded-full flex items-center justify-center font-bold text-lg border-2 ${selectedCustomerId === c.id ? 'bg-primary-50 border-primary-500 text-primary-700' : 'bg-slate-50 border-slate-200 text-slate-600'}`}>
                        {c.name.charAt(0)}
                      </div>
                      <span className="text-[10px] font-bold text-slate-700 whitespace-nowrap overflow-hidden text-ellipsis w-full text-center">
                        {c.name.split(' ')[0]}
                      </span>
                    </button>
                  ))}
                </div>

                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <select 
                    className="w-full pl-11 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 outline-none transition-all font-bold text-slate-700 appearance-none cursor-pointer"
                    value={selectedCustomerId}
                    onChange={(e) => setSelectedCustomerId(e.target.value)}
                    required
                  >
                    <option value="">Tüm Müşteriler Arasında Ara...</option>
                    {customers.map(c => (
                      <option key={c.id} value={c.id}>{c.name} — (Kalan Limit: ₺{c.creditLimit - c.usedCredit})</option>
                    ))}
                  </select>
                </div>
              </div>
              
              {/* Devasa Tutar Girişi */}
              <div>
                <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-3">İşlem Tutarı (₺)</label>
                <div className="relative">
                  <span className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-2xl">₺</span>
                  <input 
                    type="number" 
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="0" 
                    className="w-full pl-14 pr-6 py-6 bg-slate-50 border border-slate-200 rounded-[2rem] focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 outline-none transition-all font-black text-5xl text-slate-900 tracking-tighter placeholder:text-slate-300" 
                    required 
                  />
                </div>
              </div>

              {/* Ürün Seçimi */}
              <div>
                <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                  <ShoppingCart size={14} /> Ürünler (İsteğe Bağlı - Analiz İçin)
                </label>
                <div className="flex flex-wrap gap-2">
                  {products.filter(p => p.isActive).map(product => {
                    const selected = selectedProducts.find(p => p.productId === product.id);
                    return (
                      <div 
                        key={product.id}
                        className={`flex items-center rounded-xl border transition-all overflow-hidden ${
                          selected 
                            ? 'bg-primary-50 border-primary-200 shadow-sm' 
                            : 'bg-white border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <button
                          type="button"
                          onClick={() => handleProductToggle(product.id)}
                          className={`px-3 py-2 text-sm font-bold transition-colors ${
                            selected ? 'text-primary-700' : 'text-slate-600'
                          }`}
                        >
                          {product.name}
                        </button>
                        
                        {selected && (
                          <div className="flex items-center bg-primary-100/50 border-l border-primary-200/50">
                            <button
                              type="button"
                              onClick={() => handleQuantityChange(product.id, -1)}
                              className="p-2 text-primary-600 hover:bg-primary-200/50 transition-colors"
                            >
                              <Minus size={14} />
                            </button>
                            <span className="w-6 text-center text-xs font-black text-primary-700">
                              {selected.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() => handleQuantityChange(product.id, 1)}
                              className="p-2 text-primary-600 hover:bg-primary-200/50 transition-colors"
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                        )}
                      </div>
                    );
                  })}
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
