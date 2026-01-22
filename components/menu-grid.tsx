'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Star, Leaf } from 'lucide-react';

interface Menu {
  id: number;
  name: string;
  description: string;
  price: number;
  category_id: number;
  portion_size: string;
  rating: number;
  review_count: number;
}

interface MenuGridProps {
  onAddToCart: (menu: Menu) => void;
}

const MOCK_MENUS: Menu[] = [
  {
    id: 1,
    name: 'Nasi Kuning',
    description: 'Nasi kuning dengan rempah pilihan, harum dan lezat',
    price: 25000,
    category_id: 1,
    portion_size: '1 porsi',
    rating: 4.8,
    review_count: 45
  },
  {
    id: 2,
    name: 'Nasi Goreng Istimewa',
    description: 'Nasi goreng dengan telur, udang, dan ayam',
    price: 35000,
    category_id: 1,
    portion_size: '1 porsi',
    rating: 4.7,
    review_count: 38
  },
  {
    id: 3,
    name: 'Ayam Goreng Kraton',
    description: 'Ayam goreng renyah dengan bumbu rahasia',
    price: 45000,
    category_id: 2,
    portion_size: '2 ekor',
    rating: 4.9,
    review_count: 52
  },
  {
    id: 4,
    name: 'Ikan Bakar Manado',
    description: 'Ikan bakar dengan sambal khas Manado',
    price: 55000,
    category_id: 2,
    portion_size: '1 ekor',
    rating: 4.8,
    review_count: 28
  },
  {
    id: 5,
    name: 'Gado-Gado',
    description: 'Sayuran rebus dengan bumbu kacang kental',
    price: 20000,
    category_id: 3,
    portion_size: '1 porsi',
    rating: 4.6,
    review_count: 35
  },
  {
    id: 6,
    name: 'Tumis Sayuran Segar',
    description: 'Campur sayuran tumis dengan bumbu gurih',
    price: 18000,
    category_id: 3,
    portion_size: '1 porsi',
    rating: 4.5,
    review_count: 22
  },
  {
    id: 7,
    name: 'Es Teh Manis',
    description: 'Es teh segar dengan rasa manis pas',
    price: 8000,
    category_id: 4,
    portion_size: '1 gelas',
    rating: 4.7,
    review_count: 15
  },
  {
    id: 8,
    name: 'Pudding Coklat',
    description: 'Pudding coklat lembut dengan topping',
    price: 15000,
    category_id: 5,
    portion_size: '1 porsi',
    rating: 4.8,
    review_count: 18
  }
];

const CATEGORY_EMOJIS: { [key: number]: string } = {
  1: '🍚',
  2: '🍗',
  3: '🥬',
  4: '🥤',
  5: '🍰'
};

export default function MenuGrid({ onAddToCart }: MenuGridProps) {
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [menus, setMenus] = useState<Menu[]>(MOCK_MENUS);

  const categories = [
    { id: 0, name: 'Semua' },
    { id: 1, name: 'Nasi' },
    { id: 2, name: 'Lauk Pauk' },
    { id: 3, name: 'Sayuran' },
    { id: 4, name: 'Minuman' },
    { id: 5, name: 'Dessert' }
  ];

  const filteredMenus = selectedCategory === 0
    ? menus
    : menus.filter(menu => menu.category_id === selectedCategory);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price);
  };

  return (
    <section id="menu" className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-2">Menu Pilihan</h2>
          <p className="text-muted-foreground text-lg">Nikmati berbagai pilihan makanan segar dan lezat</p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-3 mb-12 overflow-x-auto pb-2">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-2 rounded-full font-medium transition-all whitespace-nowrap ${
                selectedCategory === category.id
                  ? 'bg-primary text-primary-foreground shadow-md'
                  : 'bg-secondary text-foreground hover:bg-accent/10'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredMenus.map(menu => (
            <Card key={menu.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-square bg-accent/5 flex items-center justify-center text-6xl">
                {CATEGORY_EMOJIS[menu.category_id] || '🍽️'}
              </div>

              <div className="p-4 space-y-3">
                <div>
                  <h3 className="font-bold text-foreground text-lg line-clamp-2">{menu.name}</h3>
                  <p className="text-xs text-muted-foreground mt-1">{menu.portion_size}</p>
                </div>

                <p className="text-sm text-muted-foreground line-clamp-2">{menu.description}</p>

                <div className="flex items-center gap-1">
                  <div className="flex items-center gap-1">
                    <Star size={16} className="fill-primary text-primary" />
                    <span className="font-semibold text-sm text-foreground">{menu.rating}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">({menu.review_count})</span>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <p className="text-xl font-bold text-primary">{formatPrice(menu.price)}</p>
                  <Button 
                    size="sm"
                    onClick={() => onAddToCart(menu)}
                    className="bg-primary hover:bg-primary/90"
                  >
                    + Pesan
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
