# Overview

This is an Arabic digital wallet application called "المحفظة الإلكترونية أموالي" (My Electronic Wallet) that supports multi-currency financial transactions. The application provides a comprehensive digital wallet solution for Arabic-speaking users, supporting three major currencies: Yemeni Rial (YER), Saudi Riyal (SAR), and US Dollar (USD). It features a modern React frontend with RTL (right-to-left) support, Express.js backend, and PostgreSQL database for secure financial data management.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture

The client is built using React with TypeScript and follows a modern component-based architecture:

- **UI Framework**: React 18 with TypeScript for type safety
- **Styling**: Tailwind CSS with shadcn/ui component library for consistent design
- **RTL Support**: Full Arabic language support with right-to-left layout
- **State Management**: TanStack Query for server state management and caching
- **Routing**: Wouter for lightweight client-side routing
- **Theme System**: Custom light/dark theme provider with CSS variables
- **Build Tool**: Vite for fast development and optimized production builds

The application uses a page-based routing structure with three main pages: Landing, Home, Transactions, and Profile. Components are organized using the shadcn/ui pattern with reusable UI components in the `components/ui` directory.

## Backend Architecture

The server follows an Express.js REST API pattern with TypeScript:

- **Framework**: Express.js with TypeScript for API endpoints
- **Authentication**: Replit Auth integration with OpenID Connect
- **Session Management**: PostgreSQL-backed sessions using connect-pg-simple
- **Database ORM**: Drizzle ORM for type-safe database operations
- **API Structure**: RESTful endpoints for wallets, transactions, and user management
- **Middleware**: Custom logging, error handling, and authentication middleware

The backend implements a storage abstraction pattern through the `IStorage` interface, allowing for flexible data access patterns while maintaining clean separation of concerns.

## Data Storage Solutions

**Primary Database**: PostgreSQL with Neon serverless hosting
- **ORM**: Drizzle ORM with schema-first approach
- **Migrations**: Drizzle Kit for database schema management
- **Connection**: Neon serverless with WebSocket support for edge deployments

**Database Schema**:
- `users`: User profiles with authentication data
- `wallets`: Multi-currency wallet management (YER, SAR, USD)
- `transactions`: Financial transaction history
- `notifications`: User notification system
- `services`: Available financial services
- `sessions`: Secure session storage for authentication

## Authentication and Authorization

**Authentication Provider**: Replit Auth with OpenID Connect
- **Session Management**: Secure server-side sessions stored in PostgreSQL
- **Authorization**: Route-level protection with middleware
- **User Management**: Automatic user creation and profile management
- **Security**: HTTPS-only cookies with secure session handling

The authentication system provides seamless integration with Replit's identity provider while maintaining user data in the application database for extended profile information.

## External Dependencies

**Payment Processing**:
- Stripe integration for card payments and international transactions
- PayPal SDK for alternative payment methods

**Database Hosting**:
- Neon Database for PostgreSQL hosting with serverless architecture
- Connect-pg-simple for PostgreSQL session storage

**UI and Styling**:
- Radix UI primitives for accessible component foundations
- Tailwind CSS for utility-first styling
- Lucide React for consistent iconography
- Google Fonts (Inter) for typography

**Development Tools**:
- Vite for build tooling and development server
- TypeScript for type safety across the stack
- Drizzle Kit for database schema management
- ESBuild for server-side bundling

**Third-party Services**:
- Replit Auth for user authentication
- Replit development tools for enhanced development experience
- WebSocket support for real-time features

The application is designed for deployment on Replit with optimized configurations for both development and production environments.