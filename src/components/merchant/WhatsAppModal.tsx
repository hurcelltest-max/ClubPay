import React, { useState } from 'react';
import { X, MessageSquare, Send, Copy, ExternalLink, Phone, User, Clock, CheckCheck } from 'lucide-react';
import { WHATSAPP_TEMPLATES, generateWhatsAppLink } from '../../services/whatsappService';
import { useDemoStore } from '../../store/demoStore';

interface WhatsAppModalProps {
  isOpen: boolean;
  onClose: () => void;
  customer: {
    id: string;
    name: string;
    phone: string;
    usedCredit: number;
    points: number;
    lastWhatsAppDate?: string;
  };
}

export default function WhatsAppModal({ isOpen, onClose, customer }: WhatsAppModalProps) {
  const { user, markWhatsAppSent } = useDemoStore();
  const [selectedTemplate, setSelectedTemplate] = useState(WHATSAPP_TEMPLATES[0]);
  const [editedMessage, setEditedMessage] = useState(
    WHATSAPP_TEMPLATES[0].message({
      customerName: customer.name,
      merchantName: user?.name || 'Esnafımız',
      amount: customer.usedCredit,
      points: 25,
      remainingBalance: 0,
      campaignTitle: 'Hafta Sonu Fırsatı'
    })
  );

  if (!isOpen) return null;

  const isSentToday = customer.lastWhatsAppDate && 
    new Date(customer.lastWhatsAppDate).toDateString() === new Date().toDateString();

  const handleTemplateChange = (templateId: string) => {
    const template = WHATSAPP_TEMPLATES.find(t => t.id === templateId) || WHATSAPP_TEMPLATES[0];
    setSelectedTemplate(template);
    setEditedMessage(
      template.message({
        customerName: customer.name,
        merchantName: user?.name || 'Esnafımız',
        amount: customer.usedCredit,
        points: 25,
        remainingBalance: 0,
        campaignTitle: 'Hafta Sonu Fırsatı'
      })
    );
  };

  const handleSend = () => {
    const link = generateWhatsAppLink(customer.phone, editedMessage);
    markWhatsAppSent(customer.id);
    window.open(link, '_blank');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 overflow-y-auto">
      <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm" onClick={onClose} />
      
      <div className="bg-white w-full max-w-4xl rounded-[3rem] shadow-premium relative z-10 overflow-hidden animate-in zoom-in-95 duration-300 flex flex-col md:flex-row">
        {/* Left Side: Editor */}
        <div className="flex-1 p-8 md:p-10 border-r border-slate-100 max-h-[90vh] overflow-y-auto">
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center">
                <MessageSquare size={24} />
              </div>
              <div>
                <h2 className="text-xl font-black text-slate-900 tracking-tight">WhatsApp Mesajı</h2>
                <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">{customer.name}</p>
              </div>
            </div>
          </div>

          {isSentToday && (
            <div className="mb-6 bg-amber-50 border border-amber-100 p-4 rounded-2xl flex items-center gap-3 animate-in slide-in-from-top-2">
              <Clock className="text-amber-600" size={20} />
              <p className="text-xs font-black text-amber-800 uppercase tracking-wider">Bu müşteriye bugün zaten mesaj gönderildi.</p>
            </div>
          )}

          <div className="space-y-6">
            <div>
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">Mesaj Şablonu Seçin</label>
              <div className="grid grid-cols-2 gap-2">
                {WHATSAPP_TEMPLATES.map(t => (
                  <button
                    key={t.id}
                    onClick={() => handleTemplateChange(t.id)}
                    className={`px-4 py-3 rounded-2xl text-[11px] font-black transition-all border text-left ${
                      selectedTemplate.id === t.id 
                        ? 'bg-primary-600 border-primary-600 text-white shadow-lg shadow-primary-100' 
                        : 'bg-white border-slate-200 text-slate-600 hover:border-primary-300'
                    }`}
                  >
                    {t.title}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">Mesajı Düzenleyin</label>
              <textarea
                value={editedMessage}
                onChange={(e) => setEditedMessage(e.target.value)}
                className="w-full p-6 bg-slate-50 border border-slate-200 rounded-[2rem] focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 outline-none transition-all font-medium text-slate-700 min-h-[180px] resize-none text-sm leading-relaxed"
              />
            </div>
          </div>

          <div className="mt-8 flex gap-3">
            <button 
              onClick={onClose}
              className="px-6 py-4 bg-white border border-slate-200 text-slate-600 rounded-2xl font-black text-sm hover:bg-slate-100 transition-all active:scale-95"
            >
              Vazgeç
            </button>
            <button 
              onClick={handleSend}
              className="flex-1 py-4 bg-emerald-600 text-white rounded-2xl font-black text-sm hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-200 flex items-center justify-center gap-2 active:scale-95"
            >
              <Send size={18} /> Gönder
            </button>
          </div>
        </div>

        {/* Right Side: Phone Preview */}
        <div className="hidden md:flex flex-col w-[380px] bg-slate-50 p-8 items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white to-slate-100 opacity-50"></div>
          
          <div className="relative z-10 w-full max-w-[300px]">
             {/* Phone UI Mockup */}
             <div className="bg-[#E5DDD5] rounded-[2.5rem] border-[8px] border-slate-900 overflow-hidden shadow-2xl aspect-[9/18.5] flex flex-col">
                {/* Status Bar */}
                <div className="bg-[#075E54] px-4 py-3 flex items-center justify-between text-white">
                  <div className="flex items-center gap-2">
                    <User size={16} className="bg-white/20 p-0.5 rounded-full" />
                    <span className="text-[10px] font-bold truncate max-w-[120px]">{user?.name}</span>
                  </div>
                  <div className="flex gap-1.5">
                    <div className="w-1 h-1 bg-white rounded-full"></div>
                    <div className="w-1 h-1 bg-white rounded-full"></div>
                  </div>
                </div>

                {/* Chat Area */}
                <div className="flex-1 p-4 flex flex-col justify-end">
                   <div className="bg-white p-3 rounded-2xl rounded-tr-none shadow-sm relative mb-4 ml-auto max-w-[85%] animate-in slide-in-from-right-4 duration-500">
                      <p className="text-[11px] text-slate-800 leading-relaxed whitespace-pre-wrap">{editedMessage}</p>
                      <div className="flex items-center justify-end gap-1 mt-1">
                        <span className="text-[8px] text-slate-400">{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                        <CheckCheck size={10} className="text-blue-500" />
                      </div>
                   </div>
                </div>

                {/* Input Bar */}
                <div className="bg-[#F0F0F0] p-3 flex items-center gap-2">
                   <div className="flex-1 bg-white h-7 rounded-full"></div>
                   <div className="w-7 h-7 bg-[#128C7E] rounded-full"></div>
                </div>
             </div>

             <p className="text-center mt-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Müşteri Görünümü</p>
          </div>
        </div>
      </div>
    </div>
  );
}
