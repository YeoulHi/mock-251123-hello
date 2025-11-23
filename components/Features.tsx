import React from 'react';
import { 
  BarChart3, 
  Globe, 
  ShieldCheck, 
  Zap, 
  Users, 
  Workflow 
} from 'lucide-react';
import { motion } from 'framer-motion';

const features = [
  {
    name: 'Real-time Analytics',
    description: 'Get deep insights into your project performance with our advanced real-time analytics dashboard.',
    icon: BarChart3,
  },
  {
    name: 'Global CDN',
    description: 'Deploy your applications to the edge with our lightning-fast global content delivery network.',
    icon: Globe,
  },
  {
    name: 'Enterprise Security',
    description: 'Bank-grade security by default. SOC2 Type II certified, ensuring your data is always safe.',
    icon: ShieldCheck,
  },
  {
    name: 'Instant Deployments',
    description: 'Push to git and we handle the rest. Your changes go live in seconds, not minutes.',
    icon: Zap,
  },
  {
    name: 'Team Collaboration',
    description: 'Built for teams. Comments, review apps, and integrated workflows to keep everyone in sync.',
    icon: Users,
  },
  {
    name: 'Automated Workflows',
    description: 'Set up powerful CI/CD pipelines with a simple configuration file. No DevOps required.',
    icon: Workflow,
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export const Features: React.FC = () => {
  return (
    <section id="features" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-base font-semibold text-brand-600 uppercase tracking-wide">Features</h2>
          <p className="mt-2 text-3xl sm:text-4xl font-bold text-slate-900">
            Everything you need to scale
          </p>
          <p className="mt-4 text-lg text-slate-600">
            We've obsessed over every detail to provide the best experience for developers and teams.
          </p>
        </div>

        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.name}
              variants={item}
              className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 bg-brand-100 rounded-lg flex items-center justify-center mb-6 text-brand-600">
                <feature.icon size={24} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.name}</h3>
              <p className="text-slate-600 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};