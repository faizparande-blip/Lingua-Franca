import React, { useState, useEffect } from 'react';
import { BookIcon, XIcon, LaptopIcon } from './Icons';

export default function PwaInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isDismissed, setIsDismissed] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);

  // Platform detection
  const isIOS = typeof navigator !== 'undefined' && /iPhone|iPad|iPod/i.test(navigator.userAgent);
  const isDesktop = typeof navigator !== 'undefined' && !/Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

  useEffect(() => {
    // 1. Check if already operating in standalone desktop or mobile window
    const checkStandalone = () => {
      const isStandaloneMode =
        window.matchMedia('(display-mode: standalone)').matches ||
        window.matchMedia('(display-mode: window-controls-overlay)').matches ||
        window.navigator.standalone === true ||
        document.referrer.includes('android-app://');
      return isStandaloneMode;
    };

    if (checkStandalone()) {
      setIsStandalone(true);
      return;
    }

    // 2. Check if user already completed PWA installation previously
    try {
      if (localStorage.getItem('lf_pwa_installed') === 'true') {
        setIsInstalled(true);
        return;
      }

      // 3. Check if user dismissed the prompt recently (7 days cool-off)
      const dismissedUntil = localStorage.getItem('lf_pwa_prompt_dismissed_until');
      if (dismissedUntil && Date.now() < parseInt(dismissedUntil, 10)) {
        setIsDismissed(true);
        return;
      }
    } catch {
      // Storage unavailable in rare restricted modes
    }

    // 4. Capture native browser beforeinstallprompt
    const handleBeforeInstallPrompt = (e) => {
      // Prevent automatic browser micro-banner to present our styled banner
      e.preventDefault();
      setDeferredPrompt(e);
    };

    // 5. Handle successful installation event
    const handleAppInstalled = () => {
      try {
        localStorage.setItem('lf_pwa_installed', 'true');
      } catch {}
      setIsInstalled(true);
      setDeferredPrompt(null);
      setShowInstructions(false);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      // Trigger native browser installation modal/dialog
      deferredPrompt.prompt();
      const choiceResult = await deferredPrompt.userChoice;
      if (choiceResult && choiceResult.outcome === 'accepted') {
        try {
          localStorage.setItem('lf_pwa_installed', 'true');
        } catch {}
        setIsInstalled(true);
      }
      setDeferredPrompt(null);
    } else {
      // Automatic prompt not available yet or manual install platform
      setShowInstructions(true);
    }
  };

  const handleDismiss = () => {
    try {
      // Dismiss for 7 days to avoid nagging
      const cooldown = Date.now() + 7 * 24 * 60 * 60 * 1000;
      localStorage.setItem('lf_pwa_prompt_dismissed_until', cooldown.toString());
    } catch {}
    setIsDismissed(true);
    setShowInstructions(false);
  };

  // Do not render if app is running standalone, already installed, or dismissed
  if (isStandalone || isInstalled || isDismissed) {
    return null;
  }

  return (
    <>
      {/* Non-intrusive floating installation card */}
      <aside
        role="region"
        aria-label="Install Application"
        className="fixed bottom-4 left-4 right-4 sm:left-6 sm:right-auto z-40 bg-white border-2 border-navy rounded-2xl p-3.5 sm:p-4 shadow-2xl flex items-center justify-between gap-3 animate-slide-up max-w-md"
      >
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 rounded-xl bg-navy flex items-center justify-center border border-yellow shrink-0">
            {isDesktop ? (
              <LaptopIcon className="w-5 h-5 text-yellow" />
            ) : (
              <BookIcon className="w-5 h-5 text-cream" />
            )}
          </div>
          <div className="min-w-0">
            <h4 className="text-xs sm:text-sm font-bold text-navy leading-tight truncate">
              {isDesktop ? 'Install Lingua Franca Desktop App' : 'Install Lingua Franca App'}
            </h4>
            <p className="text-[11px] sm:text-xs text-slate-600 leading-tight mt-0.5 truncate">
              {isDesktop
                ? 'Run as standalone desktop window'
                : 'Fast offline access & home screen launcher'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handleInstallClick}
            className="btn-yellow px-3 sm:px-4 py-1.5 sm:py-2 text-xs font-bold shadow-sm whitespace-nowrap cursor-pointer"
          >
            Install
          </button>
          <button
            onClick={handleDismiss}
            className="w-7 h-7 flex items-center justify-center rounded-lg text-slate-400 hover:text-navy hover:bg-cream-300/40 transition-colors cursor-pointer"
            aria-label="Dismiss installation prompt"
          >
            <XIcon className="w-4 h-4" />
          </button>
        </div>
      </aside>

      {/* Manual installation guide modal (shown if native prompt is not yet ready) */}
      {showInstructions && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy/80 backdrop-blur-xs animate-fade-in">
          <div className="bg-white border-2 border-cream-300 rounded-3xl max-w-md w-full p-6 sm:p-7 relative shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-cream-300 pb-3">
              <h3 className="font-serif text-lg sm:text-xl font-bold text-navy">
                {isDesktop ? 'Install Standalone Desktop App' : 'Add to Your Device'}
              </h3>
              <button
                onClick={() => setShowInstructions(false)}
                className="p-1 rounded-lg text-navy hover:bg-cream transition-colors cursor-pointer"
                aria-label="Close"
              >
                <XIcon className="w-5 h-5 stroke-navy" />
              </button>
            </div>

            <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
              {isDesktop ? (
                <>
                  <p>To install Lingua Franca as a native application on your desktop:</p>
                  <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm">
                    <li>
                      <strong>Google Chrome / Microsoft Edge:</strong> Look for the <strong>Install icon</strong> (🖥️ or ⊕) in the right side of the address bar, and click <strong>Install</strong>.
                    </li>
                    <li>
                      Alternatively, click the browser menu (<strong>⋮</strong> or <strong>…</strong>) at top-right and select <strong>"Install Lingua Franca..."</strong>.
                    </li>
                  </ul>
                  <p className="text-xs text-slate-500 pt-1">
                    Once installed, the website opens in its own standalone window without browser tabs or address bar.
                  </p>
                </>
              ) : isIOS ? (
                <>
                  <p>To install on iPhone or iPad Safari:</p>
                  <ol className="list-decimal pl-5 space-y-1.5 text-xs sm:text-sm">
                    <li>Tap the <strong>Share</strong> button (box with upward arrow ⎋) in Safari toolbar.</li>
                    <li>Scroll down and tap <strong>"Add to Home Screen"</strong> (➕).</li>
                    <li>Tap <strong>Add</strong> in the top right corner.</li>
                  </ol>
                </>
              ) : (
                <>
                  <p>To install on Android Chrome:</p>
                  <ol className="list-decimal pl-5 space-y-1.5 text-xs sm:text-sm">
                    <li>Tap the three dots (<strong>⋮</strong>) in the top-right corner.</li>
                    <li>Select <strong>"Install app"</strong> or <strong>"Add to Home screen"</strong>.</li>
                    <li>Follow the on-screen confirmation.</li>
                  </ol>
                </>
              )}
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setShowInstructions(false)}
                className="btn-navy px-5 py-2 text-xs sm:text-sm font-bold rounded-xl cursor-pointer"
              >
                Got It
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
