import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./app.vue",
    "./nuxt.config.{js,ts}",
  ],
  theme: {
    container: {
      center: true, // Tự động căn giữa container

      screens: {
        sm: "640px", // Container có max-width 640px khi màn hình >= 640px
        md: "768px", // Container có max-width 768px khi màn hình >= 768px
        lg: "1024px", // Container có max-width 1024px khi màn hình >= 1024px
        xl: "1280px", // Container có max-width 1280px khi màn hình >= 1280px
        "2xl": "1440px", // Container có max-width 1440px (ví dụ)
      },
    },

    extend: {
      // ... Các tùy chỉnh khác như màu sắc, font chữ
    },
  },
  plugins: [],
};

export default config;
