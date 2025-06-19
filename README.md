# Elegance - Women's Fashion & Accessories E-Commerce

A modern, feature-rich e-commerce frontend for a women's clothing and accessories brand, built with Next.js 14, Tailwind CSS, and Redux Toolkit.

## 🚀 Features

- **Modern Design**: Clean, elegant, and responsive design that works across all devices
- **Performance Optimized**: Built with Next.js App Router for fast page loads and SEO
- **Seamless Shopping Experience**: Intuitive product browsing, filtering, and checkout flow
- **Advanced Cart System**: Persistent cart with localStorage and user account syncing
- **User Authentication**: Secure login/signup with NextAuth.js supporting multiple providers
- **Payment Integration**: Support for Stripe and PayPal payment methods
- **Account Management**: Order history, saved addresses, wishlist, and profile settings
- **Seller Hub**: Platform for vendors to sell their products

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS + PostCSS
- **State Management**: Redux Toolkit + RTK Query
- **Forms**: React Hook Form + Zod validation
- **Authentication**: NextAuth.js with JWT
- **Payment Processing**: Stripe Checkout + PayPal SDK
- **UI Components**: Custom component library with Headless UI and Framer Motion
- **Testing**: Jest, React Testing Library, Cypress for E2E

## 📂 Project Structure

```
/src
  /app                 - Next.js App Router pages
  /components
    /ui                - Low-level UI components
    /product           - Product-related components
    /cart              - Shopping cart components
    /checkout          - Checkout flow components
    /account           - User account components
  /hooks               - Custom React hooks
  /lib                 - Utilities and API clients
  /store               - Redux store configuration
    /api               - RTK Query API definitions
    /slices            - Redux slices for state management
  /styles              - Global styles and Tailwind config
  /types               - TypeScript type definitions
  /utils               - Helper functions
```

## 🔧 Setup & Installation

### Prerequisites

- Node.js 18+ and npm/yarn
- Git

### Installation Steps

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/e-shop.git
   cd e-shop
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment Variables**
   Create a `.env.local` file in the root directory with the following variables:

   ```
   # App
   NEXT_PUBLIC_API_URL=http://localhost:3000/api

   # Auth
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your-secret-key

   # Google Auth Provider
   GOOGLE_CLIENT_ID=your-google-client-id
   GOOGLE_CLIENT_SECRET=your-google-client-secret

   # Stripe
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your-stripe-publishable-key
   STRIPE_SECRET_KEY=your-stripe-secret-key
   ```

4. **Start the development server**

   ```bash
   npm run dev
   ```

5. **Build for production**
   ```bash
   npm run build
   npm start
   ```

## 🧪 Testing

- **Run unit tests**

  ```bash
  npm test
  ```

- **Run E2E tests**
  ```bash
  npm run cypress
  ```

## 🚢 Deployment

The application is configured for easy deployment to Vercel:

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Configure the environment variables
4. Deploy!

## 📱 Responsive Design

The application is fully responsive and optimized for:

- Mobile phones (portrait and landscape)
- Tablets
- Desktops
- Large screens

## 🔐 Authentication

User authentication is handled via NextAuth.js with multiple providers:

- Email/Password
- Google OAuth
- JWT tokens for session management

## 📦 State Management

Redux Toolkit is used for global state management with:

- Cart state: items, totals, shipping, etc.
- User state: authentication, preferences
- UI state: modals, filters, sorting options

## 🎨 Styling System

The application uses a cohesive design system with:

- Custom color palette based on the brand identity
- Consistent spacing, typography, and component styling
- Tailwind CSS for utility-first styling
- CSS variables for theme customization

## 🛒 Shopping Features

- Product filtering and sorting
- Wishlist functionality
- Cart persistence
- Checkout flow
- Order tracking
- User reviews

## 👨‍💻 Development

- ESLint and Prettier for code quality
- TypeScript for type safety
- GitHub Actions for CI/CD
- Automated testing

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
