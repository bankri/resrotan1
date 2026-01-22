'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Trash2, Minus, Plus } from 'lucide-react';
import { useState } from 'react';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface CartProps {
  items: CartItem[];
  onUpdateCart: (items: CartItem[]) => void;
}

export default function Cart({ items, onUpdateCart }: CartProps) {
  const [customerData, setCustomerData] = useState({
    name: '',
    phone: '',
    address: '',
    deliveryDate: '',
    notes: ''
  });

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price);
  };

  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleUpdateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      onUpdateCart(items.filter(item => item.id !== id));
    } else {
      onUpdateCart(
        items.map(item =>
          item.id === id ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  const handlePlaceOrder = () => {
    if (!customerData.name || !customerData.phone || !customerData.address || !customerData.deliveryDate) {
      alert('Mohon lengkapi semua data pesanan');
      return;
    }

    const orderData = {
      ...customerData,
      items,
      total
    };

    console.log('Order placed:', orderData);
    alert('Pesanan berhasil dibuat! Kami akan menghubungi Anda segera.');
    onUpdateCart([]);
    setCustomerData({
      name: '',
      phone: '',
      address: '',
      deliveryDate: '',
      notes: ''
    });
  };

  return (
    <section className="py-12 bg-background">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-foreground mb-8">Keranjang Pesanan</h2>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.length === 0 ? (
              <Card className="p-8 text-center">
                <p className="text-xl text-muted-foreground mb-4">Keranjang Anda kosong</p>
                <p className="text-sm text-muted-foreground">Mulai tambahkan menu favorit Anda</p>
              </Card>
            ) : (
              items.map(item => (
                <Card key={item.id} className="p-4">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="font-bold text-foreground mb-1">{item.name}</h3>
                      <p className="text-lg text-primary font-semibold">{formatPrice(item.price)}</p>
                    </div>

                    <div className="flex items-center gap-2 bg-secondary px-2 py-1 rounded">
                      <button
                        onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                        className="p-1 hover:bg-accent/20 rounded transition-colors"
                      >
                        <Minus size={16} />
                      </button>
                      <input
                        type="number"
                        value={item.quantity}
                        onChange={(e) => handleUpdateQuantity(item.id, Math.max(1, parseInt(e.target.value) || 1))}
                        className="w-12 text-center font-bold bg-transparent border-0 focus:outline-none"
                      />
                      <button
                        onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                        className="p-1 hover:bg-accent/20 rounded transition-colors"
                      >
                        <Plus size={16} />
                      </button>
                    </div>

                    <div className="w-24 text-right">
                      <p className="font-bold text-foreground">{formatPrice(item.price * item.quantity)}</p>
                    </div>

                    <button
                      onClick={() => handleUpdateQuantity(item.id, 0)}
                      className="p-2 text-destructive hover:bg-destructive/10 rounded transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </Card>
              ))
            )}
          </div>

          {/* Order Form */}
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-24 space-y-4">
              <div>
                <h3 className="font-bold text-lg text-foreground mb-4">Informasi Pesanan</h3>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-foreground">Nama Lengkap</label>
                  <Input
                    type="text"
                    placeholder="Nama Anda"
                    value={customerData.name}
                    onChange={(e) => setCustomerData({ ...customerData, name: e.target.value })}
                    className="mt-1"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground">No. Telepon</label>
                  <Input
                    type="tel"
                    placeholder="+62812345678"
                    value={customerData.phone}
                    onChange={(e) => setCustomerData({ ...customerData, phone: e.target.value })}
                    className="mt-1"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground">Alamat Pengiriman</label>
                  <textarea
                    placeholder="Jalan... Nomor... RT/RW..."
                    value={customerData.address}
                    onChange={(e) => setCustomerData({ ...customerData, address: e.target.value })}
                    className="w-full p-2 border border-border rounded mt-1 text-sm resize-none"
                    rows={3}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground">Tanggal Pengiriman</label>
                  <Input
                    type="date"
                    value={customerData.deliveryDate}
                    onChange={(e) => setCustomerData({ ...customerData, deliveryDate: e.target.value })}
                    className="mt-1"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground">Catatan Khusus</label>
                  <textarea
                    placeholder="Misal: Tidak pedas, dll..."
                    value={customerData.notes}
                    onChange={(e) => setCustomerData({ ...customerData, notes: e.target.value })}
                    className="w-full p-2 border border-border rounded mt-1 text-sm resize-none"
                    rows={2}
                  />
                </div>
              </div>

              {/* Summary */}
              <div className="space-y-2 pt-4 border-t border-border">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium">{formatPrice(total)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Ongkir</span>
                  <span className="font-medium">Gratis</span>
                </div>
                <div className="flex justify-between text-lg font-bold pt-2 border-t border-border">
                  <span>Total</span>
                  <span className="text-primary">{formatPrice(total)}</span>
                </div>
              </div>

              <Button
                onClick={handlePlaceOrder}
                disabled={items.length === 0}
                className="w-full bg-primary hover:bg-primary/90 h-12 font-semibold text-base"
              >
                Pesan Sekarang
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
