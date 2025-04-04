Frontend:

Built in Lovable

Mobile-first UI

Users can log in, upload transaction files, view analytics, and chat with the AI assistant

Backend:

Node.js (via Cursor)

Express.js API to handle:

File upload & parsing (CSV or SMS)

Categorization logic (keywords + GPT fallback)

Supabase DB operations (store user data, transactions, categorization metadata)

AI endpoints for natural language queries

Data Storage:

Supabase for user data and transaction records

Supabase Auth for user authentication

AI Usage:

GPT model used for:

Transaction classification (when keyword rules fail)

Chat assistant to answer user queries in natural language

