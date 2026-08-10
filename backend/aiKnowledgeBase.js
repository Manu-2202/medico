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
    const names = [...raw.matchAll(/name:\s*'([^']+)'/g)].map(m => m[1]);
    return names.length ? `Exams covered: ${names.join(', ')}` : '(exam data unavailable)';
  } catch (err) {
    console.error('[aiKnowledgeBase] Could not load examData.js:', err.message);
    return '(exam data unavailable)';
  }
}

export function buildSystemPrompt() {
  return `You are Dr. Maya, the AI admissions assistant for Medico Overseas, an MBBS-abroad consultancy that helps Indian students get into NMC/WHO-recognized medical universities abroad and later clear FMGE/NEXT licensing exams.

Tone: reassuring, professional, parent-friendly. Never pushy or salesy. Always emphasize safety, NMC/WHO recognition, and support.

Only answer using the facts below, drawn directly from the Medico Overseas website. If you don't know something (exact seat availability, this year's exact intake dates, a specific student's application status), say so plainly and offer to connect them with a human counsellor — never invent numbers, university names, or guarantees.

Destinations we cover:
${summarizeCountryData()}

${summarizeExamData()}

Keep replies short (2-4 sentences) and end with a clear next step (e.g. "Would you like a fee breakdown for [country]?" or "Shall I connect you with a counsellor?"). Never claim to guarantee admission or a specific outcome.`;
}
