/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        fontFamily: {
            montserrat: "Montserrat, sans-serif",
            'sans': ['sans-serif', 'system-ui'],
            'serif': ['serif', 'Georgia'],
            'mono': ['monospace', 'SFMono-Regular'],
            satoshi:['satoshi', '/src/assets/fonts/Satoshi-black.tff'],
            Merriweather:'Merriweather, serif',
            rubik:'Rubik, sans-serif',
            openSans:'Open Sans, sans-serif',
            lato:'Lato, sans-serif'
        },
        fontSize: {
            sm: '1.1rem',
            xsm: '14px',
            md: '18px',
            lg: '3.1rem',
            xl: '4.0rem',
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
                body: '#FBFBFF',
                primary: '#075FEE',
                primary_faded: '#F4C6D3',
                danger: '#BE1B34',
                darkText: '#17141B',
                placeholder: '#17141B',
            },
            fontFamily: {
                inter: ['Inter', 'sans-serif'],
                rubik: ['Rubik', 'sans-serif'],
            },
            boxShadow: {
                primary: '0px 4px 5px rgba(0, 0, 0, 0.7)',
                secondary: '0px 72px 93px -30px rgba(117, 113, 160, 0.25);',
                square: '0px 5px 20px rgba(224, 224, 224, 0.48)'
            },
            backgroundImage: {
                heroImage: 'url(\'/src/assets/jpg/audience-background.jpg\')',
                FooterHeroImage: 'url(\'/src/assets/jpg/footer-hero.jpg\')',
                customGradient:
                    'bg-[radial-gradient(at_center_right,_#B49EA5,_#350F1BF2,_#B49EA5)]',
            },
        },
    },
    plugins: [
        require('@tailwindcss/forms'),
    ],
};
