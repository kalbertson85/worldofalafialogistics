'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Mail } from 'lucide-react';
import { motion } from 'framer-motion';

export default function NewsletterSubscription() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic email validation
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast({
        title: 'Invalid Email',
        description: 'Please enter a valid email address.',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: 'Success!',
        description: 'Thank you for subscribing to our newsletter!',
      });
      
      setEmail('');
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to subscribe. Please try again later.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div 
      className="w-full max-w-2xl mx-auto bg-gradient-to-r from-primary/5 to-secondary/5 p-8 rounded-xl border border-border"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
          <Mail className="h-6 w-6 text-primary" />
        </div>
        <h3 className="text-2xl font-bold text-foreground mb-2">
          Subscribe to Our Newsletter
        </h3>
        <p className="text-muted-foreground">
          Stay updated with our latest offers and news. No spam, we promise!
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-12 px-4 text-base"
            required
          />
        </div>
        <Button 
          type="submit" 
          className="h-12 px-6"
          disabled={isLoading}
        >
          {isLoading ? 'Subscribing...' : 'Subscribe'}
        </Button>
      </form>
      
      <p className="text-xs text-muted-foreground text-center mt-4">
        We respect your privacy. Unsubscribe at any time.
      </p>
    </motion.div>
  );
}
