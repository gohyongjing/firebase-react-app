/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'primary-1': '#242443',
        'primary-2': '#88dded',
        'secondary-1': '#f6820d',
        'secondary-2': '#ffcb2b',
      }
    },
  },
  plugins: [],
}

