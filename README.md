## ✨ Features
 
### 🔐 Authentication & Security
- Secure **JWT-based authentication** 
- **Token blacklisting** via **ioredis** — invalidates tokens on logout instantly
- Protected routes on both frontend and backend
- Passwords hashed with **bcrypt**
### 📄 Resume & Profile Analysis
- Upload your existing resume as a **PDF** (parsed via `pdf-parse`)
- Provide your **Job Description** and **Self Description**
- Gemini AI cross-analyzes all three inputs for deep contextual understanding
### 📊 AI Interview Report
- **Match Score** — 0–100 alignment score of your profile vs. the job description
- **Technical Questions** — role-specific questions with the interviewer's intent and a model answer
- **Behavioral Questions** — soft-skill & competency questions with STAR-method suggested answers
- **Skill Gaps** — missing skills ranked by severity: `Low`, `Medium`, or `High`
- **Preparation Plan** — a structured day-by-day study plan with a daily focus area and actionable tasks
### 📝 AI-Powered Resume Generator
- Gemini AI rewrites and enhances your resume based on the job description, self description and prev resume
- Professionally formatted output rendered by **Puppeteer**
- Delivered as a clean, **downloadable PDF**
- ATS-friendly structure optimized for modern hiring systems
---
 
## 🛠 Tech Stack
 
### Backend
| Package | Purpose |
|---|---|
| `express` | REST API framework |
| `mongoose` | MongoDB ODM |
| `@google/genai` | Gemini AI integration |
| `ioredis` | JWT blacklist store (token invalidation) |
| `puppeteer` | HTML-to-PDF rendering |
| `pdf-parse` | Extract text from uploaded resumes |
| `multer` | Resume file upload handling |
| `jsonwebtoken` | Access & refresh token generation |
| `bcryptjs` | Password hashing |
| `cookie-parser` | Refresh token via HTTP-only cookie |
 
### Frontend
| Package | Purpose |
|---|---|
| `react` + `vite` | UI framework & build tool |
| `react-redux` + `@reduxjs/toolkit` | Global state management |
| `react-router-dom` | Client-side routing |
| `react-hook-form` | Performant form handling |
| `axios` | HTTP client with interceptors |
| `react-toastify` | Toast notifications |
| `tailwindcss` | Utility-first styling |
 
---
 
## 🚀 Getting Started
 
### Prerequisites
 
- **Node.js** v18+
- **MongoDB** (local or Atlas)
- **Redis** (local or Upstash)
- **Google Gemini API Key** — [Get one here](https://aistudio.google.com/app/apikey)
---
 
### 1. Clone the Repository
 
```bash
git clone https://github.com/Abdul-Wahab08/Interview-IQ.git
cd Interview-IQ
```
 
---
 
### 2. Backend Setup
 
```bash
cd Backend
npm install
```
 
Create a `.env` file in the `Backend` directory:
 
```env
# Server
PORT=3000
NODE_ENV=development
 
# MongoDB
MONGO_URI=mongodb://localhost:27017/interview-iq
 
# JWT
JWT_SECRET=your_access_token_secret_here
 
# Redis (token blacklisting)
REDIS_URL=redis://localhost:6379
 
# Google Gemini AI
GEMINI_API_KEY=your_gemini_api_key_here
 
Start the backend server:
 
```bash
npm run dev
```
 
---
 
### 3. Frontend Setup
 
```bash
cd ../frontend
npm install
```
 
Create a `.env` file in the `frontend` directory:
 
```env
VITE_API_BASE_URL=http://localhost:3000/api/v1
```
 
Start the frontend dev server:
 
```bash
npm run dev
```
 
---
 
### 4. Open in Browser
 
```
http://localhost:5173
```
 
---
