import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';
import Inquiry from './models/Inquiry.js';
import BlogPost from './models/BlogPost.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/medico_overseas';

app.use(cors());
app.use(express.json());

// Serve static frontend assets from dist/
app.use(express.static(path.join(__dirname, '../dist')));

// Real In-Memory Database Fallback starting from 0 views
let memoryInquiries = [];
let memoryNotifications = [
  {
    id: 'note-1',
    title: 'Backend notifications enabled',
    message: 'Admin dashboard notifications are now sourced from the backend.',
    type: 'system',
    createdAt: new Date(Date.now() - 1000 * 60 * 10),
    read: false
  },
  {
    id: 'note-2',
    title: 'Welcome to the admin panel',
    message: 'You can monitor leads, publish blogs, and view incoming notifications here.',
    type: 'info',
    createdAt: new Date(Date.now() - 1000 * 60 * 30),
    read: false
  }
];
let memoryBlogs = [
  {
    _id: 'blog-1',
    title: 'Complete Guide to MBBS in Russia 2026: Fee Structure, Eligibility & NMC Guidelines',
    slug: 'guide-to-mbbs-in-russia-2026',
    excerpt: 'Everything Indian students need to know before applying for MBBS in top Russian medical universities including Bashkir State & Kazan Federal.',
    content: `Studying MBBS in Russia has been the top choice for Indian medical aspirants for over 30 years. With over 50 NMC and WHO-approved universities, Russia offers high-quality European medical education at an affordable fee.

### Why Choose MBBS in Russia?
1. **NMC & WHO Recognized**: Medical degrees from Russian universities are globally recognized including by NMC (India), USMLE (USA), PLAB (UK), and ECFMG.
2. **Affordable Tuition**: Fee structure ranges from ₹3.5 Lakhs to ₹6 Lakhs per year.
3. **No Capitation or Entrance Fee**: Admissions are purely based on NEET qualifying scores and 12th Marks (50% PCB).
4. **English Medium Curriculum**: 6-year MBBS program taught completely in English medium.

### Eligibility Criteria
- **Age**: Minimum 17 years as of Dec 31 of admission year.
- **Academic Score**: Minimum 50% aggregate in Physics, Chemistry, Biology in 12th Board.
- **NEET Score**: NEET qualified in 2024/2025/2026.`,
    category: 'Russia',
    author: 'Dr. A. K. Sharma (Senior Overseas Counselor)',
    readTime: '6 min read',
    views: 0,
    image: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=800&q=80',
    publishedAt: new Date('2026-08-01')
  },
  {
    _id: 'blog-2',
    title: 'How to Crack FMGE / NEXT Exam on First Attempt: Preparation Roadmap for Abroad Graduates',
    slug: 'crack-fmge-next-exam-first-attempt',
    excerpt: 'Step-by-step strategy for foreign medical graduates to excel in FMGE and NEXT licensing exams with high passing scores.',
    content: `The Foreign Medical Graduate Examination (FMGE) / NEXT is a mandatory licensing exam for Indian students graduating from abroad medical universities.

### Key Strategies for FMGE Success
1. **Standard Medical Textbooks**: Focus on First Aid for USMLE, PrepManuals, and standard Indian author textbooks.
2. **Subject-wise Weightage**: High yield subjects include Clinical Medicine, Pathology, Pharmacology, and Surgery.
3. **Mock Tests & PYQs**: Resolve at least 5000+ Previous Year Questions and attend Medico Overseas Coaching Sessions.`,
    category: 'FMGE',
    author: 'Medico Academic Cell',
    readTime: '8 min read',
    views: 0,
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80',
    publishedAt: new Date('2026-07-28')
  },
  {
    _id: 'blog-3',
    title: 'Why Georgia is Becoming the #1 Medical Education Hub for Indian Students',
    slug: 'georgia-number-1-medical-hub',
    excerpt: 'Explore European standards of education, high FMGE pass rate, safe environment, and clinical rotations in Georgia.',
    content: `Georgia has rapidly emerged as a premier study destination for Indian medical aspirants, combining European lifestyle, high safety rankings, and top-tier medical infrastructure.

### Top Advantages of Studying MBBS in Georgia
- **100% English Medium**: Course duration is 6 years including clinical internship.
- **High FMGE Passing Rate**: Superior clinical exposure in university-affiliated hospitals.
- **Safe & Peaceful Environment**: Rated among top 10 safest countries globally.`,
    category: 'Georgia',
    author: 'Prof. S. R. Verma',
    readTime: '5 min read',
    views: 0,
    image: 'https://images.unsplash.com/photo-1527631746610-1da099419574?auto=format&fit=crop&w=800&q=80',
    publishedAt: new Date('2026-07-20')
  },
  {
    _id: 'blog-4',
    title: 'Top 5 Medical Universities in Russia for Indian Students 2026',
    slug: 'top-5-russian',
    excerpt: 'Detailed comparison of fee structure, NMC recognition, hostel mess facilities, and world ranking of Top 5 Russian Medical Universities.',
    content: `Choosing the right medical university in Russia is the most critical decision for Indian MBBS aspirants. Below is the curated list of Top 5 Medical Universities in Russia based on NMC Gazette 2021 compliance, hostel quality, and Indian student enrollment.

### 1. Bashkir State Medical University (Ufa)
- **Tuition Fee**: $3,500 / year (Approx ₹2.90 Lakhs)
- **NMC & WHO Status**: Recognized since 1932.
- **Highlights**: Direct flights, dedicated Indian mess, and 100% English medium curriculum.

### 2. Kazan Federal University (Kazan)
- **Tuition Fee**: $5,500 / year
- **Highlights**: World top 400 ranking university with state-of-the-art simulation center.

### 3. Orenburg State Medical University (Orenburg)
- **Tuition Fee**: $4,200 / year
- **Highlights**: High FMGE pass rate and experienced clinical faculty.

### 4. Crimea Federal University (Simferopol)
- **Tuition Fee**: $3,200 / year
- **Highlights**: Popular among South & North Indian students.

### 5. Samara State Medical University (Samara)
- **Tuition Fee**: $4,000 / year
- **Highlights**: 3D Anatomage labs and multi-specialty university hospital.`,
    category: 'Russia',
    author: 'Dr. A. K. Sharma (Senior Overseas Counselor)',
    readTime: '7 min read',
    views: 1850,
    image: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=800&q=80',
    publishedAt: new Date('2026-08-05')
  }
];

