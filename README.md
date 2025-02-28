# Import Goods - Export Business Web Application

A comprehensive web application for an international export business that allows customers to import goods from various merchants around the world.

## Features

- **User Authentication**: Sign in, sign up, and social login options
- **Product Catalog**: Browse and search products from various merchants
- **Pre-Order System**: Request custom products not currently available
- **Admin Dashboard**: Manage orders, pre-orders, products, and customers

## Technology Stack

### Frontend
- Next.js 14 (App Router)
- React
- TypeScript
- Chakra UI (for styling and components)
- React Hook Form (form management)
- Zustand (state management)
- React Query (data fetching)

### Backend
- Supabase (authentication, database, storage)
- Next.js API routes for serverless functions

## Getting Started

First, install the dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Project Structure

- `src/app`: Next.js app router pages
- `src/components`: Reusable React components
- `src/lib`: Utility functions and configuration
- `src/types`: TypeScript type definitions

## Deployment

The application can be deployed on Vercel or any other hosting platform that supports Next.js applications.

## License

[MIT](https://choosealicense.com/licenses/mit/)
