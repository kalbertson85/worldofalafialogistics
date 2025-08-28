import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './HeroCarousel.css';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Custom arrow components for better accessibility
const NextArrow = (props: any) => {
  const { className, style, onClick } = props;
  return (
    <button
      className={`${className} !flex items-center justify-center w-12 h-12 rounded-full bg-black/30 hover:bg-black/50 focus:outline-none focus:ring-2 focus:ring-white/50`}
      style={{ ...style, right: '20px' }}
      onClick={onClick}
      aria-label="Next slide"
    >
      <ChevronRight className="w-6 h-6 text-white" />
    </button>
  );
};

const PrevArrow = (props: any) => {
  const { className, style, onClick } = props;
  return (
    <button
      className={`${className} !flex items-center justify-center w-12 h-12 rounded-full bg-black/30 hover:bg-black/50 focus:outline-none focus:ring-2 focus:ring-white/50`}
      style={{ ...style, left: '20px', zIndex: 1 }}
      onClick={onClick}
      aria-label="Previous slide"
    >
      <ChevronLeft className="w-6 h-6 text-white" />
    </button>
  );
};

const HeroCarousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    fade: true,
    cssEase: 'linear',
    arrows: false,
  };

  const slides = [
    {
      id: 1,
      title: 'World of Alafia Logistics',
      subtitle: 'Your Trusted Business Platform',
      description: 'Connecting service users with trusted service providers across Sierra Leone',
      image: '/images/hero/hero-1.jpg',
      button1: 'Explore Services',
      button2: 'Contact Us',
    },
    {
      id: 2,
      title: 'Premium Services',
      subtitle: 'Quality You Can Trust',
      description: 'Discover our wide range of professional services tailored to your needs',
      image: '/images/hero/hero-2.jpg',
      button1: 'Our Services',
      button2: 'Learn More',
    },
    {
      id: 3,
      title: '24/7 Support',
      subtitle: 'Always Here For You',
      description: 'Our dedicated team is available round the clock to assist you',
      image: '/images/hero/hero-3.jpg',
      button1: 'Get Started',
      button2: 'Contact Support',
    },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Custom slider settings to handle accessibility
  const sliderSettings = {
    ...settings,
    // Add accessibility attributes
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    // Add custom classes to slides
    customPaging: (i: number) => (
      <button 
        aria-label={`Go to slide ${i + 1}`}
        className="w-3 h-3 rounded-full bg-white/30 hover:bg-white/50 focus:outline-none focus:ring-2 focus:ring-white/50"
      />
    ),
  };

  // Track active slide for better accessibility
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const sliderRef = React.useRef<Slider>(null);

  // Update current slide when it changes
  const handleBeforeChange = (oldIndex: number, newIndex: number) => {
    setCurrentSlide(newIndex);
    
    // Ensure focus is managed properly for accessibility
    setTimeout(() => {
      const activeSlide = document.querySelector('.slick-slide.slick-active');
      if (activeSlide) {
        const focusable = activeSlide.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
        if (focusable) {
          (focusable as HTMLElement).focus();
        }
      }
    }, 100);
  };

  return (
    <div className="relative w-full overflow-hidden" role="region" aria-label="Hero carousel">
      <Slider 
        ref={sliderRef}
        {...sliderSettings} 
        className="hero-slider"
        beforeChange={handleBeforeChange}
        accessibility={true}
        adaptiveHeight={false}
      >
        {slides.map((slide, index) => {
          const isActive = index === currentSlide;
          
          return (
            <div 
              key={slide.id} 
              className="relative h-[80vh] w-full"
              role="group"
              aria-roledescription="slide"
              aria-label={`${index + 1} of ${slides.length}`}
              aria-hidden={!isActive}
              tabIndex={-1}
              style={{
                visibility: isActive ? 'visible' : 'hidden',
                position: isActive ? 'relative' : 'absolute'
              }}
            >
              {/* Background Image */}
              <div 
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{ 
                  backgroundImage: `url(${slide.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
                aria-hidden="true"
              >
                <div className="absolute inset-0 bg-black/40" />
              </div>
              
              {/* Content */}
              <div className="relative z-10 h-full flex items-center justify-center">
                <div className="container mx-auto px-4 text-center text-white">
                  <div className="max-w-4xl mx-auto">
                    <div className="mb-6 flex flex-col items-center">
                      <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-2 animate-fade-in">
                        {slide.title}
                      </h2>
                      <p className="text-xl md:text-3xl font-semibold text-primary animate-fade-in animation-delay-100">
                        {slide.subtitle}
                      </p>
                    </div>
                    
                    <p className="text-lg md:text-xl mb-8 text-gray-200 max-w-2xl mx-auto animate-fade-in animation-delay-200">
                      {slide.description}
                    </p>
                    
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in animation-delay-300">
                      <Button 
                        asChild
                        size="lg" 
                        className="btn-primary text-lg px-8 py-4 hover:scale-105 transition-transform"
                        onClick={() => scrollToSection('services')}
                      >
                        <Link to="/services" className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white/50 rounded">
                          {slide.button1}
                        </Link>
                      </Button>
                      <Button 
                        asChild
                        size="lg" 
                        variant="outline" 
                        className="btn-secondary text-lg px-8 py-4 hover:scale-105 transition-transform"
                        onClick={() => scrollToSection('contact')}
                      >
                        <Link to="#contact" className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white/50 rounded">
                          {slide.button2}
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </Slider>
    </div>
  );
};

export default HeroCarousel;
