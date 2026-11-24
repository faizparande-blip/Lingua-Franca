import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.jsx';
import ScrollToTop from './components/common/ScrollToTop.jsx';

// Admin Portal Components
import AdminProtectedRoute from './components/admin/AdminProtectedRoute.jsx';
import AdminLayout from './layouts/AdminLayout.jsx';
import AdminLogin from './pages/admin/AdminLogin.jsx';
import AdminForgotPassword from './pages/admin/AdminForgotPassword.jsx';
import AdminResetPassword from './pages/admin/AdminResetPassword.jsx';
import AdminOverview from './pages/admin/AdminOverview.jsx';
import AdminEnquiries from './pages/admin/AdminEnquiries.jsx';
import AdminTestimonials from './pages/admin/AdminTestimonials.jsx';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          {/* Public Staff Authentication Routes */}
          <Route path="/login" element={<AdminLogin />} />
          <Route path="/forgot-password" element={<AdminForgotPassword />} />
          <Route path="/reset-password" element={<AdminResetPassword />} />

          {/* Protected Admin Portal Routes */}
          <Route element={<AdminProtectedRoute />}>
            <Route element={<AdminLayout />}>
              <Route path="/" element={<AdminOverview />} />
              <Route path="/enquiries" element={<AdminEnquiries />} />
              <Route path="/testimonials" element={<AdminTestimonials />} />
            </Route>
          </Route>

          {/* 404 Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
