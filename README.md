# Supabase Auth App

A Next.js application with Supabase authentication and user profiles.

## Features

- **Authentication**: Email/password signup and login via Supabase Auth
- **User Profiles**: Custom user profiles with first name, last name, and username
- **Database**: PostgreSQL with Row Level Security (RLS)
- **API Routes**: RESTful endpoints for auth and user management

## Database Schema

- `auth.users` - Supabase Auth (email, password, etc.)
- `public.user_profiles` - Custom profiles (first_name, last_name, username)

## Prerequisites

- Node.js 18+ 
- npm/yarn/pnpm
- [Supabase CLI](https://supabase.com/docs/guides/cli/getting-started)

## Setup

1. **Clone and install dependencies:**
   ```bash
   npm install
   ```

2. **Start Supabase locally:**
   ```bash
   supabase start
   ```

3. **Apply database migrations:**
   ```bash
   supabase db reset
   ```

4. **Copy environment variables:**
   ```bash
   cp .env.example .env.local
   ```
   Update `.env.local` with your Supabase credentials from `supabase status`

5. **Run the development server:**
   ```bash
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## API Endpoints

### POST /api/auth/signup
Create new user with profile:
```json
{
  "email": "user@example.com",
  "password": "password123",
  "firstName": "John",
  "lastName": "Doe",
  "username": "johndoe"
}
```

### POST /api/auth/login
Login existing user:
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

### GET /api/auth/user
Get current user with profile data (requires authentication).

### POST /api/auth/logout
Logout current user.



