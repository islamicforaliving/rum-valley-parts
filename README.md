# Rum Valley Parts - 48-Hour MVP Sprint

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ (LTS recommended)
- npm or yarn
- Supabase account (free tier works)
- Stripe account (test mode)

### Installation

```bash
# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Edit .env and add your credentials
# Get Supabase URL and anon key from: https://supabase.com/dashboard
# Get Stripe publishable key from: https://dashboard.stripe.com/test/apikeys
```

### Database Setup

1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Create a new project
3. Go to SQL Editor
4. Copy and run the contents of `database-schema.sql`

### Run Development Server

```bash
npm run dev
```

Visit http://localhost:5173

---

## 📋 48-Hour Sprint Status

### ✅ Completed (Hours 1-12)
- [x] Cart state management (Zustand + localStorage)
- [x] Cart page with item management
- [x] Checkout page with shipping/payment forms
- [x] Order confirmation page
- [x] Stripe integration skeleton
- [x] Supabase database schema
- [x] Product detail page with "Add to Cart"
- [x] Updated Header with cart badge
- [x] Environment configuration files
- [x] Project documentation

### ⏳ To Complete

#### Phase 2: Backend Integration (Hours 13-24)
- [ ] Create Supabase project
- [ ] Run database schema
- [ ] Connect auth.tsx to Supabase Auth
- [ ] Create real user signup/login flow
- [ ] Add email verification

#### Phase 3: Product Import (Hours 25-36)
- [ ] Scrape MVP Truck Parts catalog (2,000+ products)
- [ ] Import products to Supabase
- [ ] Optimize images (upload to Supabase Storage)
- [ ] Create bulk import script

#### Phase 4: Payment Integration (Hours 37-42)
- [ ] Set up Stripe account
- [ ] Create Stripe backend endpoint
- [ ] Implement checkout session creation
- [ ] Handle payment webhooks
- [ ] Test with Stripe test cards

#### Phase 5: Polish & Deploy (Hours 43-48)
- [ ] Final testing
- [ ] Deploy to Vercel
- [ ] Configure custom domain
- [ ] Set up SSL

---

## 🔧 Configuration

### Supabase Setup
1. Create project at https://supabase.com
2. Copy Project URL and anon key to `.env`
3. Run `database-schema.sql` in SQL Editor
4. Enable Email/Auth in Authentication settings

### Stripe Setup
1. Create account at https://stripe.com
2. Get publishable key from Dashboard → Developers → API keys
3. Add to `.env` as `VITE_STRIPE_PUBLISHABLE_KEY`
4. For production, set up webhook endpoint

### Environment Variables
```bash
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_key
```

---

## 📦 Product Catalog

Current: ~650 products (Rum Valley catalog)
Target: 2,000+ products (import from MVP Truck Parts)

---

## 🚀 Deployment

### Deploy to Vercel
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel
```

Set environment variables in Vercel Dashboard.

---

## 📱 Features

### ✅ Implemented
- Shopping cart with localStorage persistence
- Product search and filtering
- Member vs. public pricing
- Checkout flow (demo mode)
- Order confirmation page
- Responsive design
- Mobile-friendly interface

### ⏳ Coming Soon
- Real authentication (Supabase Auth)
- Real payments (Stripe integration)
- Order history per user
- Email notifications
- Admin dashboard

---

## 🐛 Troubleshooting

### Build errors
Make sure all dependencies are installed:
```bash
npm install
```

### Supabase connection errors
Verify your `.env` has correct credentials and the project is active.

### Cart not persisting
Check browser console for errors. Cart uses localStorage.

---

## 📞 Support

- **Email**: parts@rumvalley.com
- **Phone**: (734) 744-4091
- **Address**: 11902 Farmington Rd, Suite A, Livonia, MI 48150

---

**Built with React, TypeScript, Tailwind CSS, shadcn/ui, Supabase, and Stripe**

