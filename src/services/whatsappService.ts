export type WhatsAppTemplate = {
  id: string;
  title: string;
  message: (data: any) => string;
};

export const WHATSAPP_TEMPLATES: WhatsAppTemplate[] = [
  {
    id: 'credit_reminder',
    title: 'Nazik Hatırlatma',
    message: (data) => `Selamlar ${data.customerName}, ben ${data.merchantName}. Müsait olduğunda bir ara çayımızı içmeye bekleriz, bu arada güncel veresiye durumunu (₺${data.amount}) da hatırlatmak istedim. Selamlar! 🙂

*ClubPay Güven Ağı*`,
  },
  {
    id: 'payment_received',
    title: 'Tahsilat Teşekkür',
    message: (data) => `Merhaba ${data.customerName}, ₺${data.amount} tutarındaki ödemeni aldık, çok teşekkürler. Güncel bakiyen: ₺${data.remainingBalance}. İyi günler dilerim! 👍

*ClubPay Güven Ağı*`,
  },
  {
    id: 'thank_you',
    title: 'Puan Bildirimi',
    message: (data) => `Selam ${data.customerName}! Bugünkü alışverişinle tam ${data.points} yeni puan kazandın. Biriktirdiğin puanları bir sonraki gelişinde indirim olarak kullanabilirsin. Görüşmek üzere! 🎉

*ClubPay ile Kazanıyorsunuz*`,
  },
  {
    id: 'campaign',
    title: 'Özel Fırsat',
    message: (data) => `Merhaba ${data.customerName}, sana özel bir haberim var! ${data.merchantName}'de şu an "${data.campaignTitle}" fırsatımız başladı. Geldiğinde mutlaka hatırlat. Bekliyoruz! 🙂

*ClubPay Ayrıcalığı*`,
  },
  {
    id: 'loyal_customer',
    title: 'Sadık Müşteri Teşekkürü',
    message: (data) => `Değerli ${data.customerName}, bizi tercih ettiğin için çok teşekkürler. Seni mahallemizin sadık müşterisi olarak görmek bizi mutlu ediyor. Nice alışverişlere! 🤝

*ClubPay Sadakat Programı*`,
  },
  {
    id: 'birthday',
    title: 'Doğum Günü Kutlaması',
    message: (data) => `Nice mutlu senelere ${data.customerName}! Doğum günün kutlu olsun. Bugüne özel seni ${data.merchantName}'de küçük bir sürpriz bekliyor, uğramayı unutma! 🎂🥳

*ClubPay ile Nice Yıllara*`,
  }
];

export const generateWhatsAppLink = (phone: string, message: string) => {
  // Telefon numarasındaki boşlukları ve karakterleri temizle
  const cleanPhone = phone.replace(/\D/g, '');
  // Eğer numara 0 ile başlıyorsa 90 ekle (Türkiye için varsayılan)
  const formattedPhone = cleanPhone.startsWith('0') ? `90${cleanPhone.substring(1)}` : cleanPhone;
  
  return `https://wa.me/${formattedPhone}?text=${encodeURIComponent(message)}`;
};
