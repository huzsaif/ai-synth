// A simple script to test if environment variables are being loaded
import fs from 'fs';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Get current file's directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables from .env
dotenv.config();

console.log('======== ENVIRONMENT VARIABLE TEST ========');
console.log('VITE_OPENAI_API_KEY:', process.env.VITE_OPENAI_API_KEY ? 'Present (starts with: ' + process.env.VITE_OPENAI_API_KEY.substring(0, 5) + '...)' : 'Not present');
console.log('VITE_GOOGLE_API_KEY:', process.env.VITE_GOOGLE_API_KEY ? 'Present (starts with: ' + process.env.VITE_GOOGLE_API_KEY.substring(0, 5) + '...)' : 'Not present');

// Check if the .env file exists and read its contents
try {
  if (fs.existsSync('.env')) {
    console.log('\n.env file exists. Contents:');
    const envFile = fs.readFileSync('.env', 'utf8');
    
    // Only show presence but not the actual keys for security
    const lines = envFile.split('\n');
    lines.forEach(line => {
      if (line.startsWith('#') || line.trim() === '') {
        console.log(line);
      } else {
        const [key, value] = line.split('=');
        console.log(`${key}=Present (${value ? value.length : 0} chars)`);
      }
    });
  } else {
    console.log('\n.env file does not exist!');
  }
} catch (err) {
  console.error('Error reading .env file:', err);
}

console.log('=========================================='); 