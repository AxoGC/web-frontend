/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      height: {
        'full-screen': 'calc(100vh - 60px)',
      },
    },
  },
  plugins: [],
}

