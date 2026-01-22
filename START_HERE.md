# 👋 LaukPedia - START HERE!

Selamat datang di **LaukPedia** - Platform catering modern dengan design yang menarik dan database MySQL yang powerful!

Tagline: **_"Lauk Segar, Hari Lebih Nikmat"_ 🌟**

---

## 🎯 Apa yang Telah Dibuat?

Kami telah membuat project Next.js catering yang **production-ready** dengan:

✅ **Frontend Cantik**
- Landing page dengan hero section menarik
- Menu catalog dengan filter kategori
- Shopping cart dengan order form
- Responsive design (mobile, tablet, desktop)
- Warna orange hangat & UI yang user-friendly

✅ **Backend MySQL**
- 8 database tables dengan relationships yang proper
- API endpoints untuk menus & orders
- Connection pooling untuk performa optimal
- Sample data ready (5 kategori + 8 menu items)

✅ **Dokumentasi Lengkap**
- Setup guides
- API documentation
- Deployment instructions
- Database schema details

---

## 🚀 Quick Start (5 Menit!)

### Step 1: Setup Database MySQL

#### Via Command Line (Tercepat):
```bash
# 1. Buka MySQL
mysql -u root -p

# 2. Jalankan di MySQL prompt:
CREATE DATABASE laukpedia;
USE laukpedia;

# 3. Copy semua kode dari file: scripts/init-laukpedia-db.sql
# Paste di MySQL prompt, tekan Enter

# 4. Verifikasi
SHOW TABLES;
SELECT * FROM categories;
```

#### Atau buka `scripts/init-laukpedia-db.sql` langsung di MySQL Workbench dan execute!

### Step 2: Setup Environment Variables

Buat file `.env.local` di root project:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password_here
DB_NAME=laukpedia
```

### Step 3: Run Website

```bash
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) 🎉

### Step 4: Test Features

- ✅ Lihat menu dengan emoji gambar
- ✅ Filter by kategori (Nasi, Lauk Pauk, dll)
- ✅ Tambah ke keranjang (lihat badge count naik)
- ✅ Buka cart dengan klik 🛒
- ✅ Isi formulir pesanan
- ✅ Submit order

---

## 📚 Dokumentasi (Baca dalam urutan ini)

1. **[QUICK_START.md](./QUICK_START.md)** ← Mulai di sini!
   - Setup steps yang detail
   - Troubleshooting
   - Testing checklist

2. **[README.md](./README.md)**
   - Project overview lengkap
   - Features explanation
   - Component structure

3. **[SETUP_DATABASE.md](./SETUP_DATABASE.md)**
   - Database schema detail
   - Query examples
   - Connection troubleshooting

4. **[API_DOCUMENTATION.md](./API_DOCUMENTATION.md)**
   - API endpoints reference
   - Request/response examples
   - cURL & JavaScript examples

5. **[DEPLOYMENT.md](./DEPLOYMENT.md)**
   - Production deployment guide
   - Vercel setup instructions
   - Security checklist

6. **[PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md)**
   - Complete project summary
   - Files overview
   - Next steps

---

## 🗂️ File Structure

```
laukpedia/
├── 📄 START_HERE.md              ← Anda di sini!
├── 📄 QUICK_START.md             ← Baca ini next
├── 📄 README.md                  
├── 📄 SETUP_DATABASE.md          
├── 📄 API_DOCUMENTATION.md       
├── 📄 DEPLOYMENT.md              
├── 📄 PROJECT_SUMMARY.md         
│
├── 📁 app/
│   ├── page.tsx                  # Homepage
│   ├── layout.tsx                # Root layout
│   ├── globals.css               # Styling & theme
│   └── 📁 api/
│       ├── menus/route.ts        # Menu API
│       └── orders/route.ts       # Order API
│
├── 📁 components/
│   ├── header.tsx                # Navigation
│   ├── hero.tsx                  # Hero section
│   ├── menu-grid.tsx             # Menu display
│   ├── cart.tsx                  # Shopping cart
│   └── 📁 ui/                    # shadcn components
│
├── 📁 lib/
│   ├── db.ts                     # MySQL connection
│   └── utils.ts                  # Utilities
│
├── 📁 scripts/
│   └── init-laukpedia-db.sql    # Database setup
│
└── .env.example                  # Environment template
```

---

## 🗄️ Database Overview

### Tables Created:
1. **categories** - Menu categories (5 items)
2. **menus** - Menu items (8 items)
3. **customers** - Customer data
4. **orders** - Order records
5. **order_items** - Items per order
6. **reviews** - Menu reviews
7. **promos** - Discount codes

### Sample Data Included:
- 5 Categories: Nasi 🍚, Lauk Pauk 🍗, Sayuran 🥬, Minuman 🥤, Dessert 🍰
- 8 Menu Items dengan harga & rating

---

## 🎨 Design Highlights

