# ✅ LaukPedia - Setup Checklist

Checklist step-by-step untuk setup dan menjalankan LaukPedia.

---

## 🔧 Pre-Setup Check

- [ ] MySQL sudah installed di komputer atau accessible
- [ ] Node.js & npm sudah installed (`node --version` & `npm --version`)
- [ ] Text editor atau IDE siap (VS Code recommended)
- [ ] Terminal/Command line sudah buka

---

## 📝 Step 1: Buat Database & Tables

### Option A: Via Command Line (Recommended)

```bash
# 1. Buka MySQL
mysql -h localhost -u root -p

# 2. Tekan Enter, masukkan password MySQL Anda

# 3. Copy-paste code di bawah satu per satu:
```

```sql
CREATE DATABASE laukpedia;
USE laukpedia;
```

```
# 4. Buka file: scripts/init-laukpedia-db.sql
# 5. Copy SEMUA kode dari file tersebut
# 6. Paste di MySQL terminal
# 7. Tekan Enter
```

```sql
# 8. Verifikasi - jalankan ini untuk check:
SHOW TABLES;
SELECT COUNT(*) FROM categories;
SELECT COUNT(*) FROM menus;
```

**Expected Result:**
- 8 tables muncul
- categories count: 5
- menus count: 8

### Option B: Via MySQL Workbench

1. Buka MySQL Workbench
2. Click **File** → **Open SQL Script**
3. Pilih file: `scripts/init-laukpedia-db.sql`
4. Click ⚡ **Execute** (atau Ctrl+Shift+Enter)
5. Tunggu sampai complete

### Option C: Via Import

```bash
mysql -u root -p laukpedia < scripts/init-laukpedia-db.sql
```

---

## 🔑 Step 2: Setup Environment Variables

### Create `.env.local` File

1. Di root project folder, create file: `.env.local`
2. Copy kode di bawah dan paste:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=laukpedia
```

3. Replace `your_mysql_password` dengan password MySQL Anda
4. Save file

**Example:**
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=mysql123
DB_NAME=laukpedia
```

### Verify `.env.local`

- [ ] File dibuat di root directory
- [ ] DB_HOST = localhost
- [ ] DB_USER = root (atau username Anda)
- [ ] DB_PASSWORD = password yang benar
- [ ] DB_NAME = laukpedia

⚠️ **Important:** `.env.local` tidak boleh di-commit ke GitHub (sudah di .gitignore)

---

## 🚀 Step 3: Install Dependencies

### Install npm packages

```bash
npm install
```

Tunggu sampai complete (biasanya 1-2 menit).

**Expected:** Folder `node_modules` muncul, file `package-lock.json` update

---

## 💻 Step 4: Run Development Server

```bash
npm run dev
```

**Expected output:**
```
> laukpedia@0.0.1 dev
> next dev

  ▲ Next.js 16.0.0
  - Local:        http://localhost:3000
  - Environments: .env.local

✓ Ready in Xs
```

---

## 🌐 Step 5: Open Website

1. Buka browser
2. Go to: **http://localhost:3000**
3. Seharusnya website LaukPedia loaded dengan:
   - Logo LaukPedia dengan tagline "Lauk Segar, Hari Lebih Nikmat"
   - Hero section dengan call-to-action
   - Menu catalog dengan 8 items

---

## 🧪 Step 6: Test Features

- [ ] **Homepage loads** - No error messages
- [ ] **Header visible** - Logo & cart badge
- [ ] **Menu Grid** - Shows 8 items
- [ ] **Category Filter** - Can click buttons (Semua, Nasi, Lauk Pauk, dll)
- [ ] **Menu Cards** - Show price, rating, description
- [ ] **"+ Pesan" Button** - Can click to add to cart
- [ ] **Cart Badge** - Number updates when adding items
- [ ] **Cart Icon** - Can click to open cart
- [ ] **Cart Panel** - Shows items dengan quantity controls
- [ ] **Order Form** - Name, phone, address inputs visible
- [ ] **Total Price** - Calculated correctly
- [ ] **"Pesan Sekarang" Button** - Can click to submit
- [ ] **Mobile View** - Responsive (F12 → Toggle device toolbar)

---

## 🗄️ Step 7: Verify Database Connection

### Check Database Data

```bash
# Buka MySQL terminal
mysql -u root -p

# Use database
USE laukpedia;

# Check categories
SELECT * FROM categories;

# Check menus dengan harga
SELECT name, price, category_id FROM menus;

# Check customer table (should be empty)
SELECT COUNT(*) FROM customers;
```

