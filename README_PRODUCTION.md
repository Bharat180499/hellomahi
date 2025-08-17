# HelloMahi - Production Ready Escorts Directory

A modern, production-ready escorts directory platform built with Next.js 14, TypeScript, and Supabase.

## 🚀 Quick Production Setup

### Prerequisites

- Node.js 18+
- Supabase account
- Vercel account (recommended)
- Stripe account
- Cloudinary account
- Resend account

### 1. Environment Setup

```bash
# Copy environment template
cp env.example .env.local

# Edit .env.local with your production credentials
```

### 2. Supabase Database Setup

```bash
# Install Supabase CLI
npm install -g supabase

# Login and link to your project
supabase login
supabase link --project-ref YOUR_PROJECT_ID

# Apply database schema
npm run supabase:db:push
```

### 3. Deploy to Production

```bash
# Deploy to Vercel (recommended)
npm run deploy:vercel

# Or deploy to Railway
npm run deploy:railway

# Or deploy to Netlify
npm run deploy:netlify
```

## 📋 Production Checklist

- [ ] Supabase project created and configured
- [ ] Database migrations applied
- [ ] Environment variables set
- [ ] External services configured (Stripe, Cloudinary, Resend)
- [ ] Domain configured
- [ ] SSL certificates valid
- [ ] Health check endpoint working
- [ ] Authentication flows tested
- [ ] Payment processing tested
- [ ] File uploads working
- [ ] Error tracking configured
- [ ] Monitoring set up

## 🔧 Available Scripts

### Development
```bash
npm run dev              # Start development server
npm run build            # Build for production
npm run start            # Start production server
npm run lint             # Run ESLint
npm run type-check       # Run TypeScript checks
```

### Testing
```bash
npm test                 # Run tests
npm run test:watch       # Run tests in watch mode
npm run test:coverage    # Run tests with coverage
```

### Deployment
```bash
npm run deploy:vercel    # Deploy to Vercel
npm run deploy:railway   # Deploy to Railway
npm run deploy:netlify   # Deploy to Netlify
```

### Supabase
```bash
npm run supabase:start   # Start local Supabase
npm run supabase:stop    # Stop local Supabase
npm run supabase:status  # Check Supabase status
npm run supabase:db:push # Push database changes
npm run supabase:db:reset # Reset local database
```

## 🏗️ Architecture

### Frontend
- **Next.js 14** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **Radix UI** for components
- **React Hook Form** for forms
- **Zod** for validation

### Backend
- **Supabase** for database and authentication
- **PostgreSQL** database
- **Row Level Security** for data protection
- **Real-time subscriptions** for live updates

### External Services
- **Stripe** for payments
- **Cloudinary** for image storage
- **Resend** for email delivery
- **Vercel** for hosting

## 🔒 Security Features

- Row Level Security (RLS) policies
- JWT authentication
- Input validation and sanitization
- CORS protection
- Rate limiting
- Environment variable protection

## 📊 Monitoring

### Health Check
Access `/api/health` to check application status.

### Performance
- Vercel Analytics
- Supabase monitoring
- Error tracking with Sentry

## 🚨 Troubleshooting

### Common Issues

1. **Database Connection Failed**
   ```bash
   npm run supabase:status
   npm run supabase:db:push
   ```

2. **Build Errors**
   ```bash
   rm -rf .next
   npm install
   npm run build
   ```

3. **Environment Variables**
   ```bash
   npm run type-check
   # Check for missing variables
   ```

## 📚 Documentation

- [Production Setup Guide](./PRODUCTION_SETUP_GUIDE.md)
- [Technical Architecture](./TECHNICAL_ARCHITECTURE.md)
- [Implementation Roadmap](./IMPLEMENTATION_ROADMAP.md)
- [Admin Panel Design](./ADMIN_PANEL_DESIGN.md)

## 🆘 Support

For production support:
1. Check the troubleshooting section
2. Review the production setup guide
3. Check Supabase and Vercel documentation
4. Create an issue in the repository

## 📄 License

This project is proprietary software. All rights reserved.

---

**Ready for Production! 🚀**

Your HelloMahi escorts directory platform is now configured for production deployment with Supabase as the database backend.
