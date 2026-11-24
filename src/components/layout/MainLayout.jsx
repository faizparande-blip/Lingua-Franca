import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../common/Navbar';
import Footer from '../common/Footer';
import BackToTop from '../common/BackToTop';
import PwaInstallPrompt from '../common/PwaInstallPrompt';
import { useScrollReveal } from '../../hooks/useScrollReveal';

export default function MainLayout() {
  useScrollReveal();

  return (
    <div className="min-h-screen bg-cream flex flex-col selection:bg-yellow/30 selection:text-navy text-navy">
      <Navbar />
      <main className="flex-1 pt-16">
        <Outlet />
      </main>
      <Footer />
      <BackToTop />
      <PwaInstallPrompt />
    </div>
  );
}
