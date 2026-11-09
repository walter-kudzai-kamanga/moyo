import React, { useEffect, useRef, useState } from 'react';
import { FloatingHeartsCanvas } from './FloatingHeartsCanvas';

const ALLOWED_EMAILS = new Set([
  'mungozatinotenda7@gmail.com',
  'walterkudzai1@gmail.com',
]);

const CREDENTIAL_KEY = 'moyo_google_credential';

interface GoogleCredentialResponse {
  credential: string;
}

declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (config: {
            client_id: string;
            callback: (response: GoogleCredentialResponse) => void;
            auto_select?: boolean;
            cancel_on_tap_outside?: boolean;
          }) => void;
          prompt: () => void;
          renderButton: (parent: HTMLElement, options: Record<string, string | number>) => void;
        };
      };
    };
  }
}

function clientId(): string {
  return import.meta.env.VITE_GOOGLE_CLIENT_ID?.trim() ?? '';
}

function emailFromCredential(credential: string): string | null {
  const audience = clientId();
  if (!audience) return null;

  try {
    const segment = credential.split('.')[1];
    if (!segment) return null;
    const payload = JSON.parse(atob(segment.replace(/-/g, '+').replace(/_/g, '/'))) as {
      email?: string;
      email_verified?: boolean;
      exp?: number;
      aud?: string;
    };
    if (payload.aud !== audience) return null;
    if (payload.email_verified === false) return null;
    if (typeof payload.exp !== 'number' || payload.exp * 1000 <= Date.now()) return null;
    if (typeof payload.email !== 'string') return null;
    return payload.email.trim().toLowerCase();
  } catch {
    return null;
  }
}

function isAllowedEmail(email: string | null): boolean {
  return !!email && ALLOWED_EMAILS.has(email);
}

function hasAllowedSession(): boolean {
  const saved = sessionStorage.getItem(CREDENTIAL_KEY);
  return !!saved && isAllowedEmail(emailFromCredential(saved));
}

export const AccessGate: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [allowed, setAllowed] = useState(hasAllowedSession);
  const buttonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (allowed) return;
    const id = clientId();
    if (!id) return;

    const handleCredential = (response: GoogleCredentialResponse) => {
      const email = emailFromCredential(response.credential);
      if (!isAllowedEmail(email)) {
        sessionStorage.removeItem(CREDENTIAL_KEY);
        setAllowed(false);
        return;
      }
      sessionStorage.setItem(CREDENTIAL_KEY, response.credential);
      setAllowed(true);
    };

    const start = () => {
      const googleId = window.google?.accounts?.id;
      if (!googleId) return;
      googleId.initialize({
        client_id: id,
        callback: handleCredential,
        auto_select: true,
        cancel_on_tap_outside: false,
      });
      googleId.prompt();
      if (buttonRef.current) {
        buttonRef.current.replaceChildren();
        googleId.renderButton(buttonRef.current, {
          theme: 'filled_black',
          size: 'large',
          shape: 'pill',
          text: 'signin_with',
          width: 280,
        });
      }
    };

    if (window.google?.accounts?.id) {
      start();
      return;
    }

    let script = document.querySelector<HTMLScriptElement>('script[data-moyo-gsi="1"]');
    if (!script) {
      script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.dataset.moyoGsi = '1';
      document.head.appendChild(script);
    }
    script.addEventListener('load', start);
    return () => script?.removeEventListener('load', start);
  }, [allowed]);

  if (allowed) return <>{children}</>;

  return (
    <div className="relative min-h-screen text-[#fbebf0] bg-[#120308] overflow-hidden">
      <FloatingHeartsCanvas />
      <main className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 text-center">
        <p className="font-serif-romantic text-3xl sm:text-5xl text-rose-50 max-w-xl leading-snug">
          this was not curated for you
        </p>
        {clientId() ? <div ref={buttonRef} className="mt-8" /> : null}
      </main>
    </div>
  );
};
