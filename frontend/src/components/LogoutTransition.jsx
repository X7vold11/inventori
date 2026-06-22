import { useEffect, useState } from 'react';
import { LogOut, Shield } from 'lucide-react';

export default function LogoutTransition({ onComplete }) {
  const [stage, setStage] = useState(0); // 0=enter, 1=message, 2=exit

  useEffect(() => {
    const t1 = setTimeout(() => setStage(1), 50);
    const t2 = setTimeout(() => setStage(2), 1300);
    const t3 = setTimeout(() => onComplete(), 1800);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [onComplete]);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #090d16 0%, #0f172a 100%)',
        opacity: stage >= 1 ? 1 : 0,
        transition: stage === 2 ? 'opacity 0.5s ease-out' : 'opacity 0.3s ease-in',
        ...(stage === 2 ? { opacity: 0 } : {}),
      }}
    >
      {/* Background Decorative Blur Orbs */}
      <div style={{
        position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none',
      }}>
        <div style={{
          position: 'absolute',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(99,102,241,0.06), transparent 70%)',
          width: '400px',
          height: '400px',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
        }} />
      </div>

      {/* Icon */}
      <div
        style={{
          width: 72,
          height: 72,
          borderRadius: '50%',
          background: 'rgba(239, 68, 68, 0.08)',
          border: '1.5px solid rgba(239, 68, 68, 0.25)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 20,
          transform: stage >= 1 ? 'scale(1)' : 'scale(0.85)',
          opacity: stage >= 1 && stage < 2 ? 1 : 0,
          transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <LogOut size={26} color="#f87171" />
      </div>

      {/* Text */}
      <h2
        style={{
          fontSize: '1.35rem',
          fontWeight: 700,
          color: 'white',
          marginBottom: 6,
          transform: stage >= 1 ? 'translateY(0)' : 'translateY(12px)',
          opacity: stage >= 1 && stage < 2 ? 1 : 0,
          transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1) 0.1s',
          letterSpacing: '-0.02em',
        }}
      >
        Sampai Jumpa! 👋
      </h2>
      <p
        style={{
          fontSize: '0.85rem',
          color: 'rgba(148, 163, 184, 0.8)',
          transform: stage >= 1 ? 'translateY(0)' : 'translateY(12px)',
          opacity: stage >= 1 && stage < 2 ? 1 : 0,
          transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1) 0.15s',
        }}
      >
        Anda telah keluar dari sistem dengan aman
      </p>

      {/* Progress bar */}
      <div
        style={{
          width: 100,
          height: 2.5,
          borderRadius: 4,
          background: 'rgba(255,255,255,0.08)',
          marginTop: 28,
          overflow: 'hidden',
          opacity: stage >= 1 && stage < 2 ? 1 : 0,
          transition: 'opacity 0.2s ease 0.2s',
        }}
      >
        <div
          style={{
            height: '100%',
            borderRadius: 4,
            background: 'linear-gradient(90deg, #ef4444, #f97316)',
            animation: 'logoutProgress 1.3s ease-out forwards',
            width: '100%',
            transformOrigin: 'left',
          }}
        />
      </div>

      {/* Shield decoration */}
      <div
        style={{
          position: 'absolute',
          bottom: 36,
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          opacity: stage >= 1 && stage < 2 ? 0.35 : 0,
          transition: 'opacity 0.4s ease 0.25s',
        }}
      >
        <Shield size={12} color="#94a3b8" />
        <span style={{ fontSize: '0.7rem', color: '#94a3b8', fontWeight: 500, letterSpacing: '0.02em' }}>
          SESI BERAKHIR AMAN
        </span>
      </div>

      <style>{`
        @keyframes logoutProgress {
          0% { transform: scaleX(0); }
          100% { transform: scaleX(1); }
        }
      `}</style>
    </div>
  );
}

