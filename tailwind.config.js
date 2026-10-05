/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        institution: {
          950: '#071224',
          900: '#0B1E36', // Primary deep institutional blue
          850: '#0E2442',
          800: '#132E52',
          700: '#1A3F70',
          600: '#1E40AF',
          500: '#2563EB', // Primary medium blue
          400: '#3B82F6',
          300: '#60A5FA',
          200: '#BFDBFE',
          100: '#DBEAFE',
          50: '#F0F6FF',  // Soft blue surface
          25: '#F8FAFD'
        },
        slate: {
          850: '#151F32',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        serif: ['Newsreader', 'Georgia', 'Cambria', 'serif'],
        mono: ['"JetBrains Mono"', 'Menlo', 'monospace']
      },
      boxShadow: {
        'subtle': '0 1px 3px 0 rgba(11, 30, 54, 0.05), 0 1px 2px -1px rgba(11, 30, 54, 0.05)',
        'elevated': '0 4px 16px -2px rgba(11, 30, 54, 0.08), 0 2px 6px -2px rgba(11, 30, 54, 0.04)',
        'institutional': '0 10px 30px -5px rgba(11, 30, 54, 0.12), 0 4px 10px -4px rgba(11, 30, 54, 0.06)',
      }
    },
  },
  plugins: [],
}
