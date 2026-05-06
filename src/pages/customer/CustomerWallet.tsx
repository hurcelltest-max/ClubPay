import React from 'react';
import { useDemoStore } from '../../store/demoStore';
import { ArrowDownRight, ArrowUpRight, Clock, ShieldCheck } from 'lucide-react';

export default function CustomerWallet() {
  const { user, transactions } = useDemoStore();

  if (!user || user.role !== 'customer') return null;

  const userTransactions = transactions.filter(t => t.customerId === user.id);

  return (
    <div className="p-5 pb-24 animate-in fade-in slide-in-from-right-4 duration-500">
      <h1 className="text-2xl font-extrabold text-slate-900 mb-6 pt-4 tracking-tight">Cüzdan & Veresiye</h1>

      {/* Kart */}
      <div className="bg-slate-900 rounded-[2rem] p-6 text-white mb-8 shadow-premium relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-48 h-48 bg-primary-500/20 rounded-full blur-3xl -mr-10 -mt-10 group-hover:bg-primary-500/30 transition-colors"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-500/20 rounded-full blur-2xl -ml-10 -mb-10"></div>
        
        <div className="relative z-10">
          <p className="text-slate-400 text-xs mb-2 font-bold uppercase tracking-wider">Toplam Veresiye Borcu</p>
          <p className="text-4xl font-extrabold mb-8 tracking-tight">₺{user.usedCredit.toLocaleString()}</p>
          
          <div className="flex justify-between items-end border-t border-slate-700/50 pt-5">
            <div>
              <p className="text-slate-400 text-[10px] uppercase font-bold tracking-wider mb-1">Toplam Limit</p>
              <p className="font-semibold text-sm">₺{user.creditLimit.toLocaleString()}</p>
            </div>
            <div className="flex flex-col items-end">
              <p className="text-slate-400 text-[10px] uppercase font-bold tracking-wider mb-1 flex items-center gap-1">
                <ShieldCheck size={12} /> Risk Profili
              </p>
              <p className="font-bold text-sm text-yellow-400">{user.riskLevel}</p>
            </div>
          </div>
        </div>
      </div>

      {/* İşlem Geçmişi */}
      <div className="flex justify-between items-end mb-5">
        <h2 className="text-xl font-bold text-slate-900 tracking-tight">Son İşlemler</h2>
      </div>
      
      <div className="space-y-4">
        {userTransactions.length === 0 && (
          <div className="bg-slate-50/50 p-8 rounded-2xl border border-dashed border-slate-200 text-center">
            <p className="text-sm font-medium text-slate-500">Henüz hiçbir işlem kaydınız bulunmuyor.</p>
          </div>
        )}
        {userTransactions.map(tx => (
          <div key={tx.id} className="flex items-center justify-between bg-white p-4 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow active:scale-[0.98]">
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${tx.amount > 0 ? 'bg-orange-50 text-orange-600' : 'bg-emerald-50 text-emerald-600'}`}>
                {tx.amount > 0 ? <ArrowDownRight size={20} strokeWidth={2.5} /> : <ArrowUpRight size={20} strokeWidth={2.5} />}
              </div>
              <div>
                <p className="font-bold text-slate-900 capitalize text-sm">{tx.type.replace('_', ' ')}</p>
                <div className="flex items-center gap-1.5 text-[11px] font-medium text-slate-400 mt-1">
                  <Clock size={12} /> {new Date(tx.date).toLocaleDateString('tr-TR')}
                </div>
              </div>
            </div>
            <div className="text-right">
              <p className={`font-extrabold text-base ${tx.amount > 0 ? 'text-slate-900' : 'text-emerald-600'}`}>
                {tx.amount > 0 ? '+' : ''}{tx.amount} ₺
              </p>
              <p className="text-[11px] font-medium text-slate-500 truncate max-w-[100px]">{tx.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
