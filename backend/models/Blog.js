import mongoose from 'mongoose';

const BlogSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  slug: { type: String, required: true, unique: true, index: true, trim: true },
  excerpt: { type: String, required: true, trim: true },
  content: { type: String, required: true },
  category: { type: String, default: 'General', index: true },
  tags: [{ type: String }],
  image: { type: String, default: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80' },
  author: { type: String, default: 'Medico Overseas Editorial Team' },
  readTime: { type: String, default: '5 min read' },
  views: { type: Number, default: 0 },
  published: { type: Boolean, default: true }
}, { timestamps: true });

export default mongoose.models.Blog || mongoose.model('Blog', BlogSchema);
