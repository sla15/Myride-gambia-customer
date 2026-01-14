
import { Business } from './types';

export const INITIAL_BUSINESSES: Business[] = [
  {
    id: 'b1',
    name: "Burger Joint",
    category: 'Food & Drink',
    description: "Best burgers in town",
    rating: 4.8,
    reviews: 124,
    deliveryTime: '15-25 min',
    image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?auto=format&fit=crop&w=800&q=80',
    logo: 'https://cdn-icons-png.flaticon.com/512/3075/3075977.png',
    phone: '+220 777 1234',
    location: 'Banjul',
    isOpen: true,
    distance: '1.2 km',
    products: [
      { id: 'p1', name: 'Classic Cheeseburger', price: 250, stock: 50, mainCategory: 'Food', categories: ['Regular', 'Double Patty', 'Spicy'], image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80', description: 'Angus beef, cheddar, lettuce, tomato, secret sauce.' },
      { id: 'p2', name: 'Truffle Fries', price: 120, stock: 100, mainCategory: 'Food', categories: ['Small', 'Large'], image: 'https://images.unsplash.com/photo-1573080496987-a199f8cd7558?auto=format&fit=crop&w=800&q=80', description: 'Crispy fries with parmesan and truffle oil.' },
      { id: 'p4', name: 'Double Bacon', price: 350, stock: 20, mainCategory: 'Food', categories: ['Regular', 'Extra Cheese'], image: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?auto=format&fit=crop&w=800&q=80', description: 'Double beef, bacon, bbq sauce.' }
    ]
  },
  {
    id: 'b2',
    name: "Sushi Master",
    category: 'Food & Drink',
    description: "Authentic Japanese",
    rating: 4.9,
    reviews: 89,
    deliveryTime: '30-45 min',
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=800&q=80',
    logo: 'https://cdn-icons-png.flaticon.com/512/2252/2252075.png',
    phone: '+220 999 5678',
    location: 'Serrekunda',
    isOpen: false,
    distance: '3.5 km',
    products: [
      { id: 'p3', name: 'Spicy Tuna Roll', price: 350, stock: 30, mainCategory: 'Food', categories: ['6pcs', '12pcs'], image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?auto=format&fit=crop&w=800&q=80', description: 'Fresh tuna, spicy mayo, cucumber.' }
    ]
  },
  {
    id: 'b3',
    name: "ElectroHub",
    category: 'Electronics',
    description: "Gadgets and accessories",
    rating: 4.7,
    reviews: 45,
    deliveryTime: '1-2 hours',
    image: 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&w=800&q=80',
    logo: 'https://cdn-icons-png.flaticon.com/512/3659/3659898.png',
    phone: '+220 222 3333',
    location: 'Kairaba Ave',
    isOpen: true,
    distance: '2.0 km',
    products: [
        { id: 'p5', name: 'Wireless Earbuds', price: 1500, stock: 15, mainCategory: 'Electronics', categories: ['Black', 'White', 'Blue'], image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=800&q=80', description: 'Noise cancelling, 24h battery.' },
        { id: 'p6', name: 'USB-C Cable', price: 300, stock: 50, mainCategory: 'Electronics', categories: ['1m', '2m'], image: 'https://images.unsplash.com/photo-1595835018654-762ee7834720?auto=format&fit=crop&w=800&q=80', description: 'Fast charging braided cable.' }
    ]
  },
  {
    id: 'b4',
    name: "Fresh Market",
    category: 'Grocery',
    description: "Organic fruits & veg",
    rating: 4.6,
    reviews: 210,
    deliveryTime: '45-60 min',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80',
    logo: 'https://cdn-icons-png.flaticon.com/512/3724/3724720.png',
    phone: '+220 555 0192',
    location: 'Bakau',
    isOpen: true,
    distance: '4.2 km',
    products: [
        { id: 'p7', name: 'Avocados (kg)', price: 400, stock: 20, mainCategory: 'Grocery', categories: ['Ripe', 'Firm'], image: 'https://images.unsplash.com/photo-1523049673856-38866ea6c078?auto=format&fit=crop&w=800&q=80', description: 'Imported hass avocados.' },
        { id: 'p8', name: 'Fresh Milk', price: 150, stock: 30, mainCategory: 'Grocery', categories: ['Whole', 'Skimmed'], image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&w=800&q=80', description: 'Locally sourced fresh milk.' }
    ]
  },
  {
    id: 'b5',
    name: "Urban Threads",
    category: 'Fashion',
    description: "Streetwear & trendy fits",
    rating: 4.5,
    reviews: 34,
    deliveryTime: 'Same day',
    image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=800&q=80',
    logo: 'https://cdn-icons-png.flaticon.com/512/3531/3531849.png',
    phone: '+220 333 4444',
    location: 'Senegambia',
    isOpen: true,
    distance: '6.0 km',
    products: [
        { id: 'p9', name: 'Cotton T-Shirt', price: 600, stock: 100, mainCategory: 'Fashion', categories: ['S', 'M', 'L', 'XL'], image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=80', description: '100% heavy cotton, relaxed fit.' },
        { id: 'p10', name: 'Denim Cap', price: 350, stock: 25, mainCategory: 'Fashion', categories: ['Blue', 'Black'], image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89f?auto=format&fit=crop&w=800&q=80', description: 'Vintage wash dad hat.' }
    ]
  },
  {
    id: 'b6',
    name: "Glow Beauty",
    category: 'Health & Beauty',
    description: "Skincare & cosmetics",
    rating: 4.9,
    reviews: 156,
    deliveryTime: '24 hours',
    image: 'https://images.unsplash.com/photo-1612817288484-9691c9567299?auto=format&fit=crop&w=800&q=80',
    logo: 'https://cdn-icons-png.flaticon.com/512/3163/3163195.png',
    phone: '+220 700 8000',
    location: 'Brusubi',
    isOpen: true,
    distance: '8.5 km',
    products: [
        { id: 'p11', name: 'Vitamin C Serum', price: 1200, stock: 40, mainCategory: 'Beauty', categories: ['30ml', '50ml'], image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80', description: 'Brightening serum for all skin types.' },
        { id: 'p12', name: 'Face Mask Pack', price: 500, stock: 60, mainCategory: 'Beauty', categories: ['Hydrating', 'Purifying'], image: 'https://images.unsplash.com/photo-1596462502278-27bfdd403cc2?auto=format&fit=crop&w=800&q=80', description: 'Set of 5 sheet masks.' }
    ]
  },
  {
    id: 'b7',
    name: "Tech Fix",
    category: 'Services',
    description: "Phone & laptop repairs",
    rating: 4.4,
    reviews: 28,
    deliveryTime: 'Pickup only',
    image: 'https://images.unsplash.com/photo-1597424214711-413feeee74cb?auto=format&fit=crop&w=800&q=80',
    logo: 'https://cdn-icons-png.flaticon.com/512/2928/2928883.png',
    phone: '+220 111 2222',
    location: 'Westfield',
    isOpen: false,
    distance: '3.0 km',
    products: [
        { id: 'p13', name: 'Screen Replacement', price: 2500, stock: 10, mainCategory: 'Service', categories: ['iPhone', 'Samsung'], image: 'https://images.unsplash.com/photo-1588702547919-26089e690ecc?auto=format&fit=crop&w=800&q=80', description: 'Original quality screen replacement.' }
    ]
  },
  // New Dummy Data
  {
    id: 'b8',
    name: "The Coffee Bean",
    category: 'Food & Drink',
    description: "Artisan coffee & pastries",
    rating: 4.9,
    reviews: 205,
    deliveryTime: '20-30 min',
    image: 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&w=800&q=80',
    logo: 'https://cdn-icons-png.flaticon.com/512/2935/2935413.png',
    phone: '+220 444 9999',
    location: 'Fajara',
    isOpen: true,
    distance: '1.8 km',
    products: [
        { id: 'p14', name: 'Cappuccino', price: 150, stock: 50, mainCategory: 'Drink', categories: ['Small', 'Medium', 'Large'], image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&w=800&q=80', description: 'Rich espresso with steamed milk foam.' }
    ]
  },
  {
    id: 'b9',
    name: "Home Decor Plus",
    category: 'Retail',
    description: "Modern home accessories",
    rating: 4.5,
    reviews: 62,
    deliveryTime: '1-2 days',
    image: 'https://images.unsplash.com/photo-1513161455079-7dc1de15ef12?auto=format&fit=crop&w=800&q=80',
    logo: 'https://cdn-icons-png.flaticon.com/512/2892/2892473.png',
    phone: '+220 200 3000',
    location: 'Pipeline',
    isOpen: true,
    distance: '5.5 km',
    products: [
        { id: 'p15', name: 'Ceramic Vase', price: 800, stock: 15, mainCategory: 'Home', categories: ['White', 'Grey'], image: 'https://images.unsplash.com/photo-1581783342308-f792ca11df53?auto=format&fit=crop&w=800&q=80', description: 'Minimalist ceramic vase.' }
    ]
  },
  {
    id: 'b10',
    name: "MediCare Pharma",
    category: 'Health & Beauty',
    description: "Medicines & wellness",
    rating: 4.8,
    reviews: 310,
    deliveryTime: '30 min',
    image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=800&q=80',
    logo: 'https://cdn-icons-png.flaticon.com/512/883/883360.png',
    phone: '+220 666 7777',
    location: 'Serrekunda',
    isOpen: true,
    distance: '3.2 km',
    products: [
        { id: 'p16', name: 'Multivitamins', price: 450, stock: 100, mainCategory: 'Health', categories: ['60 tabs', '120 tabs'], image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80', description: 'Daily immune support.' }
    ]
  },
  {
    id: 'b11',
    name: "Sparkle Laundry",
    category: 'Services',
    description: "Wash & fold service",
    rating: 4.6,
    reviews: 94,
    deliveryTime: '24-48 hours',
    image: 'https://images.unsplash.com/photo-1517677208171-0bc12f9498c9?auto=format&fit=crop&w=800&q=80',
    logo: 'https://cdn-icons-png.flaticon.com/512/2983/2983796.png',
    phone: '+220 123 9876',
    location: 'KotU',
    isOpen: true,
    distance: '7.0 km',
    products: [
        { id: 'p17', name: 'Laundry Bag (5kg)', price: 300, stock: 999, mainCategory: 'Service', categories: ['Standard', 'Express'], image: 'https://images.unsplash.com/photo-1545173168-9f1947eebb8f?auto=format&fit=crop&w=800&q=80', description: 'Wash, dry, and fold service per bag.' }
    ]
  },
  {
    id: 'b12',
    name: "Readers Corner",
    category: 'Retail',
    description: "Books & stationery",
    rating: 4.7,
    reviews: 112,
    deliveryTime: '2-3 hours',
    image: 'https://images.unsplash.com/photo-1507842217121-9d5973d323e6?auto=format&fit=crop&w=800&q=80',
    logo: 'https://cdn-icons-png.flaticon.com/512/2702/2702134.png',
    phone: '+220 888 1111',
    location: 'Banjul',
    isOpen: false,
    distance: '1.5 km',
    products: [
        { id: 'p18', name: 'Notebook Set', price: 200, stock: 80, mainCategory: 'Home', categories: ['Lined', 'Blank'], image: 'https://images.unsplash.com/photo-1531346878377-a5be20888e57?auto=format&fit=crop&w=800&q=80', description: 'Premium quality journals.' }
    ]
  }
];

export const STORE_CATEGORIES = ['Food & Drink', 'Retail', 'Grocery', 'Fashion', 'Electronics', 'Services', 'Health & Beauty', 'Other'];
export const PRODUCT_CATEGORIES = ['Food', 'Drink', 'Clothing', 'Electronics', 'Home', 'Beauty', 'Service', 'Health', 'Other'];
