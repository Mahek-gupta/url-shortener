// /** @type {import('tailwindcss').Config} */
// export default {
//   content: [
//      "./index.html",
//     "./src/**/*.{js,ts,jsx,tsx}",
//   ],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// }

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // Enable dark mode via class
  theme: {
    extend: {
      colors: {
        // 'primary-purple': '#8B5CF6',
        // 'dark-bg': '#1A1A2E',
        // 'dark-card': '#2C2C42',
        // 'dark-text': '#E0E0E0',
        // 'light-text': '#F0F0F0',
           'primary-purple': '#8B5CF6',
        'light-bg': '#F9FAFB',    // light page background
        'light-card': '#FFFFFF',  // cards in light mode
        'light-text': '#0F172A',  // dark text
        'dark-bg': '#0b1020',     // dark page background (deep navy)
        'dark-card': '#0f1724',   // dark card surface
        'dark-text': '#E6EEF8',   // light text
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // Or any other modern font
      },
      backgroundImage: {
        'hero-pattern': "url('/src/assets/image3.jpg')", // Adjust path as needed
      }
    },
  },
  plugins: [],
}