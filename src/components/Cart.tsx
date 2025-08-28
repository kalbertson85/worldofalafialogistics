import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useCart } from '@/contexts/CartContext';
import { ShoppingCart, X, Plus, Minus, Trash2, ArrowLeft, Tag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { ServiceItem } from '@/data/serviceItems';
import { formatCurrency } from '@/lib/format';
import { useNavigate } from 'react-router-dom';

interface CartItem extends ServiceItem {
  quantity: number;
}

function Cart() {
  const { toast } = useToast();
  const [isClient, setIsClient] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const navigate = useNavigate();
  const cart = useCart();
  
  const handleCheckout = async () => {
    try {
      setIsCheckingOut(true);
      
      // In a real app, you would process the payment here
      // For now, we'll just navigate to a thank you page
      
      // Clear the cart after successful checkout
      cart?.clearCart();
      
      // Navigate to thank you page
      navigate('/checkout/success');
      
    } catch (error) {
      console.error('Checkout error:', error);
      toast({
        title: 'Checkout Failed',
        description: 'There was an error processing your order. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsCheckingOut(false);
    }
  };
  
  useEffect(() => {
    if (cart?.items) {
      setCartItems(cart.items);
    }
  }, [cart?.items]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null; // Don't render on server
  }

  if (!cart || !cartItems.length) {
    return (
      <div className="container max-w-4xl mx-auto px-4 py-12 text-center">
        <div className="max-w-md mx-auto">
          <div className="bg-muted/20 p-6 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
            <ShoppingCart className="w-12 h-12 text-muted-foreground" />
          </div>
          <h2 className="text-2xl font-bold mb-3">Your cart is empty</h2>
          <p className="text-muted-foreground mb-6">Looks like you haven't added any items yet.</p>
          <Button asChild size="lg" className="px-8">
            <Link to="/#services">Browse Services</Link>
          </Button>
        </div>
      </div>
    );
  }

  // Function to handle back navigation
  const handleBack = () => {
    if (document.referrer && window.location.hostname === new URL(document.referrer).hostname) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  return (
    <div className="container max-w-6xl mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Cart Items */}
        <div className="lg:flex-1">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={handleBack}
                className="h-8 w-8 hover:bg-muted"
                aria-label="Go back"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <h1 className="text-2xl font-bold">
                Shopping Cart ({cartItems.length} {cartItems.length === 1 ? 'item' : 'items'})
              </h1>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => cart?.clearCart?.()}
              className="text-destructive hover:text-destructive"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Clear Cart
            </Button>
          </div>

          <div className="space-y-4">
            {cartItems.map((item) => (
              <Card key={item.id} className="overflow-hidden">
                <CardContent className="p-4">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="w-full sm:w-32 h-32 bg-muted rounded-md overflow-hidden">
                      {item.image ? (
                        <img 
                          src={item.image} 
                          alt={item.title}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            // Fallback if image fails to load
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                            target.nextElementSibling?.classList.remove('hidden');
                          }}
                        />
                      ) : null}
                      <div className={`w-full h-full flex items-center justify-center bg-muted/50 ${item.image ? 'hidden' : ''}`}>
                        <Tag className="w-8 h-8 text-muted-foreground" />
                      </div>
                    </div>
                    
                    <div className="flex-1 flex flex-col">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium text-lg">{item.title}</h3>
                          <p className="text-sm text-muted-foreground">
                            {item.category}
                          </p>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 text-destructive hover:text-destructive"
                          onClick={() => cart?.removeItem?.(item.id)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      <div className="mt-auto pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex items-center gap-2">
                          <Button 
                            variant="outline" 
                            size="icon" 
                            className="h-8 w-8"
                            onClick={(e) => {
                              e.stopPropagation();
                              cart?.updateQuantity(item.id, Math.max(1, item.quantity - 1));
                            }}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <Button 
                            variant="outline" 
                            size="icon" 
                            className="h-8 w-8"
                            onClick={(e) => {
                              e.stopPropagation();
                              cart?.updateQuantity(item.id, item.quantity + 1);
                            }}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                        
                        <div className="text-right">
                          <p className="font-medium">
                            {item.price ? (
                              formatCurrency(item.price * item.quantity)
                            ) : 'Price on request'}
                          </p>
                          {item.quantity > 1 && (
                            <p className="text-sm text-muted-foreground">
                              {formatCurrency(item.price || 0)} each
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="mt-6">
            <Button 
            variant="outline" 
            className="w-full sm:w-auto" 
            asChild
            onClick={() => window.scrollTo(0, 0)}
          >
            <Link to="/#services">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Continue Shopping
            </Link>
          </Button>
          </div>
        </div>
        
        {/* Order Summary */}
        <div className="lg:w-96">
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal ({cartItems.length} {cartItems.length === 1 ? 'item' : 'items'})</span>
                  <span>{formatCurrency(cart?.cartTotal || 0)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="text-green-600 font-medium">Calculated at checkout</span>
                </div>
                <div className="flex justify-between font-medium">
                  <span>Estimated Total</span>
                  <span>{formatCurrency(cart?.cartTotal || 0)}</span>
                </div>
              </div>
              
              <div className="space-y-2 pt-4">
                <Button 
                  className="w-full" 
                  size="lg"
                  onClick={handleCheckout}
                  disabled={isCheckingOut || !cartItems.length}
                >
                  {isCheckingOut ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </>
                  ) : 'Proceed to Checkout'}
                </Button>
                <p className="text-xs text-muted-foreground text-center">
                  By placing your order, you agree to our Terms of Service and Privacy Policy.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export { Cart as default };
