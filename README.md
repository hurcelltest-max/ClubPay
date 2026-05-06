# ClubPay SaaS Platform

ClubPay, yerel esnaflar için tasarlanmış modern bir **Sadakat, Veresiye ve Müşteri CRM** platformudur. Vercel, Supabase ve PWA standartları düşünülerek üretime (production) hazır hale getirilmiştir.

## 🚀 Proje Kurulumu

Gereksinimler: Node.js (v18+)

```bash
# Bağımlılıkları yükleyin
npm install

# Geliştirme sunucusunu başlatın
npm run dev
```

Uygulama `http://localhost:5173/` adresinde çalışacaktır.

## 🛠 Çevre Değişkenleri (Environment Setup)

Projeyi gerçek bir backend (Supabase) ile bağlamak için kök dizindeki `.env.example` dosyasını kopyalayıp `.env` adıyla kaydedin ve bilgilerinizi doldurun:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_APP_ENV=production
```
> Demo modunda çalışmak için `VITE_APP_ENV=demo` bırakabilirsiniz. Sistem şu an Zustand mock datasıyla local olarak çalışmaktadır.

## 📦 Build Alma & Vercel Deploy

ClubPay, Vite ile geliştirildiği için Vercel veya Netlify gibi SPA (Single Page Application) sunucularında kolayca deploy edilebilir.
Vercel'da yönlendirme (routing) sorunlarını önlemek için kök dizinde `vercel.json` dosyası eklenmiştir.

```bash
# Production build alınması
npm run build
```

**Vercel Üzerinde Yayınlama:**
1. Projeyi GitHub reponuza pushlayın.
2. Vercel dashboard'da "Add New Project" seçin.
3. Framework Preset: **Vite**
4. Root Directory: `./`
5. `Environment Variables` kısmına `.env` içeriğinizi ekleyin.
6. **Deploy** butonuna basın.

## 🧬 Proje Mimarisi

- **Müşteri App (PWA):** `/customer` - Mobil öncelikli, QR kart ve cüzdan.
- **Esnaf Paneli (Merchant):** `/merchant` - Veresiye takibi, satış ve CRM.
- **Platform Yöneticisi (Admin):** `/admin` - MRR, Growth trendleri ve esnaf yönetimi.

## 📖 Pilot Kullanım Rehberi (Pilot Deployment Guide)

ClubPay'i gerçek sahada test etmek için aşağıdaki adımları izleyin:

### 1. Esnaf Onboarding (Kurulum)
- Esnaf, `clubpay.tr/login` üzerinden "Esnaf" rolüyle sisteme girer.
- "Ayarlar" kısmından işletme adını, sektörünü ve sadakat puan oranını (varsayılan %10) belirler.
- Mağaza kasasına sistemdeki "Hızlı Satış" sayfasını bir tablet veya telefon üzerinden sabitlemesi önerilir.

### 2. Müşteri Kaydı ve QR Dağıtımı
- Mağazaya gelen yeni bir müşteri için "Müşteriler > Yeni Müşteri" butonuna basılır.
- Müşterinin adı ve telefonu kaydedildiğinde sistem otomatik bir **QR Kimlik** atar.
- Müşteri, kendi telefonundan `clubpay.tr` adresine girip telefon numarasıyla login olduğunda kendi QR kartını anında görür.

### 3. İlk İşlem (Satış & Puan)
- Satış ekranında müşteri seçilir, tutar girilir ve "Satışı Onayla" denir.
- Müşteriye anında sadakat puanı yüklenir ve cüzdanına yansır.
- Eğer veresiye (borç) işlemi yapılacaksa "Ödeme Tipi" olarak **Veresiye** seçilir. Bu işlem müşterinin limitinden düşer ve borç defterine kaydedilir.

### 4. Tahsilat Süreci
- Müşteri borcunu ödemeye geldiğinde "Tahsilat Gir" sekmesinden müşteri seçilir ve ödenen miktar düşülür.
- Tüm geçmiş "İşlem Geçmişi" tablosundan hem esnaf hem müşteri tarafından şeffafça takip edilebilir.

---

## 🚀 Performans & Güvenlik

- **Lazy Loading & Suspense:** Modüller (Customer, Admin, Merchant) sadece ihtiyaç duyulduğunda yüklenir.
- **Güvenlik Başlıkları:** `vercel.json` ile `X-Frame-Options` ve `X-XSS-Protection` kuralları aktiftir.
- **Mobil UX:** Tüm dokunma alanları 44x44px standardına uygun, Safe-Area paddingleri tanımlıdır.

## 🛡️ Vizyon

ClubPay, yerel ticaretin en büyük sorunu olan "güven ve sadakat" köprüsünü dijitalleştirerek esnafın büyük zincir marketlere karşı rekabet gücünü artırmayı hedefler.
