import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Clock, User, Calendar, Share2, ArrowLeft, GraduationCap, Eye, Sparkles, CheckCircle2, MessageCircle, Send, Bookmark, BookOpen, ShieldCheck, Copy, Check } from 'lucide-react';
import SEO from '../components/SEO';
import { defaultBlogArticles } from '../data/defaultBlogs';

const BlogPost = ({ onRequestCounselling }) => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [copied, setCopied] = useState(false);

  // Sidebar form state
  const [quickForm, setQuickForm] = useState({ name: '', phone: '', country: 'Russia' });
  const [quickSubmitted, setQuickSubmitted] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    setLoading(true);

    const fallbackPost = defaultBlogArticles.find(b => b.slug === slug) || defaultBlogArticles[0];
    const fallbackRelated = defaultBlogArticles.filter(b => b.slug !== fallbackPost.slug).slice(0, 3);

    fetch(`/api/blogs/${slug}`)
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data) {
          setPost(data.data);
          fetch(`/api/blogs?category=${data.data.category}`)
            .then(r => r.json())
            .then(res => {
              if (res.success && res.data && res.data.length > 0) {
                setRelatedPosts(res.data.filter(b => b._id !== data.data._id).slice(0, 3));
              } else {
                setRelatedPosts(fallbackRelated);
              }
            })
            .catch(() => setRelatedPosts(fallbackRelated));
        } else {
          setPost(fallbackPost);
          setRelatedPosts(fallbackRelated);
        }
      })
      .catch(() => {
        setPost(fallbackPost);
        setRelatedPosts(fallbackRelated);
      })
      .finally(() => setLoading(false));
  }, [slug]);

  // Scroll Progress Bar Tracker
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress((window.scrollY / totalHeight) * 100);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleQuickSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...quickForm, email: 'not-provided@sidebar.com', message: `Inquired from blog article: ${post?.title}`, sourcePage: window.location.pathname })
      });
      const data = await res.json();
      if (data.success) {
        setQuickSubmitted(true);
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#f8fafc' }}>
        <div style={{ width: '48px', height: '48px', borderRadius: '50%', border: '4px solid #e2e8f0', borderTopColor: 'var(--coral-accent)', animation: 'spin 1s linear infinite' }}></div>
        <p style={{ marginTop: '16px', color: 'var(--navy-primary)', fontWeight: '700', fontSize: '16px' }}>Loading Article Insights...</p>
        <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  if (!post) {
    return (
      <div style={{ textAlign: 'center', padding: '120px 20px', background: '#f8fafc', minHeight: '70vh' }}>
        <h2 style={{ fontSize: '28px', color: 'var(--navy-primary)', marginBottom: '12px' }}>Article Not Found</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '24px' }}>The medical guide you are looking for may have been moved or updated.</p>
        <Link to="/blogs" className="btn-primary">Browse All Articles</Link>
      </div>
    );
  }

  const shareText = encodeURIComponent(`Check out this medical guide on Medico Overseas: "${post.title}"\n\nRead here: ${window.location.href}`);
  const whatsappShareUrl = `https://api.whatsapp.com/send?text=${shareText}`;
  const whatsappInquireUrl = `https://wa.me/919876543210?text=${encodeURIComponent(`Hello Medico Overseas! I am reading "${post.title}" and want to inquire about MBBS admission.`)}`;

  const blogSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    'headline': post.title,
    'description': post.excerpt,
    'image': post.image,
    'author': {
      '@type': 'Person',
      'name': post.author || 'Dr. A. K. Sharma (Senior Counselor)'
    },
    'publisher': {
      '@type': 'EducationalOrganization',
      'name': 'Medico Overseas',
      'logo': {
        '@type': 'ImageObject',
        'url': window.location.origin + '/logo.png'
      }
    },
    'datePublished': post.publishedAt
  };

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh', paddingBottom: '90px' }}>
      <SEO 
        title={post.title}
        description={post.excerpt}
        keywords={`${post.category}, MBBS abroad, ${post.title}, Medico Overseas`}
        ogType="article"
        ogImage={post.image}
        schemaJson={blogSchema}
      />

      {/* Top Reading Progress Bar */}
      <div style={{ position: 'fixed', top: 0, left: 0, height: '4px', background: 'linear-gradient(90deg, #E15B3F, #25D366)', width: `${scrollProgress}%`, zIndex: 9999, transition: 'width 0.1s linear' }}></div>

      {/* Premium Magazine Hero Header */}
      <section style={{ background: 'linear-gradient(135deg, #0b132b 0%, #1F3864 60%, #1e293b 100%)', color: '#ffffff', padding: '60px 0 50px 0', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-100px', right: '-100px', width: '450px', height: '450px', background: 'radial-gradient(circle, rgba(225, 91, 63, 0.22) 0%, transparent 70%)', pointerEvents: 'none' }}></div>

        <div className="container">
          <div style={{ maxWidth: '960px', margin: '0 auto' }}>
            
            {/* Back Button & Category Pills */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px', marginBottom: '24px' }}>
              <Link to="/blogs" style={{ color: 'var(--coral-accent)', display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '14px', fontWeight: '700', textDecoration: 'none', background: 'rgba(255,255,255,0.08)', padding: '6px 14px', borderRadius: '20px', backdropFilter: 'blur(6px)' }}>
                <ArrowLeft size={16} /> Back to Blogs
              </Link>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                <span className="badge-coral" style={{ background: 'rgba(225,91,63,0.2)', border: '1px solid rgba(225,91,63,0.4)' }}>
                  <Bookmark size={12} /> {post.category}
                </span>
                <span style={{ fontSize: '12px', color: '#cbd5e1', display: 'flex', alignItems: 'center', gap: '4px', background: 'rgba(255,255,255,0.1)', padding: '4px 12px', borderRadius: '20px' }}>
                  <Clock size={13} color="var(--coral-accent)" /> {post.readTime || '5 min read'}
                </span>
                <span style={{ fontSize: '12px', color: '#34d399', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '4px', background: 'rgba(16, 185, 129, 0.15)', padding: '4px 12px', borderRadius: '20px' }}>
                  <Eye size={13} /> {post.views ? post.views.toLocaleString() : '1,420'} Views
                </span>
              </div>
            </div>

            {/* Article Main Title */}
            <h1 style={{ color: '#ffffff', fontSize: '38px', fontWeight: '800', lineHeight: '1.25', marginBottom: '20px', letterSpacing: '-0.5px' }}>
              {post.title}
            </h1>

            {/* Author & Published Date Bar */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px', fontSize: '14px', color: '#cbd5e1', paddingTop: '16px', borderTop: '1px solid rgba(255,255,255,0.1)', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'linear-gradient(135deg, #E15B3F, #1F3864)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', color: '#ffffff', border: '2px solid #ffffff' }}>
                  MO
                </div>
                <div>
                  <div style={{ color: '#ffffff', fontWeight: '700', fontSize: '14px' }}>{post.author || 'Dr. A. K. Sharma (Senior Counselor)'}</div>
                  <div style={{ fontSize: '11px', color: '#94a3b8' }}>Medical Education Specialist</div>
                </div>
              </div>

              <span style={{ color: 'rgba(255,255,255,0.3)' }}>•</span>

              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Calendar size={15} color="var(--coral-accent)" /> {new Date(post.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </div>

              <span style={{ color: 'rgba(255,255,255,0.3)' }}>•</span>

              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#34d399', fontWeight: '600' }}>
                <ShieldCheck size={16} /> NMC 2021 Gazette Verified
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Main Content & Sidebar Grid Container */}
      <section style={{ padding: '50px 0' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '40px', alignItems: 'start' }}>
            
            {/* Main Article Content Column (Left Side) */}
            <div style={{ minWidth: 0 }}>
              <div style={{ background: '#ffffff', borderRadius: '24px', padding: '36px', boxShadow: 'var(--shadow-sm)', border: '1px solid #e2e8f0' }}>
                
                {/* Hero Featured Cover Image */}
                <div style={{ position: 'relative', borderRadius: '18px', overflow: 'hidden', marginBottom: '32px', boxShadow: '0 12px 30px rgba(0,0,0,0.1)' }}>
                  <img src={post.image} alt={post.title} style={{ width: '100%', maxHeight: '440px', objectFit: 'cover' }} />
                  <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'linear-gradient(to top, rgba(15,23,42,0.8), transparent)', padding: '20px', color: '#ffffff', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <BookOpen size={16} color="var(--coral-accent)" /> Authoritative Guide for Indian Medical Aspirants
                  </div>
                </div>

                {/* Key Takeaways Highlight Box */}
                <div style={{ background: 'linear-gradient(135deg, #f0fdf4, #e0f2fe)', border: '1px solid #bae6fd', padding: '24px', borderRadius: '16px', marginBottom: '32px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '800', color: 'var(--navy-primary)', fontSize: '16px', marginBottom: '10px' }}>
                    <Sparkles size={20} color="var(--coral-accent)" /> Executive Key Takeaways:
                  </div>
                  <p style={{ margin: 0, fontSize: '15px', color: '#1e293b', lineHeight: '1.7', fontWeight: '500' }}>
                    {post.excerpt}
                  </p>
                </div>

                {/* Article Body Text */}
                <div 
                  className="article-body-content"
                  style={{ fontSize: '16.5px', color: '#334155', lineHeight: '1.85', letterSpacing: '0.1px' }}
                  dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br/>') }}
                />

                {/* Dedicated Action Box: Share & Contact */}
                <div style={{ marginTop: '48px', paddingTop: '28px', borderTop: '2px dashed #e2e8f0' }}>
                  <div style={{ fontSize: '16px', fontWeight: '800', color: 'var(--navy-primary)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Share2 size={18} color="var(--coral-accent)" /> Share or Inquire About This Guide
                  </div>

                  <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
                    
                    {/* Share on WhatsApp Button */}
                    <a 
                      href={whatsappShareUrl}
                      target="_blank"
                      rel="noreferrer"
                      style={{ background: '#25D366', color: '#ffffff', padding: '12px 24px', borderRadius: '30px', fontWeight: '800', fontSize: '14px', display: 'inline-flex', alignItems: 'center', gap: '8px', boxShadow: '0 6px 18px rgba(37, 211, 102, 0.35)', textDecoration: 'none', transition: 'all 0.25s' }}
                    >
                      <MessageCircle size={18} fill="#ffffff" /> Share on WhatsApp
                    </a>

                    {/* Ask Counselor on WhatsApp Button */}
                    <a 
                      href={whatsappInquireUrl}
                      target="_blank"
                      rel="noreferrer"
                      style={{ background: '#128C7E', color: '#ffffff', padding: '12px 24px', borderRadius: '30px', fontWeight: '800', fontSize: '14px', display: 'inline-flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}
                    >
                      💬 Ask Counselor via WhatsApp
                    </a>

                    {/* Copy Link Button */}
                    <button 
                      onClick={handleCopyLink}
                      style={{ background: '#f1f5f9', color: 'var(--navy-primary)', padding: '12px 20px', borderRadius: '30px', fontWeight: '700', fontSize: '14px', display: 'inline-flex', alignItems: 'center', gap: '6px', border: '1px solid #cbd5e1' }}
                    >
                      {copied ? <><Check size={16} color="#22c55e" /> Link Copied!</> : <><Copy size={16} /> Copy Article Link</>}
                    </button>

                  </div>
                </div>

              </div>
            </div>

            {/* Sticky Sidebar (Right Side) */}
            <div style={{ position: 'sticky', top: '90px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
              
              {/* 1. Quick Admissions Lead Card */}
              <div style={{ background: '#ffffff', padding: '28px', borderRadius: '20px', boxShadow: 'var(--shadow-md)', border: '1px solid #e2e8f0' }}>
                <div style={{ fontSize: '11px', fontWeight: '800', color: 'var(--coral-accent)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>
                  Instant Assistance
                </div>
                <h4 style={{ fontSize: '18px', color: 'var(--navy-primary)', marginBottom: '8px', fontWeight: '800' }}>
                  Got Questions About {post.category}?
                </h4>
                <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '18px' }}>
                  Speak directly with senior medical counselors for fee breakdowns and seat availability.
                </p>

                {quickSubmitted ? (
                  <div style={{ background: '#f0fdf4', padding: '16px', borderRadius: '12px', color: '#166534', fontSize: '13px', fontWeight: '700', textAlign: 'center' }}>
                    <CheckCircle2 size={32} color="#22c55e" style={{ margin: '0 auto 8px auto', display: 'block' }} />
                    Request Registered! Our counselor will call you in 15 mins.
                  </div>
                ) : (
                  <form onSubmit={handleQuickSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <input 
                      type="text" 
                      required 
                      placeholder="Student Full Name *"
                      value={quickForm.name}
                      onChange={e => setQuickForm({ ...quickForm, name: e.target.value })}
                      style={{ padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px', outline: 'none' }}
                    />
                    <input 
                      type="tel" 
                      required 
                      placeholder="WhatsApp Phone Number *"
                      value={quickForm.phone}
                      onChange={e => setQuickForm({ ...quickForm, phone: e.target.value })}
                      style={{ padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px', outline: 'none' }}
                    />
                    <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '12px', fontSize: '13px' }}>
                      <Send size={14} /> Request Free Callback
                    </button>
                  </form>
                )}
              </div>

              {/* 2. Direct WhatsApp Callout Banner */}
              <div style={{ background: 'linear-gradient(135deg, #25D366, #128C7E)', color: '#ffffff', padding: '24px', borderRadius: '20px', boxShadow: '0 8px 24px rgba(37, 211, 102, 0.3)' }}>
                <h4 style={{ color: '#ffffff', fontSize: '18px', marginBottom: '6px', fontWeight: '800' }}>Prefer WhatsApp?</h4>
                <p style={{ fontSize: '13px', color: '#e8f5e9', marginBottom: '16px', lineHeight: '1.5' }}>
                  Chat directly with our senior counselor on WhatsApp for instant fee charts & admission process.
                </p>
                <a 
                  href={whatsappInquireUrl} 
                  target="_blank" 
                  rel="noreferrer" 
                  style={{ background: '#ffffff', color: '#128C7E', padding: '10px 20px', borderRadius: '30px', fontWeight: '800', fontSize: '13px', display: 'inline-flex', alignItems: 'center', gap: '8px', textDecoration: 'none', width: '100%', justifyContent: 'center' }}
                >
                  <MessageCircle size={18} fill="#128C7E" /> Chat on WhatsApp Now
                </a>
              </div>

            </div>

          </div>

          {/* Related Articles Section */}
          {relatedPosts.length > 0 && (
            <div style={{ marginTop: '70px', paddingTop: '40px', borderTop: '2px dashed #e2e8f0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px', flexWrap: 'wrap', gap: '16px' }}>
                <div>
                  <span className="badge-coral" style={{ marginBottom: '8px' }}>Recommended Reading</span>
                  <h3 style={{ fontSize: '26px', color: 'var(--navy-primary)', margin: 0, fontWeight: '800' }}>
                    More Articles in <span style={{ color: 'var(--coral-accent)' }}>{post.category}</span>
                  </h3>
                </div>
                <Link to="/blogs" style={{ color: 'var(--coral-accent)', fontWeight: '800', fontSize: '14px', textDecoration: 'none' }}>
                  View All Blog Guides →
                </Link>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
                {relatedPosts.map(rel => (
                  <Link key={rel._id} to={`/blogs/${rel.slug}`} style={{ textDecoration: 'none', background: '#ffffff', borderRadius: '18px', overflow: 'hidden', border: '1px solid #e2e8f0', boxShadow: 'var(--shadow-sm)', transition: 'all 0.3s ease', display: 'flex', flexDirection: 'column' }} className="glass-card">
                    <img src={rel.image} alt={rel.title} style={{ width: '100%', height: '160px', objectFit: 'cover' }} />
                    <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', flexGrow: 1, justifyContent: 'space-between' }}>
                      <div>
                        <span className="badge-navy" style={{ fontSize: '10px', marginBottom: '8px' }}>{rel.category}</span>
                        <h4 style={{ fontSize: '16px', color: 'var(--navy-primary)', margin: '8px 0', lineHeight: '1.4', fontWeight: '700' }}>{rel.title}</h4>
                      </div>
                      <div style={{ marginTop: '14px', fontSize: '13px', color: 'var(--coral-accent)', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        Read Guide →
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

        </div>
      </section>
    </div>
  );
};

export default BlogPost;
