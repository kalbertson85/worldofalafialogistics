'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled down
  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Scroll to top smoothly
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ 
            opacity: 1, 
            y: 0, 
            scale: 1,
            transition: { 
              type: 'spring',
              stiffness: 300,
              damping: 20
            }
          }}
          exit={{ 
            opacity: 0, 
            y: 20, 
            scale: 0.9,
            transition: { duration: 0.2 }
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="fixed bottom-8 left-8 z-50"
        >
          <Button
            onClick={scrollToTop}
            size="icon"
            className="rounded-full w-14 h-14 shadow-xl bg-primary hover:bg-primary/90 transition-all duration-200"
            aria-label="Back to top"
          >
            <ArrowUp className="h-6 w-6" />
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BackToTop;
