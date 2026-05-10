import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Logo } from '../../components/ui/Logo';
import { 
  ArrowRight, CheckCircle2, Smartphone, Monitor, ShieldCheck, 
  Gift, CreditCard, Users, Store, QrCode, TrendingUp, Zap, ChevronRight
} from 'lucide-react';
import toast from 'react-hot-toast';

export default function LandingPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', company: '', phone: '', type: 'telefoncu' });

  const handleWaitlistSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Erken erişim talebiniz alındı! Sizinle iletişime geçeceğiz.', { icon: '🚀' });
    setFormData({ name: '', company: '', phone: '', type: 'telefoncu' });
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-primary-500 selection:text-white overflow-x-hidden">
      
      {/* Navbar */}
      <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-lg border-b border-slate-100 z-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link to="/"><Logo className="scale-110" /></Link>
          <nav className="hidden md:flex items-center gap-8 font-medium text-sm text-slate-600">
            <a href="#features" className="hover:text-primary-600 transition-colors">Özellikler</a>
            <a href="#how-it-works" className="hover:text-primary-600 transition-colors">Nasıl Çalışır?</a>
            <a href="#pricing" className="hover:text-primary-600 transition-colors">Paketler</a>
          </nav>
          <div className="flex items-center gap-4">
            <Link to="/login" className="hidden md:block font-bold text-slate-700 hover:text-primary-600 transition-colors">Giriş Yap</Link>
            <a href="#waitlist" className="px-6 py-3 bg-primary-600 text-white rounded-xl font-bold hover:bg-primary-700 transition-all hover:shadow-lg active:scale-95 shadow-md shadow-primary-500/20">
              Ücretsiz Başla
            </a>
          </div>
        </div>
      </header>

      <main className="pt-20">
        
        {/* 1. Hero Section */}
        <section className="relative pt-24 pb-32 overflow-hidden">
          {/* Background Gradients */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary-400/20 blur-[120px] rounded-full pointer-events-none animate-pulse"></div>
          
          <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white text-primary-700 font-bold text-xs uppercase tracking-widest mb-8 border border-slate-200 shadow-sm">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500"></span>
              </span>
              YENİ NESİL ESNAF SİSTEMİ
            </div>
            
            <h1 className="text-5xl md:text-8xl font-extrabold tracking-tight mb-8 leading-[1]">
              İşletmeni <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-indigo-600">Dijital Güçle</span> Büyüt
            </h1>
            
            <p className="text-lg md:text-2xl text-slate-500 max-w-3xl mx-auto mb-12 font-medium leading-relaxed">
              Defterleri rafa kaldırın. Sadakat programı, veresiye yönetimi ve dijital müşteri kimliğini tek bir profesyonel platformda toplayın.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <a href="#waitlist" className="w-full sm:w-auto px-10 py-5 bg-slate-900 text-white rounded-2xl font-bold text-xl hover:bg-primary-600 transition-all hover:shadow-premium hover:-translate-y-1.5 flex items-center justify-center gap-3 group">
                Hemen Demo Talep Et <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <Link to="/login" className="w-full sm:w-auto px-10 py-5 bg-white border border-slate-200 text-slate-700 rounded-2xl font-bold text-xl hover:bg-slate-50 hover:border-slate-300 transition-all flex items-center justify-center gap-3 shadow-sm active:scale-95">
                Canlı Demoyu İncele
              </Link>
            </div>
            
            <div className="mt-8 flex items-center justify-center gap-6 text-slate-400 text-sm font-semibold">
              <span className="flex items-center gap-2"><CheckCircle2 size={16} className="text-emerald-500"/> Kredi Kartı Gerektirmez</span>
              <span className="flex items-center gap-2"><CheckCircle2 size={16} className="text-emerald-500"/> 1 Dakikada Kurulum</span>
            </div>
            
            {/* Hero Mockup */}
            <div className="mt-24 relative mx-auto max-w-5xl animate-float">
              <div className="absolute inset-x-0 -bottom-10 h-24 bg-gradient-to-t from-slate-50 to-transparent z-20"></div>
              <div className="relative rounded-[3rem] border border-slate-200/60 bg-white/40 backdrop-blur-xl p-3 md:p-6 shadow-2xl overflow-hidden">
                <div className="w-full aspect-[16/9] bg-slate-950 rounded-[2rem] overflow-hidden relative shadow-inner border border-white/10 group">
                    {/* Simplified UI Showcase */}
                    <div className="absolute inset-0 p-8 flex flex-col">
                      <div className="flex justify-between items-center mb-8">
                        <div className="flex gap-4">
                          <div className="w-10 h-10 rounded-full bg-primary-500/20 flex items-center justify-center border border-primary-500/30">
                            <Zap size={20} className="text-primary-500" />
                          </div>
                          <div className="space-y-2">
                            <div className="w-24 h-2 bg-white/20 rounded"></div>
                            <div className="w-16 h-2 bg-white/10 rounded"></div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <div className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-xs font-bold text-white/50">Dashboard</div>
                          <div className="px-4 py-2 rounded-lg bg-primary-600 border border-primary-500 text-xs font-bold text-white">Satışlar</div>
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-6 mb-8">
                        {[1,2,3].map(i => (
                          <div key={i} className="h-32 bg-white/5 border border-white/10 rounded-2xl p-4 flex flex-col justify-between">
                            <div className="w-8 h-8 rounded-lg bg-white/5"></div>
                            <div className="w-1/2 h-3 bg-white/10 rounded"></div>
                          </div>
                        ))}
                      </div>
                      <div className="flex-1 bg-white/5 border border-white/10 rounded-2xl p-6">
                        <div className="flex items-center gap-4 mb-4">
                          <div className="w-4 h-4 rounded-full bg-emerald-500 animate-pulse"></div>
                          <div className="w-32 h-3 bg-white/20 rounded"></div>
                        </div>
                        <div className="space-y-3">
                          {[1,2].map(i => <div key={i} className="w-full h-12 bg-white/5 rounded-xl"></div>)}
                        </div>
                      </div>
                    </div>
                    {/* Hover Glow Effect */}
                    <div className="absolute inset-0 bg-primary-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. Features Section */}
        <section id="features" className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">Her Şey Tek Bir Yerde</h2>
              <p className="text-lg text-slate-500 max-w-2xl mx-auto">Modern işletmeler için tasarlandı. Eski usul veresiye defterini çöpe atın.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { icon: Gift, title: "Sadakat Sistemi", desc: "Müşterilerinize her alışverişte puan kazandırın, tekrar gelmelerini sağlayın." },
                { icon: CreditCard, title: "Veresiye Yönetimi", desc: "Açık hesap ve veresiyeleri dijitalleştirin. Limiti siz belirleyin." },
                { icon: QrCode, title: "QR Müşteri Kartı", desc: "Plastik karta son. Müşterileriniz telefonlarındaki QR ile ödeme yapsın." },
                { icon: Zap, title: "Kampanyalar", desc: "Anında SMS veya bildirimle yeni kampanyalarınızı duyurun." },
                { icon: Users, title: "Müşteri CRM", desc: "Kim ne kadar harcıyor, kim en sadık müşteriniz detaylı analiz edin." },
                { icon: TrendingUp, title: "SaaS Analitiği", desc: "İşletmenizin nakit akışını, alacaklarını ve büyümesini anlık görün." }
              ].map((feat, i) => (
                <div key={i} className="p-8 rounded-3xl bg-slate-50 hover:bg-white hover:shadow-card border border-transparent hover:border-slate-100 transition-all duration-300">
                  <div className="w-14 h-14 bg-primary-100 text-primary-600 rounded-2xl flex items-center justify-center mb-6">
                    <feat.icon size={28} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{feat.title}</h3>
                  <p className="text-slate-500 font-medium leading-relaxed">{feat.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 3. Nasıl Çalışır? */}
        <section id="how-it-works" className="py-24 bg-slate-900 text-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-extrabold mb-4">Nasıl Çalışır?</h2>
              <p className="text-lg text-slate-400">Üç basit adımda defterleri dijitale taşıyın.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
              <div className="hidden md:block absolute top-12 left-[20%] right-[20%] h-0.5 bg-slate-800"></div>
              {[
                { step: "1", title: "Müşteriyi Tanı", desc: "Saniyeler içinde müşteriyi kaydet. Telefonundaki QR kart ile her geldiğinde onu hemen tanı." },
                { step: "2", title: "Kasada Hızlan", desc: "İster peşin ister veresiye, 10 saniyenin altında satışı tamamla. Puan kazandır veya tahsilat yap." },
                { step: "3", title: "Hatırlat & Sat", desc: "Uzun süre gelmeyeni WhatsApp'tan tek tıkla çağır. Bakiye limitini otomatik yönet." }
              ].map((item, i) => (
                <div key={i} className="relative z-10 text-center">
                  <div className="w-24 h-24 mx-auto bg-primary-600 rounded-full flex items-center justify-center text-3xl font-extrabold mb-8 shadow-premium border-8 border-slate-900">
                    {item.step}
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                  <p className="text-slate-400 leading-relaxed max-w-sm mx-auto">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 4. Pilot İşletme Vitrini */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 font-bold text-xs uppercase tracking-widest mb-4 border border-emerald-100">
              Canlı Demolar
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">Gerçek İşletmelerde İnceleyin</h2>
            <p className="text-lg text-slate-500 mb-12 max-w-2xl mx-auto">ClubPay'in farklı işletmelerdeki müşteri deneyimini canlı olarak test edin.</p>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {[
                { name: 'HurCELL İletişim', slug: 'hurcell', icon: '📱', color: 'bg-blue-500', desc: 'Telefon & Aksesuar' },
                { name: 'Jum Burger', slug: 'jum-burger', icon: '🍔', color: 'bg-orange-500', desc: 'Cafe & Restoran' },
                { name: 'Demo Market', slug: 'demo-market', icon: '🛒', color: 'bg-emerald-500', desc: 'Perakende & Bakkal' }
              ].map(shop => (
                <a 
                  key={shop.slug} 
                  href={`/${shop.slug}`}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group block p-6 bg-slate-50 border border-slate-100 rounded-3xl text-left hover:bg-white hover:shadow-xl hover:border-slate-200 transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className={`w-14 h-14 ${shop.color} text-white rounded-2xl flex items-center justify-center text-2xl mb-4 shadow-sm group-hover:scale-110 transition-transform`}>
                    {shop.icon}
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-1">{shop.name}</h3>
                  <p className="text-sm font-medium text-slate-500 flex items-center justify-between">
                    {shop.desc}
                    <ArrowRight size={16} className="text-slate-300 group-hover:text-primary-600 transition-colors" />
                  </p>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* 5. Mockup / UI Showcase */}
        <section className="py-24 bg-slate-50 overflow-hidden">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6">Uçtan Uca Modern Deneyim</h2>
                <p className="text-lg text-slate-500 mb-8 leading-relaxed">
                  İster dev ekranda işletmenizi yönetin, ister müşterileriniz cebindeki mobil uygulama ile size bağlansın.
                </p>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-center gap-3 text-slate-700 font-medium"><CheckCircle2 className="text-primary-600" /> Esnaflar için Profesyonel Satış & Veresiye Paneli</li>
                  <li className="flex items-center gap-3 text-slate-700 font-medium"><CheckCircle2 className="text-primary-600" /> Müşteriler için Temassız QR Sadakat Cüzdanı</li>
                  <li className="flex items-center gap-3 text-slate-700 font-medium"><CheckCircle2 className="text-primary-600" /> Otomatik Puan Hesaplama ve Kampanya Yönetimi</li>
                </ul>
                <Link to="/login" className="inline-flex items-center gap-2 text-primary-600 font-bold hover:text-primary-700">
                  Arayüzü Kendin Test Et <ChevronRight size={20} />
                </Link>
              </div>
              <div className="relative">
                {/* Desktop Mockup */}
                <div className="w-full aspect-[4/3] bg-white rounded-3xl shadow-float border border-slate-100 relative z-10 flex flex-col overflow-hidden transform rotate-2 hover:rotate-0 transition-transform duration-500">
                  <div className="h-10 bg-slate-100 border-b border-slate-200 flex items-center px-4 gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-400"></div><div className="w-3 h-3 rounded-full bg-yellow-400"></div><div className="w-3 h-3 rounded-full bg-green-400"></div>
                  </div>
                  <div className="flex-1 bg-slate-50 p-4 flex gap-4">
                     <div className="w-1/4 bg-white rounded-xl shadow-sm border border-slate-100"></div>
                     <div className="flex-1 flex flex-col gap-4">
                        <div className="h-1/3 bg-white rounded-xl shadow-sm border border-slate-100 flex p-4 gap-4">
                           <div className="flex-1 bg-primary-50 rounded-lg"></div><div className="flex-1 bg-orange-50 rounded-lg"></div>
                        </div>
                        <div className="flex-1 bg-white rounded-xl shadow-sm border border-slate-100"></div>
                     </div>
                  </div>
                </div>
                {/* Mobile Mockup Overlay */}
                <div className="absolute -bottom-10 -left-10 w-48 h-96 bg-slate-900 rounded-[2.5rem] shadow-2xl border-8 border-slate-800 z-20 flex flex-col overflow-hidden transform -rotate-6 hover:rotate-0 transition-transform duration-500">
                   <div className="h-6 w-1/2 bg-slate-800 mx-auto rounded-b-xl absolute top-0 left-1/4"></div>
                   <div className="flex-1 bg-slate-50 mt-10 p-4">
                      <div className="h-24 bg-gradient-to-br from-primary-600 to-primary-800 rounded-2xl mb-4"></div>
                      <div className="h-16 bg-white rounded-xl shadow-sm mb-4"></div>
                      <div className="h-16 bg-white rounded-xl shadow-sm mb-4"></div>
                   </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 6. Testimonials */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-16">Yerel Esnaf Bizi Neden Seviyor?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { name: "Ahmet T.", brand: "HurCELL İletişim", text: "Veresiye defterim artık tamamen dijitalde. Kimin ne borcu var saniyesinde buluyorum. Harika bir uygulama." },
                { name: "Zeynep K.", brand: "Mahalle Cafe", text: "10 kahveye 1 bedava kampanyasıyla sadık müşterilerimiz arttı. Üstelik plastik kart derdi bitti, QR ile çözüyoruz." },
                { name: "Mehmet D.", brand: "Güven Market", text: "Müşterilerime SMS atarak indirimleri haber veriyorum. Sistem gerçekten çok temiz ve kolay çalışıyor." }
              ].map((t, i) => (
                <div key={i} className="bg-slate-50 p-8 rounded-3xl text-left">
                  <div className="flex items-center gap-2 text-yellow-400 mb-4">
                    ★★★★★
                  </div>
                  <p className="text-slate-600 italic mb-6 leading-relaxed">"{t.text}"</p>
                  <div>
                    <p className="font-bold text-slate-900">{t.name}</p>
                    <p className="text-sm text-slate-500">{t.brand}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 7. Pricing Section */}
        <section id="pricing" className="py-24 bg-slate-50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">Sade ve Şeffaf Fiyatlandırma</h2>
              <p className="text-lg text-slate-500">Küçük işletmelerden zincir şubelere kadar herkese uygun paketler.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {[
                { name: "Starter", price: "249", desc: "Küçük bakkallar ve tek şubeli işletmeler için.", feat: ["250 Müşteri", "Sınırsız Veresiye", "QR Kart Desteği", "Temel Destek"] },
                { name: "Growth", price: "499", pop: true, desc: "Büyümekte olan kafe ve perakendeciler için ideal.", feat: ["1000 Müşteri", "Gelişmiş Kampanyalar", "SMS Bildirimleri", "Öncelikli Destek"] },
                { name: "Pro", price: "999", desc: "Zincir işletmeler ve yüksek müşteri trafiği olanlar.", feat: ["Sınırsız Müşteri", "Sınırsız Şube", "Özel Entegrasyon API", "7/24 VIP Destek"] },
              ].map((p, i) => (
                <div key={i} className={`bg-white rounded-3xl p-8 border ${p.pop ? 'border-primary-500 shadow-premium relative transform md:-translate-y-4' : 'border-slate-100 shadow-card'}`}>
                  {p.pop && <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary-600 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider">En Popüler</div>}
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{p.name}</h3>
                  <p className="text-sm text-slate-500 mb-6 h-10">{p.desc}</p>
                  <div className="mb-8">
                    <span className="text-4xl font-extrabold text-slate-900">₺{p.price}</span>
                    <span className="text-slate-500">/ay</span>
                  </div>
                  <ul className="space-y-4 mb-8">
                    {p.feat.map((f, j) => (
                      <li key={j} className="flex items-center gap-3 text-slate-700 font-medium text-sm">
                        <CheckCircle2 size={18} className="text-primary-500" /> {f}
                      </li>
                    ))}
                  </ul>
                  <button className={`w-full py-3 rounded-xl font-bold transition-colors ${p.pop ? 'bg-primary-600 text-white hover:bg-primary-700' : 'bg-slate-100 text-slate-900 hover:bg-slate-200'}`}>
                    Hemen Başla
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 8. Waitlist / Form */}
        <section id="waitlist" className="py-24 bg-primary-600">
          <div className="max-w-4xl mx-auto px-6">
            <div className="bg-white rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col md:flex-row">
              <div className="md:w-1/2 p-12 bg-slate-900 text-white flex flex-col justify-center relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary-600/30 rounded-full blur-3xl -mr-20 -mt-20"></div>
                <h2 className="text-3xl font-extrabold mb-4 relative z-10">Erken Erişim Fırsatını Yakalayın</h2>
                <p className="text-slate-400 mb-8 relative z-10 leading-relaxed">
                  ClubPay henüz kapalı beta sürecindedir. İşletmenizi büyütmek için sıraya girin, sizi ilk arayanlardan olalım.
                </p>
                <div className="space-y-4 relative z-10">
                  <div className="flex items-center gap-3"><CheckCircle2 className="text-primary-500"/> İlk ay ücretsiz kullanım</div>
                  <div className="flex items-center gap-3"><CheckCircle2 className="text-primary-500"/> Ücretsiz kurulum desteği</div>
                </div>
              </div>
              <div className="md:w-1/2 p-12 bg-white">
                <form onSubmit={handleWaitlistSubmit} className="space-y-5">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Ad Soyad</label>
                    <input type="text" required value={formData.name} onChange={e=>setFormData({...formData, name: e.target.value})} className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none" placeholder="Ali Yılmaz" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">İşletme Adı</label>
                    <input type="text" required value={formData.company} onChange={e=>setFormData({...formData, company: e.target.value})} className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none" placeholder="Mahalle Bakkalı" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Telefon</label>
                    <input type="tel" required value={formData.phone} onChange={e=>setFormData({...formData, phone: e.target.value})} className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none" placeholder="0555..." />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">İşletme Türü</label>
                    <select value={formData.type} onChange={e=>setFormData({...formData, type: e.target.value})} className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none">
                      <option value="telefoncu">Telefoncu / Aksesuar</option>
                      <option value="cafe">Cafe / Restoran</option>
                      <option value="market">Market / Bakkal</option>
                      <option value="kuafor">Kuaför / Güzellik Salonu</option>
                      <option value="diger">Diğer</option>
                    </select>
                  </div>
                  <button type="submit" className="w-full py-4 bg-primary-600 text-white rounded-xl font-bold hover:bg-primary-700 transition-colors shadow-lg shadow-primary-600/30">
                    Başvurumu Gönder
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="bg-slate-900 py-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <Logo variant="light" />
          </div>
          <div className="text-slate-400 text-sm font-medium">
            &copy; {new Date().getFullYear()} ClubPay. Tüm hakları saklıdır.
          </div>
          <div className="flex gap-6 text-sm font-medium text-slate-400">
            <a href="#" className="hover:text-white transition-colors">Gizlilik</a>
            <a href="#" className="hover:text-white transition-colors">Şartlar</a>
            <a href="#" className="hover:text-white transition-colors">İletişim</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
