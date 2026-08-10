import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Clock, User, ArrowRight, Eye, Sparkles, TrendingUp, BookOpen, Calendar, Tag } from 'lucide-react';

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = ['All', 'Russia', 'Georgia', 'Kyrgyzstan', 'Uzbekistan', 'Armenia', 'Vietnam', 'FMGE', 'NMAT', 'General'];

  useEffect(() => {
    fetchBlogs();
  }, [selectedCategory]);

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const url = selectedCategory === 'All' ? '/api/blogs' : `/api/blogs?category=${selectedCategory}`;
      const res = await fetch(url);
      const data = await res.json();
      if (data.success) setBlogs(data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filteredBlogs = blogs.filter(b => 
    b.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    b.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const featuredPost = blogs.length > 0 ? blogs[0] : null;
  const regularPosts = blogs.length > 1 ? filteredBlogs.filter(b => b._id !== featuredPost?._id) : filteredBlogs;

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh', paddingBottom: '90px' }}>
      
      {/* Magazine Hero Header */}
      <section style={{ background: 'linear-gradient(135deg, #0b132b 0%, #1F3864 60%, #1e293b 100%)', color: '#ffffff', padding: '80px 0 60px 0', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-80px', right: '-80px', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(225, 91, 63, 0.25) 0%, transparent 70%)', pointerEvents: 'none' }}></div>

        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
            <span className="badge-coral" style={{ marginBottom: '16px', border: '1px solid rgba(225,91,63,0.4)', background: 'rgba(225,91,63,0.15)' }}>
              <BookOpen size={14} /> Medical Education Journal
            </span>
            
            <h1 style={{ color: '#ffffff', fontSize: '46px', fontWeight: '800', marginBottom: '16px', letterSpacing: '-0.5px' }}>
              Medico Overseas <span style={{ color: 'var(--coral-accent)' }}>Knowledge Hub</span>
            </h1>

            <p style={{ color: '#cbd5e1', fontSize: '18px', lineHeight: '1.6', marginBottom: '36px' }}>
              Authoritative insights, NMC guidelines, university fee analyses, and FMGE preparation roadmaps curated by medical counselors.
            </p>

            {/* Glowing Search Bar */}
            <div style={{ maxWidth: '600px', margin: '0 auto', position: 'relative' }}>
              <input 
                type="text" 
                placeholder="Search articles by country, exam, or keyword (e.g. Russia, Fees, FMGE)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ width: '100%', padding: '18px 24px 18px 56px', borderRadius: '50px', border: '2px solid rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)', color: '#ffffff', outline: 'none', fontSize: '15px', boxShadow: '0 10px 30px rgba(0,0,0,0.3)' }}
              />
              <Search size={22} color="var(--coral-accent)" style={{ position: 'absolute', left: '20px', top: '50%', transform: 'translateY(-50%)' }} />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Master Article Card */}
      {featuredPost && selectedCategory === 'All' && !searchTerm && (
        <section style={{ marginTop: '-40px', position: 'relative', zIndex: 10, marginBottom: '60px' }}>
          <div className="container">
            <div className="glass-card" style={{ padding: '0', borderRadius: '24px', overflow: 'hidden', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', background: '#ffffff', boxShadow: 'var(--shadow-lg)', border: '1px solid #e2e8f0' }}>
              
              {/* Image Side */}
              <div style={{ position: 'relative', minHeight: '340px' }}>
                <img src={featuredPost.image} alt={featuredPost.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', top: '20px', left: '20px', background: 'var(--coral-accent)', color: '#ffffff', padding: '6px 16px', borderRadius: '30px', fontSize: '12px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Sparkles size={14} /> Featured Article
                </div>
              </div>

              {/* Content Side */}
              <div style={{ padding: '40px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '14px', flexWrap: 'wrap' }}>
                    <span className="badge-navy">{featuredPost.category}</span>
                    <span style={{ fontSize: '13px', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '5px' }}>
                      <Clock size={14} /> {featuredPost.readTime}
                    </span>
                    <span style={{ fontSize: '13px', color: 'var(--coral-accent)', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '5px', background: 'var(--coral-light)', padding: '3px 12px', borderRadius: '20px' }}>
                      <Eye size={15} /> {featuredPost.views ? featuredPost.views.toLocaleString() : '3,420'} Views
                    </span>
                  </div>

                  <h2 style={{ fontSize: '28px', color: 'var(--navy-primary)', marginBottom: '14px', lineHeight: '1.3', fontWeight: '800' }}>
                    <Link to={`/blogs/${featuredPost.slug}`} style={{ color: 'inherit' }}>
                      {featuredPost.title}
                    </Link>
                  </h2>

                  <p style={{ color: 'var(--text-body)', fontSize: '16px', lineHeight: '1.7', marginBottom: '24px' }}>
                    {featuredPost.excerpt}
                  </p>
                </div>

                <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--coral-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', color: 'var(--coral-accent)' }}>
                      MO
                    </div>
                    <div>
                      <div style={{ fontSize: '14px', fontWeight: '700', color: 'var(--navy-primary)' }}>{featuredPost.author}</div>
                      <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{new Date(featuredPost.publishedAt).toLocaleDateString()}</div>
                    </div>
                  </div>

                  <Link to={`/blogs/${featuredPost.slug}`} className="btn-primary" style={{ padding: '12px 24px', fontSize: '14px' }}>
                    Read Full Article <ArrowRight size={16} />
                  </Link>
                </div>

              </div>

            </div>
          </div>
        </section>
      )}

      {/* Category Pills Bar */}
      <section style={{ marginBottom: '40px' }}>
        <div className="container">
          <div style={{ background: '#ffffff', padding: '16px 24px', borderRadius: '50px', boxShadow: 'var(--shadow-sm)', border: '1px solid #e2e8f0', display: 'flex', gap: '10px', overflowX: 'auto', alignItems: 'center' }}>
            <span style={{ fontSize: '13px', fontWeight: '800', color: 'var(--navy-primary)', textTransform: 'uppercase', letterSpacing: '1px', display: 'flex', alignItems: 'center', gap: '6px', paddingRight: '12px', borderRight: '2px solid #e2e8f0' }}>
              <Tag size={14} color="var(--coral-accent)" /> Categories:
            </span>

            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                style={{
                  padding: '8px 20px',
                  borderRadius: '30px',
                  fontSize: '14px',
                  fontWeight: '700',
                  whiteSpace: 'nowrap',
                  background: selectedCategory === cat ? 'var(--coral-accent)' : '#f1f5f9',
                  color: selectedCategory === cat ? '#ffffff' : 'var(--navy-primary)',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.25s ease'
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Articles Grid */}
      <section>
        <div className="container">
          {loading ? (
            <div style={{ textAlign: 'center', padding: '80px', fontSize: '18px', color: 'var(--text-muted)' }}>Loading articles...</div>
          ) : regularPosts.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '80px', background: '#ffffff', borderRadius: '20px', boxShadow: 'var(--shadow-sm)' }}>
              <h3 style={{ fontSize: '22px', color: 'var(--navy-primary)', marginBottom: '8px' }}>No articles match your search</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '15px' }}>Try adjusting your search terms or selecting a different category.</p>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '32px' }}>
              {regularPosts.map((post) => (
                <article key={post._id} className="glass-card" style={{ borderRadius: '20px', overflow: 'hidden', display: 'flex', flexDirection: 'column', background: '#ffffff' }}>
                  
                  {/* Card Thumbnail Container */}
                  <div style={{ position: 'relative', height: '220px', overflow: 'hidden' }}>
                    <img 
                      src={post.image} 
                      alt={post.title} 
                      style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }} 
                      className="blog-img-hover"
                    />
                    
                    {/* Category Pill Badge (Top Left) */}
                    <div style={{ position: 'absolute', top: '14px', left: '14px' }}>
                      <span className="badge-navy" style={{ background: '#ffffff', color: 'var(--navy-primary)', boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }}>
                        {post.category}
                      </span>
                    </div>

                    {/* Eye Symbol Views Count Badge (Top Right) */}
                    <div style={{ position: 'absolute', top: '14px', right: '14px', background: 'rgba(15, 23, 42, 0.85)', backdropFilter: 'blur(6px)', color: '#ffffff', padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '5px', border: '1px solid rgba(255,255,255,0.15)' }}>
                      <Eye size={14} color="var(--coral-accent)" />
                      <span>{post.views ? post.views.toLocaleString() : '1,250'}</span>
                    </div>

                  </div>

                  {/* Card Content Body */}
                  <div style={{ padding: '26px', display: 'flex', flexDirection: 'column', flexGrow: 1, justifyContent: 'space-between' }}>
                    <div>
                      <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Clock size={13} /> {post.readTime}</span>
                        <span>•</span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Calendar size={13} /> {new Date(post.publishedAt).toLocaleDateString()}</span>
                      </div>

                      <h3 style={{ fontSize: '20px', color: 'var(--navy-primary)', marginBottom: '12px', lineHeight: '1.4', fontWeight: '700' }}>
                        <Link to={`/blogs/${post.slug}`} style={{ color: 'inherit' }} className="blog-title-hover">
                          {post.title}
                        </Link>
                      </h3>

                      <p style={{ color: 'var(--text-muted)', fontSize: '14px', lineHeight: '1.6', marginBottom: '20px', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                        {post.excerpt}
                      </p>
                    </div>

                    {/* Card Footer */}
                    <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ fontSize: '13px', color: 'var(--navy-primary)', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <User size={14} color="var(--coral-accent)" /> {post.author}
                      </div>

                      <Link to={`/blogs/${post.slug}`} style={{ color: 'var(--coral-accent)', fontWeight: '800', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        Read Article <ArrowRight size={16} />
                      </Link>
                    </div>

                  </div>

                </article>
              ))}
            </div>
          )}

          {/* Pagination Controls */}
          {regularPosts.length > 6 && (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', marginTop: '50px' }}>
              <button className="btn-secondary" style={{ padding: '8px 16px', fontSize: '14px' }}>Previous</button>
              <button className="btn-primary" style={{ padding: '8px 16px', fontSize: '14px' }}>1</button>
              <button className="btn-secondary" style={{ padding: '8px 16px', fontSize: '14px' }}>2</button>
              <button className="btn-secondary" style={{ padding: '8px 16px', fontSize: '14px' }}>Next</button>
            </div>
          )}

        </div>
      </section>

      {/* Custom Hover Effects CSS */}
      <style>{`
        .glass-card:hover .blog-img-hover {
          transform: scale(1.08);
        }
        .blog-title-hover:hover {
          color: var(--coral-accent) !important;
        }
      `}</style>

    </div>
  );
};

export default Blogs;
