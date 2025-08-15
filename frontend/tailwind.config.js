/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#FFC404", // Main theme color
        primaryHover: "#2D23A6", // Slightly darker shade for hover
        accent: "#2C14DD", // Secondary text or accent color
        bgHoverPrimary: "#1855F9",
        borderColor: "#F0F0F1",
        bgRed: "#CA2222",
        bgBlue: "#1855F9",
        bgPurple: "#3F2EC8",
        bgBlack: "#000",
        textGrey: "#6F6F6F",
        lightPurple: "#F2F0FF",
      },
      fontSize: {
        xs: "0.75rem", // 12px
        sm: "0.875rem", // 14px
        base: "1rem", // 16px
        lg: "1.125rem", // 18px
        xl: "1.25rem", // 20px
        "2xl": "1.5rem", // 24px
        "26px": "1.625rem", // 26px
        "3xl": "1.875rem", // 30px
        "40px": "2.5rem", // 40px
        "4xl": "2.25rem", // 36px
        "5xl": "3rem", // 48px
        "50px": "3.125rem", // 50px
        "6xl": "3.75rem", // 60px
        "7xl": "4.5rem", // 72px
        "8xl": "6rem", // 96px
        "9xl": "8rem", // 128px
      },
      fontWeight: {
        hairline: "100",
        thin: "200",
        light: "300",
        normal: "400",
        medium: "500",
        semibold: "600",
        bold: "700",
        extrabold: "800",
        black: "900",
      },
    },
  },
  plugins: [],
};
