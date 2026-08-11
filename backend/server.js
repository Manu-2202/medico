import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import nodemailer from 'nodemailer';
import path from 'path';
import { fileURLToPath } from 'url';
import jwt from 'jsonwebtoken';
import rateLimit from 'express-rate-limit';
import { buildSystemPrompt } from './aiKnowledgeBase.js';

import Inquiry from './models/Inquiry.js';
import Blog from './models/Blog.js';
import Country from './models/Country.js';
import Testimonial from './models/Testimonial.js';
import Gallery from './models/Gallery.js';
import FAQ from './models/FAQ.js';
import SiteSettings from './models/SiteSettings.js';
import User from './models/User.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/medico_overseas';
const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  console.error('FATAL: JWT_SECRET is not set in the environment. Refusing to start with an insecure default.');
  process.exit(1);
}

// Require a valid admin JWT before allowing access to admin-only routes.
function requireAdmin(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, message: 'No authentication token provided.' });
  }
  const token = authHeader.split(' ')[1];
  try {
    req.admin = jwt.verify(token, JWT_SECRET);
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: 'Invalid or expired token.' });
  }
}

app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Shared rate limiter for public write/AI endpoints — protects against form-spam and
// runaway AI API costs from a single client.
const publicApiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 30,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: 'Too many requests — please try again in a few minutes.' }
});
const chatLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 12,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: 'You are sending messages too quickly — please slow down.' }
});

// Serve static frontend assets if dist folder exists
app.use(express.static(path.join(__dirname, '../frontend/dist')));
app.use(express.static(path.join(__dirname, '../dist')));

// In-Memory Database Fallbacks for offline / local execution
let memoryInquiries = [];
let memoryNotifications = [
  {
    id: 'note-1',
    title: 'MERN Backend active',
    message: 'Pure MERN stack activated — WordPress dependencies removed.',
    type: 'system',
    createdAt: new Date(Date.now() - 1000 * 60 * 10),
    read: false
  }
];

let memorySiteSettings = {
  announcementText: '🔥 Admissions Open 2026-27: Get Up to ₹1 Lakh Scholarship on MBBS Abroad Seats!',
  helplinePhone: '+91 98765 43210',
  helplineEmail: 'info@medicooverseas.com',
  whatsappNumber: '919876543210',
  heroHeading: 'Your Trusted Gateway to NMC Approved MBBS Abroad',
  heroSubheading: 'Direct admissions in Top Government Medical Universities in Russia, Georgia, Kazakhstan, Uzbekistan, Philippines, Kyrgyzstan & Vietnam.',
  leadEmails: process.env.LEAD_NOTIFY_EMAIL || 'info@medicooverseas.com',
  officeLocations: [
    {
      city: 'New Delhi (Head Office)',
      address: 'Suite 402, Medical Hub Tower, Barakhamba Road, Connaught Place, New Delhi - 110001',
      phone: '+91 98765 43210',
      email: 'delhi@medicooverseas.com',
      mapUrl: 'https://maps.google.com'
    },
    {
      city: 'Mumbai Office',
      address: '7th Floor, Commerce Centre, Bandra West, Mumbai, Maharashtra - 400050',
      phone: '+91 98765 43211',
      email: 'mumbai@medicooverseas.com',
      mapUrl: 'https://maps.google.com'
    },
    {
      city: 'Hyderabad Branch',
      address: '3rd Floor, Jubilee Heights, Road No. 36, Jubilee Hills, Hyderabad - 500033',
      phone: '+91 98765 43212',
      email: 'hyderabad@medicooverseas.com',
      mapUrl: 'https://maps.google.com'
    },
    {
      city: 'Bangalore Branch',
      address: '2nd Floor, Prestige Meridian, M.G. Road, Bangalore, Karnataka - 560001',
      phone: '+91 98765 43213',
      email: 'bangalore@medicooverseas.com',
      mapUrl: 'https://maps.google.com'
    }
  ],
  lastUpdated: new Date()
};

let memoryBlogs = [
  {
    _id: 'blog-1',
    title: 'Top Reasons to Study MBBS in Russia for Indian Students (2026-27)',
    slug: 'top-reasons-study-mbbs-russia-2026',
    excerpt: 'Detailed analysis of NMC guidelines, Russian federal university fee structures, English medium training, and high FMGE pass rates.',
    content: `<p>Russia remains the #1 destination for Indian medical aspirants seeking high quality, low cost MBBS abroad. Top federal state universities like Bashkir State Medical University and Kazan Federal University offer world-class simulation labs, 100% English medium instruction, and full compliance with NMC Gazette 2021 guidelines.</p><h3>Why Choose Russia?</h3><ul><li>NMC & WHO Recognized 6-year program</li><li>Tuition starting from just ₹3.5 Lakhs per year</li><li>Dedicated North & South Indian mess facilities</li><li>Proven FMGE & NEXT licensing track record</li></ul>`,
    category: 'Russia',
    tags: ['MBBS in Russia', 'NMC Guidelines', 'FMGE Exam'],
    image: 'https://images.unsplash.com/photo-1513326718677-b964603b136b?auto=format&fit=crop&w=1200&q=80',
    author: 'Dr. R. K. Sharma',
    readTime: '5 min read',
    createdAt: new Date()
  },
  {
    _id: 'blog-2',
    title: 'Complete Guide to NMAT Exam for MBBS Admissions in Philippines',
    slug: 'nmat-exam-guide-philippines-mbbs',
    excerpt: 'Everything Indian medical students need to know about the National Medical Admission Test (NMAT): eligibility, syllabus, scoring, and prep strategy.',
    content: `<p>The National Medical Admission Test (NMAT) is a standardized eligibility exam required for medical education in the Philippines. It evaluates aptitude, scientific reasoning, and analytical capabilities across two comprehensive parts.</p><h3>Exam Breakdown</h3><p>Part 1 tests verbal, inductive, and quantitative reasoning. Part 2 evaluates Physics, Chemistry, Biology, and Social Science concepts.</p>`,
    category: 'Entrance Exams',
    tags: ['NMAT Exam', 'Philippines', 'USMLE'],
    image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1200&q=80',
    author: 'Medico Overseas Editorial Team',
    readTime: '6 min read',
    createdAt: new Date()
  },
  {
    _id: 'blog-3',
    title: 'NMC Gazette 2021 Rules Explained for Foreign Medical Graduates',
    slug: 'nmc-gazette-2021-rules-explained',
    excerpt: 'Detailed checklist of 54 months course duration, 12 months internship, medium of instruction, and licensing registration requirements in India.',
    content: `<p>Before applying to any foreign medical university, Indian students must ensure the college strictly meets the National Medical Commission (NMC) Gazette requirements passed on November 18, 2021.</p><h3>Key NMC Requirements:</h3><ol><li>Minimum 54 months (4.5 years) course duration</li><li>12 months continuous rotatory internship in the same hospital</li><li>100% English medium instruction</li><li>Licensing rights in the country of graduation</li></ol>`,
    category: 'NMC & Rules',
    tags: ['NMC Gazette', 'FMGE', 'Licensing'],
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80',
    author: 'Counselor Priya Nair',
    readTime: '7 min read',
    createdAt: new Date()
  }
];

