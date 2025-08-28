import { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { CartProvider } from '@/contexts/CartContext';
import { AuthProvider } from '@/contexts/AuthContext';
import { Toaster as SonnerToaster } from '@/components/ui/sonner';
import ErrorBoundary from '@/components/ErrorBoundary';
import { Loader2 } from 'lucide-react';
import BackToTop from '@/components/BackToTop';
import { ThemeProvider } from '@/components/ThemeProvider';

// Lazy load components
const Index = lazy(() => import('@/pages/Index'));
const ServiceDetail = lazy(() => import('@/pages/Services'));
const ItemDetail = lazy(() => import('@/components/ItemDetail'));
const Cart = lazy(() => import('@/components/Cart'));
const CheckoutSuccess = lazy(() => import('@/pages/CheckoutSuccess'));
const Orders = lazy(() => import('@/pages/Orders'));
const Login = lazy(() => import('@/pages/Login'));
const Register = lazy(() => import('@/pages/Register'));
const SecuritySettings = lazy(() => import('@/pages/SecuritySettings'));
const PrivacySettings = lazy(() => import('@/pages/PrivacySettings'));
const NotFound = lazy(() => import('@/pages/NotFound'));

// Protected components
const ProtectedRoute = lazy(() => import('@/components/ProtectedRoute'));

// Loading component
const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center">
    <Loader2 className="h-8 w-8 animate-spin text-primary" />
  </div>
);

// Component to handle scroll to hash on route change
const ScrollToHash = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return null;
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

// Wrap app content with providers
const AppContent = () => (
  <AuthProvider>
    <CartProvider>
      <BrowserRouter>
        <ScrollToHash />
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/services" element={<ServiceDetail />} />
            <Route path="/services/:serviceId" element={<ServiceDetail />} />
            <Route 
              path="/services/:serviceId/items/:itemId" 
              element={
                <ErrorBoundary>
                  <ItemDetail />
                </ErrorBoundary>
              } 
            />
            <Route 
              path="/cart" 
              element={
                <ErrorBoundary>
                  <Cart />
                </ErrorBoundary>
              } 
            />
            
            {/* Protected Routes */}
            <Route
              path="/checkout/success"
              element={
                <ProtectedRoute>
                  <CheckoutSuccess />
                </ProtectedRoute>
              }
            />
            <Route
              path="/orders"
              element={
                <ProtectedRoute>
                  <Orders />
                </ProtectedRoute>
              }
            />
            <Route
              path="/security-settings"
              element={
                <ProtectedRoute>
                  <SecuritySettings />
                </ProtectedRoute>
              }
            />
            <Route
              path="/privacy-settings"
              element={
                <ProtectedRoute>
                  <PrivacySettings />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <div className="container py-8">
                    <h1 className="text-2xl font-bold mb-6">My Profile</h1>
                    <p>Profile page coming soon!</p>
                  </div>
                </ProtectedRoute>
              }
            />
            
            {/* 404 Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <BackToTop />
        </Suspense>
      </BrowserRouter>
    </CartProvider>
  </AuthProvider>
);

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light" storageKey="alafia-theme">
        <TooltipProvider>
          <AppContent />
          <Toaster />
          <SonnerToaster position="top-center" />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
