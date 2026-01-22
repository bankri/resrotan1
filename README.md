<<<<<<< HEAD
# 🍲 LaukPedia - Platform Catering Modern

Selamat datang di **LaukPedia**! Platform catering online yang menyediakan berbagai pilihan makanan segar dan lezat dengan pengalaman pemesanan yang mudah dan menyenangkan.

**Tagline:** _"Lauk Segar, Hari Lebih Nikmat"_ 🌟
Link https://saas2bulan.netlify.app/
---

## 🎯 Fitur Utama

### Customer-Facing Website
- ✨ **Hero Landing Page** - Design menarik dengan call-to-action yang jelas
- 🍽️ **Menu Catalog** - Daftar lengkap menu dengan kategori filter
- ⭐ **Rating & Review** - Lihat review dan rating dari pelanggan lain
- 🛒 **Shopping Cart** - Tambah/hapus menu dengan mudah
- 📦 **Order Management** - Pesan dengan informasi pengiriman lengkap
- 💰 **Pricing** - Harga transparan dalam rupiah

---

## 🗂️ Struktur Project

```
laukpedia/
├── app/
│   ├── layout.tsx          # Root layout dengan metadata LaukPedia
│   ├── page.tsx            # Homepage utama
│   └── globals.css         # Styling global dengan design tokens
├── components/
│   ├── header.tsx          # Navigation header dengan cart badge
│   ├── hero.tsx            # Hero section landing page
│   ├── menu-grid.tsx       # Grid display menu dengan filter
│   ├── cart.tsx            # Shopping cart & order form
│   └── ui/                 # shadcn/ui components
├── lib/
│   ├── db.ts              # MySQL connection & query helper
│   └── utils.ts           # Utility functions
├── scripts/
│   └── init-laukpedia-db.sql  # Database setup script
├── SETUP_DATABASE.md       # Database setup guide
└── README.md               # File ini
```

---

## 🚀 Quick Start

### 1. Setup Project
```bash
# Clone atau download project
cd laukpedia

# Install dependencies (jika ada)
npm install

# Atau gunakan shadcn CLI
npx shadcn-ui@latest init
```

### 2. Setup Database MySQL
Lihat [SETUP_DATABASE.md](./SETUP_DATABASE.md) untuk panduan lengkap.

Ringkas:
- Buat database `laukpedia` di MySQL
- Jalankan script: `/scripts/init-laukpedia-db.sql`
- Setup environment variables di `.env.local`

### 3. Environment Variables
Buat file `.env.local`:
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=laukpedia
```

### 4. Run Development Server
```bash
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser.

---

## 📦 Database Schema

LaukPedia menggunakan 8 tabel utama:

| Tabel | Fungsi |
|-------|---------|
| `categories` | Kategori menu (Nasi, Lauk Pauk, dll) |
| `menus` | Daftar lengkap menu makanan |
| `customers` | Data pelanggan & alamat |
| `orders` | Pesanan pelanggan |
| `order_items` | Item detail dalam pesanan |
| `reviews` | Review & rating pelanggan |
| `promos` | Kode promo & diskon |

Lihat [SETUP_DATABASE.md](./SETUP_DATABASE.md) untuk detail schema lengkap.

---

## 🎨 Design System

### Color Palette (Orange-inspired)
- **Primary**: `oklch(0.65 0.25 55)` - Warm Orange
- **Secondary**: `oklch(0.92 0.08 60)` - Light Cream
- **Accent**: Sama dengan Primary
- **Background**: `oklch(0.98 0.01 60)` - Off-white

### Typography
- **Heading**: Geist (Bold, strong hierarchy)
- **Body**: Geist (Readable, friendly)
- **Font Scale**: 14px min untuk accessibility

### Responsive Design
- Mobile-first approach
- Breakpoints: `md` (768px), `lg` (1024px)
- Flexbox untuk layout, Grid untuk complex 2D

---

## 📱 Component Structure

### Header (`/components/header.tsx`)
- Logo & branding LaukPedia
- Navigation links
- Cart icon dengan badge count

### Hero Section (`/components/hero.tsx`)
- Main headline dengan value proposition
- CTA buttons (Pesan Sekarang, Lihat Menu)
- Stats display (Pesanan, Rating, Layanan)

### Menu Grid (`/components/menu-grid.tsx`)
- Filter by category
- Menu cards dengan:
  - Emoji gambar
  - Nama & deskripsi
  - Rating & review count
  - Harga & tombol pesan

### Shopping Cart (`/components/cart.tsx`)
- Cart items list dengan quantity controls
- Order form lengkap:
  - Nama, telepon, alamat
  - Tanggal & waktu pengiriman
  - Catatan khusus
- Order summary dengan total

---

## 🔧 API Routes (Untuk Development Lanjutan)

Berikut endpoint yang dapat ditambahkan:

### Menu Endpoints
```
GET    /api/menus              - Dapatkan semua menu
GET    /api/menus/:id          - Detail menu
GET    /api/categories         - Daftar kategori
```

### Order Endpoints
```
POST   /api/orders             - Buat pesanan baru
GET    /api/orders/:id         - Detail pesanan
GET    /api/orders             - Pesanan pelanggan
PATCH  /api/orders/:id         - Update status pesanan
```

### Customer Endpoints
```
POST   /api/customers          - Daftar pelanggan baru
GET    /api/customers/:id      - Detail pelanggan
```

---

## 💾 Database Usage Example

### Query di Component/Page
```typescript
import { query } from '@/lib/db';

// Get all menus
const menus = await query('SELECT * FROM menus WHERE is_available = true');

// Get menu with category
const menu = await query(
  `SELECT m.*, c.name as category_name 
   FROM menus m 
   JOIN categories c ON m.category_id = c.id 
   WHERE m.id = ?`,
  [menuId]
);
```

### Menggunakan Parameterized Queries (PENTING!)
```typescript
// ✅ BENAR - Parameterized query
await query(
  'SELECT * FROM menus WHERE id = ? AND is_available = ?',
  [menuId, true]
);

// ❌ SALAH - SQL Injection risk
await query(`SELECT * FROM menus WHERE id = ${menuId}`);
```

---

## 🚀 Production Deployment

### Deploy ke Vercel
```bash
# Push ke GitHub
git push origin main

# Connect ke Vercel
vercel link

# Add environment variables di Vercel dashboard
# Redeploy
vercel --prod
```

### Production Checklist
- [ ] Database credentials di environment variables (Vercel dashboard)
- [ ] Database backups configured
- [ ] Error logging setup
- [ ] API rate limiting
- [ ] HTTPS enabled
- [ ] Security headers configured

---

## 📚 Dokumentasi Tambahan

- [Setup Database](./SETUP_DATABASE.md) - Panduan lengkap koneksi MySQL
- [Next.js Docs](https://nextjs.org) - Framework documentation
- [Tailwind CSS](https://tailwindcss.com) - Styling framework
- [shadcn/ui](https://ui.shadcn.com) - Component library

---

## 🤝 Kontribusi & Support

Untuk pertanyaan atau bantuan:
1. Baca dokumentasi di files `.md` terlebih dahulu
2. Check env variables setup
3. Verify database connection
4. Check browser console untuk error messages

---

## 📄 License

LaukPedia © 2026 - Built with ❤️ using Next.js & MySQL

---

**Siap memesan? Mari kita mulai!** 🍲✨
=======
# resrotan1
>>>>>>> 537a137a4b1cf4b23dddc753894352831acd55c8