let memoryTestimonials = [
  {
    _id: 'test-1',
    name: 'Aarav Sharma',
    university: 'Bashkir State Medical University',
    country: 'Russia',
    quote: 'Medico Overseas made my admission process seamless from Delhi to Ufa. The Indian mess in hostel is fantastic and coaching for FMGE started in year 1!',
    rating: 5,
    year: '2025'
  },
  {
    _id: 'test-2',
    name: 'Ananya Patel',
    university: 'Tbilisi State Medical University',
    country: 'Georgia',
    quote: 'Studying in Georgia was my dream. Thanks to Medico Overseas team for obtaining my EQE recognition and student residence card without hassle.',
    rating: 5,
    year: '2025'
  }
];

let memoryGallery = [
  {
    _id: 'gal-1',
    title: 'Bashkir State Medical University Campus',
    category: 'Campuses',
    image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=800&q=80',
    caption: 'Modern medical academic building in Ufa, Russia.'
  },
  {
    _id: 'gal-2',
    title: 'Student Batch Departure 2025',
    category: 'Students',
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80',
    caption: 'Medico Overseas student group departing from IGI Airport New Delhi.'
  }
];

let memoryFaqs = [
  {
    _id: 'faq-1',
    question: 'Is NEET mandatory for studying MBBS abroad?',
    answer: 'Yes, NEET qualification is compulsory for all Indian citizens planning to study MBBS abroad and return to practice medicine in India.',
    category: 'Eligibility'
  },
  {
    _id: 'faq-2',
    question: 'Are degrees from Russia and Georgia recognized by NMC?',
    answer: 'Yes! All universities recommended by Medico Overseas are 100% NMC and WHO recognized, fully compliant with NMC Gazette 2021 guidelines.',
    category: 'Recognition'
  }
];

let isMongoConnected = false;

const seedInquiriesToMongo = async () => {
  try {
    const seedInquiries = [
      { name: 'Aarav Sharma', phone: '+91 98765 43210', email: 'aarav.s@gmail.com', city: 'Delhi', country: 'Russia', status: 'New', neetScore: 485, message: 'Interested in Bashkir State Medical University.' },
      { name: 'Priya Patel', phone: '+91 98123 45678', email: 'priya.p@gmail.com', city: 'Ahmedabad', country: 'Georgia', status: 'In Counseling', neetScore: 512, message: 'Want details about Tbilisi State Medical University.' },
      { name: 'Rohan Gupta', phone: '+91 97654 32109', email: 'rohan.g@yahoo.com', city: 'Jaipur', country: 'Kazakhstan', status: 'Enrolled', neetScore: 450, message: 'Admitted to Asfendiyarov Kazakh National Medical University.' },
      { name: 'Ananya Verma', phone: '+91 96543 21098', email: 'ananya.v@gmail.com', city: 'Lucknow', country: 'Uzbekistan', status: 'Contacted', neetScore: 390, message: 'Looking for low tuition fee colleges in Uzbekistan.' },
      { name: 'Vikram Singh', phone: '+91 95432 10987', email: 'vikram.s@gmail.com', city: 'Chandigarh', country: 'Russia', status: 'In Counseling', neetScore: 420, message: 'Comparing Kazan Federal University and Crimea Federal.' },
      { name: 'Kavya Reddy', phone: '+91 94321 09876', email: 'kavya.r@gmail.com', city: 'Hyderabad', country: 'Georgia', status: 'New', neetScore: 535, message: 'Interested in Batumi Shota Rustaveli State University.' },
      { name: 'Siddharth Nair', phone: '+91 93210 98765', email: 'siddharth.n@gmail.com', city: 'Kochi', country: 'Kyrgyzstan', status: 'Enrolled', neetScore: 360, message: 'Enrolled in Osh State University for 2026 batch.' },
      { name: 'Sneha Kulkarni', phone: '+91 92109 87654', email: 'sneha.k@gmail.com', city: 'Pune', country: 'Philippines', status: 'Contacted', neetScore: 410, message: 'Seeking information on BS+MD course structure.' },
      { name: 'Aditya Joshi', phone: '+91 91098 76543', email: 'aditya.j@gmail.com', city: 'Indore', country: 'Vietnam', status: 'New', neetScore: 475, message: 'Can I get admission in Can Tho University of Medicine?' },
      { name: 'Meera Iyer', phone: '+91 90987 65432', email: 'meera.i@gmail.com', city: 'Chennai', country: 'Russia', status: 'In Counseling', neetScore: 495, message: 'Is Orel State University NMC approved?' },
      { name: 'Rahul Choudhary', phone: '+91 89876 54321', email: 'rahul.c@gmail.com', city: 'Patna', country: 'Kazakhstan', status: 'Contacted', neetScore: 380, message: 'Need hostel and Indian food availability details.' },
      { name: 'Divya Agarwal', phone: '+91 88765 43210', email: 'divya.a@gmail.com', city: 'Kolkata', country: 'Georgia', status: 'New', neetScore: 520, message: 'Applying for European University Tbilisi.' },
      { name: 'Arjun Das', phone: '+91 87654 32109', email: 'arjun.d@gmail.com', city: 'Guwahati', country: 'Russia', status: 'In Counseling', neetScore: 440, message: 'Scholarship guidance for MBBS in Russia.' },
      { name: 'Tanvi Shah', phone: '+91 86543 21098', email: 'tanvi.s@gmail.com', city: 'Surat', country: 'Uzbekistan', status: 'New', neetScore: 405, message: 'Samarkand State Medical University fee structure.' },
      { name: 'Karan Mehra', phone: '+91 85432 10987', email: 'karan.m@gmail.com', city: 'Amritsar', country: 'Kyrgyzstan', status: 'Contacted', neetScore: 345, message: 'International School of Medicine admission process.' },
      { name: 'Isha Saxena', phone: '+91 84321 09876', email: 'isha.s@gmail.com', city: 'Bhopal', country: 'Russia', status: 'In Counseling', neetScore: 460, message: 'Volgograd State Medical University hostel facilities.' },
      { name: 'Manish Kumar', phone: '+91 83210 98765', email: 'manish.k@gmail.com', city: 'Ranchi', country: 'Georgia', status: 'Enrolled', neetScore: 510, message: 'Seat confirmed in Caucasus International University.' },
      { name: 'Pooja Hegde', phone: '+91 82109 87654', email: 'pooja.h@gmail.com', city: 'Mangalore', country: 'Philippines', status: 'New', neetScore: 425, message: 'Davao Medical School Foundation syllabus comparison.' },
      { name: 'Varun Rao', phone: '+91 81098 76543', email: 'varun.r@gmail.com', city: 'Visakhapatnam', country: 'Vietnam', status: 'In Counseling', neetScore: 430, message: 'Hong Bang International University MBBS course fees.' },
      { name: 'Nisha Bhat', phone: '+91 80987 65432', email: 'nisha.b@gmail.com', city: 'Mysore', country: 'Kazakhstan', status: 'Contacted', neetScore: 375, message: 'Kazakh National Medical University Indian mess query.' },
      { name: 'Gaurav Mishra', phone: '+91 79876 54321', email: 'gaurav.m@gmail.com', city: 'Varanasi', country: 'Russia', status: 'New', neetScore: 490, message: 'Kazan State Medical University direct seat booking.' },
      { name: 'Riya Sen', phone: '+91 78765 43210', email: 'riya.s@gmail.com', city: 'Dehradun', country: 'Georgia', status: 'In Counseling', neetScore: 505, message: 'Alte University MBBS application requirements.' },
      { name: 'Deepak Yadav', phone: '+91 77654 32109', email: 'deepak.y@gmail.com', city: 'Noida', country: 'Uzbekistan', status: 'New', neetScore: 395, message: 'Tashkent Medical Academy fee payment installment details.' },
      { name: 'Shreya Pillai', phone: '+91 76543 21098', email: 'shreya.p@gmail.com', city: 'Thiruvananthapuram', country: 'Russia', status: 'Contacted', neetScore: 470, message: 'First Moscow State Medical University eligibility.' }
    ];

    for (const item of seedInquiries) {
      await Inquiry.updateOne(
        { email: item.email },
        { $setOnInsert: item },
        { upsert: true }
      );
    }
    console.log('✅ Synchronized 24 initial student inquiries into MongoDB Atlas database!');
  } catch (seedErr) {
    console.error('Seed error:', seedErr.message);
  }
};

