const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Veritabanı temizleniyor...');
  await prisma.order.deleteMany();
  await prisma.creditTransaction.deleteMany();
  await prisma.pointsTransaction.deleteMany();
  await prisma.campaign.deleteMany();
  await prisma.customer.deleteMany();
  await prisma.merchant.deleteMany();
  await prisma.user.deleteMany();

  console.log('Mock veriler ekleniyor...');

  // Esnaf Kullanıcısı
  const merchantUser = await prisma.user.create({
    data: {
      role: 'MERCHANT',
      name: 'Ahmet Bakkal',
      phone: '5551234567',
      email: 'ahmet@bakkal.com',
      passwordHash: 'mockhash123',
    },
  });

  // Esnaf Profili
  const merchant = await prisma.merchant.create({
    data: {
      userId: merchantUser.id,
      storeName: 'Ahmet Bakkaliyesi',
      slug: 'ahmet-bakkal',
      address: 'Örnek Mah. Cumhuriyet Cad. No:1',
      subscriptionStatus: 'ACTIVE',
    },
  });

  // Müşteri Kullanıcıları
  const customerUser1 = await prisma.user.create({
    data: {
      role: 'CUSTOMER',
      name: 'Ayşe Yılmaz',
      phone: '5559876543',
    },
  });

  const customerUser2 = await prisma.user.create({
    data: {
      role: 'CUSTOMER',
      name: 'Mehmet Demir',
      phone: '5554567890',
    },
  });

  // Müşteri Profilleri (Bu Esnafa Bağlı)
  const customer1 = await prisma.customer.create({
    data: {
      userId: customerUser1.id,
      merchantId: merchant.id,
      name: 'Ayşe Yılmaz',
      phone: '5559876543',
      totalPoints: 150,
      creditLimit: 1000,
      usedCredit: 250,
      riskLevel: 'BRONZE',
      loyaltyLevel: 'SILVER',
    },
  });

  const customer2 = await prisma.customer.create({
    data: {
      userId: customerUser2.id,
      merchantId: merchant.id,
      name: 'Mehmet Demir',
      phone: '5554567890',
      totalPoints: 0,
      creditLimit: 500,
      usedCredit: 450,
      riskLevel: 'GOLD', // Riskli, limite yakın
      loyaltyLevel: 'STANDARD',
    },
  });

  // Veresiye İşlemleri
  await prisma.creditTransaction.create({
    data: {
      customerId: customer1.id,
      amount: 250,
      type: 'DEBT',
      status: 'PENDING',
    },
  });

  await prisma.creditTransaction.create({
    data: {
      customerId: customer2.id,
      amount: 450,
      type: 'DEBT',
      status: 'OVERDUE',
      dueDate: new Date(new Date().setDate(new Date().getDate() - 5)), // 5 gün geçmiş
    },
  });

  // Kampanyalar
  await prisma.campaign.create({
    data: {
      merchantId: merchant.id,
      title: 'Hafta Sonu İndirimi',
      description: 'Tüm atıştırmalıklarda %10 indirim',
      discountType: 'PERCENTAGE',
      discountValue: 10,
    },
  });

  console.log('Mock veriler başarıyla eklendi!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
