import React from 'react';

export default function Privacy() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16 font-sans text-slate-700 leading-relaxed">
      <h1 className="text-4xl font-black text-slate-900 mb-8 tracking-tight">Gizlilik Politikası</h1>
      <p className="text-sm text-slate-500 mb-8 italic">Son Güncelleme: 10 Mayıs 2026</p>

      <section className="mb-10">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">1. Giriş</h2>
        <p>
          ClubPay ("biz", "uygulama"), mahalle esnafı ve müşterileri arasındaki güvene dayalı ilişkiyi dijitalleştiren bir platformdur. 
          Gizliliğiniz bizim için en öncelikli konudur. Bu metin, verilerinizin nasıl işlendiğini açıklar.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">2. Toplanan Veriler</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Müşteri Bilgileri:</strong> İsim, soyisim ve telefon numarası (WhatsApp iletişimi için).</li>
          <li><strong>Esnaf Bilgileri:</strong> İşletme adı, kategori ve iletişim bilgileri.</li>
          <li><strong>İşlem Verileri:</strong> Satış tutarları, puan kazanımları ve veresiye bakiyeleri.</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">3. Verilerin Kullanımı</h2>
        <p>
          Toplanan veriler sadece şu amaçlarla kullanılır:
        </p>
        <ul className="list-disc pl-6 space-y-2 mt-2">
          <li>Müşteri sadakat puanlarının hesaplanması.</li>
          <li>Veresiye borç ve alacak takibinin yapılması.</li>
          <li>Esnafın müşterisine WhatsApp üzerinden bilgilendirme mesajı gönderebilmesi.</li>
        </ul>
      </section>

      <section className="mb-10 bg-emerald-50 p-6 rounded-2xl border border-emerald-100">
        <h2 className="text-2xl font-bold text-emerald-900 mb-4">4. Güven Skor Paylaşımı (Önemli)</h2>
        <p className="text-emerald-800">
          ClubPay, "Esnaf Güven Ağı" kapsamında müşterilerin genel ödeme alışkanlıklarını (Güven Skoru) esnaflar arasında paylaşabilir. 
          <strong> Ancak, bir müşterinin hangi dükkana ne kadar borcu olduğu veya borç detayları asla üçüncü taraf işletmelerle paylaşılmaz.</strong>
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">5. WhatsApp İletişimi</h2>
        <p>
          Uygulama üzerinden gönderilen WhatsApp mesajları, esnafın kendi cihazı ve WhatsApp hesabı üzerinden, cihazın işletim sistemi aracılığıyla (wa.me linkleri) gerçekleşir. 
          ClubPay, mesaj içeriklerini kendi sunucularında depolamaz.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">6. Veri Silme Talebi</h2>
        <p>
          Kullanıcılar, verilerinin silinmesini talep etme hakkına sahiptir. Taleplerinizi <strong>destek@clubpay.tr</strong> adresine iletebilirsiniz.
        </p>
      </section>

      <div className="mt-12 pt-8 border-t border-slate-100 text-center">
        <p className="text-slate-400 text-sm">© 2026 ClubPay | Esnafın Müşteri Hafızası</p>
      </div>
    </div>
  );
}
