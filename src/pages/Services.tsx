import { useParams } from 'react-router-dom';
import { 
  Monitor, 
  Sparkles, 
  PenTool, 
  CreditCard, 
  Car, 
  MoreHorizontal, 
  ArrowLeft, 
  ArrowRight,
  Tag, 
  Calendar, 
  MessageCircle,
  ShoppingCart,
  Phone,
  Info,
  Image as ImageIcon
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getItemsByCategory } from '@/data/serviceItems';
import { ServiceItemCard } from '@/components/ServiceItemCard';

const services = {
  electronics: {
    icon: Monitor,
    title: 'Electronics',
    description: 'Quality electronic devices, repairs, and accessories from trusted vendors.',
    details: 'Our electronics service provides a wide range of high-quality devices, repair services, and accessories. We work with trusted vendors to ensure you get the best products and services in Sierra Leone.'
  },
  'vehicle-rentals': {
    icon: Car,
    title: 'Vehicle Rentals',
    description: 'Reliable vehicle rental services for personal and business transportation.',
    details: 'Need reliable transportation? Our vehicle rental service offers a variety of vehicles for all your personal and business needs, with flexible rental terms and competitive rates.'
  },
  fashion: {
    icon: ShoppingCart,
    title: 'Fashion',
    description: 'Trendy and stylish clothing, accessories, and footwear for all occasions.',
    details: 'Discover the latest fashion trends with our curated collection of clothing, accessories, and footwear. We offer high-quality fashion items for men, women, and children.'
  },
  toiletries: {
    icon: Sparkles,
    title: 'Toiletries',
    description: 'Personal care products, cosmetics, and hygiene essentials for daily needs.',
    details: 'Find all your personal care needs in one place. We offer a wide selection of toiletries, cosmetics, and hygiene products from trusted brands.'
  },
  stationery: {
    icon: PenTool,
    title: 'Stationery',
    description: 'Office supplies, educational materials, and writing instruments for work and study.',
    details: 'Complete your office or school supplies with our extensive collection of stationery items. From basic writing instruments to specialized office equipment, we have you covered.'
  },
  'electronic-money': {
    icon: CreditCard,
    title: 'Electronic Money',
    description: 'Secure digital payment solutions and money transfer services.',
    details: 'Our secure electronic money services make transactions easy and convenient. Send and receive money, pay bills, and manage your finances with confidence.'
  },
  'other-services': {
    icon: MoreHorizontal,
    title: 'Other Services',
    description: 'Additional professional services tailored to meet your specific business needs.',
    details: 'Have a specific need? Our range of professional services can be tailored to meet your unique requirements. Contact us to discuss how we can help.'
  }
};

// Sample offers data - in a real app, this would come from an API
const offers = [
  {
    id: 1,
    title: 'Electronics Sale - Up to 30% Off',
    description: 'Get amazing discounts on smartphones, laptops, and electronic accessories from our trusted vendors.',
    service: 'electronics',
    badge: 'Hot Deal',
    date: 'Valid until December 31, 2024'
  },
  {
    id: 2,
    title: 'Vehicle Rental Special Rates',
    description: 'Enjoy special weekly and monthly rates on vehicle rentals for both personal and business use.',
    service: 'vehicle-rentals',
    badge: 'Limited Time',
    date: 'Available all year'
  },
  {
    id: 3,
    title: 'New Customer Welcome Package',
    description: 'First-time customers get exclusive discounts across all service categories plus free consultation.',
    service: 'other-services',
    badge: 'New Customer',
    date: 'Ongoing offer'
  },
  {
    id: 4,
    title: 'Bulk Purchase Discounts',
    description: 'Businesses can save more with our bulk purchase programs on stationery and office supplies.',
    service: 'stationery',
    badge: 'Business Special',
    date: 'Contact for details'
  },
  {
    id: 5,
    title: 'Mobile Money Cashback',
    description: 'Get 5% cashback on all electronic money transfers and bill payments this month.',
    service: 'electronic-money',
    badge: 'Special Offer',
    date: 'This month only'
  }
];

