# Rum Valley Parts - Deployment & Setup Guide

## Quick Links
- **Live Preview:** https://rum-valley-parts.vercel.app
- **Support:** parts@rumvalley.com | (734) 744-4091

---

## Step 1: Deploy to Vercel (Live Website)

### One-Click Deploy
1. Go to https://vercel.com/new
2. Click "Continue with GitHub"
3. Select your repository
4. Click "Deploy"
5. Site will be live at: https://rum-valley-parts.vercel.app

---

## Step 2: Create GitHub Repository

1. Go to https://github.com/new
2. Repository name: `rum-valley-parts`
3. Make it **Public** or **Private**
4. Click "Create repository"

### Push Your Code
```bash
cd rum-valley-parts
git remote add origin https://github.com/YOUR_USERNAME/rum-valley-parts.git
git push -u origin master
```

---

## Step 3: Set Up Supabase (Database & Auth)

### Create Project
1. Go to https://supabase.com/dashboard
2. Click "New Project"
3. Fill in:
   - Name: `rum-valley-parts`
   - Database Password: (create strong password - save it!)
   - Region: US East (recommended)
4. Click "Create new project" (wait 2-3 minutes)

### Run Database Schema
1. Click "SQL Editor" in left sidebar
2. Copy contents of `database-schema.sql` from your project
3. Paste and click "Run"
4. This creates tables: profiles, products, orders, order_items

### Get Your Credentials
1. Go to Settings (gear icon) → API
2. Copy:
   - **Project URL:** `https://xxxxx.supabase.co`
   - **anon/public key:** `eyJhbGciOiJIUzI1NiIs...`
3. Add to `.env` file and Vercel environment variables

### Enable Email Auth
1. Go to Authentication → Providers
2. Enable "Email"
3. (Optional) Disable email confirmation for testing

---

## Step 4: Set Up Stripe (Payments)

### Create Account
1. Go to https://dashboard.stripe.com/register
2. Sign up with business email
3. Complete identity verification
4. Add bank account for payouts

### Get API Keys
1. Go to Developers → API keys
2. Copy **Publishable key** (starts with `pk_test_`)
3. Add to `.env` as `VITE_STRIPE_PUBLISHABLE_KEY`
4. Also add to Vercel environment variables

### Test Cards
- Success: `4242 4242 4242 4242`
- Decline: `4000 0000 0000 0002`
- Any future expiry, any 3-digit CVC

---

## Step 5: Configure Environment Variables

### Local (.env file)
```bash
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your-stripe-key-here
```

### Vercel Dashboard
Go to: Your Project → Settings → Environment Variables
Add the same three variables.

---

## Step 6: Testing

### Full Flow Test
1. Browse catalog → Add items to cart
2. Go to cart → Proceed to checkout
3. Fill shipping info (test data ok)
4. Use test card: `4242 4242 4242 4242`
5. Complete order → See confirmation

### User Accounts
1. Go to /signup
2. Create test account
3. Login and verify member pricing
4. Check /dashboard for profile

---

## Step 7: Go Live

### Switch to Production
1. Update Stripe key to **live** key (`pk_live_...`)
2. Update Vercel environment variable
3. Redeploy: `npx vercel --prod`

### Custom Domain (Optional)
1. Vercel Dashboard → Settings → Domains
2. Add your domain (e.g., `parts.rumvalley.com`)
3. Update DNS records
4. SSL auto-provisioned

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Site not loading | Check Vercel deployments tab for errors |
| Cart not working | Clear browser cache, check console |
| Payments failing | Verify Stripe keys, check webhook endpoint |
| Database errors | Verify SQL schema was run, check RLS policies |

---

## Features Included

### Working Now
- Product catalog (650+ parts)
- Shopping cart (persists between sessions)
- Checkout flow with shipping calculation
- Member vs. public pricing
- Product search and filtering
- Mobile-responsive design
- Order confirmation page

### Needs Configuration
- User authentication (requires Supabase setup)
- Real payments (requires Stripe connection)
- Order history (requires database)
- Email notifications (requires email service)

---

## Next Steps

1. Import full catalog from MVP Truck Parts (2,000+ products)
2. Set up email notifications for orders
3. Add admin dashboard for order management
4. Implement inventory sync with suppliers
5. Add EDI integration for fleet customers

---

**Built with:** React, TypeScript, Tailwind CSS, shadcn/ui, Supabase, Stripe
