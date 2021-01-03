module.exports = {
    purge: {
        content: [
            './pages/**/*.{js,jsx,ts,tsx}',
            './src/**/*.{js,jsx,ts,tsx}'
        ]
    },
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            boxShadow: {
                "input": "0 0 0 1px #e0e0e0, 0 2px 4px 0 rgba(0,0,0,.07), 0 1px 1.5px 0 rgba(0,0,0,.05)",
                "input-error": "0 0 0 1px #ef9896, 0 2px 4px 0 rgba(0,0,0,.07), 0 1px 1.5px 0 rgba(0,0,0,.05)"
            }
        }
    },
    variants: {},
    depthVariants: {
        extend: {},
    },
    plugins: [],
}
