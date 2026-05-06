import React from 'react';

export default function AdminMerchants() {
  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Esnaf Yönetimi</h1>
          <p className="text-gray-500 mt-1">Platformdaki tüm işletmeleri yönetin</p>
        </div>
        <button className="px-4 py-2.5 bg-gray-900 text-white rounded-xl font-medium shadow-lg hover:bg-gray-800 transition-colors">
          Yeni İşletme Ekle
        </button>
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
         <p className="text-gray-500">Esnaf detay listesi ve ayarları bu sayfada yer alacaktır.</p>
      </div>
    </div>
  );
}
