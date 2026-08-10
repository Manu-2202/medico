// Medico Overseas Master AI Knowledge Engine
// Grounded in all site pages: Destinations (8 countries), Licensing Exams (FMGE/NEXT/NMAT),
// Admissions Process, NMC 2021 Gazette rules, Office Locations, and Fee Structures.

export const siteKnowledge = {
  destinations: [
    {
      country: 'Russia',
      slug: 'mbbs-in-russia',
      universities: ['Bashkir State Medical University', 'Kazan Federal University', 'Crimea State Medical University', 'Dagestan State Medical University'],
      tuitionPerYear: '₹3.5 Lakhs to ₹5.5 Lakhs',
      total6YearBudget: '₹18 Lakhs to ₹28 Lakhs',
      duration: '6 Years (including 1 Year Clinical Internship)',
      highlights: '100% English medium, NMC & WHO recognized, high patient inflow in federal university hospitals, native Indian mess available.',
      eligibility: 'NEET Qualified, 50% in 12th PCB (40% for SC/ST/OBC), min 17 years old.'
    },
    {
      country: 'Georgia',
      slug: 'mbbs-in-georgia',
      universities: ['Tbilisi State Medical University', 'Batumi Shota Rustaveli State University', 'New Vision University', 'European University'],
      tuitionPerYear: '₹4.5 Lakhs to ₹6.5 Lakhs',
      total6YearBudget: '₹24 Lakhs to ₹32 Lakhs',
      duration: '6 Years (European ECTS Credit Curriculum)',
      highlights: 'European standard training, USMLE & NEXT aligned preparation, 100% English medium, safe & picturesque environment.',
      eligibility: 'NEET Qualified, 50% in 12th PCB (40% for SC/ST/OBC).'
    },
    {
      country: 'Uzbekistan',
      slug: 'mbbs-in-uzbekistan',
      universities: ['Tashkent Medical Academy', 'Samarkand State Medical University', 'Bukhara State Medical Institute'],
      tuitionPerYear: '₹2.8 Lakhs to ₹3.8 Lakhs',
      total6YearBudget: '₹15 Lakhs to ₹20 Lakhs',
      duration: '6 Years (5 Years Theory + 1 Year Internship)',
      highlights: '3-hour direct flight from New Delhi, affordable tuition, high FMGE pass rate, 24/7 on-ground Medico desk in Tashkent.',
      eligibility: 'NEET Qualified, 50% in 12th PCB.'
    },
    {
      country: 'Kazakhstan',
      slug: 'mbbs-in-kazakhstan',
      universities: ['Kazakh National Medical University', 'Astana Medical University', 'Semey State Medical University'],
      tuitionPerYear: '₹2.6 Lakhs to ₹3.6 Lakhs',
      total6YearBudget: '₹14 Lakhs to ₹19 Lakhs',
      duration: '5 Years Course + 1 Year Internship',
      highlights: 'Central Asia premier medical hub, modern simulation labs, affordable hostel & Indian mess facilities.',
      eligibility: 'NEET Qualified, 50% in 12th PCB.'
    },
    {
      country: 'Kyrgyzstan',
      slug: 'mbbs-in-kyrgyzstan',
      universities: ['Osh State University', 'Jalal-Abad State University', 'International School of Medicine (ISM)'],
      tuitionPerYear: '₹2.5 Lakhs to ₹3.5 Lakhs',
      total6YearBudget: '₹14 Lakhs to ₹18 Lakhs',
      duration: '5 Years + 1 Year Internship',
      highlights: 'Most budget-friendly MBBS option for Indian families, 100% English medium, Indian student community.',
      eligibility: 'NEET Qualified, 50% in 12th PCB.'
    },
    {
      country: 'Armenia',
      slug: 'mbbs-in-armenia',
      universities: ['Yerevan State Medical University', 'Traditional Medicine University'],
      tuitionPerYear: '₹3.2 Lakhs to ₹4.2 Lakhs',
      total6YearBudget: '₹18 Lakhs to ₹22 Lakhs',
      duration: '6 Years',
      highlights: 'Safe Caucasian nation, clinical hospital attachments, European curriculum.',
      eligibility: 'NEET Qualified, 50% in 12th PCB.'
    },
    {
      country: 'Vietnam',
      slug: 'mbbs-in-vietnam',
      universities: ['Can Tho University of Medicine and Pharmacy', 'Hong Bang International University'],
      tuitionPerYear: '₹3.0 Lakhs to ₹4.0 Lakhs',
      total6YearBudget: '₹16 Lakhs to ₹21 Lakhs',
      duration: '6 Years',
      highlights: 'Emerging destination with high clinical bed capacity and government hospital rotations.',
      eligibility: 'NEET Qualified, 50% in 12th PCB.'
    },
    {
      country: 'Philippines',
      slug: 'mbbs-in-philippines',
      universities: ['Davao Medical School Foundation', 'UV Gullas College of Medicine', 'Our Lady of Fatima University'],
      tuitionPerYear: '₹3.5 Lakhs to ₹4.5 Lakhs',
      total6YearBudget: '₹18 Lakhs to ₹24 Lakhs',
      duration: 'BS + MD (1.5 Yrs BS + 4 Yrs MD)',
      highlights: '100% English speaking country, American style disease pattern, NMAT entrance required.',
      eligibility: 'NEET Qualified, 50% in 12th PCB, NMAT Exam.'
    }
  ],

  exams: [
    {
      name: 'FMGE / NEXT Exam',
      slug: 'fmge-exam',
      details: 'Foreign Medical Graduate Examination (FMGE) / National Exit Test (NEXT) is mandatory for Indian graduates returning from abroad to obtain NMC registration to practice medicine in India.'
    },
    {
      name: 'NMAT Exam',
      slug: 'nmat-exam',
      details: 'National Medical Admission Test required for Indian students seeking MD (MBBS) admission in the Philippines.'
    },
    {
      name: 'NEET Qualification Requirement',
      slug: 'neet-guidelines',
      details: 'NEET qualification is compulsory as per NMC regulations (50th percentile General, 40th percentile SC/ST/OBC). NEET score remains valid for 3 years for overseas MBBS admissions.'
    }
  ],

  company: {
    name: 'Medico Overseas Educational Consultancy',
    headOffice: 'Suite 402, Medical Hub Tower, Barakhamba Road, Connaught Place, New Delhi - 110001',
    branches: ['Mumbai (BKC)', 'Hyderabad (Jubilee Hills)', 'Bangalore (M.G. Road)', 'Tashkent Desk', 'Moscow Desk'],
    helplinePhone: '+91 98765 43210',
    helplineEmail: 'info@medicooverseas.com',
    leadEmail: 'manukamepalli8399@gmail.com',
    transparency: '100% direct university fee deposits, zero hidden charges, complete assistance for apostille, visa stamping, and group flight escort.'
  }
};

