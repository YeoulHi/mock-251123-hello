import React, { useState } from 'react';
import { Check } from 'lucide-react';
import { Button } from './Button';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';
import { useModalStore } from '../store/useModalStore';

const tiers = [
  {
    name: 'Starter',
    priceMonthly: 0,
    priceYearly: 0,
    description: 'Perfect for side projects and hobbyists.',
    features: ['Up to 3 projects', 'Community support', 'Basic analytics', '1GB storage'],
  },
  {
    name: 'Pro',
    priceMonthly: 29,
    priceYearly: 24,
    description: 'For growing teams and businesses.',
    features: ['Unlimited projects', 'Priority support', 'Advanced analytics', '10GB storage', 'Custom domains', 'Team collaboration'],
    popular: true,
  },
  {
    name: 'Enterprise',
    priceMonthly: 99,
    priceYearly: 89,
    description: 'For large scale mission-critical apps.',
    features: ['Unlimited everything', '24/7 Dedicated support', 'SLA', 'SSO & Audit logs', 'Custom contracts'],
  },
];

export const Pricing: React.FC = () => {
  const [isAnnual, setIsAnnual] = useState(true);
  const { openModal } = useModalStore();

  return (
    <section id="pricing" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-base font-semibold text-brand-600 uppercase tracking-wide">Pricing</h2>
          <p className="mt-2 text-3xl sm:text-4xl font-bold text-slate-900">
            Simple, transparent pricing
          </p>
          <p className="mt-4 text-lg text-slate-600">
            Choose the plan that's right for you. All plans include a 14-day free trial.
          </p>
          
          <div className="mt-8 flex items-center justify-center gap-4">
            <span className={clsx("text-sm font-medium", !isAnnual ? "text-slate-900" : "text-slate-500")}>Monthly</span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className={clsx(
                "relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2",
                isAnnual ? "bg-brand-600" : "bg-slate-200"
              )}
            >
              <span
                className={clsx(
                  "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out",
                  isAnnual ? "translate-x-5" : "translate-x-0"
                )}
              />
            </button>
            <span className={clsx("text-sm font-medium", isAnnual ? "text-slate-900" : "text-slate-500")}>
              Yearly <span className="text-brand-600 font-bold">(Save 20%)</span>
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {tiers.map((tier) => (
            <motion.div
              key={tier.name}
              whileHover={{ y: -5 }}
              className={clsx(
                "relative flex flex-col rounded-2xl border p-8 shadow-sm bg-white",
                tier.popular ? "border-brand-500 ring-2 ring-brand-500 ring-opacity-50" : "border-slate-200"
              )}
            >
              {tier.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-brand-600 px-4 py-1 text-sm font-semibold text-white shadow-sm">
                  Most Popular
                </div>
              )}
              <div className="mb-4">
                <h3 className="text-xl font-bold text-slate-900">{tier.name}</h3>
                <p className="mt-2 text-sm text-slate-500">{tier.description}</p>
              </div>
              <div className="mb-6">
                <span className="text-4xl font-bold text-slate-900">${isAnnual ? tier.priceYearly : tier.priceMonthly}</span>
                <span className="text-slate-500">/month</span>
              </div>
              <ul className="mb-8 space-y-4 flex-1">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-sm text-slate-700">
                    <Check className="h-5 w-5 text-brand-500 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Button 
                variant={tier.popular ? 'primary' : 'outline'} 
                fullWidth
                onClick={openModal}
              >
                {tier.priceMonthly === 0 ? 'Get Started' : 'Start Free Trial'}
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};