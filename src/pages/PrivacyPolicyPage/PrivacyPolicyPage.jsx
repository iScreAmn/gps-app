import React from 'react';
import './PrivacyPolicyPage.css';

const lastUpdated = 'November 7, 2025';

const sections = [
  {
    title: 'Information We Collect',
    body: [
      'We collect personal information that you voluntarily provide to Georgian Polygraph Services, such as contact details, company information, and project requirements submitted through inquiry forms, email, or phone calls.',
      'We also gather technical information automatically, including IP addresses, browser types, device identifiers, and usage patterns that help us secure our services and improve user experience.'
    ]
  },
  {
    title: 'How We Use Your Information',
    body: [
      'Georgian Polygraph Services uses personal data to respond to inquiries, prepare quotations, deliver products and services, provide technical support, and communicate updates about our solutions.',
      'We may also process aggregated, anonymized usage data to improve our digital platforms, enhance customer support, and develop new offerings tailored to industry needs.'
    ]
  },
  {
    title: 'Legal Basis for Processing',
    body: [
      'We process personal information when it is necessary to perform a contract with you, when it is required to comply with legal obligations, and when Georgian Polygraph Services has a legitimate interest in maintaining secure, reliable, and efficient operations.',
      'Where consent is required for specific communication or data handling, we will obtain it in a clear and granular manner and honor your choices at any time.'
    ]
  },
  {
    title: 'Data Sharing and Transfers',
    body: [
      'We do not sell personal data. We may share information with trusted service providers who assist Georgian Polygraph Services with logistics, technical support, payment processing, or marketing automation, subject to confidentiality obligations.',
      'If data needs to be transferred outside your jurisdiction, we implement safeguards such as contractual clauses and security controls that align with applicable data protection requirements.'
    ]
  },
  {
    title: 'Data Retention and Security',
    body: [
      'We retain personal information only for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required by law.',
      'Georgian Polygraph Services employs administrative, technical, and physical safeguards designed to protect personal data against unauthorized access, alteration, disclosure, or destruction.'
    ]
  },
  {
    title: 'Your Rights and Choices',
    body: [
      'Depending on your location, you may have rights to access, correct, delete, restrict, or object to the processing of your personal data, as well as the right to data portability.',
      'To exercise these rights or update your communication preferences, please contact Georgian Polygraph Services using the details provided below. We will respond to legitimate requests in accordance with applicable law.'
    ]
  },
  {
    title: 'Contact Us',
    body: [
      'For questions about this Privacy Policy or our data practices, contact Georgian Polygraph Services at info@geopolser.ge or call +995 32 230 81 77. Our registered office is located in Tbilisi, Georgia.'
    ]
  }
];

const PrivacyPolicyPage = () => {
  return (
    <section className="privacy-policy">
      <div className="container-mini">
        <header className="privacy-policy__header">
          <h1>Privacy Policy</h1>
          <p>Last updated: {lastUpdated}</p>
        </header>

        <div className="privacy-policy__intro">
          <p>
            This Privacy Policy explains how Georgian Polygraph Services collects, uses, and protects personal information when you interact with our websites, digital platforms, products, and customer support channels.
          </p>
          <p>
            By using our services, you acknowledge that Georgian Polygraph Services processes personal data in accordance with this policy and applicable data protection laws.
          </p>
        </div>

        <div className="privacy-policy__content">
          {sections.map((section) => (
            <article key={section.title} className="privacy-policy__section">
              <h2>{section.title}</h2>
              {section.body.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PrivacyPolicyPage;

