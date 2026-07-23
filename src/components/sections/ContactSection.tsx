import { useState, type FormEvent } from 'react';
import { useBeeper } from '../../hooks/useBeeper';

/**
 * ContactSection — "Multiplayer" terminal (§4.8).
 * Real email sending via Web3Forms API.
 * Button: "🎮 PLAY CO-OP", success/error arcade feedback states.
 */

/** Replace with your Web3Forms access key from https://web3forms.com */
const WEB3FORMS_ACCESS_KEY = '45f08b93-ad0e-492f-9ca8-080802af7f6b';

export default function ContactSection() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const { playCoin, playSelect } = useBeeper();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    playSelect();
    setStatus('submitting');

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: `🎮 New CO-OP Request from Portfolio [Player: ${name}]`,
          from_name: name,
          reply_to: email,
          message: message,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        playCoin();
        setStatus('success');
        setName('');
        setEmail('');
        setMessage('');

        // Reset status after 5 seconds
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        setStatus('error');
        setTimeout(() => setStatus('idle'), 5000);
      }
    } catch {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  return (
    <div className="section-content">
      <h2 className="section-title">
        &gt; ENTER INITIALS_
      </h2>

      <div style={{
        width: '100%',
        maxWidth: 520,
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
              disabled={status === 'submitting'}
            />
            <TerminalInput
              label="COMM CHANNEL"
              placeholder="ENTER YOUR EMAIL..."
              value={email}
              onChange={setEmail}
              type="email"
              required
              disabled={status === 'submitting'}
            />
            <TerminalTextarea
              label="TRANSMISSION"
              placeholder="ENTER YOUR MESSAGE..."
              value={message}
              onChange={setMessage}
              required
              disabled={status === 'submitting'}
            />

            <button
              type="submit"
              className="arcade-btn arcade-btn--magenta"
              disabled={status === 'submitting' || !name || !email || !message}
              style={{
                width: '100%',
                justifyContent: 'center',
                marginTop: 16,
                opacity: status === 'submitting' ? 0.7 : 1,
              }}
            >
              {status === 'submitting' ? '📡 TRANSMITTING...' : '🎮 PLAY CO-OP'}
            </button>

            {/* Success feedback */}
            {status === 'success' && (
              <div style={{
                marginTop: 16,
                padding: '12px 16px',
                border: '1px solid #00ff88',
                background: 'rgba(0,255,136,0.06)',
                fontFamily: 'var(--font-display)',
                fontSize: '0.6rem',
                color: '#00ff88',
                letterSpacing: '0.08em',
                textAlign: 'center',
                textShadow: '0 0 12px rgba(0,255,136,0.5)',
                animation: 'flicker 0.15s 3',
              }}>
                ✔ TRANSMISSION RECEIVED! PLAYER 2 HAS JOINED THE LOBBY.
              </div>
            )}

            {/* Error feedback */}
            {status === 'error' && (
              <div style={{
                marginTop: 16,
                padding: '12px 16px',
                border: '1px solid #ff3366',
                background: 'rgba(255,51,102,0.06)',
                fontFamily: 'var(--font-display)',
                fontSize: '0.6rem',
                color: '#ff3366',
                letterSpacing: '0.08em',
                textAlign: 'center',
                textShadow: '0 0 12px rgba(255,51,102,0.5)',
                animation: 'flicker 0.15s 3',
              }}>
                ✖ TRANSMISSION FAILED! SIGNAL LOST. PLEASE RETRY.
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

function TerminalInput({
  label, placeholder, value, onChange, type = 'text', required = false, disabled = false,
}: {
  label: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
  disabled?: boolean;
}) {
  const inputId = `contact-${label.toLowerCase().replace(/\s+/g, '-')}`;
  return (
    <div style={{ marginBottom: 14 }}>
      <label
        htmlFor={inputId}
        className="font-body text-xs font-semibold text-[var(--blue)] tracking-wider block mb-1"
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
        disabled={disabled}
        className="font-body text-sm md:text-base text-gray-200 leading-relaxed w-full p-3 bg-[var(--input-bg)] border border-[var(--bezel-border)] outline-none"
        style={{
          opacity: disabled ? 0.5 : 1,
          cursor: disabled ? 'not-allowed' : 'text',
        }}
      />
    </div>
  );
}

function TerminalTextarea({
  label, placeholder, value, onChange, required = false, disabled = false,
}: {
  label: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
  disabled?: boolean;
}) {
  const inputId = `contact-${label.toLowerCase().replace(/\s+/g, '-')}`;
  return (
    <div style={{ marginBottom: 14 }}>
      <label
        htmlFor={inputId}
        className="font-body text-xs font-semibold text-[var(--blue)] tracking-wider block mb-1"
      >
        {label}
      </label>
      <textarea
        id={inputId}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        rows={4}
        className="font-body text-sm md:text-base text-gray-200 leading-relaxed w-full p-3 bg-[var(--input-bg)] border border-[var(--bezel-border)] outline-none resize-y"
        style={{
          opacity: disabled ? 0.5 : 1,
          cursor: disabled ? 'not-allowed' : 'text',
        }}
      />
    </div>
  );
}
