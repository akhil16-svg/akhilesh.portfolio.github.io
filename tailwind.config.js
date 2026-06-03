/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Space Grotesk', 'system-ui', 'sans-serif'],
        mono: ['Fira Code', 'Cascadia Code', 'monospace'],
      },
      colors: {
        bg:        '#0A0F1F',
        surface:   'rgba(20, 28, 45, 0.72)',
        primary:   '#7C5CFF',
        accent:    '#00D4FF',
        highlight: '#3BFFB5',
        muted:     '#A8B3CF',
        faint:     '#4A5568',
      },
      animation: {
        blink: 'blink 1s step-end infinite',
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
      },
    },
  },
  plugins: [],
}
