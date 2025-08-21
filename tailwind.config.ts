import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				hell: {
					fire: 'hsl(var(--hell-fire))',
					ember: 'hsl(var(--hell-ember))',
					gold: 'hsl(var(--hell-gold))',
					shadow: 'hsl(var(--hell-shadow))',
					smoke: 'hsl(var(--hell-smoke))'
				}
			},
			backgroundImage: {
				'gradient-inferno': 'var(--gradient-inferno)',
				'gradient-hellfire': 'var(--gradient-hellfire)',
				'gradient-ember': 'var(--gradient-ember)'
			},
			boxShadow: {
				'hellfire': 'var(--shadow-hellfire)',
				'ember': 'var(--shadow-ember)',
				'glow-intense': 'var(--glow-intense)'
			},
			fontFamily: {
				'inter': ['Inter', 'sans-serif'],
				'roboto': ['Roboto', 'sans-serif'],
				'opensans': ['Open Sans', 'sans-serif'],
				'montserrat': ['Montserrat', 'sans-serif'],
				'poppins': ['Poppins', 'sans-serif'],
				'source': ['Source Sans Pro', 'sans-serif'],
				'hellscore': ['Creepster', 'cursive'],
				'infernal': ['Nosifer', 'cursive'],
				'metal': ['Metal Mania', 'cursive']
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				'flame-flicker': {
					'0%': { opacity: '0.9', transform: 'scale(1)' },
					'50%': { opacity: '1', transform: 'scale(1.02)' },
					'100%': { opacity: '0.85', transform: 'scale(0.98)' }
				},
				'infernal-pulse': {
					'0%, 100%': { boxShadow: '0 0 20px hsl(0 100% 50% / 0.5)' },
					'50%': { boxShadow: '0 0 40px hsl(0 100% 50% / 0.8), 0 0 60px hsl(14 100% 45% / 0.4)' }
				},
				'thermometer-fill': {
					'0%': { height: '0%' },
					'100%': { height: 'var(--fill-height)' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'flame-flicker': 'flame-flicker 2s ease-in-out infinite alternate',
				'infernal-pulse': 'infernal-pulse 2s ease-in-out infinite',
				'thermometer-fill': 'thermometer-fill 1.5s ease-out'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
