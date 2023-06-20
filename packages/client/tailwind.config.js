/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}'
    ],
    theme: {
        extend: {
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
            },
            width: {
                96: '22rem',
                112: '32rem',
                128: '64rem',
                256: '84rem'
            },
            colors: {
                'off-white': '#EAEDFF',
                'pastel-blue': '#CACFEA',
                accent: '#0A5DFF',
                'text-dark': '#5E647D',
                'button-bg-secondary': 'rgba(255, 255, 255, .2)',
                'button-border-secondary': 'rgba(255, 255, 255, .2)',
                'card-bg': 'rgba(234, 237, 255, .2)',
                'card-border': 'rgba(255, 255, 255, .3)',
                'neutral-100': '#E5E8FA',
                'neutral-200': '#DEE2F5',
                'neutral-300': '#DDE1F6',
                'neutral-400': '#CACFEA'
            },
            fontFamily: {
                sans: ['var(--font-inter)']
            },
            borderRadius: {
                '4xl': '2.5rem'
            },
            dropShadow: {
                '3xl': ['0 35px 35px rgba(0, 0, 0, 0.25)', '0 45px 65px rgba(0, 0, 0, 0.15)']
            }
        }
    },
    plugins: []
};
