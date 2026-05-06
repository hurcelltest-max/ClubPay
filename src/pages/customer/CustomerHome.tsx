import React from 'react';
import { Bell, ChevronRight, Gift, QrCode, CreditCard, Sparkles } from 'lucide-react';
import { useDemoStore } from '../../store/demoStore';
import { useNavigate } from 'react-router-dom';

export default function CustomerHome() {
  const { user, campaigns } = useDemoStore();
  const navigate = useNavigate();

  if (!user || user.role !== 'customer') {
    return (
      <div className="p-8 flex flex-col items-center justify-center min-h-[60vh] text-center">
        <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-6">
          <ChevronRight size={40} className="text-slate-300" />
        </div>
        <p className="text-slate-500 font-medium mb-6">Oturumunuzun süresi dolmuş olabilir.</p>
        <button onClick={() => navigate('/login')} className="w-full max-w-xs py-4 bg-slate-900 text-white rounded-2xl font-bold shadow-xl active:scale-95 transition-transform">Giriş Yap</button>
      </div>
    );
  }

  return (
    <div className="p-6 pb-24 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex justify-between items-center mb-8 pt-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Selam, {user.name.split(' ')[0]} 👋</h1>
          <div className="flex items-center gap-2 mt-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">{user.riskLevel} Üye</p>
          </div>
        </div>
        <button className="w-12 h-12 bg-white rounded-2xl shadow-premium border border-slate-100 flex items-center justify-center relative active:scale-90 transition-transform">
          <Bell size={22} className="text-slate-700" />
          <span className="absolute top-3 right-3 w-2.5 h-2.5 bg-primary-500 rounded-full border-2 border-white"></span>
        </button>
      </div>

      {/* Main Dashboard Grid */}
      <div className="grid grid-cols-1 gap-4 mb-8">
        {/* Points Card */}
        <div className="bg-slate-900 rounded-[2rem] p-8 text-white relative overflow-hidden shadow-premium group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary-500/20 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-primary-500/40 transition-colors duration-700"></div>
          <div className="flex justify-between items-start mb-6">
            <div>
              <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] mb-1">Toplam Puanım</p>
              <div className="flex items-baseline gap-1">
                <p className="text-5xl font-black">{user.points.toLocaleString()}</p>
                <Sparkles size={20} className="text-primary-400 animate-pulse" />
              </div>
            </div>
            <div className="bg-white/10 p-3 rounded-2xl backdrop-blur-md border border-white/10">
              <QrCode size={24} className="text-white" />
            </div>
          </div>
          <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-primary-400 to-indigo-400 rounded-full" style={{ width: '65%' }}></div>
          </div>
          <p className="text-[10px] text-slate-500 mt-3 font-bold uppercase tracking-wider">Sonraki ödüle 550 puan kaldı</p>
        </div>

        {/* Credit Limit Card */}
        <div className="premium-card p-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600">
              <CreditCard size={24} />
            </div>
            <div>
              <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">Kalan Limitim</p>
              <p className="text-xl font-black text-slate-900">₺{(user.creditLimit - user.usedCredit).toLocaleString()}</p>
            </div>
          </div>
          <ChevronRight size={20} className="text-slate-300" />
        </div>
      </div>

      {/* Debt Section */}
      {user.usedCredit > 0 && (
        <div className="bg-orange-50 border border-orange-100 rounded-3xl p-6 mb-8 flex justify-between items-center shadow-sm">
          <div>
            <p className="text-orange-900 font-black text-xs uppercase tracking-widest mb-1">Güncel Borç</p>
            <p className="text-2xl font-black text-orange-600 tracking-tight">₺{user.usedCredit.toLocaleString()}</p>
          </div>
          <button className="px-5 py-2.5 bg-orange-600 text-white rounded-xl font-bold text-sm shadow-lg shadow-orange-600/20 active:scale-95 transition-transform">
            Ödeme Yap
          </button>
        </div>
      )}

      {/* Campaigns Section */}
      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-xl font-black text-slate-900 tracking-tight">Sana Özel Fırsatlar</h2>
        <button className="text-primary-600 text-sm font-bold">Hepsini Gör</button>
      </div>
      
      <div className="space-y-4">
        {campaigns.length === 0 && (
          <div className="p-10 bg-slate-50 rounded-[2rem] border border-dashed border-slate-200 text-center">
            <p className="text-slate-400 font-bold text-sm">Şu an aktif kampanya bulunmuyor.</p>
          </div>
        )}
        {campaigns.map(campaign => (
          <div key={campaign.id} className="premium-card p-5 flex items-center gap-5 group cursor-pointer active:scale-[0.98] transition-transform">
            <div className="bg-primary-50 w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-primary-100 transition-colors">
              <Gift className="text-primary-600" size={28} />
            </div>
            <div className="flex-1">
              <h3 className="font-black text-slate-900 text-lg leading-tight">{campaign.title}</h3>
              <p className="text-slate-500 text-xs mt-1 font-medium leading-relaxed">{campaign.description}</p>
            </div>
            <ChevronRight size={18} className="text-slate-300" />
          </div>
        ))}
      </div>
    </div>
  );
}
