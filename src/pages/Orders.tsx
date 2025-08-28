import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ShoppingBag, Clock, CheckCircle2, Truck, XCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

type OrderStatus = 'processing' | 'shipped' | 'delivered' | 'cancelled';

interface OrderItem {
  id: string;
  title: string;
  price: number;
  quantity: number;
  image?: string;
}

interface Order {
  id: string;
  date: string;
  status: OrderStatus;
  items: OrderItem[];
  total: number;
}

// Mock data
const mockOrders: Order[] = [
  {
    id: 'ORD-12345',
    date: '2025-08-27',
    status: 'processing',
    total: 15000000,
    items: [
      { id: 'laptop-1', title: 'HP EliteBook 840 G5', price: 8500000, quantity: 1 },
      { id: 'phone-1', title: 'Samsung Galaxy A54 5G', price: 5200000, quantity: 1 }
    ]
  }
];

const statusIcons = {
  processing: <Clock className="w-4 h-4 mr-2 text-amber-500" />,
  shipped: <Truck className="w-4 h-4 mr-2 text-blue-500" />,
  delivered: <CheckCircle2 className="w-4 h-4 mr-2 text-green-500" />,
  cancelled: <XCircle className="w-4 h-4 mr-2 text-red-500" />,
};

const statusLabels = {
  processing: 'Processing',
  shipped: 'Shipped',
  delivered: 'Delivered',
  cancelled: 'Cancelled',
};

export default function Orders() {
  const orders = mockOrders;
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'SLL',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  if (orders.length === 0) {
    return (
      <div className="container max-w-4xl mx-auto px-4 py-12 text-center">
        <div className="bg-muted/20 p-6 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
          <ShoppingBag className="w-12 h-12 text-muted-foreground" />
        </div>
        <h2 className="text-2xl font-bold mb-3">No Orders Yet</h2>
        <p className="text-muted-foreground mb-6">You haven't placed any orders yet.</p>
        <Button asChild>
          <Link to="/#services">Browse Services</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container max-w-6xl mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <h1 className="text-3xl font-bold tracking-tight">My Orders</h1>
        <Button variant="outline" asChild>
          <Link to="/cart" className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
              <line x1="3" x2="21" y1="6" y2="6"></line>
              <path d="M16 10a4 4 0 0 1-8 0"></path>
            </svg>
            Back to Cart
          </Link>
        </Button>
      </div>

      <div className="space-y-6">
        {orders.map((order) => (
          <Card key={order.id}>
            <CardHeader className="bg-muted/50 px-6 py-4 border-b">
              <div className="flex justify-between items-center">
                <h3 className="font-medium">Order #{order.id}</h3>
                <div className="flex items-center">
                  {statusIcons[order.status]}
                  <span>{statusLabels[order.status]}</span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              {order.items.map((item) => (
                <div key={item.id} className="flex justify-between py-2">
                  <div>
                    <p>{item.title}</p>
                    <p className="text-sm text-muted-foreground">
                      Qty: {item.quantity} × {formatCurrency(item.price)}
                    </p>
                  </div>
                  <p>{formatCurrency(item.price * item.quantity)}</p>
                </div>
              ))}
              <div className="mt-4 pt-4 border-t flex justify-between font-medium">
                <span>Total</span>
                <span>{formatCurrency(order.total)}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
