# HelloMahi Production Setup Guide

This guide will walk you through setting up the HelloMahi escorts directory platform for production deployment with Supabase as the database.

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ installed
- Git installed
- Supabase account
- Vercel account (recommended for hosting)
- Stripe account (for payments)
- Cloudinary account (for image storage)
- Resend account (for emails)

### 1. Clone and Setup Project

```bash
# Clone the repository
git clone <your-repo-url>
cd hellomahi

# Install dependencies
npm install

# Copy environment template
cp env.example .env.local
```

### 2. Supabase Setup

#### Create Supabase Project

1. Go to [supabase.com](https://supabase.com) and create a new account
2. Create a new project
3. Note down your project URL and API keys

#### Configure Environment Variables

Edit your `.env.local` file and add your Supabase credentials:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

#### Run Database Migrations

```bash
# Install Supabase CLI
npm install -g supabase

# Login to Supabase
supabase login

# Link to your project
supabase link --project-ref your-project-id

# Push the database schema
supabase db push
```

### 3. Configure External Services

#### Stripe Setup

1. Create a Stripe account at [stripe.com](https://stripe.com)
2. Get your API keys from the dashboard
3. Add to `.env.local`:

```env
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

#### Cloudinary Setup

1. Create a Cloudinary account at [cloudinary.com](https://cloudinary.com)
2. Get your credentials from the dashboard
3. Add to `.env.local`:

```env
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

#### Resend Setup

1. Create a Resend account at [resend.com](https://resend.com)
2. Get your API key
3. Add to `.env.local`:

```env
RESEND_API_KEY=your-resend-api-key
FROM_EMAIL=noreply@yourdomain.com
```

### 4. Authentication Setup

#### NextAuth.js Configuration

Generate a secure secret for NextAuth:

```bash
# Generate a random secret
openssl rand -base64 32
```

Add to `.env.local`:

```env
NEXTAUTH_SECRET=your-generated-secret
NEXTAUTH_URL=http://localhost:3000
```

### 5. Local Development

```bash
# Start the development server
npm run dev

# The application will be available at http://localhost:3000
```

## 🏗️ Production Deployment

### Option 1: Vercel (Recommended)

#### Setup Vercel

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy to Vercel:
```bash
# Login to Vercel
vercel login

# Deploy
vercel --prod
```

3. Configure environment variables in Vercel dashboard

#### Automated Deployment

Use the provided deployment script:

```bash
# Make the script executable
chmod +x scripts/deploy-production.sh

# Deploy to Vercel
./scripts/deploy-production.sh vercel
```

### Option 2: Railway

1. Install Railway CLI:
```bash
npm i -g @railway/cli
```

2. Deploy:
```bash
railway login
railway init
railway up
```

### Option 3: Netlify

1. Install Netlify CLI:
```bash
npm i -g netlify-cli
```

2. Deploy:
```bash
netlify deploy --prod
```

## 🔧 Database Management

### Supabase Dashboard

Access your Supabase dashboard at `https://app.supabase.com` to:

- View and manage data
- Monitor performance
- Configure authentication
- Set up storage buckets
- Manage API keys

### Database Migrations

```bash
# Create a new migration
supabase migration new migration_name

# Apply migrations
supabase db push

# Reset database (development only)
supabase db reset
```

### Storage Setup

Create storage buckets in Supabase:

```sql
-- Create buckets for different file types
INSERT INTO storage.buckets (id, name, public) VALUES 
('avatars', 'avatars', true),
('escort-photos', 'escort-photos', true),
('verification-docs', 'verification-docs', false);
```

## 🔒 Security Configuration

### Row Level Security (RLS)

The database schema includes RLS policies. Review and customize them in Supabase:

```sql
-- Example: Allow users to view only their own data
CREATE POLICY "Users can view own profile" 
ON users FOR SELECT 
USING (auth.uid() = id);
```

### Environment Variables Security

- Never commit `.env.local` to version control
- Use environment variables in production platforms
- Rotate API keys regularly
- Use different keys for development and production

### CORS Configuration

Configure CORS in Supabase dashboard:

1. Go to Settings > API
2. Add your domain to allowed origins
3. Configure CORS headers as needed

## 📊 Monitoring and Analytics

### Vercel Analytics

Enable Vercel Analytics in your project:

```bash
# Install Vercel Analytics
npm install @vercel/analytics
```

### Error Tracking

Set up Sentry for error tracking:

```env
NEXT_PUBLIC_SENTRY_DSN=your-sentry-dsn
```

### Performance Monitoring

- Use Vercel's built-in performance monitoring
- Set up Supabase monitoring in the dashboard
- Configure alerts for critical metrics

## 🧪 Testing

### Run Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### E2E Testing

```bash
# Install Playwright
npm install -D @playwright/test

# Run E2E tests
npx playwright test
```

## 🔄 CI/CD Pipeline

### GitHub Actions

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build
      - run: npm run test
      - uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
```

## 📈 Performance Optimization

### Image Optimization

- Use Next.js Image component
- Configure Cloudinary transformations
- Implement lazy loading

### Database Optimization

- Add appropriate indexes
- Use connection pooling
- Implement caching strategies

### Code Splitting

- Use dynamic imports
- Implement route-based code splitting
- Optimize bundle size

## 🚨 Troubleshooting

### Common Issues

#### Database Connection Issues

```bash
# Check Supabase connection
supabase status

# Reset local development
supabase db reset
```

#### Build Errors

```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

#### Environment Variables

```bash
# Verify environment variables
npm run build

# Check for missing variables
grep -r "process.env" src/
```

### Support

- Check the [Supabase documentation](https://supabase.com/docs)
- Review [Next.js deployment guide](https://nextjs.org/docs/deployment)
- Consult the [Vercel documentation](https://vercel.com/docs)

## 📋 Production Checklist

Before going live, ensure:

- [ ] All environment variables are configured
- [ ] Database migrations are applied
- [ ] SSL certificates are valid
- [ ] Domain is configured
- [ ] Email service is working
- [ ] Payment processing is tested
- [ ] File uploads are working
- [ ] Authentication flows are tested
- [ ] Error tracking is configured
- [ ] Monitoring is set up
- [ ] Backup strategy is in place
- [ ] Security policies are reviewed
- [ ] Performance is optimized
- [ ] SEO is configured
- [ ] Legal pages are in place
- [ ] Privacy policy is updated

## 🎯 Next Steps

After production deployment:

1. **Monitor Performance**: Use Vercel Analytics and Supabase monitoring
2. **User Feedback**: Implement feedback collection
3. **Feature Iteration**: Plan and implement new features
4. **Scaling**: Monitor usage and scale as needed
5. **Security Audits**: Regular security reviews
6. **Backup Strategy**: Implement automated backups
7. **Documentation**: Keep documentation updated

## 📞 Support

For additional support:

- Create issues in the GitHub repository
- Check the documentation in the `/docs` folder
- Review the technical architecture document
- Consult the implementation roadmap

---

**Happy Deploying! 🚀**

Your HelloMahi escorts directory platform is now ready for production use with Supabase as the database backend.
