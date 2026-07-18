import { useAppStore } from '../../store/appStore';

/**
 * CabinetBezel — The signature element (§1).
 * Wraps the entire app in a persistent arcade cabinet frame with
 * mounting screws, vent slats, and a CRT scanline overlay.
 */
export default function CabinetBezel({ children }: { children: React.ReactNode }) {
  const mode = useAppStore((s) => s.mode);

  return (
    <div
      className={`cabinet-bezel ${mode === 'arcade' ? 'crt-scanlines' : ''}`}
      style={{
        position: 'relative',
        maxWidth: '1400px',
        margin: '16px auto',
        padding: '12px',
        background: `var(--bezel)`,
        borderRadius: 'var(--radius-bezel)',
        border: '2px solid var(--bezel-border)',
        boxShadow: mode === 'arcade'
          ? '0 0 40px rgba(0,163,255,0.08), inset 0 0 60px rgba(0,0,0,0.5)'
          : '0 2px 20px rgba(0,0,0,0.1)',
        minHeight: 'calc(100vh - 32px)',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Mounting Screws — 4 corners */}
      {mode === 'arcade' && <CabinetScrews />}

      {/* Vent Slats — top decorative strip */}
      {mode === 'arcade' && <VentSlats />}

      {/* Main Content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', position: 'relative', zIndex: 1 }}>
        {children}
      </div>

      {/* Bottom vent strip */}
      {mode === 'arcade' && <VentSlats position="bottom" />}
    </div>
  );
}

/** Decorative mounting screws at 4 corners */
function CabinetScrews() {
  const positions = [
    { top: 8, left: 8 },
    { top: 8, right: 8 },
    { bottom: 8, left: 8 },
    { bottom: 8, right: 8 },
  ];

  return (
    <>
      {positions.map((pos, i) => (
        <div
          key={i}
          className="cabinet-screws"
          aria-hidden="true"
          style={{
            position: 'absolute',
            ...pos,
            width: 14,
            height: 14,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #1a2030 0%, #0d1117 50%, #1a2030 100%)',
            border: '1px solid #2a3040',
            zIndex: 10,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          } as React.CSSProperties}
        >
          {/* Phillips head cross */}
          <div
            style={{
              width: 8,
              height: 1,
              background: '#3a4050',
              position: 'absolute',
            }}
          />
          <div
            style={{
              width: 1,
              height: 8,
              background: '#3a4050',
              position: 'absolute',
            }}
          />
        </div>
      ))}
    </>
  );
}

/** Decorative vent slats */
function VentSlats({ position = 'top' }: { position?: 'top' | 'bottom' }) {
  return (
    <div
      className="cabinet-vents"
      aria-hidden="true"
      style={{
        height: 8,
        margin: position === 'top' ? '6px 40px 8px' : '8px 40px 6px',
        background: 'repeating-linear-gradient(to right, var(--bezel-border) 0px, var(--bezel-border) 20px, transparent 20px, transparent 24px)',
        opacity: 0.4,
        borderRadius: 2,
      }}
    />
  );
}
