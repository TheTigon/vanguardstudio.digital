import React, { useState } from 'react';
import { DemoPage, DemoCartItem } from './types';
import { B2bDemoNavbar } from './B2bDemoNavbar';
import { B2bDemoFooter } from './B2bDemoFooter';
import { HomePage } from './HomePage';
import { AboutPage } from './AboutPage';
import { CatalogPage } from './CatalogPage';
import { CartPage } from './CartPage';
import { ContactPage } from './ContactPage';

export const B2bDemoApp: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<DemoPage>('home');
  const [cart, setCart] = useState<DemoCartItem[]>([]);

  const handleNavigate = (page: DemoPage) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddToCart = (item: DemoCartItem) => {
    setCart((prev) => {
      const existing = prev.find((p) => p.id === item.id);
      if (existing) {
        return prev.map((p) => p.id === item.id ? { ...p, quantity: p.quantity + 1 } : p);
      }
      return [...prev, item];
    });
  };

  const handleUpdateQuantity = (id: number, delta: number) => {
    setCart((prev) => prev.map((item) => {
      if (item.id === id) {
        const newQty = item.quantity + delta;
        return newQty > 0 ? { ...item, quantity: newQty } : null;
      }
      return item;
    }).filter(Boolean) as DemoCartItem[]);
  };

  const handleRemove = (id: number) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 font-sans">
      <B2bDemoNavbar 
        currentPage={currentPage} 
        onNavigate={handleNavigate} 
        cartCount={totalCartCount} 
      />

      <main className="flex-grow">
        {currentPage === 'home' && <HomePage onNavigate={handleNavigate} />}
        {currentPage === 'about' && <AboutPage />}
        {currentPage === 'catalog' && <CatalogPage onAddToCart={handleAddToCart} onNavigate={handleNavigate} />}
        {currentPage === 'cart' && <CartPage cart={cart} onUpdateQuantity={handleUpdateQuantity} onRemove={handleRemove} onClearCart={handleClearCart} onNavigate={handleNavigate} />}
        {currentPage === 'contact' && <ContactPage />}
      </main>

      <B2bDemoFooter onNavigate={handleNavigate} />
    </div>
  );
};
