# ClubPay (SaaS & Mahalle Esnafı Sadakat Platformu)

Bu proje, mahalle esnafını karmaşık ERP ve stok yazılımlarının yükünden kurtararak, basit, hızlı ve etkili bir müşteri ilişkileri (CRM) ve veresiye yönetim sistemine kavuşturmak amacıyla geliştirilmiştir.

## Mimarisi ve Routing (Multi-Tenant)

Sistem artık dinamik alt-rota (slug) tabanlı bir multi-tenant yapısında çalışmaktadır.

- **Ana Domain (Landing Page):** `https://clubpay.tr/` 
  Sadece ana SaaS tanıtım sayfasıdır. Müşteri girişi veya esnaf paneline geçiş buradan yönetilir.
- **Müşteri Projeleri (Tenant):** `https://clubpay.tr/:merchantSlug`
  Örneğin `https://clubpay.tr/jum-burger` veya `https://clubpay.tr/hurcell` gibi linkler ile her esnafın kendi sadakat uygulamasına erişilebilir.
- **Esnaf Paneli:** `https://clubpay.tr/merchant`
  Tüm esnafların girdiği, 10 saniyenin altında veresiye satış ekleyebildiği ve "Sessiz Müşteri" gibi yapay zeka öngörülerine ulaştığı "Canlı Dashboard".

## Özellikler

1. **Hızlı Mini POS:** Veresiye veya peşin satışları saniyeler içinde kaydetme, devasa tıklanabilir mobil CTA'lar.
2. **Akıllı Müşteri Asistanı (Davranış Motoru):** Müşterilerin satın alma alışkanlıklarını analiz edip "37 gündür uğramadı", "Tekrar Satın Alma Yaklaştı", "Kampanyalara İlgi Gösteriyor" gibi içgörüler sunar.
3. **Müşteri Detay Paneli (Slide-over):** Müşterinin alışveriş geçmişini, favori ürünlerini, WhatsApp geçmişini ve ödeme alışkanlıklarını "insani" bir dille gösterir.
4. **Esnaf WhatsApp Ağı:** WhatsApp Business API karmaşasına girmeden `wa.me` deep-link üzerinden kişiselleştirilmiş (ve okunma simülasyonlu) sıcak esnaf mesajları gönderir.

## Deployment (Vercel)

Proje Vercel üzerinde host edilmektedir.
1. `npm run build` ile TypeScript derlemesi kontrol edilir.
2. Her `main` branch push'unda Vercel otomatik olarak CI/CD sürecini çalıştırır.
3. React Router (SPA) kaynaklı Vercel 404 hatalarını önlemek için projedeki `vercel.json` rewrite kuralları devrededir.

## Geliştirme Ortamı Kurulumu

```bash
npm install
npm run dev
```