const ServiceDetail = () => {
  const { serviceId } = useParams<{ serviceId?: string }>();
  
  // If no serviceId is provided, show the main services page
  if (!serviceId) {
    return (
      <div className="container mx-auto py-12 px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Our Services</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover our wide range of services designed to meet all your needs
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Object.entries(services).map(([id, service]) => (
            <Link 
              key={id} 
              to={`/services/${id}`}
              className="group block hover:opacity-90 transition-opacity"
            >
              <Card className="h-full transition-all duration-300 hover:shadow-lg">
                <CardContent className="p-6 flex flex-col h-full">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="p-3 rounded-xl bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
                      <service.icon className="h-8 w-8" />
                    </div>
                    <h2 className="text-xl font-semibold text-foreground">{service.title}</h2>
                  </div>
                  <p className="text-muted-foreground mb-6 flex-grow">{service.description}</p>
                  <div className="mt-auto">
                    <Button variant="link" className="p-0 h-auto text-primary hover:no-underline group-hover:underline">
                      View details <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    );
  }

  // If serviceId is provided, show the service details
  const service = services[serviceId as keyof typeof services];
  if (!service) return <div className="container mx-auto py-8">Service not found</div>;

  const Icon = service.icon;
  const serviceItems = getItemsByCategory(serviceId);
  const serviceOffers = offers.filter(offer => offer.service === serviceId);


  return (
    <div className="min-h-screen bg-section-bg py-12">
      <div className="container mx-auto px-4">
        {/* Back button */}
        <div className="mb-8">
          <Button 
            asChild 
            variant="ghost" 
            className="text-muted-foreground hover:text-foreground"
          >
            <Link to="/#services" className="flex items-center">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Services
            </Link>
          </Button>
        </div>

        {/* Service Header */}
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden mb-12">
          <div className="p-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-primary/10 text-primary">
                  <Icon className="w-8 h-8" />
                </div>
                <h1 className="ml-4 text-3xl font-bold text-foreground">{service.title}</h1>
              </div>
              <Button asChild className="mt-4 md:mt-0">
                <a href="#offers" className="flex items-center">
                  View Offers ({serviceOffers.length})
                </a>
              </Button>
            </div>
            
            <div className="prose max-w-none">
              <p className="text-lg text-muted-foreground mb-6">{service.description}</p>
              <p className="text-foreground mb-8">{service.details}</p>
              
              <div className="mt-8 pt-6 border-t border-border">
                <h3 className="text-lg font-medium text-foreground mb-4">How to get started</h3>
                <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                  <li>Browse our current offers below</li>
                  <li>Contact us through our contact form or WhatsApp</li>
                  <li>Discuss your specific requirements with our team</li>
                  <li>We'll handle the rest!</li>
                </ol>
              </div>
              
              <div className="mt-8 flex flex-wrap gap-4">
                <Button asChild>
                  <Link to="/#contact">
                    Contact Us
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <a href="tel:+23276865694">
                    Call Us
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Items Grid */}
        <div className="max-w-7xl mx-auto mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-foreground">
              Available {service.title}
              <span className="ml-3 text-sm font-normal bg-primary/10 text-primary px-3 py-1 rounded-full">
                {serviceItems.length} {serviceItems.length === 1 ? 'Item' : 'Items'}
              </span>
            </h2>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Tag className="w-4 h-4 mr-2" />
                Sort by
              </Button>
            </div>
          </div>

          {serviceItems.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {serviceItems.map((item) => (
                <ServiceItemCard 
                  key={item.id} 
                  item={item}
                  className="hover:shadow-lg transition-all duration-300"
                  onClick={() => window.location.href = `/services/${serviceId}/items/${item.id}`}
                />
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="p-8 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-muted mb-4">
                  <Info className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium text-foreground mb-2">
                  No items available
                </h3>
                <p className="text-muted-foreground mb-6">
                  There are currently no items listed for this category. Please check back later or contact us for more information.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button asChild>
                    <a href="https://chat.whatsapp.com/LBkWUfczT6bLo2wv7QGqb4?mode=ac_t" target="_blank" rel="noopener noreferrer">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Contact on WhatsApp
                    </a>
                  </Button>
                  <Button variant="outline" asChild>
                    <a href="tel:+23276865694">
                      <Phone className="w-4 h-4 mr-2" />
                      Call Us
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Related Offers Section */}
        {serviceOffers.length > 0 && (
          <div id="offers" className="max-w-4xl mx-auto mt-12">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-foreground">
                Current Offers
                <span className="ml-3 text-sm font-normal bg-primary/10 text-primary px-3 py-1 rounded-full">
                  {serviceOffers.length} {serviceOffers.length === 1 ? 'Offer' : 'Offers'}
                </span>
              </h2>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {serviceOffers.map((offer) => (
                <Card key={offer.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="h-3 bg-gradient-to-r from-primary to-secondary"></div>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <Badge className="bg-primary/10 text-primary hover:bg-primary/20">
                        <Tag className="w-3 h-3 mr-1" />
                        {offer.badge}
                      </Badge>
                      <span className="text-sm text-muted-foreground flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {offer.date}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      {offer.title}
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      {offer.description}
                    </p>
                    <div className="flex justify-between items-center mt-6">
                      <Button variant="outline" size="sm" asChild>
                        <Link to="/#contact">
                          Learn More
                        </Link>
                      </Button>
                      <Button size="sm" asChild>
                        <a 
                          href="https://chat.whatsapp.com/LBkWUfczT6bLo2wv7QGqb4?mode=ac_t" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center"
                        >
                          <MessageCircle className="w-4 h-4 mr-2" />
                          Chat Now
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ServiceDetail;
