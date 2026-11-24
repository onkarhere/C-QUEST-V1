import animate from "tailwindcss-animate";

/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: ["./src/**/*.{js,jsx}"],
  theme: {
  	extend: {
  		opacity: Object.fromEntries(Array.from({ length: 101 }, (_, i) => [i, `${i / 100}`])),
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			brand: {
  				DEFAULT: 'hsl(var(--brand) / <alpha-value>)',
  				dark: 'hsl(var(--brand-dark) / <alpha-value>)',
  				light: 'hsl(var(--brand-light) / <alpha-value>)'
  			},
  			aqua: 'hsl(var(--aqua) / <alpha-value>)',
  			sun: 'hsl(var(--sun) / <alpha-value>)',
  			tangerine: 'hsl(var(--tangerine) / <alpha-value>)',
  			coral: 'hsl(var(--coral) / <alpha-value>)',
  			grape: 'hsl(var(--grape) / <alpha-value>)',
  			ink: 'hsl(var(--ink) / <alpha-value>)',
  			'ink-soft': 'hsl(var(--ink-soft) / <alpha-value>)',
  			'ink-faint': 'hsl(var(--ink-faint) / <alpha-value>)',
  			'brand-ink': 'hsl(var(--brand-ink) / <alpha-value>)',
  			'brand-tint': 'hsl(var(--brand-tint) / <alpha-value>)',
  			'sun-ink': 'hsl(var(--sun-ink) / <alpha-value>)',
  			'tangerine-ink': 'hsl(var(--tangerine-ink) / <alpha-value>)',
  			frame: 'hsl(var(--frame) / <alpha-value>)',
  			tile: 'hsl(var(--tile) / <alpha-value>)',
  			track: 'hsl(var(--track) / <alpha-value>)',
  			hover: 'hsl(var(--hover) / <alpha-value>)',
  			line: 'hsl(var(--line) / <alpha-value>)',
  			surface: 'hsl(var(--surface) / <alpha-value>)'
  		},
  		fontFamily: {
  			heading: ['var(--font-heading)'],
  			body: ['var(--font-body)'],
  			display: ['var(--font-display)'],
  			mono: ['var(--font-mono)']
  		}
  		
  	}
  },
  plugins: [animate]
}
