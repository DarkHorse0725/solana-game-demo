const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    "./node_modules/flowbite-react/**/*.js",
    './pages/**/*.{js,ts,jsx,tsx}', 
    './components/**/*.{js,ts,jsx,tsx}', 
    './views/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      screens: {
        phone: { max: '768px' }
      },
      width: {
        desktop: '1240px'
      },
      fontFamily: {
        sans: ['Red Hat Display', 'Roboto', ...defaultTheme.fontFamily.sans]
      },
      backgroundImage: {
        unlocSave: 'url(/images/icon-save.png)',
        unlocCancel: 'url(/images/icon-cancel.png)',
        unlocClose: 'url(/images/icon-close.png)'
      },
      keyframes: {
        enter: {
          '0%': { transform: 'scale(0.9)', opacity: 0 },
          '100%': { transform: 'scale(1)', opacity: 1 }
        },
        leave: {
          '0%': { transform: 'scale(1)', opacity: 1 },
          '100%': { transform: 'scale(0.9)', opacity: 0 }
        },
        'slide-in': {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(0)' }
        }
      },
      animation: {
        enter: 'enter 200ms ease-out',
        'slide-in': 'slide-in 1.2s cubic-bezier(.41,.73,.51,1.02)',
        leave: 'leave 150ms ease-in forwards'
      }
    }
  },
  plugins: [
    require('@tailwindcss/forms'), 
    require('@tailwindcss/typography'), 
    require('@tailwindcss/line-clamp'),
    require("flowbite/plugin"),
    require("tailwindcss-animate")
  ]
}
