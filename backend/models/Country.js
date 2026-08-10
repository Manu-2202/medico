import mongoose from 'mongoose';

const CountrySchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  slug: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  flag: { type: String, required: true },
  bannerImg: { type: String },
  tagline: { type: String },
  shortBlurb: { type: String },
  quickFacts: { type: Object },
  overview: { type: String },
  eligibility: [{ rule: String, detail: String }],
  universities: [{
    name: String,
    city: String,
    established: String,
    nmcStatus: String,
    tuitionYearUSD: String,
    hostelYearUSD: String,
    messYearUSD: String,
    totalInrYear: String,
    totalCourseInr: String,
    medium: String,
    ranking: String
  }],
  oneTimeCosts: [{ item: String, cost: String }],
  admissionSteps: [{ step: String, title: String, desc: String }],
  documentsChecklist: [{ type: String }],
  visaProcess: {
    processingTime: String,
    embassyFee: String,
    workflow: [String],
    approvalRate: String
  },
  livingCosts: { type: String },
  faqs: [{ q: String, a: String }]
}, { timestamps: true });

export default mongoose.models.Country || mongoose.model('Country', CountrySchema);
