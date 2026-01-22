# 🚀 LaukPedia - Deployment Guide

Panduan lengkap untuk deploy LaukPedia ke production di Vercel dengan MySQL.

---

## 📋 Pre-Deployment Checklist

Sebelum deploy, pastikan semua item ini sudah selesai:

### Code & Configuration
- [ ] Semua fitur sudah tested di local
- [ ] Environment variables sudah dikonfigurasi di `.env.local`
- [ ] Database schema sudah dibuat dan terisi data
- [ ] API endpoints sudah tested
- [ ] Console errors sudah dihapus
- [ ] Build lokal berhasil (`npm run build`)

### Database
- [ ] MySQL database sudah dibuat dengan nama yang tepat
- [ ] Tables & indexes sudah dibuat via script
- [ ] Sample data sudah diinsert
- [ ] Backup data sudah dibuat
- [ ] Database credentials sudah aman

### Git & GitHub
- [ ] Project sudah di-push ke GitHub repository
- [ ] `.env.local` sudah di-exclude di `.gitignore`
- [ ] Sensitive data tidak ada di repository

---

## 🔧 Setup Production Database

### Opsi 1: Hosting MySQL Terpisah (Recommended)

Gunakan provider seperti:
- **Hostinger** - Affordable, fast
- **Digital Ocean** - Scalable
- **AWS RDS** - Enterprise
- **Google Cloud SQL** - Reliable
- **Microsoft Azure Database** - Integrated with Azure

#### Steps:
1. Buat database di hosting provider
2. Catat credentials (host, user, password, database name)
3. Run script `/scripts/init-laukpedia-db.sql` di production database
4. Test koneksi sebelum deploy

### Opsi 2: Local Database + Tunnel (Testing Only)

Untuk testing, bisa tunnel local database ke production:
```bash
# Expose local MySQL via ngrok
ngrok tcp 3306
```

⚠️ **Warning:** Tidak recommended untuk production!

---

## 🌐 Deploy ke Vercel

### Step 1: Connect Repository ke Vercel

```bash
# Install Vercel CLI
npm install -g vercel

# Login ke Vercel
vercel login

# Deploy
vercel
```

Atau gunakan Vercel Dashboard:
1. Go to https://vercel.com/dashboard
2. Click "Add New" → "Project"
3. Select GitHub repository
4. Click "Import"

### Step 2: Configure Environment Variables

Di Vercel Dashboard:

1. Go to **Settings** → **Environment Variables**
2. Add variables:

```
DB_HOST = mysql.example.com (atau IP address)
DB_USER = laukpedia_user
DB_PASSWORD = your_secure_password
DB_NAME = laukpedia
```

3. Select environments:
   - **Production** - untuk domain live
   - **Preview** - untuk preview deployments
   - **Development** - untuk local dev

4. Click "Save"

### Step 3: Configure Deployment Settings

**Build & Development Settings:**
- Build Command: `npm run build`
- Install Command: `npm install`
- Output Directory: `.next`

### Step 4: First Deploy

```bash
# Deploy to production
vercel --prod
```

Atau gunakan dashboard: Click "Deploy"

---

## 🔗 Database Connection Verification

### Test Connection Sebelum Deploy

Di local terminal:
```bash
# Test koneksi ke database
mysql -h your_db_host -u your_db_user -p your_db_name -e "SELECT * FROM categories;"
```

### Verify Production Connection

Setelah deploy, test API:

```bash
# Test GET /api/menus
curl https://your-domain.com/api/menus

# Expected response
{
  "success": true,
  "data": [...],
  "count": 8
}

# Jika error:
# 1. Check Vercel logs (Deployments → Recent → View Logs)
# 2. Check database connection
# 3. Verify environment variables
```

---

## 📊 Production Database Setup

### Create Database

```sql
-- Connect ke MySQL hosting
mysql -h your_db_host -u root -p

-- Create database
CREATE DATABASE laukpedia;
CREATE USER 'laukpedia_user'@'%' IDENTIFIED BY 'strong_password_123';
GRANT ALL PRIVILEGES ON laukpedia.* TO 'laukpedia_user'@'%';
FLUSH PRIVILEGES;

-- Use database
USE laukpedia;

-- Run setup script (paste content dari /scripts/init-laukpedia-db.sql)
```

### Database Backup Strategy

```bash
# Backup database
mysqldump -h host -u user -p database_name > backup.sql

# Schedule automated backups (cron job)
0 2 * * * mysqldump -h host -u user -p database > /backups/laukpedia_$(date +\%Y\%m\%d).sql

# Restore from backup
mysql -h host -u user -p database_name < backup.sql
```

---

## 🔒 Security Checklist

- [ ] Database password strong & secure
- [ ] Environment variables tidak di-hardcode
- [ ] HTTPS enabled (Vercel default)
- [ ] Database access limited ke Vercel IP
- [ ] Parameterized queries digunakan (sudah di code)
- [ ] SQL injection prevention implemented
- [ ] Rate limiting setup (opsional tapi recommended)
- [ ] Input validation implemented
- [ ] Regular security updates

### Database Access Control

