/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class", // 다크모드 대응을 위해 추가
  theme: {
    // extend: {
    //   colors: {
    //     // 하위 팔레트 정의
    //     grayscale: {
    //       white: "#FFFFFF",
    //       "white-alt": "rgba(255, 255, 255, 0.7)",
    //       50: "#F5F7F9",
    //       100: "#D2DAE0",
    //       200: "#879298",
    //       300: "#6E8091",
    //       400: "#5F6E76",
    //       500: "#4B5966",
    //       black: "#14212B",
    //     },
    //     blue: {
    //       100: "#7890E7",
    //       500: "#4362D0",
    //     },
    //     // 디자인 토큰 (시맨틱 컬러)
    //     text: {
    //       strong: "var(--color-text-strong)",
    //       bold: "var(--color-text-bold)",
    //       default: "var(--color-text-default)",
    //       weak: "var(--color-text-weak)",
    //       point: "#4362D0", // blue.500
    //     },
    //     surface: {
    //       default: "var(--color-surface-default)",
    //       alt: "var(--color-surface-alt)",
    //       brand: {
    //         default: "#4362D0",
    //         alt: "#7890E7",
    //       },
    //     },
    //     border: {
    //       default: "var(--color-border-default)",
    //       bold: "var(--color-border-bold)",
    //     },
    //   },
    //   borderRadius: {
    //     100: "8px",
    //     full: "999px",
    //   },
    //   boxShadow: {
    //     popup:
    //       "0 4px 2px rgba(20, 33, 43, 0.02), 0 2px 18px rgba(20, 33, 43, 0.08)",
    //   }, // tailwind.config.js 의 theme.extend 내부에 추가
    //   fontSize: {
    //     // display-bold24 -> size 24, bold 700
    //     "display-bold24": ["24px", { fontWeight: "700", lineHeight: "auto" }],
    //     "display-bold16": ["16px", { fontWeight: "700", lineHeight: "auto" }],
    //     "display-bold14": ["14px", { fontWeight: "700", lineHeight: "auto" }],
    //     "display-bold12": ["12px", { fontWeight: "700", lineHeight: "auto" }],
    //     // display-medium16 -> size 16, weight 500, line-height 22px
    //     "display-medium16": ["16px", { fontWeight: "500", lineHeight: "22px" }],
    //     "display-medium14": ["14px", { fontWeight: "500", lineHeight: "22px" }],
    //     "display-medium12": ["12px", { fontWeight: "500", lineHeight: "auto" }],
    //   },
    //   fontFamily: {
    //     sans: ["Pretendard", "ui-sans-serif", "system-ui"],
    //   },
    // },
  },
};