export function buildSystemPrompt(pageUrl = '', pageTitle = '') {
  const currentContext = pageUrl ? `User is currently viewing page: "${pageUrl}" (Title: "${pageTitle || 'Medico Overseas'}").` : '';

  return `You are Dr. Maya, the 24/7 AI Admissions Specialist at Medico Overseas. You guide medical aspirants and parents on NMC/WHO recognized MBBS abroad options and licensing exams (FMGE/NEXT/NMAT).

Tone: Reassuring, professional, parent-friendly, clear, and informative.

${currentContext}

SITE KNOWLEDGE BASE (Use these accurate facts):
1. DESTINATIONS:
${siteKnowledge.destinations.map(d => `- ${d.country} (${d.slug}): Tuition ${d.tuitionPerYear}, Total Budget ${d.total6YearBudget}, Duration: ${d.duration}. Universities: ${d.universities.join(', ')}. Highlights: ${d.highlights}`).join('\n')}

2. EXAMS & NMC RULES:
${siteKnowledge.exams.map(e => `- ${e.name}: ${e.details}`).join('\n')}

3. ADMISSIONS & COMPANY FACTS:
- Company: ${siteKnowledge.company.name}
- Head Office: ${siteKnowledge.company.headOffice}
- Branches: ${siteKnowledge.company.branches.join(', ')}
- Phone/WhatsApp: ${siteKnowledge.company.helplinePhone}
- Key Commitment: ${siteKnowledge.company.transparency}

INSTRUCTIONS:
- Tailor your answer to the user's specific query and the current page context (${pageUrl || 'general'}).
- Keep responses concise (2 to 4 sentences).
- End with a friendly, logical call-to-action (e.g. "Would you like a detailed fee structure for [country]?" or "Shall I connect you with a senior counselor?").`;
}

