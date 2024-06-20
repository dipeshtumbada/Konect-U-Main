/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        'primary-bg': '#161921',
        'primary': '#FB5909',
        'buttons': '#FEB702',
        'bg': '#FFF5EA',
      },
      backgroundImage: {
        'gradient': 'linear-gradient(to right, #fb4d08 0%,#ffb703 80%,#ffffff 100%)',
        'gradient1': 'linear-gradient(to right, #fb4d08 0%,#ffb703 50%,#fb4d08 100%)',
        'radgradient': 'radial-gradient(ellipse at center, #ffb703 0%,#ff9325 54%,#fb4d08 100%)',
      },
      rotate: {
        '30': '30deg',  // Add custom rotation value
        '150': '150deg'  // Add custom rotation value for the second div
      },
      animation: {
				'loop-scroll': 'loop-scroll 10s linear infinite',
				'loop-scroll-slow': 'loop-scroll 40s linear infinite',
			},
			keyframes: {
				'loop-scroll': {
					from: { transform: 'translateX(0)' },
					to: { transform: 'translateX(-100%)' },
				}
			}
    },
  },
  plugins: [],
}

