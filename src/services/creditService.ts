import { Transaction } from '../types';

export const creditService = {
  async addCreditSale(merchantId: string, customerId: string, amount: number, description: string) {
    // Supabase: credit_transactions'a kayıt at, customers.used_credit miktarını artır
    console.log('Veresiye satış eklendi:', { customerId, amount, description });
    return true;
  },

  async addPayment(merchantId: string, customerId: string, amount: number) {
    // Supabase: credit_transactions'a (payment tipi) kayıt at, customers.used_credit miktarını azalt
    console.log('Tahsilat girildi:', { customerId, amount });
    return true;
  },

  async updateCreditLimit(customerId: string, newLimit: number) {
    console.log('Limit güncellendi:', customerId, newLimit);
  }
};
