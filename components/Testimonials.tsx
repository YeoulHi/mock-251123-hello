import React from 'react';
import { Star } from 'lucide-react';

const testimonials = [
  {
    content: "Streamline has completely transformed how our engineering team ships code. The automation features alone saved us 20 hours a week.",
    author: "Sarah Chen",
    role: "CTO at TechFlow",
    image: "https://picsum.photos/100/100?random=2",
  },
  {
    content: "The best developer experience I've had in years. It just works. The real-time analytics give us visibility we never had before.",
    author: "Mark Davis",
    role: "Lead Developer at Stack",
    image: "https://picsum.photos/100/100?random=3",
  },
  {
    content: "We moved from a complex custom infrastructure to Streamline in a weekend. The ROI was immediate. Highly recommended.",
    author: "Jessica Alba",
    role: "VP of Engineering at Core",
    image: "https://picsum.photos/100/100?random=4",
  },
];

export const Testimonials: React.FC = () => {
  return (
    <section id="testimonials" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-slate-900 mb-16">
          Loved by innovative teams
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="flex flex-col p-8 bg-slate-50 rounded-2xl border border-slate-100"
            >
              <div className="flex gap-1 text-yellow-400 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={20} fill="currentColor" />
                ))}
              </div>
              <blockquote className="flex-1 text-lg text-slate-700 mb-6 leading-relaxed">
                "{testimonial.content}"
              </blockquote>
              <div className="flex items-center gap-4">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.author} 
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-white"
                />
                <div>
                  <div className="font-semibold text-slate-900">{testimonial.author}</div>
                  <div className="text-sm text-slate-500">{testimonial.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};