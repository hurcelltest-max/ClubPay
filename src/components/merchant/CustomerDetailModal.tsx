import React from 'react';
import { X, ShoppingBag, Heart, MessageCircle, Clock, AlertCircle, Sparkles, Zap, MapPin, Phone, User } from 'lucide-react';
import { useDemoStore } from '../../store/demoStore';
import { WHATSAPP_TEMPLATES, generateWhatsAppLink } from '../../services/whatsappService';

interface CustomerDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  customerId: string | null;
}

export default function CustomerDetailModal({ isOpen, onClose, customerId }: CustomerDetailModalProps) {
  const { customers, transactions, products, user, generateCustomerInsights, addWhatsAppMessage } = useDemoStore();

  if (!isOpen || !customerId) return null;

  const customer = customers.find(c => c.id === customerId);
  if (!customer) return null;

  const customerTx = transactions.filter(t => t.customerId === customerId);
  const totalSpent = customerTx.filter(t => t.type !== 'tahsilat').reduce((acc, t) => acc + t.amount, 0);
  
  // İnsani Dil - Ödeme Alışkanlığı
  let paymentHabitText = "Ödemeleri düzenli 🙂";
  let paymentHabitColor = "text-emerald-600 bg-emerald-50 border-emerald-200";
  if (customer.riskLevel === 'Bronz') {
    paymentHabitText = "Ödemeleri bazen gecikebiliyor";
    paymentHabitColor = "text-orange-600 bg-orange-50 border-orange-200";
  }

  // Son ziyaret
  let lastVisitText = "Henüz işlem yok";
  let daysSinceVisit = 0;
  if (customerTx.length > 0) {
    const lastVisit = new Date(customerTx[0].date);
    daysSinceVisit = Math.floor((new Date().getTime() - lastVisit.getTime()) / (1000 * 3600 * 24));
    if (daysSinceVisit === 0) lastVisitText = "Bugün uğradı";
    else if (daysSinceVisit === 1) lastVisitText = "Dün uğradı";
    else lastVisitText = `${daysSinceVisit} gün önce uğradı`;
  }

  // Davranış Analizleri
  const insights = generateCustomerInsights().filter(i => i.customerId === customerId);

  // Favori ürünler analizi (Basitçe satılan ürünleri topla)
  const productCounts: Record<string, number> = {};
  customerTx.forEach(tx => {
    if (tx.items) {
      tx.items.forEach(item => {
        productCounts[item.productId] = (productCounts[item.productId] || 0) + item.quantity;
      });
    }
  });
  
  const favoriteProductIds = Object.entries(productCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(entry => entry[0]);

  const favoriteProducts = products.filter(p => favoriteProductIds.includes(p.id));

  const handleFastWhatsApp = (templateId: string, customMessage?: string) => {
    const template = WHATSAPP_TEMPLATES.find(t => t.id === templateId) || WHATSAPP_TEMPLATES[0];
    const message = customMessage || template.message({
      customerName: customer.name,
      merchantName: user?.name || 'Esnafımız',
      amount: customer.usedCredit,
      points: customer.points
    });
    
    addWhatsAppMessage(customer.id, templateId, message);
    window.open(generateWhatsAppLink(customer.phone!, message), '_blank');
  };

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      {/* Backdrop */}
      <div 
        className={`absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`} 
        onClick={onClose} 
      />
      
      {/* Slide-over Panel: Mobile Full Screen, Desktop Slide-over */}
      <div className={`relative z-10 w-full md:w-[600px] h-full bg-slate-50 shadow-2xl flex flex-col transform transition-transform duration-500 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        
        {/* Header */}
        <div className="bg-white px-6 py-5 border-b border-slate-100 flex items-center justify-between shadow-sm z-20">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-primary-100 text-primary-700 font-black text-xl flex items-center justify-center">
              {customer.name.charAt(0)}
            </div>
            <div>
              <h2 className="text-xl font-black text-slate-900 tracking-tight">{customer.name}</h2>
              <div className="flex items-center gap-2 mt-0.5 text-xs font-bold text-slate-500">
                <Phone size={12} /> {customer.phone}
              </div>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors">
            <X size={24} />
          </button>
        </div>

        {/* Content - Scrollable */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* Ana Metrikler */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-5 rounded-[2rem] border border-slate-100 shadow-sm">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Cari Durum</p>
              <p className={`text-2xl font-black tracking-tighter ${customer.usedCredit > 0 ? 'text-orange-600' : 'text-emerald-600'}`}>
                {customer.usedCredit > 0 ? `₺${customer.usedCredit}` : 'Borç Yok'}
              </p>
              <p className="text-xs font-bold text-slate-400 mt-2">Toplam Limit: ₺{customer.creditLimit}</p>
            </div>
            <div className="bg-white p-5 rounded-[2rem] border border-slate-100 shadow-sm">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Müşteri Puanı</p>
              <p className="text-2xl font-black text-primary-600 tracking-tighter">{customer.points}</p>
              <p className="text-xs font-bold text-slate-400 mt-2">Puan Bakiyesi</p>
            </div>
          </div>

          {/* İnsani Profil Özeti */}
          <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm p-6">
            <h3 className="text-sm font-black text-slate-900 mb-4 flex items-center gap-2">
              <User size={16} className="text-primary-500" /> 
              Profil & Alışkanlıklar
            </h3>
            <div className="space-y-3">
              <div className={`p-3 rounded-xl border flex items-center gap-3 text-sm font-bold ${paymentHabitColor}`}>
                <AlertCircle size={18} /> {paymentHabitText}
              </div>
              <div className="p-3 rounded-xl border border-slate-100 bg-slate-50 flex items-center justify-between text-sm font-bold text-slate-700">
                <div className="flex items-center gap-3">
                  <Clock size={18} className="text-slate-400" />
                  Ziyaret Sıklığı
                </div>
                <span className={daysSinceVisit > 30 ? "text-orange-500" : "text-emerald-600"}>
                  {daysSinceVisit > 30 ? `Uzun süredir uğramadı (${daysSinceVisit} gün)` : lastVisitText}
                </span>
              </div>
            </div>
          </div>

          {/* Akıllı Davranış Insight'ları */}
          {insights.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-sm font-black text-slate-900 mb-2 flex items-center gap-2">
                <Sparkles size={16} className="text-amber-500" /> Akıllı Asistan Önerileri
              </h3>
              {insights.map((insight, idx) => (
                <div key={idx} className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col gap-3">
                  <div>
                    <h4 className="font-bold text-sm text-slate-900">{insight.title}</h4>
                    <p className="text-xs font-medium text-slate-500 mt-1">{insight.description}</p>
                  </div>
                  <div className="flex gap-2 mt-2">
                    <button 
                      onClick={() => handleFastWhatsApp(insight.type === 'repurchase_warning' ? 'product_campaign' : 'loyal_customer')}
                      className="px-4 py-2 bg-emerald-50 text-emerald-700 border border-emerald-100 rounded-xl text-xs font-bold hover:bg-emerald-100 transition-colors flex items-center gap-2"
                    >
                      <MessageCircle size={14} /> 
                      {insight.type === 'silent_customer' ? 'Davet Gönder' : 'Hatırlat'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Favori Ürünler */}
          {favoriteProducts.length > 0 && (
            <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm p-6">
              <h3 className="text-sm font-black text-slate-900 mb-4 flex items-center gap-2">
                <Heart size={16} className="text-rose-500" /> Sık Aldığı Ürünler
              </h3>
              <div className="flex flex-wrap gap-2">
                {favoriteProducts.map(p => (
                  <span key={p.id} className="px-3 py-1.5 bg-slate-50 border border-slate-200 text-slate-700 rounded-xl text-xs font-bold">
                    {p.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* WhatsApp Geçmişi */}
          <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm p-6">
            <h3 className="text-sm font-black text-slate-900 mb-4 flex items-center gap-2">
              <MessageCircle size={16} className="text-emerald-500" /> WhatsApp Geçmişi
            </h3>
            {(!customer.whatsappHistory || customer.whatsappHistory.length === 0) ? (
              <p className="text-xs font-medium text-slate-400 italic">Henüz sistem üzerinden mesaj gönderilmemiş.</p>
            ) : (
              <div className="space-y-4">
                {customer.whatsappHistory.slice(0, 5).map(msg => (
                  <div key={msg.id} className="border-l-2 border-emerald-200 pl-3">
                    <p className="text-[10px] font-bold text-slate-400 mb-1">
                      {new Date(msg.date).toLocaleDateString('tr-TR', { day: 'numeric', month: 'short' })} - {new Date(msg.date).toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}
                    </p>
                    <p className="text-xs font-medium text-slate-700 line-clamp-2">{msg.content}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
        
        {/* Footer (Quick Actions) */}
        <div className="bg-white p-5 border-t border-slate-100 grid grid-cols-2 gap-3 z-20">
          <button 
            onClick={() => handleFastWhatsApp('veresiye_reminder')}
            className="py-3 bg-white border border-slate-200 text-slate-700 rounded-xl font-bold text-sm shadow-sm hover:bg-slate-50 flex items-center justify-center gap-2"
          >
            <AlertCircle size={16} /> Bakiye Hatırlat
          </button>
          <button 
            onClick={() => handleFastWhatsApp('loyal_customer')}
            className="py-3 bg-emerald-600 text-white rounded-xl font-bold text-sm shadow-lg shadow-emerald-200 hover:bg-emerald-700 flex items-center justify-center gap-2"
          >
            <MessageCircle size={16} /> Serbest Mesaj
          </button>
        </div>
      </div>
    </div>
  );
}
