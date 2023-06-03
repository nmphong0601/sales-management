// const tailwindcss = require("tailwindcss");
// const tailwindcssNesting = require("tailwindcss/nesting");
// const autoprefixer = require("autoprefixer");

module.exports = {
  plugins: {
    "postcss-import": {},
    'tailwindcss/nesting': {},
    tailwindcss: {},
    autoprefixer: {},
  },
  // plugins: [
  //   tailwindcss("./tailwind.config.js"),
  //   require('postcss-import'),
  //   require('tailwindcss/nesting')(require('postcss-nesting')),
  //   autoprefixer,
  // ],
};
