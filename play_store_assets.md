# ClubPay: Google Play Store Launch Checklist

Bu dosya, `.aab` paketi üretildikten sonra Google Play Console üzerinde yapılması gerekenleri adım adım açıklar.

## 1. Uygulama Bilgileri (Store Listing)

*   **Uygulama Adı:** ClubPay
*   **Kısa Açıklama:** Mahalle esnafı için sadakat, veresiye ve müşteri yönetimi.
*   **Tam Açıklama:** 
    ClubPay, yerel esnafların müşterilerini daha iyi tanımasını, sadakat puanı vermesini, veresiye işlemlerini takip etmesini ve müşterileriyle WhatsApp üzerinden kolayca iletişim kurmasını sağlayan modern bir müşteri ilişkileri (CRM) uygulamasıdır. 
    
    Özellikler:
    - 10 saniyenin altında satış kaydı (POS).
    - Dijital veresiye defteri ve hızlı tahsilat.
    - Müşteri davranış analizi ve kampanya önerileri.
    - Tek tıkla WhatsApp üzerinden iletişim.
    - Güvenli PWA altyapısı.
*   **Kategori:** İşletme (Business)
*   **İletişim E-postası:** destek@clubpay.tr
*   **Gizlilik Politikası URL:** https://clubpay.tr/privacy

## 2. Grafik Varlıklar (Gerekenler)

*   **Uygulama İkonu:** 512x512 px, PNG (Hazır)
*   **Öne Çıkan Grafik (Feature Graphic):** 1024x500 px, PNG
*   **Ekran Görüntüleri (Screenshots):** 
    - Landing Page (Giriş)
    - Esnaf Dashboard (Özet veriler)
    - Mini POS (Satış ekranı)
    - Müşteri QR Kartı
    - Müşteri Detay Paneli

## 3. Veri Güvenliği (Data Safety) Formu Önerileri

Google Play Console'daki "Veri Güvenliği" bölümü için şu yanıtları kullanın:

*   **Veri Toplanıyor mu?** Evet.
*   **Toplanan Veriler:**
    - **Kişisel Bilgiler:** İsim ve Telefon Numarası (Müşteri yönetimi için).
    - **Finansal Bilgiler:** Sadece uygulama içi veresiye kayıtları (Gerçek banka/kart bilgisi yok).
*   **Veri Paylaşılıyor mu?** Hayır (Üçüncü taraflarla reklam amaçlı paylaşım yok).
*   **Veri Şifreleme:** Veriler aktarılırken şifrelenir (HTTPS).
*   **Veri Silme:** Kullanıcılar verilerinin silinmesini talep edebilir.

## 4. Uygulama İçeriği (App Content)

*   **Reklamlar:** Uygulamada reklam bulunmamaktadır.
*   **Uygulama Erişimi:** Tüm işlevler giriş yapıldıktan sonra kullanılabilir. (İnceleme için bir test hesabı bilgisi verilmeli).
*   **Hedef Kitle:** 18 yaş ve üzeri.

## 5. Yayınlama Adımları

1.  **Google Play Console**'a giriş yapın.
2.  **Yeni Uygulama Oluştur** butonuna basın.
3.  **Üretim (Production)** kanalına gidin.
4.  `app-release-bundle.aab` dosyasını yükleyin.
5.  **İncelemeye Gönder** butonuna basın.