- **Color:** Warm orange (#FF7F50 inspired) + cream
- **Font:** Geist (modern, friendly)
- **Layout:** Mobile-first responsive
- **Components:** shadcn/ui (accessible, beautiful)
- **Tagline:** "Lauk Segar, Hari Lebih Nikmat" ✨

---

## 📡 API Ready

Website sudah punya working API endpoints:

```
GET  /api/menus              # Get all menus
GET  /api/menus?category_id=1  # Filter by category
POST /api/orders             # Create order
GET  /api/orders?phone=xxx   # Get customer orders
```

Lihat `API_DOCUMENTATION.md` untuk detail lengkap!

---

## ✅ Common Questions

### Q: Database belum setup?
**A:** Follow Step 1 di Quick Start section. Jalankan SQL script di MySQL Workbench atau command line.

### Q: Port 3000 sudah terpakai?
**A:** Run dengan port lain: `npm run dev -- -p 3001`

### Q: Mau deploy ke production?
**A:** Baca `DEPLOYMENT.md` untuk setup Vercel + MySQL hosting.

### Q: Gimana cara menambah menu baru?
**A:** Ada 2 cara:
1. Insert ke database via MySQL
2. Atau POST ke `/api/menus` (lihat API docs)

### Q: Bisa customize warna/font?
**A:** Ya! Edit `/app/globals.css` untuk mengubah color tokens dan typography.

---

## 🧪 Testing Checklist

Setelah setup, test features ini:

- [ ] Website loads di http://localhost:3000
- [ ] Header dengan logo LaukPedia terlihat
- [ ] Hero section dengan call-to-action
- [ ] Menu Grid menampilkan 8 items
- [ ] Filter kategori bekerja
- [ ] Rating & review count terlihat
- [ ] Tombol "+ Pesan" responsive
- [ ] Cart badge count update when adding items
- [ ] Cart side panel buka/tutup
- [ ] Form input (nama, telepon, alamat)
- [ ] Total price calculated correctly
- [ ] Tombol "Pesan Sekarang" clickable
- [ ] Mobile responsive (test dengan devtools)

---

## 🚀 Production Deployment

Siap deploy? Follow checklist ini:

### Before Deploy:
1. Setup production database (MySQL hosting)
2. Test all features locally
3. Backup credentials securely

### Deploy:
1. Push code ke GitHub
2. Connect Vercel project
3. Add environment variables di Vercel
4. Deploy dengan 1 click!

Lihat `DEPLOYMENT.md` untuk langkah detail.

---

## 💡 Pro Tips

1. **Use Postman** untuk test API endpoints
2. **Browser DevTools** (F12) untuk debugging
3. **MySQL Workbench** untuk visualize database
4. **Vercel CLI** untuk local testing dengan env vars
5. **Git** untuk version control (sudah di .gitignore yang proper)

---

## 📞 Troubleshooting

### Issue: "Cannot find module 'mysql2'"
```bash
npm install mysql2
```

### Issue: "ECONNREFUSED"
- Check: Apakah MySQL server running?
- Check: Credentials di `.env.local` benar?

### Issue: "Unknown database 'laukpedia'"
- Run SQL setup script terlebih dahulu
- Verify database name di `.env.local`

### Issue: Website tidak load
- Check: Dev server running? (lihat terminal)
- Check: Browser console untuk errors (F12)
- Check: Port 3000 available?

---

## 🎓 Learn More

### Next.js
- [Official Docs](https://nextjs.org)
- [App Router Guide](https://nextjs.org/docs/app)

### Styling
- [Tailwind CSS](https://tailwindcss.com)
- [Color Tokens](https://tailwindcss.com/docs/theme)

### Components
- [shadcn/ui](https://ui.shadcn.com)
- [Component Gallery](https://ui.shadcn.com/docs/components)

### Database
- [MySQL Docs](https://dev.mysql.com/doc/)
- [SQL Tutorial](https://www.w3schools.com/sql/)

---

## 📋 Next Steps

### Short Term (Today)
1. ✅ Setup database
2. ✅ Run `npm run dev`
3. ✅ Test website locally
4. ✅ Create sample orders

### Medium Term (This Week)
1. Customize content (menu names, prices, etc)
2. Add your branding (logo, colors)
3. Test API endpoints
4. Setup email notifications (optional)

### Long Term (This Month)
1. Deploy to production (Vercel)
2. Setup custom domain
3. Add payment gateway (Stripe)
4. Create admin dashboard
5. Setup analytics

---

## 🎉 You're All Set!

Sekarang Anda siap untuk:
- ✅ Develop fitur lebih lanjut
- ✅ Deploy ke production
- ✅ Scale bisnis catering Anda

**Next Action:** Buka `QUICK_START.md` dan ikuti langkah 1-4! 🚀

---

## 📞 Need Help?

1. **Check docs** - Sebagian besar pertanyaan sudah dijawab di dokumentasi
2. **Check logs** - Terminal & browser console punya clues
3. **Debug step by step** - Test setiap bagian secara terpisah

---

**Happy coding! 🍲✨**

_"Lauk Segar, Hari Lebih Nikmat"_

---

**Last Updated:** January 22, 2026
**Project Status:** ✅ Production Ready