**Expected Result:**
- Categories table: 5 rows (Nasi, Lauk Pauk, Sayuran, Minuman, Dessert)
- Menus table: 8 rows with prices (25000-55000)
- Customers table: 0 rows (empty)

---

## 🧠 Step 8: Test Order Creation

### Create Test Order (Via Website)

1. Go to http://localhost:3000
2. Click "+ Pesan" pada 2-3 menu items
3. Click cart icon (🛒)
4. Fill form:
   - Nama: "Test Customer"
   - Telepon: "081234567890"
   - Alamat: "Test Address"
   - Tanggal: Pick date
5. Click "Pesan Sekarang"
6. Should see: "Pesanan berhasil dibuat!"

### Verify Order in Database

```bash
mysql -u root -p

USE laukpedia;

# Check orders
SELECT * FROM orders;

# Check customers
SELECT * FROM customers;

# Check order items
SELECT * FROM order_items;
```

**Expected Result:**
- New order created with order_number
- Customer data saved
- Order items saved correctly

---

## 🎨 Step 9: Customize (Optional)

### Change Menu Items

Edit file: `components/menu-grid.tsx`

Find `MOCK_MENUS` array and update:
- name
- description
- price
- review_count
- rating

### Change Colors

Edit file: `app/globals.css`

Find color tokens in `:root`:
```css
--primary: oklch(0.65 0.25 55); /* Change this for brand color */
```

### Change Tagline

Edit file: `components/header.tsx`

Find: `Lauk Segar, Hari Lebih Nikmat` and replace with your tagline

---

## 📱 Step 10: Test Mobile View

1. Press **F12** (open DevTools)
2. Click device toggle icon (top-left)
3. Select device: iPhone, iPad, Android
4. Test:
   - [ ] Menu responsive
   - [ ] Buttons clickable
   - [ ] Form inputs working
   - [ ] Cart accessible

---

## 🚨 Troubleshooting

### ❌ "Cannot find module 'mysql2'"
```bash
npm install mysql2
npm run dev
```

### ❌ "ECONNREFUSED" when starting server
- Check: MySQL server running? (`sudo service mysql status`)
- Check: Port 3306 open?
- Check: Credentials di `.env.local` benar?

### ❌ "Unknown database 'laukpedia'"
- Database belum dibuat
- Run SQL setup script lagi
- Verify DB_NAME di `.env.local`

### ❌ "Port 3000 already in use"
```bash
# Use different port
npm run dev -- -p 3001
```

### ❌ Menu items tidak muncul
- Check: Database connected? (restart server)
- Check: Sample data inserted? (run setup script)
- Check: Browser cache (Ctrl+Shift+Delete)

### ❌ Order tidak terbuat
- Check: All form fields filled?
- Check: Database writable?
- Check: Browser console untuk errors (F12)

---

## ✅ All Set!

If all steps checked ✅, your LaukPedia is **ready to use!**

### What to Do Next:

1. **Explore Code**
   - Read `/components/header.tsx` - understand component structure
   - Read `/lib/db.ts` - understand database connection
   - Read `/app/api/menus/route.ts` - understand API

2. **Learn More**
   - Read `README.md` - full project overview
   - Read `API_DOCUMENTATION.md` - API endpoints
   - Read `DEPLOYMENT.md` - deploy to production

3. **Customize & Extend**
   - Add more menus to database
   - Customize colors & fonts
   - Add new features (admin dashboard, payment, etc)

4. **Deploy**
   - Follow `DEPLOYMENT.md` untuk deploy ke Vercel
   - Setup production database
   - Configure custom domain

---

## 📞 Still Need Help?

1. **Check Docs:**
   - `QUICK_START.md` - Quick setup guide
   - `SETUP_DATABASE.md` - Database troubleshooting
   - `README.md` - Project overview

2. **Debug:**
   - Check terminal output
   - Open browser DevTools (F12)
   - Check MySQL Workbench

3. **Common Issues:**
   - Database not connected → Restart server
   - Port in use → Use different port
   - Env variables wrong → Double-check `.env.local`

---

## 🎉 Selamat!

Anda sudah setup **LaukPedia** dengan sukses! 🍲✨

**Tagline:** _"Lauk Segar, Hari Lebih Nikmat"_

Happy coding! 🚀
