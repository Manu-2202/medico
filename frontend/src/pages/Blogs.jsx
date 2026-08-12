import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Clock, User, ArrowRight, Eye, Sparkles, BookOpen, Calendar, Tag, Filter, X } from 'lucide-react';
import SEO from '../components/SEO';
import { useLanguage } from '../utils/languageContext';
import { defaultBlogArticles } from '../data/defaultBlogs';

const Blogs = () => {
  const { lang, t } = useLanguage();
  const [blogs, setBlogs] = useState(defaultBlogArticles);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    { label: t('catAll'), value: 'All', icon: '✨' },
    { label: t('catRussia'), value: 'Russia', icon: '🇷🇺' },
    { label: t('catGeorgia'), value: 'Georgia', icon: '🇬🇪' },
    { label: t('catKazakhstan'), value: 'Kazakhstan', icon: '🇰🇿' },
    { label: t('catUzbekistan'), value: 'Uzbekistan', icon: '🇺🇿' },
    { label: t('catKyrgyzstan'), value: 'Kyrgyzstan', icon: '🇰🇬' },
    { label: t('catArmenia'), value: 'Armenia', icon: '🇦🇲' },
    { label: t('catFmge'), value: 'FMGE', icon: '🩺' },
    { label: t('catNmat'), value: 'NMAT', icon: '📝' }
  ];

  useEffect(() => {
    fetchBlogs();
  }, [selectedCategory]);

  const fetchBlogs = async () => {
    try {
      const url = selectedCategory === 'All' ? '/api/blogs' : `/api/blogs?category=${selectedCategory}`;
      const res = await fetch(url);
      const data = await res.json();
      if (data && data.success && Array.isArray(data.data) && data.data.length > 0) {
        setBlogs(data.data);
      } else {
        const filteredFallback = selectedCategory === 'All' 
          ? defaultBlogArticles 
          : defaultBlogArticles.filter(b => b.category.toLowerCase() === selectedCategory.toLowerCase());
        setBlogs(filteredFallback.length > 0 ? filteredFallback : defaultBlogArticles);
      }
    } catch (err) {
      console.error(err);
      const filteredFallback = selectedCategory === 'All' 
        ? defaultBlogArticles 
        : defaultBlogArticles.filter(b => b.category.toLowerCase() === selectedCategory.toLowerCase());
      setBlogs(filteredFallback.length > 0 ? filteredFallback : defaultBlogArticles);
    } finally {
      setLoading(false);
    }
  };

  const filteredBlogs = blogs.filter(b => 
    b.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    b.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const featuredPost = blogs.length > 0 ? blogs[0] : null;
  const showFeaturedBanner = featuredPost && selectedCategory === 'All' && !searchTerm;
  const regularPosts = showFeaturedBanner ? filteredBlogs.filter(b => b._id !== featuredPost?._id) : filteredBlogs;

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh', paddingBottom: '32px' }}>
      <SEO 
        title="MBBS Abroad Blog 2026: NMC Guidelines, Fee Comparisons & FMGE Tips"
        description="Official Medico Overseas Blog: Latest articles on MBBS in Russia, Georgia, Kazakhstan, Uzbekistan, FMGE vs NEXT strategies, NMC Gazette rules, and medical university comparisons for Indian students."
        keywords="MBBS abroad blogs, study MBBS in Russia guide 2026, NMC guidelines for foreign medical graduates, FMGE exam strategy, Medico Overseas blog"
      />

      <style>{`
        .blog-search-input::placeholder {
          color: #64748b !important;
          opacity: 1 !important;
        }
        .blog-card-item {
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .blog-card-item:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 40px rgba(31, 56, 100, 0.12) !important;
        }
        .blog-card-item:hover .blog-card-img {
          transform: scale(1.06);
        }
        .cat-pill-btn {
          transition: all 0.2s ease;
        }
        .cat-pill-btn:hover {
          background: var(--coral-light) !important;
          color: var(--coral-accent) !important;
        }
      `}</style>
      
      {/* 1. MAGAZINE HERO HEADER */}
      <section className="hero-section" style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e3a8a 50%, #0f172a 100%)', color: '#ffffff', padding: '36px 0 32px 0', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-100px', right: '-100px', width: '450px', height: '450px', background: 'radial-gradient(circle, rgba(225, 91, 63, 0.3) 0%, transparent 70%)', pointerEvents: 'none' }}></div>
        <div style={{ position: 'absolute', bottom: '-50px', left: '-50px', width: '350px', height: '350px', background: 'radial-gradient(circle, rgba(59, 130, 246, 0.25) 0%, transparent 70%)', pointerEvents: 'none' }}></div>

        <div className="container" style={{ position: 'relative', zIndex: 5 }}>
          <div style={{ textAlign: 'center', maxWidth: '820px', margin: '0 auto' }}>
            
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(225, 91, 63, 0.18)', border: '1px solid rgba(225, 91, 63, 0.4)', padding: '6px 18px', borderRadius: '30px', color: '#ffedd5', fontSize: '13px', fontWeight: '700', marginBottom: '16px' }}>
              <BookOpen size={15} color="var(--coral-accent)" /> {t('blogJournalBadge')}
            </div>
            
            <h1 style={{ color: '#ffffff', fontSize: '44px', fontWeight: '800', marginBottom: '16px', letterSpacing: '-0.5px', lineHeight: '1.2' }}>
              {lang === 'hi' ? 'मेडिको ओवरसीज ' : 'Medico Overseas '}<span style={{ color: 'var(--coral-accent)' }}>{lang === 'hi' ? 'ब्लॉग' : 'Blog'}</span>
            </h1>

            <p style={{ color: '#cbd5e1', fontSize: '17px', lineHeight: '1.6', marginBottom: '32px', maxWidth: '720px', margin: '0 auto 32px auto' }}>
              {t('blogHubSub')}
            </p>

            {/* High-Contrast Crisp Search Bar */}
            <div style={{ maxWidth: '640px', margin: '0 auto', position: 'relative' }}>
              <div style={{ background: '#ffffff', borderRadius: '50px', padding: '6px', display: 'flex', alignItems: 'center', boxShadow: '0 12px 35px rgba(0,0,0,0.35)', border: '2px solid rgba(255,255,255,0.8)' }}>
                <div style={{ paddingLeft: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Search size={22} color="var(--coral-accent)" />
                </div>
                <input 
                  type="text" 
                  className="blog-search-input"
                  placeholder={t('blogSearchPlaceholder')}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{ width: '100%', padding: '14px 16px', borderRadius: '50px', border: 'none', color: '#0f172a', outline: 'none', fontSize: '15px', fontWeight: '500', background: 'transparent' }}
                />
                {searchTerm && (
                  <button 
                    onClick={() => setSearchTerm('')} 
                    style={{ background: '#f1f5f9', border: 'none', color: '#64748b', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', marginRight: '6px' }}
                  >
                    <X size={16} />
                  </button>
                )}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. CATEGORY PILLS BAR */}
      <section style={{ marginTop: '-26px', position: 'relative', zIndex: 20, marginBottom: '40px' }}>
        <div className="container">
          <div style={{ background: '#ffffff', padding: '14px 20px', borderRadius: '50px', boxShadow: '0 8px 30px rgba(31, 56, 100, 0.1)', border: '1px solid #e2e8f0', display: 'flex', gap: '8px', overflowX: 'auto', alignItems: 'center' }}>
            <span style={{ fontSize: '12px', fontWeight: '800', color: 'var(--navy-primary)', textTransform: 'uppercase', letterSpacing: '1px', display: 'flex', alignItems: 'center', gap: '6px', paddingRight: '12px', borderRight: '2px solid #e2e8f0', flexShrink: 0 }}>
              <Filter size={14} color="var(--coral-accent)" /> {t('blogFilterLabel')}
            </span>

            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setSelectedCategory(cat.value)}
                className="cat-pill-btn"
                style={{
                  padding: '8px 18px',
                  borderRadius: '30px',
                  fontSize: '13px',
                  fontWeight: '700',
                  whiteSpace: 'nowrap',
                  background: selectedCategory === cat.value ? 'var(--coral-accent)' : '#f8fafc',
                  color: selectedCategory === cat.value ? '#ffffff' : 'var(--navy-primary)',
                  border: selectedCategory === cat.value ? 'none' : '1px solid #e2e8f0',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  boxShadow: selectedCategory === cat.value ? '0 4px 14px rgba(225, 91, 63, 0.35)' : 'none'
                }}
              >
                <span>{cat.icon}</span> {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 3. FEATURED MASTER ARTICLE BANNER */}
      {featuredPost && selectedCategory === 'All' && !searchTerm && (
        <section style={{ marginBottom: '50px' }}>
          <div className="container">
            <div style={{ background: '#ffffff', borderRadius: '24px', overflow: 'hidden', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', boxShadow: '0 10px 30px rgba(31, 56, 100, 0.08)', border: '1px solid #e2e8f0' }}>
              
              {/* Image Column */}
              <div style={{ position: 'relative', minHeight: '300px' }}>
                <img src={featuredPost.image} alt={featuredPost.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', top: '16px', left: '16px', background: 'var(--coral-accent)', color: '#ffffff', padding: '6px 14px', borderRadius: '30px', fontSize: '11px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1px', display: 'flex', alignItems: 'center', gap: '6px', boxShadow: '0 4px 12px rgba(225,91,63,0.4)' }}>
                  <Sparkles size={14} /> {lang === 'hi' ? 'विशेष मास्टर गाइड' : 'Featured Master Guide'}
                </div>
              </div>

              {/* Content Column */}
              <div style={{ padding: '36px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px', flexWrap: 'wrap' }}>
                    <span style={{ background: 'var(--navy-primary)', color: '#ffffff', padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: '700', textTransform: 'uppercase' }}>
                      {featuredPost.category}
                    </span>
                    <span style={{ fontSize: '13px', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Clock size={14} /> {featuredPost.readTime}
                    </span>
                    <span style={{ fontSize: '13px', color: 'var(--coral-accent)', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '4px', background: 'rgba(225,91,63,0.1)', padding: '3px 10px', borderRadius: '16px' }}>
                      <Eye size={14} /> {featuredPost.views || 0} Views
                    </span>
                  </div>

                  <h2 style={{ fontSize: '26px', color: 'var(--navy-primary)', marginBottom: '14px', lineHeight: '1.3', fontWeight: '800' }}>
                    <Link to={`/blogs/${featuredPost.slug}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                      {featuredPost.title}
                    </Link>
                  </h2>

                  <p style={{ color: '#475569', fontSize: '15px', lineHeight: '1.7', marginBottom: '24px' }}>
                    {featuredPost.excerpt}
                  </p>
                </div>

                <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: 'var(--navy-primary)', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', fontSize: '13px' }}>
                      MO
                    </div>
                    <div>
                      <div style={{ fontSize: '13px', fontWeight: '700', color: 'var(--navy-primary)' }}>{featuredPost.author}</div>
                      <div style={{ fontSize: '12px', color: '#94a3b8' }}>{new Date(featuredPost.publishedAt).toLocaleDateString()}</div>
                    </div>
                  </div>

                  <Link 
                    to={`/blogs/${featuredPost.slug}`} 
                    onClick={() => window.scrollTo({ top: 0, left: 0, behavior: 'instant' })} 
                    className="btn-primary" 
                    style={{ padding: '12px 24px', fontSize: '14px', borderRadius: '30px' }}
                  >
                    {t('blogReadFull')} <ArrowRight size={16} />
                  </Link>
                </div>

              </div>

            </div>
          </div>
        </section>
      )}

      {/* 4. MAIN ARTICLES GRID */}
      <section>
        <div className="container">
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <h3 style={{ fontSize: '22px', color: 'var(--navy-primary)', fontWeight: '800', margin: 0 }}>
              {selectedCategory === 'All' ? t('blogLatestTitle') : `${selectedCategory} ${t('blogArticles')}`}
            </h3>
            <span style={{ fontSize: '14px', color: 'var(--text-muted)', fontWeight: '600' }}>
              {t('blogShowing')} {regularPosts.length} {t('blogArticles')}
            </span>
          </div>

          {loading ? (
            <div style={{ textAlign: 'center', padding: '80px', fontSize: '16px', color: 'var(--text-muted)' }}>Loading blog articles...</div>
          ) : regularPosts.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 20px', background: '#ffffff', borderRadius: '20px', boxShadow: '0 4px 20px rgba(0,0,0,0.04)', border: '1px solid #e2e8f0' }}>
              <BookOpen size={48} color="var(--coral-accent)" style={{ marginBottom: '12px' }} />
              <h3 style={{ fontSize: '20px', color: 'var(--navy-primary)', marginBottom: '8px' }}>{t('blogNoArticles')}</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '15px', marginBottom: '20px' }}>{t('blogTryDifferent')}</p>
              <button 
                onClick={() => { setSelectedCategory('All'); setSearchTerm(''); }}
                className="btn-primary"
                style={{ padding: '10px 24px', fontSize: '14px' }}
              >
                {t('blogResetBtn')}
              </button>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '30px' }}>
              {regularPosts.map((post) => (
                <article 
                  key={post._id} 
                  className="blog-card-item"
                  style={{ borderRadius: '20px', overflow: 'hidden', display: 'flex', flexDirection: 'column', background: '#ffffff', border: '1px solid #e2e8f0', boxShadow: '0 4px 15px rgba(0,0,0,0.03)' }}
                >
                  
                  {/* Card Thumbnail */}
                  <div style={{ position: 'relative', height: '210px', overflow: 'hidden' }}>
                    <img 
                      src={post.image} 
                      alt={post.title} 
                      className="blog-card-img"
                      style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }} 
                    />
                    
                    {/* Category Pill */}
                    <div style={{ position: 'absolute', top: '14px', left: '14px' }}>
                      <span style={{ background: 'rgba(15, 23, 42, 0.85)', backdropFilter: 'blur(6px)', color: '#ffffff', padding: '4px 12px', borderRadius: '20px', fontSize: '11px', fontWeight: '800', textTransform: 'uppercase', border: '1px solid rgba(255,255,255,0.2)' }}>
                        {post.category}
                      </span>
                    </div>

                    {/* Right Orange Read Time Badge (Matching Image 2) */}
                    <div style={{ position: 'absolute', top: '14px', right: '14px', background: '#E05238', color: '#ffffff', padding: '4px 12px', borderRadius: '16px', fontSize: '11px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.05em', boxShadow: '0 4px 12px rgba(225,91,63,0.35)' }}>
                      • {post.readTime || '5 MIN READ'}
                    </div>
                  </div>

                  {/* Card Body */}
                  <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', flexGrow: 1, justifyContent: 'space-between' }}>
                    <div>
                      <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Clock size={13} /> {post.readTime}</span>
                        <span>•</span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Calendar size={13} /> {new Date(post.publishedAt).toLocaleDateString()}</span>
                      </div>

                      <h3 style={{ fontSize: '18px', color: 'var(--navy-primary)', marginBottom: '10px', lineHeight: '1.4', fontWeight: '700' }}>
                        <Link 
                          to={`/blogs/${post.slug}`} 
                          onClick={() => window.scrollTo({ top: 0, left: 0, behavior: 'instant' })} 
                          style={{ color: 'inherit', textDecoration: 'none' }}
                        >
                          {post.title}
                        </Link>
                      </h3>

                      <p style={{ color: '#475569', fontSize: '14px', lineHeight: '1.6', marginBottom: '20px', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                        {post.excerpt}
                      </p>
                    </div>

                    {/* Card Footer */}
                    <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ fontSize: '12px', color: 'var(--navy-primary)', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <User size={14} color="var(--coral-accent)" /> {post.author}
                      </div>

                      <Link 
                        to={`/blogs/${post.slug}`} 
                        onClick={() => window.scrollTo({ top: 0, left: 0, behavior: 'instant' })} 
                        style={{ color: 'var(--coral-accent)', fontWeight: '800', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '4px', textDecoration: 'none' }}
                      >
                        {t('blogReadFull')} <ArrowRight size={14} />
                      </Link>
                    </div>

                  </div>

                </article>
              ))}
            </div>
          )}
        </div>
      </section>

    </div>
  );
};

export default Blogs;
