/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{html,js}",
    "./public/index.html",
  ],
  theme: {
    extend: {
      colors: {
        "nmp-primary": "#EA7C69",
        "nmp-secondary": " #9288E0",
        "nmp-white": "#FFFFFF",
        "nmp-base": "#FAFAFA",
        "nmp-success": "#798943",
        "nmp-warning": "#f7790b",
        "nmp-line-dark": "#393C49",
        "nmp-dark-primary": "#252836",
        "nmp-dark-secondary": "#1F1D2B",
        "nmp-form": "#2D303E",
        "nmp-accent-green": "#50D1AA",
        "nmp-accent-red": "#FF7CA3",
        "nmp-accent-warning": "#FFB572",
        "nmp-accent-blue": "#65B0F6",
        "nmp-accent-purple": "#9290FE",
      },
    },
  },
  plugins: [
    require("tailwind-bootstrap-grid")({
      containerMaxWidths: {
        sm: "540px",
        md: "720px",
        lg: "960px",
        xl: "1140px",
      },
    }),
  ],
};

