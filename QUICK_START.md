# LingualRAG - Quick Start Guide

## 🚀 Deploy to Vercel in 5 Minutes

### Prerequisites
- GitHub account with your code repository
- Vercel account (free at vercel.com)
- Backend API running (Node.js/Python)

### Step 1: Prepare Backend
Ensure your backend API is deployed and running at a public URL. It needs to implement all endpoints listed in the API section.

**Quick Vercel Backend Option:**
Deploy your backend to Render.com (offers free tier):
```bash
git push render main
# Set RENDER_DEPLOY_HOOK environment variable
```

### Step 2: Clone & Push to GitHub
```bash
# Clone this project
git clone <this-repo>

# Push to your GitHub repository
git remote add origin <your-github-repo>
git push -u origin main
```

### Step 3: Deploy to Vercel
**Option A: Via Vercel Dashboard**
1. Go to https://vercel.com/new
2. Click "Import Git Repository"
3. Select your GitHub repository
4. Vercel auto-detects Next.js framework
5. Click "Deploy"

**Option B: Via Vercel CLI**
```bash
npm i -g vercel
vercel --prod
```

### Step 4: Set Environment Variables
In Vercel Project Settings → Environment Variables, add:

```env
NEXT_PUBLIC_API_URL=https://your-backend.onrender.com
NEXT_PUBLIC_APP_NAME=LingualRAG
NEXT_PUBLIC_SENTRY_DSN=https://xxxxx@sentry.io/xxxxx
```

### Step 5: Deploy!
- Click "Deploy" in Vercel dashboard
- Wait 1-2 minutes for build to complete
- Visit your live URL!

---

## 🧪 Test the Application

### 1. Test Login Flow
- Go to `/login`
- Enter test email
- Request OTP (mocked in demo)
- Enter OTP (123456 for demo)
- Should redirect to `/chat`

### 2. Test Chat
- Type a message
- Wait for streaming response
- Check RTL detection works (try Arabic text)
- Click "Copy" to copy responses

### 3. Test Document Upload
- Go to `/documents`
- Drag and drop a PDF/DOC file
- Watch upload progress
- Check processing status

### 4. Test Admin Dashboard
- Go to `/admin`
- View real-time analytics
- Charts show language distribution
- Check system health metrics

### 5. Test Responsiveness
- Use DevTools (F12)
- Toggle device toolbar
- Test on mobile, tablet, desktop sizes
- Check hamburger menu appears < 1024px

### 6. Test Settings
- Go to `/settings`
- Change language preference
- Verify it persists
- Test password change form

---

## 📱 Responsive Design Verification

### Mobile (iPhone/Android)
```
Viewport: 375px × 812px
Features:
✓ Hamburger menu visible
✓ Text readable (no zoom needed)
✓ Buttons touch-friendly (44px+)
✓ Sidebar collapses
```

### Tablet (iPad)
```
Viewport: 768px × 1024px
Features:
✓ Sidebar shows on portrait
✓ Charts responsive
✓ Touch-optimized interface
✓ Full feature access
```

### Desktop
```
Viewport: 1920px × 1080px
Features:
✓ Full sidebar visible
✓ Optimal spacing
✓ Charts detailed
✓ All animations smooth
```

---

## 🎨 Customization

### Change Logo
Replace `/public/logo.png` with your logo (PNG, 1024x1024px recommended)

### Change Colors
Edit `/app/globals.css` color variables:
```css
:root {
  --primary: 79 70 229; /* Indigo to your brand color RGB */
  --accent: 14 165 233; /* Sky blue to your accent RGB */
}
```

### Change App Name
1. Update `NEXT_PUBLIC_APP_NAME` environment variable
2. Update metadata in `/app/layout.tsx`
3. Update Sidebar branding in `/components/Sidebar.tsx`

### Add Custom Domain
1. In Vercel: Project Settings → Domains
2. Add your domain
3. Update DNS records (shown in Vercel)
4. SSL auto-provisioned by Let's Encrypt

---

## 🔧 Local Development

### Setup
```bash
# Install dependencies
pnpm install

# Set environment variables
cp .env.local.example .env.local

# Start development server
pnpm dev
```

### Access Local App
```
http://localhost:3000
```

### Make Changes
- Edit files in `/app`, `/components`, `/hooks`
- Changes auto-refresh (HMR enabled)
- TypeScript errors shown in terminal
- Build failures prevent deployment

### Build Locally
```bash
pnpm build
pnpm start
```

---

## 🐛 Troubleshooting

### "API is unreachable"
- Check `NEXT_PUBLIC_API_URL` in environment variables
- Ensure backend is running and publicly accessible
- Check CORS headers on backend
- Verify network connectivity