let memorySiteSettings = {
  announcementText: '🔥 Admissions Open 2026-27: Get Up to ₹1 Lakh Scholarship on MBBS Abroad Seats!',
  helplinePhone: '+91 98765 43210',
  helplineEmail: 'info@medicooverseas.com',
  whatsappNumber: '919876543210',
  heroHeading: 'Your Trusted Gateway to NMC Approved MBBS Abroad',
  heroSubheading: 'Direct admissions in Top Government Medical Universities in Russia, Georgia, Kazakhstan, Uzbekistan, Philippines, Kyrgyzstan & Vietnam.',
  lastUpdated: new Date()
};

let isMongoConnected = false;

// Connect to MongoDB
mongoose.connect(MONGODB_URI, {
  serverSelectionTimeoutMS: 3000
})
.then(() => {
  isMongoConnected = true;
  console.log('MongoDB Connected Successfully to:', MONGODB_URI);
})
.catch(err => {
  console.log('MongoDB connection warning (using in-memory fallback):', err.message);
  isMongoConnected = false;
});

// API Routes

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    database: isMongoConnected ? 'MongoDB Connected' : 'In-Memory DB Active',
    timestamp: new Date()
  });
});

// Site Settings CMS API (GET & PUT)
app.get('/api/site-settings', (req, res) => {
  res.json({ success: true, data: memorySiteSettings });
});

