# InterviewMate AI

InterviewMate AI provides **AI-powered problem explanations**, **progressive hints**, **solution approaches**, **mock interviews**, **interview evaluation**, and **interview history** — all through a **Chrome Side Panel** without leaving your coding environment.

**Chrome Extension:** Coming soon on Chrome Web Store  
**Backend:** Deployed on backend  
**Repository:** [https://github.com/humera2211/InterviewMate-AI](https://github.com/humera2211/InterviewMate-AI)

---

## Features

### AI Explain
Get detailed explanations of coding problems directly in the Chrome Side Panel.
- Automatic problem detection from LeetCode
- Context-aware explanations from Google Gemini
- Formatted markdown responses

### Progressive Hints
Receive helpful hints without spoiling the solution.
- Multi-level hints for problem-solving guidance
- Encourage independent thinking
- Build problem-solving skills progressively

### Solution Approach
Get step-by-step approaches to solve problems including:
- Problem understanding and key observations
- Algorithmic approach explanation
- Time and space complexity analysis
- Implementation strategy

### Mock Interview
Practice technical interviews using the current problem.
- Configurable interview difficulty (Easy, Medium, Hard)
- Adjustable interview duration
- AI-generated interview questions
- Real interview simulation experience

### Interview Evaluation
Get detailed feedback on your interview responses:
- Response quality assessment
- Technical understanding evaluation
- Problem-solving approach analysis
- Communication effectiveness
- Improvement suggestions
- Overall performance score

### Interview History Summary
   Users can:
- View all their interview sessions
- Access detailed feedback and scores
- Delete previous sessions
- Track improvement over time

---

### Automatic Problem Sync
InterviewMate AI automatically detects the coding problem you're working on:
- Extracts problem title, difficulty, and context
- Zero manual configuration needed
- Works seamlessly with LeetCode
- Syncs problem information automatically

### Chrome Side Panel
Access all features without tab switching:
- View problems and write code simultaneously
- Open Side Panel with one click
- Responsive design for different screen sizes
- Persistent session across tabs

---
**Benefits:**
- No tab switching
- Faster learning cycle
- Immediate feedback
- Integrated practice
- Performance tracking
---

## Tech Stack

### Frontend
- **React 18** - UI library
- **Vite** - Frontend build tool & dev server
- **Tailwind CSS** - Styling and design
- **React Router** - Client-side routing
- **React Markdown** - Markdown rendering
- **Lucide React** - Icon library
- **Axios** - HTTP client

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **REST API** - Client-server communication
- **JWT** - Token-based authentication
- **bcrypt** - Password hashing

### Database
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM (Object Data Modeling)

### AI & APIs
- **Google Gemini API** - AI-powered responses

### Chrome Extension
- **Chrome Manifest V3** - Extension manifest
- **Chrome Side Panel API** - Side panel UI
- **Content Scripts** - Page manipulation
- **Chrome Messaging** - Inter-script communication
- **Chrome Storage API** - Local data persistence
- **Chrome Tabs API** - Tab information access
- **Chrome Scripting API** - Dynamic script execution

---

## Architecture

InterviewMate AI follows a **full-stack Chrome Extension architecture** where the extension frontend (running in Chrome) communicates with a cloud-based backend that handles authentication, database operations, and AI requests.

```
                         InterviewMate AI
                                │
                ┌───────────────┴────────────────┐
                │                                │
          CHROME EXTENSION                    BACKEND
             (Frontend)                      (Server)
                │                                │
                ▼                                ▼
        React + Vite                      Node.js
        Tailwind CSS                      Express.js
        Manifest V3                            │
        Chrome Side Panel                      │
                │                              │
                │ HTTPS REST API               │
                └───────────────┬──────────────┘
                                │
                  ┌─────────────┴─────────────┐
                  │                           │
                  ▼                           ▼
              MongoDB                  Google Gemini
              Database                     API
                  │                           │
                  └─────────────┬─────────────┘
                                │
                                ▼
                         AI Generated Response
                                │
                                ▼
                         Chrome Side Panel
```

---

## Application Flow

### 1. User Authentication Flow
```
              User
               │
               ├─→ Register
               │    │
               │    ▼
               │  Backend API /auth/register
               │    │
               │    ▼
               │  Validate Email & Password
               │    │
               │    ▼
               │  Hash Password (bcrypt)
               │    │
               │    ▼
               │  Save User to MongoDB
               │    │
               │    ▼
               │  Generate JWT Token
               │    │
               │    └─→ Return to Extension
               │
               └─→ Login
                    │
                    ▼
                  Backend API /auth/login
                    │
                    ▼
                  Find User by Email
                    │
                    ▼
                  Compare Password (bcrypt)
                    │
                ┌───┴────┐
                │        │
              Valid    Invalid
                │        │
                ▼        ▼
            Generate   Return Error
            JWT Token
                │
                └─→ Return Token to Extension

Token Storage & Usage:
       ▼
    Browser Local Storage
       │
       ▼
Protected API Requests
  (Authorization: Bearer {token})
       │
       ▼
Backend JWT Verification
       │
       ▼
Authorized Request Processing
```

### 2. Automatic Problem Detection
```
User Opens LeetCode Problem
            │
            ▼
     Chrome Content Script
            │
            ▼
    Extract Problem Details
     (Title, Difficulty, URL)
            │
            ▼
      Chrome Messaging
            │
            ▼
     Extension Frontend
            │
            ▼
    Problem Context Available
            │
    ┌───────┼───────┐
    ▼       ▼       ▼
  Explain  Hint  Approach
```

### 3. AI Explanation Flow
```
User Opens Problem
        │
        ▼
Problem Data Detected
        │
        ▼
User Clicks "Explain"
        │
        ▼
Extension Frontend
        │
        ▼
Backend API
        │
        ▼
Prompt Construction
        │
        ▼
Google Gemini API
        │
        ▼
AI Generated Explanation
        │
        ▼
Backend Response
        │
        ▼
Chrome Side Panel Display
```

### 4. Progressive Hint Flow
```
Coding Problem
      │
      ▼
User Requests Hint
      │
      ▼
Backend API
      │
      ▼
Gemini API (Hint Prompt)
      │
      ▼
Progressive Hint Generated
      │
      ▼
Display in Side Panel
      │
      ▼
User Attempts Problem
      │
      ▼
Can Request Next Hint
```

### 5. Mock Interview Flow
```
Current Coding Problem
          │
          ▼
Select Interview Settings
  ├─ Difficulty (Easy/Med/Hard)
  └─ Duration (5/10/15 mins)
          │
          ▼
      Start Interview
          │
          ▼
Generate Interview Questions
   (Based on problem & difficulty)
          │
          ▼
      User Answers
          │
          ▼
Backend Sends Response to Gemini
          │
          ▼
      AI Evaluates
   ├─ Response Quality
   ├─ Technical Understanding
   ├─ Problem Solving
   └─ Communication
          │
          ▼
   Interview Feedback
          │
          ▼
Store in MongoDB
          │
          ▼
Interview Completed
```

---

## Chrome Extension Architecture

InterviewMate AI is built using **Chrome Extension Manifest V3** for modern, secure extension development.

```
                     Chrome Browser
                           │
             ┌─────────────┴─────────────┐
             │                           │
         LeetCode / Problem          InterviewMate AI
         Solving Platform            Chrome Extension
             │                           │
             ▼                           ▼
       Content Script              Side Panel UI
             │                      (React App)
             │                           │
             └───────────┬───────────────┘
                         │
                  Chrome Messaging
                         │
                         ▼
                  Extension Services
                         │
                    Message Relay
                         │
                  ┌──────┴──────┐
                  ▼             ▼
           Content Script   Background Service
           Extracts Data    Message Handler
```

### Key Components

**Content Script**
- Runs on supported coding problem pages
- Extracts problem information
- Communicates via Chrome messaging
- Detects problem context

**Side Panel**
- Main UI for InterviewMate features
- React-based responsive interface
- Displays explanations, hints, and feedback
- Manages user interactions

**Service Worker**
- Handles background tasks
- Manages message routing
- Optional background operations

---


## Security

### Authentication & Authorization
- JWT-based authentication for API requests
- Password hashing using bcrypt (not plain text)
- Protected backend endpoints with middleware
- Token validation on every protected request

### Data Protection
- Passwords never transmitted in plain text
- HTTPS for all API communications
- Secure token storage in browser
- MongoDB connection via secure URI

---

### Deployment Architecture
```
              User's Chrome Browser
                      │
          ┌───────────┴───────────┐
          │                       │
    Chrome Web Store         Local Development
     (Published Ext)          (npm run build)
          │                       │
          ▼                       ▼
     dist/ folder          Production Bundle
          │                       │
          └───────────┬───────────┘
                      │
             Backend Cloud Server
                      │
          ┌───────────┴───────────┐
          │                       │
       MongoDB Atlas         Google Gemini
       (Cloud Database)           API
```
---

## Technology Highlights

### React + Vite
- Lightning-fast development
- Hot module replacement
- Optimized production builds
- Smaller bundle size

### Chrome Manifest V3
- Enhanced security
- Better analytics
- Service Workers instead of background pages
- Future-proof extension platform

### Express.js Backend
- Fast and lightweight
- Rich middleware ecosystem
- Security best practices
- RESTful API design

### Google Gemini AI
- AI responses
- Context-aware assistance
- Problem-specific guidance
- Continuous improvement

---