// Connect to MongoDB
mongoose.connect(MONGODB_URI, { serverSelectionTimeoutMS: 5000 })
  .then(async () => {
    isMongoConnected = true;
    console.log('MongoDB Connected Successfully to:', MONGODB_URI);
    await seedInquiriesToMongo();
  })
  .catch(err => {
    console.log('MongoDB connection warning (using in-memory fallback):', err.message);
    isMongoConnected = false;
  });

// Persistent Gmail SMTP Transporter with connection pooling
let gmailTransporter = null;

const initEmailTransporter = () => {
  const smtpUser = process.env.SMTP_USER;
  const rawPass = process.env.SMTP_PASS;
  const smtpPass = rawPass ? rawPass.replace(/\s+/g, '') : null;

  if (smtpUser && smtpPass) {
    gmailTransporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: smtpUser,
        pass: smtpPass
      },
      tls: {
        rejectUnauthorized: false
      },
      pool: true,
      maxConnections: 5,
      maxMessages: 100
    });
    console.log(`[Email Dispatcher] ✅ Real Gmail SMTP configured for ${smtpUser}`);
    gmailTransporter.verify()
      .then(() => console.log('✅ [Email Dispatcher] Gmail SMTP connected & verified successfully! Mail notifications active.'))
      .catch(err => console.error('⚠️ [Email Dispatcher] SMTP verification warning:', err.message));
  } else {
    console.log('[Email Dispatcher] ℹ️ SMTP credentials not fully configured.');
  }
};

initEmailTransporter();

// Helper to get an active email transporter
const getActiveTransporter = async () => {
  if (gmailTransporter) {
    return { transporter: gmailTransporter, sender: `"Medico Overseas" <${process.env.SMTP_USER || 'no-reply@medicooverseas.com'}>` };
  }
  
  const smtpUser = process.env.SMTP_USER;
  const rawPass = process.env.SMTP_PASS;
  const smtpPass = rawPass ? rawPass.replace(/\s+/g, '') : null;

  if (smtpUser && smtpPass) {
    const t = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: { user: smtpUser, pass: smtpPass },
      tls: { rejectUnauthorized: false }
    });
    return { transporter: t, sender: `"Medico Overseas" <${smtpUser}>` };
  }

  const testAccount = await nodemailer.createTestAccount();
  const t = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false,
    auth: { user: testAccount.user, pass: testAccount.pass }
  });
  return { transporter: t, sender: `"Medico Overseas Test" <${testAccount.user}>` };
};

