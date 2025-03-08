/** @type {import('tailwindcss').Config} */

module.exports = {
    theme: {
        extend: {
            colors: {
                'jordy-blue': {
                    50: '#f1f6fd',
                    100: '#dfebfa',
                    200: '#c7dbf6',
                    300: '#a1c5ef',
                    400: '#7dabe8',
                    500: '#5385de',
                    600: '#3e69d2',
                    700: '#3556c0',
                    800: '#31489c',
                    900: '#2c407c',
                    950: '#1f284c',
                },
                'albescent-white': {
                    10: '#fbf9f7',
                    50: '#fbf7f1',
                    100: '#f5e8d6',
                    200: '#eed6ba',
                    300: '#e2ba8f',
                    400: '#d69761',
                    500: '#cc7c43',
                    600: '#be6738',
                    700: '#9e5130',
                    800: '#7f422d',
                    900: '#673827',
                    950: '#371b13',
                },
            }
        }
    },
    plugins: [
        require('@tailwindcss/typography'),
        require('daisyui'),
    ],
}



