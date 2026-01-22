# 🔌 LaukPedia API Documentation

Dokumentasi lengkap API endpoints untuk LaukPedia catering platform.

**Base URL:** `http://localhost:3000/api` (development)  
**Base URL:** `https://yourdomain.com/api` (production)

---

## 📋 Endpoints Overview

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/menus` | Get all menus |
| GET | `/menus?category_id=1` | Get menus by category |
| POST | `/menus` | Create new menu (admin) |
| POST | `/orders` | Create new order |
| GET | `/orders?phone=081234567890` | Get customer orders |

---

## 🍽️ Menus Endpoints

### GET /api/menus

Mendapatkan daftar menu dengan kategorinya.

**Query Parameters:**
- `category_id` (optional): Filter berdasarkan kategori ID
- `available_only` (optional): true untuk hanya menu tersedia

**Examples:**
```bash
# Get all menus
GET /api/menus

# Filter by category
GET /api/menus?category_id=1

# Get only available menus
GET /api/menus?available_only=true

# Combine filters
GET /api/menus?category_id=2&available_only=true
```

**Response (Success):**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Nasi Kuning",
      "description": "Nasi kuning dengan rempah pilihan",
      "price": 25000,
      "portion_size": "1 porsi",
      "rating": 4.8,
      "review_count": 45,
      "category_id": 1,
      "category_name": "Nasi"
    },
    {
      "id": 2,
      "name": "Nasi Goreng Istimewa",
      "description": "Nasi goreng dengan telur, udang, ayam",
      "price": 35000,
      "portion_size": "1 porsi",
      "rating": 4.7,
      "review_count": 38,
      "category_id": 1,
      "category_name": "Nasi"
    }
  ],
  "count": 2
}
```

**Response (Error):**
```json
{
  "success": false,
  "error": "Failed to fetch menus",
  "message": "Connection refused"
}
```

---

### POST /api/menus

Membuat menu baru. (Memerlukan authorization admin di masa depan)

**Request Body:**
```json
{
  "category_id": 1,
  "name": "Menu Baru",
  "description": "Deskripsi lengkap menu",
  "price": 25000,
  "portion_size": "1 porsi"
}
```

**Required Fields:**
- `category_id` (number): ID kategori
- `name` (string): Nama menu
- `price` (number): Harga dalam rupiah

**Optional Fields:**
- `description` (string): Deskripsi detail
- `portion_size` (string): Ukuran porsi (default: "1 porsi")

**Response (Success):**
```json
{
  "success": true,
  "message": "Menu created successfully",
  "data": {
    "fieldCount": 7,
    "affectedRows": 1,
    "insertId": 9
  }
}
```

**Status Code:** `201 Created`

**Response (Error - Missing Fields):**
```json
{
  "success": false,
  "error": "Missing required fields: category_id, name, price"
}
```

**Status Code:** `400 Bad Request`

---

## 📦 Orders Endpoints

### POST /api/orders

Membuat pesanan baru dari pelanggan.

**Request Body:**
```json
{
  "customer": {
    "name": "John Doe",
    "phone": "081234567890",
    "address": "Jl. Raya No. 123, RT 01 RW 02",
    "city": "Jakarta"
  },
  "items": [
    {
      "menu_id": 1,
      "quantity": 2
    },
    {
      "menu_id": 3,
      "quantity": 1
    }
  ],
  "delivery_date": "2026-01-25",
  "delivery_time": "12:00",
  "special_notes": "Tidak pedas, banyak sambal di samping"
}
```

**Required Fields:**
- `customer.name` (string): Nama pelanggan
- `customer.phone` (string): Nomor telepon
- `customer.address` (string): Alamat pengiriman
- `items` (array): Daftar menu yang dipesan
- `items[].menu_id` (number): ID menu
- `items[].quantity` (number): Jumlah pesanan
- `delivery_date` (string): Tanggal pengiriman (format: YYYY-MM-DD)

**Optional Fields:**
- `customer.city` (string): Kota
- `delivery_time` (string): Waktu pengiriman (format: HH:MM)
- `special_notes` (string): Catatan khusus pesanan

**Response (Success):**
```json
{
  "success": true,
  "message": "Order created successfully",
  "data": {
    "order_id": 5,
    "order_number": "LPD-2026-123456",
    "total_price": 105000,
    "status": "pending",
    "customer_id": 3
  }
}
```

**Status Code:** `201 Created`

**Response (Error - Missing Customer Data):**
```json
{
  "success": false,
  "error": "Missing customer information"
}
```

**Status Code:** `400 Bad Request`

