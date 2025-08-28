import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  image?: string;
  className?: string;
}

export const ServiceCard = ({ 
  icon: Icon, 
  title, 
  description, 
  image,
  className 
}: ServiceCardProps) => {
  const hasImage = Boolean(image);
  
  return (
    <Card className={cn(
      "service-card bg-gradient-to-br from-background to-light-bg border-border h-full overflow-hidden",
      className
    )}>
      {image && (
        <div className="h-48 bg-muted overflow-hidden">
          <img 
            src={image} 
            alt={title}
            className="w-full h-full object-cover"
            onError={(e) => {
              // Fallback to icon if image fails to load
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
            }}
          />
        </div>
      )}
      <CardContent className={cn("p-6", hasImage ? 'text-left' : 'text-center')}>
        {!hasImage && (
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon className="w-8 h-8 text-primary" />
          </div>
        )}
        
        <h3 className="text-xl font-semibold text-foreground mb-3">{title}</h3>
        
        <p className="text-muted-foreground mb-6">{description}</p>
        
        <Button variant="outline" className="w-full">
          Learn More
        </Button>
      </CardContent>
    </Card>
  );
};

export default ServiceCard;