export function getKnowledgeAnswer(userMessage, pageUrl = '') {
  const q = (userMessage || '').toLowerCase();
  const path = (pageUrl || '').toLowerCase();

  // Page Context Detection
  let contextCountry = null;
  if (path.includes('russia') || q.includes('russia')) contextCountry = siteKnowledge.destinations.find(d => d.country === 'Russia');
  else if (path.includes('georgia') || q.includes('georgia')) contextCountry = siteKnowledge.destinations.find(d => d.country === 'Georgia');
  else if (path.includes('uzbekistan') || q.includes('uzbekistan')) contextCountry = siteKnowledge.destinations.find(d => d.country === 'Uzbekistan');
  else if (path.includes('kazakhstan') || q.includes('kazakhstan')) contextCountry = siteKnowledge.destinations.find(d => d.country === 'Kazakhstan');
  else if (path.includes('kyrgyzstan') || q.includes('kyrgyzstan')) contextCountry = siteKnowledge.destinations.find(d => d.country === 'Kyrgyzstan');
  else if (path.includes('armenia') || q.includes('armenia')) contextCountry = siteKnowledge.destinations.find(d => d.country === 'Armenia');
  else if (path.includes('vietnam') || q.includes('vietnam')) contextCountry = siteKnowledge.destinations.find(d => d.country === 'Vietnam');
  else if (path.includes('philippines') || q.includes('philippines')) contextCountry = siteKnowledge.destinations.find(d => d.country === 'Philippines');

  if (q.includes('hi') || q.includes('hello') || q.includes('hey') || q.includes('greetings')) {
    if (contextCountry) {
      return `👋 Hello! I am Dr. Maya, your AI Admissions Specialist. I see you are exploring MBBS in ${contextCountry.country}! Annual tuition ranges from ${contextCountry.tuitionPerYear} with top universities like ${contextCountry.universities.slice(0, 2).join(' & ')}. What would you like to know?`;
    }
    return `👋 Hello! I am Dr. Maya, your 24/7 AI Admissions Specialist at Medico Overseas. I can help you compare MBBS fees across 8 countries, check NEET eligibility, or book a free counseling session. How can I assist you today?`;
  }

  if (q.includes('fee') || q.includes('cost') || q.includes('budget') || q.includes('price') || q.includes('lakh')) {
    if (contextCountry) {
      return `💰 For MBBS in ${contextCountry.country}, tuition is approx ${contextCountry.tuitionPerYear} with a total 6-year budget of ${contextCountry.total6YearBudget}. This includes 100% English-medium instruction and native Indian mess options. Would you like a detailed fee breakdown?`;
    }
    return `💰 Total 6-year MBBS budgets across our top destinations:\n• Kyrgyzstan/Kazakhstan: ₹14L–₹19L total\n• Uzbekistan: ₹15L–₹20L total\n• Russia: ₹18L–₹28L total\n• Georgia: ₹24L–₹32L total\nZero hidden charges. Which country would you like to check?`;
  }

  if (q.includes('neet') || q.includes('eligible') || q.includes('mark') || q.includes('qualify')) {
    return `📋 NMC Guidelines for MBBS Abroad:\n• NEET Qualification is mandatory (valid for 3 years).\n• 50% aggregate in 12th Physics, Chemistry, & Biology (40% for SC/ST/OBC).\n• Age: Minimum 17 years by Dec 31.\nWould you like us to verify your 12th marks and NEET score?`;
  }

  if (q.includes('hostel') || q.includes('food') || q.includes('mess') || q.includes('living') || q.includes('stay')) {
    return `🍲 On-campus international hostels feature 2/3 sharing rooms, 24/7 CCTV security, central heating, and hygienic North & South Indian mess halls managed by native Indian chefs daily.`;
  }

  if (q.includes('fmge') || q.includes('next') || q.includes('exam') || q.includes('license')) {
    return `🩺 All our partner universities in Russia, Georgia, and Central Asia follow the 54-month theory/clinical mandate required by NMC Gazette 2021. We provide integrated FMGE & NEXT coaching modules from year 1.`;
  }

  if (q.includes('office') || q.includes('contact') || q.includes('phone') || q.includes('location') || q.includes('address')) {
    return `📍 Medico Overseas Head Office is in New Delhi (Connaught Place), with branch offices in Mumbai (BKC), Hyderabad (Jubilee Hills), and Bangalore (M.G. Road), plus on-ground desks in Tashkent and Moscow. Call us directly at +91 98765 43210!`;
  }

  if (contextCountry) {
    return `🎓 MBBS in ${contextCountry.country} features top state universities such as ${contextCountry.universities.join(', ')}. The course duration is ${contextCountry.duration} with 100% English-medium curriculum and NMC/WHO recognition. Would you like to apply or speak with a counselor?`;
  }

  return `Thank you for reaching out! Medico Overseas provides direct, transparent MBBS admissions in NMC-approved state universities across 8 countries with complete visa, apostille, and Indian mess support. Would you like to check fee details or request a counselor call?`;
}
