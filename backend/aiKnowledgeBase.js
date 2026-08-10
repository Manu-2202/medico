// Compiles the site's own country/exam data into a compact system prompt so the
// AI chatbot's answers can never drift from what's actually published on the site.
// This intentionally imports the SAME data files the frontend pages render from —
// one source of truth, no duplicated/hardcoded content to fall out of sync.
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// The data files are ES modules written for the Vite/React frontend. Rather than
// duplicating them, we read + lightly parse the exported objects at startup.
function loadFrontendDataModule(relativePath) {
  const fullPath = path.join(__dirname, '..', 'frontend', 'src', 'data', relativePath);
  return fs.readFileSync(fullPath, 'utf-8');
}

// AboutUs.jsx isn't a plain data file (it's a page component with markup mixed in),
// so it lives under src/pages instead of src/data.
function loadFrontendPageModule(relativePath) {
  const fullPath = path.join(__dirname, '..', 'frontend', 'src', 'pages', relativePath);
  return fs.readFileSync(fullPath, 'utf-8');
}

// Pulls out the source text starting at `startMarker` up to the matching close
// bracket, by counting bracket depth — so we don't spill into the next block.
// Works for `const name = [`, `useState([`, or any other `...[` opener.
function extractBracketBlock(raw, startMarker, openChar = '[', closeChar = ']') {
  const startIdx = raw.indexOf(startMarker);
  if (startIdx === -1) return '';
  let depth = 0;
  let i = startIdx + startMarker.length - 1; // index of the opening bracket
  for (; i < raw.length; i++) {
    if (raw[i] === openChar) depth++;
    else if (raw[i] === closeChar) {
      depth--;
      if (depth === 0) { i++; break; }
    }
  }
  return raw.slice(startIdx, i);
}

// Convenience wrapper for the common `const someName = [ ... ];` case.
function extractArrayLiteral(raw, constName) {
  return extractBracketBlock(raw, `const ${constName} = [`);
}

