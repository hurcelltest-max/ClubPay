import React, { useState } from 'react';
import { X, MessageSquare, Send, Copy, ExternalLink } from 'lucide-react';
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
  };
}

export default function WhatsAppModal({ isOpen, onClose, customer }: WhatsAppModalProps) {
  const { user } = useDemoStore();
  const [selectedTemplate, setSelectedTemplate] = useState(WHATSAPP_TEMPLATES[0]);
  const [editedMessage, setEditedMessage] = useState(
    WHATSAPP_TEMPLATES[0].message({
      customerName: customer.name,
      merchantName: user?.name || 'Esnafımız',
      amount: customer.usedCredit,
      points: 10, // Mock points for thanks
      remainingBalance: 0,
      campaignTitle: 'Hafta Sonu İndirimi'
    })
  );

  if (!isOpen) return null;

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
        campaignTitle: 'Sezon Sonu Fırsatı'
      })
    );
  };

  const handleSend = () => {
    const link = generateWhatsAppLink(customer.phone, editedMessage);
    window.open(link, '_blank');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose} />
      
      <div className="bg-white w-full max-w-lg rounded-[2.5rem] shadow-premium relative z-10 overflow-hidden animate-in zoom-in-95 duration-300">
        <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center">
              <MessageSquare size={24} />
            </div>
            <div>
              <h2 className="text-xl font-black text-slate-900 tracking-tight">WhatsApp Mesajı</h2>
              <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">{customer.name}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white rounded-full transition-colors shadow-sm">
            <X size={20} className="text-slate-400" />
          </button>
        </div>

        <div className="p-8 space-y-6">
          <div>
            <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Mesaj Şablonu Seçin</label>
            <div className="grid grid-cols-2 gap-2">
              {WHATSAPP_TEMPLATES.map(t => (
                <button
                  key={t.id}
                  onClick={() => handleTemplateChange(t.id)}
                  className={`px-4 py-3 rounded-xl text-xs font-bold transition-all border ${
                    selectedTemplate.id === t.id 
                      ? 'bg-primary-600 border-primary-600 text-white shadow-lg shadow-primary-200' 
                      : 'bg-white border-slate-200 text-slate-600 hover:border-primary-300'
                  }`}
                >
                  {t.title}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Mesaj İçeriği (Düzenlenebilir)</label>
            <textarea
              value={editedMessage}
              onChange={(e) => setEditedMessage(e.target.value)}
              className="w-full p-5 bg-slate-50 border border-slate-200 rounded-3xl focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 outline-none transition-all font-medium text-slate-700 min-h-[150px] resize-none"
            />
          </div>

          <div className="bg-amber-50 border border-amber-100 p-4 rounded-2xl flex gap-3">
            <div className="shrink-0 w-8 h-8 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center">
              <ExternalLink size={16} />
            </div>
            <p className="text-[11px] font-bold text-amber-800 leading-normal">
              Mesaj esnaf olarak sizin kendi WhatsApp numaranızdan gönderilecektir. Bu, mahalle güven ilişkisini korumanızı sağlar.
            </p>
          </div>
        </div>

        <div className="p-8 bg-slate-50 border-t border-slate-100 flex gap-3">
          <button 
            onClick={onClose}
            className="flex-1 py-4 bg-white border border-slate-200 text-slate-600 rounded-2xl font-black text-sm hover:bg-slate-100 transition-all"
          >
            Vazgeç
          </button>
          <button 
            onClick={handleSend}
            className="flex-[2] py-4 bg-emerald-600 text-white rounded-2xl font-black text-sm hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-200 flex items-center justify-center gap-2 active:scale-95"
          >
            <Send size={18} /> WhatsApp ile Gönder
          </button>
        </div>
      </div>
    </div>
  );
}
