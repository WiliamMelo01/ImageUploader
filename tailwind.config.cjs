/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        notosans: 'Noto Sans',
        poppins: 'Poppins'
      }
    },
  },
  plugins: [],
}