### "OTP not working"
- In demo, use `123456` as OTP
- For production, backend must send real OTPs
- Check backend logs for issues
- Verify email configuration

### "Chat not streaming"
- Check EventSource support in browser
- Verify `/chat/stream` endpoint exists
- Check SSE headers in backend response
- Monitor browser console for errors

### "Responsive layout broken"
- Clear browser cache (Ctrl+Shift+Delete)
- Check mobile viewport settings
- Verify Tailwind classes are correct
- Test in Chrome DevTools device mode

### "Build fails on Vercel"
- Check environment variables are set
- Review Vercel build logs
- Verify TypeScript compilation
- Check for missing dependencies

### "Slow performance"
- Check Core Web Vitals in Vercel Analytics
- Verify images are optimized
- Check API response times
- Review browser DevTools Performance tab

---

## 📊 Analytics Setup

### Enable Vercel Analytics
1. Vercel Dashboard → Analytics
2. Install `@vercel/analytics`
3. Add to your layout:
```tsx
import { Analytics } from "@vercel/analytics/next";
```

### Enable Sentry Error Tracking
1. Create Sentry account (sentry.io)
2. Get your DSN
3. Add to environment: `NEXT_PUBLIC_SENTRY_DSN=https://...`
4. Errors auto-tracked!

---

## 🔐 Security Checklist

- [ ] Change logo (don't use v0)
- [ ] Set NEXT_PUBLIC_API_URL to your backend
- [ ] Configure Sentry DSN (or remove)
- [ ] Use strong password hash algorithm (bcrypt)
- [ ] Enable HTTPS (automatic on Vercel)
- [ ] Set security headers (configured)
- [ ] Test CORS settings
- [ ] Verify JWT secrets are strong
- [ ] Set rate limiting on backend
- [ ] Enable CSRF protection

---

## 📈 Scaling Tips

### For High Traffic
1. Enable Vercel's auto-scaling
2. Use Edge Functions for global distribution
3. Add Redis caching layer
4. Optimize database queries
5. Consider CDN for assets

### For Large Documents
1. Implement pagination in document list
2. Add search/filter capabilities
3. Stream large file uploads
4. Compress documents before upload
5. Use background jobs for processing

### For More Languages
1. Add language codes to constants
2. Update language selector UI
3. Add translations for UI strings
4. Consider i18n library (next-i18next)
5. Test RTL rendering thoroughly

---

## 🎓 Learn More

- **Next.js Docs**: https://nextjs.org
- **Vercel Deployment**: https://vercel.com/docs
- **Tailwind CSS**: https://tailwindcss.com
- **Framer Motion**: https://www.framer.com/motion
- **TypeScript**: https://www.typescriptlang.org

---

## 💡 Common Customizations

### Change Button Colors
```tsx
// In any component
<Button className="bg-orange-500 hover:bg-orange-600">
  Click me
</Button>
```

### Add New Page
```bash
# Create app/new-page/page.tsx
export default function NewPage() {
  return <div>New page content</div>
}
```

### Add New Component
```bash
# Create components/MyComponent.tsx
'use client';

export function MyComponent() {
  return <div>My component</div>
}
```

### Change Animations
```css
/* In globals.css */
@keyframes newAnimation {
  from { opacity: 0; }
  to { opacity: 1; }
}

.animate-custom {
  animation: newAnimation 0.3s ease-out;
}
```

---

## ✨ What's Included

✅ Production-grade Next.js 16 setup
✅ Full TypeScript support
✅ Professional UI with shadcn/ui
✅ Smooth animations (Framer Motion)
✅ Responsive design (mobile-first)
✅ Authentication system (JWT + OTP)
✅ Chat with streaming (SSE)
✅ Document management
✅ Admin analytics
✅ Error tracking (Sentry)
✅ Security headers configured
✅ SEO optimized
✅ Multilingual support
✅ RTL text detection

---

## 🚨 Important Notes

1. **Backend Required**: This is frontend only. You must have a backend API running.
2. **Not a Demo**: This is production code, not a demo/template.
3. **Customization**: Change logo, colors, and branding before deploying.
4. **Security**: Review security features and enable error tracking.
5. **Monitoring**: Set up Sentry and Vercel Analytics for production.

---

## 🎉 You're All Set!

Your LingualRAG application is now deployed and ready for use!

### Next Steps:
1. ✅ Deploy to Vercel
2. ✅ Connect your backend
3. ✅ Test all features
4. ✅ Set up monitoring
5. ✅ Customize branding
6. ✅ Enable analytics
7. ✅ Share with users!

---

**Need Help?**
- Check PROJECT_SUMMARY.md for detailed docs
- Review DEPLOYMENT.md for advanced setup
- Check code comments for implementation details
- Visit v0.app for component examples

**Happy coding! 🚀**
