export type DemoPage = 'home' | 'about' | 'catalog' | 'cart' | 'contact';

export interface DemoCartItem {
  id: number;
  code: string;
  title: string;
  category: string;
  quantity: number;
}