**Response (Error - No Items):**
```json
{
  "success": false,
  "error": "No items in order"
}
```

**Status Code:** `400 Bad Request`

---

### GET /api/orders

Mendapatkan daftar pesanan pelanggan berdasarkan nomor telepon.

**Query Parameters:**
- `phone` (required): Nomor telepon pelanggan

**Example:**
```bash
GET /api/orders?phone=081234567890
```

**Response (Success):**
```json
{
  "success": true,
  "data": [
    {
      "id": 5,
      "order_number": "LPD-2026-123456",
      "total_price": 105000,
      "status": "pending",
      "delivery_date": "2026-01-25",
      "delivery_time": "12:00",
      "created_at": "2026-01-22T10:30:00.000Z",
      "customer_name": "John Doe",
      "phone": "081234567890",
      "address": "Jl. Raya No. 123, RT 01 RW 02"
    }
  ],
  "count": 1
}
```

**Response (Error - Missing Phone):**
```json
{
  "success": false,
  "error": "Phone number is required"
}
```

**Status Code:** `400 Bad Request`

---

## 🔄 Status Order

Status pesanan dapat berubah sesuai progres:

| Status | Keterangan |
|--------|-----------|
| `pending` | Pesanan baru, menunggu konfirmasi |
| `confirmed` | Pesanan dikonfirmasi, sedang diproses |
| `processing` | Sedang dimasak/disiapkan |
| `ready` | Siap untuk pengiriman |
| `delivered` | Sudah dikirim ke pelanggan |
| `cancelled` | Pesanan dibatalkan |

---

## 💰 Price Format

Semua harga dalam **Rupiah (IDR)** sebagai integer:
- Contoh: 25000 = Rp 25.000
- Contoh: 105000 = Rp 105.000

---

## 🔐 Error Handling

Semua error responses mengikuti format:

```json
{
  "success": false,
  "error": "Error type/code",
  "message": "Detailed error message"
}
```

**Common HTTP Status Codes:**
- `200 OK` - Request berhasil
- `201 Created` - Resource berhasil dibuat
- `400 Bad Request` - Invalid request data
- `404 Not Found` - Resource tidak ditemukan
- `500 Internal Server Error` - Server error

---

## 📝 Request Examples

### JavaScript/Fetch

```javascript
// Get all menus
const menus = await fetch('/api/menus').then(r => r.json());

// Get menus by category
const categoryMenus = await fetch('/api/menus?category_id=1').then(r => r.json());

// Create order
const order = await fetch('/api/orders', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    customer: {
      name: 'John Doe',
      phone: '081234567890',
      address: 'Jl. Raya No. 123',
      city: 'Jakarta'
    },
    items: [
      { menu_id: 1, quantity: 2 },
      { menu_id: 3, quantity: 1 }
    ],
    delivery_date: '2026-01-25',
    delivery_time: '12:00'
  })
}).then(r => r.json());

console.log('Order created:', order);

// Get customer orders
const orders = await fetch('/api/orders?phone=081234567890').then(r => r.json());
```

### cURL

```bash
# Get all menus
curl http://localhost:3000/api/menus

# Get menus by category
curl "http://localhost:3000/api/menus?category_id=1"

# Create menu
curl -X POST http://localhost:3000/api/menus \
  -H "Content-Type: application/json" \
  -d '{
    "category_id": 1,
    "name": "Menu Baru",
    "price": 25000,
    "portion_size": "1 porsi"
  }'

# Create order
curl -X POST http://localhost:3000/api/orders \
  -H "Content-Type: application/json" \
  -d '{
    "customer": {
      "name": "John Doe",
      "phone": "081234567890",
      "address": "Jl. Raya No. 123"
    },
    "items": [
      {"menu_id": 1, "quantity": 2}
    ],
    "delivery_date": "2026-01-25"
  }'

# Get customer orders
curl "http://localhost:3000/api/orders?phone=081234567890"
```

---

## 🚀 Testing API

Gunakan tools berikut untuk testing:

1. **Postman** - GUI API testing tool
2. **Insomnia** - User-friendly API client
3. **Thunder Client** - VS Code extension
4. **cURL** - Command line tool (bawaan)
5. **Browser Console** - Untuk quick fetch tests

**Saran:** Simpan Postman collection untuk reusable tests!

---

## 📚 Dokumentasi Tambahan

- [SETUP_DATABASE.md](./SETUP_DATABASE.md) - Database schema
- [README.md](./README.md) - Project overview
- [QUICK_START.md](./QUICK_START.md) - Quick setup guide

---

**API Ready!** 🚀🍲
