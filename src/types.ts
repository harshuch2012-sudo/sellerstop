export interface Product {
  id: string;
  name: string;
  brand: string;
  category: 'chips-namkeen' | 'energy-beverages' | 'chocolates-snacks' | 'silk-chocolates' | 'biscuits-bakery' | 'imported' | 'trending' | 'belivita' | 'perfumes';
  categoryLabel: string;
  shortDescription: string;
  description: string;
  image: string;
  images?: string[];
  badges?: string[];
  isBestSeller?: boolean;
  isNewArrival?: boolean;
  isTrending?: boolean;
  isBelivita?: boolean;
  variants?: {
    name: string;
    options: string[];
  };
  details?: {
    origin?: string;
    size?: string;
    flavorNotes?: string;
    highlights?: string[];
  };
}

export interface CategoryInfo {
  id: string;
  name: string;
  tagline: string;
  iconName: string;
  image: string;
  count: number;
}

export interface InquiryItem {
  product: Product;
  quantity: number;
  selectedVariant?: string;
}

export type ActiveView = 
  | 'home'
  | 'shop'
  | 'categories'
  | 'belivita'
  | 'bestsellers'
  | 'newarrivals'
  | 'about'
  | 'contact';
