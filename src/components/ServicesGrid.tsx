import { Link } from "react-router-dom";
import { 
  Monitor, 
  Sparkles, 
  PenTool, 
  CreditCard, 
  Car, 
  MoreHorizontal,
  ArrowRight,
  Search,
  X
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useMemo, useEffect } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";
import ServicesGridSkeleton from "./ServicesGridSkeleton";

// Animation variants
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
  show: { 
    opacity: 1, 
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 10
    }
  }
};

const iconHover = {
  scale: 1.05,
  rotate: 5,
  transition: { 
    type: "spring",
    stiffness: 400,
    damping: 10
  }
};

const iconTap = {
  scale: 0.95
};

// Sample offers data - in a real app, this would come from an API or context
const offers = [
  { id: 1, service: 'electronics', title: 'Electronics Sale' },
  { id: 2, service: 'vehicle-rentals', title: 'Vehicle Rental Special' },
  { id: 3, service: 'other-services', title: 'New Customer Offer' },
  { id: 4, service: 'stationery', title: 'Bulk Purchase Discount' },
  { id: 5, service: 'electronic-money', title: 'Mobile Money Cashback' },
];

const ServiceCard = ({ service }: { service: any }) => {
  const Icon = service.icon;
  const slug = service.slug || service.title.toLowerCase().replace(/\s+/g, '-');
  const { addItem } = useCart();
  const { toast } = useToast();
  
  // Count offers for this service
  const offerCount = offers.filter(offer => offer.service === slug).length;
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    try {
      // Create a properly formatted cart item
      const cartItem = {
        id: service.id || slug,
        title: service.title,
        description: service.description,
        price: service.price || 0, // Ensure price is a number
        image: service.image || '',
        category: service.category || 'other-services',
        quantity: 1
      };
      
      addItem(cartItem);
      
      toast({
        title: 'Added to Cart',
        description: `${service.title} has been added to your cart.`,
      });
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast({
        title: 'Error',
        description: 'Failed to add item to cart. Please try again.',
        variant: 'destructive'
      });
    }
  };
  
  return (
    <Link 
      to={`/services/${slug}`}
      className="group block h-full"
    >
      <div className="h-full p-6 bg-white rounded-xl shadow-sm border border-border hover:shadow-md hover:border-primary/20 transition-all duration-300 flex flex-col">
        <div className="flex justify-between items-start mb-4">
          <motion.div 
            className="p-3 w-12 h-12 rounded-lg bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors"
            whileHover={iconHover}
            whileTap={iconTap}
          >
            <motion.div
              initial={{ scale: 1 }}
              whileHover={{ 
                scale: 1.2,
                rotate: 15,
                transition: { 
                  type: "spring",
                  stiffness: 500,
                  damping: 10
                }
              }}
            >
              <Icon className="w-6 h-6" />
            </motion.div>
          </motion.div>
          {offerCount > 0 && (
            <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
              {offerCount} {offerCount === 1 ? 'Offer' : 'Offers'}
            </Badge>
          )}
        </div>
        
        <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
          {service.title}
        </h3>
        <p className="text-muted-foreground flex-grow mb-4">
          {service.description}
        </p>
        
        <div className="mt-auto pt-4 border-t border-border/50 flex justify-between items-center">
          <Button 
            variant="outline" 
            size="sm" 
            className="text-sm"
            onClick={handleAddToCart}
          >
            Add to Cart
          </Button>
          <div className="inline-flex items-center text-sm font-medium text-primary">
            View details
            <ArrowRight className="ml-1 w-4 h-4 transition-transform group-hover:translate-x-1" />
          </div>
        </div>
      </div>
    </Link>
  );
};

// Search and filter component
const SearchAndFilter = ({
  searchQuery,
  setSearchQuery,
  activeCategory,
  setActiveCategory
}: {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  activeCategory: string | null;
  setActiveCategory: (category: string | null) => void;
}) => {
  const categories = [
    { id: 'all', label: 'All Services' },
    { id: 'electronics', label: 'Electronics' },
    { id: 'toiletries', label: 'Toiletries' },
    { id: 'stationery', label: 'Stationery' },
    { id: 'electronic-money', label: 'E-Money' },
    { id: 'vehicle-rentals', label: 'Vehicles' },
    { id: 'other-services', label: 'Other' },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto mb-12">
      {/* Search Bar */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search services..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 pr-10 h-12 text-base"
        />
        {searchQuery && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8"
            onClick={() => setSearchQuery('')}
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Category Filters */}
      <div className="flex flex-wrap gap-2 justify-center">
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={activeCategory === category.id ? 'default' : 'outline'}
            size="sm"
            className={`rounded-full transition-all ${
              activeCategory === category.id
                ? 'bg-primary text-primary-foreground'
                : 'hover:bg-accent hover:text-accent-foreground'
            }`}
            onClick={() => 
              setActiveCategory(category.id === 'all' ? null : category.id)
            }
          >
            {category.label}
          </Button>
        ))}
      </div>
    </div>
  );
};

const ServicesGrid = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  const services = [
    {
      icon: Monitor,
      title: "Electronics",
      description: "Quality electronic devices, repairs, and accessories from trusted vendors.",
      slug: "electronics"
    },
    {
      icon: Sparkles,
      title: "Toiletries",
      description: "Personal care products, cosmetics, and hygiene essentials for daily needs.",
      slug: "toiletries"
    },
    {
      icon: PenTool,
      title: "Stationery",
      description: "Office supplies, educational materials, and writing instruments for work and study.",
      slug: "stationery"
    },
    {
      icon: CreditCard,
      title: "Electronic Money",
      description: "Secure digital payment solutions and money transfer services.",
      slug: "electronic-money"
    },
    {
      icon: Car,
      title: "Vehicle Rentals",
      description: "Reliable vehicle rental services for personal and business transportation.",
      slug: "vehicle-rentals"
    },
    {
      icon: MoreHorizontal,
      title: "Other Services",
      description: "Additional professional services tailored to meet your specific business needs.",
      slug: "other-services"
    }
  ];

  // Filter services based on search query and active category
  const filteredServices = useMemo(() => {
    return services.filter(service => {
      const matchesSearch = service.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          service.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = !activeCategory || service.slug === activeCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [services, searchQuery, activeCategory]);

  return (
    <section id="services" className="py-20 bg-section-bg overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">
            Our Services
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Discover our comprehensive range of services designed to meet all your needs
          </p>
          
          {/* Search and Filter Component */}
          <SearchAndFilter 
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
          />
        </motion.div>
        
        <AnimatePresence mode="wait">
          {isLoading ? (
            <ServicesGridSkeleton />
          ) : filteredServices.length > 0 ? (
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              variants={container}
              initial="hidden"
              animate="show"
              exit={{ opacity: 0 }}
              key="services-grid"
            >
              {filteredServices.map((service) => (
                <motion.div key={service.slug} variants={item}>
                  <ServiceCard service={service} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div 
              className="text-center py-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              key="no-results"
            >
              <div className="text-muted-foreground mb-4">
                <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <h3 className="text-xl font-medium mb-2">No services found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your search or filter criteria
                </p>
              </div>
              <Button 
                variant="outline"
                onClick={() => {
                  setSearchQuery('');
                  setActiveCategory(null);
                }}
              >
                Clear all filters
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default ServicesGrid;