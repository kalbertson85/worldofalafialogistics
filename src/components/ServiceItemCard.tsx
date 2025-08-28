import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ServiceItem } from "@/data/serviceItems";
import { formatCurrency } from "@/lib/format";

interface ServiceItemCardProps {
  item: ServiceItem;
  className?: string;
  onClick?: () => void;
}

export const ServiceItemCard = ({ 
  item, 
  className,
  onClick 
}: ServiceItemCardProps) => {
  const { title, description, price, image, features = [] } = item;
  
  return (
    <Card 
      className={cn(
        "h-full flex flex-col overflow-hidden hover:shadow-lg transition-shadow",
        className
      )}
      onClick={onClick}
    >
      {image && (
        <div className="h-48 bg-muted overflow-hidden">
          <img 
            src={image} 
            alt={title}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              // Fallback to placeholder if image fails to load
              const target = e.target as HTMLImageElement;
              target.src = '/images/placeholder.svg';
            }}
          />
        </div>
      )}
      
      <CardContent className="p-6 flex-1 flex flex-col">
        <div className="flex-1">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-xl font-semibold text-foreground">{title}</h3>
            {price > 0 && (
              <span className="bg-primary/10 text-primary text-sm font-medium px-2.5 py-1 rounded-full whitespace-nowrap ml-2">
                {formatCurrency(price)}
              </span>
            )}
          </div>
          
          <p className="text-muted-foreground mb-4">{description}</p>
          
          {features.length > 0 && (
            <ul className="space-y-1.5 mb-6">
              {features.slice(0, 3).map((feature, index) => (
                <li key={index} className="flex items-start">
                  <svg 
                    className="h-4 w-4 text-primary mt-0.5 mr-2 flex-shrink-0" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M5 13l4 4L19 7" 
                    />
                  </svg>
                  <span className="text-sm text-muted-foreground">{feature}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
        
        <Button variant="outline" className="w-full mt-auto">
          View Details
        </Button>
      </CardContent>
    </Card>
  );
};

export default ServiceItemCard;
