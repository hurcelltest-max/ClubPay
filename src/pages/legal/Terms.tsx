import React from 'react';

export default function Terms() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16 font-sans text-slate-700 leading-relaxed">
      <h1 className="text-4xl font-black text-slate-900 mb-8 tracking-tight">Kullanım Koşulları</h1>
      <p className="text-sm text-slate-500 mb-8 italic">Son Güncelleme: 10 Mayıs 2026</p>

      <section className="mb-10">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">1. Hizmet Tanımı</h2>
        <p>
          ClubPay, esnafların müşteri sadakatini yönetmesini sağlayan bir yazılım hizmetidir (SaaS). 
          Uygulama üzerinden yapılan işlemlerin doğruluğundan esnaf ve müşteri sorumludur.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">2. Veresiye ve Borç Yönetimi</h2>
        <p>
          ClubPay bir ödeme kuruluşu veya banka değildir. Uygulama içerisindeki veresiye kayıtları sadece esnaf ve müşteri arasındaki mutabakatı kolaylaştırmak içindir. 
          Yaşanabilecek maddi anlaşmazlıklarda ClubPay taraf değildir.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">3. Kullanıcı Sorumlulukları</h2>
        <p>
          - Esnaflar, müşteri telefon numaralarını KVKK kurallarına uygun şekilde sisteme kaydetmekle yükümlüdür.<br/>
          - Müşteriler, QR kodlarını üçüncü şahıslarla paylaşmamalıdır.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">4. WhatsApp Kullanımı</h2>
        <p>
          Uygulama üzerinden başlatılan mesajlaşmalar WhatsApp'ın kendi kullanım koşullarına tabidir. 
          Spam niteliği taşıyan toplu mesaj gönderimlerinden doğacak kısıtlamalardan ClubPay sorumlu tutulamaz.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">5. Fesih</h2>
        <p>
          ClubPay, kullanım koşullarına aykırı hareket eden veya sistemi suistimal eden kullanıcıların hesaplarını askıya alma hakkını saklı tutar.
        </p>
      </section>

      <div className="mt-12 pt-8 border-t border-slate-100 text-center">
        <p className="text-slate-400 text-sm">© 2026 ClubPay | Esnafın Müşteri Hafızası</p>
      </div>
    </div>
  );
}
