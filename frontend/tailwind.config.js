/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        mygrad:
          "linear-gradient(90deg, hsla(73, 65%, 34%, 1) 0%, hsla(156, 68%, 88%, 1) 50%, hsla(195, 84%, 41%, 1) 99%)",
        brad: "linear-gradient(90deg, hsla(340, 100%, 58%, 1) 0%, hsla(266, 74%, 55%, 1) 100%, hsla(340, 100%, 58%, 1))",
        "editor-grad":
          "linear-gradient(90deg, hsla(42, 100%, 91%, 1) 0%, hsla(23, 66%, 71%, 1) 100%)",
      },
    },
  },
};
