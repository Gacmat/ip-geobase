// tailwind.config.js

module.exports = {
    purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {},
    },
    variants: {
        scrollbar: ['rounded'],
        extend: {
            opacity: ['disabled'],
            backgroundColor: ['active', 'disabled', 'hover'],
            textColor: ['active', 'disabled'],
            scale: ['active', 'focus'],
            fontWeight: ['hover', 'focus', 'disabled']
        },
    },
    plugins: [
        require('tailwind-scrollbar')
    ],
}