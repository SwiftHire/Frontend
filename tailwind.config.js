/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        fontFamily: {
            Montserrat: "Montserrat, sans-serif",
            sans: ["sans-serif", "system-ui"],
            serif: ["serif", "Georgia"],
            mono: ["monospace", "SFMono-Regular"],
            satoshi: ["satoshi", "/src/assets/fonts/Satoshi-black.tff"],
            Merriweather: "Merriweather, serif",
            rubik: "Rubik, sans-serif",
            openSans: "Open Sans, sans-serif",
            lato: "Lato, sans-serif",
        },
        fontSize: {
            sm: "1.1rem",
            xsm: "14px",
            xxsm: "10px",
            xxxsm: "8px",
            md: "18px",
            lg: "3.1rem",
            xl: "4.0rem",
        },
        letterSpacing: {
            wide: "0.2rem",
        },
        fontWeight: {
            thin: 200,
            semiLight: 300,
            light: 400,
            normal: 500,
            medium: 600,
            bold: 700,
            smbold: 800,
            xbold: 900,
        },
        extend: {
            colors: {
                body: "#FBFBFF",
                primary: "#7E3AF2",
                primary_faded: "#F4C6D3",
                danger: "#BE1B34",
                darkText: "#17141B",
                placeholder: "#17141B",
                resumeText: "#283d56",
                light: "#e3e3e3",
                yellow: "#F7C600",
                green: "#139426",
                lightGreen: "rgba(19,148,38,0.06)",
            },
            fontFamily: {
                inter: ["Inter", "sans-serif"],
                rubik: ["Rubik", "sans-serif"],
            },
            boxShadow: {
                primary: "0px 4px 5px rgba(0, 0, 0, 0.7)",
                secondary: "0px 72px 93px -30px rgba(117, 113, 160, 0.25);",
                square: "0px 5px 20px rgba(224, 224, 224, 0.48)",
                resume: "0px 8px 24px rgba(149, 157, 165, 0.2)",
            },
            backgroundImage: {
                heroImage: "url('/src/assets/jpg/audience-background.jpg')",
                FooterHeroImage: "url('/src/assets/jpg/footer-hero.jpg')",
                resumeSample: "url(/src/assets/png/resume-001.png)",
                "radial-gradient":
                    "radial-gradient(at center right, #B49EA5, #350F1BF2, #B49EA5)",
                "conic-gradient": "conic-gradient(#6467 3.6deg, #e3e3e3 0deg)",
            },
        },
    },
    plugins: [
        // require('@tailwindcss/forms'),
    ],
};
