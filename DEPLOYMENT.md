# LingualRAG - Vercel Deployment Guide

## Overview
LingualRAG is a production-ready, multilingual RAG (Retrieval-Augmented Generation) system with full responsive design support for mobile, tablet, desktop, and iPad devices.

## Pre-Deployment Setup

### 1. Environment Variables
Set the following environment variables in your Vercel project settings:

```env
NEXT_PUBLIC_API_URL=https://your-backend.onrender.com
NEXT_PUBLIC_APP_NAME=LingualRAG
NEXT_PUBLIC_SENTRY_DSN=https://xxxxx@sentry.io/xxxxx
```

### 2. Backend API
Ensure your backend API (Node.js/Python) is running at the URL specified in `NEXT_PUBLIC_API_URL` and implements these endpoints:

#### Authentication
- `POST /auth/send-otp` - Send OTP to email
- `POST /auth/login` - Login with OTP verification
- `POST /auth/signup` - Register new user with OTP
- `GET /auth/me` - Get current user profile
- `POST /auth/refresh` - Refresh authentication token

#### Chat
- `POST /chat/message` - Send a message (returns streaming SSE)
- `GET /chat/stream?sessionId=X&message=Y` - Stream chat response (EventSource)
- `GET /sessions/{sessionId}/messages` - Get conversation history
- `POST /sessions` - Create new session
- `DELETE /messages/{messageId}` - Delete message

#### Documents
- `POST /documents/upload` - Upload document (multipart/form-data)
- `GET /documents` - List uploaded documents
- `GET /documents/{docId}/status` - Check processing status
- `DELETE /documents/{docId}` - Delete document
- `GET /documents/search?q=query` - Search documents

#### Admin
- `GET /admin/analytics` - Get analytics data
- `GET /admin/users` - List all users
- `DELETE /admin/users/{userId}` - Delete user
- `GET /admin/users/{userId}/stats` - User statistics

#### Settings
- `PUT /settings/profile` - Update user profile
- `POST /settings/change-password` - Change password
- `GET /settings/preferences` - Get user preferences
- `PUT /settings/preferences` - Update preferences

## Deployment Steps

### Option 1: Deploy via Vercel CLI (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy to production
vercel --prod

# Set environment variables when prompted
# - NEXT_PUBLIC_API_URL
# - NEXT_PUBLIC_APP_NAME  
# - NEXT_PUBLIC_SENTRY_DSN
```

### Option 2: Deploy via GitHub

1. Push code to GitHub repository
2. Connect repository to Vercel project
3. Vercel will automatically deploy on push
4. Set environment variables in Vercel Project Settings > Environment Variables

### Option 3: Deploy via Vercel UI

1. Go to [https://vercel.com/new](https://vercel.com/new)
2. Import your GitHub repository
3. Configure project with settings from `vercel.json`
4. Set environment variables
5. Click "Deploy"

## Performance Optimizations

### Already Implemented
- ✅ Image optimization with Next.js Image component
- ✅ Automatic code splitting
- ✅ CSS minification and optimization
- ✅ Compression of assets
- ✅ Security headers (X-Content-Type-Options, X-Frame-Options, etc.)
- ✅ RTL text detection and support
- ✅ Streaming SSE for real-time chat
- ✅ Lazy loading of components
- ✅ Framer Motion animations optimized
- ✅ Production source maps disabled

### Browser Support
- Chrome/Edge: Latest 2 versions
- Firefox: Latest 2 versions
- Safari: Latest 2 versions
- Mobile browsers: iOS 12+, Android 6+

## Responsive Design

### Breakpoints Supported
- **Mobile**: 0px - 639px (Portrait phones)
- **Tablet**: 640px - 1023px (Landscape phones, tablets)
- **Desktop**: 1024px - 1919px (Laptops, small desktops)
- **Large**: 1920px+ (Large monitors)
- **iPad**: 768px - 1024px (Portrait), 1024px - 1366px (Landscape)

### Mobile Features
- Hamburger menu navigation (< 1024px)
- Touch-optimized buttons (44px minimum)
- Responsive typography (fluid scaling)
- Optimized image sizes per device
- Proper viewport meta tags

## Animation & Performance

### Animations Used
- Page transitions: Fade, slide, scale effects
- Component animations: Bounce, pulse, glow effects
- Smooth transitions: 150ms easing
- Optimized with Framer Motion for 60fps

### Performance Targets
- Largest Contentful Paint (LCP): < 2.5s
- First Input Delay (FID): < 100ms
- Cumulative Layout Shift (CLS): < 0.1
- Time to First Byte (TTFB): < 600ms

## Security Features

### Implemented
- ✅ HTTPS only in production
- ✅ Secure HTTP-only cookies for auth tokens
- ✅ CSRF protection via SameSite cookies
- ✅ Input validation and sanitization
- ✅ XSS prevention (CSP headers)
- ✅ SQL injection prevention (parameterized queries)
- ✅ Environment variable protection
- ✅ API error handling without exposing internals
- ✅ Rate limiting ready (via backend)
- ✅ JWT token refresh flow

## Error Tracking

### Sentry Integration
All errors are automatically captured and reported to Sentry if `NEXT_PUBLIC_SENTRY_DSN` is configured.

- Client-side errors automatically captured
- Source maps available in staging
- Performance monitoring enabled
- Custom breadcrumbs for debugging

## Monitoring

### Metrics to Monitor
1. **Performance**: Core Web Vitals dashboard on Vercel
2. **Errors**: Sentry dashboard for error tracking
3. **Analytics**: Next.js Analytics (if enabled)
4. **Logs**: Check Vercel deployment logs

## Rollback

If issues occur after deployment:

```bash
# Rollback to previous version
vercel rollback

# Or from Vercel Dashboard: Deployments > Select previous > Promote
```

## Post-Deployment Checklist

- [ ] Environment variables configured in Vercel
- [ ] Backend API is accessible and working
- [ ] Test login/signup flow
- [ ] Test chat functionality with streaming
- [ ] Test document upload
- [ ] Verify analytics dashboard
- [ ] Test on mobile, tablet, and desktop browsers
- [ ] Check Core Web Vitals in Vercel Analytics
- [ ] Monitor Sentry for errors
- [ ] Verify custom domain DNS settings (if using custom domain)
- [ ] Set up SSL/TLS (automatic with Vercel)
- [ ] Configure monitoring and alerts

## Custom Domain Setup

1. In Vercel Dashboard: Project Settings > Domains
2. Add your custom domain
3. Update DNS records as instructed
4. SSL certificate auto-provisioned via Let's Encrypt

## Support

For issues or questions:
1. Check Vercel deployment logs
2. Monitor Sentry for errors
3. Review backend API logs
4. Check browser console for client-side errors

## License

LingualRAG © 2026 - All Rights Reserved