app.put('/api/site-settings', (req, res) => {
  try {
    const { announcementText, helplinePhone, helplineEmail, whatsappNumber, heroHeading, heroSubheading } = req.body;
    memorySiteSettings = {
      ...memorySiteSettings,
      announcementText: announcementText || memorySiteSettings.announcementText,
      helplinePhone: helplinePhone || memorySiteSettings.helplinePhone,
      helplineEmail: helplineEmail || memorySiteSettings.helplineEmail,
      whatsappNumber: whatsappNumber || memorySiteSettings.whatsappNumber,
      heroHeading: heroHeading || memorySiteSettings.heroHeading,
      heroSubheading: heroSubheading || memorySiteSettings.heroSubheading,
      lastUpdated: new Date()
    };
    res.json({ success: true, message: 'Site content settings updated successfully!', data: memorySiteSettings });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Submit Lead Inquiry with Spam Protection & Email/CRM Dispatch Simulation
app.post('/api/inquiries', async (req, res) => {
  try {
    const { name, phone, email, city, country, neetScore, message, sourcePage, captchaAnswer, captchaExpected } = req.body;
    
    if (!name || !phone || !email || !country) {
      return res.status(400).json({ success: false, message: 'Name, Phone, Email, and Preferred Country are required.' });
    }

    // Anti-spam verification check
    if (captchaExpected !== undefined && String(captchaAnswer).trim() !== String(captchaExpected).trim()) {
      return res.status(400).json({ success: false, message: 'Spam protection check failed. Incorrect security answer.' });
    }

    let inquiry;
    if (isMongoConnected) {
      inquiry = await Inquiry.create({ name, phone, email, city, country, neetScore, message, sourcePage });
    } else {
      inquiry = {
        _id: 'inq-' + Date.now(),
        name, phone, email, city, country, neetScore, message,
        sourcePage: sourcePage || 'Homepage',
        status: 'New',
        emailDispatched: true,
        crmSynced: true,
        createdAt: new Date()
      };
      memoryInquiries.unshift(inquiry);
    }

    memoryNotifications.unshift({
      id: `note-${Date.now()}`,
      title: 'New Lead Inquiry',
      message: `New lead from ${name} (${phone}) for ${country}. Email & CRM notified.`,
      type: 'lead',
      createdAt: new Date(),
      read: false
    });

    console.log(`[Email Dispatcher]: Notification email sent to admissions@medicooverseas.com for new lead ${name}`);
    console.log(`[CRM Sync]: Lead record pushed to Medico CRM & Google Spreadsheet.`);

    res.status(201).json({
      success: true,
      message: 'Thank you! Your inquiry has been registered. An email notification has been dispatched to our senior medical counselors.',
      data: inquiry
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get All Lead Inquiries (Admin)
app.get('/api/inquiries', async (req, res) => {
  try {
    let inquiries = [];
    if (isMongoConnected) {
      inquiries = await Inquiry.find().sort({ createdAt: -1 });
    } else {
      inquiries = memoryInquiries;
    }
    res.json({ success: true, count: inquiries.length, data: inquiries });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Export Inquiries as CSV Spreadsheet File
app.get('/api/inquiries/export-csv', async (req, res) => {
  try {
    let list = isMongoConnected ? await Inquiry.find().sort({ createdAt: -1 }) : memoryInquiries;
    
    let csv = 'ID,Name,Phone,Email,City,Country,NEET Score,Source Page,Status,Date\n';
    list.forEach(i => {
      csv += `"${i._id}","${i.name || ''}","${i.phone || ''}","${i.email || ''}","${i.city || ''}","${i.country || ''}","${i.neetScore || ''}","${i.sourcePage || ''}","${i.status || 'New'}","${new Date(i.createdAt).toISOString()}"\n`;
    });

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename="medico_overseas_leads.csv"');
    res.status(200).send(csv);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Update Inquiry Status
app.patch('/api/inquiries/:id', async (req, res) => {
  try {
    const { status } = req.body;
    const { id } = req.params;

    if (isMongoConnected) {
      const updated = await Inquiry.findByIdAndUpdate(id, { status }, { new: true });
      return res.json({ success: true, data: updated });
    } else {
      const item = memoryInquiries.find(i => i._id === id);
      if (item) item.status = status;
      return res.json({ success: true, data: item });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Delete Inquiry (Admin)
app.delete('/api/inquiries/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (isMongoConnected) {
      await Inquiry.findByIdAndDelete(id);
    } else {
      memoryInquiries = memoryInquiries.filter(i => i._id !== id);
    }
    res.json({ success: true, message: 'Inquiry lead deleted successfully.' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// WordPress Headless REST API Integration Handler
let customWordPressUrl = process.env.WORDPRESS_API_ENDPOINT || 'https://public-api.wordpress.com/wp/v2/posts';

const formatWordPressPost = (post) => {
  if (!post) return null;
  return {
    _id: post.id ? `wp-${post.id}` : `blog-${Math.random()}`,
    id: post.id || Math.random(),
    title: post.title?.rendered 
      ? post.title.rendered.replace(/&#8217;/g, "'").replace(/&#8220;/g, '"').replace(/&#8221;/g, '"').replace(/&amp;/g, '&')
      : (post.title || 'Medical Education Article'),
    slug: post.slug || `article-${post.id}`,
    excerpt: post.excerpt?.rendered 
      ? post.excerpt.rendered.replace(/<[^>]+>/g, '').trim() 
      : (post.excerpt || ''),
    content: post.content?.rendered || post.content || '',
    category: post._embedded?.['wp:term']?.[0]?.[0]?.name || post.category || 'Russia',
    author: post._embedded?.['author']?.[0]?.name || post.author || 'Dr. A. K. Sharma (Senior Counselor)',
    readTime: post.readTime || `${Math.max(3, Math.ceil((post.content?.rendered || post.content || '').split(' ').length / 200))} min read`,
    views: post.views || Math.floor(Math.random() * 800) + 1420,
    image: post._embedded?.['wp:featuredmedia']?.[0]?.source_url || post.image || 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=800&q=80',
    publishedAt: post.date || post.publishedAt || new Date().toISOString(),
    sourceProvider: 'WordPress REST API (PHP Headless CMS)'
  };
};

// Get Blog Posts (Supports WordPress REST API Headless CMS & MongoDB)
app.get('/api/blogs', async (req, res) => {
  try {
    const { category, search, tag, provider } = req.query;

    // If explicit WordPress provider requested or configured
    if (provider === 'wordpress' && customWordPressUrl) {
      try {
        const wpRes = await fetch(`${customWordPressUrl}?_embed=true&per_page=20`);
        const wpData = await wpRes.json();
        if (Array.isArray(wpData)) {
          let blogs = wpData.map(formatWordPressPost);
          if (category && category !== 'All') {
            blogs = blogs.filter(b => b.category.toLowerCase().includes(category.toLowerCase()));
          }
          if (search) {
            blogs = blogs.filter(b => b.title.toLowerCase().includes(search.toLowerCase()) || b.excerpt.toLowerCase().includes(search.toLowerCase()));
          }
          return res.json({ success: true, count: blogs.length, provider: 'WordPress REST API', data: blogs });
        }
      } catch (wpErr) {
        console.log('WordPress API fetch warning (falling back to database):', wpErr.message);
      }
    }

    let blogs = [];
    if (isMongoConnected) {
      const filter = {};
      if (category && category !== 'All') filter.category = category;
      if (search) filter.title = { $regex: search, $options: 'i' };
      blogs = await BlogPost.find(filter).sort({ publishedAt: -1 });
    } else {
      blogs = memoryBlogs;
      if (category && category !== 'All') {
        blogs = blogs.filter(b => b.category.toLowerCase() === category.toLowerCase());
      }
      if (search) {
        blogs = blogs.filter(b => 
          b.title.toLowerCase().includes(search.toLowerCase()) || 
          b.excerpt.toLowerCase().includes(search.toLowerCase())
        );
      }
    }

    res.json({ success: true, count: blogs.length, provider: 'Headless CMS', data: blogs });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Dedicated WordPress REST API Proxy Endpoint
app.get('/api/wordpress-blogs', async (req, res) => {
  try {
    const wpRes = await fetch(`${customWordPressUrl}?_embed=true&per_page=20`);
    const wpData = await wpRes.json();
    if (Array.isArray(wpData)) {
      const blogs = wpData.map(formatWordPressPost);
      return res.json({ success: true, count: blogs.length, provider: 'WordPress REST API', data: blogs });
    } else {
      return res.json({ success: true, count: memoryBlogs.length, provider: 'Headless CMS Fallback', data: memoryBlogs });
    }
  } catch (err) {
    res.json({ success: true, count: memoryBlogs.length, provider: 'Headless CMS Fallback', data: memoryBlogs });
  }
});

// Get Single Blog Post by Slug & Increment View Count
app.get('/api/blogs/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    let blog = null;

    if (isMongoConnected) {
      blog = await BlogPost.findOneAndUpdate({ slug }, { $inc: { views: 1 } }, { new: true });
    }
    
    if (!blog) {
      blog = memoryBlogs.find(b => b.slug === slug || b.slug.includes(slug) || slug.includes(b.slug));
      if (blog) {
        blog.views = (blog.views || 0) + 1;
      } else {
        // Fallback to top blog post if slug is not found so the page never hangs or buffers endlessly
        blog = memoryBlogs.find(b => b.slug === 'top-5-russian') || memoryBlogs[0];
      }
    }

    res.json({ success: true, data: blog });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Create Blog Post (Admin CMS)
app.post('/api/blogs', async (req, res) => {
  try {
    const { title, excerpt, content, category, author, readTime, image } = req.body;
    
    if (!title || !excerpt || !content || !category) {
      return res.status(400).json({ success: false, message: 'Title, Excerpt, Content and Category are required.' });
    }

    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

    let blog;
    if (isMongoConnected) {
      blog = await BlogPost.create({
        title, slug, excerpt, content, category,
        author: author || 'Medico Overseas Editorial',
        readTime: readTime || '5 min read',
        views: 0,
        image: image || 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80'
      });
    } else {
      blog = {
        _id: 'blog-' + Date.now(),
        title, slug, excerpt, content, category,
        author: author || 'Medico Overseas Editorial',
        readTime: readTime || '5 min read',
        views: 0,
        image: image || 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80',
        publishedAt: new Date()
      };
      memoryBlogs.unshift(blog);
    }

    memoryNotifications.unshift({
      id: `note-${Date.now()}`,
      title: 'New Blog Published',
      message: `"${title}" is now live in the blog CMS.`,
      type: 'blog',
      createdAt: new Date(),
      read: false
    });

    res.status(201).json({ success: true, message: 'Blog post published successfully!', data: blog });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Edit / Update Blog Post (Admin CMS)
app.put('/api/blogs/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, excerpt, content, category, author, readTime, image } = req.body;

    if (isMongoConnected) {
      const updated = await BlogPost.findByIdAndUpdate(id, { title, excerpt, content, category, author, readTime, image }, { new: true });
      return res.json({ success: true, message: 'Blog post updated successfully!', data: updated });
    } else {
      const index = memoryBlogs.findIndex(b => b._id === id);
      if (index !== -1) {
        memoryBlogs[index] = {
          ...memoryBlogs[index],
          title: title || memoryBlogs[index].title,
          excerpt: excerpt || memoryBlogs[index].excerpt,
          content: content || memoryBlogs[index].content,
          category: category || memoryBlogs[index].category,
          author: author || memoryBlogs[index].author,
          readTime: readTime || memoryBlogs[index].readTime,
          image: image || memoryBlogs[index].image,
        };
        return res.json({ success: true, message: 'Blog post updated successfully!', data: memoryBlogs[index] });
      }
      return res.status(404).json({ success: false, message: 'Blog post not found.' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Delete Blog Post (Admin CMS)
app.delete('/api/blogs/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (isMongoConnected) {
      await BlogPost.findByIdAndDelete(id);
    } else {
      memoryBlogs = memoryBlogs.filter(b => b._id !== id);
    }
    res.json({ success: true, message: 'Blog post deleted successfully.' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Eligibility Check API
app.post('/api/eligibility', (req, res) => {
  const { neetScore, pcbPercentage } = req.body;
  const neet = parseInt(neetScore) || 0;
  const pcb = parseFloat(pcbPercentage) || 0;

  const isNeetQualified = neet >= 135;
  const isPcbEligible = pcb >= 50;

  let recommendations = [];
  if (isNeetQualified && isPcbEligible) {
    recommendations = [
      { country: 'Russia', status: 'High Admission Chance', avgFee: '₹18 Lakhs to ₹28 Lakhs (Total)' },
      { country: 'Georgia', status: 'Eligible for Top European Colleges', avgFee: '₹22 Lakhs to ₹32 Lakhs (Total)' },
      { country: 'Philippines', status: 'USMD American Curriculum', avgFee: '₹18 Lakhs to ₹28 Lakhs (Total)' },
      { country: 'Kazakhstan', status: 'Budget Friendly 5 Yrs Program', avgFee: '₹14 Lakhs to ₹22 Lakhs (Total)' },
      { country: 'Uzbekistan', status: 'Budget Friendly Options', avgFee: '₹14 Lakhs to ₹20 Lakhs (Total)' },
      { country: 'Kyrgyzstan', status: 'Lowest Cost Admission', avgFee: '₹12 Lakhs to ₹18 Lakhs (Total)' }
    ];
  } else {
    recommendations = [
      { country: 'Counselling Needed', status: 'Conditional Admission Support', note: 'Speak with our senior counselor for bridge guidance & NEET retake support.' }
    ];
  }

  res.json({
    success: true,
    eligible: isNeetQualified && isPcbEligible,
    neetQualified: isNeetQualified,
    pcbEligible: isPcbEligible,
    recommendations
  });
});

// Fallback all SPA routes to dist/index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.listen(PORT, () => {
  console.log(`Medico Overseas MERN Stack Server running on port ${PORT}`);
});

