import { Role } from '../types';

export const authService = {
  async login(email: string, password: string): Promise<{ role: Role; redirectUrl: string } | null> {
    // Gerçekte Supabase signInWithPassword kullanılacak
    console.log(`Login isteği atıldı: ${email}`);
    
    // Mock Response
    if (email.includes('admin')) return { role: 'super_admin', redirectUrl: '/super-admin-hidden' };
    if (email.includes('merchant')) return { role: 'merchant_admin', redirectUrl: '/merchant' };
    return { role: 'customer', redirectUrl: '/customer' };
  },

  async logout() {
    // Supabase signOut
    console.log("Çıkış yapıldı.");
  },
  
  async getCurrentUser() {
    // Supabase auth.getUser()
    return { id: 'mock-id', role: 'merchant_admin' as Role };
  }
};
