import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, UploadCloud, Key, LogOut, ShieldCheck } from 'lucide-react';
import SEO from '../components/SEO';

const AdminProfile = () => {
  const navigate = useNavigate();
  const [themeMode] = useState(() => localStorage.getItem('adminTheme') || 'dark');
  
  const themeStyles = themeMode === 'dark' ? {
    background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)',
    panelBg: 'rgba(15, 23, 42, 0.75)',
    panelBorder: 'rgba(255, 255, 255, 0.08)',
    text: '#ffffff',
    textSecondary: '#94a3b8',
    inputBg: 'rgba(15, 23, 42, 0.6)',
    inputText: '#f8fafc',
    searchBg: 'rgba(255,255,255,0.06)'
  } : {
    background: 'linear-gradient(135deg, #f0f4ff 0%, #e0e7ff 100%)',
    panelBg: 'rgba(255, 255, 255, 0.85)',
    panelBorder: 'rgba(255, 255, 255, 0.6)',
    text: '#1e293b',
    textSecondary: '#64748b',
    inputBg: 'rgba(255, 255, 255, 0.9)',
    inputText: '#0f172a',
    searchBg: 'rgba(15, 23, 42, 0.04)'
  };

  const [profileData, setProfileData] = useState({
    name: 'Admin User',
    email: 'admin@medico.com',
    photo: '',
    password: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    const storedProfile = localStorage.getItem('adminProfile');
    if (storedProfile) {
      setProfileData(prev => ({ ...prev, ...JSON.parse(storedProfile) }));
    }
  }, []);

  const handlePhotoUpload = (file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setProfileData(prev => ({ ...prev, photo: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleSave = (e) => {
    e.preventDefault();
    setMessage('');
    const { currentPassword, newPassword, confirmPassword, password } = profileData;

    if ((newPassword || confirmPassword) && newPassword !== confirmPassword) {
      setMessage('❌ New password and confirm password must match.');
      return;
    }

    if (newPassword && password && currentPassword !== password) {
      setMessage('❌ Current password is incorrect.');
      return;
    }

    const updatedProfile = {
      ...profileData,
      password: newPassword || password,
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    };

    localStorage.setItem('adminProfile', JSON.stringify({
      name: updatedProfile.name,
      email: updatedProfile.email,
      photo: updatedProfile.photo,
      password: updatedProfile.password
    }));

    setProfileData(updatedProfile);
    setMessage('✅ Profile saved successfully.');
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin');
  };

  return (
    <div style={{ minHeight: '100vh', background: themeStyles.background, color: themeStyles.text, padding: '36px 24px', fontFamily: "'Inter', sans-serif" }}>
      <SEO title="Admin Profile | Medico Overseas" />
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800&family=Inter:wght@400;500;600&display=swap');
        h1, h2, h3, button { font-family: 'Nunito', sans-serif; }
        .glass-panel { background: ${themeStyles.panelBg}; border: 1px solid ${themeStyles.panelBorder}; backdrop-filter: blur(24px); border-radius: 30px; box-shadow: 0 24px 60px rgba(0,0,0,0.1); padding: 40px; transition: all 0.3s ease; }
        .panel-input { width: 100%; border-radius: 18px; border: 1px solid ${themeStyles.panelBorder}; background: ${themeStyles.inputBg}; color: ${themeStyles.inputText}; padding: 16px 20px; font-size: 15px; outline: none; transition: all 0.2s ease; box-sizing: border-box; }
        .panel-input:focus { border-color: #fb923c; box-shadow: 0 0 0 4px rgba(251,146,60,0.15); }
        .panel-input::placeholder { color: ${themeStyles.textSecondary}; opacity: 0.7; }
        .primary-btn { border: none; background: linear-gradient(135deg, #E15B3F 0%, #fb923c 100%); color: #ffffff; padding: 18px; border-radius: 20px; font-weight: 800; font-size: 16px; cursor: pointer; transition: all 0.3s ease; box-shadow: 0 10px 25px rgba(225, 91, 63, 0.4); width: 100%; }
        .primary-btn:hover { box-shadow: 0 15px 35px rgba(225, 91, 63, 0.5); transform: translateY(-2px); }
      `}</style>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <button onClick={() => navigate('/admin/dashboard')} style={{ border: 'none', background: themeStyles.searchBg, color: themeStyles.text, padding: '12px 20px', borderRadius: '16px', display: 'inline-flex', alignItems: 'center', gap: '10px', cursor: 'pointer', marginBottom: '30px', fontWeight: 700, transition: 'transform 0.2s ease' }} onMouseOver={e => e.currentTarget.style.transform = 'translateX(-4px)'} onMouseOut={e => e.currentTarget.style.transform = 'translateX(0)'}>
          <ArrowLeft size={18} /> Back to dashboard
        </button>
        
        <div className="glass-panel">
          <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '20px', alignItems: 'center', marginBottom: '36px' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                <ShieldCheck size={28} color="#E15B3F" />
                <h1 style={{ margin: 0, fontSize: '32px' }}>Admin Profile</h1>
              </div>
              <p style={{ margin: 0, color: themeStyles.textSecondary, fontSize: '15px' }}>Update your executive account details and security credentials.</p>
            </div>
            <button onClick={handleLogout} style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)', color: '#ef4444', padding: '14px 24px', borderRadius: '18px', fontWeight: 800, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '10px', transition: 'all 0.2s ease' }} onMouseOver={e => { e.currentTarget.style.background = '#ef4444'; e.currentTarget.style.color = '#ffffff'; }} onMouseOut={e => { e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)'; e.currentTarget.style.color = '#ef4444'; }}>
              <LogOut size={18} /> Logout Session
            </button>
          </div>

          {message && (
            <div style={{ marginBottom: '24px', padding: '16px 20px', borderRadius: '16px', background: message.includes('✅') ? 'rgba(34, 197, 94, 0.12)' : 'rgba(239, 68, 68, 0.12)', color: message.includes('✅') ? '#22c55e' : '#ef4444', border: `1px solid ${message.includes('✅') ? 'rgba(34, 197, 94, 0.2)' : 'rgba(239, 68, 68, 0.2)'}`, fontWeight: 600 }}>
              {message}
            </div>
          )}

          <form onSubmit={handleSave} style={{ display: 'grid', gap: '24px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '24px', alignItems: 'center' }}>
              <div style={{ width: '130px', height: '130px', borderRadius: '32px', overflow: 'hidden', border: `2px solid ${themeStyles.panelBorder}`, background: themeStyles.searchBg, boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}>
                {profileData.photo ? (
                  <img src={profileData.photo} alt="Admin avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <div style={{ width: '100%', height: '100%', display: 'grid', placeItems: 'center', color: themeStyles.textSecondary, fontSize: '42px', fontWeight: 800 }}>
                    {profileData.name.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>
              <label style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', background: themeStyles.searchBg, border: `1px solid ${themeStyles.panelBorder}`, padding: '16px 24px', borderRadius: '20px', cursor: 'pointer', color: themeStyles.text, fontWeight: 700, transition: 'all 0.2s ease', maxWidth: 'max-content' }} onMouseOver={e => e.currentTarget.style.borderColor = '#fb923c'} onMouseOut={e => e.currentTarget.style.borderColor = themeStyles.panelBorder}>
                <UploadCloud size={20} color="#E15B3F" /> Upload New Photo
                <input type="file" accept="image/*" style={{ display: 'none' }} onChange={(e) => handlePhotoUpload(e.target.files?.[0])} />
              </label>
            </div>

            <div style={{ display: 'grid', gap: '8px' }}>
              <label style={{ color: themeStyles.textSecondary, fontWeight: 600, fontSize: '13px', marginLeft: '6px' }}>Full Name</label>
              <input
                className="panel-input"
                value={profileData.name}
                onChange={(e) => setProfileData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="E.g. Admin User"
              />
            </div>
            
            <div style={{ display: 'grid', gap: '8px' }}>
              <label style={{ color: themeStyles.textSecondary, fontWeight: 600, fontSize: '13px', marginLeft: '6px' }}>Email Address</label>
              <input
                className="panel-input"
                value={profileData.email}
                onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                placeholder="E.g. admin@medico.com"
              />
            </div>

            <div style={{ padding: '24px', borderRadius: '24px', background: themeStyles.searchBg, border: `1px dashed ${themeStyles.panelBorder}`, marginTop: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                <Key size={20} color="#E15B3F" />
                <h3 style={{ margin: 0, fontSize: '20px' }}>Security Settings</h3>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', marginBottom: '20px' }}>
                <div style={{ display: 'grid', gap: '8px' }}>
                  <label style={{ color: themeStyles.textSecondary, fontWeight: 600, fontSize: '13px', marginLeft: '6px' }}>Current Password</label>
                  <input
                    className="panel-input"
                    type="password"
                    value={profileData.currentPassword}
                    onChange={(e) => setProfileData(prev => ({ ...prev, currentPassword: e.target.value }))}
                    placeholder="Enter current password"
                  />
                </div>
                <div style={{ display: 'grid', gap: '8px' }}>
                  <label style={{ color: themeStyles.textSecondary, fontWeight: 600, fontSize: '13px', marginLeft: '6px' }}>New Password</label>
                  <input
                    className="panel-input"
                    type="password"
                    value={profileData.newPassword}
                    onChange={(e) => setProfileData(prev => ({ ...prev, newPassword: e.target.value }))}
                    placeholder="Enter new password"
                  />
                </div>
              </div>
              <div style={{ display: 'grid', gap: '8px' }}>
                <label style={{ color: themeStyles.textSecondary, fontWeight: 600, fontSize: '13px', marginLeft: '6px' }}>Confirm New Password</label>
                <input
                  className="panel-input"
                  type="password"
                  value={profileData.confirmPassword}
                  onChange={(e) => setProfileData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                  placeholder="Repeat new password"
                />
              </div>
            </div>

            <button type="submit" className="primary-btn" style={{ marginTop: '10px' }}>
              Save Profile Changes
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
