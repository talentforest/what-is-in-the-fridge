/** @type {import('tailwindcss').Config} */

module.exports = {
  important: true,
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/layout/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    screens: {
      mobile: '280px',
      tablet: '500px',
      desktop: '1024px',
    },
    colors: {
      transparent: 'transparent',
      red: '#FF2424',
      'red-light': '#FF7E7E',
      'blue-dark': '#2d67d2',
      blue: '#6AC8FF',
      'blue-light': '#ceebff',
      green: '#82C2A0',
      yellow: '#FFF0A4',
      'yellow-light': '#FFFADD',
      orange: '#FF6B00',
      'orange-light': '#ffb87a',
      gray: '#8492a6',
      'gray-dark': '#273444',
      'gray-light': '#E3E3E3',
      white: '#ffffff',
      'white-dark': '#FCFCFC',
    },
    fontSize: {
      xs: ['10px'],
      sm: ['12px'],
      md: ['14px'],
      base: ['16px'],
      lg: ['20px'],
      xl: ['24px'],
    },
    scaleX: {
      '-1': '-1',
    },
    rotateY: {
      140: '140deg',
    },
    extend: {},
  },
  plugins: [require('tailwind-scrollbar-hide')],
};
