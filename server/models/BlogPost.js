import mongoose from 'mongoose';

const BlogPostSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  excerpt: { type: String, required: true },
  content: { type: String, required: true },
  category: { type: String, required: true, enum: ['Russia', 'Georgia', 'Kyrgyzstan', 'Uzbekistan', 'Armenia', 'Vietnam', 'FMGE', 'NMAT', 'General'] },
  author: { type: String, default: 'Medico Overseas Expert Team' },
  readTime: { type: String, default: '5 min read' },
  views: { type: Number, default: 1250 },
  image: { type: String, required: true },
  publishedAt: { type: Date, default: Date.now }
});

export default mongoose.models.BlogPost || mongoose.model('BlogPost', BlogPostSchema);
