import type { Config } from 'tailwindcss'
import typography from '@tailwindcss/typography'
export default {
  darkMode: ['class'],
  content: ['./app/**/*.{ts,tsx}','./components/**/*.{ts,tsx}','./data/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: { DEFAULT: 'hsl(var(--primary))', foreground: 'hsl(var(--primary-foreground))' },
        muted: { DEFAULT: 'hsl(var(--muted))', foreground: 'hsl(var(--muted-foreground))' },
      },
      borderRadius: { '2xl': '1rem' },
      fontFamily: { sans: ['var(--font-sans)'], mono: ['var(--font-mono)'] },
    },
  },
  plugins: [typography],
} satisfies Config
