export default {
  plugins: {
    // Use the explicit package reference — required for Vercel's clean build env
    // (bare 'tailwindcss' key doesn't work in v4; must point to the postcss adapter)
    '@tailwindcss/postcss': {},
    autoprefixer: {},
  },
}
