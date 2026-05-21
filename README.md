# Citicap Capacitor â€” Business Website

Modern responsive website for **Citicap Capacitor**, a capacitor supplier for electronics and electrical products.

## Features

- **Home** â€” Hero banner, business intro, featured products, WhatsApp CTA
- **Products** â€” Card layout with search & category filter
- **About Us** â€” Company story and values
- **Contact** â€” Inquiry form + WhatsApp, phone, email
- **Admin** â€” Secure login, product CRUD, image upload, category management
- **WhatsApp** â€” Floating button + product inquiry links (`+918511131666`)

## Tech Stack

- Next.js 15 (App Router)
- React 19 + TypeScript
- Tailwind CSS 4
- Prisma + PostgreSQL (Supabase)
- NextAuth.js (JWT, credentials)

## Quick Start

```bash
# Install dependencies
npm install

# Setup database
npx prisma db push
npm run db:seed

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Admin Login

- URL: `/admin/login`
- Username: `admin`
- Password: `admin123`

Change credentials in `.env`:

```
ADMIN_USERNAME=your_username
ADMIN_PASSWORD=your_secure_password
```

## Project Structure

```
src/
  app/           # Pages & API routes
  components/    # UI components
  lib/           # Prisma, auth, constants
prisma/
  schema.prisma  # Database models
  seed.ts        # Sample products
public/
  logo.png       # Brand logo
  uploads/       # Admin uploaded images
```

## Sample Data

12 demo products across all 6 categories with placeholder images from Unsplash.

## Production (Supabase PostgreSQL)

1. Create a Supabase project and copy the database connection strings.
2. Update `.env`:

```
DATABASE_URL="postgresql://...:6543/postgres?pgbouncer=true&connection_limit=1"  # pooled
DIRECT_URL="postgresql://...:5432/postgres"                                    # direct (migrations)
```

3. Run migrations / sync schema:

```bash
npx prisma db push
npm run db:seed
```

4. Set a strong `NEXTAUTH_SECRET` in production.

## College Presentation Tips

1. Run `npm run dev` and show Home â†’ Products â†’ Contact flow
2. Demo WhatsApp button (opens chat with pre-filled message)
3. Login to Admin â†’ Add/Edit/Delete a product live
4. Show search and category filter on Products page
5. Mention stack: Next.js, Prisma, NextAuth, Tailwind

## License

Private â€” Citicap Capacitor business project.

"# citicap" 
