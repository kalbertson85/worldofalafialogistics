import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { ServiceItem } from '@/data/serviceItems';

type CartItem = ServiceItem & {
  quantity: number;
};

type CartContextType = {
  items: CartItem[];
  addItem: (item: ServiceItem, quantity?: number) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  itemCount: number;
  cartTotal: number;
  isInCart: (itemId: string) => boolean;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const { toast } = useToast();

  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        setItems(JSON.parse(savedCart));
      }
    } catch (error) {
      console.error('Failed to load cart from localStorage', error);
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem('cart', JSON.stringify(items));
    } catch (error) {
      console.error('Failed to save cart to localStorage', error);
    }
  }, [items]);

  const addItem = (item: ServiceItem, quantity: number = 1) => {
    setItems(prevItems => {
      const existingItem = prevItems.find(i => i.id === item.id);
      
      if (existingItem) {
        // Update quantity if item already in cart
        return prevItems.map(i =>
          i.id === item.id ? { ...i, quantity: i.quantity + quantity } : i
        );
      }
      
      // Add new item to cart
      return [...prevItems, { ...item, quantity }];
    });

    toast({
      title: 'Added to Cart',
      description: `${item.title} has been added to your cart.`,
    });
  };

  const removeItem = (itemId: string) => {
    setItems(prevItems => prevItems.filter(item => item.id !== itemId));
    
    toast({
      title: 'Item Removed',
      description: 'Item has been removed from your cart.',
    });
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(itemId);
      return;
    }
    
    setItems(prevItems =>
      prevItems.map(item =>
        item.id === itemId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const itemCount = items.reduce((total, item) => total + item.quantity, 0);
  
  const cartTotal = items.reduce((total, item) => {
    // Handle both string and number prices
    const price = item.price ? 
      (typeof item.price === 'string' 
        ? parseFloat(item.price.replace(/[^0-9.]/g, '') || '0')
        : Number(item.price))
      : 0;
    return total + (price * item.quantity);
  }, 0);

  const isInCart = (itemId: string) => {
    return items.some(item => item.id === itemId);
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        itemCount,
        cartTotal,
        isInCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
