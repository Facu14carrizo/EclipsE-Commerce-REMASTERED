export interface Product {
  id: string;
  name: string;
  brand: string;
  type: 'refractor' | 'reflector' | 'compound' | 'accessory';
  price: number;
  originalPrice?: number;
  image: string;
  description: string;
  specifications: {
    aperture?: string;
    focalLength?: string;
    focalRatio?: string;
    mount?: string;
    weight?: string;
    [key: string]: string | undefined;
  };
  inStock: boolean;
  rating: number;
  reviews: number;
}

export interface WikiArticle {
  id: string;
  title: string;
  category: 'planets' | 'stars' | 'galaxies' | 'nebulae' | 'comets' | 'blackholes';
  image: string;
  excerpt: string;
  content: string;
  readTime: number;
  tags: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface FilterState {
  type: string[];
  brand: string[];
  priceRange: [number, number];
  inStock: boolean;
}