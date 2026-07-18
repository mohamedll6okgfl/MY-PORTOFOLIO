import { useState, type FormEvent } from 'react';
import { useBeeper } from '../../hooks/useBeeper';

/**
 * ContactSection — "Multiplayer" terminal (§4.8).
 * "ENTER INITIALS" / high-score submission framing.
 * Submit = "SUBMIT SCORE", success = "SCORE SUBMITTED".
 */
export default function ContactSection() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const { playCoin, playSelect } = useBeeper();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    playSelect();
    setSubmitting(true);

    // Mock submission (swap for real backend later)
    setTimeout(() => {
      playCoin();
      setSubmitting(false);
      setSubmitted(true);

      // Reset after 4 seconds
      setTimeout(() => {
        setSubmitted(false);
        setName('');
        setEmail('');
        setMessage('');
      }, 4000);
    }, 1200);
  };

  if (submitted) {
    return (
      <div className="section-content" style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 300,
        textAlign: 'center',
        gap: 16,
      }}>
        <div style={{ fontSize: '3rem' }}>🏆</div>
        <div style={{
          fontFamily: 'var(--font-display)',
          fontSize: '1rem',
          color: 'var(--yellow)',
          textShadow: '0 0 20px var(--yellow-glow)',
          letterSpacing: '0.15em',
        }}>
          SCORE SUBMITTED!
        </div>
        <div style={{
          fontFamily: 'var(--font-body)',
          fontSize: '0.7rem',
          color: 'var(--slate)',
          maxWidth: 300,
        }}>
          Your message has been received. Player 2 will respond soon.
        </div>
      </div>
    );
  }

  return (
    <div className="section-content">
      <h2 className="section-title">
        &gt; ENTER INITIALS_
      </h2>

      <div style={{
        maxWidth: 500,
        margin: '0 auto',
      }}>
        {/* Terminal frame */}
        <div style={{
          border: '1px solid var(--bezel-border)',
          background: 'var(--card-bg)',
        }}>
          {/* Terminal header */}
          <div style={{
            padding: '8px 16px',
            borderBottom: '1px solid var(--bezel-border)',
            background: 'rgba(0,163,255,0.04)',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
          }}>
            <span style={{
              width: 8, height: 8, borderRadius: '50%',
              background: 'var(--magenta)',
              boxShadow: '0 0 6px var(--magenta-glow)',
            }} />
            <span style={{
              width: 8, height: 8, borderRadius: '50%',
              background: 'var(--yellow)',
              boxShadow: '0 0 6px var(--yellow-glow)',
            }} />
            <span style={{
              width: 8, height: 8, borderRadius: '50%',
              background: 'var(--blue)',
              boxShadow: '0 0 6px var(--blue-glow)',
            }} />
            <span style={{
              fontFamily: 'var(--font-display)',
              fontSize: '0.5rem',
              color: 'var(--slate)',
              letterSpacing: '0.1em',
              marginLeft: 8,
            }}>
              MULTIPLAYER TERMINAL
            </span>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} style={{ padding: '20px 16px' }}>
            <TerminalInput
              label="PLAYER NAME"
              placeholder="ENTER YOUR NAME..."
              value={name}
              onChange={setName}
              type="text"
              required
            />
            <TerminalInput
              label="COMM CHANNEL"
              placeholder="ENTER YOUR EMAIL..."
              value={email}
              onChange={setEmail}
              type="email"
              required
            />
            <TerminalTextarea
              label="TRANSMISSION"
              placeholder="ENTER YOUR MESSAGE..."
              value={message}
              onChange={setMessage}
              required
            />

            <button
              type="submit"
              className="arcade-btn arcade-btn--magenta"
              disabled={submitting || !name || !email || !message}
              style={{
                width: '100%',
                justifyContent: 'center',
                marginTop: 16,
                opacity: submitting ? 0.7 : 1,
              }}
            >
              {submitting ? 'TRANSMITTING...' : '🎯 SUBMIT SCORE'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

function TerminalInput({
  label, placeholder, value, onChange, type = 'text', required = false,
}: {
  label: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
}) {
  const inputId = `contact-${label.toLowerCase().replace(/\s+/g, '-')}`;
  return (
    <div style={{ marginBottom: 14 }}>
      <label
        htmlFor={inputId}
        style={{
          display: 'block',
          fontFamily: 'var(--font-display)',
          fontSize: '0.55rem',
          color: 'var(--blue)',
          letterSpacing: '0.12em',
          marginBottom: 4,
        }}
      >
        {label}
      </label>
      <input
        id={inputId}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        style={{
          width: '100%',
          padding: '10px 12px',
          fontFamily: 'var(--font-body)',
          fontSize: '0.75rem',
          color: 'var(--white)',
          background: 'var(--input-bg)',
          border: '1px solid var(--bezel-border)',
          outline: 'none',
        }}
      />
    </div>
  );
}

function TerminalTextarea({
  label, placeholder, value, onChange, required = false,
}: {
  label: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
}) {
  const inputId = `contact-${label.toLowerCase().replace(/\s+/g, '-')}`;
  return (
    <div style={{ marginBottom: 14 }}>
      <label
        htmlFor={inputId}
        style={{
          display: 'block',
          fontFamily: 'var(--font-display)',
          fontSize: '0.55rem',
          color: 'var(--blue)',
          letterSpacing: '0.12em',
          marginBottom: 4,
        }}
      >
        {label}
      </label>
      <textarea
        id={inputId}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        rows={4}
        style={{
          width: '100%',
          padding: '10px 12px',
          fontFamily: 'var(--font-body)',
          fontSize: '0.75rem',
          color: 'var(--white)',
          background: 'var(--input-bg)',
          border: '1px solid var(--bezel-border)',
          outline: 'none',
          resize: 'vertical',
        }}
      />
    </div>
  );
}
