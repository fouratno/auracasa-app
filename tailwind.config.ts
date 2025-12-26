import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  darkMode: "class", // Enable dark mode support
  theme: {
    extend: {
      // Premium Typography System
      fontFamily: {
        serif: ["Playfair Display", "Georgia", "serif"], // Elegant headings
        sans: ["Inter", "system-ui", "sans-serif"], // Clean body text
        accent: ["Space Grotesk", "monospace"], // Modern tech feel
      },
      fontSize: {
        // Fluid typography using clamp()
        "fluid-xs": "clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem)",
        "fluid-sm": "clamp(0.875rem, 0.8rem + 0.375vw, 1rem)",
        "fluid-base": "clamp(1rem, 0.95rem + 0.25vw, 1.125rem)",
        "fluid-lg": "clamp(1.125rem, 1rem + 0.625vw, 1.5rem)",
        "fluid-xl": "clamp(1.25rem, 1.1rem + 0.75vw, 1.875rem)",
        "fluid-2xl": "clamp(1.5rem, 1.3rem + 1vw, 2.25rem)",
        "fluid-3xl": "clamp(1.875rem, 1.6rem + 1.375vw, 3rem)",
        "fluid-4xl": "clamp(2.25rem, 1.9rem + 1.75vw, 3.75rem)",
        "fluid-5xl": "clamp(3rem, 2.5rem + 2.5vw, 4.5rem)",
      },
      lineHeight: {
        tight: "1.2", // For headings
        relaxed: "1.6", // For body text
        loose: "1.8", // For long-form content
      },
      letterSpacing: {
        tighter: "-0.05em",
        tight: "-0.025em",
        normal: "0",
        wide: "0.025em",
        wider: "0.05em",
        widest: "0.1em",
      },
      
      // Expanded Color System with Semantic Tokens
      colors: {
        // Existing brand colors
        brand: {
          50: "#f9f6f2",
          100: "#efe6d9",
          200: "#e3d2bd",
          300: "#d6bda2",
          400: "#cfa58b",
          500: "#bf896c", // desert clay
          600: "#a46f55",
          700: "#865a46",
          800: "#6a493a",
          900: "#553c31",
        },
        accent: {
          50: "#e6f2ff",
          100: "#cce5ff",
          200: "#99cbff",
          300: "#66b0ff",
          400: "#3396ff",
          500: "#2d7dd2", // sky blue
          600: "#2363a8",
          700: "#1a4a7e",
          800: "#123254",
          900: "#09192a",
        },
        blush: {
          50: "#fff0f5",
          100: "#ffe0eb",
          200: "#ffc1d7",
          300: "#ffa2c3",
          400: "#ff7ba9", // existing
          500: "#ff5c95",
          600: "#cc4a77",
          700: "#993759",
          800: "#66253b",
          900: "#33121e",
        },
        
        // Semantic color tokens
        surface: {
          DEFAULT: "#ffffff",
          elevated: "#fafafa",
          sunken: "#f5f5f5",
          dark: "#1a1a1a",
          "dark-elevated": "#262626",
          "dark-sunken": "#0f0f0f",
        },
        border: {
          DEFAULT: "#e5e5e5",
          subtle: "#f0f0f0",
          strong: "#d4d4d4",
          dark: "#404040",
          "dark-subtle": "#2a2a2a",
          "dark-strong": "#525252",
        },
        text: {
          DEFAULT: "#171717",
          muted: "#737373",
          subtle: "#a3a3a3",
          inverse: "#ffffff",
          dark: "#fafafa",
          "dark-muted": "#a3a3a3",
          "dark-subtle": "#737373",
        },
        
        // System feedback colors
        success: {
          DEFAULT: "#22c55e",
          light: "#86efac",
          dark: "#16a34a",
        },
        warning: {
          DEFAULT: "#f59e0b",
          light: "#fcd34d",
          dark: "#d97706",
        },
        error: {
          DEFAULT: "#ef4444",
          light: "#fca5a5",
          dark: "#dc2626",
        },
        info: {
          DEFAULT: "#3b82f6",
          light: "#93c5fd",
          dark: "#2563eb",
        },
      },
      
      // Gradient overlays
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "gradient-brand": "linear-gradient(135deg, #bf896c 0%, #2d7dd2 100%)",
        "gradient-subtle": "linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.8) 100%)",
        "gradient-dark": "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.8) 100%)",
      },
      
      // 8px Grid System
      spacing: {
        "0.5": "0.125rem", // 2px
        "1": "0.25rem", // 4px
        "1.5": "0.375rem", // 6px
        "2": "0.5rem", // 8px
        "2.5": "0.625rem", // 10px
        "3": "0.75rem", // 12px
        "3.5": "0.875rem", // 14px
        "4": "1rem", // 16px
        "5": "1.25rem", // 20px
        "6": "1.5rem", // 24px
        "7": "1.75rem", // 28px
        "8": "2rem", // 32px
        "9": "2.25rem", // 36px
        "10": "2.5rem", // 40px
        "11": "2.75rem", // 44px
        "12": "3rem", // 48px
        "14": "3.5rem", // 56px
        "16": "4rem", // 64px
        "20": "5rem", // 80px
        "24": "6rem", // 96px
        "28": "7rem", // 112px
        "32": "8rem", // 128px
        "36": "9rem", // 144px
        "40": "10rem", // 160px
        "44": "11rem", // 176px
        "48": "12rem", // 192px
        "52": "13rem", // 208px
        "56": "14rem", // 224px
        "60": "15rem", // 240px
        "64": "16rem", // 256px
        "72": "18rem", // 288px
        "80": "20rem", // 320px
        "96": "24rem", // 384px
      },
      
      // Max-width containers
      maxWidth: {
        "8xl": "90rem", // 1440px - immersive content
        "9xl": "100rem", // 1600px - ultra-wide
      },
      
      // Border radius
      borderRadius: {
        xl: "1rem",
        "2xl": "1.25rem",
        "3xl": "1.5rem",
        "4xl": "2rem",
      },
      
      // Box shadows for depth
      boxShadow: {
        "soft": "0 2px 8px rgba(0, 0, 0, 0.04)",
        "medium": "0 4px 16px rgba(0, 0, 0, 0.08)",
        "strong": "0 8px 32px rgba(0, 0, 0, 0.12)",
        "glow": "0 0 20px rgba(45, 125, 210, 0.3)",
        "glow-brand": "0 0 20px rgba(191, 137, 108, 0.3)",
      },
      
      // Backdrop blur for glassmorphism
      backdropBlur: {
        xs: "2px",
        sm: "4px",
        DEFAULT: "8px",
        md: "12px",
        lg: "16px",
        xl: "24px",
        "2xl": "40px",
        "3xl": "64px",
      },
      
      // Animation durations
      transitionDuration: {
        "0": "0ms",
        "75": "75ms",
        "100": "100ms",
        "150": "150ms",
        "200": "200ms",
        "300": "300ms",
        "400": "400ms",
        "500": "500ms",
        "700": "700ms",
        "1000": "1000ms",
      },
      
      // Custom animations
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in-down": {
          "0%": { opacity: "0", transform: "translateY(-20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "scale-in": {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        "slide-in-right": {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0)" },
        },
        "slide-in-left": {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(0)" },
        },
        "shimmer": {
          "0%": { backgroundPosition: "-1000px 0" },
          "100%": { backgroundPosition: "1000px 0" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.5s ease-out",
        "fade-in-up": "fade-in-up 0.6s ease-out",
        "fade-in-down": "fade-in-down 0.6s ease-out",
        "scale-in": "scale-in 0.3s ease-out",
        "slide-in-right": "slide-in-right 0.3s ease-out",
        "slide-in-left": "slide-in-left 0.3s ease-out",
        "shimmer": "shimmer 2s infinite linear",
      },
      
      // Z-index scale
      zIndex: {
        "0": "0",
        "10": "10",
        "20": "20",
        "30": "30",
        "40": "40",
        "50": "50",
        "60": "60",
        "70": "70",
        "80": "80",
        "90": "90",
        "100": "100",
        "dropdown": "1000",
        "sticky": "1020",
        "fixed": "1030",
        "modal-backdrop": "1040",
        "modal": "1050",
        "popover": "1060",
        "tooltip": "1070",
      },
    },
  },
  plugins: [],
};

export default config;
