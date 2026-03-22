import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { summarizeText } from './llm.js';
import { summarizeRequestSchema } from './validate.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Environment validation on startup
if (!process.env.GEMINI_API_KEY) {
  console.error('\x1b[31m%s\x1b[0m', 'CRITICAL ERROR: GEMINI_API_KEY is not defined in the environment.');
  process.exit(1);
}

app.use(cors());
app.use(express.json());

// Request logging middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

app.post('/api/summarize', async (req, res, next) => {
  try {
    const validation = summarizeRequestSchema.safeParse(req.body);
    if (!validation.success) {
      return res.status(400).json({ 
        error: 'Validation failed', 
        details: validation.error.flatten().fieldErrors 
      });
    }

    const { text } = validation.data;
    const result = await summarizeText(text);
    return res.json(result);
  } catch (error) {
    next(error);
  }
});

// Global Error Handling Middleware
app.use((err, req, res, next) => {
  const isLlmError = err.message.startsWith('LLM Error:');
  const statusCode = isLlmError ? 502 : 500;

  console.error(`Status: ${statusCode} | Error: ${err.message}`);

  res.status(statusCode).json({
    status: 'error',
    error: err.message || 'Internal Server Error',
    timestamp: new Date().toISOString()
  });
});

app.listen(PORT, () => {
  console.log(`\x1b[32m%s\x1b[0m`, `Server running on port ${PORT} (Gemini Integration)`);
});
