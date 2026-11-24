import React, { useState, useEffect } from 'react';
import { BookIcon } from './Icons';

export default function PwaInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isDismissed, setIsDismissed] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    // Check if already running as installed PWA standalone
    if (window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true) {
      setIsStandalone(true);
    }

    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setIsDismissed(true);
      }
      setDeferredPrompt(null);
    } else {
      // If browser doesn't fire beforeinstallprompt (e.g. iOS Safari or already visited), show instructions
      alert('To install on your phone:\n- On Android Chrome: Tap the three dots (⋮) menu and select "Install app" or "Add to Home screen".\n- On iPhone Safari: Tap the Share button (⎋) and select "Add to Home Screen".');
    }
  };

  if (isStandalone || isDismissed) return null;

  return (
    <aside 
      aria-label="Install App"
      className="fixed bottom-4 left-4 right-4 sm:left-6 sm:right-auto z-40 bg-white border-2 border-navy rounded-2xl p-3.5 sm:p-4 shadow-xl flex items-center justify-between gap-3 animate-slide-up max-w-sm"
    >
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-cream flex items-center justify-center border border-yellow shrink-0">
          <BookIcon className="w-6 h-6" />
        </div>
        <div>
          <h4 className="text-xs font-bold text-navy leading-tight">Install Lingua Franca App</h4>
          <p className="text-[11px] text-slate-500 leading-tight mt-0.5">Offline access to notes & courses</p>
        </div>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        <button
          onClick={handleInstallClick}
          className="btn-yellow px-3 py-1.5 text-xs font-bold shadow-sm"
        >
          Install
        </button>
        <button
          onClick={() => setIsDismissed(true)}
          className="text-xs text-slate-400 hover:text-navy px-1.5 py-1"
          aria-label="Dismiss"
        >
          ✕
        </button>
      </div>
    </aside>
  );
}
