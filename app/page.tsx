'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/header';
import Hero from '@/components/hero';
import MenuGrid from '@/components/menu-grid';
import Cart from '@/components/cart';

export default function Home() {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState<any[]>([]);

  const handleAddToCart = (menu: any) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === menu.id);
      if (existing) {
        return prev.map(item =>
          item.id === menu.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...menu, quantity: 1 }];
    });
  };

  return (
    <main className="min-h-screen bg-background">
      <Header cartCount={cartItems.length} onCartClick={() => setShowCart(!showCart)} />
      {showCart ? (
        <Cart items={cartItems} onUpdateCart={setCartItems} />
      ) : (
        <>
          <Hero />
          <MenuGrid onAddToCart={handleAddToCart} />
        </>
      )}
    </main>
  );
}
