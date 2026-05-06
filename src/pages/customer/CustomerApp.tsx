import React from 'react';
import { Bell, Gift, CreditCard, QrCode, Home as HomeIcon } from 'lucide-react';
import { useDemoStore } from '../../store/demoStore';
import { useNavigate, Routes, Route, Link, useLocation } from 'react-router-dom';
import CustomerWallet from './CustomerWallet';
import CustomerQR from './CustomerQR';

function CustomerHome() {
  const { user, campaigns } = useDemoStore();

  if (!user) return null;

  return (
    <div className="p-5 pb-24 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex justify-between items-center mb-8 pt-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Merhaba, {user.name.split(' ')[0]} 👋</h1>
          <p className="text-slate-500 text-sm font-medium">{user.riskLevel} Seviye Üye</p>
        </div>
        <button className="w-10 h-10 bg-white rounded-full shadow-sm border border-slate-100 flex items-center justify-center relative hover:bg-slate-50 transition-colors">
          <Bell size={20} className="text-slate-700" />
          <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
        </button>
      </div>

      {/* Main Cards - Glassmorphism touch */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-gradient-to-br from-primary-600 to-primary-800 rounded-3xl p-5 text-white shadow-premium relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full blur-xl -mr-10 -mt-10"></div>
          <p className="text-primary-100 text-xs mb-2 font-bold uppercase tracking-wider">Kazanılan Puan</p>
          <p className="text-3xl font-extrabold tracking-tight">{user.points}</p>
        </div>
        <div className="bg-white border border-slate-100 rounded-3xl p-5 shadow-card hover:shadow-premium transition-shadow">
          <p className="text-slate-400 text-xs mb-2 font-bold uppercase tracking-wider">Kalan Limit (₺)</p>
          <p className="text-3xl font-extrabold text-slate-900 tracking-tight">{(user.creditLimit - user.usedCredit).toLocaleString()}</p>
        </div>
      </div>

      {/* Warning/Info Box */}
      {user.usedCredit > 0 && (
        <div className="bg-orange-50 border border-orange-100 rounded-2xl p-5 mb-8 flex justify-between items-center shadow-sm">
          <div>
            <p className="text-orange-800 font-bold text-sm">Güncel Veresiye Borcunuz</p>
            <p className="text-orange-600/80 text-xs mt-1 font-medium">Lütfen en kısa sürede ödemenizi yapın.</p>
          </div>
          <p className="text-2xl font-extrabold text-orange-600">₺{user.usedCredit}</p>
        </div>
      )}

      {/* Campaigns */}
      <div className="mb-5 flex justify-between items-end">
        <h2 className="text-xl font-bold text-slate-900 tracking-tight">Sana Özel Fırsatlar</h2>
      </div>
      <div className="space-y-4">
        {campaigns.length === 0 && (
          <div className="bg-slate-50/50 p-6 rounded-2xl border border-dashed border-slate-200 text-center">
            <p className="text-sm font-medium text-slate-500">Şu an aktif kampanya bulunmuyor.</p>
          </div>
        )}
        {campaigns.map(campaign => (
          <div key={campaign.id} className="bg-white rounded-3xl p-5 border border-slate-100 shadow-card flex items-center gap-4 active:scale-95 transition-transform cursor-pointer">
            <div className="bg-primary-50 w-14 h-14 rounded-2xl flex items-center justify-center shrink-0">
              <Gift className="text-primary-600" size={24} />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base">{campaign.title}</h3>
              <p className="text-slate-500 text-sm mt-1 font-medium">{campaign.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function BottomNav() {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-md border-t border-slate-100 pb-safe z-50">
      <div className="flex justify-around items-center h-20 px-6 max-w-md mx-auto">
        <Link to="/customer" className={`flex flex-col items-center gap-1.5 p-2 transition-colors ${isActive('/customer') ? 'text-primary-600' : 'text-slate-400 hover:text-slate-600'}`}>
          <HomeIcon size={24} className={isActive('/customer') ? 'stroke-[2.5px]' : ''} />
          <span className="text-[10px] font-bold">Ana Sayfa</span>
        </Link>
        <Link to="/customer/qr" className={`flex flex-col items-center gap-1.5 p-2 transition-colors ${isActive('/customer/qr') ? 'text-primary-600' : 'text-slate-400 hover:text-slate-600'}`}>
          <div className={`w-12 h-12 rounded-full flex items-center justify-center -mt-8 shadow-premium transition-transform active:scale-95 ${isActive('/customer/qr') ? 'bg-primary-600 text-white' : 'bg-slate-900 text-white'}`}>
            <QrCode size={24} />
          </div>
          <span className="text-[10px] font-bold mt-1">QR Kartım</span>
        </Link>
        <Link to="/customer/wallet" className={`flex flex-col items-center gap-1.5 p-2 transition-colors ${isActive('/customer/wallet') ? 'text-primary-600' : 'text-slate-400 hover:text-slate-600'}`}>
          <CreditCard size={24} className={isActive('/customer/wallet') ? 'stroke-[2.5px]' : ''} />
          <span className="text-[10px] font-bold">Cüzdan</span>
        </Link>
      </div>
    </div>
  );
}

export default function CustomerApp() {
  const { user } = useDemoStore();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!user || user.role !== 'customer') {
      navigate('/login');
    }
  }, [user, navigate]);

  if (!user) return null;

  return (
    <div className="bg-slate-50 min-h-screen font-sans max-w-md mx-auto relative shadow-2xl overflow-x-hidden">
      <Routes>
        <Route path="/" element={<CustomerHome />} />
        <Route path="/wallet" element={<CustomerWallet />} />
        <Route path="/qr" element={<CustomerQR />} />
      </Routes>
      <BottomNav />
    </div>
  );
}
