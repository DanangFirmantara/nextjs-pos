# Quick Start Guide - POS System

Panduan cepat untuk memulai development POS System dalam 5 menit.

## 🚀 5-Minute Setup

### 1. Install Dependencies (1 menit)
\\\ash
npm install
\\\

### 2. Start Development Server (10 detik)
\\\ash
npm run dev
\\\

### 3. Open Browser (10 detik)
Navigate ke: **http://localhost:3000**

### 4. Login dengan Demo Account (30 detik)
\\\
Email: user@example.com
Password: anything
\\\

### 5. Explore Dashboard (3 menit)
- Lihat statistics cards
- Check recent transactions
- Click quick action buttons
- Try logout dari avatar menu

✅ **Done! Application siap digunakan**

---

## 📱 Available Pages

| Page | URL | Available |
|------|-----|-----------|
| Login | http://localhost:3000/login | ✅ Public |
| Dashboard | http://localhost:3000/dashboard | 🔒 Protected |
| Profile | http://localhost:3000/profile | ⏳ Coming Soon |

---

## 🔑 Demo Credentials

### Regular User
\\\
Email: user@example.com
Password: any password (demo mode)
Role: User
\\\

### Admin User
\\\
Email: admin@example.com
Password: any password (demo mode)
Role: Admin
\\\

> 💡 **Note**: Demo mode accepts any password. Ganti dengan production auth di AuthContext.tsx

---

## 🎮 Quick Actions on Dashboard

1. **Transaksi Baru** - Akan reroute ke transactions page (coming soon)
2. **Kelola Produk** - Product management page (coming soon)
3. **Laporan Harian** - Daily report page (coming soon)
4. **Setting** - Application settings (coming soon)

---

## 🛠️ Dev Server Commands

### Development
\\\ash
npm run dev          # Start dev server (port 3000)
npm run dev -- -p 3001  # Start on different port
\\\

### Production
\\\ash
npm run build        # Build untuk production
npm run start        # Run production build
\\\

### Linting
\\\ash
npm run lint         # Check code quality
\\\

---

## 📁 Important Files & Folders

### To Customize:
| File | Purpose | Edit For |
|------|---------|----------|
| \src/app/layout.tsx\ | Global layout | Change app structure |
| \src/components/Navbar.tsx\ | Navigation | Customize navbar |
| \src/app/dashboard/page.tsx\ | Dashboard | Add/remove cards |
| \src/context/AuthContext.tsx\ | Authentication | Change login logic |
| \src/constants/app.ts\ | App constants | Routes, demo data |

### Important Folders:
- **src/app** - Pages & routes
- **src/components** - Reusable components
- **src/context** - State management
- **src/types** - TypeScript definitions

---

## 🎨 Customization Examples

### Change Navbar Color
Open \src/components/Navbar.tsx\ line 30:
\\\	ypescript
// Change this:
sx={{ backgroundColor: '#1976d2' }}

// To:
sx={{ backgroundColor: '#ff5722' }}
\\\

### Add New Dashboard Card
Open \src/app/dashboard/page.tsx\ dan add new Grid item:
\\\	sx
<Grid item xs={12} sm={6} md={3}>
  <Card sx={{ background: 'linear-gradient(...)' }}>
    <CardContent>
      {/* Your card content */}
    </CardContent>
  </Card>
</Grid>
\\\

### Change App Name
Open \src/constants/app.ts\:
\\\	ypescript
export const APP_NAME = 'My POS App';
\\\

---

## 🐛 Troubleshooting

### Port 3000 sudah dipakai
\\\ash
npm run dev -- -p 3001
\\\

### Build error
\\\ash
rm -rf .next node_modules
npm install
npm run dev
\\\

### Import tidak working
- Pastikan path di tsconfig.json benar: \@/*: ["./src/*"]\
- Restart dev server

### Navbar tidak muncul
- Check AuthContext sudah wrap di layout.tsx
- Verify useAuth() hook di Navbar.tsx

---

## 📚 Learn More

- [Next.js Docs](https://nextjs.org/docs)
- [Material-UI Guide](https://mui.com)
- [Tailwind CSS Docs](https://tailwindcss.com)
- [React Guide](https://react.dev)

---

## 🚀 Next Steps

1. **Explore Code**: Baca file-file utama
2. **Add Feature**: Ikuti architecture.md untuk add fitur baru
3. **Customize UI**: Ubah colors, fonts, layout
4. **Connect Backend**: Ganti demo auth dengan real API
5. **Deploy**: Push ke Vercel atau hosting lain

---

## 📞 Need Help?

- Check **FEATURES.md** untuk fitur apa saja yang available
- Check **ARCHITECTURE.md** untuk design patterns
- Check **README.md** untuk dokumentasi lengkap
- Check **package.json** untuk dependencies

---

**Happy Coding! 🎉**

Dibuat dengan ❤️ using Next.js 14 + Material-UI + Tailwind CSS
