import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Access environment variables directly from process.env
const googleSheetsClientId = process.env.REACT_APP_GOOGLE_SHEETS_CLIENT_ID;
const googleSheetsApiKey = process.env.REACT_APP_GOOGLE_SHEETS_API_KEY;

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Additional configuration can go here
  define: {
    // Define global constants based on environment variables
    'process.env.VITE_GOOGLE_SHEETS_CLIENT_ID': JSON.stringify(googleSheetsClientId),
    'process.env.VITE_GOOGLE_SHEETS_API_KEY': JSON.stringify(googleSheetsApiKey),
  },
});
