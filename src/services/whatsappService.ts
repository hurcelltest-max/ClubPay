export type WhatsAppTemplate = {
  id: string;
  title: string;
  message: (data: any) => string;
};

export const WHATSAPP_TEMPLATES: WhatsAppTemplate[] = [
  {
    id: 'credit_reminder',
    title: 'Veresiye Hatırlatma',
    message: (data) => `Selamlar ${data.customerName}, ben ${data.merchantName}. 
Müsait olduğunda güncel veresiye borcun olan ₺${data.amount} için bir ödeme yapabilir misin? İyi çalışmalar!`,
  },
  {
    id: 'thank_you',
    title: 'Teşekkür Mesajı',
    message: (data) => `Merhaba ${data.customerName}, bugünkü alışverişin için teşekkür ederiz! 
ClubPay üzerinden ${data.points} yeni puan kazandın. Tekrar görüşmek üzere!`,
  },
  {
    id: 'campaign',
    title: 'Kampanya Bildirimi',
    message: (data) => `Selam ${data.customerName}! ${data.merchantName}'de sana özel bir kampanya var: ${data.campaignTitle}. 
Bekleriz!`,
  },
  {
    id: 'payment_received',
    title: 'Tahsilat Teşekkür',
    message: (data) => `Merhaba ${data.customerName}, ₺${data.amount} tutarındaki ödemen için teşekkür ederiz. 
Güncel borç bakiyen: ₺${data.remainingBalance}. İyi günler!`,
  },
  {
    id: 'birthday',
    title: 'Doğum Günü Kutlaması',
    message: (data) => `Nice senelere ${data.customerName}! Doğum günün kutlu olsun. 
Bugüne özel ${data.merchantName}'de seni bir sürpriz bekliyor! 🎂`,
  }
];

export const generateWhatsAppLink = (phone: string, message: string) => {
  // Telefon numarasındaki boşlukları ve karakterleri temizle
  const cleanPhone = phone.replace(/\D/g, '');
  // Eğer numara 0 ile başlıyorsa 90 ekle (Türkiye için varsayılan)
  const formattedPhone = cleanPhone.startsWith('0') ? `90${cleanPhone.substring(1)}` : cleanPhone;
  
  return `https://wa.me/${formattedPhone}?text=${encodeURIComponent(message)}`;
};
