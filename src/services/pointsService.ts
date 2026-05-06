export const pointsService = {
  async addPoints(merchantId: string, customerId: string, amountSpent: number, rate: number) {
    // Supabase: calculate points = (amountSpent / 100) * rate
    // insert to points_transactions, update customers.total_points
    const points = Math.floor((amountSpent / 100) * rate);
    console.log(`${points} puan eklendi`);
    return points;
  },

  async spendPoints(merchantId: string, customerId: string, points: number) {
    console.log(`${points} puan harcandı`);
  }
};
