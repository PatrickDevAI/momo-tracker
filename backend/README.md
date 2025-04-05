# MoMo Tracker

A personal finance web application for the Rwandan market that tracks Mobile Money transactions. Users can upload their MoMo statements (CSV/SMS export), get categorized spending insights, and query their data using a built-in AI chat assistant. The app also includes a dashboard with charts showing spending behavior over time.

## Features

- Upload and parse MoMo transaction files (CSV format)
- Automatic categorization of expenses (rule-based + GPT fallback)
- Secure per-user data storage with Supabase
- Analytics dashboard with spending insights
- Natural language query system (AI chat assistant)

## Tech Stack

- Frontend: Lovable
- Backend: Node.js with Express
- Database & Auth: Supabase
- AI: GPT for categorization and chat assistant

## Project Structure

```
src/
├── api/
│   ├── controllers/   # Request handlers
│   ├── middleware/    # Custom middleware
│   ├── models/        # Database models
│   └── routes/        # API routes
├── config/            # Application configuration
└── utils/             # Utility functions
```

## Setup Instructions

### Prerequisites

- Node.js (v14+)
- Supabase account

### Environment Setup

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env` file at the root with:
   ```
   PORT=3000
   NODE_ENV=development
   SUPABASE_URL=your_supabase_url
   SUPABASE_KEY=your_supabase_anon_key
   TEMP_UPLOAD_DIR=./temp
   MAX_FILE_SIZE=10485760
   ```
4. Set up Supabase database using the SQL in `src/api/models/schema.js`

### Development

Run the development server:

```
npm run dev
```

### Production

Build and start the production server:

```
npm start
```

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile (authenticated)

More endpoints will be added as development continues.

## Authentication Implementation

### Overview

MoMo Tracker uses Supabase for authentication and database services. The authentication flow is implemented in both the frontend (Lovable) and backend (Node.js/Express).

### Authentication Architecture

```
┌─────────────┐       ┌─────────────┐       ┌─────────────────┐
│             │       │             │       │                 │
│   Lovable   │──────▶│  Express    │──────▶│    Supabase     │
│  Frontend   │◀──────│  Backend    │◀──────│ Auth & Database │
│             │       │             │       │                 │
└─────────────┘       └─────────────┘       └─────────────────┘
```

- **Frontend**: Uses Lovable's built-in Supabase client for direct auth operations
- **Backend**: Provides RESTful API endpoints that interact with Supabase Auth
- **Token-based**: JWT tokens passed between client and server

### API Endpoints

#### Public Endpoints

- **POST /api/auth/register**
  - Registers a new user
  - Creates an entry in the profiles table
  - Note: Email verification required by default

- **POST /api/auth/login**
  - Authenticates a user
  - Returns user data and session token

#### Protected Endpoints (require auth token)

- **GET /api/auth/profile**
  - Gets the current user's profile data

- **PUT /api/auth/profile**
  - Updates user profile data

- **POST /api/auth/logout**
  - Invalidates the current session token

### Authentication Middleware

The system includes an auth middleware (`verifyToken`) that:
1. Extracts the JWT token from the Authorization header
2. Verifies the token with Supabase
3. Attaches the user data to the request object
4. Rejects unauthorized requests

### Profile Management

User profiles are stored in the `profiles` table, which extends the built-in Supabase auth users:

- The schema includes: name, avatar_url, preferences (JSON), and timestamps
- Profile entries are automatically created on registration
- Last login time is tracked for user activity monitoring

### Security

- **Row Level Security (RLS)**: Configured on all database tables
- **JWT Validation**: Tokens are validated on every protected API request
- **HTTPS**: All API traffic should use HTTPS in production

### Testing

Use these test scripts to verify the authentication flow:

- `test-register.js`: Tests user registration
- `test-login.js`: Tests user login
- `test-api-connection.js`: Tests basic API connectivity

### Email Verification

By default, Supabase requires email verification. For testing:

1. Register a user through the API
2. Access Supabase dashboard to manually verify emails
3. Alternatively, configure Supabase to disable email verification for development

## License

ISC

## Contact

For any questions or suggestions, please open an issue in the repository. 