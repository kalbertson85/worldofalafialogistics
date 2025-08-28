import { Link } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Tag, ArrowRight, MessageCircle, TrendingUp } from "lucide-react";

// Sample offers data - in a real app, this would come from an API or context
const offers = [
  {
    id: 1,
    title: "Electronics Sale - Up to 30% Off",
    description: "Get amazing discounts on smartphones, laptops, and electronic accessories from our trusted vendors.",
    service: "electronics",
    badge: "Hot Deal",
    date: "Valid until December 31, 2024"
  },
  {
    id: 2,
    title: "Vehicle Rental Special Rates",
    description: "Enjoy special weekly and monthly rates on vehicle rentals for both personal and business use.",
    service: "vehicle-rentals",
    badge: "Limited Time",
    date: "Available all year"
  },
  {
    id: 3,
    title: "New Customer Welcome Package",
    description: "First-time customers get exclusive discounts across all service categories plus free consultation.",
    service: "other-services",
    badge: "New Customer",
    date: "Ongoing offer"
  },
  {
    id: 4,
    title: "Bulk Purchase Discounts",
    description: "Businesses can save more with our bulk purchase programs on stationery and office supplies.",
    service: "stationery",
    badge: "Business Special",
    date: "Contact for details"
  },
  {
    id: 5,
    title: "Mobile Money Cashback",
    description: "Get 5% cashback on all electronic money transfers and bill payments this month.",
    service: "electronic-money",
    badge: "Special Offer",
    date: "This month only"
  }
];

const Offers = () => {

  const announcements = [
    "New service providers joining weekly - expanding our network",
    "Extended operating hours in Bo - now open until 8PM",
    "Mobile app coming soon - get notified about exclusive offers",
    "Partnership with local banks for seamless transactions"
  ];

  return (
    <section id="offers" className="py-20 bg-section-bg">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-secondary mb-6">
            Latest Offers & Announcements
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Stay updated with our latest promotions and important updates from World of Alafia Logistics
          </p>
          <div className="w-24 h-1 bg-primary mx-auto mt-6"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Offers Grid */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {offers.map((offer) => (
                <Card key={offer.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
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
                    
                    <h3 className="text-xl font-semibold text-foreground mb-3">
                      {offer.title}
                    </h3>
                    
                    <p className="text-muted-foreground mb-6">
                      {offer.description}
                    </p>
                    
                    <div className="flex justify-between items-center mt-4 pt-4 border-t border-border/50">
                      <Link 
                        to={`/services/${offer.service}`}
                        className="text-sm font-medium text-primary hover:underline flex items-center"
                      >
                        View all {offer.service} offers
                        <ArrowRight className="w-4 h-4 ml-1" />
                      </Link>
                      
                      <Button size="sm" asChild>
                        <a 
                          href="https://chat.whatsapp.com/LBkWUfczT6bLo2wv7QGqb4?mode=ac_t" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center"
                        >
                          <MessageCircle className="w-4 h-4 mr-2" />
                          Inquire Now
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Latest Announcements */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-secondary mb-4 flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2 text-primary" />
                  Latest Announcements
                </h3>
                
                <ul className="space-y-3">
                  {announcements.map((announcement, index) => (
                    <li key={index} className="flex items-start">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-muted-foreground">{announcement}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Newsletter Signup */}
            <Card className="bg-gradient-to-br from-primary/5 to-secondary/5">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-secondary mb-4">
                  Stay Updated
                </h3>
                
                <p className="text-muted-foreground mb-4">
                  Get the latest offers and announcements delivered directly to your phone.
                </p>
                
                <Button className="w-full btn-primary">
                  Contact Us for Updates
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Offers;