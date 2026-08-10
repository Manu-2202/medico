import mongoose from 'mongoose';

const SiteSettingsSchema = new mongoose.Schema({
  announcementText: { type: String, default: '🔥 Admissions Open 2026-27: Get Up to ₹1 Lakh Scholarship on MBBS Abroad Seats!' },
  helplinePhone: { type: String, default: '+91 98765 43210' },
  helplineEmail: { type: String, default: 'info@medicooverseas.com' },
  whatsappNumber: { type: String, default: '919876543210' },
  heroHeading: { type: String, default: 'Your Trusted Gateway to NMC Approved MBBS Abroad' },
  heroSubheading: { type: String, default: 'Direct admissions in Top Government Medical Universities in Russia, Georgia, Kazakhstan, Uzbekistan, Philippines, Kyrgyzstan & Vietnam.' },
  leadEmails: { type: String, default: 'info@medicooverseas.com, counseling@medicooverseas.com' },
  officeLocations: [{
    city: String,
    address: String,
    phone: String,
    email: String,
    mapUrl: String
  }]
}, { timestamps: true });

export default mongoose.models.SiteSettings || mongoose.model('SiteSettings', SiteSettingsSchema);
