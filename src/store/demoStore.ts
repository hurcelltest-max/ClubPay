import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import toast from 'react-hot-toast';

export type DemoUser = {
  id: string;
  name: string;
  role: 'customer' | 'merchant' | 'admin';
  phone?: string;
  points: number;
  creditLimit: number;
  usedCredit: number;
  riskLevel: 'Bronz' | 'Gümüş' | 'Altın';
  qrCode: string;
  // Shared Network Layer
  clubScore: number;
  trustLevel: 'Güvenilir' | 'Düzenli' | 'Orta Risk' | 'Dikkatli';
  networkOptIn: boolean;
  totalTransactionsCount: number;
  lastWhatsAppDate?: string;
};

export type Transaction = {
  id: string;
  customerId: string;
  date: string;
  amount: number;
  type: 'peşin' | 'veresiye' | 'tahsilat' | 'puan_kullanımı';
  description: string;
  dueDate?: string;
};

export type Campaign = {
  id: string;
  title: string;
  description: string;
  discountValue: number;
  status: 'aktif' | 'pasif';
};

interface DemoState {
  user: DemoUser | null;
  customers: DemoUser[];
  transactions: Transaction[];
  campaigns: Campaign[];
  
  // Actions
  login: (role: 'customer' | 'merchant' | 'admin') => void;
  logout: () => void;
  resetDemo: () => void;
  toggleNetworkOptIn: () => void;
  markWhatsAppSent: (customerId: string) => void;
  addSale: (customerId: string, amount: number, type: 'peşin' | 'veresiye' | 'puan_kullanımı', description: string, pointsToUse?: number, dueDate?: string) => void;
  addPayment: (customerId: string, amount: number) => void;
  addCampaign: (campaign: Omit<Campaign, 'id' | 'status'>) => void;
  addCustomer: (customer: Omit<DemoUser, 'id' | 'qrCode' | 'role' | 'usedCredit' | 'points' | 'riskLevel' | 'clubScore' | 'trustLevel' | 'networkOptIn' | 'totalTransactionsCount'>) => void;
}

const INITIAL_CUSTOMERS: DemoUser[] = [
  { 
    id: 'c1', name: 'Ahmet Yılmaz', role: 'customer', phone: '0532 111 22 33', points: 1450, usedCredit: 850, creditLimit: 5000, riskLevel: 'Gümüş', qrCode: 'CP-1001-A',
    clubScore: 88, trustLevel: 'Güvenilir', networkOptIn: true, totalTransactionsCount: 124
  },
  { 
    id: 'c2', name: 'Ayşe Demir', role: 'customer', phone: '0533 222 33 44', points: 300, usedCredit: 0, creditLimit: 2000, riskLevel: 'Altın', qrCode: 'CP-1002-B',
    clubScore: 95, trustLevel: 'Güvenilir', networkOptIn: true, totalTransactionsCount: 56
  },
  { 
    id: 'c3', name: 'Mehmet Kaya', role: 'customer', phone: '0555 333 44 55', points: 0, usedCredit: 4200, creditLimit: 5000, riskLevel: 'Bronz', qrCode: 'CP-1003-C',
    clubScore: 42, trustLevel: 'Dikkatli', networkOptIn: false, totalTransactionsCount: 210
  },
  { 
    id: 'c4', name: 'Zeynep Arslan', role: 'customer', phone: '0544 444 55 66', points: 2500, usedCredit: 150, creditLimit: 10000, riskLevel: 'Altın', qrCode: 'CP-1004-D',
    clubScore: 92, trustLevel: 'Güvenilir', networkOptIn: true, totalTransactionsCount: 89
  },
  { 
    id: 'c5', name: 'Caner Özcan', role: 'customer', phone: '0505 555 66 77', points: 85, usedCredit: 1250, creditLimit: 3000, riskLevel: 'Gümüş', qrCode: 'CP-1005-E',
    clubScore: 68, trustLevel: 'Orta Risk', networkOptIn: true, totalTransactionsCount: 45
  },
];

