import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
        "node_modules/flowbite-react/lib/esm/**/*.js",
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ["Poppins", ...defaultTheme.fontFamily.sans],
            },
            fontSize: {
                display: ["60px", { lineHeight: "74px" }],
                h1: ["44px", { lineHeight: "56  px" }],
                h2: ["35px", { lineHeight: "44px" }],
                h3: ["28px", { lineHeight: "38px" }],
                h4: ["36px", { lineHeight: "36px" }],
                h5: ["20px", { lineHeight: "30px" }],
                p18: ["18px", { lineHeight: "27px" }],
                p16: ["16px", { lineHeight: "24px" }],
                p12: ["12px", { lineHeight: "18px" }],
            },
            colors: {
                primaryColor: "#097804",
                redMainColor: "#EC0000",
            },
            height: {
                custom1: "35rem",
                custom2: "60rem",
            },
        },
    },


    plugins: [forms],
};
