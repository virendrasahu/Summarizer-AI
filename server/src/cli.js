#!/usr/bin/env node

import 'dotenv/config';
import fs from 'fs/promises';
import path from 'path';
import { summarizeText } from './llm.js';

async function main() {
  const input = process.argv[2];

  if (!input) {
    console.error('\x1b[31m%s\x1b[0m', 'Error: Please provide text or a file path as an argument.');
    console.log('Usage: npx summarizer "Your text here" OR npx summarizer ./path/to/file.txt');
    process.exit(1);
  }

  let textToSummarize = input;

  // Check if input is a valid file path
  try {
    const stats = await fs.stat(input);
    if (stats.isFile()) {
      textToSummarize = await fs.readFile(input, 'utf-8');
    }
  } catch (err) {
    // If it's not a file, treat it as direct text input. 
    // No action needed as textToSummarize is already set to input.
  }

  console.log('\x1b[36m%s\x1b[0m', 'Analyzing...');

  try {
    const result = await summarizeText(textToSummarize);
    
    console.log('\n\x1b[32m%s\x1b[0m', '--- AI SUMMARY ---');
    console.log(`\x1b[1mSummary:\x1b[0m ${result.summary}`);
    
    console.log('\n\x1b[1mKey Points:\x1b[0m');
    result.keyPoints.forEach((point, index) => {
      console.log(`${index + 1}. ${point}`);
    });

    const sentimentEmoji = {
      positive: '✅ Positive',
      neutral: '↔️ Neutral',
      negative: '❌ Negative'
    };

    console.log(`\n\x1b[1mSentiment:\x1b[0m ${sentimentEmoji[result.sentiment] || result.sentiment}`);
    console.log('\x1b[32m%s\x1b[0m', '------------------\n');
    
  } catch (error) {
    console.error('\x1b[31m%s\x1b[0m', `\nError: ${error.message}`);
    process.exit(1);
  }
}

main();
