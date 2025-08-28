import { useEffect, useState } from "react";
import HeroCarousel from "./HeroCarousel";

const Hero = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // Add a small delay to ensure styles are loaded before animating
    const timer = setTimeout(() => {
      setIsMounted(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  // Add fade-in animation when component mounts
  if (!isMounted) {
    return (
      <div className="h-[80vh] bg-gray-100">
        <div className="h-full flex items-center justify-center">
          <div className="animate-pulse text-gray-400">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <section id="home" className="relative overflow-hidden">
      <HeroCarousel />
    </section>
  );
};

export default Hero;