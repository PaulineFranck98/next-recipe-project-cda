import type { Config } from "tailwindcss";

const config: Config = {
  
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#fdfdfd",
        foreground: "#171717",
        salmon: '#eb896a',
        secondary: " #373d50",
        hoverColor: "#64685f",
        'dark-background' : "#131827",
        'dark-foreground' : '#ffffff',
        'dark-secondary' : "#1E293B",
        'dark-hover-color' : '#334155' 

      },
    },
  },
  plugins: [],
  darkMode: 'class',
};
export default config;

// #373d50
// #afafaf