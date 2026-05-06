import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Store, User, ShieldCheck, RefreshCcw, CheckCircle2, ArrowRight, Sparkles } from 'lucide-react';
import { useDemoStore } from '../../store/demoStore';
import { Logo } from '../../components/ui/Logo';

export default function Login() {
  const navigate = useNavigate();
  const { login, resetDemo } = useDemoStore();

  const handleLogin = (role: 'customer' | 'merchant' | 'admin', path: string) => {
    login(role);
    // Admin ise gizli rotaya yönlendir
    const finalPath = role === 'admin' ? '/super-admin-hidden' : path;
    navigate(finalPath);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 selection:bg-primary-500 selection:text-white">
      <div className="max-w-5xl w-full">
        {/* Header Section */}
        <div className="text-center mb-16 animate-in fade-in slide-in-from-top-8 duration-700">
          <div className="flex justify-center mb-8">
            <div className="p-3 bg-white rounded-3xl shadow-premium border border-slate-100">
              <Logo className="scale-125" />
            </div>
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tight mb-6 leading-tight">
            Geleceğin Esnaf<br/>Ekosistemi <span className="text-primary-600">ClubPay</span>
          </h1>
          <p className="text-slate-500 text-lg md:text-xl max-w-2xl mx-auto font-medium leading-relaxed">
            Esnaflar için modern yönetim, müşteriler için dijital cüzdan. 
            Güvenilir, hızlı ve tamamen dijital bir alışveriş deneyimi.
          </p>
        </div>

        {/* Access Options Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 max-w-4xl mx-auto">
          {/* Müşteri Deneyimi */}
          <div className="premium-card p-10 flex flex-col group hover:-translate-y-2">
            <div className="w-16 h-16 bg-slate-50 group-hover:bg-primary-50 rounded-[1.5rem] flex items-center justify-center text-slate-400 group-hover:text-primary-600 mb-8 transition-all duration-500">
              <User size={32} />
            </div>
            <h2 className="text-2xl font-black text-slate-900 mb-4 tracking-tight">Müşteri Uygulaması</h2>
            <p className="text-slate-500 text-sm mb-8 flex-1 leading-relaxed font-medium">
              Dijital QR kart, puan takibi ve borç yönetimi ile kusursuz bir müşteri deneyimi.
            </p>
            <div className="space-y-4 mb-10 text-sm font-bold text-slate-600">
              <p className="flex items-center gap-3"><CheckCircle2 size={18} className="text-emerald-500" /> Akıllı Dijital Cüzdan</p>
              <p className="flex items-center gap-3"><CheckCircle2 size={18} className="text-emerald-500" /> QR ile Hızlı Ödeme</p>
              <p className="flex items-center gap-3"><CheckCircle2 size={18} className="text-emerald-500" /> Kişiselleştirilmiş Puanlar</p>
            </div>
            <button 
              onClick={() => handleLogin('customer', '/customer')}
              className="w-full py-4 bg-slate-900 hover:bg-primary-600 text-white rounded-2xl font-black transition-all duration-300 flex items-center justify-center gap-2 shadow-xl hover:shadow-primary-500/20 active:scale-95"
            >
              Uygulamayı Test Et <ArrowRight size={20} />
            </button>
          </div>

          {/* İşletme Paneli */}
          <div className="premium-card p-10 flex flex-col group hover:-translate-y-2 border-primary-100">
            <div className="w-16 h-16 bg-slate-50 group-hover:bg-indigo-50 rounded-[1.5rem] flex items-center justify-center text-slate-400 group-hover:text-indigo-600 mb-8 transition-all duration-500">
              <Store size={32} />
            </div>
            <div className="flex items-center gap-2 mb-4">
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">Esnaf Paneli</h2>
              <span className="px-2 py-0.5 bg-indigo-100 text-indigo-700 text-[10px] font-black rounded-full uppercase tracking-tighter">İşletme</span>
            </div>
            <p className="text-slate-500 text-sm mb-8 flex-1 leading-relaxed font-medium">
              Satış, veresiye takibi ve müşteri analizleri ile işletmenizi cebinizden yönetin.
            </p>
            <div className="space-y-4 mb-10 text-sm font-bold text-slate-600">
              <p className="flex items-center gap-3"><CheckCircle2 size={18} className="text-indigo-500" /> Dijital Veresiye Defteri</p>
              <p className="flex items-center gap-3"><CheckCircle2 size={18} className="text-indigo-500" /> Tek Dokunuşla Tahsilat</p>
              <p className="flex items-center gap-3"><CheckCircle2 size={18} className="text-indigo-500" /> CRM ve Kampanya Yönetimi</p>
            </div>
            <button 
              onClick={() => handleLogin('merchant', '/merchant')}
              className="w-full py-4 bg-slate-900 hover:bg-indigo-600 text-white rounded-2xl font-black transition-all duration-300 flex items-center justify-center gap-2 shadow-xl hover:shadow-indigo-500/20 active:scale-95"
            >
              Paneli Yönet <ArrowRight size={20} />
            </button>
          </div>
        </div>

        {/* Tooltip / Footer Section */}
        <div className="flex flex-col items-center animate-in fade-in duration-1000 delay-500 pb-12">
          <div className="flex items-center gap-4 mb-8">
            <div className="h-px w-12 bg-slate-200"></div>
            <div className="flex items-center gap-2 text-slate-400 font-bold text-[10px] uppercase tracking-[0.3em]">
              <Sparkles size={12} className="text-primary-400" /> Geliştirici & Test Araçları
            </div>
            <div className="h-px w-12 bg-slate-200"></div>
          </div>
          
          <button 
            onClick={resetDemo}
            className="group inline-flex items-center gap-3 px-8 py-4 bg-white border border-slate-200 text-slate-600 hover:text-red-600 hover:border-red-200 rounded-[1.25rem] font-black text-sm transition-all duration-300 shadow-sm active:scale-95"
          >
            <RefreshCcw size={18} className="group-hover:rotate-180 transition-transform duration-700" />
            TÜM DEMO VERİLERİNİ SIFIRLA
          </button>
          
          <p className="text-slate-400 text-xs mt-6 font-medium tracking-wide">
            ClubPay MVP v1.0 • Tarayıcı hafızasında güvenli saklama etkindir.
          </p>
        </div>
      </div>
    </div>
  );
}