const INITIAL_CAMPAIGNS: Campaign[] = [
  { id: 'camp1', title: 'Hoş Geldin İndirimi', description: 'İlk 500 TL üzeri alışverişe anında %10 indirim', discountValue: 10, status: 'aktif' },
  { id: 'camp2', title: 'Sadık Müşteri Bonusu', description: '1000 TL üzeri harcamalarda 100 bonus puan hediye', discountValue: 100, status: 'aktif' },
  { id: 'camp3', title: 'Hafta Sonu Kampanyası', description: 'Tüm aksesuar grubunda %15 indirim fırsatı', discountValue: 15, status: 'aktif' },
  { id: 'camp4', title: 'Erken Ödeme İndirimi', description: 'Veresiye borcunu 15 günden önce ödeyenlere özel puan', discountValue: 50, status: 'aktif' }
];

const INITIAL_TRANSACTIONS: Transaction[] = [
  { id: 't1', customerId: 'c1', date: new Date().toISOString(), amount: 350, type: 'veresiye', description: 'Hızlı Şarj Adaptörü ve Kablo', dueDate: new Date(Date.now() + 864000000).toISOString() },
  { id: 't2', customerId: 'c1', date: new Date(Date.now() - 86400000).toISOString(), amount: -500, type: 'tahsilat', description: 'Kısmi Nakit Ödeme' },
  { id: 't3', customerId: 'c4', date: new Date(Date.now() - 172800000).toISOString(), amount: 1200, type: 'peşin', description: 'Bluetooth Kulaklık (JBL)' },
  { id: 't4', customerId: 'c3', date: new Date(Date.now() - 259200000).toISOString(), amount: 2500, type: 'veresiye', description: 'Ekran Değişimi - iPhone 11', dueDate: new Date(Date.now() + 432000000).toISOString() },
  { id: 't5', customerId: 'c5', date: new Date(Date.now() - 345600000).toISOString(), amount: 150, type: 'veresiye', description: 'Nano Cam Koruyucu', dueDate: new Date(Date.now() + 259200000).toISOString() },
  { id: 't6', customerId: 'c2', date: new Date(Date.now() - 432000000).toISOString(), amount: 450, type: 'peşin', description: 'Powerbank 10.000 mAh' },
];

