/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/containers/**/*.{js,ts,jsx,tsx,mdx}',
        './src/hooks/**/*.{js,ts,jsx,tsx,mdx}'
    ],
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
                accent: '#2849ff',
                complimentary: '#d7ddff',
                'text-dark': '#5E647D',
                'text-subtle': '#7B8097',
                'button-bg-secondary': 'rgba(255, 255, 255, .2)',
                'button-border-secondary': 'rgba(255, 255, 255, .2)',
                'card-bg': 'rgba(234, 237, 255, .2)',
                'card-border': 'rgba(255, 255, 255, .3)',
                neutral: {
                    DEFAULT: '#43427B',
                    50: '#43427B',
                    100: '#403F76',
                    200: '#3A3B6C',
                    300: '#353762',
                    400: '#2F3258',
                    500: '#2A2D4E',
                    600: '#252844',
                    700: '#1F233A',
                    800: '#1D2135',
                    900: '#151826',
                    950: '#121521'
                }
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
                '3xl': ['0 0 50px rgba(0, 0, 0, 0.25)', '0 0 100px rgba(0, 0, 0, 0.15)']
            },
            dropShadow: {
                '3xl': ['0 35px 35px rgba(0, 0, 0, 0.25)', '0 45px 65px rgba(0, 0, 0, 0.15)']
            },
            fontSize: {
                xxs: '.65rem'
            },
            backgroundImage: {
                playground: "url('/playground.jpg')"
            }
        }
    },
    plugins: []
};

/**
 * neutral: {
                    DEFAULT: '#463C6D',
                    50: '#463C6D',
                    100: '#423968',
                    200: '#3A345E',
                    300: '#332E54',
                    400: '#2C294A',
                    500: '#262340',
                    600: '#1F1E36',
                    700: '#19182C',
                    800: '#131323',
                    900: '#0E0E19',
                    950: '#0B0B14'
                }
 */

/**
 * 'neutral': {
  DEFAULT: '#463C6D',
  50: '#463C6D',
  100: '#433A69',
  200: '#3E3663',
  300: '#38335C',
  400: '#332F56',
  500: '#2F2B4F',
  600: '#2A2848',
  700: '#252442',
  800: '#21213B',
  900: '#1D1D35',
  950: '#1B1C31'
},





'fiord': {
  DEFAULT: '#494974',
  50: '#494974',
  100: '#46476F',
  200: '#404266',
  300: '#3A3D5D',
  400: '#343753',
  500: '#2E324A',
  600: '#282C40',
  700: '#222637',
  800: '#1C202D',
  900: '#171A24',
  950: '#14161F'
},
 */
