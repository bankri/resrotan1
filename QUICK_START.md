# 🚀 LaukPedia - Quick Start Guide

Panduan singkat untuk setup dan menjalankan LaukPedia!

---

## ⚡ Setup dalam 5 Menit

### Step 1: Siapkan Environment Variables
Buat file `.env.local` di root project:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=laukpedia
```

### Step 2: Setup Database MySQL

#### Opsi A: MySQL Command Line (Tercepat)
```bash
# 1. Connect ke MySQL
mysql -h localhost -u root -p

# 2. Di dalam MySQL prompt, jalankan:
CREATE DATABASE laukpedia;
USE laukpedia;

# 3. Copy semua SQL dari /scripts/init-laukpedia-db.sql
# Paste di MySQL prompt dan enter

# 4. Verifikasi
SHOW TABLES;
SELECT COUNT(*) FROM categories;
```

#### Opsi B: MySQL Workbench GUI
1. Buka MySQL Workbench
2. Click File → Open SQL Script → `/scripts/init-laukpedia-db.sql`
3. Click ⚡ Execute (atau Ctrl+Shift+Enter)
4. Tunggu hingga selesai

#### Opsi C: Import SQL File
```bash
mysql -h localhost -u root -p laukpedia < scripts/init-laukpedia-db.sql
```

### Step 3: Verifikasi Database
```bash
mysql -h localhost -u root -p -e "USE laukpedia; SHOW TABLES; SELECT * FROM categories;"
```

Jika berhasil, akan muncul 8 tabel dan kategori sample.

### Step 4: Jalankan Development Server
```bash
# Install dependencies (jika belum)
npm install

# Jalankan dev server
npm run dev
```

### Step 5: Buka Website
Buka [http://localhost:3000](http://localhost:3000) di browser! 🎉

---

## 🧪 Test Website

Coba fitur berikut:

1. **Lihat Menu** - Scroll ke bagian "Menu Pilihan"
2. **Filter Kategori** - Click tombol kategori (Nasi, Lauk Pauk, dll)
3. **Tambah ke Keranjang** - Click "+ Pesan" pada menu favorit
4. **Buka Cart** - Click ikon 🛒 di header
5. **Isi Formulir Pesanan** - Masukkan nama, telepon, alamat
6. **Lihat Total** - Lihat ringkasan harga di sidebar
7. **Pesan** - Click "Pesan Sekarang" untuk submit

---

## 🐛 Troubleshooting

### Error: "Cannot find module 'mysql2'"
```bash
npm install mysql2
```

### Error: "ECONNREFUSED"
- Pastikan MySQL server running
- Check username & password di `.env.local`
- Verify `DB_HOST` (gunakan `localhost` untuk lokal)

### Error: "Unknown database 'laukpedia'"
- Pastikan sudah jalankan SQL setup script
- Verify database name di `.env.local`
- Check dengan: `mysql -u root -p -e "SHOW DATABASES;"`

### Error: "Cannot GET /"
- Pastikan dev server sudah running
- Check error di terminal
- Verify semua komponen sudah dibuat

### Website Loading Tapi Tidak Ada Data
- Check console browser (F12) untuk error
- Verify `.env.local` credentials
- Cek database connection dengan query test

---

## 📊 Database Sample Data

Setup script sudah include sample data:

### Categories (5 items)
- 🍚 Nasi
- 🍗 Lauk Pauk
- 🥬 Sayuran
- 🥤 Minuman
- 🍰 Dessert

### Menus (8 items)
- Nasi Kuning - Rp 25.000
- Nasi Goreng Istimewa - Rp 35.000
- Ayam Goreng Kraton - Rp 45.000
- Ikan Bakar Manado - Rp 55.000
- Gado-Gado - Rp 20.000
- Tumis Sayuran Segar - Rp 18.000
- Es Teh Manis - Rp 8.000
- Pudding Coklat - Rp 15.000

---

## 🎨 Customize Website

### Ubah Warna
Edit `/app/globals.css` - Color tokens di `:root`

### Ubah Konten
Edit komponen di `/components/`:
- `header.tsx` - Tagline, navigation
- `hero.tsx` - Main headline, stats
- `menu-grid.tsx` - Menu items, categories

### Tambah Menu
Insert ke database:
```sql
INSERT INTO menus (category_id, name, description, price, portion_size, rating)
VALUES (1, 'Nasi Putih', 'Nasi putih panas', 10000, '1 porsi', 4.5);
```

---

## 📱 Mobile View
Website sudah responsive! Test di:
- Browser devtools (Ctrl+Shift+I) → Toggle device toolbar
- Atau akses dari smartphone di network yang sama: `http://[your-ip]:3000`

---

## 🚀 Next Steps

1. **Tambah API Routes** - Create `/api/` routes untuk connect DB
2. **Order Tracking** - Track pesanan dengan order number
3. **Admin Dashboard** - Manage menu, orders, customers
4. **Payment Integration** - Tambah Stripe/payment gateway
5. **Real-time Notifications** - WebSocket untuk order updates

Lihat `/README.md` untuk dokumentasi lebih lengkap!

---

## 📚 Dokumentasi

- [README.md](./README.md) - Project overview
- [SETUP_DATABASE.md](./SETUP_DATABASE.md) - Database guide lengkap
- [.env.example](./.env.example) - Environment variables template

---

**Happy coding! 🚀🍲**

Pertanyaan? Baca docs atau check [SETUP_DATABASE.md](./SETUP_DATABASE.md) untuk detail lebih!
