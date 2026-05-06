import React, { useState } from 'react';
import { Gift, PlusCircle, Sparkles, Send } from 'lucide-react';
import { useDemoStore } from '../../store/demoStore';

export default function MerchantCampaigns() {
  const { campaigns, addCampaign } = useDemoStore();
  const [newCampaign, setNewCampaign] = useState({ title: '', description: '', discountValue: '' });

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCampaign.title || !newCampaign.discountValue) return;
    
    addCampaign({
      title: newCampaign.title,
      description: newCampaign.description,
      discountValue: Number(newCampaign.discountValue)
    });
    
    setNewCampaign({ title: '', description: '', discountValue: '' });
  };

  return (
    <div className="animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Sadakat Kampanyaları</h1>
          <p className="text-slate-500 mt-2 font-medium">Müşterilerinize özel fırsatlar sunarak satışlarınızı artırın.</p>
        </div>
        <div className="px-4 py-2 bg-indigo-50 text-indigo-700 rounded-2xl border border-indigo-100 flex items-center gap-2 text-xs font-black uppercase tracking-widest">
          <Sparkles size={14} /> Yapay Zeka Destekli
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
        {/* Form Section */}
        <div className="xl:col-span-5">
          <div className="bg-white rounded-[2rem] shadow-card border border-slate-100 p-8 sticky top-24">
            <h2 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-2">
              <PlusCircle size={20} className="text-primary-600" /> Yeni Kampanya Kur
            </h2>
            <form onSubmit={handleCreate} className="space-y-6">
              <div>
                <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Kampanya Başlığı</label>
                <input 
                  type="text" 
                  value={newCampaign.title}
                  onChange={e => setNewCampaign({...newCampaign, title: e.target.value})}
                  placeholder="Örn: %15 Hoşgeldin İndirimi" 
                  className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 outline-none transition-all font-bold text-slate-700 placeholder:text-slate-300" 
                  required 
                />
              </div>
              <div>
                <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Hediye Puan / İndirim Oranı</label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">%</div>
                  <input 
                    type="number" 
                    value={newCampaign.discountValue}
                    onChange={e => setNewCampaign({...newCampaign, discountValue: e.target.value})}
                    placeholder="10" 
                    className="w-full pl-10 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 outline-none transition-all font-black text-xl text-slate-900 placeholder:text-slate-300" 
                    required 
                  />
                </div>
                <p className="text-[10px] text-slate-400 mt-2 font-bold leading-relaxed">Müşterinin her harcamasında kazanacağı puan oranını belirtin.</p>
              </div>
              <div>
                <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Kampanya Detayı</label>
                <textarea 
                  value={newCampaign.description}
                  onChange={e => setNewCampaign({...newCampaign, description: e.target.value})}
                  placeholder="Müşterilerinize kısa bir not bırakın..." 
                  className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 outline-none transition-all font-medium text-slate-600 min-h-[100px]" 
                />
              </div>
              <button type="submit" className="w-full py-5 bg-slate-900 text-white rounded-2xl font-black text-lg hover:bg-primary-600 transition-all shadow-xl hover:shadow-primary-500/20 active:scale-[0.98] flex items-center justify-center gap-3">
                <Send size={20} /> Kampanyayı Yayına Al
              </button>
            </form>
          </div>
        </div>

        {/* List Section */}
        <div className="xl:col-span-7">
          <h2 className="text-xl font-black text-slate-900 mb-8 flex items-center gap-2">
            <Gift size={20} className="text-indigo-600" /> Aktif Kampanyalarınız
          </h2>
          <div className="space-y-6">
            {campaigns.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 bg-slate-50 rounded-[2.5rem] border-2 border-dashed border-slate-200">
                <div className="w-20 h-20 bg-white rounded-full shadow-sm flex items-center justify-center mb-6">
                  <Gift size={32} className="text-slate-200" />
                </div>
                <p className="text-slate-400 font-bold text-sm text-center max-w-xs">Şu an aktif bir kampanya yok. Sol taraftaki formdan hemen oluşturun.</p>
              </div>
            ) : (
              campaigns.map(camp => (
                <div key={camp.id} className="premium-card p-6 flex items-center justify-between group hover:border-primary-200 transition-all cursor-pointer">
                  <div className="flex items-center gap-6">
                    <div className="w-16 h-16 bg-primary-50 rounded-2xl flex items-center justify-center text-primary-600 group-hover:bg-primary-600 group-hover:text-white transition-all duration-500">
                      <Gift size={28} />
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="font-black text-slate-900 text-lg leading-none">{camp.title}</h3>
                        <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 text-[10px] font-black rounded-full border border-emerald-100 uppercase">Yayında</span>
                      </div>
                      <p className="text-sm text-slate-500 font-medium leading-relaxed">{camp.description}</p>
                    </div>
                  </div>
                  <div className="text-right flex flex-col items-end">
                    <p className="text-2xl font-black text-primary-600 leading-none">%{camp.discountValue}</p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-2">Puan Oranı</p>
                  </div>
                </div>
              ))
            )}
          </div>
          
          <div className="mt-10 p-8 bg-indigo-900 rounded-[2.5rem] text-white relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
            <h3 className="text-xl font-black mb-2 relative z-10">Biliyor muydunuz?</h3>
            <p className="text-indigo-100 text-sm font-medium leading-relaxed relative z-10 max-w-md">
              Sadakat programı kullanan işletmeler, kullanmayanlara oranla %35 daha fazla geri dönüş alan (returning customer) müşteriye sahiptir.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
