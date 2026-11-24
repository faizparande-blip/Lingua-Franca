import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.jsx';
import MainLayout from './components/layout/MainLayout';
import Home from './pages/Home';
import About from './pages/About';
import Courses from './pages/Courses';
import Services from './pages/Services';
import Testimonials from './pages/Testimonials';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import ScrollToTop from './components/common/ScrollToTop';

// Authentication Pages
import Login from './pages/auth/Login.jsx';
import SignUp from './pages/auth/SignUp.jsx';
import ForgotPassword from './pages/auth/ForgotPassword.jsx';
import ResetPassword from './pages/auth/ResetPassword.jsx';

// Admin Portal Components
import AdminProtectedRoute from './components/admin/AdminProtectedRoute.jsx';
import AdminLayout from './layouts/AdminLayout.jsx';
import AdminLogin from './pages/admin/AdminLogin.jsx';
import AdminOverview from './pages/admin/AdminOverview.jsx';
import AdminEnquiries from './pages/admin/AdminEnquiries.jsx';
import AdminTestimonials from './pages/admin/AdminTestimonials.jsx';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          {/* Public Website Routes */}
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="courses" element={<Courses />} />
            <Route path="services" element={<Services />} />
            <Route path="testimonials" element={<Testimonials />} />
            <Route path="contact" element={<Contact />} />
          </Route>

          {/* Unified Authentication Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />

          {/* Admin Authentication Entry (routes to unified login) */}
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* Protected Admin Dashboard Routes */}
          <Route path="/admin" element={<AdminProtectedRoute />}>
            <Route element={<AdminLayout />}>
              <Route index element={<AdminOverview />} />
              <Route path="enquiries" element={<AdminEnquiries />} />
              <Route path="testimonials" element={<AdminTestimonials />} />
            </Route>
          </Route>

          {/* 404 Catch-All */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
