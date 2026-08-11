import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, GraduationCap, ShieldCheck, DollarSign } from 'lucide-react';
import SEO from '../components/SEO';
import { useLanguage } from '../utils/languageContext';

const FAQs = ({ onRequestCounselling }) => {
  const { lang } = useLanguage();
  const [activeCategory, setActiveCategory] = useState(0);
  const [openFaq, setOpenFaq] = useState(null);

  const categories = lang === 'hi'
    ? ['सामान्य', 'एनएमसी दिशानिर्देश', 'फीस और छात्रवृत्ति', 'वीजा और सुरक्षा', 'हॉस्टल और मेस', 'एफएमजीई / नेक्स्ट']
    : ['General', 'NMC Guidelines', 'Fees & Scholarships', 'Visas & Security', 'Hostels & Mess', 'FMGE / NEXT'];

  const faqDataEn = [
    [
      { q: 'Why should I choose MBBS abroad through Medico Overseas?', a: 'Medico Overseas provides 100% official direct university admissions, transparent fee structures with zero capitation fee, complete visa assistance, and on-ground student support in Russia, Georgia, Kyrgyzstan, Uzbekistan, Armenia, and Vietnam.' },
      { q: 'Is NEET mandatory for studying MBBS abroad?', a: 'Yes! Under National Medical Commission (NMC) regulations, NEET qualification is compulsory for all Indian citizens who wish to study MBBS abroad and return to practice medicine in India.' },
      { q: 'What is the duration of MBBS course in abroad universities?', a: 'The MBBS course duration is 6 years (5 years of academic medical education + 1 year of compulsory rotating internship) in full compliance with NMC Gazette rules.' }
    ],
    [
      { q: 'Are medical degrees from foreign universities valid in India?', a: 'Yes! All universities recommended by Medico Overseas are listed in the WHO World Directory of Medical Schools (WDOMS) and strictly fulfill all NMC 2021 Gazette criteria.' },
      { q: 'What is the medium of instruction for MBBS courses?', a: '100% English medium throughout the 6-year program.' }
    ],
    [
      { q: 'What is the average total cost of studying MBBS abroad?', a: 'Total package costs for 6 years (including tuition and hostel) range from ₹14 Lakhs to ₹18 Lakhs in Kyrgyzstan/Uzbekistan, ₹18 Lakhs to ₹28 Lakhs in Russia, and ₹22 Lakhs to ₹32 Lakhs in Georgia.' },
      { q: 'Are education loans available for studying MBBS abroad?', a: 'Yes! Nationalized and private banks in India provide education loans for abroad medical studies. Medico Overseas provides official admission letters and fee structures to assist your bank loan application.' }
    ],
    [
      { q: 'What is the success rate for student visas with Medico Overseas?', a: 'Medico Overseas maintains a 100% student visa approval track record by working directly with respective embassies and state ministries.' },
      { q: 'Are foreign university campuses safe for female students?', a: 'Extremely safe! All campus hostels feature 24/7 CCTV surveillance, biometric access control, electronic security turnstiles, and separate floors/buildings for girls.' }
    ],
    [
      { q: 'Is Indian food available in abroad university hostels?', a: 'Yes! Dedicated Indian dining halls serving North and South Indian vegetarian and non-vegetarian meals daily operate right inside university hostel premises.' }
    ],
    [
      { q: 'How does Medico Overseas help with FMGE/NEXT exam preparation?', a: 'We provide an integrated FMGE/NEXT question bank, mock test series, and live online/offline coaching sessions conducted by renowned Indian medical faculty starting from Year 1.' }
    ]
  ];

  const faqDataHi = [
    [
      { q: 'मेडिको ओवरसीज के माध्यम से विदेश में एमबीबीएस क्यों चुनें?', a: 'मेडिको ओवरसीज 100% आधिकारिक प्रत्यक्ष विश्वविद्यालय प्रवेश, पारदर्शी शुल्क संरचना (बिना डोनेशन), संपूर्ण वीजा सहायता और रूस, जॉर्जिया, किर्गिस्तान, उज्बेकिस्तान, आर्मेनिया और वियतनाम में छात्र समर्थन प्रदान करता है।' },
      { q: 'क्या विदेश में एमबीबीएस के लिए नीट अनिवार्य है?', a: 'हाँ! राष्ट्रीय चिकित्सा आयोग (NMC) के नियमों के तहत, सभी भारतीय नागरिकों के लिए जो विदेश में एमबीबीएस पढ़ना चाहते हैं और भारत में चिकित्सा अभ्यास करना चाहते हैं, नीट योग्यता अनिवार्य है।' },
      { q: 'विदेशी विश्वविद्यालयों में एमबीबीएस कोर्स की अवधि क्या है?', a: 'एमबीबीएस कोर्स की अवधि 6 वर्ष है (5 वर्ष शैक्षणिक चिकित्सा शिक्षा + 1 वर्ष अनिवार्य रोटेटिंग इंटर्नशिप) जो NMC गजट नियमों के पूर्णतः अनुपालन में है।' }
    ],
    [
      { q: 'क्या विदेशी विश्वविद्यालयों की मेडिकल डिग्री भारत में मान्य है?', a: 'हाँ! मेडिको ओवरसीज द्वारा अनुशंसित सभी विश्वविद्यालय WHO वर्ल्ड डायरेक्टरी ऑफ मेडिकल स्कूल्स (WDOMS) में सूचीबद्ध हैं।' },
      { q: 'एमबीबीएस कोर्स में शिक्षा का माध्यम क्या है?', a: 'पूरे 6-वर्षीय कार्यक्रम में 100% अंग्रेजी माध्यम।' }
    ],
    [
      { q: 'विदेश में एमबीबीएस पढ़ने की औसत कुल लागत क्या है?', a: '6 साल की कुल पैकेज लागत (ट्यूशन और हॉस्टल सहित): किर्गिस्तान/उज्बेकिस्तान में ₹14-18 लाख, रूस में ₹18-28 लाख, और जॉर्जिया में ₹22-32 लाख।' },
      { q: 'क्या विदेश में एमबीबीएस के लिए शिक्षा ऋण उपलब्ध है?', a: 'हाँ! भारत में राष्ट्रीयकृत और निजी बैंक विदेशी चिकित्सा अध्ययन के लिए शिक्षा ऋण प्रदान करते हैं। मेडिको ओवरसीज आपके ऋण आवेदन में सहायता के लिए आधिकारिक प्रवेश पत्र और शुल्क संरचना प्रदान करता है।' }
    ],
    [
      { q: 'मेडिको ओवरसीज के साथ छात्र वीजा सफलता दर क्या है?', a: 'मेडिको ओवरसीज संबंधित दूतावासों और राज्य मंत्रालयों के साथ सीधे काम करके 100% छात्र वीजा अनुमोदन ट्रैक रिकॉर्ड बनाए रखता है।' },
      { q: 'क्या विदेशी विश्वविद्यालय परिसर महिला छात्रों के लिए सुरक्षित हैं?', a: 'बेहद सुरक्षित! सभी हॉस्टलों में 24/7 सीसीटीवी निगरानी, बायोमेट्रिक एक्सेस कंट्रोल और लड़कियों के लिए अलग मंजिल/इमारतें हैं।' }
    ],
    [
      { q: 'क्या विदेशी विश्वविद्यालय हॉस्टल में भारतीय खाना मिलता है?', a: 'हाँ! विश्वविद्यालय हॉस्टल परिसर में समर्पित भारतीय डाइनिंग हॉल में उत्तर और दक्षिण भारतीय शाकाहारी और मांसाहारी भोजन परोसा जाता है।' }
    ],
    [
      { q: 'मेडिको ओवरसीज एफएमजीई/नेक्स्ट परीक्षा की तैयारी में कैसे मदद करता है?', a: 'हम वर्ष 1 से शुरू होने वाले एकीकृत एफएमजीई/नेक्स्ट प्रश्न बैंक, मॉक टेस्ट श्रृंखला और प्रसिद्ध भारतीय चिकित्सा संकाय द्वारा आयोजित लाइव ऑनलाइन/ऑफलाइन कोचिंग सत्र प्रदान करते हैं।' }
    ]
  ];

  const faqData = lang === 'hi' ? faqDataHi : faqDataEn;
  const currentFaqs = faqData[activeCategory] || faqData[0];

  return (
    <div>
      <SEO 
        title={lang === 'hi' ? 'अक्सर पूछे जाने वाले प्रश्न | मेडिको ओवरसीज' : 'Frequently Asked Questions | Medico Overseas'}
        description={lang === 'hi' ? 'एनईईटी पात्रता, एनएमसी नियम, ट्यूशन फीस, वीजा और भारतीय हॉस्टल मेस के बारे में स्पष्ट उत्तर प्राप्त करें।' : 'Find clear, authoritative answers regarding NEET eligibility, NMC rules, tuition fee structures, visa steps, and Indian hostel mess.'}
      />

      {/* FAQs Hero Banner */}
      <section style={{ background: 'linear-gradient(135deg, var(--navy-dark), var(--navy-primary))', color: '#ffffff', padding: '36px 0 28px 0', textAlign: 'center' }}>
        <div className="container">
          <span className="badge-coral" style={{ marginBottom: '12px' }}><HelpCircle size={14} /> {lang === 'hi' ? 'ब्लॉग एफएक्यू' : 'Blog FAQ'}</span>
          <h1 style={{ color: '#ffffff', fontSize: '40px', marginBottom: '14px' }}>
            {lang === 'hi' ? 'अक्सर पूछे जाने वाले प्रश्न' : 'Frequently Asked Questions'}
          </h1>
          <p style={{ color: '#cbd5e1', fontSize: '18px', maxWidth: '750px', margin: '0 auto' }}>
            {lang === 'hi'
              ? 'एनईईटी पात्रता, एनएमसी नियम, ट्यूशन फीस संरचना, वीजा चरणों और भारतीय हॉस्टल मेस के बारे में स्पष्ट, आधिकारिक उत्तर खोजें।'
              : 'Find clear, authoritative answers regarding NEET eligibility, NMC rules, tuition fee structures, visa steps, and Indian hostel mess.'}
          </p>
        </div>
      </section>

      {/* Category Tabs */}
      <section style={{ background: '#ffffff', padding: '20px 0', borderBottom: '1px solid #e2e8f0' }}>
        <div className="container" style={{ display: 'flex', gap: '10px', overflowX: 'auto', paddingBottom: '6px' }}>
          {categories.map((cat, idx) => (
            <button
              key={cat}
              onClick={() => { setActiveCategory(idx); setOpenFaq(null); }}
              style={{
                padding: '10px 22px',
                borderRadius: '30px',
                fontSize: '14px',
                fontWeight: '700',
                whiteSpace: 'nowrap',
                background: activeCategory === idx ? 'var(--coral-accent)' : '#f1f5f9',
                color: activeCategory === idx ? '#ffffff' : 'var(--navy-primary)',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* FAQs List */}
      <section style={{ padding: '70px 0', background: '#f8fafc' }}>
        <div className="container" style={{ maxWidth: '900px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {currentFaqs.map((faq, idx) => (
              <div key={idx} className="glass-card" style={{ borderRadius: '16px', overflow: 'hidden' }}>
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  style={{
                    width: '100%',
                    padding: '20px 24px',
                    background: openFaq === idx ? '#f8fafc' : '#ffffff',
                    border: 'none',
                    textAlign: 'left',
                    fontWeight: '700',
                    color: 'var(--navy-primary)',
                    fontSize: '16px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    cursor: 'pointer',
                    gap: '12px'
                  }}
                >
                  <span>{faq.q}</span>
                  {openFaq === idx ? <ChevronUp size={20} color="var(--coral-accent)" /> : <ChevronDown size={20} />}
                </button>

                {openFaq === idx && (
                  <div style={{ padding: '20px 24px', background: '#ffffff', color: 'var(--text-body)', fontSize: '15px', lineHeight: '1.7', borderTop: '1px solid #f1f5f9' }}>
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h3 style={{ fontSize: '22px', color: 'var(--navy-primary)', marginBottom: '12px' }}>
              {lang === 'hi' ? 'और विशिष्ट प्रश्न हैं?' : 'Have more specific questions?'}
            </h3>
            <button className="btn-primary" onClick={onRequestCounselling} style={{ padding: '14px 36px' }}>
              <GraduationCap size={18} /> {lang === 'hi' ? 'वरिष्ठ मेडिकल काउंसलर से बात करें' : 'Talk to Senior Medical Counselor'}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FAQs;
