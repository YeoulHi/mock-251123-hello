import React from 'react';
import * as Accordion from '@radix-ui/react-accordion';
import { ChevronDown } from 'lucide-react';

const items = [
  {
    value: 'item-1',
    question: 'How does the free trial work?',
    answer: 'You get full access to all features for 14 days. No credit card required. At the end of the trial, you can choose to upgrade or stay on the free tier with limited features.',
  },
  {
    value: 'item-2',
    question: 'Can I change plans later?',
    answer: 'Yes, you can upgrade or downgrade at any time. Changes take effect immediately, and billing is prorated.',
  },
  {
    value: 'item-3',
    question: 'Is my data secure?',
    answer: 'Absolutely. We are SOC2 Type II certified and use AES-256 encryption for all data at rest and in transit.',
  },
  {
    value: 'item-4',
    question: 'Do you offer enterprise support?',
    answer: 'Yes, our Enterprise plan includes 24/7 dedicated support, SLA guarantees, and a dedicated account manager.',
  },
];

export const FAQ: React.FC = () => {
  return (
    <section id="faq" className="py-24 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-slate-900">Frequently Asked Questions</h2>
          <p className="mt-4 text-lg text-slate-600">Have questions? We're here to help.</p>
        </div>

        <Accordion.Root type="single" defaultValue="item-1" collapsible className="w-full space-y-4">
          {items.map((item) => (
            <Accordion.Item key={item.value} value={item.value} className="border border-slate-200 rounded-lg overflow-hidden">
              <Accordion.Header className="flex">
                <Accordion.Trigger className="flex flex-1 items-center justify-between bg-white px-6 py-4 text-left font-medium text-slate-900 hover:bg-slate-50 transition-all [&[data-state=open]>svg]:rotate-180 focus:outline-none focus:bg-slate-50">
                  {item.question}
                  <ChevronDown className="h-4 w-4 shrink-0 text-slate-500 transition-transform duration-200" />
                </Accordion.Trigger>
              </Accordion.Header>
              <Accordion.Content className="overflow-hidden text-sm text-slate-600 data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down bg-slate-50/50">
                <div className="px-6 py-4 border-t border-slate-100">
                  {item.answer}
                </div>
              </Accordion.Content>
            </Accordion.Item>
          ))}
        </Accordion.Root>
      </div>
    </section>
  );
};