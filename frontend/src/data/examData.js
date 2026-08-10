export const examData = {
  'fmge': {
    id: 'fmge',
    slug: 'fmge-exam',
    title: 'FMGE / NEXT Licensing Exam',
    subtitle: 'Comprehensive Preparation Guide & Coaching Support for Foreign Medical Graduates',
    badge: 'Mandatory Licensing Exam for India',
    bannerImg: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80',
    overview: `The Foreign Medical Graduate Examination (FMGE), also known as the Screening Test conducted by the National Board of Examinations (NBE), is a mandatory licensing examination for Indian citizens who have obtained a primary medical degree (MBBS) from medical universities outside India and wish to practice medicine in India. Under the National Medical Commission (NMC) regulations, this will transition into the National Exit Test (NEXT).`,
    whoMustTakeIt: 'All Indian students completing MBBS from abroad (Russia, Georgia, Kyrgyzstan, Uzbekistan, Armenia, Vietnam, etc.) must clear FMGE / NEXT to register with NMC/State Medical Councils and practice in India.',
    examPattern: {
      mode: 'Computer Based Test (CBT)',
      duration: '5 Hours (Split into 2 Sessions of 2.5 hours each)',
      totalQuestions: '300 Multiple Choice Questions (MCQs)',
      passingMarks: '150 out of 300 (50% passing threshold)',
      negativeMarking: 'No Negative Marking',
      frequency: 'Conducted 2 times a year (June & December)'
    },
    syllabusSubjects: [
      { category: 'Pre-Clinical (60 Marks)', items: 'Anatomy (17), Physiology (17), Biochemistry (17), Pathology (13)' },
      { category: 'Para-Clinical (70 Marks)', items: 'Pharmacology (13), Microbiology (13), Forensic Medicine (10), PSM / Preventive Social Medicine (30)' },
      { category: 'Clinical Subjects (170 Marks)', items: 'Medicine (33), Surgery (32), Obstetrics & Gynecology (30), Pediatrics (15), Orthopedics (10), Ophthalmology (15), ENT (15), Dermatology (10), Psychiatry (10), Radiology (10)' }
    ],
    medicoAssistance: [
      'FMGE/NEXT Integrated Curriculum from 1st Year of MBBS Abroad',
      'Free Access to Medico Overseas FMGE Question Bank & Mock Test Series',
      'Special Summer Vacation Offline Coaching Classes in India',
      'High-Yield Notes, Image-based Question Practice & Last 10 Years PYQs',
      'NMC Registration & Permanent License Filing Guidance post clearing'
    ],
    faqs: [
      { q: 'Is FMGE difficult to pass?', a: 'With early preparation starting from year 3 of MBBS and regular mock tests, over 80% of Medico Overseas students clear FMGE on their first attempt.' },
      { q: 'When will NEXT replace FMGE?', a: 'NMC has proposed replacing FMGE with NEXT (National Exit Test). Medico Overseas aligns its coaching curriculum with NEXT Step-1 and Step-2 formats.' }
    ]
  },

  'nmat': {
    id: 'nmat',
    slug: 'nmat-exam',
    title: 'NMAT Exam Guide (National Medical Admission Test)',
    subtitle: 'Standardized Eligibility Assessment for Medical Education Abroad',
    badge: 'Medical School Entrance Test',
    bannerImg: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1200&q=80',
    overview: `The National Medical Admission Test (NMAT) is a standardized eligibility exam required for admission into medical programs in certain international jurisdictions (such as Philippines and specific global university tracks). It evaluates a student’s aptitude, scientific reasoning, and analytical capabilities prior to entering advanced clinical medical modules.`,
    whoMustTakeIt: 'Students applying to medical programs in destinations or university tracks that mandate an entrance assessment alongside NEET.',
    examPattern: {
      mode: 'Multiple Choice Entrance Exam',
      parts: 'Part 1 (Mental Ability, Verbal, Inductive Reasoning, Quantitative) & Part 2 (Physics, Chemistry, Biology, Social Science)',
      totalScore: 'Standardized Percentile Score (200 - 800 scale)',
      validity: 'Valid for 2 Years from test date'
    },
    syllabusSubjects: [
      { category: 'Part I: Aptitude Battery', items: 'Verbal Ability, Inductive Reasoning, Quantitative Reasoning, Perceptual Acuity' },
      { category: 'Part II: Special Tests', items: 'Biology (Botany/Zoology), General Chemistry, Organic Chemistry, Physics, Social Science' }
    ],
    medicoAssistance: [
      'Comprehensive NMAT Study Material & Practice Workbooks',
      'Online Aptitude & Reasoning Mock Test Simulator',
      'Specialized Physics & Organic Chemistry Refresher Sessions',
      'Registration & Slot Booking Support for NMAT Exam Centers'
    ],
    faqs: [
      { q: 'What is a good NMAT score for top university admission?', a: 'A percentile score of 60 to 90+ is generally considered competitive for premier medical universities.' },
      { q: 'How does Medico Overseas help with NMAT preparation?', a: 'We provide structured diagnostic tests, preparatory guidebooks, and personalized 1-on-1 tutoring sessions.' }
    ]
  }
};