export const useDemoStore = create<DemoState>()(
  persist(
    (set, get) => ({
      user: null,
      customers: INITIAL_CUSTOMERS,
      transactions: INITIAL_TRANSACTIONS,
      campaigns: INITIAL_CAMPAIGNS,

      login: (role) => {
        if (role === 'customer') {
          set({ user: get().customers[0] }); // Ahmet Yılmaz
          toast.success('Müşteri girişi yapıldı. Hoş geldin Ahmet!');
        } else if (role === 'merchant') {
          set({ user: { 
            id: 'm1', name: 'HurCELL İletişim', role: 'merchant', points: 0, creditLimit: 0, usedCredit: 0, riskLevel: 'Altın', qrCode: '',
            clubScore: 0, trustLevel: 'Güvenilir', networkOptIn: false, totalTransactionsCount: 0
          } });
          toast.success('İşletme paneli açıldı. İyi mesailer!');
        } else {
          set({ user: { 
            id: 'a1', name: 'ClubPay Yönetim', role: 'admin', points: 0, creditLimit: 0, usedCredit: 0, riskLevel: 'Altın', qrCode: '',
            clubScore: 0, trustLevel: 'Güvenilir', networkOptIn: false, totalTransactionsCount: 0
          } });
          toast.success('Sistem yöneticisi girişi başarılı.');
        }
      },

      logout: () => {
        set({ user: null });
        toast('Güle güle, tekrar görüşmek üzere!', { icon: '👋' });
      },

      toggleNetworkOptIn: () => {
        const { user } = get();
        if (user && user.role === 'customer') {
          const newStatus = !user.networkOptIn;
          set({ user: { ...user, networkOptIn: newStatus } });
          if (newStatus) {
            toast.success('ClubPay ağına katıldınız! Profiliniz diğer esnaflar tarafından güven analizi için görülebilir.', { icon: '🌐' });
          } else {
            toast('Ağ görünürlüğü kapatıldı. Profiliniz artık sadece işlem yaptığınız esnaflar tarafından görülebilir.', { icon: '🔒' });
          }
        }
      },

      markWhatsAppSent: (customerId) => {
        set((state) => ({
          customers: state.customers.map(c => 
            c.id === customerId ? { ...c, lastWhatsAppDate: new Date().toISOString() } : c
          )
        }));
      },

      resetDemo: () => {
        set({
          user: null,
          customers: INITIAL_CUSTOMERS,
          transactions: INITIAL_TRANSACTIONS,
          campaigns: INITIAL_CAMPAIGNS
        });
        toast.success('Demo verileri tertemiz hale getirildi!');
      },

      addSale: (customerId, amount, type, description, pointsToUse = 0, dueDate) => {
        set((state) => {
          const customerIndex = state.customers.findIndex(c => c.id === customerId);
          if (customerIndex === -1) {
            toast.error('Müşteri bulunamadı!');
            return state;
          }

          const updatedCustomers = [...state.customers];
          const customer = { ...updatedCustomers[customerIndex] };
          
          let earnedPoints = 0;

          if (type === 'peşin') {
             earnedPoints = Math.floor(amount / 10);
             customer.points += earnedPoints;
             toast.success(`Satış kaydedildi! Müşteri ${earnedPoints} puan kazandı.`, { 
               style: { borderRadius: '12px', background: '#333', color: '#fff' }
             });
          } else if (type === 'veresiye') {
             if (customer.creditLimit - customer.usedCredit < amount) {
                toast.error('Müşterinin kalan limiti yetersiz!');
                return state;
             }
             customer.usedCredit += amount;
             toast.success(`Veresiye satış kaydedildi! Kalan limit: ₺${(customer.creditLimit - customer.usedCredit).toLocaleString()}`, { icon: '📝' });
          } else if (type === 'puan_kullanımı') {
             if (customer.points < pointsToUse) {
                toast.error('Müşterinin bu kadar puanı bulunmuyor.');
                return state;
             }
             customer.points -= pointsToUse;
             toast.success(`${pointsToUse} puan kullanılarak indirim uygulandı.`, { icon: '✨' });
          }

          updatedCustomers[customerIndex] = customer;

          const newTransaction: Transaction = {
            id: Math.random().toString(36).substring(7),
            customerId,
            date: new Date().toISOString(),
            amount,
            type,
            description,
            dueDate
          };

          return {
            customers: updatedCustomers,
            transactions: [newTransaction, ...state.transactions]
          };
        });
      },

      addPayment: (customerId, amount) => {
        set((state) => {
          const customerIndex = state.customers.findIndex(c => c.id === customerId);
          if (customerIndex === -1) return state;

          const updatedCustomers = [...state.customers];
          const customer = { ...updatedCustomers[customerIndex] };

          customer.usedCredit = Math.max(0, customer.usedCredit - amount);
          updatedCustomers[customerIndex] = customer;

          const newTransaction: Transaction = {
            id: Math.random().toString(36).substring(7),
            customerId,
            date: new Date().toISOString(),
            amount: -amount,
            type: 'tahsilat',
            description: 'Tahsilat / Ödeme'
          };

          toast.success(`Tahsilat işlendi. Güncel borç: ₺${customer.usedCredit.toLocaleString()}`, { 
            icon: '💰',
            style: { border: '2px solid #10b981' }
          });

          return {
            customers: updatedCustomers,
            transactions: [newTransaction, ...state.transactions]
          };
        });
      },

      addCampaign: (campaignData) => {
        set((state) => {
          const newCampaign: Campaign = {
            ...campaignData,
            id: Math.random().toString(36).substring(7),
            status: 'aktif'
          };
          toast.success('Kampanya yayına alındı! Tüm müşterilere bildirim gönderildi.', { icon: '📢' });
          return { campaigns: [newCampaign, ...state.campaigns] };
        });
      },

      addCustomer: (customerData) => {
        set((state) => {
          const newCustomer: DemoUser = {
            ...customerData,
            id: Math.random().toString(36).substring(7),
            qrCode: `CP-${1000 + state.customers.length + 1}-${customerData.name.substring(0,1).toUpperCase()}`,
            role: 'customer',
            points: 0,
            usedCredit: 0,
            riskLevel: 'Gümüş',
            creditLimit: 2500,
            clubScore: 50,
            trustLevel: 'Düzenli',
            networkOptIn: false,
            totalTransactionsCount: 0
          };
          toast.success(`${customerData.name} dijital kartıyla birlikte sisteme kaydedildi.`, { icon: '🤝' });
          return { customers: [...state.customers, newCustomer] };
        });
      }
    }),
    {
      name: 'clubpay-demo-storage',
    }
  )
);
