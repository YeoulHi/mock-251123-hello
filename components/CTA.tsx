import React from 'react';
import { Button } from './Button';
import { useModalStore } from '../store/useModalStore';

export const CTA: React.FC = () => {
  const { openModal } = useModalStore();

  return (
    <section className="py-20 bg-brand-700 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"></div>
      <div className="max-w-4xl mx-auto px-4 relative z-10 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
          Ready to streamline your workflow?
        </h2>
        <p className="text-xl text-brand-100 mb-10 max-w-2xl mx-auto">
          Join 10,000+ developers who are shipping faster and happier. 
          Start your 14-day free trial today.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button size="lg" className="bg-white text-brand-700 hover:bg-brand-50 shadow-none" onClick={openModal}>
            Get Started for Free
          </Button>
          <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 hover:text-white focus:ring-white" onClick={openModal}>
            Talk to Sales
          </Button>
        </div>
      </div>
    </section>
  );
};