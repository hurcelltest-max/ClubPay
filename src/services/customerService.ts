import { Customer } from '../types';

export const customerService = {
  async getCustomersByMerchant(merchantId: string): Promise<Customer[]> {
    // Supabase query: supabase.from('customers').select('*').eq('merchant_id', merchantId)
    return [];
  },

  async addCustomer(merchantId: string, data: Partial<Customer>): Promise<Customer | null> {
    // Supabase insert: supabase.from('customers').insert({ ...data, merchant_id: merchantId })
    console.log('Müşteri eklendi:', data);
    return null; // Mock
  },

  async updateCustomer(customerId: string, data: Partial<Customer>) {
    // Supabase update
    console.log('Müşteri güncellendi:', customerId, data);
  }
};