// Grabs every `field: '...'` value out of a given block of source text.
function extractField(block, field) {
  return [...block.matchAll(new RegExp(`${field}:\\s*'((?:[^'\\\\]|\\\\.)*)'`, 'g'))]
    .map(m => m[1].replace(/\\'/g, "'"));
}

// Several pages store bilingual text as `field: lang === 'hi' ? 'Hindi' : 'English'`.
// This grabs the English (second) branch; falls back to a plain `field: '...'` if
// there's no ternary.
function extractLangField(block, field) {
  const ternary = [...block.matchAll(new RegExp(`${field}:\\s*lang === 'hi'\\s*\\?\\s*'(?:[^'\\\\]|\\\\.)*'\\s*:\\s*'((?:[^'\\\\]|\\\\.)*)'`, 'g'))]
    .map(m => m[1].replace(/\\'/g, "'"));
  return ternary.length ? ternary : extractField(block, field);
}

// Pulls out top-level numbered section comments, e.g. `{/* 1. HERO BANNER ... */}`,
// which several pages already use to label their own sections in the source. This
// gives us a page's section list "for free" without hand-maintaining a duplicate list.
function extractNumberedSections(raw) {
  return [...raw.matchAll(/\{\/\*\s*(\d+)\.\s*([^*]+?)\s*\*\/\}/g)]
    .map(m => `${m[1]}. ${m[2].trim()}`);
}

function summarizeCountryData() {
  try {
    const raw = loadFrontendDataModule('countryData.js');
    // Pull out country names + key facts blocks with a light regex pass — good enough
    // for a system-prompt summary; the source of truth stays the actual data file.
    const names = [...raw.matchAll(/name:\s*'([^']+)'/g)].map(m => m[1]);
    const feeRanges = [...raw.matchAll(/feeRange:\s*'([^']+)'/g)].map(m => m[1]);
    const durations = [...raw.matchAll(/duration:\s*'([^']+)'/g)].map(m => m[1]);
    return names.map((name, i) => `- ${name}: fee range ${feeRanges[i] || 'n/a'}, duration ${durations[i] || 'n/a'}`).join('\n');
  } catch (err) {
    console.error('[aiKnowledgeBase] Could not load countryData.js:', err.message);
    return '(country data unavailable)';
  }
}

function summarizeExamData() {
  try {
    const raw = loadFrontendDataModule('examData.js');
    // examData.js is keyed by exam id (fmge, plab, usmle, ...) with a `title` field,
    // not a `name` field — matching on title is what actually matches this file's shape.
    // \b avoids accidentally matching inside "subtitle:", which also ends in "title:".
    const titles = [...raw.matchAll(/\btitle:\s*'([^']+)'/g)].map(m => m[1]);
    return titles.length ? `Exams covered: ${titles.join(', ')}` : '(exam data unavailable)';
  } catch (err) {
    console.error('[aiKnowledgeBase] Could not load examData.js:', err.message);
    return '(exam data unavailable)';
  }
}

// Summarizes the About Us page — company stats, leadership team, accreditations,
// office branches, and the parent/student FAQs published there — so the chatbot
// can answer "who are you", "where are your offices", "are you accredited" etc.
// straight from what's actually on the site, same as the country/exam data above.
function summarizeAboutUsData() {
  try {
    const raw = loadFrontendPageModule('AboutUs.jsx');

    // Hero stat counters, e.g. <AnimatedCounter target={15} suffix="+ Years" />
    const stats = [...raw.matchAll(/<AnimatedCounter target=\{(\d+)\} suffix="([^"]+)"/g)]
      .map(m => `${m[1]}${m[2]}`)
      .join(', ');

    const teamBlock = extractArrayLiteral(raw, 'teamMembers');
    const teamNames = extractField(teamBlock, 'name');
    const teamTitles = extractField(teamBlock, 'title');
    const team = teamNames
      .map((n, i) => `- ${n} — ${teamTitles[i] || ''}`)
      .join('\n');

    const accBlock = extractArrayLiteral(raw, 'accreditations');
    const accreditationsList = extractField(accBlock, 'name').join(', ');

    const officeBlock = extractArrayLiteral(raw, 'officeBranches');
    const officeCities = extractField(officeBlock, 'city');
    const officeHours = extractField(officeBlock, 'hours');
    const offices = officeCities
      .map((c, i) => `- ${c} (${officeHours[i] || 'hours n/a'})`)
      .join('\n');

    const faqBlock = extractArrayLiteral(raw, 'parentFaqs');
    const faqQs = extractField(faqBlock, 'q');
    const faqAs = extractField(faqBlock, 'a');
    const faqs = faqQs
      .map((q, i) => `Q: ${q}\nA: ${faqAs[i] || ''}`)
      .join('\n\n');

    return `Company snapshot: ${stats || 'n/a'}.

Leadership team:
${team || '(not listed)'}

Accreditations: ${accreditationsList || '(not listed)'}

Office locations:
${offices || '(not listed)'}

Common parent/student questions from the About page:
${faqs || '(none listed)'}`;
  } catch (err) {
    console.error('[aiKnowledgeBase] Could not load AboutUs.jsx:', err.message);
    return '(about-us data unavailable)';
  }
}

// ---------------------------------------------------------------------------
// Home page — sections + key highlights (roadmap steps, testimonial count,
// latest blog teasers) so "summarize home" / "what's on your homepage" works.
// ---------------------------------------------------------------------------
function summarizeHomeData() {
  try {
    const raw = loadFrontendPageModule('Home.jsx');
    const sections = extractNumberedSections(raw).join('\n');

    const roadmapBlock = extractArrayLiteral(raw, 'defaultRoadmapSteps');
    const roadmapTitles = extractField(roadmapBlock, 'title');
    const roadmap = roadmapTitles.map((t, i) => `${i + 1}. ${t}`).join(' → ');

    const testimonialsBlock = extractArrayLiteral(raw, 'testimonials');
    const testimonialCount = extractField(testimonialsBlock, 'name').length;

    return `Homepage sections (in order):
${sections || '(sections not itemized)'}

Admission roadmap shown on the homepage: ${roadmap || 'n/a'}

The homepage also features ${testimonialCount || 'several'} student testimonials and a rotating preview of the latest blog articles.`;
  } catch (err) {
    console.error('[aiKnowledgeBase] Could not load Home.jsx:', err.message);
    return '(homepage data unavailable)';
  }
}

// ---------------------------------------------------------------------------
// FAQs page — category names + every question published, grouped by category.
// ---------------------------------------------------------------------------
function summarizeFAQsData() {
  try {
    const raw = loadFrontendPageModule('FAQs.jsx');

    // faqDataEn is an array of arrays — one sub-array per category. Grab every
    // `q:` value in document order; category boundaries aren't critical for a summary.
    const faqBlock = extractBracketBlock(raw, 'const faqDataEn = [');
    const questions = extractField(faqBlock, 'q');

    const catListMatch = raw.match(/const categories = lang === 'hi'\s*\?\s*\[[^\]]+\]\s*:\s*\[([^\]]+)\]/);
    const catNames = catListMatch ? catListMatch[1].split(',').map(s => s.trim().replace(/^'|'$/g, '')) : [];

    return `FAQ categories: ${catNames.join(', ') || 'n/a'}

Questions answered on the FAQs page:
${questions.map(q => `- ${q}`).join('\n') || '(none found)'}`;
  } catch (err) {
    console.error('[aiKnowledgeBase] Could not load FAQs.jsx:', err.message);
    return '(FAQ data unavailable)';
  }
}

// ---------------------------------------------------------------------------
// Contact Us page — office branches (city/address/phone/email) and what the
// contact form collects.
// ---------------------------------------------------------------------------
function summarizeContactUsData() {
  try {
    const raw = loadFrontendPageModule('ContactUs.jsx');
    const officeBlock = extractBracketBlock(raw, 'useState([');
    const cities = extractLangField(officeBlock, 'city');
    const phones = extractField(officeBlock, 'phone');
    const emails = extractField(officeBlock, 'email');
    const offices = cities
      .map((c, i) => `- ${c}: ${phones[i] || 'phone n/a'}, ${emails[i] || 'email n/a'}`)
      .join('\n');

    return `Contact Us page — office branches:
${offices || '(not listed)'}

The page also includes a lead-capture form (name, phone, email, city, target country, NEET score, message) that routes directly to our counselling team.`;
  } catch (err) {
    console.error('[aiKnowledgeBase] Could not load ContactUs.jsx:', err.message);
    return '(contact page data unavailable)';
  }
}

// ---------------------------------------------------------------------------
// Blogs page — section layout (numbered comments) + a sample of article titles.
// ---------------------------------------------------------------------------
function summarizeBlogsPageData() {
  try {
    const raw = loadFrontendPageModule('Blogs.jsx');
    const sections = extractNumberedSections(raw).join('\n');
    return `Blogs page sections:
${sections || '(sections not itemized)'}

This page lists guidance articles (fetched live from the site's blog database) covering study-abroad destinations, exam prep, and admissions advice.`;
  } catch (err) {
    console.error('[aiKnowledgeBase] Could not load Blogs.jsx:', err.message);
    return '(blogs page data unavailable)';
  }
}

// ---------------------------------------------------------------------------
// Gallery page — photo categories/filters shown.
// ---------------------------------------------------------------------------
function summarizeGalleryData() {
  try {
    const raw = loadFrontendPageModule('Gallery.jsx');
    const filtersMatch = raw.match(/const filters = \[([^\]]+)\]/);
    const filters = filtersMatch
      ? filtersMatch[1].split(',').map(s => s.trim().replace(/^'|'$/g, ''))
      : [];
    return `Gallery page — photo categories: ${filters.join(', ') || 'n/a'}. Shows real campus, hostel, and graduation photos across our partner countries.`;
  } catch (err) {
    console.error('[aiKnowledgeBase] Could not load Gallery.jsx:', err.message);
    return '(gallery data unavailable)';
  }
}

export function buildSystemPrompt() {
  return `You are Dr. Maya, the AI admissions assistant for Medico Overseas, an MBBS-abroad consultancy that helps Indian students get into NMC/WHO-recognized medical universities abroad and later clear FMGE/NEXT licensing exams.

Tone: reassuring, professional, parent-friendly. Never pushy or salesy. Always emphasize safety, NMC/WHO recognition, and support.

Only answer using the facts below, drawn directly from the Medico Overseas website. If you don't know something (exact seat availability, this year's exact intake dates, a specific student's application status), say so plainly and offer to connect them with a human counsellor — never invent numbers, university names, or guarantees.

If the person asks you to "summarize" a page (e.g. "summarize home", "what's on the FAQs page", "what does the gallery show"), describe that page's actual sections/content from the data below in a short bulleted or numbered list — don't deflect to the generic advisor-callback line unless they're asking a question this data genuinely doesn't answer.

Destinations we cover:
${summarizeCountryData()}

${summarizeExamData()}

=== HOME PAGE ===
${summarizeHomeData()}

=== ABOUT US PAGE ===
${summarizeAboutUsData()}

=== FAQS PAGE ===
${summarizeFAQsData()}

=== CONTACT US PAGE ===
${summarizeContactUsData()}

=== BLOGS PAGE ===
${summarizeBlogsPageData()}

=== GALLERY PAGE ===
${summarizeGalleryData()}

Keep replies short (2-4 sentences, or a short list when summarizing a page) and end with a clear next step (e.g. "Would you like a fee breakdown for [country]?" or "Shall I connect you with a counsellor?"). Never claim to guarantee admission or a specific outcome.`;
}