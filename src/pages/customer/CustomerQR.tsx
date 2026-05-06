import React from 'react';
import { useDemoStore } from '../../store/demoStore';
import { QrCode, ShieldCheck } from 'lucide-react';

export default function CustomerQR() {
  const { user } = useDemoStore();

  if (!user || user.role !== 'customer') return null;

  return (
    <div className="p-5 flex flex-col items-center justify-center min-h-[85vh] animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-3">QR Kartınız</h1>
        <p className="text-slate-500 text-sm font-medium leading-relaxed max-w-[250px] mx-auto">
          Kasada ödeme yaparken veya puan kazanırken bu kodu esnafa gösterin.
        </p>
      </div>

      <div className="bg-white p-8 rounded-[2rem] shadow-premium border border-slate-100 flex flex-col items-center w-full max-w-xs relative overflow-hidden group">
        {/* Dekoratif çizgiler */}
        <div className="absolute top-0 left-0 w-full h-3 bg-gradient-to-r from-primary-400 via-primary-600 to-purple-600"></div>
        
        <div className="w-56 h-56 bg-slate-50 rounded-2xl mb-8 flex items-center justify-center p-4 border border-slate-100 group-hover:border-primary-200 transition-colors">
          <div className="w-full h-full border-4 border-dashed border-slate-200 rounded-xl flex flex-col gap-2 items-center justify-center bg-white">
            <QrCode size={48} className="text-slate-300" strokeWidth={1.5} />
            <span className="text-slate-400 font-mono text-xs font-bold tracking-widest">{user.qrCode}</span>
          </div>
        </div>
        
        <p className="text-xl font-extrabold text-slate-900 tracking-tight">{user.name}</p>
        <div className="flex items-center gap-1.5 mt-2 text-primary-600">
          <ShieldCheck size={16} />
          <p className="font-bold text-sm">Doğrulanmış Üye</p>
        </div>
      </div>

      <div className="mt-12 flex gap-4 w-full max-w-xs">
        <button className="flex-1 bg-slate-900 text-white py-4 rounded-2xl font-bold shadow-lg hover:shadow-premium hover:-translate-y-1 transition-all active:scale-95 duration-300">
          Kodu Yenile
        </button>
      </div>
    </div>
  );
}
