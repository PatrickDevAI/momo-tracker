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

## License

ISC

## Contact

For any questions or suggestions, please open an issue in the repository. 