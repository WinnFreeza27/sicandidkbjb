/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		colors: {
  			'secondary'	: '#DCE3E7',
			'primary'	: '#6A9AB0',
			'accent'	: '#3A6D8C',
			'accentdarken'	: '#001F3F',
			'border' : '#DCE3E7'
  	},
	fontFamily: {
		'roboto' : ['Roboto', 'sans-serif']
	}
  },
},
  plugins: [require("tailwindcss-animate")],
};
