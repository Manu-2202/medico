import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Lock } from 'lucide-react';
import SEO from '../components/SEO';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      const data = await response.json();

      if (data.success) {
        localStorage.setItem('adminToken', data.token);
        navigate('/admin/dashboard');
      } else {
        setError(data.message || 'Invalid credentials');
      }
    } catch (err) {
      setError('Unable to connect to server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8fafc' }}>
      <SEO title="Admin Login | Medico Overseas" />
      
      <div style={{ background: '#ffffff', padding: '40px', borderRadius: '16px', boxShadow: '0 10px 25px rgba(0,0,0,0.05)', width: '100%', maxWidth: '400px', border: '1px solid #e2e8f0' }}>
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <img 
            src="/logo.png" 
            alt="Medico Overseas Logo" 
            style={{ height: '60px', objectFit: 'contain', marginBottom: '16px' }}
          />
          <h1 style={{ fontSize: '24px', fontWeight: '800', color: '#0f172a', marginBottom: '6px' }}>Admin Portal</h1>
          <p style={{ color: '#64748b', fontSize: '14px', margin: 0 }}>Sign in to manage inquiries and content</p>
        </div>

        <form onSubmit={handleLogin}>
          {error && (
            <div style={{ background: '#fee2e2', color: '#b91c1c', padding: '12px', borderRadius: '8px', fontSize: '14px', marginBottom: '20px', textAlign: 'center' }}>
              {error}
            </div>
          )}
          
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#475569', marginBottom: '6px' }}>Username</label>
            <input 
              type="text" 
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none', fontSize: '15px', boxSizing: 'border-box' }}
              placeholder="Enter username"
            />
          </div>

          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#475569', marginBottom: '6px' }}>Password</label>
            <input 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none', fontSize: '15px', boxSizing: 'border-box' }}
              placeholder="Enter password"
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            style={{ 
              width: '100%', 
              padding: '14px', 
              background: 'var(--navy-primary)', 
              color: '#ffffff', 
              border: 'none', 
              borderRadius: '8px', 
              fontWeight: '700', 
              fontSize: '15px', 
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px'
            }}
          >
            {loading ? 'Authenticating...' : (
              <>
                <Lock size={16} /> Login to Dashboard
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
