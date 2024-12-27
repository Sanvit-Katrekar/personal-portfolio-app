module.exports = {
  darkMode: ["class"],
  content: ["./app/**/*.{js,ts,jsx,tsx}"],
  plugins: [
	require("postcss"),
	require("tailwindcss-animate"),
	require('tailwind-typewriter'),
  ],
  theme: {
  	extend: {
		animation: {
			'fade-in-out-zoom': 'fadeInOutZoom 3s infinite alternate',
			'fade-in-zoom': 'fadeInZoom 6s 2s forwards'
		},
		keyframes: {
			fadeInOutZoom: {
				'0%': { opacity: '0', transform: 'scale(0.9)' },
				'50%': { opacity: '1', transform: 'scale(1)' },
				'100%': { opacity: '0', transform: 'scale(0.9)' },
			  },
			  fadeInZoom: {
				'0%': { opacity: '0', transform: 'scale(0.9)' },
				'100%': { opacity: '1', transform: 'scale(1)' },		
			  }
		},
  		colors: {
  			'color-background-light': '#fff',
  			'color-background': '#f5f8fa',
  			'color-background-dark': '#24292e',
  			'color-border-light': '#f5f8fa',
  			'color-border': '#cfd7dd',
  			'color-border-dark': '#57606a',
  			'color-copy-light': '#57606a',
  			'color-copy': '#24292e',
  			'color-copy-dark': '#57606a',
  			'color-primary': '#0084d1',
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
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		fontFamily: {
  			'font-monospace': '`ui-monospace, SFMono-Regular, SF Mono, Menlo, Consolas, Liberation Mono, monospace`',
  			'font-sans-serif': '`sans-serif`',
  			'font-serif': '`-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"`'
  		},
  		screens: {
  			xs: '320px'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  }
};
