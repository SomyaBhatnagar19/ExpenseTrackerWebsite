/** @type {import('tailwindcss').Config} */
// './src/**/*.{js,jsx,ts,tsx}', './public/index.html' this is to be written in  the content to apply the tailwind
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    extend: {
      backgroundImage: {
        'profile': "url('/src/components/assets/profile.jpg')",
        'UserDetails': "url('/src/components/assets/userDetail.jpg')"
      },
    },
  },
  plugins: [],
}

