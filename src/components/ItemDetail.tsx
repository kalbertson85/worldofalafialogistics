import { useState, useEffect, useCallback } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from '@/components/ui/dialog';
import { ArrowLeft, Phone, Mail, Clock, ShoppingCart, MessageCircle, Calendar, Users, MapPin, Tag, Share2, Loader2, Star } from 'lucide-react';
import { LazyImage } from '@/components/ui/LazyImage';
import { formatCurrency } from '@/lib/format';
import { getItemById, ServiceItem } from '@/data/serviceItems';
import { useToast } from '@/hooks/use-toast';
import { submitEnquiry, EnquiryData } from '@/lib/api';
import { useCart } from '@/contexts/CartContext';

interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
  preferredContact: string;
  preferredDate: string;
  location: string;
  quantity: number;
  price?: number;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
  [key: string]: string | undefined;
}

const ItemDetail = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { serviceId, itemId } = useParams<{ serviceId: string; itemId: string }>();
  
  const [item, setItem] = useState<ServiceItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { addItem, isInCart } = useCart();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    message: '',
    preferredContact: 'phone',
    preferredDate: '',
    location: '',
    quantity: 1
  });
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  
  const handleAddToCart = useCallback(() => {
    if (!item) return;
    
    // For services with feePercentage, we need to handle them differently
    if (item.feePercentage !== undefined) {
      toast({
        title: 'Service requires configuration',
        description: 'Please use the enquiry form to request this service',
        variant: 'default',
      });
      setIsDialogOpen(true);
      return;
    }
    
    // Create a cart item with the correct type structure
    addItem({
      id: item.id,
      name: item.title,
      price: item.price,
      quantity: quantity,
      ...(item.originalPrice && { originalPrice: item.originalPrice }),
      ...(item.image && { image: item.image })
    } as any); // Using type assertion as a last resort
    
    toast({
      title: 'Added to cart',
      description: `${item.title} has been added to your cart`,
      action: (
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => navigate('/cart')}
          aria-label="View cart"
        >
          View Cart
        </Button>
      ),
    });
  }, [item, quantity, addItem, toast, navigate]);

  // Fetch item data
  useEffect(() => {
    const fetchItem = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 800));
        
        const data = getItemById(itemId || '');
        if (!data) {
          throw new Error('Item not found');
        }
        
        // Set default form values based on item
        setFormData(prev => ({
          ...prev,
          location: data.location || '',
          phone: data.contactInfo?.phone || ''
        }));
        
        setItem(data);
      } catch (err) {
        console.error('Error fetching item:', err);
        setError(err instanceof Error ? err.message : 'Failed to load item');
      } finally {
        setIsLoading(false);
      }
    };
    
    if (itemId) {
      fetchItem();
    } else {
      setError('No item ID provided');
      setIsLoading(false);
    }
  }, [itemId]);

  const validateForm = (): boolean => {
    const errors: FormErrors = {};
    
    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    }
    
    if (!formData.phone.trim()) {
      errors.phone = 'Phone number is required';
    } else if (!/^[+]?[\d\s-]{10,}$/.test(formData.phone)) {
      errors.phone = 'Please enter a valid phone number';
    }
    
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }
    
    if (!formData.message.trim()) {
      errors.message = 'Please enter your message';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    if (!item) return;

    setIsSubmitting(true);
    
    try {
      const enquiryData: EnquiryData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: formData.message,
        preferredContact: formData.preferredContact,
        preferredDate: formData.preferredDate,
        location: formData.location,
        quantity: formData.quantity.toString(),
        itemId: item.id,
        itemTitle: item.title,
        category: item.category,
        price: item.price.toString(),
        totalPrice: (item.price * formData.quantity).toString()
      };
      
      const response = await submitEnquiry(enquiryData);
      
      if (response.success) {
        toast({
          title: 'Enquiry Sent!',
          description: `Thank you for your interest in ${item.title}. We'll contact you via ${formData.preferredContact === 'phone' ? 'phone' : 'email'} soon.`,
        });
        
        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          message: '',
          preferredContact: 'phone',
          quantity: 1,
          preferredDate: new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().split('T')[0],
          location: item.location || ''
        });
        
        // Close dialog after a short delay
        setTimeout(() => {
          setIsDialogOpen(false);
        }, 1000);
      } else {
        throw new Error(response.message || 'Failed to send enquiry');
      }
    } catch (error) {
      console.error('Error submitting enquiry:', error);
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'There was an error sending your enquiry. Please try again later.',
        variant: 'destructive'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const target = e.target as HTMLInputElement;
    const { name, value, type } = target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? parseInt(value) || 1 : value
    }));
  };

  const handleSelectChange = (name: keyof FormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: name === 'quantity' ? parseInt(value) || 1 : value
    }));
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <Loader2 className="w-12 h-12 mx-auto animate-spin text-primary" />
          <p className="mt-4 text-lg font-medium">Loading item details...</p>
        </div>
      </div>
    );
  }

  if (error || !item) {
    return (
      <div className="container py-12 text-center">
        <div className="max-w-md mx-auto">
          <div className="p-6 bg-red-50 rounded-lg">
            <h2 className="text-2xl font-bold text-red-600 mb-2">Error Loading Item</h2>
            <p className="text-red-700 mb-6">{error || 'Item not found'}</p>
            <Button onClick={() => window.location.reload()} variant="outline">
              Try Again
            </Button>
            <Button asChild className="ml-4">
              <Link to="/services">Browse Services</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }
  
  const hasDiscount = item.originalPrice !== undefined && item.originalPrice > item.price;
  const discountPercentage = hasDiscount && item.originalPrice 
    ? Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100) 
    : 0;

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <Loader2 className="w-12 h-12 mx-auto animate-spin text-primary" />
            <p className="mt-4 text-lg font-medium">Loading item details...</p>
          </div>
        </div>
      );
    }

    if (!item) {
      return (
        <div className="container py-12 text-center">
          <div className="max-w-md mx-auto">
            <div className="p-6 bg-red-50 rounded-lg">
              <h2 className="text-2xl font-bold text-red-600 mb-2">Item Not Found</h2>
              <p className="text-red-700 mb-6">The requested item could not be found.</p>
              <Button asChild>
                <Link to="/services">Browse Services</Link>
              </Button>
            </div>
          </div>
        </div>
      );
    }

    return (
      <Card>
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/2 bg-gray-100 flex items-center justify-center p-8">
            <div className="w-full h-64 md:h-full bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg flex items-center justify-center">
              <span className="text-4xl text-muted-foreground">
                {item?.category?.split('-').map(word => word[0].toUpperCase() + word.slice(1)).join(' ').charAt(0) || '...'}
              </span>
            </div>
          </div>

          {/* Details Section */}
          <CardContent className="md:w-1/2 p-8">
            <div className="space-y-4">
                {/* Title and Category */}
                <div className="flex justify-between items-start">
                  <div>
                    <h1 className="text-3xl font-bold text-foreground mb-2">{item.title}</h1>
                    {item.rating && (
                      <div className="flex items-center mb-2">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`w-4 h-4 ${
                                i < Math.floor(item.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
                              }`} 
                            />
                          ))}
                        </div>
                        <span className="ml-2 text-sm text-muted-foreground">
                          {item.rating.toFixed(1)}
                        </span>
                      </div>
                    )}
                  </div>
                  <Badge variant="outline" className="bg-primary/10 text-primary capitalize">
                    {item.category.replace(/-/g, ' ')}
                  </Badge>
                </div>

                {/* Price */}
                <div className="space-y-1">
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-foreground">
                      {formatCurrency(item.price)}
                    </span>
                    {hasDiscount && item.originalPrice && (
                      <span className="text-sm text-muted-foreground line-through">
                        {formatCurrency(item.originalPrice)}
                      </span>
                    )}
                    {hasDiscount && (
                      <Badge variant="secondary" className="ml-2">
                        {discountPercentage}% OFF
                      </Badge>
                    )}
                  </div>
                  {item.feePercentage !== undefined && (
                    <p className="text-sm text-muted-foreground">
                      Service fee: {item.feePercentage}%
                    </p>
                  )}
                </div>

                {/* Location and Duration */}
                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                  {item.location && (
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      {item.location}
                    </div>
                  )}
                  {item.duration && (
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {item.duration}
                    </div>
                  )}
                </div>
              </div>

              <p className="text-muted-foreground mb-6">{item.description}</p>

              {item.features && item.features.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-foreground mb-3">Features</h3>
                  <ul className="space-y-2">
                    {item.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="space-y-4">
                <Button 
                  className="w-full" 
                  size="lg"
                  onClick={handleAddToCart}
                  disabled={isInCart(item?.id || '')}
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  {isInCart(item?.id || '') ? 'Already in Cart' : 'Add to Cart'}
                </Button>
                
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="w-full" size="lg">
                      <MessageCircle className="w-5 h-5 mr-2" />
                      Enquire Now
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle className="text-xl flex items-center">
                        <MessageCircle className="w-5 h-5 mr-2 text-primary" />
                        Enquire About {item.title}
                      </DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium leading-none flex items-center">
                            <Users className="w-4 h-4 mr-1 text-muted-foreground" />
                            Name <span className="text-destructive ml-1">*</span>
                          </label>
                          <Input 
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="Your full name"
                            disabled={isSubmitting}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <label className="text-sm font-medium leading-none flex items-center">
                            <Mail className="w-4 h-4 mr-1 text-muted-foreground" />
                            Email
                          </label>
                          <Input 
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="your.email@example.com"
                            disabled={isSubmitting}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <label className="text-sm font-medium leading-none flex items-center">
                            <Phone className="w-4 h-4 mr-1 text-muted-foreground" />
                            Phone <span className="text-destructive ml-1">*</span>
                          </label>
                          <Input 
                            name="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={handleInputChange}
                            placeholder="Your phone number"
                            disabled={isSubmitting}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <label className="text-sm font-medium leading-none flex items-center">
                            <Tag className="w-4 h-4 mr-1 text-muted-foreground" />
                            Quantity
                          </label>
                          <Input 
                            name="quantity"
                            type="number"
                            min="1"
                            value={formData.quantity}
                            onChange={(e) => setFormData({...formData, quantity: parseInt(e.target.value) || 1})}
                            disabled={isSubmitting}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <label className="text-sm font-medium leading-none flex items-center">
                            <Calendar className="w-4 h-4 mr-1 text-muted-foreground" />
                            Preferred Date
                          </label>
                          <Input 
                            name="preferredDate"
                            type="date"
                            value={formData.preferredDate}
                            onChange={handleInputChange}
                            min={new Date().toISOString().split('T')[0]}
                            disabled={isSubmitting}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <label className="text-sm font-medium leading-none flex items-center">
                            <MessageCircle className="w-4 h-4 mr-1 text-muted-foreground" />
                            Preferred Contact
                          </label>
                          <Select 
                            value={formData.preferredContact}
                            onValueChange={(value) => handleSelectChange('preferredContact', value)}
                            disabled={isSubmitting}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select contact method" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="phone">Phone Call</SelectItem>
                              <SelectItem value="whatsapp">WhatsApp</SelectItem>
                              <SelectItem value="email">Email</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-sm font-medium leading-none flex items-center">
                          <MessageCircle className="w-4 h-4 mr-1 text-muted-foreground" />
                          Message <span className="text-destructive ml-1">*</span>
                        </label>
                        <Textarea 
                          name="message"
                          value={formData.message}
                          onChange={handleInputChange}
                          placeholder={`I'm interested in ${item.title}...`}
                          rows={4}
                          disabled={isSubmitting}
                        />
                      </div>
                      
                      <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4">
                        <Button 
                          type="button" 
                          variant="outline" 
                          onClick={() => setIsDialogOpen(false)}
                          disabled={isSubmitting}
                          className="w-full sm:w-auto"
                        >
                          Cancel
                        </Button>
                        <Button 
                          type="submit" 
                          disabled={isSubmitting}
                          className="w-full sm:w-auto"
                        >
                          {isSubmitting ? (
                            <span className="flex items-center">
                              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                              Sending...
                            </span>
                          ) : 'Send Enquiry'}
                        </Button>
                      </div>
                      
                      <p className="text-xs text-muted-foreground text-center">
                        We'll respond to your enquiry within 24 hours.
                      </p>
                    </form>
                  </DialogContent>
                </Dialog>
                
                <Button variant="outline" className="w-full" size="lg" asChild>
                  <a 
                    href={`https://wa.me/23276865694?text=Hello! I'm interested in ${encodeURIComponent(item.title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center"
                  >
                    <MessageCircle className="w-5 h-5 mr-2" />
                    Chat on WhatsApp
                  </a>
                </Button>
              </div>

              <div className="mt-8 pt-6 border-t border-border/50">
                <h3 className="text-sm font-medium text-muted-foreground mb-3">Need help?</h3>
                <div className="space-y-2">
                  <a 
                    href="tel:+23276865694" 
                    className="flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    +232 76 865 694
                  </a>
                  <a 
                    href="mailto:info@alafiasl.com" 
                    className="flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Mail className="w-4 h-4 mr-2" />
                    info@alafiasl.com
                  </a>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="w-4 h-4 mr-2" />
                    Mon - Fri: 9:00 AM - 5:00 PM
                  </div>
                </div>
              </div>
            </CardContent>
          </div>
        </Card>
      );
  };

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
            <Link to={`/services/${serviceId || ''}`}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Services
            </Link>
          </Button>
        </div>
        
        {renderContent()}
      </div>
    </div>
  );
};

export default ItemDetail;
