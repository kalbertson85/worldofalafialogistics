import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X, ShoppingCart, ArrowUp, Loader2, Home, Info, Layers, Tag, MessageCircle, ChevronRight, User, LogOut, LogIn, UserPlus, Shield } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { useFocusTrap, useSkipToContent } from '@/hooks/useAccessibility';
import { getIconButtonAriaProps } from '@/lib/accessibility';

// Navigation items for the header
const navItems = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#services', label: 'Services' },
  { href: '#offers', label: 'Offers' },
  { href: '#contact', label: 'Contact' }
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const { itemCount } = useCart();
  const { isAuthenticated, user, logout } = useAuth();
  const menuRef = useRef<HTMLDivElement>(null);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  // Handle scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setIsScrolled(offset > 10);
      
      // Update active section based on scroll position
      const sections = ['home', 'about', 'services', 'offers', 'contact'];
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      
      if (currentSection && currentSection !== activeSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeSection]);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
        document.body.style.overflow = '';
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
    document.body.style.overflow = '';
  }, [location]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id);
    }
  };


  // Get icon based on menu item
  const getIcon = (label: string) => {
    switch(label.toLowerCase()) {
      case 'home': return <Home className="w-4 h-4" />;
      case 'about': return <Info className="w-4 h-4" />;
      case 'services': return <Layers className="w-4 h-4" />;
      case 'offers': return <Tag className="w-4 h-4" />;
      case 'contact': return <MessageCircle className="w-4 h-4" />;
      default: return <ChevronRight className="w-4 h-4" />;
    }
  };

  // Mobile menu items
  const mobileMenuItems = [
    { label: 'Home', href: '#home', icon: Home },
    { label: 'About', href: '#about', icon: Info },
    { label: 'Services', href: '#services', icon: Layers },
    { label: 'Offers', href: '#offers', icon: Tag },
    { label: 'Contact', href: '#contact', icon: MessageCircle },
  ];

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-all duration-200",
          isScrolled ? "shadow-sm" : "border-transparent"
        )}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2 sm:space-x-3 group">
              <div className="relative w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 flex-shrink-0 rounded-full overflow-hidden border-2 sm:border-3 border-yellow-500 shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                <img 
                  src="/logo/AlafiaLogo.jpeg" 
                  alt="World of Alafia Logo"
                  className="w-full h-full object-cover"
                  width={80}
                  height={80}
                />
              </div>
              <div className="flex flex-col">
                <h1 className="font-bold text-sm sm:text-base md:text-lg leading-tight">World of Alafia Logistics</h1>
                <p className="text-xs sm:text-sm text-muted-foreground leading-tight">Your Trusted Business Platform</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-2">
              <nav className="flex items-center space-x-1">
                {navItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(item.href.substring(1));
                    }}
                    className={cn(
                      "px-3 py-2 text-sm font-medium rounded-md transition-colors",
                      activeSection === item.href.substring(1)
                        ? "text-primary bg-primary/10"
                        : "text-foreground/80 hover:bg-accent/50"
                    )}
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
              
              <div className="h-6 w-px bg-border mx-2"></div>
              
              <div className="flex items-center space-x-1">
                <ThemeToggle />
                {isAuthenticated ? (
                  <DropdownMenu onOpenChange={setIsUserMenuOpen}>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="rounded-full">
                        <User className="h-5 w-5" />
                        <span className="sr-only">User menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                      <div className="px-2 py-1.5 text-sm font-medium">
                        {user?.email || 'My Account'}
                      </div>
                      <DropdownMenuItem asChild>
                        <Link to="/profile" className="w-full cursor-pointer">
                          <User className="mr-2 h-4 w-4" />
                          <span>Profile</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link to="/orders" className="w-full cursor-pointer">
                          <ShoppingCart className="mr-2 h-4 w-4" />
                          <span>My Orders</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link to="/security-settings" className="w-full cursor-pointer">
                          <Shield className="mr-2 h-4 w-4" />
                          <span>Security Settings</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link to="/privacy-settings" className="w-full cursor-pointer">
                          <Shield className="mr-2 h-4 w-4" />
                          <span>Privacy Settings</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={logout} className="cursor-pointer">
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Logout</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <div className="flex items-center space-x-1">
                    <Link to="/login" className="px-3 py-1.5 text-sm font-medium rounded-md hover:bg-accent/50">
                      Login
                    </Link>
                    <Link 
                      to="/register" 
                      className="px-3 py-1.5 text-sm font-medium rounded-md bg-primary text-primary-foreground hover:bg-primary/90"
                    >
                      Register
                    </Link>
                  </div>
                )}
                <Link to="/cart" className="relative p-2 rounded-full hover:bg-accent" {...getIconButtonAriaProps('View Cart')}>
                  <ShoppingCart className="h-5 w-5" />
                  {itemCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-primary text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center">
                      {itemCount}
                    </span>
                  )}
                </Link>
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="flex items-center md:hidden space-x-2">
              <div className="flex items-center space-x-2">
                <ThemeToggle />
                <Link to="/cart" className="relative p-2" {...getIconButtonAriaProps('View Cart')}>
                  <ShoppingCart className="h-6 w-6" />
                  {itemCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-primary text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                      {itemCount}
                    </span>
                  )}
                </Link>
                <button
                  onClick={() => {
                    setIsMenuOpen(!isMenuOpen);
                    document.body.style.overflow = isMenuOpen ? '' : 'hidden';
                  }}
                  className="p-2 rounded-full hover:bg-accent/50"
                  aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
                  aria-expanded={isMenuOpen}
                  aria-controls="mobile-menu"
                >
                  {isMenuOpen ? (
                    <X className="w-5 h-5" />
                  ) : (
                    <Menu className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>


        {/* Mobile menu panel */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="md:hidden fixed inset-x-0 top-16 bg-background shadow-lg z-50 border-t border-border/40"
              id="mobile-menu"
              ref={menuRef}
            >
              <div className="px-2 pt-2 pb-3 space-y-1">
                {mobileMenuItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(item.href.substring(1));
                      setIsMenuOpen(false);
                      document.body.style.overflow = '';
                    }}
                    className={cn(
                      "flex items-center px-4 py-3 text-base font-medium rounded-md",
                      activeSection === item.href.substring(1)
                        ? "bg-primary/10 text-primary"
                        : "text-foreground/90 hover:bg-accent/50"
                    )}
                  >
                    <item.icon className="h-5 w-5 mr-3" />
                    {item.label}
                  </a>
                ))}
              </div>
              
              {!isAuthenticated && (
                <div className="px-4 py-3 border-t border-border/40 space-y-2">
                  <Button asChild className="w-full">
                    <Link to="/login" onClick={() => {
                      setIsMenuOpen(false);
                      document.body.style.overflow = '';
                    }}>
                      Sign In
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="w-full">
                    <Link to="/register" onClick={() => {
                      setIsMenuOpen(false);
                      document.body.style.overflow = '';
                    }}>
                      Create Account
                    </Link>
                  </Button>
                </div>
              )}
              
            </motion.div>
          )}
        </AnimatePresence>
      </header>

    </>
  );
};

export default Header;
