/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        primary: {
          50: '#f0f4ff',
          100: '#e0e8ff',
          500: '#3b82f6', // Fintech blue
          600: '#2563eb', // Core blue
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a', // Deep navy
        },
        slate: {
          50: '#f8fafc',
          800: '#1e293b',
          900: '#0f172a',
        }
      },
      boxShadow: {
        'card': '0 4px 20px -2px rgba(0, 0, 0, 0.05)',
        'premium': '0 10px 30px -5px rgba(37, 99, 235, 0.15)',
        'float': '0 20px 40px -10px rgba(0, 0, 0, 0.08)',
      }
    },
  },
  plugins: [],
}