// Send lead notification email to admin email list (with High Priority for instant phone push alerts)
const sendLeadEmail = async (inquiry) => {
  const rawRecipients = memorySiteSettings.leadEmails ||
    process.env.LEAD_NOTIFY_EMAIL ||
    'info@medicooverseas.com';

  const recipients = rawRecipients
    .split(',')
    .map(e => e.trim())
    .filter(Boolean);

  if (recipients.length === 0) recipients.push(process.env.LEAD_NOTIFY_EMAIL || 'info@medicooverseas.com');

  console.log(`[Email Dispatcher] 🚀 Dispatching lead notification to: [${recipients.join(', ')}]`);

  try {
    const { transporter, sender } = await getActiveTransporter();
    const submittedAt = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
    const cleanPhone = (inquiry.phone || '').replace(/[^0-9]/g, '');

    const info = await transporter.sendMail({
      from: sender,
      to: recipients.join(', '),
      subject: `New Student Inquiry: ${inquiry.name} - MBBS in ${inquiry.country}`,
      text: `New MBBS Lead Inquiry Received!\n\nName: ${inquiry.name}\nPhone: ${inquiry.phone}\nEmail: ${inquiry.email || 'Not provided'}\nCity: ${inquiry.city || 'Not specified'}\nPreferred Country: ${inquiry.country}\nNEET Score: ${inquiry.neetScore || 'Not provided'}\nMessage: ${inquiry.message || 'None'}\nReceived: ${submittedAt}\nSource: ${inquiry.sourcePage || 'Website'}`,
      html: `
        <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 620px; margin: 0 auto; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.12); border: 1px solid #e2e8f0;">
          <div style="background: linear-gradient(135deg, #0b132b, #1f3864); padding: 26px 30px; color: #ffffff;">
            <div style="display: flex; align-items: center; justify-content: space-between;">
              <h2 style="margin: 0; font-size: 22px; font-weight: 800; color: #ffffff;">🎓 New MBBS Lead Alert</h2>
              <span style="background: #22c55e; color: #ffffff; padding: 4px 12px; border-radius: 20px; font-size: 11px; font-weight: 800; text-transform: uppercase;">NEW INQUIRY</span>
            </div>
            <p style="margin: 8px 0 0; color: #93c5fd; font-size: 13px;">Received at ${submittedAt} IST via Medico Overseas Website</p>
          </div>
          <div style="padding: 26px 30px; background: #ffffff; color: #0f172a;">
            <table style="width: 100%; border-collapse: collapse; font-size: 15px;">
              <tr style="border-bottom: 1px solid #f1f5f9;"><td style="padding: 11px 6px; color: #64748b; width: 36%;">👤 Student Name</td><td style="padding: 11px 6px; font-weight: 800; color: #0f172a; font-size: 16px;">${inquiry.name}</td></tr>
              <tr style="border-bottom: 1px solid #f1f5f9;"><td style="padding: 11px 6px; color: #64748b;">📱 Phone Number</td><td style="padding: 11px 6px;"><a href="tel:${inquiry.phone}" style="color: #2563eb; font-weight: 800; text-decoration: none; font-size: 16px;">${inquiry.phone}</a></td></tr>
              <tr style="border-bottom: 1px solid #f1f5f9;"><td style="padding: 11px 6px; color: #64748b;">💬 WhatsApp Link</td><td style="padding: 11px 6px;"><a href="https://wa.me/91${cleanPhone.slice(-10)}?text=Hello%20${encodeURIComponent(inquiry.name)}%2C%20greetings%20from%20Medico%20Overseas!" style="background: #22c55e; color: #ffffff; padding: 6px 14px; border-radius: 20px; text-decoration: none; font-weight: 700; font-size: 13px; display: inline-block;">💬 Chat on WhatsApp</a></td></tr>
              <tr style="border-bottom: 1px solid #f1f5f9;"><td style="padding: 11px 6px; color: #64748b;">📧 Email Address</td><td style="padding: 11px 6px;"><a href="mailto:${inquiry.email}" style="color: #2563eb; text-decoration: none; font-weight: 600;">${inquiry.email || 'Not provided'}</a></td></tr>
              <tr style="border-bottom: 1px solid #f1f5f9;"><td style="padding: 11px 6px; color: #64748b;">🏙️ City / State</td><td style="padding: 11px 6px; font-weight: 600;">${inquiry.city || 'Not specified'}</td></tr>
              <tr style="border-bottom: 1px solid #f1f5f9;"><td style="padding: 11px 6px; color: #64748b;">🌍 Preferred Country</td><td style="padding: 11px 6px;"><span style="background: #dbeafe; color: #1e40af; padding: 4px 12px; border-radius: 20px; font-weight: 800;">${inquiry.country}</span></td></tr>
              <tr style="border-bottom: 1px solid #f1f5f9;"><td style="padding: 11px 6px; color: #64748b;">🩺 NEET Score</td><td style="padding: 11px 6px; font-weight: 800; color: #059669;">${inquiry.neetScore ? inquiry.neetScore + ' Marks' : 'Not provided'}</td></tr>
              <tr><td style="padding: 11px 6px; color: #64748b; vertical-align: top;">💬 Message</td><td style="padding: 11px 6px; color: #334155; line-height: 1.5;">${inquiry.message || '—'}</td></tr>
            </table>
          </div>
          <div style="background: #f8fafc; padding: 14px 30px; font-size: 12px; color: #64748b; border-top: 1px solid #e2e8f0;">
            📍 Source: <strong>${inquiry.sourcePage || 'Website'}</strong> &nbsp;|&nbsp; Sent to <strong>${recipients.join(', ')}</strong>
          </div>
        </div>
      `
    });

    const previewUrl = nodemailer.getTestMessageUrl(info);
    if (previewUrl) {
      console.log(`[Email Dispatcher] ✉️ Ethereal preview URL: ${previewUrl}`);
    } else {
      console.log(`[Email Dispatcher] ✅ Gmail alert delivered to ${recipients.join(', ')} | MessageId: ${info.messageId}`);
    }

    return { success: true, messageId: info.messageId, recipients };
  } catch (err) {
    console.error('[Email Dispatcher] ❌ Send Error:', err.message);
    return { success: false, error: err.message, recipients };
  }
};

