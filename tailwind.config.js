/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                "logo": ["Gloria Hallelujah"],
                "main": ["Roboto"],
            },
            colors: {
                "d-primary": "#2c2c2c",
                "d-secondary": "#303030",
                "d-text-primary": "#ccc",
                "d-text-secondary": "#878787",
            },
        },
    },
    plugins: [],
    darkMode: 'selector',
}

