'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

type FAQItem = {
  question: string;
  answer: string;
};

const faqItems: FAQItem[] = [
  {
    question: "What services does Alafia Logistics offer?",
    answer: "We offer a wide range of logistics services including freight forwarding, warehousing, distribution, and supply chain management solutions tailored to your business needs."
  },
  {
    question: "How can I track my shipment?",
    answer: "You can track your shipment using the tracking number provided in your confirmation email. Simply enter it in the tracking section of our website or contact our customer service for assistance."
  },
  {
    question: "What are your business hours?",
    answer: "Our customer service is available Monday to Friday from 8:00 AM to 6:00 PM. For urgent matters outside these hours, please contact our 24/7 emergency line."
  },
  {
    question: "Do you offer international shipping?",
    answer: "Yes, we provide international shipping services to various destinations worldwide. Contact our team for specific country availability and shipping rates."
  },
  {
    question: "How do I get a quote for my shipment?",
    answer: "You can request a quote through our website's contact form, email us directly, or call our customer service. Please provide details about your shipment for an accurate quote."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept various payment methods including bank transfers, credit/debit cards, and mobile money. Payment terms can be discussed based on your business needs."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
            <HelpCircle className="h-6 w-6 text-primary" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Find answers to common questions about our services, shipping, and more.
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqItems.map((item, index) => (
            <div 
              key={index}
              className={cn(
                "border border-border rounded-lg overflow-hidden transition-all",
                openIndex === index ? "bg-card shadow-sm" : "hover:bg-accent/50"
              )}
            >
              <button
                onClick={() => toggleItem(index)}
                className="w-full px-6 py-4 text-left flex items-center justify-between focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
                aria-expanded={openIndex === index}
                aria-controls={`faq-${index}`}
              >
                <span className="font-medium text-foreground">{item.question}</span>
                <motion.span
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown className="h-5 w-5 text-muted-foreground" />
                </motion.span>
              </button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    id={`faq-${index}`}
                    initial="collapsed"
                    animate="open"
                    exit="collapsed"
                    variants={{
                      open: { 
                        opacity: 1, 
                        height: 'auto',
                        marginTop: '0.5rem',
                        marginBottom: '1rem',
                        padding: '0 1.5rem',
                      },
                      collapsed: { 
                        opacity: 0, 
                        height: 0,
                        marginTop: 0,
                        marginBottom: 0,
                        padding: '0 1.5rem',
                      }
                    }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <p className="text-muted-foreground pb-4">{item.answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-muted-foreground mb-4">
            Still have questions? We're here to help!
          </p>
          <a
            href="#contact"
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary/50 transition-colors"
          >
            Contact Us
          </a>
        </div>
      </div>
    </section>
  );
}
