/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-unescaped-entities */
// components/sections/TestimonialsSection.tsx
'use client';

import { FC, useState } from "react";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  college: string;
  avatar: string;
  rating: number;
  content: string;
  category: 'student' | 'college';
}

const TestimonialsSection: FC = () => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'student' | 'college'>('all');

  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Priya Sharma",
      role: "Computer Science Student",
      college: "Delhi University",
      avatar: "👩‍🎓",
      rating: 5,
      content: "The platform made my internship process incredibly smooth. From registration to certificate, everything was automated. The 7-subject curriculum was comprehensive and the support team was very helpful throughout the 30-day program.",
      category: 'student'
    },
    {
      id: 2,
      name: "Dr. Rajesh Kumar",
      role: "Head of Department",
      college: "IIT Mumbai",
      avatar: "👨‍🏫",
      rating: 5,
      content: "As a college administrator, this platform has revolutionized how we manage UGC internships. Bulk student onboarding and automated certificate generation saved us countless hours. The analytics help us track student progress effectively.",
      category: 'college'
    },
    {
      id: 3,
      name: "Amit Patel",
      role: "Engineering Student",
      college: "VTU Bengaluru",
      avatar: "👨‍💻",
      rating: 5,
      content: "I was skeptical about online internships, but the structured curriculum and regular assessments made it very engaging. Getting my certificate instantly after completion was amazing! Highly recommended for all students.",
      category: 'student'
    },
    {
      id: 4,
      name: "Prof. Sunita Mehta",
      role: "Dean of Students",
      college: "University of Calcutta",
      avatar: "👩‍🏫",
      rating: 4,
      content: "The college dashboard is incredibly intuitive. We've onboarded 500+ students seamlessly. The UGC compliance and automated workflows have made internship management effortless for our institution.",
      category: 'college'
    },
    {
      id: 5,
      name: "Rohit Verma",
      role: "MBA Student",
      college: "Symbiosis University",
      avatar: "👨‍🎓",
      rating: 5,
      content: "The payment process was smooth and the instant offer letter gave me confidence. The study materials were well-structured and the platform was always accessible. Great initiative for students!",
      category: 'student'
    },
    {
      id: 6,
      name: "Dr. Anjali Singh",
      role: "Placement Officer",
      college: "Anna University",
      avatar: "👩‍💼",
      rating: 5,
      content: "Partnering with KIVT LMS has streamlined our internship program completely. The real-time tracking and automated certificate system have significantly reduced our administrative workload.",
      category: 'college'
    }
  ];

  const filteredTestimonials = activeCategory === 'all' 
    ? testimonials 
    : testimonials.filter(t => t.category === activeCategory);

  const stats = [
    { number: "10,000+", label: "Students Certified" },
    { number: "150+", label: "Partner Colleges" },
    { number: "98%", label: "Satisfaction Rate" },
    { number: "4.9/5", label: "Average Rating" },
  ];

  return (
    <section id="testimonials" className="section-padding bg-gray-50">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            What Our <span className="gradient-text">Community Says</span>
          </h2>
          <p className="text-xl text-gray-600">
            Hear from students and colleges who have transformed their internship experience with our platform.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl p-6 text-center shadow-sm border border-gray-200">
              <div className="text-2xl md:text-3xl font-bold text-blue-600 mb-2">{stat.number}</div>
              <div className="text-gray-600 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Category Filters */}
        <div className="flex justify-center mb-12">
          <div className="bg-white rounded-full p-2 shadow-sm border border-gray-200">
            {[
              { key: 'all', label: 'All Testimonials' },
              { key: 'student', label: 'Students' },
              { key: 'college', label: 'Colleges' }
            ].map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setActiveCategory(key as any)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-200 ${
                  activeCategory === key
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTestimonials.map((testimonial, index) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} index={index} />
          ))}
        </div>

        {/* Trust Badges */}
        <div className="mt-16 text-center">
          <p className="text-gray-600 mb-8 font-medium">Trusted by educational institutions across India</p>
          <div className="flex flex-wrap justify-center gap-8 opacity-60">
            <TrustBadge name="UGC Compliant" />
            <TrustBadge name="ISO Certified" />
            <TrustBadge name="Data Secure" />
            <TrustBadge name="24/7 Support" />
          </div>
        </div>
      </div>
    </section>
  );
};

const TestimonialCard: FC<{ testimonial: Testimonial; index: number }> = ({ testimonial, index }) => {
  return (
    <div 
      className="card group hover:shadow-lg transition-all duration-300 hover:-translate-y-2"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="card-body">
        {/* Rating */}
        <div className="flex mb-4">
          {[...Array(5)].map((_, i) => (
            <span 
              key={i} 
              className={`text-lg ${
                i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'
              }`}
            >
              ★
            </span>
          ))}
        </div>

        {/* Content */}
        <blockquote className="text-gray-700 mb-6 italic leading-relaxed">
          "{testimonial.content}"
        </blockquote>

        {/* Author */}
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-xl">
            {testimonial.avatar}
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-semibold text-gray-900 truncate">{testimonial.name}</div>
            <div className="text-sm text-gray-600 truncate">{testimonial.role}</div>
            <div className="text-xs text-gray-500 truncate">{testimonial.college}</div>
          </div>
          <div className={`px-3 py-1 rounded-full text-xs font-medium ${
            testimonial.category === 'student' 
              ? 'bg-green-100 text-green-800' 
              : 'bg-blue-100 text-blue-800'
          }`}>
            {testimonial.category === 'student' ? 'Student' : 'College'}
          </div>
        </div>
      </div>
    </div>
  );
};

const TrustBadge: FC<{ name: string }> = ({ name }) => {
  return (
    <div className="flex items-center space-x-2 text-gray-700">
      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
      <span className="font-medium">{name}</span>
    </div>
  );
};

export default TestimonialsSection;