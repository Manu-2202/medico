import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, Users, BarChart3, Mail, FileText, Globe, MessageSquare, Image as ImageIcon,
  Search, Bell, RefreshCw, Download, Plus, Trash2, Edit3, LogOut, User, Key, CheckCircle2, Clock, 
  TrendingUp, Activity, Filter, ChevronLeft, ChevronRight, Printer, Shield, ArrowUpRight
} from 'lucide-react';
import { useLanguage } from '../utils/languageContext';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { lang, t } = useLanguage();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [inquiries, setInquiries] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfilePanel, setShowProfilePanel] = useState(false);
  const [loadingLeads, setLoadingLeads] = useState(true);
  const [statusFilter, setStatusFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [profileStatusMsg, setProfileStatusMsg] = useState('');

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const [profileData, setProfileData] = useState({
    name: 'Admin User',
    email: 'admin@medico.com',
    photo: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    password: ''
  });

  const [siteSettings, setSiteSettings] = useState({
    announcementText: '🔥 Admissions Open 2026-27: Get Up to ₹1 Lakh Scholarship on MBBS Abroad Seats!',
    helplinePhone: '+91 98765 43210',
    helplineEmail: 'info@medicooverseas.com',
    whatsappNumber: '919876543210',
    heroHeading: 'Your Trusted Gateway to NMC Approved MBBS Abroad',
    heroSubheading: 'Direct admissions in Top Government Medical Universities in Russia, Georgia, Kazakhstan, Uzbekistan, Philippines, Kyrgyzstan & Vietnam.',
    leadEmails: 'info@medicooverseas.com, manukamepalli8399@gmail.com'
  });
  const [settingsStatusMsg, setSettingsStatusMsg] = useState('');

  // CMS Collections
  const [blogs, setBlogs] = useState([]);
  const [newBlog, setNewBlog] = useState({
    title: '',
    category: 'Russia',
    excerpt: '',
    content: '',
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=800&q=80',
    author: 'Dr. Medico Team',
    readTime: '5 MIN READ',
    tags: 'MBBS, NMC'
  });
  const [blogStatusMsg, setBlogStatusMsg] = useState('');

  const [testimonials, setTestimonials] = useState([]);
  const [newTestimonial, setNewTestimonial] = useState({ name: '', university: '', country: 'Russia', quote: '', rating: 5 });

  const [customCountry, setCustomCountry] = useState({
    name: '',
    slug: '',
    flag: '🌍',
    tagline: '',
    overview: '',
    tuitionFee: '₹3.5 Lakhs / Year'
  });
  const [countryStatusMsg, setCountryStatusMsg] = useState('');

  // Audio chime notification for new leads on logged-in devices
  const playNotificationSound = () => {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.15);
      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.3);
    } catch (e) {}
  };

  useEffect(() => {
    fetchInquiries();
    fetchNotifications();
    fetchSiteSettings();
    fetchBlogs();
    fetchTestimonials();
    
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }

    const storedProfile = localStorage.getItem('adminProfile');
    if (storedProfile) {
      const parsed = JSON.parse(storedProfile);
      setProfileData(prev => ({ ...prev, ...parsed }));
    }
  }, []);

  // 5-second real-time polling for logged-in admin devices
  useEffect(() => {
    const interval = setInterval(() => {
      fetchInquiries(true);
      fetchNotifications();
    }, 5000);
    return () => clearInterval(interval);
  }, [inquiries.length]);

  const fetchSiteSettings = async () => {
    try {
      const res = await fetch('/api/site-settings');
      const data = await res.json();
      if (data.success) setSiteSettings(data.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchBlogs = async () => {
    try {
      const res = await fetch('/api/blogs');
      const data = await res.json();
      if (data.success) setBlogs(data.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchTestimonials = async () => {
    try {
      const res = await fetch('/api/testimonials');
      const data = await res.json();
      if (data.success) setTestimonials(data.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchInquiries = async (isPoll = false) => {
    if (!isPoll) setLoadingLeads(true);
    try {
      const res = await fetch('/api/inquiries');
      const data = await res.json();
      if (data.success) {
        if (isPoll && inquiries.length > 0 && data.data.length > inquiries.length) {
          playNotificationSound();
          const latestLead = data.data[0];
          if ('Notification' in window && Notification.permission === 'granted') {
            new Notification('🚨 New Lead Inquiry Received!', {
              body: `${latestLead.name} (${latestLead.phone}) applied for ${latestLead.country}`,
              icon: '/logo.png'
            });
          }
        }
        setInquiries(data.data);
      } else {
        setInquiries([]);
      }
    } catch (err) {
      console.error(err);
      if (!isPoll) setInquiries([]);
    } finally {
      if (!isPoll) setLoadingLeads(false);
    }
  };

  const fetchNotifications = async () => {
    try {
      const res = await fetch('/api/notifications');
      const data = await res.json();
      if (data.success) setNotifications(data.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSaveSiteSettings = async (e) => {
    e.preventDefault();
    setSettingsStatusMsg('Saving live site content and lead email recipients...');
    try {
      const res = await fetch('/api/site-settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(siteSettings)
      });
      const data = await res.json();
      if (data.success) {
        setSettingsStatusMsg('✅ Settings & recipient emails saved successfully!');
      } else {
        setSettingsStatusMsg('❌ Error saving: ' + data.message);
      }
    } catch (err) {
      setSettingsStatusMsg('❌ Server error saving settings.');
    }
  };

  const handleCreateBlog = async (e) => {
    e.preventDefault();
    setBlogStatusMsg('Publishing blog article...');
    try {
      const res = await fetch('/api/blogs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newBlog)
      });
      const data = await res.json();
      if (data.success) {
        setBlogStatusMsg('✅ Blog post published live!');
        setNewBlog({
          title: '',
          category: 'Russia',
          excerpt: '',
          content: '',
          image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=800&q=80',
          author: 'Dr. Medico Team',
          readTime: '5 MIN READ',
          tags: 'MBBS, NMC'
        });
        fetchBlogs();
      } else {
        setBlogStatusMsg('❌ ' + data.message);
      }
    } catch (err) {
      setBlogStatusMsg('❌ Server error publishing blog.');
    }
  };

  const handleDeleteBlog = async (id) => {
    if (!window.confirm('Delete this blog post?')) return;
    try {
      const res = await fetch(`/api/blogs/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) fetchBlogs();
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreateTestimonial = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/testimonials', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTestimonial)
      });
      const data = await res.json();
      if (data.success) {
        setNewTestimonial({ name: '', university: '', country: 'Russia', quote: '', rating: 5 });
        fetchTestimonials();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddCustomCountry = (e) => {
    e.preventDefault();
    if (!customCountry.name || !customCountry.slug) {
      setCountryStatusMsg('Name and Slug required.');
      return;
    }
    const slug = 'mbbs-in-' + customCountry.slug.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const newEntry = { ...customCountry, slug, country: customCountry.name };

    const saved = localStorage.getItem('custom_destinations');
    let list = saved ? JSON.parse(saved) : [];
    list.unshift(newEntry);
    localStorage.setItem('custom_destinations', JSON.stringify(list));

    setCountryStatusMsg(`✅ ${customCountry.name} page created!`);
    setCustomCountry({ name: '', slug: '', flag: '🌍', tagline: '', overview: '', tuitionFee: '₹3.5 Lakhs / Year' });
  };

  const handleDeleteInquiry = async (id) => {
    if (!window.confirm('Delete lead inquiry?')) return;
    try {
      const res = await fetch(`/api/inquiries/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        setInquiries(inquiries.filter(i => i._id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      const res = await fetch(`/api/inquiries/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      const data = await res.json();
      if (data.success) {
        setInquiries(inquiries.map(i => i._id === id ? { ...i, status: newStatus } : i));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const exportCSV = () => {
    if (inquiries.length === 0) return;
    const headers = ['ID', 'Name', 'Phone', 'Email', 'City', 'Country', 'NEET Score', 'Status', 'Date'];
    const rows = inquiries.map(i => [
      i._id,
      `"${i.name}"`,
      `"${i.phone}"`,
      `"${i.email}"`,
      `"${i.city || ''}"`,
      `"${i.country}"`,
      `"${i.neetScore || ''}"`,
      `"${i.status || 'Pending'}"`,
      `"${new Date(i.createdAt).toLocaleDateString()}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Medico_Overseas_Leads_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/');
  };

  const totalLeadsCount = inquiries.length || 24;
  const newLeads = inquiries.filter(i => (i.status || 'New') === 'New').length || 10;
  const contactedLeads = inquiries.filter(i => i.status === 'Contacted').length || 7;
  const inCounselingLeads = inquiries.filter(i => i.status === 'In Counseling').length || 5;
  const enrolledLeads = inquiries.filter(i => i.status === 'Enrolled').length || 2;

  const filteredInquiries = inquiries.filter((inq) => {
    const matchesStatus = statusFilter === 'All' || inq.status === statusFilter;
    const query = searchQuery.trim().toLowerCase();
    const matchesSearch = query === '' ||
      inq.name?.toLowerCase().includes(query) ||
      inq.phone?.toLowerCase().includes(query) ||
      inq.email?.toLowerCase().includes(query) ||
      inq.country?.toLowerCase().includes(query);
    return matchesStatus && matchesSearch;
  });

  const totalPages = Math.ceil(filteredInquiries.length / itemsPerPage) || 1;
  const paginatedInquiries = filteredInquiries.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const getCountryFlag = (countryName) => {
    const name = (countryName || '').toLowerCase();
    if (name.includes('russia')) return '🇷🇺';
    if (name.includes('georgia')) return '🇬🇪';
    if (name.includes('kyrgyzstan')) return '🇰🇬';
    if (name.includes('uzbekistan')) return '🇺🇿';
    if (name.includes('philippines')) return '🇵🇭';
    if (name.includes('kazakhstan')) return '🇰🇿';
    if (name.includes('armenia')) return '🇦🇲';
    if (name.includes('vietnam')) return '🇻🇳';
    return '🌍';
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#0b0f19', color: '#e2e8f0', fontFamily: "'Inter', sans-serif" }}>
      
      {/* 1. LEFT VERTICAL NAVIGATION SIDEBAR */}
      <aside style={{ width: '260px', background: '#111827', borderRight: '1px solid rgba(255,255,255,0.06)', display: 'flex', flexDirection: 'column', flexShrink: 0 }}>
        
        <div style={{ padding: '24px 20px', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: '800', fontSize: '18px', boxShadow: '0 4px 14px rgba(59,130,246,0.35)' }}>
            M
          </div>
          <div>
            <div style={{ color: '#ffffff', fontWeight: '800', fontSize: '16px', letterSpacing: '-0.02em' }}>Medico Overseas</div>
            <div style={{ color: '#64748b', fontSize: '11px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Executive Admin Panel</div>
          </div>
        </div>

        <nav style={{ padding: '16px 12px', display: 'flex', flexDirection: 'column', gap: '4px', flex: 1 }}>
          {[
            { id: 'dashboard', label: t('tabDashboard'), icon: LayoutDashboard },
            { id: 'leads', label: t('tabLeads'), icon: Users, badge: inquiries.length },
            { id: 'analytics', label: t('tabAnalytics'), icon: BarChart3 },
            { id: 'settings', label: t('tabSettings'), icon: Mail },
            { id: 'blogs', label: t('tabBlogs'), icon: FileText },
            { id: 'countries', label: t('tabCountries'), icon: Globe },
            { id: 'testimonials', label: t('tabTestimonials'), icon: MessageSquare }
          ].map((item) => {
            const IconComponent = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  width: '100%',
                  padding: '12px 14px',
                  borderRadius: '12px',
                  border: 'none',
                  background: isActive ? 'linear-gradient(90deg, rgba(59, 130, 246, 0.15) 0%, rgba(59, 130, 246, 0.05) 100%)' : 'transparent',
                  color: isActive ? '#3b82f6' : '#94a3b8',
                  borderLeft: isActive ? '3px solid #3b82f6' : '3px solid transparent',
                  fontWeight: isActive ? '700' : '500',
                  fontSize: '14px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <IconComponent size={18} color={isActive ? '#3b82f6' : '#64748b'} />
                  <span>{item.label}</span>
                </div>
                {item.badge !== undefined && item.badge > 0 && (
                  <span style={{ background: isActive ? '#3b82f6' : 'rgba(255,255,255,0.08)', color: isActive ? '#ffffff' : '#94a3b8', padding: '2px 8px', borderRadius: '999px', fontSize: '11px', fontWeight: '700' }}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        <div style={{ padding: '16px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '14px', padding: '12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: '34px', height: '34px', borderRadius: '50%', background: '#3b82f6', color: '#fff', display: 'grid', placeItems: 'center', fontWeight: '700', fontSize: '13px' }}>
                {profileData.name.charAt(0)}
              </div>
              <div>
                <div style={{ fontSize: '13px', fontWeight: '700', color: '#fff' }}>{profileData.name}</div>
                <div style={{ fontSize: '11px', color: '#64748b' }}>Administrator</div>
              </div>
            </div>
            <button onClick={handleLogout} title="Logout" style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', padding: '4px' }}>
              <LogOut size={16} />
            </button>
          </div>
        </div>

      </aside>

      {/* 2. MAIN CONTENT AREA */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0, overflowY: 'auto' }}>
        
        <header style={{ height: '70px', padding: '0 32px', background: '#111827', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', sticky: 'top', top: 0, zIndex: 20 }}>
          <div>
            <h1 style={{ color: '#ffffff', fontSize: '20px', fontWeight: '800', margin: 0 }}>
              {t('adminWelcome')}
            </h1>
            <p style={{ color: '#64748b', fontSize: '12px', margin: 0, marginTop: '2px' }}>
              {t('adminSub')}
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', padding: '8px 14px', borderRadius: '10px', width: '240px' }}>
              <Search size={15} color="#64748b" />
              <input 
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search leads, emails..."
                style={{ background: 'transparent', border: 'none', color: '#fff', fontSize: '13px', outline: 'none', width: '100%' }}
              />
            </div>

            <button onClick={() => setShowNotifications(!showNotifications)} style={{ position: 'relative', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '10px', padding: '9px', color: '#cbd5e1', cursor: 'pointer' }}>
              <Bell size={18} />
              {notifications.filter(n => !n.read).length > 0 && (
                <span style={{ position: 'absolute', top: '4px', right: '4px', width: '8px', height: '8px', borderRadius: '50%', background: '#ef4444' }} />
              )}
            </button>

            <button onClick={() => fetchInquiries(false)} title="Refresh Data" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '10px', padding: '9px', color: '#cbd5e1', cursor: 'pointer' }}>
              <RefreshCw size={18} />
            </button>

            <button onClick={exportCSV} className="btn-action-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '9px 16px', borderRadius: '10px', background: '#3b82f6', color: '#fff', fontWeight: '700', fontSize: '13px', border: 'none', cursor: 'pointer' }}>
              <Download size={15} /> {t('btnExportCsv')}
            </button>
          </div>
        </header>

        <div style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '28px' }}>
          
          {(activeTab === 'dashboard' || activeTab === 'analytics') && (
            <>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
                
                <div style={{ background: '#111827', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '16px', padding: '20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                    <span style={{ color: '#94a3b8', fontSize: '13px', fontWeight: '600' }}>{t('statTotalLeads')}</span>
                    <span style={{ background: 'rgba(16, 185, 129, 0.12)', color: '#10b981', padding: '4px 8px', borderRadius: '6px', fontSize: '11px', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <ArrowUpRight size={12} /> +24%
                    </span>
                  </div>
                  <div style={{ fontSize: '28px', fontWeight: '800', color: '#ffffff' }}>{totalLeadsCount}</div>
                  <div style={{ fontSize: '12px', color: '#64748b', marginTop: '4px' }}>From all website forms & bots</div>
                </div>

                <div style={{ background: '#111827', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '16px', padding: '20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                    <span style={{ color: '#94a3b8', fontSize: '13px', fontWeight: '600' }}>{t('statActiveCounseling')}</span>
                    <span style={{ background: 'rgba(59, 130, 246, 0.12)', color: '#3b82f6', padding: '4px 8px', borderRadius: '6px', fontSize: '11px', fontWeight: '700' }}>In Progress</span>
                  </div>
                  <div style={{ fontSize: '28px', fontWeight: '800', color: '#ffffff' }}>{inCounselingLeads + contactedLeads}</div>
                  <div style={{ fontSize: '12px', color: '#64748b', marginTop: '4px' }}>Contacted & in counseling</div>
                </div>

                <div style={{ background: '#111827', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '16px', padding: '20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                    <span style={{ color: '#94a3b8', fontSize: '13px', fontWeight: '600' }}>{t('statEnrolled')}</span>
                    <span style={{ background: 'rgba(168, 85, 247, 0.12)', color: '#a855f7', padding: '4px 8px', borderRadius: '6px', fontSize: '11px', fontWeight: '700' }}>Intake 2026</span>
                  </div>
                  <div style={{ fontSize: '28px', fontWeight: '800', color: '#ffffff' }}>{enrolledLeads}</div>
                  <div style={{ fontSize: '12px', color: '#64748b', marginTop: '4px' }}>Admission confirmed</div>
                </div>

                <div style={{ background: '#111827', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '16px', padding: '20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                    <span style={{ color: '#94a3b8', fontSize: '13px', fontWeight: '600' }}>{t('statAlertEmails')}</span>
                    <span style={{ background: 'rgba(245, 158, 11, 0.12)', color: '#f59e0b', padding: '4px 8px', borderRadius: '6px', fontSize: '11px', fontWeight: '700' }}>Active</span>
                  </div>
                  <div style={{ fontSize: '28px', fontWeight: '800', color: '#ffffff' }}>{(siteSettings.leadEmails || '').split(',').length}</div>
                  <div style={{ fontSize: '12px', color: '#64748b', marginTop: '4px' }}>Instant email lead dispatches</div>
                </div>

              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
                
                <div style={{ background: '#111827', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '20px', padding: '24px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <div>
                      <h3 style={{ color: '#ffffff', fontSize: '17px', fontWeight: '700', margin: 0 }}>{t('chartInquiryTrend')}</h3>
                      <p style={{ color: '#64748b', fontSize: '12px', margin: 0, marginTop: '2px' }}>Student inquiries across 2026 admissions cycle</p>
                    </div>
                    <div style={{ background: 'rgba(255,255,255,0.05)', padding: '6px 12px', borderRadius: '8px', fontSize: '12px', color: '#94a3b8', fontWeight: '600' }}>
                      2026 Intake
                    </div>
                  </div>

                  <div style={{ height: '220px', width: '100%', position: 'relative' }}>
                    <svg viewBox="0 0 500 180" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
                      <defs>
                        <linearGradient id="waveGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.4" />
                          <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.0" />
                        </linearGradient>
                      </defs>

                      <line x1="0" y1="40" x2="500" y2="40" stroke="rgba(255,255,255,0.05)" strokeDasharray="4 4" />
                      <line x1="0" y1="90" x2="500" y2="90" stroke="rgba(255,255,255,0.05)" strokeDasharray="4 4" />
                      <line x1="0" y1="140" x2="500" y2="140" stroke="rgba(255,255,255,0.05)" strokeDasharray="4 4" />

                      <path d="M 0 130 Q 80 70, 160 110 T 320 50 T 500 20 L 500 160 L 0 160 Z" fill="url(#waveGrad)" />
                      <path d="M 0 130 Q 80 70, 160 110 T 320 50 T 500 20" fill="none" stroke="#3b82f6" strokeWidth="4.5" strokeLinecap="round" />

                      {[[0,130, 'Mar'], [100,90, 'Apr'], [200,105, 'May'], [300,55, 'Jun'], [400,65, 'Jul'], [500,20, 'Aug']].map(([x, y, label], idx) => (
                        <g key={idx}>
                          <circle cx={x} cy={y} r="6" fill="#3b82f6" stroke="#111827" strokeWidth="3" />
                          <text x={x} y="176" fill="#64748b" fontSize="12" textAnchor="middle" fontWeight="600">{label}</text>
                        </g>
                      ))}
                    </svg>
                  </div>
                </div>

                <div style={{ background: '#111827', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '20px', padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <h3 style={{ color: '#ffffff', fontSize: '17px', fontWeight: '700', margin: 0 }}>{t('chartCountryShare')}</h3>
                    <p style={{ color: '#64748b', fontSize: '12px', margin: 0, marginTop: '2px' }}>Lead breakdown by destination</p>
                  </div>

                  <div style={{ position: 'relative', width: '160px', height: '160px', margin: '16px auto', display: 'grid', placeItems: 'center' }}>
                    <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%', transform: 'rotate(-90deg)' }}>
                      <circle cx="50" cy="50" r="38" fill="none" stroke="#1f2937" strokeWidth="14" />
                      <circle cx="50" cy="50" r="38" fill="none" stroke="#3b82f6" strokeWidth="14" strokeDasharray="119 238" strokeDashoffset="0" />
                      <circle cx="50" cy="50" r="38" fill="none" stroke="#10b981" strokeWidth="14" strokeDasharray="60 238" strokeDashoffset="-119" />
                      <circle cx="50" cy="50" r="38" fill="none" stroke="#f59e0b" strokeWidth="14" strokeDasharray="36 238" strokeDashoffset="-179" />
                      <circle cx="50" cy="50" r="38" fill="none" stroke="#a855f7" strokeWidth="14" strokeDasharray="24 238" strokeDashoffset="-215" />
                    </svg>
                    <div style={{ position: 'absolute', textAlign: 'center' }}>
                      <div style={{ fontSize: '20px', fontWeight: '800', color: '#fff' }}>50%</div>
                      <div style={{ fontSize: '10px', color: '#64748b', textTransform: 'uppercase', fontWeight: '700' }}>Russia Top</div>
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', fontSize: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#cbd5e1' }}>
                      <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#3b82f6' }} /> Russia (50%)
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#cbd5e1' }}>
                      <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#10b981' }} /> Georgia (25%)
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#cbd5e1' }}>
                      <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#f59e0b' }} /> Kyrgyzstan (15%)
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#cbd5e1' }}>
                      <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#a855f7' }} /> Others (10%)
                    </div>
                  </div>
                </div>

              </div>
            </>
          )}

          {(activeTab === 'dashboard' || activeTab === 'leads') && (
            <div style={{ background: '#111827', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '20px', padding: '24px' }}>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', marginBottom: '20px' }}>
                <div>
                  <h3 style={{ color: '#ffffff', fontSize: '18px', fontWeight: '800', margin: 0 }}>Inquiries & Admissions CRM</h3>
                  <p style={{ color: '#64748b', fontSize: '13px', margin: 0, marginTop: '2px' }}>Manage student lead records, update status, and track NEET scores</p>
                </div>

                <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
                  {['All', 'New', 'Contacted', 'In Counseling', 'Enrolled'].map((status) => (
                    <button
                      key={status}
                      onClick={() => { setStatusFilter(status); setCurrentPage(1); }}
                      style={{
                        padding: '8px 14px',
                        borderRadius: '10px',
                        border: '1px solid rgba(255,255,255,0.08)',
                        background: statusFilter === status ? '#3b82f6' : 'rgba(255,255,255,0.04)',
                        color: statusFilter === status ? '#ffffff' : '#94a3b8',
                        fontSize: '12px',
                        fontWeight: '700',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>

              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                      <th style={{ padding: '14px 16px', fontSize: '12px', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{t('tableHeaderStudent')}</th>
                      <th style={{ padding: '14px 16px', fontSize: '12px', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{t('tableHeaderPhone')}</th>
                      <th style={{ padding: '14px 16px', fontSize: '12px', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{t('tableHeaderDestination')}</th>
                      <th style={{ padding: '14px 16px', fontSize: '12px', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{t('tableHeaderNeet')}</th>
                      <th style={{ padding: '14px 16px', fontSize: '12px', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{t('tableHeaderStatus')}</th>
                      <th style={{ padding: '14px 16px', fontSize: '12px', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{t('tableHeaderDate')}</th>
                      <th style={{ padding: '14px 16px', fontSize: '12px', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', textAlign: 'right' }}>{t('tableHeaderActions')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loadingLeads ? (
                      <tr><td colSpan="7" style={{ padding: '32px', textAlign: 'center', color: '#64748b' }}>Loading student inquiries...</td></tr>
                    ) : paginatedInquiries.length === 0 ? (
                      <tr><td colSpan="7" style={{ padding: '32px', textAlign: 'center', color: '#64748b' }}>No leads match the selected filter.</td></tr>
                    ) : paginatedInquiries.map((inq, idx) => (
                      <tr key={inq._id || idx} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)', transition: 'background 0.2s ease' }}>
                        <td style={{ padding: '16px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'linear-gradient(135deg, #1e293b, #334155)', color: '#60a5fa', display: 'grid', placeItems: 'center', fontWeight: '700', fontSize: '14px' }}>
                              {inq.name.charAt(0)}
                            </div>
                            <div>
                              <div style={{ fontWeight: '700', color: '#ffffff', fontSize: '14px' }}>{inq.name}</div>
                              <div style={{ fontSize: '12px', color: '#64748b' }}>{inq.email}</div>
                            </div>
                          </div>
                        </td>
                        <td style={{ padding: '16px', color: '#cbd5e1', fontSize: '13px', fontWeight: '600' }}>{inq.phone}</td>
                        <td style={{ padding: '16px' }}>
                          <span style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', padding: '6px 12px', borderRadius: '8px', fontSize: '13px', color: '#e2e8f0', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                            <span>{getCountryFlag(inq.country)}</span> {inq.country}
                          </span>
                        </td>
                        <td style={{ padding: '16px', color: '#34d399', fontWeight: '700', fontSize: '13px' }}>
                          {inq.neetScore ? `${inq.neetScore} Marks` : 'N/A'}
                        </td>
                        <td style={{ padding: '16px' }}>
                          <select
                            value={inq.status || 'New'}
                            onChange={e => handleStatusChange(inq._id, e.target.value)}
                            style={{
                              background: inq.status === 'Enrolled' ? 'rgba(16, 185, 129, 0.15)' : inq.status === 'In Counseling' ? 'rgba(168, 85, 247, 0.15)' : inq.status === 'Contacted' ? 'rgba(245, 158, 11, 0.15)' : 'rgba(59, 130, 246, 0.15)',
                              color: inq.status === 'Enrolled' ? '#10b981' : inq.status === 'In Counseling' ? '#a855f7' : inq.status === 'Contacted' ? '#f59e0b' : '#3b82f6',
                              border: 'none',
                              padding: '8px 12px',
                              borderRadius: '8px',
                              fontWeight: '700',
                              fontSize: '12px',
                              outline: 'none',
                              cursor: 'pointer'
                            }}
                          >
                            <option value="New" style={{ background: '#111827', color: '#3b82f6' }}>New Inquiry</option>
                            <option value="Contacted" style={{ background: '#111827', color: '#f59e0b' }}>Contacted</option>
                            <option value="In Counseling" style={{ background: '#111827', color: '#a855f7' }}>In Counseling</option>
                            <option value="Enrolled" style={{ background: '#111827', color: '#10b981' }}>Enrolled</option>
                            <option value="Archived" style={{ background: '#111827', color: '#94a3b8' }}>Archived</option>
                          </select>
                        </td>
                        <td style={{ padding: '16px', color: '#64748b', fontSize: '12px' }}>
                          {new Date(inq.createdAt || Date.now()).toLocaleDateString()}
                        </td>
                        <td style={{ padding: '16px', textAlign: 'right' }}>
                          <button onClick={() => handleDeleteInquiry(inq._id)} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', padding: '6px' }} title="Delete Lead">
                            <Trash2 size={16} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px', paddingTop: '16px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                <div style={{ fontSize: '13px', color: '#64748b' }}>
                  Page {currentPage} of {totalPages} ({filteredInquiries.length} Total Leads)
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button 
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px', padding: '8px 14px', color: currentPage === 1 ? '#475569' : '#fff', cursor: currentPage === 1 ? 'not-allowed' : 'pointer', fontSize: '12px', fontWeight: '600' }}
                  >
                    Previous
                  </button>
                  <button 
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px', padding: '8px 14px', color: currentPage === totalPages ? '#475569' : '#fff', cursor: currentPage === totalPages ? 'not-allowed' : 'pointer', fontSize: '12px', fontWeight: '600' }}
                  >
                    Next
                  </button>
                </div>
              </div>

            </div>
          )}

          {/* TAB 3: LEAD NOTIFICATION EMAILS & SITE SETTINGS CMS */}
          {activeTab === 'settings' && (
            <div style={{ background: '#111827', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '20px', padding: '28px', maxWidth: '850px' }}>
              <div style={{ marginBottom: '24px' }}>
                <span style={{ color: '#3b82f6', fontSize: '12px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Email Alerts CMS</span>
                <h2 style={{ color: '#ffffff', fontSize: '24px', margin: 0, marginTop: '4px' }}>Lead Notification Recipient Emails</h2>
                <p style={{ color: '#64748b', fontSize: '13px', marginTop: '4px' }}>Configure team email addresses to automatically receive instant HTML lead dispatches whenever a student form is submitted.</p>
              </div>

              {settingsStatusMsg && (
                <div style={{ padding: '14px', borderRadius: '12px', background: 'rgba(16, 185, 129, 0.12)', border: '1px solid rgba(16, 185, 129, 0.2)', color: '#a7f3d0', fontSize: '14px', fontWeight: '600', marginBottom: '20px' }}>
                  {settingsStatusMsg}
                </div>
              )}

              {/* SMTP Configuration Guide Card */}
              <div style={{ background: 'rgba(245, 158, 11, 0.08)', border: '1px solid rgba(245, 158, 11, 0.25)', borderRadius: '14px', padding: '18px', marginBottom: '24px', color: '#fef08a', fontSize: '13px', lineHeight: '1.6' }}>
                <div style={{ fontWeight: '800', color: '#fbbf24', fontSize: '14px', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span>⚙️</span> How to Receive Real Inbox Emails at {siteSettings.leadEmails ? siteSettings.leadEmails.split(',')[0] : 'your email'}:
                </div>
                <p style={{ margin: 0, color: '#fef3c7' }}>
                  To deliver real emails directly into your Gmail/Outlook inbox, configure your sending credentials in <code>backend/.env</code>:
                </p>
                <div style={{ background: '#0b0f19', padding: '10px 14px', borderRadius: '8px', fontFamily: 'monospace', color: '#38bdf8', marginTop: '8px', fontSize: '12px' }}>
                  SMTP_HOST=smtp.gmail.com<br />
                  SMTP_USER=your_gmail_address@gmail.com<br />
                  SMTP_PASS=your_gmail_app_password
                </div>
                <p style={{ margin: 0, marginTop: '8px', color: '#fef3c7', fontSize: '12px' }}>
                  💡 <i>In-app real-time desktop & bell notifications are ACTIVE automatically on all logged-in admin devices.</i>
                </p>
              </div>

              <form onSubmit={handleSaveSiteSettings} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div style={{ background: 'rgba(59, 130, 246, 0.08)', border: '1px solid rgba(59, 130, 246, 0.2)', borderRadius: '14px', padding: '20px' }}>
                  <label style={{ display: 'block', color: '#60a5fa', fontWeight: '700', fontSize: '14px', marginBottom: '6px' }}>
                    📧 Lead Recipient Email Address(es) *
                  </label>
                  <p style={{ color: '#94a3b8', fontSize: '12px', marginBottom: '12px' }}>Enter comma-separated emails. Every new student inquiry will alert all listed addresses immediately.</p>
                  <input
                    value={siteSettings.leadEmails || ''}
                    onChange={e => setSiteSettings({ ...siteSettings, leadEmails: e.target.value })}
                    placeholder="info@medicooverseas.com, manukamepalli8399@gmail.com"
                    style={{ width: '100%', background: '#0b0f19', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', padding: '12px 14px', color: '#fff', fontSize: '14px', outline: 'none' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', color: '#cbd5e1', fontWeight: '600', fontSize: '13px', marginBottom: '6px' }}>Top Notice Banner Text</label>
                  <input
                    value={siteSettings.announcementText}
                    onChange={e => setSiteSettings({ ...siteSettings, announcementText: e.target.value })}
                    style={{ width: '100%', background: '#0b0f19', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', padding: '12px 14px', color: '#fff', fontSize: '14px', outline: 'none' }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', color: '#cbd5e1', fontWeight: '600', fontSize: '13px', marginBottom: '6px' }}>Helpline Phone</label>
                    <input
                      value={siteSettings.helplinePhone}
                      onChange={e => setSiteSettings({ ...siteSettings, helplinePhone: e.target.value })}
                      style={{ width: '100%', background: '#0b0f19', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', padding: '12px 14px', color: '#fff', fontSize: '14px', outline: 'none' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', color: '#cbd5e1', fontWeight: '600', fontSize: '13px', marginBottom: '6px' }}>Helpline Email</label>
                    <input
                      value={siteSettings.helplineEmail}
                      onChange={e => setSiteSettings({ ...siteSettings, helplineEmail: e.target.value })}
                      style={{ width: '100%', background: '#0b0f19', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', padding: '12px 14px', color: '#fff', fontSize: '14px', outline: 'none' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', color: '#cbd5e1', fontWeight: '600', fontSize: '13px', marginBottom: '6px' }}>WhatsApp Number</label>
                    <input
                      value={siteSettings.whatsappNumber}
                      onChange={e => setSiteSettings({ ...siteSettings, whatsappNumber: e.target.value })}
                      style={{ width: '100%', background: '#0b0f19', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', padding: '12px 14px', color: '#fff', fontSize: '14px', outline: 'none' }}
                    />
                  </div>
                </div>

                <button type="submit" style={{ padding: '14px 24px', borderRadius: '10px', background: '#3b82f6', color: '#fff', fontWeight: '700', border: 'none', cursor: 'pointer', width: 'fit-content' }}>
                  Save Live Settings & Emails
                </button>
              </form>
            </div>
          )}

          {/* TAB 4: BLOGS CMS */}
          {activeTab === 'blogs' && (
            <div style={{ background: '#111827', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '20px', padding: '28px' }}>
              <div style={{ marginBottom: '24px' }}>
                <span style={{ color: '#3b82f6', fontSize: '12px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.1em' }}>MERN Blog Publisher</span>
                <h2 style={{ color: '#ffffff', fontSize: '24px', margin: 0, marginTop: '4px' }}>Publish New Medical Blog & Guide</h2>
                <p style={{ color: '#64748b', fontSize: '13px', marginTop: '4px' }}>Fill in all blog card fields. The live output card preview on the right shows exactly how it will appear to students on the website.</p>
              </div>

              {blogStatusMsg && (
                <div style={{ padding: '12px 16px', borderRadius: '12px', background: 'rgba(16, 185, 129, 0.12)', border: '1px solid rgba(16, 185, 129, 0.2)', color: '#a7f3d0', fontSize: '13px', fontWeight: '600', marginBottom: '24px' }}>
                  {blogStatusMsg}
                </div>
              )}

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '32px', marginBottom: '40px' }}>
                
                {/* Left Column: Input Form Fields */}
                <form onSubmit={handleCreateBlog} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', color: '#cbd5e1', fontSize: '12px', fontWeight: '700', marginBottom: '6px' }}>
                      📌 Blog Title *
                    </label>
                    <input 
                      placeholder="e.g. Complete Guide to MBBS in Russia 2026: Fees & NMC Rules" 
                      required 
                      value={newBlog.title} 
                      onChange={e => setNewBlog({...newBlog, title: e.target.value})} 
                      style={{ width: '100%', background: '#0b0f19', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', padding: '12px 14px', color: '#fff', fontSize: '14px', outline: 'none' }} 
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                    <div>
                      <label style={{ display: 'block', color: '#cbd5e1', fontSize: '12px', fontWeight: '700', marginBottom: '6px' }}>
                        🏷️ Category Tag *
                      </label>
                      <select 
                        value={newBlog.category} 
                        onChange={e => setNewBlog({...newBlog, category: e.target.value})} 
                        style={{ width: '100%', background: '#0b0f19', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', padding: '12px 14px', color: '#fff', fontSize: '13px', outline: 'none' }}
                      >
                        <option value="Russia">🇷🇺 Russia</option>
                        <option value="Georgia">🇬🇪 Georgia</option>
                        <option value="Kazakhstan">🇰🇿 Kazakhstan</option>
                        <option value="Uzbekistan">🇺🇿 Uzbekistan</option>
                        <option value="Kyrgyzstan">🇰🇬 Kyrgyzstan</option>
                        <option value="Armenia">🇦🇲 Armenia</option>
                        <option value="Vietnam">🇻🇳 Vietnam</option>
                        <option value="Entrance Exams">🩺 Entrance Exams (FMGE/NMAT)</option>
                        <option value="NMC Rules">📜 NMC Rules & Gazette</option>
                        <option value="General Guide">💡 General Guide</option>
                      </select>
                    </div>

                    <div>
                      <label style={{ display: 'block', color: '#cbd5e1', fontSize: '12px', fontWeight: '700', marginBottom: '6px' }}>
                        ⏱️ Read Time Badge *
                      </label>
                      <input 
                        placeholder="e.g. 5 MIN READ" 
                        required 
                        value={newBlog.readTime || '5 MIN READ'} 
                        onChange={e => setNewBlog({...newBlog, readTime: e.target.value})} 
                        style={{ width: '100%', background: '#0b0f19', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', padding: '12px 14px', color: '#fff', fontSize: '13px', outline: 'none' }} 
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', color: '#cbd5e1', fontSize: '12px', fontWeight: '700', marginBottom: '6px' }}>
                      🖼️ Featured Image URL *
                    </label>
                    <input 
                      placeholder="https://images.unsplash.com/..." 
                      required 
                      value={newBlog.image || ''} 
                      onChange={e => setNewBlog({...newBlog, image: e.target.value})} 
                      style={{ width: '100%', background: '#0b0f19', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', padding: '12px 14px', color: '#fff', fontSize: '13px', outline: 'none' }} 
                    />
                    <div style={{ display: 'flex', gap: '6px', marginTop: '8px', flexWrap: 'wrap' }}>
                      <span style={{ fontSize: '11px', color: '#64748b' }}>Quick Photos:</span>
                      {[
                        { name: 'Doctors', url: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=800&q=80' },
                        { name: 'Students', url: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80' },
                        { name: 'Campus', url: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=800&q=80' },
                        { name: 'Stethoscope', url: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80' }
                      ].map((preset, pIdx) => (
                        <button
                          key={pIdx}
                          type="button"
                          onClick={() => setNewBlog({ ...newBlog, image: preset.url })}
                          style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '6px', color: '#60a5fa', padding: '2px 8px', fontSize: '11px', cursor: 'pointer' }}
                        >
                          {preset.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                    <div>
                      <label style={{ display: 'block', color: '#cbd5e1', fontSize: '12px', fontWeight: '700', marginBottom: '6px' }}>
                        ✍️ Author Name *
                      </label>
                      <input 
                        placeholder="Dr. Medico Team" 
                        required 
                        value={newBlog.author || 'Dr. Medico Team'} 
                        onChange={e => setNewBlog({...newBlog, author: e.target.value})} 
                        style={{ width: '100%', background: '#0b0f19', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', padding: '12px 14px', color: '#fff', fontSize: '13px', outline: 'none' }} 
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', color: '#cbd5e1', fontSize: '12px', fontWeight: '700', marginBottom: '6px' }}>
                        🏷️ Tags (comma-separated)
                      </label>
                      <input 
                        placeholder="MBBS, NMC, Russia, Fees" 
                        value={newBlog.tags || 'MBBS, NMC'} 
                        onChange={e => setNewBlog({...newBlog, tags: e.target.value})} 
                        style={{ width: '100%', background: '#0b0f19', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', padding: '12px 14px', color: '#fff', fontSize: '13px', outline: 'none' }} 
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', color: '#cbd5e1', fontSize: '12px', fontWeight: '700', marginBottom: '6px' }}>
                      📄 Short Excerpt / Summary *
                    </label>
                    <textarea 
                      placeholder="Brief 2-sentence summary displayed on the blog card..." 
                      rows="2" 
                      required 
                      value={newBlog.excerpt} 
                      onChange={e => setNewBlog({...newBlog, excerpt: e.target.value})} 
                      style={{ width: '100%', background: '#0b0f19', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', padding: '12px 14px', color: '#fff', fontSize: '13px', outline: 'none' }} 
                    ></textarea>
                  </div>

                  <div>
                    <label style={{ display: 'block', color: '#cbd5e1', fontSize: '12px', fontWeight: '700', marginBottom: '6px' }}>
                      📝 Full Article Body (HTML / Text) *
                    </label>
                    <textarea 
                      placeholder="Write full article body text..." 
                      rows="4" 
                      required 
                      value={newBlog.content} 
                      onChange={e => setNewBlog({...newBlog, content: e.target.value})} 
                      style={{ width: '100%', background: '#0b0f19', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', padding: '12px 14px', color: '#fff', fontSize: '13px', outline: 'none' }} 
                    ></textarea>
                  </div>

                  <button type="submit" style={{ background: '#3b82f6', color: '#fff', border: 'none', padding: '14px 24px', borderRadius: '10px', fontWeight: '700', fontSize: '14px', cursor: 'pointer', width: 'fit-content', marginTop: '8px' }}>
                    Publish Article Live
                  </button>
                </form>

                {/* Right Column: Live Output Card Preview (Exact Match to Image 2) */}
                <div>
                  <div style={{ color: '#94a3b8', fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981' }} /> Live Output Card Preview
                  </div>

                  <div style={{ background: '#ffffff', borderRadius: '16px', border: '1px solid #e2e8f0', overflow: 'hidden', boxShadow: '0 12px 30px rgba(0, 0, 0, 0.15)', color: '#0f172a', transition: 'all 0.3s ease' }}>
                    
                    {/* Top Image Banner with Badges (Matching Image 2) */}
                    <div style={{ position: 'relative', width: '100%', height: '180px', background: '#0f172a', overflow: 'hidden' }}>
                      <img 
                        src={newBlog.image || 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=800&q=80'} 
                        alt="Blog preview" 
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                        onError={e => { e.target.src = 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80'; }}
                      />
                      
                      {/* Left Dark Badge */}
                      <span style={{ position: 'absolute', top: '12px', left: '12px', background: '#0f172a', color: '#ffffff', padding: '4px 10px', borderRadius: '6px', fontSize: '11px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        {newBlog.category || 'RUSSIA'}
                      </span>

                      {/* Right Orange Read Time Badge */}
                      <span style={{ position: 'absolute', top: '12px', right: '12px', background: '#E05238', color: '#ffffff', padding: '4px 10px', borderRadius: '16px', fontSize: '11px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        • {newBlog.readTime || '5 MIN READ'}
                      </span>
                    </div>

                    {/* Card Body */}
                    <div style={{ padding: '20px' }}>
                      <h4 style={{ color: '#0f172a', fontSize: '17px', fontWeight: '800', lineHeight: '1.4', marginBottom: '8px' }}>
                        {newBlog.title || 'Sample Blog Title Appears Here'}
                      </h4>

                      <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span>By {newBlog.author || 'Dr. Medico Team'}</span> • <span>{new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                      </div>

                      <p style={{ color: '#475569', fontSize: '13px', lineHeight: '1.6', marginBottom: '16px' }}>
                        {newBlog.excerpt || 'Short excerpt/summary of the blog post will be rendered right here for the user.'}
                      </p>

                      <div style={{ color: '#E05238', fontWeight: '700', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        Read Full Article →
                      </div>
                    </div>

                  </div>
                </div>

              </div>

              {/* Published Articles List */}
              <h3 style={{ color: '#fff', fontSize: '18px', marginBottom: '14px', marginTop: '20px' }}>Published Articles ({blogs.length})</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {blogs.map(b => (
                  <div key={b._id || b.slug} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 18px', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.06)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <img src={b.image || 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=200&q=80'} alt="" style={{ width: '48px', height: '48px', borderRadius: '8px', objectFit: 'cover' }} />
                      <div>
                        <div style={{ color: '#fff', fontWeight: '700', fontSize: '14px' }}>{b.title}</div>
                        <div style={{ color: '#64748b', fontSize: '12px' }}>Category: {b.category || 'General'} | /blogs/{b.slug}</div>
                      </div>
                    </div>
                    <button onClick={() => handleDeleteBlog(b._id)} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', padding: '8px' }} title="Delete Article">
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'countries' && (
            <div style={{ background: '#111827', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '20px', padding: '28px', maxWidth: '750px' }}>
              <h2 style={{ color: '#ffffff', fontSize: '22px', fontWeight: '800', marginBottom: '20px' }}>Expandable Destinations CMS</h2>
              {countryStatusMsg && <div style={{ color: '#34d399', marginBottom: '16px', fontWeight: '600' }}>{countryStatusMsg}</div>}
              <form onSubmit={handleAddCustomCountry} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <input placeholder="Country Name (e.g. Poland)" required value={customCountry.name} onChange={e => setCustomCountry({...customCountry, name: e.target.value})} style={{ background: '#0b0f19', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', padding: '12px', color: '#fff' }} />
                <input placeholder="URL Slug (e.g. poland)" required value={customCountry.slug} onChange={e => setCustomCountry({...customCountry, slug: e.target.value})} style={{ background: '#0b0f19', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', padding: '12px', color: '#fff' }} />
                <textarea placeholder="Overview details..." rows="4" value={customCountry.overview} onChange={e => setCustomCountry({...customCountry, overview: e.target.value})} style={{ background: '#0b0f19', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', padding: '12px', color: '#fff' }}></textarea>
                <button type="submit" style={{ background: '#3b82f6', color: '#fff', border: 'none', padding: '12px 20px', borderRadius: '10px', fontWeight: '700', width: 'fit-content', cursor: 'pointer' }}>Create Country Page</button>
              </form>
            </div>
          )}

          {activeTab === 'testimonials' && (
            <div style={{ background: '#111827', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '20px', padding: '28px', maxWidth: '750px' }}>
              <h2 style={{ color: '#ffffff', fontSize: '22px', fontWeight: '800', marginBottom: '20px' }}>Student Testimonials CMS</h2>
              <form onSubmit={handleCreateTestimonial} style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
                <input placeholder="Student Name" required value={newTestimonial.name} onChange={e => setNewTestimonial({...newTestimonial, name: e.target.value})} style={{ background: '#0b0f19', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', padding: '12px', color: '#fff' }} />
                <input placeholder="University Name" required value={newTestimonial.university} onChange={e => setNewTestimonial({...newTestimonial, university: e.target.value})} style={{ background: '#0b0f19', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', padding: '12px', color: '#fff' }} />
                <textarea placeholder="Review quote..." required value={newTestimonial.quote} onChange={e => setNewTestimonial({...newTestimonial, quote: e.target.value})} style={{ background: '#0b0f19', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', padding: '12px', color: '#fff' }}></textarea>
                <button type="submit" style={{ background: '#3b82f6', color: '#fff', border: 'none', padding: '12px 20px', borderRadius: '10px', fontWeight: '700', width: 'fit-content', cursor: 'pointer' }}>Add Testimonial</button>
              </form>
            </div>
          )}

        </div>

      </main>

    </div>
  );
};

export default AdminDashboard;
