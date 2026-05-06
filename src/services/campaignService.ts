import { Campaign } from '../types';

export const campaignService = {
  async createCampaign(merchantId: string, data: Partial<Campaign>) {
    // Supabase insert campaigns
    console.log('Kampanya oluşturuldu:', data);
    return true;
  },

  async getCampaigns(merchantId: string) {
    return [];
  }
};
