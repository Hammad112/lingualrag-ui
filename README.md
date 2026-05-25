# 🚀 LingualRAG - Production-Grade Multilingual RAG System

![Status](https://img.shields.io/badge/status-production--ready-brightgreen)
![Next.js](https://img.shields.io/badge/next.js-16-black)
![React](https://img.shields.io/badge/react-19-blue)
![TypeScript](https://img.shields.io/badge/typescript-5-blue)
![Tailwind CSS](https://img.shields.io/badge/tailwind-latest-38B2AC)
![License](https://img.shields.io/badge/license-proprietary-red)

**LingualRAG** is a fully responsive, production-ready multilingual Retrieval-Augmented Generation (RAG) system with beautiful animations, comprehensive security, and optimized performance for mobile, tablet, iPad, and desktop devices.

## ✨ Key Highlights

- 🌍 **Multilingual Support** - 20+ languages with RTL detection
- 📱 **Fully Responsive** - Mobile, tablet, iPad, and desktop optimized
- 🎨 **Professional UI** - Beautiful animations and modern design
- 🔒 **Highly Secure** - JWT, OTP, HTTPS, secure cookies
- ⚡ **Lightning Fast** - Optimized performance, streaming responses
- 🏗️ **Production Ready** - Full TypeScript, error handling, monitoring
- 📊 **Real-time Analytics** - Admin dashboard with charts
- 🎬 **Smooth Animations** - Framer Motion, 60fps performance
- 🔌 **Easy Integration** - Axios API client with interceptors
- 📈 **Scalable** - Designed for high-traffic applications

## 🎯 Quick Start

### Deploy to Vercel (5 minutes)
```bash
# 1. Clone repository
git clone <repo>
cd vercel/share/v0-project

# 2. Install dependencies
pnpm install

# 3. Set environment variables
NEXT_PUBLIC_API_URL=https://your-backend.onrender.com
NEXT_PUBLIC_APP_NAME=LingualRAG
NEXT_PUBLIC_SENTRY_DSN=https://xxxxx@sentry.io/xxxxx

# 4. Deploy
vercel --prod
```

**Or** use Vercel Dashboard:
1. Connect GitHub repository
2. Set environment variables
3. Click "Deploy"

👉 **See [QUICK_START.md](./QUICK_START.md) for step-by-step guide**

## 📚 Documentation

- **[QUICK_START.md](./QUICK_START.md)** - Fast deployment guide
- **[DEPLOYMENT.md](./DEPLOYMENT.md)** - Complete deployment docs
- **[PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md)** - Technical details
- **[API Documentation](#-api-endpoints)** - Backend API spec

## 🏗️ Architecture Overview

```
Frontend (Vercel)
    ↓
Next.js 16 + React 19 + TypeScript
    ↓
Axios API Client (with interceptors)
    ↓
Backend API (Node.js/Python)
    ↓
Database (PostgreSQL/MongoDB)
```

### Tech Stack
| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Framework** | Next.js 16 | React meta-framework |
| **Language** | TypeScript | Type safety |
| **Styling** | Tailwind CSS | Utility-first CSS |
| **UI Components** | shadcn/ui | Pre-built components |
| **Animations** | Framer Motion | Smooth animations |
| **HTTP Client** | Axios | API requests |
| **Charts** | Recharts | Data visualization |
| **Icons** | lucide-react | SVG icons |
| **File Upload** | react-dropzone | Drag & drop files |
| **Auth** | JWT + OTP | Secure authentication |
| **State** | React Hooks + SWR | Client state management |

## 🎨 Features in Detail

### 1️⃣ Authentication
- **OTP-based login** - No password hassle
- **JWT tokens** - Secure session management
- **Auto refresh** - Seamless token renewal
- **Protected routes** - Automatic redirects
- **HTTP-only cookies** - Enhanced security

### 2️⃣ Chat Interface
- **Real-time streaming** - SSE for instant responses
- **RTL support** - Auto-detect Arabic, Urdu, Hebrew, etc.
- **Source citations** - RAG context with references
- **Message actions** - Copy, delete, regenerate
- **Typing indicators** - See when AI is responding
- **Error recovery** - Graceful failure handling

### 3️⃣ Document Management
- **Drag & drop upload** - Intuitive file upload
- **Real-time progress** - Watch upload status
- **Smart processing** - Automatic language detection
- **Multi-format** - PDF, DOC, DOCX, TXT support
- **Search capability** - Find documents quickly
- **Version tracking** - Document history

### 4️⃣ Admin Dashboard
- **Real-time metrics** - Live statistics
- **Language analytics** - Distribution charts
- **User management** - User list and stats
- **System health** - Performance monitoring
- **Auto-refresh** - 30-second updates
- **Export ready** - Metrics for reports

### 5️⃣ User Settings
- **Profile management** - Edit user info
- **Language selection** - 20+ languages
- **Password change** - Secure password updates
- **Preferences** - Save user preferences
- **Dark mode ready** - Setup included

### 6️⃣ Responsive Design
- **Mobile First** - Optimized for phones
- **Tablet Ready** - Perfect on iPad
- **Desktop Optimized** - Full-featured UI
- **Touch Friendly** - 44px+ touch targets
- **Fluid Typography** - Scales with screen

## 📱 Device Support

| Device | Viewport | Status |
|--------|----------|--------|
| **iPhone 12/13** | 390x844 | ✅ Optimized |
| **Android Phone** | 360x800 | ✅ Optimized |
| **iPad** | 768x1024 | ✅ Optimized |
| **iPad Pro** | 1024x1366 | ✅ Optimized |
| **Desktop** | 1920x1080 | ✅ Optimized |
| **Large Monitor** | 2560x1440 | ✅ Optimized |

## 🔒 Security Features

### Built-in Security
```
✅ HTTPS enforcement
✅ JWT token validation
✅ Secure HTTP-only cookies
✅ CSRF protection (SameSite)
✅ XSS prevention (CSP headers)
✅ Input validation & sanitization
✅ Error boundary protection
✅ API error masking
✅ Rate limiting support
✅ Environment variable protection
```

### Security Headers
```
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block
Referrer-Policy: strict-origin-when-cross-origin
```

## 🚀 Performance Metrics

### Core Web Vitals (Target)
- **LCP** (Largest Contentful Paint): < 2.5s
- **FID** (First Input Delay): < 100ms
- **CLS** (Cumulative Layout Shift): < 0.1
- **TTFB** (Time to First Byte): < 600ms

### Optimizations
- ✅ Code splitting per route
- ✅ Image optimization (WebP, AVIF)
- ✅ CSS minification
- ✅ JavaScript compression
- ✅ Lazy loading components
- ✅ Asset caching strategy
- ✅ CDN delivery (Vercel)

## 🎬 Animation Features

### Entrance Animations
```
- Fade in (150ms)
- Slide up (300ms)
- Scale in (200ms)
- Stagger effects
```

### Interactive Animations
```
- Hover effects
- Button feedback
- Loading spinners
- Pulse effects
- Bounce animations
```

### Page Transitions
```
- Smooth transitions
- No layout shifts
- GPU accelerated
- 60fps performance
```

## 🌍 Multilingual Support

### Supported Features
- **20+ Languages** - Full language support
- **RTL Detection** - Auto-detect right-to-left text
- **Font Support** - Noto Nastaliq for Urdu
- **Text Direction** - Automatic LTR/RTL handling
- **Language Settings** - User preference storage

### Supported Languages
Arabic, Chinese, Dutch, English, French, German, Hebrew, Hindi, Hungarian, Italian, Japanese, Korean, Polish, Portuguese, Russian, Spanish, Swedish, Thai, Turkish, Urdu, Vietnamese, and more...

## 📊 API Endpoints

### Authentication
```
POST   /auth/send-otp      - Send OTP to email
POST   /auth/login         - Login with email + OTP
POST   /auth/signup        - Register new user
GET    /auth/me            - Get current user
POST   /auth/refresh       - Refresh JWT token
```

### Chat
```
POST   /chat/message       - Send a message
GET    /chat/stream        - Stream response (SSE)
GET    /sessions/{id}      - Get session
GET    /sessions/{id}/messages - Get history
POST   /sessions           - Create session
DELETE /messages/{id}      - Delete message
```

### Documents
```
POST   /documents/upload   - Upload document
GET    /documents          - List documents
GET    /documents/{id}     - Get document
GET    /documents/{id}/status - Check status
DELETE /documents/{id}     - Delete document
GET    /documents/search   - Search documents
```

### Admin
```
GET    /admin/analytics    - Get analytics data
GET    /admin/users        - List all users
GET    /admin/users/{id}   - Get user details
DELETE /admin/users/{id}   - Delete user
GET    /admin/users/{id}/stats - User statistics
```

### Settings
```
PUT    /settings/profile   - Update profile
POST   /settings/change-password - Change password
GET    /settings/preferences - Get preferences
PUT    /settings/preferences - Update preferences
```

## 📂 Project Structure

```
vercel/share/v0-project/
├── app/
│   ├── (auth)/
│   │   ├── login/page.tsx
│   │   └── signup/page.tsx
│   ├── (protected)/
│   │   ├── chat/page.tsx
│   │   ├── documents/page.tsx
│   │   ├── admin/page.tsx
│   │   └── settings/page.tsx
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   ├── ProtectedLayout.tsx
│   ├── Sidebar.tsx
│   ├── Providers.tsx
│   └── ui/ (shadcn components)
├── hooks/
│   ├── useAuth.ts
│   ├── useChat.ts
│   └── use-mobile.tsx
├── lib/
│   ├── auth.ts
│   ├── api-client.ts
│   └── api-services.ts
├── types/
│   ├── index.ts
│   └── rtl-detect.d.ts
├── public/
│   ├── logo.png
│   └── robots.txt
└── config files
```

## 🛠️ Development

### Local Setup
```bash
# Install
pnpm install

# Environment
cp .env.local.example .env.local

# Development
pnpm dev

# Build
pnpm build

# Type check
pnpm tsc --noEmit
```

### Available Scripts
```bash
pnpm dev        # Start dev server
pnpm build      # Production build
pnpm start      # Start production server
pnpm lint       # Run ESLint
pnpm type-check # Run TypeScript checker
```

## 🔧 Configuration Files

### next.config.mjs
- Image optimization
- Security headers
- Performance settings
- Experimental features

### tailwind.config.ts
- Design tokens
- Custom colors
- Font configuration
- Responsive breakpoints

### tsconfig.json
- TypeScript strictness
- Path aliases
- Module resolution

### vercel.json
- Environment variables
- Build command
- Deployment regions

## 🚢 Deployment Checklist

Before deploying to production:

- [ ] Update logo (public/logo.png)
- [ ] Change colors in globals.css
- [ ] Set backend API URL
- [ ] Configure Sentry DSN
- [ ] Test all features locally
- [ ] Run production build
- [ ] Check TypeScript errors
- [ ] Test on mobile/tablet
- [ ] Verify animations work
- [ ] Check security headers
- [ ] Enable monitoring
- [ ] Set up error tracking
- [ ] Configure custom domain
- [ ] Enable analytics
- [ ] Test email (OTP)

## 🐛 Troubleshooting

### Common Issues

**Q: "Cannot connect to API"**
- Check NEXT_PUBLIC_API_URL environment variable
- Verify backend is running
- Check CORS headers on backend
- Review network tab in DevTools

**Q: "Responsive design broken"**
- Clear browser cache (Ctrl+Shift+Delete)
- Test in Chrome DevTools device mode
- Check mobile viewport settings
- Verify Tailwind compilation

**Q: "Build fails on Vercel"**
- Check environment variables
- Review Vercel build logs
- Verify TypeScript compilation
- Check for missing dependencies

**Q: "Animations not smooth"**
- Check browser DevTools Performance tab
- Verify GPU acceleration enabled
- Check Framer Motion versions
- Test in production build (not dev)

## 📈 Analytics & Monitoring

### Vercel Analytics
- Real user monitoring
- Core Web Vitals tracking
- Performance insights
- Deployment analytics

### Sentry Integration
- Error tracking
- Performance monitoring
- Source maps
- Replay session recordings

### Custom Analytics
- Admin dashboard metrics
- User engagement
- Language distribution
- Query patterns

## 💡 Customization Guide

### Change Logo
```
Replace: /public/logo.png
Size: 1024x1024px (PNG)
```

### Change Colors
```css
/* /app/globals.css */
:root {
  --primary: 79 70 229; /* Change to your brand RGB */
}
```

### Add Custom Domain
1. Vercel Dashboard → Domains
2. Add domain
3. Update DNS records
4. SSL auto-provisioned

### Modify Animations
```css
/* /app/globals.css */
@keyframes customAnimation {
  from { ... }
  to { ... }
}
```

## 🎓 Learning Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Framer Motion Guide](https://www.framer.com/motion)
- [Vercel Deployment Guide](https://vercel.com/docs)

## 📞 Support

### Getting Help
1. Check [QUICK_START.md](./QUICK_START.md)
2. Review [DEPLOYMENT.md](./DEPLOYMENT.md)
3. Check [PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md)
4. Review code comments
5. Check component examples

### Report Issues
- Check existing issues
- Provide detailed description
- Include error messages
- Share reproduction steps

## 📄 License

This project is proprietary and confidential. All rights reserved.

## ✨ Built With

- **Next.js** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **shadcn/ui** - Components
- **Framer Motion** - Animations
- **Axios** - HTTP client
- **Recharts** - Charts

## 🙏 Acknowledgments

Built with attention to detail, production best practices, and modern web standards.

---

## 🎉 Get Started

1. **[Deploy to Vercel](./QUICK_START.md)** - 5 minute setup
2. **[Configure Backend](./DEPLOYMENT.md)** - Connect your API
3. **[Customize Branding](./PROJECT_SUMMARY.md)** - Make it yours
4. **[Monitor & Scale](./DEPLOYMENT.md)** - Setup analytics

**Ready to launch? → [QUICK_START.md](./QUICK_START.md)**

---

**LingualRAG © 2026** - Multilingual AI-Powered RAG System

**Status**: ✅ Production Ready | **Last Updated**: May 2026 | **Version**: 1.0.0
