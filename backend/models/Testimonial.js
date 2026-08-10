import mongoose from 'mongoose';

const TestimonialSchema = new mongoose.Schema({
  name: { type: String, required: true },
  university: { type: String, required: true },
  country: { type: String, required: true },
  photo: { type: String },
  quote: { type: String, required: true },
  rating: { type: Number, default: 5 },
  year: { type: String, default: '2025' }
}, { timestamps: true });

export default mongoose.models.Testimonial || mongoose.model('Testimonial', TestimonialSchema);
