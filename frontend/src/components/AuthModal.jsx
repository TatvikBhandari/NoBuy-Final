import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';

export const AuthModal = ({ isOpen, onClose, initialMode = 'login', onSuccess }) => {
  const { login, register } = useAuth();
  const [mode, setMode] = useState(initialMode);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  useEffect(() => {
    if (isOpen) {
      setMode(initialMode);
      setError('');
    }
  }, [isOpen, initialMode]);

  if (!isOpen) return null;

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (mode === 'login') {
        await login(email, password);
      } else {
        await register({ full_name: fullName, email, password, phone, address });
      }
      if (onSuccess) onSuccess();
      onClose();
    } catch (err) {
      setError(err.message || 'Authentication error');
    } finally {
      setLoading(false);
    }
  };

  const switchMode = (nextMode) => {
    setMode(nextMode);
    setError('');
  };

  return (
    <div className="auth-page-overlay" id="auth-modal-overlay" onClick={onClose}>
      <section className="auth-page" role="dialog" aria-modal="true" aria-labelledby="auth-brand-title" onClick={(event) => event.stopPropagation()}>
        <button className="auth-page-close" id="close-auth-modal" type="button" onClick={onClose} aria-label="Close sign in">×</button>

        <div className="auth-editorial">
          <div className="auth-brand-copy">
            <span className="auth-kicker">A better way to get what you need</span>
            <h1 id="auth-brand-title">NO-BUY</h1>
            <p className="auth-brand-question">Why buy when you can borrow?</p>
            <p className="auth-brand-description">Find what you need. Rent what you don't need to own.</p>
          </div>
          <figure className="auth-editorial-image">
            <img src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1600&q=85" alt="A camera ready to borrow for a day out" />
            <figcaption>Good things are better shared.</figcaption>
          </figure>
        </div>

        <div className="auth-divider" aria-hidden="true" />

        <div className="auth-form-section">
          <div className="auth-form-card">
            <div className="auth-form-heading">
              <span className="auth-kicker">Your next useful thing is closer</span>
              <h2>{mode === 'login' ? 'Welcome Back' : 'Create an account'}</h2>
              <p>{mode === 'login' ? 'Sign in to your NO-BUY account.' : 'Join NO-BUY to rent and lend locally.'}</p>
            </div>

            {error && <div className="auth-error" role="alert">{error}</div>}

            <form onSubmit={handleSubmit} id="auth-form" className="auth-form">
              {mode === 'register' && (
                <>
                  <div className="auth-field">
                    <label htmlFor="reg-name">Full name</label>
                    <input id="reg-name" type="text" autoComplete="name" placeholder="e.g. Maya Lin" value={fullName} onChange={(event) => setFullName(event.target.value)} required />
                  </div>
                  <div className="auth-field-row">
                    <div className="auth-field">
                      <label htmlFor="reg-phone">Phone <span>(optional)</span></label>
                      <input id="reg-phone" type="tel" autoComplete="tel" placeholder="+91 98765 43210" value={phone} onChange={(event) => setPhone(event.target.value)} />
                    </div>
                    <div className="auth-field">
                      <label htmlFor="reg-address">City / location</label>
                      <input id="reg-address" type="text" autoComplete="address-level2" placeholder="Bengaluru" value={address} onChange={(event) => setAddress(event.target.value)} />
                    </div>
                  </div>
                </>
              )}

              <div className="auth-field">
                <label htmlFor="auth-email">Email address</label>
                <input id="auth-email" type="email" autoComplete="email" placeholder="you@example.com" value={email} onChange={(event) => setEmail(event.target.value)} required />
              </div>
              <div className="auth-field">
                <label htmlFor="auth-password">Password</label>
                <input id="auth-password" type="password" autoComplete={mode === 'login' ? 'current-password' : 'new-password'} placeholder="At least 6 characters" value={password} onChange={(event) => setPassword(event.target.value)} required />
              </div>

              <button type="submit" id="submit-auth-btn" className="auth-submit" disabled={loading}>
                {loading ? 'Please wait…' : mode === 'login' ? 'Sign In' : 'Create Account'}
                <span aria-hidden="true">→</span>
              </button>
            </form>

            <p className="auth-mode-switch">
              {mode === 'login' ? 'New to NO-BUY?' : 'Already have an account?'}{' '}
              <button type="button" id={mode === 'login' ? 'switch-to-register' : 'switch-to-login'} onClick={() => switchMode(mode === 'login' ? 'register' : 'login')}>
                {mode === 'login' ? 'Sign Up' : 'Sign In'}
              </button>
            </p>
            <p className="auth-account-note">One account to rent and lend.</p>
          </div>
        </div>
      </section>
    </div>
  );
};
