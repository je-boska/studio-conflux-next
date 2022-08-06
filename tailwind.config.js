/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    fontFamily: {
      title: ['qigong'],
      body: ['futura-pt'],
    },
    extend: {},
  },
  plugins: [],
  files: ['types/block-content-to-react.d.ts', 'types/shared.d.ts'],
};
