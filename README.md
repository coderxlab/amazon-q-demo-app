## Demo Workflows for Developer
This repository contains demo workflows for Developer that showcase how to use AI tools to assist in various tasks such as pulling Jira Ticket, reading Figma Design, creating Implementation Plan & Todo List, excecuting the implementation step and review, and writing test cases

### Features
- **Demo Project Overview**: A Next.js application with Supabase authentication and user profiles.
- **AI-Assisted Development**: Code generation, architecture guidance, and implementation specifications
- **Document Templates**: Jira ticket templates, implementation specs, and todo lists
- **MCP Integration**: Jira and Figma

### Demo Project Overview
- The diagram below illustrates the workflow for the demo project, starting from reading the ticket on Jira to the feature implementation and testing.
  
![iScreen Shoter - Code - 250704094928](https://github.com/user-attachments/assets/e7c627fd-892c-4a90-9d13-e917639807e7)

### MCP Setup
- To run the MCP servers, you need to set up the following configurations in your `mcp.json` file. This file should be placed in the `.amazonq` directory of your project.

```json
{
  "mcpServers": {
    "supabase": {
        "command": "npx",
        "args": ["-y", "@modelcontextprotocol/server-postgres", "postgresql://postgres:postgres@127.0.0.1:54322/postgres"]
    },
    "Framelink Figma MCP": {
      "command": "npx",
      "args": ["-y", "figma-developer-mcp", "--figma-api-key=your-figma-api-key", "--stdio"]
    },
    "mcp-atlassian": {
      "command": "docker",
      "timeout": 60000,
      "args": [
        "run",
        "-i",
        "--rm",
        "-e",
        "CONFLUENCE_URL",
        "-e",
        "CONFLUENCE_USERNAME",
        "-e",
        "CONFLUENCE_API_TOKEN",
        "-e",
        "JIRA_URL",
        "-e",
        "JIRA_USERNAME",
        "-e",
        "JIRA_API_TOKEN",
        "ghcr.io/sooperset/mcp-atlassian:latest"
      ],
      "env": {
        "CONFLUENCE_URL": "https://your-confluence-instance.atlassian.net",
        "CONFLUENCE_USERNAME": "your-confluence-email",
        "CONFLUENCE_API_TOKEN": "your-confluence-api-token",
        "JIRA_URL": "https://your-jira-instance.atlassian.net", 
        "JIRA_USERNAME": "your-jira-email",
        "JIRA_API_TOKEN": "your-jira-api-token"      }
    }
  }
}
```

### Document Template
- The document templates for Confluenece documents / Jira tickets are located in the `.amazonq/templates` directory. You can customize these templates to fit your project requirements.

### Running the Demo Project
- To run the demo project, you need to have the MCP servers set up as described above. Once the MCP servers are running, you can execute the workflows using the AmazonQ IDE or the command line interface.

## Current Demo App Details & Setup Guide

App Name: **Supabase Auth App**

A Next.js application with Supabase authentication and user profiles.

### Features

- **Authentication**: Email/password signup and login via Supabase Auth
- **User Profiles**: Custom user profiles with first name, last name, and username
- **Database**: PostgreSQL with Row Level Security (RLS)
- **API Routes**: RESTful endpoints for auth and user management

### Database Schema

- `auth.users` - Supabase Auth (email, password, etc.)
- `public.user_profiles` - Custom profiles (first_name, last_name, username)

### Prerequisites

- Node.js 18+ 
- npm/yarn/pnpm
- [Supabase CLI](https://supabase.com/docs/guides/cli/getting-started)

### Setup

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

### API Endpoints

#### POST /api/auth/signup
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

#### POST /api/auth/login
Login existing user:
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

#### GET /api/auth/user
Get current user with profile data (requires authentication).

#### POST /api/auth/logout
Logout current user.



