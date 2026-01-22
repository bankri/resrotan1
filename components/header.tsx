'use client';

import { ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeaderProps {
  cartCount: number;
  onCartClick: () => void;
}

export default function Header({ cartCount, onCartClick }: HeaderProps) {
  return (
    <header className="bg-white border-b border-border sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="text-3xl">🍲</div>
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold text-primary">LaukPedia</h1>
            <p className="text-xs text-muted-foreground">Lauk Segar, Hari Lebih Nikmat</p>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          <a href="#menu" className="text-foreground hover:text-primary transition-colors font-medium">Menu</a>
          <a href="#promo" className="text-foreground hover:text-primary transition-colors font-medium">Promo</a>
          <a href="#about" className="text-foreground hover:text-primary transition-colors font-medium">Tentang</a>
        </nav>

        <Button 
          onClick={onCartClick}
          variant="outline"
          className="flex items-center gap-2 relative bg-transparent"
        >
          <ShoppingCart size={20} />
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-destructive text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
              {cartCount}
            </span>
          )}
        </Button>
      </div>
    </header>
  );
}
