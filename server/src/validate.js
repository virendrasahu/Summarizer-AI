import { z } from 'zod';

export const summarizeRequestSchema = z.object({
  text: z.string().min(1, 'Input text is required.').max(5000, 'Text is too long (max 5000 characters).'),
});

export const summarizeResponseSchema = z.object({
  summary: z.string(),
  keyPoints: z.array(z.string()).length(3),
  sentiment: z.enum(['positive', 'neutral', 'negative']),
});
