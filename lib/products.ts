import { Product } from "@/context/CartContext";

export interface ProductWithCategory extends Product {
  category: string;
}

export const ALL_PRODUCTS: ProductWithCategory[] = [
  // Men's Fashion
  { id: 1, name: "Minimalist Watch", price: "4,999", img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30", category: "men" },
  { id: 2, name: "Linen Shirt", price: "2,499", img: "https://images.unsplash.com/photo-1598033129183-c4f50c7176c8", category: "men" },
  { id: 3, name: "Leather Boots", price: "7,999", img: "https://images.unsplash.com/photo-1520639889313-7272170b1c39", category: "men" },
  { id: 4, name: "Denim Jacket", price: "5,499", img: "https://images.unsplash.com/photo-1551028719-00167b16eac5", category: "men" },

  // Women's Fashion
  { id: 5, name: "Premium Tote", price: "1,899", img: "https://images.unsplash.com/photo-1544816155-12df9643f363", category: "women" },
  { id: 6, name: "Silk Scarf", price: "1,299", img: "https://images.unsplash.com/photo-1584917865442-de89df76afd3", category: "women" },
  { id: 7, name: "Gold Earrings", price: "3,999", img: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908", category: "women" },
  { id: 8, name: "Summer Dress", price: "4,299", img: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1", category: "women" },

  // Electronics
  { id: 9, name: "Wireless Headphones", price: "12,999", img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e", category: "electronics" },
  { id: 10, name: "Smart Speaker", price: "8,999", img: "https://images.unsplash.com/photo-1589492477829-5e65395b66cc", category: "electronics" },
  { id: 11, name: "Smartwatch Pro", price: "24,999", img: "https://images.unsplash.com/photo-1546868871-af0de0ae72be", category: "electronics" },
  { id: 12, name: "Bluetooth Earbuds", price: "6,499", img: "https://images.unsplash.com/photo-1590658268037-6bf12f032f55", category: "electronics" },

  // Home Decor
  { id: 13, name: "Ceramic Vase", price: "3,499", img: "https://images.unsplash.com/photo-1580910051074-3eb694886505", category: "home-decor" },
  { id: 14, name: "Scented Candle Set", price: "1,799", img: "https://images.unsplash.com/photo-1602028915047-37269d1a73f7", category: "home-decor" },
  { id: 15, name: "Wall Mirror", price: "5,999", img: "https://images.unsplash.com/photo-1618220179428-22790b461013", category: "home-decor" },
  { id: 16, name: "Throw Pillow Set", price: "2,499", img: "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2", category: "home-decor" },
];

// Utility: Get products by category slug
export function getProductsByCategory(slug: string): ProductWithCategory[] {
  return ALL_PRODUCTS.filter((p) => p.category === slug);
}

// Categories used across the app
export const CATEGORIES = [
  { 
    name: "Men's Fashion", 
    slug: "men", 
    img: "https://images.unsplash.com/photo-1521334884684-d80222895322",
    description: "Premium menswear essentials — timeless pieces crafted for the modern gentleman.",
    hero: "https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?q=80&w=2071&auto=format&fit=crop"
  },
  { 
    name: "Women's Fashion", 
    slug: "women", 
    img: "https://images.unsplash.com/photo-1483985988355-763728e1935b",
    description: "Elegance redefined — curated looks that blend sophistication with contemporary style.",
    hero: "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070&auto=format&fit=crop"
  },
  { 
    name: "Electronics", 
    slug: "electronics", 
    img: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9",
    description: "Cutting-edge tech and premium gadgets for the minimalist lifestyle.",
    hero: "https://images.unsplash.com/photo-1468495244123-6c6c332eeece?q=80&w=2021&auto=format&fit=crop"
  },
  { 
    name: "Home Decor", 
    slug: "home-decor", 
    img: "https://images.unsplash.com/photo-1505691938895-1758d7feb511",
    description: "Transform your space with carefully curated pieces that speak volumes.",
    hero: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=2032&auto=format&fit=crop"
  },
];

export function getTrendingProducts(): ProductWithCategory[] {
  // Return one product from each category for a balanced trending section
  const trending: ProductWithCategory[] = [];
  CATEGORIES.forEach(cat => {
    const prod = ALL_PRODUCTS.find(p => p.category === cat.slug);
    if (prod) trending.push(prod);
  });
  return trending;
}
