import { Button } from '@/components/ui/button';

export default function Hero() {
  return (
    <section className="bg-gradient-to-r from-primary/10 to-accent/10 py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-5xl md:text-6xl font-bold text-foreground leading-tight">
                Makanan Lezat Langsung Ke <span className="text-primary">Meja Anda</span>
              </h2>
              <p className="text-xl text-muted-foreground">
                Pesan menu favorit Anda dengan mudah. Kami jamin kualitas terbaik, rasa autentik, dan pengiriman tepat waktu!
              </p>
            </div>

            <div className="flex gap-4 pt-4">
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                Pesan Sekarang
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="border-primary text-primary hover:bg-primary/10 bg-transparent"
              >
                Lihat Menu
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-6 pt-8">
              <div className="text-center">
                <p className="text-3xl font-bold text-primary">500+</p>
                <p className="text-sm text-muted-foreground">Pesanan Puas</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-primary">4.8★</p>
                <p className="text-sm text-muted-foreground">Rating Tinggi</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-primary">24/7</p>
                <p className="text-sm text-muted-foreground">Layanan</p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-square bg-primary/10 rounded-2xl overflow-hidden relative">
              <div className="absolute inset-0 flex items-center justify-center text-9xl">
                🍱
              </div>
            </div>
            <div className="absolute -bottom-4 -right-4 bg-white rounded-xl shadow-lg p-4 border-2 border-primary/20">
              <p className="font-semibold text-foreground">Promo Spesial!</p>
              <p className="text-2xl font-bold text-primary">Diskon 20%</p>
              <p className="text-xs text-muted-foreground">Untuk pesanan pertama</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
