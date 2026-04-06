/* eslint-disable react/no-unescaped-entities */
// components/sections/ContactSection.tsx
'use client';

import { FC, useState } from "react";

interface ContactForm {
  name: string;
  email: string;
  phone: string;
  type: 'student' | 'college' | 'general';
  subject: string;
  message: string;
}

const ContactSection: FC = () => {
  const [formData, setFormData] = useState<ContactForm>({
    name: '',
    email: '',
    phone: '',
    type: 'general',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      alert('Thank you for your message! We will get back to you within 24 hours.');
      setFormData({
        name: '',
        email: '',
        phone: '',
        type: 'general',
        subject: '',
        message: ''
      });
    }, 2000);
  };

  const contactMethods = [
    {
      icon: "📧",
      title: "Email Us",
      description: "Send us an email anytime",
      details: "support@edverso.in",
      link: "mailto:support@edverso.in"
    },
    {
      icon: "📞",
      title: "Call Us",
      description: "Mon to Fri, 9AM to 6PM",
      details: "+91-9341041274",
      link: "tel:+919341041274"
    },
    {
      icon: "💬",
      title: "WhatsApp",
      description: "Quick answers via WhatsApp",
      details: "+91-9341041274",
      link: "https://wa.me/919341041274"
    },
    {
      icon: "🏢",
      title: "Registered Address",
      description: "Visit our headquarters",
      details: "Shakuntala Bhawan, Hospital chowk, In back Anamika rest House, Barh, Patna-803213",
      link: "#"
    }
  ];

  const faqs = [
    {
      question: "How long does the internship program last?",
      answer: "The UGC-mandated internship program lasts for 30 days from the date of registration."
    },
    {
      question: "What is the registration fee?",
      answer: "The registration fee is ₹1000 per student, which includes access to all study materials and certificate issuance."
    },
    {
      question: "How do colleges partner with you?",
      answer: "Colleges can partner by contacting our team for bulk onboarding. We provide dedicated dashboards and support for institutional partners."
    },
    {
      question: "When do students receive certificates?",
      answer: "Certificates are automatically generated and available for download immediately after completing the 30-day program."
    }
  ];

  return (
    <section id="contact" className="section-padding bg-white">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Get In <span className="gradient-text">Touch</span>
          </h2>
          <p className="text-xl text-gray-600">
            Have questions? We're here to help. Reach out to our team for any inquiries about 
            student registration or college partnerships.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Information */}
          <div className="lg:col-span-1">
            <div className="space-y-8">
              {/* Contact Methods */}
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h3>
                <div className="space-y-4">
                  {contactMethods.map((method, index) => (
                    <ContactMethod key={index} {...method} />
                  ))}
                </div>
              </div>

              {/* FAQ Preview */}
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Quick Answers</h3>
                <div className="space-y-4">
                  {faqs.slice(0, 2).map((faq, index) => (
                    <FAQItem key={index} {...faq} />
                  ))}
                  <a 
                    href="/faq" 
                    className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
                  >
                    View all FAQs →
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-gray-50 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="input"
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="input"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="input"
                      placeholder="Enter your phone number"
                    />
                  </div>

                  <div>
                    <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-2">
                      I am a *
                    </label>
                    <select
                      id="type"
                      name="type"
                      required
                      value={formData.type}
                      onChange={handleChange}
                      className="input"
                    >
                      <option value="general">General Inquiry</option>
                      <option value="student">Student</option>
                      <option value="college">College/Institution</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    className="input"
                    placeholder="What is this regarding?"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    className="input resize-none"
                    placeholder="Tell us how we can help you..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-primary w-full py-4 text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Sending Message...</span>
                    </div>
                  ) : (
                    "Send Message"
                  )}
                </button>

                <p className="text-sm text-gray-600 text-center">
                  We typically respond within 2-4 hours during business days.
                </p>
              </form>
            </div>
          </div>
        </div>

        {/* Support Hours */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 text-center text-white">
          <h3 className="text-2xl font-bold mb-4">24/7 Student Support</h3>
          <p className="text-blue-100 text-lg mb-4">
            Our dedicated support team is available round the clock to assist students with any platform-related queries.
          </p>
          <div className="flex flex-wrap justify-center gap-8 text-blue-200">
            <div className="flex items-center space-x-2">
              <span>📧</span>
              <span>support@edverso.in</span>
            </div>
            <div className="flex items-center space-x-2">
              <span>📞</span>
              <span>Student Helpline: +91-9341041274</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const ContactMethod: FC<{
  icon: string;
  title: string;
  description: string;
  details: string;
  link: string;
}> = ({ icon, title, description, details, link }) => {
  return (
    <a
      href={link}
      className="flex items-start space-x-4 p-4 rounded-lg hover:bg-white hover:shadow-md transition-all duration-200 group"
    >
      <div className="text-2xl flex-shrink-0 group-hover:scale-110 transition-transform duration-200">
        {icon}
      </div>
      <div className="flex-1">
        <h4 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
          {title}
        </h4>
        <p className="text-gray-600 text-sm mb-1">{description}</p>
        <p className="text-blue-600 font-medium">{details}</p>
      </div>
    </a>
  );
};

const FAQItem: FC<{ question: string; answer: string }> = ({ question, answer }) => {
  return (
    <div className="bg-white rounded-lg p-4 border border-gray-200">
      <h4 className="font-semibold text-gray-900 mb-2">{question}</h4>
      <p className="text-gray-600 text-sm">{answer}</p>
    </div>
  );
};

export default ContactSection;