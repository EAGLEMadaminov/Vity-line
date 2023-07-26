/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "yound-doctor": "url('./src/images/young-doctor1.png')",
        "top-left": "url('./src/images/top-left.png')",
        "bg-vectors": "url('./src/images/young-doctor2.png')",
        "top-bottom": "url('./src/images/top-bottom.png')",
        "top-bottom": "url('./src/images/middle.png')",
        "top-right": "url('./src/images/top-right.png')",
        ellipse: "url('./src/images/Ellipse8png')",
        "site-logo": "url('./src/images/Frame.png')",
        "form-glass": "url('./src/images/glass.png')",
        globe: "url('./src/images/globe.png')",
        calendar: "url('./src/images/calendar.png')",
        logo: "url('./src/images/cite-logo.png')",
        response_logo: "url('./src/images/respons_logo.png')",
        "account-left": "url('./src/images/account/account-left.png')",
        "account-person": "url('./src/images/account/account-person.png')",
        "account-right": "url('./src/images/account/account-right.png')",
        "account-suitcase-icon": "url('./src/images/account/suitcase.png')",
        "patsient-left": "url('./src/images/patsient/patsient-left.png')",
        "patsient-right": "url('./src/images/patsient/patsient-right.png')",
        "patsient-davolash": "url('./src/images/patsient/heart.png')",
        "patsient-tavsiyanoma": "url('./src/images/patsient/books.png')",
        "patsient-konsultant": "url('./src/images/patsient/konsultant.png')",
        "davolash-dori": "url('./src/images/davolash/davolash-dori.png')",
        "davolash-issue": "url('./src/images/davolash/issue.png')",
        "sand-clock": "url('./src/images/davolash/sand-clock.png')",
        "drug-correct": "url('./src/images/davolash/correct.png')",
        history: "url('./src/images/davolash/history.png')",
        trash: "url('./src/images/davolash/trash.png')",
        books: "url('./src/images/davolash/books.png')",
        davleniya: "url('./src/images/tavsiyanoma/davleniya.png')",
        rentgen: "url('./src/images/tavsiyanoma/rentgen.png')",
        "qon-analiz": "url('./src/images/tavsiyanoma/analiz.png')",
        doctor: "url('./src/images/konsultatsiya/doctor.png')",
        yurak: "url('./src/images/tavsiyanoma/yurak.png')",
      },
      backgroundSize: {
        auto: "auto",
        cover: "cover",
        contain: "contain",
        "100%": "100%",
        16: "4rem",
      },

      boxShadow: {
        patsient: "0px 6px 16px #EFF4F4",
      },
      animation: {
        loader: "loader 0.6s infinite alternate",
      },
      keyframes: {
        loader: {
          to: {
            opacity: 0.1,
            transform: "translate3d(0, -1rem, 0)",
          },
        },
      },
    },
  },
  plugins: [],
};
