export type EcommerceDemoTab =
  | 'dashboard'
  | 'kurumsal'
  | 'urunler'
  | 'sepet'
  | 'iletisim';

export type PackageTierId = 'eko' | 'pro' | 'nexus';

export interface PackageTierOption {
  id: PackageTierId;
  name: string;
  subtitle: string;
  price: number;
  deliveryTime: string;
  codeOwnership: boolean;
  features: string[];
}

export interface EcommerceProductVariant {
  id: string;
  label: string;
  priceDelta: number;
}

export interface EcommerceProduct {
  id: string;
  sku: string;
  name: string;
  category: string;
  shortDesc: string;
  detailedDesc: string;
  basePrice: number;
  urgencyType: 'active_stores' | 'remaining_license';
  urgencyText: string;
  rating: string;
  integrationTime: string;
  techStack: string[];
  variants: EcommerceProductVariant[];
}

export interface EcommerceCartItem {
  cartKey: string;
  productId: string;
  name: string;
  category: string;
  variantLabel: string;
  unitPrice: number;
  quantity: number;
}

export interface LiveActivityLog {
  id: string;
  city: string;
  user: string;
  action: string;
  amount?: string;
  timeAgo: string;
  type: 'order' | 'cart' | 'payment' | 'shipping';
}
