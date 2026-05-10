export type WhatsAppTemplate = {
  id: string;
  title: string;
  message: (data: any) => string;
};

export const WHATSAPP_TEMPLATES: WhatsAppTemplate[] = [
  {
    id: 'credit_reminder',
    title: 'Nazik Hatırlatma',
    message: (data) => `Selam ${data.customerName}, kolay gelsin. Müsait olduğunda bi çayımızı içmeye beklerim, gelmişken şu açık hesabı (₺${data.amount}) da kapatırız. Görüşmek üzere 🙂`,
  },
  {
    id: 'payment_received',
    title: 'Tahsilat Teşekkür',
    message: (data) => `Selam ${data.customerName}, ₺${data.amount} ödemeni hesaba geçtim, bereket versin. Kalan bakiye: ₺${data.remainingBalance}. Kolay gelsin 👍`,
  },
  {
    id: 'thank_you',
    title: 'Puan Bildirimi',
    message: (data) => `Selam ${data.customerName}! Bugünkü alışverişten ${data.points} puan hesabına yattı. Bir sonraki gelişinde indirim olarak düşeriz. Görüşmek üzere 🎉`,
  },
  {
    id: 'campaign',
    title: 'Özel Fırsat',
    message: (data) => `Selam ${data.customerName}, nasılsın? Bizim dükkanda "${data.campaignTitle}" fırsatı başladı, haberin olsun. Uğrarsan yardımcı olurum 🙂`,
  },
  {
    id: 'loyal_customer',
    title: 'Sadık Müşteri Teşekkürü',
    message: (data) => `Selam ${data.customerName}, bizim dükkanın gediklisi oldun 🙂 Bizi tercih ettiğin için sağ ol, her zaman bekleriz! 🤝`,
  },
  {
    id: 'repurchase_reminder',
    title: 'Ürün Hatırlatması',
    message: (data) => `Selam ${data.customerName}! Senin hep aldığın ${data.productName} stoklara girdi taze taze, aklında bulunsun. İhtiyacın olursa ayırırım. 🙂`,
  },
  {
    id: 'product_campaign',
    title: 'Ürüne Özel Fırsat',
    message: (data) => `Selam ${data.customerName}, daha önce aldığın ${data.productName} için küçük bi indirim ayarladım sana. Uğrarsan çayımız da hazır! 👍`,
  },
  {
    id: 'birthday',
    title: 'Doğum Günü Kutlaması',
    message: (data) => `Nice senelere ${data.customerName}! Doğum günün kutlu olsun. Bugüne özel bizde de ufak bi ikramın var, bekliyorum mutlaka! 🎂🥳`,
  }
];

export const generateWhatsAppLink = (phone: string, message: string) => {
  // Telefon numarasındaki boşlukları ve karakterleri temizle
  const cleanPhone = phone.replace(/\D/g, '');
  // Eğer numara 0 ile başlıyorsa 90 ekle (Türkiye için varsayılan)
  const formattedPhone = cleanPhone.startsWith('0') ? `90${cleanPhone.substring(1)}` : cleanPhone;
  
  return `https://wa.me/${formattedPhone}?text=${encodeURIComponent(message)}`;
};
