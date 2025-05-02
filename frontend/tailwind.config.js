// tailwind.config.js
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',  // Cambialo según tu estructura
  ],
  theme: {
    extend: {
      fontFamily: {
        logo: ['Luckiest Guy', 'cursive']
      }
    },
  },
  plugins: [],
}


