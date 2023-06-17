/** @type {import('tailwindcss').Config} */
module.exports = {
   darkMode: 'class',
   content: [
      './pages/**/*.{js,ts,jsx,tsx,mdx}',
      './components/**/*.{js,ts,jsx,tsx,mdx}',
      './app/**/*.{js,ts,jsx,tsx,mdx}',
   ],
   theme: {
      extend: {},
   },
   plugins: [
      require('@tailwindcss/forms')({
         strategy: 'class',
      }),
      require('@tailwindcss/typography'),
      require('@headlessui/tailwindcss'),
      require('daisyui'),
   ],
   daisyui: {
      themes: [
         {
            light: {
               ...require('daisyui/src/theming/themes')['[data-theme=light]'],
               primary: '#3c81f6',
            },
         },
         'dark',
      ],
   },
}
