# 🚀 POS System - Professional Next.js Application

Aplikasi Point of Sale (POS) modern yang dibangun dengan Next.js 14, Material-UI, dan Tailwind CSS. Dilengkapi dengan authentication, dashboard, dan UI yang responsif.

## ✨ Fitur Utama

✅ **Authentication System**
- Login dengan email & password
- Session management dengan localStorage
- Protected routes untuk dashboard
- Auto-redirect berdasarkan authentication status

✅ **Beautiful Dashboard**
- Statistics cards dengan gradient backgrounds
- Recent transactions list
- Quick action buttons
- Responsive grid layout

✅ **Modern UI/UX**
- Material-UI components
- Tailwind CSS styling
- Gradient backgrounds
- Smooth animations

✅ **Professional Structure**
- Organized folder structure
- TypeScript support
- Reusable components
- Custom hooks
- Type-safe context

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **UI Libraries**: Material-UI (MUI v5), Tailwind CSS
- **Language**: TypeScript
- **State Management**: React Context API
- **Styling**: Emotion (MUI), Tailwind CSS
- **Package Manager**: npm

## 📁 Project Structure

\\\
src/
├── app/                    # Next.js app directory
│   ├── page.tsx           # Root page (redirect logic)
│   ├── layout.tsx         # Global layout
│   ├── globals.css        # Global styles
│   ├── login/
│   │   └── page.tsx       # Login page
│   └── dashboard/
│       └── page.tsx       # Dashboard page
├── components/            # Reusable React components
│   └── Navbar.tsx         # Navigation bar
├── context/              # React Context providers
│   └── AuthContext.tsx    # Authentication context
├── hooks/                # Custom React hooks
│   └── useProtectedRoute.ts
├── types/                # TypeScript type definitions
│   └── auth.ts           # Auth related types
├── utils/                # Utility functions
├── lib/                  # Library functions
├── constants/            # App constants
└── public/               # Static assets
\\\

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm atau yarn

### Installation

1. **Clone atau navigate ke project folder**
   \\\ash
   cd nextjs-pos
   \\\

2. **Install dependencies**
   \\\ash
   npm install
   \\\

3. **Run development server**
   \\\ash
   npm run dev
   \\\

4. **Open browser dan navigate ke**
   \\\
   http://localhost:3000
   \\\

## 📖 Usage

### Login ke Aplikasi

Gunakan credentials dibawah untuk testing:

**User biasa:**
- Email: \user@example.com\
- Password: \nything\

**Admin user:**
- Email: \dmin@example.com\
- Password: \nything\

> 🔐 Demo mode menerima password apapun. Pada production, implementasi proper authentication backend.

### Navigation

1. **Root Path (\/\)**
   - Redirect ke login jika belum authenticated
   - Redirect ke dashboard jika sudah authenticated

2. **Login Page (\/login\)**
   - Form login dengan validation
   - Error handling
   - Auto-redirect ke dashboard setelah login

3. **Dashboard (\/dashboard\)**
   - Protected route - hanya bisa diakses jika authenticated
   - Stats cards
   - Recent transactions
   - Quick actions

## 🔐 Authentication Flow

\\\
User Input Email & Password
         ↓
    Validation
         ↓
  API Call (demo)
         ↓
Store User in Context
         ↓
Save to localStorage
         ↓
Redirect to Dashboard
\\\

### Logout

Tekan avatar di top-right navbar → klik "Logout"

\\\
Click Avatar
    ↓
Select Logout
    ↓
Clear Context & localStorage
    ↓
Redirect to Login
\\\

## 📝 API Integration (Future)

Untuk production, update fungsi login di \src/context/AuthContext.tsx\:

\\\	ypescript
const login = async (email: string, password: string): Promise<void> => {
  setIsLoading(true);
  try {
    // Replace dengan real API call
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    
    if (!response.ok) throw new Error('Login failed');
    
    const userData = await response.json();
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  } finally {
    setIsLoading(false);
  }
};
\\\

## 🎨 Customization

### Colors & Theme

Update Material-UI theme di components atau global styles:

\\\	ypescript
// Di Navbar.tsx atau component lain
sx={{ backgroundColor: '#1976d2' }}  // Change color
sx={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}
\\\

### Dashboard Statistics

Edit items di \src/app/dashboard/page.tsx\ Grid container.

### Tailwind Configuration

Customize di \	ailwind.config.ts\:

\\\javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '#667eea',
      },
    },
  },
};
\\\

## 🧪 Development Commands

\\\ash
# Development server
npm run dev

# Build untuk production
npm run build

# Run production build
npm run start

# Lint code
npm run lint

# Type check
npx tsc --noEmit
\\\

## 📦 Build untuk Production

\\\ash
npm run build
npm run start
\\\

Production build akan optimize semua assets dan siap untuk deployment.

## 🚀 Deployment

### Vercel (Recommended)

\\\ash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
\\\

### Other Platforms

Build project terlebih dahulu:

\\\ash
npm run build
\\\

Kemudian deploy folder \.next\ ke platform pilihan Anda.

## 🔒 Security Notes

1. **Authentication**: Saat ini menggunakan localStorage. Untuk production, gunakan HttpOnly cookies dengan secure backend.

2. **Credentials**: Jangan hardcode credentials di frontend. Implementasis backend authentication proper.

3. **Sensitive Data**: Jangan expose API keys atau sensitive info di CLIENT_SIDE code.

4. **HTTPS**: Selalu gunakan HTTPS di production.

5. **CORS**: Configure CORS properly di backend.

## 🐛 Troubleshooting

### Port 3000 sudah digunakan
\\\ash
npm run dev -- -p 3001
\\\

### Build error dengan Material-UI
\\\ash
npm install --save-exact @mui/material@latest
\\\

### Import path tidak working
- Pastikan tsconfig.json path alias sudah benar
- Restart dev server

## 📚 Useful Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Material-UI Docs](https://mui.com/material-ui/getting-started/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [React Documentation](https://react.dev)

## 📞 Support

Untuk issues atau pertanyaan:
1. Check existing issues
2. Create new issue dengan detail
3. Include error messages dan screenshots

## 📄 License

MIT License - Feel free to use ini project untuk keperluan Anda.

---

**Happy Coding! 🎉**

Dibuat dengan ❤️ menggunakan Next.js 14, Material-UI, dan Tailwind CSS.
