# MoMo Tracker - Project Roadmap

## 1. High-Level Milestones

| Milestone | Description | Timeline |
|-----------|-------------|----------|
| **Foundation Setup** | Project setup, Supabase integration, auth flow | Days 1-2 |
| **Core Data Flow** | File upload, parsing, storing transactions | Days 2-4 |
| **Intelligence Layer** | Categorization engine, data processing | Days 4-6 |
| **Analytics & UI** | Dashboard, charts, data visualization | Days 6-8 |
| **AI Assistant** | Natural language query system | Days 8-9 |
| **Polishing & Launch** | Testing, bug fixes, deployment | Days 9-10 |

## 2. Key Features (Prioritized)

1. **User Authentication** - Supabase auth integration
2. **Transaction Import** - CSV upload and parsing
3. **Auto-categorization** - Rule-based + GPT fallback
4. **Transaction Storage** - Secure, per-user data storage
5. **Analytics Dashboard** - Visual spending insights
6. **Chat Assistant** - Natural language queries

## 3. Development Tasks

### Phase 1: Foundation Setup (Days 1-2)

- [ ] **Project Initialization**
  - [ ] Set up Node.js/Express backend project
  - [ ] Configure environment variables and config files
  - [ ] Set up development environment

- [ ] **Supabase Integration**
  - [ ] Set up Supabase project
  - [ ] Design database schema (users, transactions, categories)
  - [ ] Create initial tables and relationships
  - [ ] Setup Row Level Security policies

- [ ] **Authentication Flow**
  - [ ] Implement Supabase Auth in backend
  - [ ] Create authentication API endpoints
  - [ ] Configure Lovable frontend for auth

### Phase 2: Core Data Flow (Days 2-4)

Phase 2: Core Data Flow (SMS-Based Parsing) (Days 2–4)
📁 File Upload / Input System
 Implement a secure text input form (textarea) for users to paste SMS messages.

 Allow optional .txt file uploads for bulk import.

 Add clear user instructions for copying MoMo SMS from their phone.

 Authenticate uploads and associate input with the logged-in user.

 Store raw input securely for parsing and reference.

🧠 SMS Parser Engine (Multilingual & Fault-Tolerant)
 Build a robust, regex-based parser for MoMo SMS in both English and Kinyarwanda.

 Identify and extract:

Date/Time

Amount

Transaction Type (Send, Receive, Buy, Pay, Fee, etc.)

Sender/Recipient (best effort)

Balance (if included)

Transaction ID (if present)

 Handle multiple message formats and inconsistent structure.

 Gracefully skip or log unparseable lines.

 Store the original SMS line as raw_text for each transaction.

 Add strong test coverage to validate parser accuracy and handle edge cases.

🗃️ Transaction Storage
 Create a Transaction model linked to the user.

 Store all parsed transaction fields plus raw_text.

 Add de-duplication logic using a fuzzy match on Date, Amount, Type, and Balance.

 Build an API endpoint to fetch stored transactions per user.

🧩 Categorization System (Hybrid)
 Implement basic keyword-based categorization rules (e.g., "Bundles" → Airtime).

 Set default category to “Uncategorized” if rules fail.

 Create UI for manual categorization with editable categories.

 Allow users to create custom categories.

 Implement “Remember this rule?” prompt for repeated transactions (e.g., "Always tag 'Alice' as 'Rent'").

 Store these rules in the backend for future auto-categorization.

🧠 Notes & Caveats:
SMS is the only reliable source, so parser flexibility is mission-critical.

User involvement in categorization is not optional — the app must make this intuitive and efficient.

Supabase is fully integrated — all storage, auth, and user data will continue flowing through it.

### Phase 3: Intelligence Layer (Days 4-6)

- [ ] **Categorization Engine**
  - [ ] Define standard spending categories for Rwanda
  - [ ] Implement keyword-based categorization rules
  - [ ] Build GPT integration for fallback categorization
  - [ ] Create user category override system

- [ ] **Data Processing**
  - [ ] Build aggregation functions for reports
  - [ ] Create data transformation utilities
  - [ ] Implement metadata extraction from descriptions

### Phase 4: Analytics & UI (Days 6-8)

- [ ] **Dashboard Components**
  - [ ] Design main dashboard layout in Lovable
  - [ ] Create transaction list view
  - [ ] Implement category filters and search

- [ ] **Data Visualization**
  - [ ] Implement spending by category chart
  - [ ] Create time-series expense tracking
  - [ ] Build monthly spending comparisons

### Phase 5: AI Assistant (Days 8-9)

- [ ] **Natural Language Query System**
  - [ ] Design prompt engineering for GPT
  - [ ] Create query parsing and intent detection
  - [ ] Build response formatter for financial data
  - [ ] Implement chat interface in frontend

### Phase 6: Polishing & Launch (Days 9-10)

- [ ] **Testing**
  - [ ] End-to-end testing of core flows
  - [ ] Security review and testing
  - [ ] Performance optimization

- [ ] **Deployment**
  - [ ] Prepare production environment
  - [ ] Configure CI/CD pipeline
  - [ ] Deploy MVP version

## 4. Success Metrics

| Feature | Success Metrics |
|---------|----------------|
| **Authentication** | Users can sign up, log in, and maintain session |
| **Transaction Import** | 95%+ parsing accuracy for standard MoMo CSV format |
| **Categorization** | 80%+ auto-categorization accuracy |
| **Analytics** | All core metrics display correctly with real user data |
| **Chat Assistant** | Successfully answers 10 common financial queries |
| **Overall System** | Handles 100 transactions per user with <2s response time |

## 5. Dependencies

1. **Supabase Account Setup**
   - Create project and get API keys
   - Define schema before building backend storage features

2. **MoMo CSV Format Analysis**
   - Obtain sample statements to validate parser design
   - Identify all possible transaction types and formats

3. **GPT API Access**
   - Secure API key and set up rate limiting
   - Design effective prompts for categorization

4. **Lovable UI Components**
   - Ensure all needed components exist or can be built
   - Design mobile-first layouts before implementation

## 6. Testing Plan

### Unit Testing
- Backend route handlers and middleware
- CSV parsing logic
- Categorization algorithms

### Integration Testing
- File upload to database workflow
- Auth flow integration with Supabase
- GPT categorization fallback system

### End-to-End Testing
- User registration through to dashboard view
- Complete transaction import and categorization flow
- Natural language query to response cycle

### Manual Testing
- Cross-browser compatibility
- Mobile responsiveness
- Error handling with invalid inputs

## 7. Launch Plan

### Pre-Launch
- Deploy to staging environment
- Conduct final security review
- Prepare user documentation

### Soft Launch
- Invite 5-10 test users
- Collect feedback on core functionality
- Fix critical issues

### Public Launch
- Deploy to production
- Implement basic analytics to track usage
- Set up feedback collection mechanism

### Post-Launch
- Monitor system performance
- Collect user feedback for next iteration
- Prioritize bugs and enhancement requests

## 8. Future Expansion (Post-MVP)

- SMS integration for direct MoMo message parsing
- Machine learning for improved categorization
- Budget setting and tracking
- Financial goal planning
- Alerts and notifications for spending patterns 