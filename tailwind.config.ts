import type { Config } from 'tailwindcss';

import MiniCssExtractPlugin from 'mini-css-extract-plugin';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      animation: {
        'infinite-scroll': 'infinite-scroll 25s linear infinite',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      keyframes: {
        'infinite-scroll': {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-100%)' },
        },
      },
    },
    height: {
      '70v': '70vh',
      '80v': '80vh',
      '90v': '90vh',
    },
    zIndex: {
      '0': '0',
      '10': '10',
      '20': '20',
      '40': '40',
      '100': '100',
      '110': '110',
      '120': '120',
    },
  },
  plugins: [
    new MiniCssExtractPlugin(),
    'prettier-plugin-tailwindcss',
    require('daisyui'),
  ],
};

export default config;
