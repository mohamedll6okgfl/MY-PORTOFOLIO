import { useState } from 'react';
import { useBeeper } from '../../hooks/useBeeper';

/**
 * ResumeSection — "Reward.pdf" cartridge slot (§4.7).
 * Visual cartridge-slot metaphor with "INSERT COIN FOR RESUME" button.
 * Opens the PDF in a new browser tab instead of triggering a download.
 */
export default function ResumeSection() {
  const [downloaded, setDownloaded] = useState(false);
  const [inserting, setInserting] = useState(false);
  const { playCoin } = useBeeper();

  const handleClaim = () => {
    playCoin();
    setInserting(true);

    // Simulate cartridge insertion animation, then open PDF in new tab
    setTimeout(() => {
      setInserting(false);
      setDownloaded(true);

      // Open resume in a new browser tab
      window.open('/resume.pdf', '_blank', 'noopener,noreferrer');

      // Reset after 3 seconds
      setTimeout(() => setDownloaded(false), 3000);
    }, 800);
  };

  return (
    <div className="section-content">
      <h2 className="section-title">
        &gt; CLAIM YOUR REWARD_
      </h2>

      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 24,
        padding: '24px 0',
      }}>
        {/* Cartridge Slot Visual */}
        <div style={{
          width: '100%',
          maxWidth: 400,
          position: 'relative',
        }}>
          {/* Slot machine frame */}
          <div style={{
            border: '2px solid var(--blue)',
            boxShadow: '0 0 20px var(--blue-glow), inset 0 0 20px var(--blue-glow)',
            padding: 24,
            textAlign: 'center',
            background: 'rgba(0,163,255,0.03)',
            position: 'relative',
          }}>
            {/* Cartridge label */}
            <div style={{
              fontFamily: 'var(--font-display)',
              fontSize: '0.55rem',
              color: 'var(--slate)',
              letterSpacing: '0.15em',
              marginBottom: 16,
            }}>
              CARTRIDGE SLOT A-01
            </div>

            {/* Cartridge visual */}
            <div style={{
              width: 120,
              height: 80,
              margin: '0 auto 20px',
              border: '2px solid var(--yellow)',
              background: 'rgba(255,214,0,0.05)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              transform: inserting ? 'translateY(20px)' : 'translateY(0)',
              transition: 'transform 400ms steps(6)',
              boxShadow: inserting ? '0 0 30px var(--yellow-glow)' : '0 0 10px var(--yellow-glow)',
            }}>
              <span style={{
                fontFamily: 'var(--font-display)',
                fontSize: '0.5rem',
                color: 'var(--yellow)',
                letterSpacing: '0.1em',
              }}>
                RESUME
              </span>
              <span style={{
                fontFamily: 'var(--font-display)',
                fontSize: '0.45rem',
                color: 'var(--slate)',
                letterSpacing: '0.08em',
                marginTop: 4,
              }}>
                .PDF
              </span>
              {/* Cartridge notch */}
              <div style={{
                position: 'absolute',
                bottom: -2,
                left: '50%',
                transform: 'translateX(-50%)',
                width: 40,
                height: 6,
                background: 'var(--bezel)',
                borderTop: '2px solid var(--yellow)',
              }} />
            </div>

            {/* Slot opening */}
            <div style={{
              width: '80%',
              height: 8,
              margin: '0 auto 20px',
              background: 'var(--bg)',
              border: '1px solid var(--bezel-border)',
              boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.5)',
            }} />

            {/* Open resume in new tab */}
            <button
              className={`arcade-btn ${downloaded ? 'arcade-btn--secondary' : 'arcade-btn--magenta'}`}
              onClick={handleClaim}
              disabled={inserting}
              style={{
                width: '100%',
                justifyContent: 'center',
                opacity: inserting ? 0.7 : 1,
              }}
            >
              {downloaded
                ? '✓ REWARD CLAIMED'
                : inserting
                  ? 'INSERTING...'
                  : '🪙 INSERT COIN FOR RESUME'}
            </button>
          </div>

          {/* Side labels */}
          <div style={{
            position: 'absolute',
            top: '50%',
            left: -40,
            transform: 'rotate(-90deg) translateX(-50%)',
            fontFamily: 'var(--font-display)',
            fontSize: '0.45rem',
            color: 'var(--bezel-border)',
            letterSpacing: '0.2em',
            whiteSpace: 'nowrap',
          }} aria-hidden="true">
            REWARD STATION
          </div>
        </div>

        {/* File info */}
        <div className="font-body text-sm text-slate-300 text-center leading-relaxed">
          <div>📄 RESUME.PDF — Full professional resume</div>
          <div className="mt-1 text-xs text-slate-400">
            Format: PDF · Updated: 2026 · Online Preview & Printable
          </div>
        </div>
      </div>
    </div>
  );
}
