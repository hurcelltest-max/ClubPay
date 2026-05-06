import React from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle, ArrowLeft } from 'lucide-react';
import { Logo } from '../components/ui/Logo';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
      <div className="mb-8">
        <Logo className="scale-125" />
      </div>
      <div className="bg-white p-8 rounded-3xl shadow-card border border-slate-100 max-w-md w-full text-center">
        <div className="w-20 h-20 bg-orange-50 rounded-2xl flex items-center justify-center text-orange-500 mx-auto mb-6">
          <AlertTriangle size={40} />
        </div>
        <h1 className="text-4xl font-extrabold text-slate-900 mb-2">404</h1>
        <p className="text-xl font-bold text-slate-700 mb-4">Sayfa Bulunamadı</p>
        <p className="text-slate-500 mb-8 font-medium">
          Aradığınız sayfaya şu anda ulaşılamıyor veya sayfa taşınmış olabilir.
        </p>
        <Link 
          to="/" 
          className="w-full py-4 bg-slate-900 text-white rounded-xl font-bold hover:bg-primary-600 transition-colors flex items-center justify-center gap-2"
        >
          <ArrowLeft size={18} /> Ana Sayfaya Dön
        </Link>
      </div>
    </div>
  );
}