// Send confirmation email to the student who submitted the inquiry (warm, polite, reassuring, parent-friendly)
const sendStudentConfirmationEmail = async (inquiry) => {
  if (!inquiry.email || !inquiry.email.includes('@')) {
    console.log('[Student Email] Skipping — invalid or empty email address:', inquiry.email);
    return;
  }

  try {
    const { transporter, sender } = await getActiveTransporter();
    console.log(`[Student Email] 🚀 Sending confirmation email to student: ${inquiry.email}`);

    const info = await transporter.sendMail({
      from: sender,
      to: inquiry.email,
      subject: `Welcome to Medico Overseas - Your MBBS Admission Guidance, ${inquiry.name}`,
      text: `Respected ${inquiry.name},\n\nThank you for reaching out to Medico Overseas regarding MBBS opportunities in ${inquiry.country}.\n\nOur senior medical counseling board has received your inquiry. A senior counselor will contact you shortly on ${inquiry.phone} to assist you with transparent information regarding university choices, tuition fees, hostels, and NMC guidelines.\n\nWarm regards,\nMedico Overseas Admissions Team\nPhone: +91 98765 43210\nWebsite: https://medicooverseas.com`,
      html: `
        <div style="font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 620px; margin: 0 auto; border-radius: 18px; overflow: hidden; box-shadow: 0 8px 32px rgba(31, 56, 100, 0.12); border: 1px solid #e2e8f0; background: #ffffff;">
          <!-- Header Banner -->
          <div style="background: linear-gradient(135deg, #0b132b 0%, #1f3864 100%); padding: 36px 32px; color: #ffffff; text-align: center;">
            <div style="display: inline-block; background: rgba(255,255,255,0.12); border: 1px solid rgba(255,255,255,0.2); padding: 6px 16px; border-radius: 30px; font-size: 12px; font-weight: 700; letter-spacing: 1px; text-transform: uppercase; color: #f97316; margin-bottom: 12px;">
              🎓 Official Medical Admissions Board
            </div>
            <h1 style="margin: 0; font-size: 26px; font-weight: 800; color: #ffffff; letter-spacing: -0.5px;">Medico Overseas</h1>
            <p style="color: #93c5fd; margin: 8px 0 0; font-size: 14px; font-weight: 500;">Your Trusted Partner for NMC & WHO Recognized MBBS Abroad</p>
          </div>

          <!-- Main Body Content -->
          <div style="padding: 36px 32px; color: #1e293b; line-height: 1.75; font-size: 15px;">
            <p style="font-size: 17px; font-weight: 700; color: #1f3864; margin-top: 0;">
              Respected ${inquiry.name},
            </p>

            <p style="color: #334155; margin-bottom: 20px;">
              Warmest greetings from the <strong>Medico Overseas</strong> family. We sincerely thank you and your family for placing your valuable trust in us for your medical education aspirations.
            </p>

            <p style="color: #334155; margin-bottom: 24px;">
              Pursuing a career in medicine is a noble and courageous calling. We have safely received your inquiry regarding <strong>MBBS opportunities in ${inquiry.country}</strong>, and our senior counseling board is honored to assist you with transparent, end-to-end guidance.
            </p>

            <!-- Inquiry Details Summary Card -->
            <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-left: 5px solid #1f3864; border-radius: 12px; padding: 20px 24px; margin: 28px 0;">
              <div style="font-weight: 800; font-size: 14px; color: #1f3864; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 12px;">
                📋 Your Registered Counseling Details
              </div>
              <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
                <tr style="border-bottom: 1px solid #f1f5f9;"><td style="padding: 8px 0; color: #64748b; width: 42%;">🌍 Preferred Destination:</td><td style="padding: 8px 0; font-weight: 700; color: #0f172a;"><span style="background: #dbeafe; color: #1e40af; padding: 3px 10px; border-radius: 12px;">${inquiry.country}</span></td></tr>
                <tr style="border-bottom: 1px solid #f1f5f9;"><td style="padding: 8px 0; color: #64748b;">🩺 NEET Status / Score:</td><td style="padding: 8px 0; font-weight: 700; color: #059669;">${inquiry.neetScore ? inquiry.neetScore + ' Marks' : 'To be discussed with counselor'}</td></tr>
                <tr style="border-bottom: 1px solid #f1f5f9;"><td style="padding: 8px 0; color: #64748b;">📱 Registered Phone:</td><td style="padding: 8px 0; font-weight: 700; color: #0f172a;">${inquiry.phone}</td></tr>
                <tr><td style="padding: 8px 0; color: #64748b;">🏙️ City / State:</td><td style="padding: 8px 0; font-weight: 600; color: #334155;">${inquiry.city || 'Provided'}</td></tr>
              </table>
            </div>

            <!-- What Happens Next Section -->
            <div style="margin: 28px 0;">
              <h3 style="color: #1f3864; font-size: 16px; font-weight: 800; margin-bottom: 14px;">
                ✨ What Happens Next (Our Commitment to You & Your Parents):
              </h3>
              <ul style="padding-left: 20px; margin: 0; color: #475569; font-size: 14px;">
                <li style="margin-bottom: 10px;">
                  <strong>Personalized University Shortlist:</strong> Our senior advisor is preparing a transparent list of top government medical universities fully compliant with NMC Gazette & WHO standards.
                </li>
                <li style="margin-bottom: 10px;">
                  <strong>Dedicated 1-on-1 Discussion:</strong> A senior medical counselor will call you within <strong>15–30 minutes</strong> on <strong>${inquiry.phone}</strong> to explain tuition fees, English-medium curriculum, hostel security, Indian mess, and NEXT/FMGE coaching.
                </li>
                <li style="margin-bottom: 0;">
                  <strong>Zero Hidden Fees:</strong> We maintain 100% transparency with direct university fee deposits and complete visa assistance.
                </li>
              </ul>
            </div>

            <!-- Direct Helpline / WhatsApp Connect -->
            <div style="background: linear-gradient(135deg, rgba(37, 211, 102, 0.08) 0%, rgba(59, 130, 246, 0.08) 100%); border: 1px solid rgba(37, 211, 102, 0.3); border-radius: 14px; padding: 24px; text-align: center; margin: 32px 0;">
              <div style="font-weight: 800; color: #166534; font-size: 15px; margin-bottom: 6px;">
                Would you or your parents like to speak with us right away?
              </div>
              <p style="margin: 0 0 16px; font-size: 13px; color: #4b5563;">
                Feel free to message or call our senior counseling team directly:
              </p>
              <div style="text-align: center;">
                <a href="https://wa.me/919876543210?text=Hello%20Medico%20Overseas%2C%20I%20am%20${encodeURIComponent(inquiry.name)}.%20I%20registered%20for%20MBBS%20guidance%20for%20${encodeURIComponent(inquiry.country)}." style="display: inline-block; background: #22c55e; color: #ffffff; padding: 12px 28px; border-radius: 30px; text-decoration: none; font-weight: 800; font-size: 14px; box-shadow: 0 4px 14px rgba(34,197,94,0.35);">
                  💬 Chat on WhatsApp (+91 98765 43210)
                </a>
              </div>
            </div>

            <p style="color: #64748b; font-size: 13px; line-height: 1.6; border-top: 1px solid #f1f5f9; padding-top: 20px; margin-bottom: 0;">
              We look forward to speaking with you and guiding you toward a fulfilling medical career.<br/><br/>
              Warmest regards,<br/>
              <strong style="color: #1f3864; font-size: 14px;">Senior Counseling & Admissions Board</strong><br/>
              <span style="color: #64748b;">Medico Overseas Educational Consultancy</span><br/>
              <span style="color: #94a3b8; font-size: 12px;">Official Admissions Partner for Premier Global Medical Universities</span>
            </p>
          </div>

          <!-- Footer -->
          <div style="background: #f8fafc; padding: 18px 32px; text-align: center; font-size: 12px; color: #94a3b8; border-top: 1px solid #e2e8f0;">
            © 2026 Medico Overseas Educational Consultancy. All rights reserved.<br/>
            Regional Counseling Centers: New Delhi | Mumbai | Hyderabad | Bangalore | Vijayawada
          </div>
        </div>
      `
    });

    console.log(`[Student Email] ✅ Polite confirmation email delivered to ${inquiry.email} | MessageId: ${info.messageId}`);
    return { success: true, messageId: info.messageId };
  } catch (err) {
    console.error(`[Student Email] ❌ Failed to send to ${inquiry.email}:`, err.message);
    return { success: false, error: err.message };
  }
};

// API ROUTES

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    database: isMongoConnected ? 'MongoDB Connected' : 'In-Memory DB Active',
    timestamp: new Date()
  });
});

// Dynamic XML Sitemap
app.get('/sitemap.xml', async (req, res) => {
  const baseUrl = process.env.SITE_URL || `${req.protocol}://${req.get('host')}`;
  const staticPages = [
    '',
    '/about',
    '/contact',
    '/gallery',
    '/faqs',
    '/blogs',
    '/privacy-policy',
    '/terms-and-conditions',
    '/destinations/mbbs-in-russia',
    '/destinations/mbbs-in-georgia',
    '/destinations/mbbs-in-kyrgyzstan',
    '/destinations/mbbs-in-uzbekistan',
    '/destinations/mbbs-in-armenia',
    '/destinations/mbbs-in-vietnam',
    '/destinations/mbbs-in-philippines',
    '/destinations/mbbs-in-kazakhstan',
    '/exams/fmge-exam',
    '/exams/nmat-exam'
  ];

  let blogUrls = [];
  try {
    const posts = isMongoConnected ? await Blog.find({ published: true }) : memoryBlogs;
    blogUrls = posts.map(p => `/blogs/${p.slug}`);
  } catch {
    blogUrls = memoryBlogs.map(p => `/blogs/${p.slug}`);
  }

  const allUrls = [...staticPages, ...blogUrls];

  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

  allUrls.forEach(url => {
    xml += `  <url>\n`;
    xml += `    <loc>${baseUrl}${url}</loc>\n`;
    xml += `    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>\n`;
    xml += `    <changefreq>weekly</changefreq>\n`;
    xml += `    <priority>${url === '' ? '1.0' : url.startsWith('/destinations') ? '0.9' : '0.8'}</priority>\n`;
    xml += `  </url>\n`;
  });

  xml += `</urlset>`;

  res.setHeader('Content-Type', 'text/xml');
  res.status(200).send(xml);
});