Jika menggunakan cloud database hosting:

```sql
-- Limit access dari Vercel IP saja
ALTER USER 'laukpedia_user'@'%' REQUIRE SSL;

-- Or whitelist specific IPs
GRANT ALL PRIVILEGES ON laukpedia.* 
TO 'laukpedia_user'@'vercel_ip_address';
```

---

## 📈 Monitoring & Maintenance

### Vercel Monitoring

- **Dashboard**: https://vercel.com/dashboard
- **Analytics**: Real-time requests, response times
- **Logs**: Check via Deployments → Logs
- **Error Tracking**: Monitor 5xx errors

### Database Monitoring

```sql
-- Check database size
SELECT 
  TABLE_NAME,
  ROUND(((DATA_LENGTH + INDEX_LENGTH) / 1024 / 1024), 2) AS size_mb
FROM INFORMATION_SCHEMA.TABLES
WHERE TABLE_SCHEMA = 'laukpedia'
ORDER BY size_mb DESC;

-- Check slow queries
SHOW VARIABLES LIKE 'slow_query%';
SET GLOBAL slow_query_log = 'ON';
SET GLOBAL long_query_time = 2;
```

### Performance Optimization

```sql
-- Add indexes (if not present)
CREATE INDEX idx_order_customer ON orders(customer_id);
CREATE INDEX idx_order_items_order ON order_items(order_id);
CREATE INDEX idx_order_items_menu ON order_items(menu_id);

-- Monitor query performance
EXPLAIN SELECT * FROM orders WHERE customer_id = 1;
```

---

## 🐛 Troubleshooting

### Database Connection Error

```
Error: ECONNREFUSED
```

**Solution:**
1. Verify credentials di Vercel environment variables
2. Check database host is reachable: `telnet host port`
3. Check database firewall settings
4. Verify database server is running

### Slow Queries

```
Error: QUERY TIMEOUT
```

**Solution:**
1. Add indexes: `CREATE INDEX idx_name ON table(column);`
2. Optimize queries: `EXPLAIN SELECT ...`
3. Increase query timeout
4. Scale database resources

### Out of Memory

```
Error: JavaScript heap out of memory
```

**Solution:**
1. Optimize database queries
2. Add pagination to large result sets
3. Use connection pooling (sudah implemented)
4. Scale Vercel project

---

## 📝 Deployment Checklist

### Pre-Deployment
- [ ] Environment variables di Vercel
- [ ] Database schema di production
- [ ] Database backup dibuat
- [ ] API tested di staging
- [ ] No console errors/warnings

### Post-Deployment
- [ ] Website accessible di domain
- [ ] API endpoints responding
- [ ] Database queries working
- [ ] Menus displaying correctly
- [ ] Orders dapat dibuat
- [ ] Email/notifications working (jika ada)

### After 24 Hours
- [ ] Check error logs
- [ ] Monitor performance
- [ ] Verify analytics
- [ ] Check database size growth

---

## 🔄 Continuous Deployment

Vercel automatic deployment:

1. **Push ke GitHub** → Automatic deploy triggered
2. **Preview Deployments** → Test sebelum merge
3. **Merge to Main** → Deploy to production

### Disable Auto-Deploy (jika perlu)

Di Vercel Settings → Git:
- Toggle "Deploy on push" OFF
- Manual deploy via `vercel --prod`

---

## 📞 Support & Rollback

### Jika Ada Issue di Production

1. **Check Logs**: Vercel Dashboard → Deployments → Logs
2. **Rollback**: Deployments → Select Previous → Redeploy
3. **Database Restore**: Restore dari backup
4. **Contact Support**: Vercel Support atau hosting provider

### Quick Rollback

```bash
# Rollback ke deployment sebelumnya
vercel rollback
```

---

## 💡 Best Practices

1. **Test di Staging Dulu**
   - Deploy ke preview environment
   - Test semua fitur
   - Verify database connection
   - Check API responses

2. **Monitor Closely**
   - Watch error logs first 24h
   - Check database performance
   - Monitor API response times
   - Set up alerts

3. **Regular Backups**
   - Daily database backups
   - Test restore procedures
   - Keep backup history

4. **Update Documentation**
   - Document deployment date
   - Note any configuration changes
   - Keep runbooks updated

5. **Plan Scaling**
   - Monitor database size growth
   - Prepare for increased traffic
   - Plan infrastructure upgrades

---

## 🎯 Custom Domain Setup

1. **Buy Domain** - GoDaddy, Namecheap, dll
2. **Go to Vercel** → Settings → Domains
3. **Add Domain** → Enter your domain
4. **Update DNS** - Follow Vercel instructions
5. **Wait for Verification** - Usually 24-48 hours

---

## 📚 Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment](https://nextjs.org/learn/basics/deploying-nextjs-app)
- [MySQL Backup & Restore](https://dev.mysql.com/doc/refman/8.0/en/mysqldump.html)
- [Database Security Best Practices](https://cheatsheetseries.owasp.org/cheatsheets/SQL_Injection.html)

---

**Ready to go live? Let's deploy!** 🚀🍲

Pertanyaan? Check logs atau contact support!
