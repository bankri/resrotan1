# LaukPedia - Setup Database MySQL

## Panduan Koneksi MySQL

Untuk menghubungkan LaukPedia ke database MySQL, ikuti langkah berikut:

### 1. Install MySQL Driver
Database utility sudah menggunakan `mysql2/promise`. Pastikan package sudah terinstall di `package.json`.

### 2. Setup Environment Variables

Tambahkan environment variables di file `.env.local` atau di Vercel project settings:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=laukpedia
```

#### Penjelasan:
- **DB_HOST**: IP/hostname server MySQL (default: localhost untuk lokal)
- **DB_USER**: Username MySQL (default: root)
- **DB_PASSWORD**: Password database MySQL
- **DB_NAME**: Nama database yang ingin digunakan

### 3. Membuat Database dan Table

#### Opsi A: Menggunakan v0 Script Runner
Jalankan script SQL menggunakan v0 System Actions:
- File: `/scripts/init-laukpedia-db.sql`
- Script ini akan membuat semua table dan insert sample data

#### Opsi B: Manual via MySQL Client
```bash
# Connect ke MySQL
mysql -h localhost -u root -p

# Create database
CREATE DATABASE laukpedia;
USE laukpedia;

# Jalankan script
source /scripts/init-laukpedia-db.sql;
```

#### Opsi C: Menggunakan MySQL Workbench
1. Buka MySQL Workbench
2. Create new database dengan nama `laukpedia`
3. Copy-paste semua query dari `/scripts/init-laukpedia-db.sql`
4. Execute

### 4. Database Schema

Struktur database LaukPedia:

#### **categories** - Kategori Menu
- `id`: Primary Key (AUTO_INCREMENT)
- `name`: Nama kategori (Nasi, Lauk Pauk, dll)
- `description`: Deskripsi kategori
- `icon`: Icon emoji
- `created_at`, `updated_at`: Timestamps

#### **menus** - Daftar Menu Makanan
- `id`: Primary Key
- `category_id`: Foreign Key ke categories
- `name`: Nama menu
- `description`: Deskripsi
- `price`: Harga dalam rupiah (INT)
- `image`: Path ke image (opsional)
- `portion_size`: Ukuran porsi (misal: "1 porsi", "2 ekor")
- `is_available`: Status ketersediaan
- `rating`: Rating 1-5
- `review_count`: Jumlah review

#### **customers** - Data Pelanggan
- `id`: Primary Key
- `name`: Nama lengkap
- `email`: Email (UNIQUE, opsional)
- `phone`: Nomor telepon
- `address`: Alamat pengiriman
- `city`: Kota
- `postal_code`: Kode pos

#### **orders** - Pesanan
- `id`: Primary Key
- `order_number`: Nomor pesanan unik
- `customer_id`: Foreign Key ke customers
- `total_price`: Total harga pesanan
- `status`: Status pesanan (pending, confirmed, processing, ready, delivered, cancelled)
- `delivery_date`: Tanggal pengiriman
- `delivery_time`: Waktu pengiriman
- `special_notes`: Catatan khusus

#### **order_items** - Item dalam Pesanan
- `id`: Primary Key
- `order_id`: Foreign Key ke orders
- `menu_id`: Foreign Key ke menus
- `quantity`: Jumlah pesanan
- `price_at_purchase`: Harga saat pembelian (untuk history)
- `notes`: Catatan khusus item

#### **reviews** - Review Menu
- `id`: Primary Key
- `menu_id`: Foreign Key ke menus
- `customer_id`: Foreign Key ke customers
- `rating`: Rating 1-5
- `comment`: Komentar review

#### **promos** - Promosi & Diskon
- `id`: Primary Key
- `code`: Kode promo unik
- `discount_type`: 'percentage' atau 'fixed'
- `discount_value`: Nilai diskon
- `valid_from`, `valid_until`: Periode berlaku
- `max_usage`: Batas penggunaan

### 5. Query Contoh

#### Mendapatkan semua menu dengan kategori:
```sql
SELECT m.*, c.name as category_name 
FROM menus m
JOIN categories c ON m.category_id = c.id
ORDER BY c.id, m.name;
```

#### Mendapatkan detail pesanan:
```sql
SELECT 
    o.order_number,
    o.total_price,
    c.name as customer_name,
    oi.quantity,
    m.name as menu_name,
    m.price
FROM orders o
JOIN customers c ON o.customer_id = c.id
JOIN order_items oi ON o.id = oi.order_id
JOIN menus m ON oi.menu_id = m.id
WHERE o.id = ?;
```

#### Insert pesanan baru:
```sql
-- 1. Insert customer (jika baru)
INSERT INTO customers (name, phone, address, city)
VALUES ('John Doe', '081234567890', 'Jl. Raya No. 123', 'Jakarta');

-- 2. Insert order
INSERT INTO orders (order_number, customer_id, total_price, delivery_date, status)
VALUES ('LPD-2026-001', 1, 100000, '2026-01-25', 'pending');

-- 3. Insert order items
INSERT INTO order_items (order_id, menu_id, quantity, price_at_purchase)
VALUES 
    (1, 1, 2, 25000),
    (1, 3, 1, 45000);
```

### 6. Troubleshooting

#### Error: "Cannot find module 'mysql2'"
```bash
npm install mysql2
```

#### Error: "ECONNREFUSED"
- Pastikan MySQL server sudah running
- Check credentials di .env.local
- Verify DB_HOST dan DB_PORT

#### Error: "Unknown database 'laukpedia'"
- Jalankan setup script di MySQL terlebih dahulu
- Verify nama database di .env.local

### 7. Tips Pengembangan

- **Query Prepared Statements**: Selalu gunakan parameterized queries untuk security
- **Connection Pooling**: Database sudah menggunakan connection pool, optimal untuk production
- **Indexes**: Schema sudah punya indexes di foreign keys dan frequently queried columns
- **Timestamps**: Semua table punya `created_at` dan `updated_at` untuk audit trail

---

**Lebih lanjut?** Hubungi support atau baca dokumentasi lebih lengkap di `/lib/db.ts`
