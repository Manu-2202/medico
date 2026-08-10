import mongoose from 'mongoose';

const InquirySchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  phone: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true },
  city: { type: String, default: '' },
  country: { type: String, required: true },
  neetScore: { type: String, default: '' },
  message: { type: String, default: '' },
  sourcePage: { type: String, default: 'Homepage' },
  status: { type: String, enum: ['New', 'Contacted', 'In Counseling', 'Enrolled', 'Archived'], default: 'New' },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Inquiry || mongoose.model('Inquiry', InquirySchema);
