export const MOCK_USER = {
  id: 'u1',
  name: 'Ahmet Yılmaz',
  points: 1450,
  creditLimit: 5000,
  usedCredit: 1250,
  riskLevel: 'Silver',
  qrCode: 'QR-AHMET-123',
};

export const MOCK_CAMPAIGNS = [
  { id: 1, title: '%10 İndirim', description: 'Tüm aksesuarlarda %10 indirim', points: 500 },
  { id: 2, title: 'Ücretsiz Ekran Koruyucu', description: '2000 puan karşılığında ücretsiz', points: 2000 },
];

export const MOCK_TRANSACTIONS = [
  { id: 1, date: '2026-05-01', amount: 350, type: 'veresiye', store: 'HurCELL' },
  { id: 2, date: '2026-05-03', amount: 900, type: 'veresiye', store: 'HurCELL' },
  { id: 3, date: '2026-05-05', amount: -500, type: 'odeme', store: 'HurCELL' },
];

export const MOCK_CUSTOMERS = [
  { id: 'c1', name: 'Ahmet Yılmaz', phone: '0532 123 4567', points: 1450, debt: 1250, limit: 5000, risk: 'Silver' },
  { id: 'c2', name: 'Ayşe Demir', phone: '0533 987 6543', points: 300, debt: 0, limit: 2000, risk: 'Gold' },
  { id: 'c3', name: 'Mehmet Kaya', phone: '0555 555 5555', points: 0, debt: 4500, limit: 5000, risk: 'Bronze' },
];
