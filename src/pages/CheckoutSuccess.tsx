import { Button } from '@/components/ui/button';
import { CheckCircle2, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function CheckoutSuccess() {
  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center py-12">
      <div className="max-w-md w-full space-y-8 text-center">
        <div className="mx-auto flex items-center justify-center h-24 w-24 rounded-full bg-green-100">
          <CheckCircle2 className="h-12 w-12 text-green-600" />
        </div>
        <h1 className="text-3xl font-bold tracking-tight">Order Confirmed!</h1>
        <p className="text-muted-foreground">
          Thank you for your purchase. Your order has been received and is being processed.
        </p>
        <p className="text-muted-foreground">
          You will receive an email confirmation with your order details shortly.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
          <Button asChild>
            <Link to="/orders" className="flex items-center gap-2">
              <ShoppingBag className="h-4 w-4" />
              View Orders
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to="/">
              Continue Shopping
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
