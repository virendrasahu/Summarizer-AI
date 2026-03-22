# Zoo Media: AI Summarizer (Technical Assessment 2026)

A lightweight, full-stack application built for the **Zoo Media AI Intern** assessment. It transforms messy, unstructured text into a clean, structured summary using Google Gemini.

## 🛠️ Tech Stack
- **Frontend**: React.js (Vite), Axios, Vanilla CSS.
- **Backend**: Node.js (ES Modules), Express, Google Generative AI SDK, Zod, Dotenv.
- **LLM**: Google Gemini 2.5 Flash Lite.

---

## ✅ Final Result (Zoo Media AI Intern 2026)
The UI is a sleek, modern dashboard that translates AI responses into structured insights.

![Zoo Media AI Summarizer Full Page](client\src\assets\zoo-media-project-image.jpg)

---

## 📦 Setup & Installation

### 1. Prerequisites
- Node.js (v18+)
- An active Google Gemini API Key from [Google AI Studio](https://aistudio.google.com/).

### 2. Dependency Installation
In both `server` and `client` directories:
```bash
npm install
```

### 3. Environment Configuration
Navigate to `server/`, create `.env` from `.env.example`, and add your `GEMINI_API_KEY`.

### 4. Running Locally
- **Backend**: `server/` -> `npm start`
- **Frontend**: `client/` -> `npm run dev`

---

## 💻 CLI Usage

This project supports a powerful command-line interface for quick summarization.

**Example:**
```bash
node src/cli.js "Your text here"
```

### Sample JSON Output
```json
{
  "summary": "AI is transforming industries while raising concerns about jobs and privacy.",
  "keyPoints": [
    "AI improves efficiency",
    "Job displacement concerns",
    "Privacy and ethical risks"
  ],
  "sentiment": "neutral"
}
```

---

## 🤖 LLM Implementation

### Why Google Gemini?
We chose **Gemini 2.5 Flash Lite** for its speed, low latency, and accuracy in structured data extraction.

### Prompt Design
The prompt is engineered for strictly structured JSON output, enforcing schema rules for the summary, key points, and sentiment without conversational "noise."

---

## ⚠️ Error Handling
- **Input Validation**: Prevents empty requests.
- **Graceful Failures**: Handles API and network errors.
- **Safe Parsing**: Sanitizes LLM output to ensure JSON validity.

---

## 🚧 Trade-offs & Future Improvements
- **Persistance**: Adding a database would allow saving history.
- **Authentication**: Implementing JWT for enterprise-level security.
- **Multi-Model Support**: Adding a toggle for larger models like Gemini Pro.

---
*Built for Zoo Media AI Intern Assessment • 2026*
