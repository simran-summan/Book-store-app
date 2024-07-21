/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        'purple-custom': 'rgba(126, 34, 206, 0.42)',
      },
    },
  },
  plugins: [],
}

