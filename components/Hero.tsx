import React from 'react';
import { ArrowRight, CheckCircle, Play } from 'lucide-react';
import { Button } from './Button';
import { motion } from 'framer-motion';
import { useModalStore } from '../store/useModalStore';

export const Hero: React.FC = () => {
  const { openModal } = useModalStore();

  return (
    <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full z-[-1]">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-brand-500/10 rounded-full blur-3xl opacity-50 mix-blend-multiply" />
        <div className="absolute top-20 left-1/4 w-[800px] h-[600px] bg-purple-500/10 rounded-full blur-3xl opacity-50 mix-blend-multiply" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 text-brand-700 text-sm font-medium mb-8 border border-brand-100"
        >
          <span className="flex h-2 w-2 rounded-full bg-brand-600 animate-pulse"></span>
          v2.0 is now live
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-slate-900 tracking-tight mb-6"
        >
          Supercharge your <br className="hidden sm:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-purple-600">
            engineering workflow
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg sm:text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed"
        >
          Streamline helps teams build, test, and ship software faster. 
          Automate repetitive tasks and focus on what matters most: creating value.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button size="lg" className="group" onClick={openModal}>
            Start Building Free
            <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Button>
          <Button variant="outline" size="lg" className="group">
            <Play className="mr-2 h-5 w-5 fill-current" />
            Watch Demo
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-sm text-slate-500"
        >
          <div className="flex items-center gap-2">
            <CheckCircle size={16} className="text-brand-600" />
            <span>No credit card required</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle size={16} className="text-brand-600" />
            <span>14-day free trial</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle size={16} className="text-brand-600" />
            <span>Cancel anytime</span>
          </div>
        </motion.div>

        {/* Dashboard Preview */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 relative mx-auto max-w-5xl"
        >
          <div className="rounded-xl bg-slate-900/5 p-2 ring-1 ring-inset ring-slate-900/10 lg:-m-4 lg:rounded-2xl lg:p-4">
            <div className="rounded-lg bg-white shadow-2xl overflow-hidden border border-slate-200">
               <img 
                src="https://picsum.photos/1200/800?random=1" 
                alt="App Dashboard" 
                className="w-full h-auto object-cover"
                width={1200}
                height={800}
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};