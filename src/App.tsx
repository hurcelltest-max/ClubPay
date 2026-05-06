import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Logo } from './components/ui/Logo';

// Lazy loaded routes for better performance and smaller chunks
const LandingPage = React.lazy(() => import('./pages/landing/LandingPage'));
const Login = React.lazy(() => import('./pages/auth/Login'));
const CustomerApp = React.lazy(() => import('./pages/customer/CustomerApp'));
const MerchantApp = React.lazy(() => import('./pages/merchant/MerchantApp'));
const InternalAdminApp = React.lazy(() => import('./pages/admin/AdminApp'));
const NotFound = React.lazy(() => import('./pages/NotFound'));

// Global loading fallback
const PageLoader = () => (
  <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center">
    <Logo className="mb-8 opacity-50 animate-pulse" />
    <div className="w-8 h-8 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin"></div>
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<Navigate to="/" replace />} />
          
          {/* Protected Apps */}
          <Route path="/customer/*" element={<CustomerApp />} />
          <Route path="/merchant/*" element={<MerchantApp />} />
          <Route path="/super-admin-hidden/*" element={<InternalAdminApp />} />

          {/* 404 Catch All */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
