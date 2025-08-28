// Sample data structure for items in each service category
export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  price: number;
  originalPrice?: number;
  feePercentage?: number; // For services with percentage-based pricing
  image: string;
  features?: string[];
  category: string;
  rating?: number;
  isPopular?: boolean;
  duration?: string;
  groupSize?: string;
  location?: string;
  mapLink?: string;
  contactInfo?: {
    phone: string;
    email: string;
    hours?: string;
  };
}

export const serviceItems: ServiceItem[] = [
  // Electronics
  {
    id: 'laptop-1',
    title: 'HP EliteBook 840 G5',
    description: '14" FHD, Intel Core i5-8350U, 8GB RAM, 256GB SSD, Windows 10 Pro',
    price: 8500000,
    originalPrice: 9200000,
    image: '/images/services/laptop-hp-elitebook.jpg',
    category: 'electronics',
    rating: 4.7,
    isPopular: true,
    duration: '1-2 business days',
    location: 'Freetown, Sierra Leone',
    mapLink: 'https://maps.app.goo.gl/example',
    features: [
      '14" Full HD Display',
      '8th Gen Intel Core i5',
      '8GB DDR4 RAM',
      '256GB SSD Storage',
      'Fingerprint Reader',
      'Backlit Keyboard'
    ],
    contactInfo: {
      phone: '+23276865694',
      email: 'electronics@worldofalafia.com',
      hours: 'Mon-Fri: 9AM - 6PM'
    }
  },
  {
    id: 'phone-1',
    title: 'Samsung Galaxy A54 5G',
    description: '6.4" FHD+ 120Hz, 8GB RAM, 256GB Storage, 50MP Camera',
    price: 5200000,
    originalPrice: 5700000,
    image: '/images/services/samsung-galaxy-a54.jpg',
    category: 'electronics',
    rating: 4.5,
    isPopular: true,
    duration: 'In stock',
    location: 'Freetown, Sierra Leone',
    mapLink: 'https://maps.app.goo.gl/example',
    features: [
      '6.4" FHD+ 120Hz Display',
      '50MP Main Camera',
      '8GB RAM + 256GB Storage',
      '5G Connectivity',
      '5000mAh Battery'
    ]
  },
  {
    id: 'phone-2',
    title: 'iPhone 13 Pro',
    description: '6.1" Super Retina XDR, A15 Bionic, 128GB, 12MP Camera',
    price: 7800000,
    originalPrice: 8500000,
    image: '/images/services/iphone-13-pro.jpg',
    category: 'electronics',
    rating: 4.8,
    isPopular: true,
    duration: 'In stock',
    location: 'Freetown, Sierra Leone',
    features: [
      '6.1" Super Retina XDR',
      'A15 Bionic Chip',
      '128GB Storage',
      '12MP Triple Camera',
      'Face ID',
      'Ceramic Shield'
    ]
  },
  {
    id: 'laptop-2',
    title: 'Dell XPS 13',
    description: '13.4" 4K Touch, Intel i7-1165G7, 16GB RAM, 512GB SSD',
    price: 12500000,
    originalPrice: 13500000,
    image: '/images/services/dell-xps-13.jpg',
    category: 'electronics',
    rating: 4.9,
    isPopular: true,
    duration: '2-3 business days',
    location: 'Freetown, Sierra Leone',
    features: [
      '13.4" 4K Touch Display',
      '11th Gen Intel Core i7',
      '16GB RAM',
      '512GB SSD',
      'Thunderbolt 4',
      'Backlit Keyboard'
    ]
  },

  // Vehicle Rentals
  {
    id: 'vehicle-1',
    title: 'Toyota RAV4 2007',
    description: 'Automatic, AWD, 5 Seater, Excellent Condition',
    price: 1800000,
    originalPrice: 2000000,
    image: '/images/services/toyota-rav4.jpg',
    category: 'vehicle-rentals',
    rating: 4.6,
    isPopular: true,
    duration: 'Per day',
    location: 'Freetown, Sierra Leone',
    features: [
      'Automatic Transmission',
      'All-Wheel Drive',
      '5 Seater',
      'Bluetooth & Navigation',
      'Full Insurance Coverage'
    ],
    contactInfo: {
      phone: '+23276865694',
      email: 'rentals@worldofalafia.com',
      hours: '24/7 Service Available'
    }
  },
  {
    id: 'vehicle-2',
    title: 'Mercedes-Benz E-Class',
    description: 'Luxury Sedan, Automatic, Premium Package, 2020',
    price: 3500000,
    originalPrice: 3800000,
    image: '/images/services/mercedes-benz.jpg',
    category: 'vehicle-rentals',
    rating: 4.8,
    isPopular: true,
    duration: 'Per day',
    location: 'Freetown, Sierra Leone',
    features: [
      'Luxury Interior',
      'Automatic Transmission',
      '5 Seater',
      'Premium Sound System',
      'Chauffeur Available',
      'Full Insurance Coverage'
    ]
  },

  // Toiletries
  {
    id: 'toiletry-1',
    title: 'Premium Toiletries Set',
    description: 'Luxury bathroom essentials set including shampoo, conditioner, body wash, and lotion',
    price: 350000,
    originalPrice: 400000,
    image: '/images/services/premium-toiletries.jpg',
    category: 'toiletries',
    rating: 4.5,
    duration: 'In stock',
    location: 'Freetown, Sierra Leone',
    features: [
      'Paraben-free',
      'Natural Ingredients',
      '300ml per bottle',
      'Eco-friendly packaging'
    ]
  },
  {
    id: 'toiletry-2',
    title: 'Luxury Bath Essentials',
    description: 'Premium bath collection with natural extracts and essential oils',
    price: 450000,
    originalPrice: 500000,
    image: '/images/services/bath-essentials.jpg',
    category: 'toiletries',
    rating: 4.7,
    isPopular: true,
    duration: 'In stock',
    location: 'Freetown, Sierra Leone',
    features: [
      'Organic Ingredients',
      'Sulfate-free',
      'Soap, Bath Salts, and Oils',
      'Relaxing Fragrance',
      'Gift Box Included'
    ]
  },

  // Stationery
  {
    id: 'stationery-1',
    title: 'Executive Office Stationery Set',
    description: 'Premium office stationery set including notebook, pen, and accessories',
    price: 250000,
    originalPrice: 300000,
    image: '/images/services/office-stationery.jpg',
    category: 'stationery',
    rating: 4.4,
    duration: 'In stock',
    location: 'Freetown, Sierra Leone',
    features: [
      'Hardcover Notebook',
      'Premium Ballpoint Pen',
      'Leather Organizer',
      'Business Card Holder'
    ]
  },
  {
    id: 'stationery-2',
    title: 'Designer Notebook Set',
    description: 'Elegant notebook set with premium paper and leather cover',
    price: 180000,
    originalPrice: 220000,
    image: '/images/services/notebook-set.jpg',
    category: 'stationery',
    rating: 4.3,
    duration: 'In stock',
    location: 'Freetown, Sierra Leone',
    features: [
      'A5 Size',
      'Premium Paper',
      'Leather Cover',
      'Elastic Closure',
      'Bookmark Ribbon'
    ]
  },

  // Fashion
  {
    id: 'fashion-1',
    title: 'Designer Handbag',
    description: 'Luxury designer handbag with premium leather finish',
    price: 3800000,
    originalPrice: 4500000,
    image: '/images/services/designer-handbag.jpg',
    category: 'fashion',
    rating: 4.6,
    isPopular: true,
    duration: 'In stock',
    location: 'Freetown, Sierra Leone',
    features: [
      'Genuine Leather',
      'Adjustable Strap',
      'Multiple Compartments',
      'Gold-tone Hardware',
      'Dust Bag Included'
    ]
  },

  // Electronic Money
  {
    id: 'emoney-1',
    title: 'Mobile Money Transfer',
    description: 'Secure and instant money transfer service',
    price: 0, // Fee is handled separately
    feePercentage: 1.5,
    image: '/images/services/mobile-money.jpg', // Placeholder image
    category: 'electronic-money',
    rating: 4.7,
    isPopular: true,
    duration: 'Instant',
    location: 'Nationwide',
    features: [
      'Instant Transfers',
      '24/7 Service',
      'Competitive Rates',
      'Secure Transactions'
    ]
  }
];

// Helper function to get items by category
export function getItemsByCategory(category: string): ServiceItem[] {
  return serviceItems.filter(item => item.category === category);
}

// Helper function to get item by ID
export function getItemById(id: string): ServiceItem | undefined {
  return serviceItems.find(item => item.id === id);
}

// Helper function to get popular items
export function getPopularItems(limit: number = 4): ServiceItem[] {
  return serviceItems
    .filter(item => item.isPopular)
    .slice(0, limit);
}

// Helper function to get related items (excluding current item)
export function getRelatedItems(currentItemId: string, category: string, limit: number = 3): ServiceItem[] {
  return serviceItems
    .filter(item => item.id !== currentItemId && item.category === category)
    .slice(0, limit);
};
