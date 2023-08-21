/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/pages/**/*.{js,ts,jsx,tsx,mdx}', './src/components/**/*.{js,ts,jsx,tsx,mdx}', './src/hooks/**/*.{js,ts,jsx,tsx,mdx}'],
    theme: {
        extend: {
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
                'accent-faded': '#377bff',
                'text-dark': '#5E647D',
                'text-subtle': '#7B8097',
                'button-bg-secondary': 'rgba(255, 255, 255, .2)',
                'button-border-secondary': 'rgba(255, 255, 255, .2)',
                'card-bg': 'rgba(234, 237, 255, .2)',
                'card-border': 'rgba(255, 255, 255, .3)',
                'neutral-100': '#E5E8FA',
                'neutral-200': '#DEE2F5',
                'neutral-300': '#DDE1F6',
                'neutral-400': '#d3d7ed',
                'neutral-500': '#c8cce2'
            },
            fontFamily: {
                sans: ['var(--font-inter)']
            },
            borderRadius: {
                '4xl': '2.5rem'
            },
            boxShadow: {
                md: ['0 0 10px rgba(0, 0, 0, 0.02)', '0 0 5px rgba(0, 0, 0, 0.05)'],
                lg: ['0 0 20px rgba(0, 0, 0, 0.02)', '0 0 10px rgba(0, 0, 0, 0.05)'],
                xl: ['0 0 30px rgba(0, 0, 0, 0.02)', '0 0 20px rgba(0, 0, 0, 0.05)']
            },
            dropShadow: {
                '3xl': ['0 35px 35px rgba(0, 0, 0, 0.25)', '0 45px 65px rgba(0, 0, 0, 0.15)']
            },
            fontSize: {
                xxs: '.65rem'
            }
        }
    },
    plugins: []
};