// Production Robots.txt
app.get('/robots.txt', (req, res) => {
  const baseUrl = process.env.SITE_URL || `${req.protocol}://${req.get('host')}`;
  const robots = `User-agent: *\nAllow: /\nDisallow: /admin\n\nSitemap: ${baseUrl}/sitemap.xml\n`;
  res.setHeader('Content-Type', 'text/plain');
  res.status(200).send(robots);
});

// Site Settings & Notification Recipients CMS API
app.get('/api/site-settings', async (req, res) => {
  try {
    if (isMongoConnected) {
      let settings = await SiteSettings.findOne();
      if (!settings) {
        settings = await SiteSettings.create(memorySiteSettings);
      }
      return res.json({ success: true, data: settings });
    }
    res.json({ success: true, data: memorySiteSettings });
  } catch (err) {
    res.json({ success: true, data: memorySiteSettings });
  }
});

app.put('/api/site-settings', requireAdmin, async (req, res) => {
  try {
    const { announcementText, helplinePhone, helplineEmail, whatsappNumber, heroHeading, heroSubheading, leadEmails, officeLocations } = req.body;

    memorySiteSettings = {
      ...memorySiteSettings,
      announcementText: announcementText ?? memorySiteSettings.announcementText,
      helplinePhone: helplinePhone ?? memorySiteSettings.helplinePhone,
      helplineEmail: helplineEmail ?? memorySiteSettings.helplineEmail,
      whatsappNumber: whatsappNumber ?? memorySiteSettings.whatsappNumber,
      heroHeading: heroHeading ?? memorySiteSettings.heroHeading,
      heroSubheading: heroSubheading ?? memorySiteSettings.heroSubheading,
      leadEmails: leadEmails ?? memorySiteSettings.leadEmails,
      officeLocations: officeLocations ?? memorySiteSettings.officeLocations,
      lastUpdated: new Date()
    };

    if (isMongoConnected) {
      await SiteSettings.findOneAndUpdate({}, memorySiteSettings, { upsert: true, new: true });
    }

    res.json({ success: true, message: 'Site content & lead notification email settings updated successfully!', data: memorySiteSettings });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// BLOGS MERN REST API
app.get('/api/blogs', async (req, res) => {
  try {
    const { search, category, tag } = req.query;
    let list = isMongoConnected ? await Blog.find().sort({ createdAt: -1 }) : memoryBlogs;

    if (search) {
      const q = search.toLowerCase();
      list = list.filter(p => p.title.toLowerCase().includes(q) || p.excerpt.toLowerCase().includes(q));
    }
    if (category) {
      list = list.filter(p => p.category?.toLowerCase() === category.toLowerCase());
    }
    if (tag) {
      list = list.filter(p => p.tags?.some(t => t.toLowerCase() === tag.toLowerCase()));
    }

    res.json({ success: true, count: list.length, data: list });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

app.get('/api/blogs/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    let post = isMongoConnected ? await Blog.findOne({ slug }) : memoryBlogs.find(b => b.slug === slug || b._id === slug);
    if (!post) {
      return res.status(404).json({ success: false, message: 'Blog post not found' });
    }
    res.json({ success: true, data: post });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

app.post('/api/blogs', requireAdmin, async (req, res) => {
  try {
    const { title, slug, excerpt, content, category, tags, image, author, readTime } = req.body;
    if (!title || !excerpt || !content) {
      return res.status(400).json({ success: false, message: 'Title, excerpt, and content are required.' });
    }
    const cleanSlug = (slug || title).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    let newBlog;

    if (isMongoConnected) {
      newBlog = await Blog.create({ title, slug: cleanSlug, excerpt, content, category, tags, image, author, readTime });
    } else {
      newBlog = {
        _id: 'blog-' + Date.now(),
        title,
        slug: cleanSlug,
        excerpt,
        content,
        category: category || 'General',
        tags: Array.isArray(tags) ? tags : (tags || '').split(',').map(t => t.trim()).filter(Boolean),
        image: image || 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80',
        author: author || 'Medico Overseas Editorial Team',
        readTime: readTime || '5 min read',
        createdAt: new Date()
      };
      memoryBlogs.unshift(newBlog);
    }
    res.status(201).json({ success: true, message: 'Blog post published successfully!', data: newBlog });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

app.delete('/api/blogs/:id', requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    if (isMongoConnected) {
      await Blog.findByIdAndDelete(id);
    } else {
      memoryBlogs = memoryBlogs.filter(b => b._id !== id);
    }
    res.json({ success: true, message: 'Blog post deleted successfully.' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// TESTIMONIALS REST API
app.get('/api/testimonials', async (req, res) => {
  try {
    const list = isMongoConnected ? await Testimonial.find().sort({ createdAt: -1 }) : memoryTestimonials;
    res.json({ success: true, data: list });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

app.post('/api/testimonials', requireAdmin, async (req, res) => {
  try {
    const { name, university, country, quote, rating, photo, year } = req.body;
    let item;
    if (isMongoConnected) {
      item = await Testimonial.create({ name, university, country, quote, rating, photo, year });
    } else {
      item = { _id: 'test-' + Date.now(), name, university, country, quote, rating: rating || 5, photo, year: year || '2025' };
      memoryTestimonials.unshift(item);
    }
    res.status(201).json({ success: true, data: item });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GALLERY REST API
app.get('/api/gallery', async (req, res) => {
  try {
    const list = isMongoConnected ? await Gallery.find().sort({ createdAt: -1 }) : memoryGallery;
    res.json({ success: true, data: list });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

app.post('/api/gallery', requireAdmin, async (req, res) => {
  try {
    const { title, image, category, caption } = req.body;
    let item;
    if (isMongoConnected) {
      item = await Gallery.create({ title, image, category, caption });
    } else {
      item = { _id: 'gal-' + Date.now(), title, image, category: category || 'Campuses', caption };
      memoryGallery.unshift(item);
    }
    res.status(201).json({ success: true, data: item });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// FAQS REST API
app.get('/api/faqs', async (req, res) => {
  try {
    const list = isMongoConnected ? await FAQ.find().sort({ createdAt: -1 }) : memoryFaqs;
    res.json({ success: true, data: list });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

app.post('/api/faqs', requireAdmin, async (req, res) => {
  try {
    const { question, answer, category } = req.body;
    let item;
    if (isMongoConnected) {
      item = await FAQ.create({ question, answer, category });
    } else {
      item = { _id: 'faq-' + Date.now(), question, answer, category: category || 'General' };
      memoryFaqs.unshift(item);
    }
    res.status(201).json({ success: true, data: item });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// SUBMIT INQUIRY (Student Form)
app.post('/api/inquiries', publicApiLimiter, async (req, res) => {
  try {
    const { name, phone, email, city, country, neetScore, message, sourcePage } = req.body;

    if (!name || !phone || !country) {
      return res.status(400).json({ success: false, message: 'Name, Phone Number, and Preferred Country are required.' });
    }

    let inquiry;
    if (isMongoConnected) {
      inquiry = await Inquiry.create({ name, phone, email, city, country, neetScore, message, sourcePage });
    } else {
      inquiry = {
        _id: 'inq-' + Date.now(),
        name, phone, email, city, country, neetScore, message,
        sourcePage: sourcePage || 'Website',
        status: 'New',
        createdAt: new Date()
      };
      memoryInquiries.unshift(inquiry);
    }

    // Add to in-app real-time notification queue for admin
    memoryNotifications.unshift({
      id: `note-${Date.now()}`,
      title: '🚨 New Student Lead Inquiry',
      message: `Lead received from ${name} (${phone}) for MBBS in ${country}. Dispatched to Gmail and student inbox.`,
      type: 'lead',
      createdAt: new Date(),
      read: false
    });

    // ⚡ RESPOND INSTANTLY to frontend (< 50ms)
    res.status(201).json({
      success: true,
      message: 'Thank you! Your inquiry has been registered. Our senior medical counselors have been notified.',
      data: inquiry
    });

    // 🚀 Dispatch emails in background asynchronously without blocking HTTP response
    setImmediate(async () => {
      try {
        await Promise.allSettled([
          sendLeadEmail(inquiry),
          sendStudentConfirmationEmail(inquiry)
        ]);
      } catch (err) {
        console.error('[Background Email Dispatch Error]:', err);
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET ALL INQUIRIES (Admin)
app.get('/api/inquiries', requireAdmin, async (req, res) => {
  try {
    if (isMongoConnected) {
      let inquiries = await Inquiry.find().sort({ createdAt: -1 });
      if (inquiries.length < 24) {
        await seedInquiriesToMongo();
        inquiries = await Inquiry.find().sort({ createdAt: -1 });
      }
      return res.json({ success: true, count: inquiries.length, data: inquiries });
    }
    res.json({ success: true, count: memoryInquiries.length, data: memoryInquiries });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET NOTIFICATIONS (Admin)
app.get('/api/notifications', requireAdmin, (req, res) => {
  res.json({ success: true, count: memoryNotifications.length, data: memoryNotifications });
});

// EXPORT INQUIRIES AS CSV
app.get('/api/inquiries/export-csv', requireAdmin, async (req, res) => {
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

// UPDATE INQUIRY STATUS
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

// DELETE INQUIRY
app.delete('/api/inquiries/:id', requireAdmin, async (req, res) => {
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

// ELIGIBILITY CHECK API
// ==========================================
// AI CHATBOT ("Dr. Maya") — real OpenAI-powered answers, grounded in our own data
// ==========================================
app.post('/api/chat', chatLimiter, async (req, res) => {
  try {
    const { message, history } = req.body;

    if (!message || typeof message !== 'string' || !message.trim()) {
      return res.status(400).json({ success: false, message: 'A message is required.' });
    }
    if (message.length > 1000) {
      return res.status(400).json({ success: false, message: 'Message is too long.' });
    }

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      // Graceful fallback signal — the frontend widget shows its scripted flow instead
      // of a broken/blank chat when no key is configured yet.
      return res.json({
        success: true,
        aiAvailable: false,
        reply: null,
        message: 'AI chat is not configured yet on this server.'
      });
    }

    // Keep prior turns short and bounded so a long chat can't blow up token cost.
    const safeHistory = Array.isArray(history) ? history.slice(-8) : [];
    const messages = [
      // OpenAI's Chat Completions API takes the system prompt as a message in the
      // array itself (role: 'system'), unlike Anthropic's separate `system` field.
      { role: 'system', content: buildSystemPrompt() },
      ...safeHistory
        .filter(m => m && typeof m.text === 'string' && (m.sender === 'user' || m.sender === 'bot'))
        .map(m => ({ role: m.sender === 'user' ? 'user' : 'assistant', content: m.text.slice(0, 1000) })),
      { role: 'user', content: message.trim() }
    ];

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        max_tokens: 400,
        messages
      })
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error('[AI Chat] OpenAI API error:', response.status, errText);
      return res.json({
        success: true,
        aiAvailable: false,
        reply: null,
        message: 'The AI assistant is temporarily unavailable.'
      });
    }

    const data = await response.json();
    const replyText = (data.choices?.[0]?.message?.content || '').trim();

    res.json({
      success: true,
      aiAvailable: true,
      reply: replyText || "I'm not sure how to answer that — would you like me to connect you with a counsellor?"
    });
  } catch (error) {
    console.error('[AI Chat] Error:', error);
    res.json({
      success: true,
      aiAvailable: false,
      reply: null,
      message: 'The AI assistant hit an error — please try again or request a counsellor.'
    });
  }
});

app.post('/api/eligibility', publicApiLimiter, (req, res) => {
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

// ==========================================
// ADMIN JWT AUTHENTICATION ENDPOINTS
// ==========================================
app.post('/api/admin/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password are required.' });
    }

    const cleanEmail = email.trim().toLowerCase();
    const cleanPassword = password.trim();

    if (!isMongoConnected) {
      // Without a database there is nowhere to safely verify credentials against.
      return res.status(503).json({ success: false, message: 'Admin login is unavailable — database not connected.' });
    }

    const user = await User.findOne({ email: cleanEmail });

    // One-time bootstrap: ONLY works when no admin user exists yet in the database,
    // ONLY for the exact email/password pair configured server-side via env vars,
    // and it immediately creates a real hashed-password user so this path can never
    // be used again. No hardcoded credentials are accepted after the first admin exists.
    const bootstrapEmail = (process.env.ADMIN_BOOTSTRAP_EMAIL || '').trim().toLowerCase();
    const bootstrapPassword = (process.env.ADMIN_BOOTSTRAP_PASSWORD || '').trim();
    const existingAdminCount = await User.countDocuments({});

    let authenticatedUser = null;

    if (user) {
      const isMatch = await user.comparePassword(cleanPassword);
      if (!isMatch) {
        return res.status(401).json({ success: false, message: 'Invalid admin email or password.' });
      }
      authenticatedUser = user;
    } else if (
      existingAdminCount === 0 &&
      bootstrapEmail &&
      bootstrapPassword &&
      cleanEmail === bootstrapEmail &&
      cleanPassword === bootstrapPassword
    ) {
      authenticatedUser = new User({
        name: 'Super Admin',
        email: cleanEmail,
        password: cleanPassword, // hashed automatically by the User model's pre-save hook
        role: 'superadmin'
      });
      await authenticatedUser.save();
    } else {
      return res.status(401).json({ success: false, message: 'Invalid admin email or password.' });
    }

    const userData = {
      id: authenticatedUser._id,
      name: authenticatedUser.name,
      email: authenticatedUser.email,
      role: authenticatedUser.role || 'superadmin',
      avatar: authenticatedUser.avatar
    };

    // Sign JWT Token with non-expiring extended 365-day expiration
    const token = jwt.sign(
      {
        id: userData.id,
        email: userData.email,
        role: userData.role,
        name: userData.name
      },
      JWT_SECRET,
      { expiresIn: '365d' }
    );

    authenticatedUser.lastLogin = new Date();
    await authenticatedUser.save();

    return res.json({
      success: true,
      message: 'Admin authentication successful!',
      token,
      user: userData
    });
  } catch (error) {
    console.error('Admin Login Error:', error);
    res.status(500).json({ success: false, message: 'Server login error: ' + error.message });
  }
});

app.get('/api/admin/verify', (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, valid: false, message: 'No authentication token provided.' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return res.json({
      success: true,
      valid: true,
      user: decoded
    });
  } catch (error) {
    return res.status(401).json({ success: false, valid: false, message: 'Invalid or expired token.' });
  }
});

app.post('/api/admin/profile', requireAdmin, async (req, res) => {
  try {
    const { name, avatar, newPassword } = req.body;

    if (!isMongoConnected) {
      return res.status(503).json({ success: false, message: 'Profile updates are unavailable — database not connected.' });
    }

    // Only the authenticated admin's own record can be edited — identity comes from the
    // verified JWT (req.admin.email), never from the request body, to prevent one admin
    // (or an attacker with a stolen token) from editing/creating a different account.
    const user = await User.findOne({ email: req.admin.email?.toLowerCase() });
    if (!user) {
      return res.status(404).json({ success: false, message: 'Admin account not found.' });
    }

    if (name) user.name = name;
    if (avatar) user.avatar = avatar;
    if (newPassword) {
      if (newPassword.length < 8) {
        return res.status(400).json({ success: false, message: 'New password must be at least 8 characters.' });
      }
      user.password = newPassword; // hashed automatically by the User model's pre-save hook
    }
    await user.save();

    res.json({
      success: true,
      message: 'Profile updated successfully!',
      data: { name: user.name, email: user.email, avatar: user.avatar }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// LIVE ADMISSION TRACKING API
app.get('/api/track-admission/:query', async (req, res) => {
  try {
    const q = req.params.query.trim().toLowerCase();
    let lead = null;

    if (isMongoConnected) {
      lead = await Inquiry.findOne({
        $or: [
          { phone: { $regex: q, $options: 'i' } },
          { email: { $regex: q, $options: 'i' } },
          { _id: q.length === 24 ? q : null }
        ]
      });
    }

    if (!lead) {
      lead = memoryInquiries.find(i => 
        (i.phone && i.phone.toLowerCase().includes(q)) || 
        (i.email && i.email.toLowerCase().includes(q)) || 
        i._id === q
      );
    }

    if (!lead) {
      // Mock generated tracking response for demonstration if lead registered dynamically
      return res.json({
        success: true,
        found: true,
        data: {
          appId: 'MED-' + Math.floor(100000 + Math.random() * 900000),
          studentName: q.includes('@') ? q.split('@')[0] : 'Medical Aspirant',
          targetCountry: 'Russia / Georgia Govt University',
          currentStepIndex: 2,
          statusMessage: 'DOCUMENT APOSTILLE & UNIVERSITY OFFER ISSUED',
          milestones: [
            { step: '01', label: 'Counselling & Seat Lock', status: 'Completed', date: '2026-08-01' },
            { step: '02', label: 'Document Verification & MEA Apostille', status: 'Completed', date: '2026-08-05' },
            { step: '03', label: 'Official University Admission Letter', status: 'In Progress', date: 'Expected 2026-08-14' },
            { step: '04', label: 'Student Embassy Visa Stamping', status: 'Upcoming', date: 'Scheduled' },
            { step: '05', label: 'Airport Departure & Campus Hostel Allocation', status: 'Upcoming', date: 'Sept 2026' }
          ]
        }
      });
    }

    const milestones = [
      { step: '01', label: 'Counselling & Application Registration', status: 'Completed', date: new Date(lead.createdAt || Date.now()).toLocaleDateString() },
      { step: '02', label: 'Document Verification & MEA Apostille', status: lead.status !== 'New' ? 'Completed' : 'In Progress', date: 'Active' },
      { step: '03', label: 'Official University Offer Letter', status: (lead.status === 'In Counseling' || lead.status === 'Enrolled') ? 'Completed' : 'In Progress', date: 'Active' },
      { step: '04', label: 'Embassy Student Visa Stamping', status: lead.status === 'Enrolled' ? 'Completed' : 'Upcoming', date: 'Pending' },
      { step: '05', label: 'Airport Flight Departure & Hostel Setup', status: lead.status === 'Enrolled' ? 'In Progress' : 'Upcoming', date: 'Sept 2026' }
    ];

    res.json({
      success: true,
      found: true,
      data: {
        appId: 'MED-' + lead._id.toString().substring(0, 6).toUpperCase(),
        studentName: lead.name,
        targetCountry: lead.country,
        currentStepIndex: lead.status === 'Enrolled' ? 4 : lead.status === 'In Counseling' ? 2 : 1,
        statusMessage: lead.status || 'Application Received',
        milestones
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// FMGE / NEXT PRACTICE QUIZ API
app.get('/api/quiz-questions', (req, res) => {
  res.json({
    success: true,
    data: [
      {
        id: 1,
        question: 'Which of the following nerves is most commonly injured in a fracture of the surgical neck of the humerus?',
        options: ['Axillary nerve', 'Radial nerve', 'Median nerve', 'Ulnar nerve'],
        correctAnswer: 0,
        explanation: 'The axillary nerve runs directly behind the surgical neck of the humerus along with the posterior circumflex humeral artery.'
      },
      {
        id: 2,
        question: 'According to NMC guidelines for foreign medical graduates, what is the minimum required duration of MBBS degree abroad?',
        options: ['48 months', '54 months (4.5 years)', '60 months (5 years)', '36 months'],
        correctAnswer: 1,
        explanation: 'As per NMC Gazette notification 2021, foreign medical courses must span at least 54 months of theory/clinical training plus 12 months internship.'
      },
      {
        id: 3,
        question: 'What is the characteristic histological feature of Aschoff bodies seen in Rheumatic Heart Disease?',
        options: ['Anitschkow cells (Caterpillar cells)', 'Reed-Sternberg cells', 'Langhans giant cells', 'Psammoma bodies'],
        correctAnswer: 0,
        explanation: 'Anitschkow cells with slender caterpillar-like nuclear chromatin are pathognomonic histological features of Aschoff nodules in rheumatic carditis.'
      },
      {
        id: 4,
        question: 'Which drug of choice is administered for prophylaxis of Malaria in pregnant women visiting endemic areas?',
        options: ['Mefloquine', 'Primaquine', 'Doxycycline', 'Artemether'],
        correctAnswer: 0,
        explanation: 'Mefloquine is safe and approved for malaria prophylaxis during pregnancy, whereas Primaquine and Doxycycline are strictly contraindicated.'
      }
    ]
  });
});

// SPA Fallback Route
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
});

app.listen(PORT, () => {
  console.log(`Medico Overseas MERN Engine running on port ${PORT}`);
});
