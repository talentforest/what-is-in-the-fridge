/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './layout/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    colors: {
      blue: '#6AC8FF',
      green: '#82C2A0',
      yellow: '#FFF0A4',
      'yellow-light': '#FFFADD',
      orange: '#FF6B00',
      'orange-light': '#FFF2E7',
      gray: '#8492a6',
      'gray-dark': '#273444',
      'gray-light': '#E3E3E3',
      white: '#ffffff',
      'white-dark': '#FCFCFC',
    },
    fontSize: {
      sm: ['10px', '12px'],
      base: ['16px', '18px'],
      lg: ['20px', '28px'],
      xl: ['24px', '32px'],
    },
    extend: {},
  },
  plugins: [],
};
