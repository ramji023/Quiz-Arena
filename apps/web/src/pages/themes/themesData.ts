import { ThemeData } from "../../types/themeType";

export const THEMES = [
  {
    id: "jungle-quest",
    name: "🌿 Jungle Quest",
    textColor: {
      "li-text-100": "#fef9c3", // leaderboard row
      "button-text-200": "#fef08a", // back button
      "primary-300": "#fde047", // primary yellow color
    },
    background: {
      "bg-black/20": "rgba(0, 0, 0, 0.2)", // main black background
      "bg-li-100/10": "rgba(220, 252, 231, 0.1)", //  leaderboard row
      "bg-li-400/40": "rgba(74, 222, 128, 0.4)",
      "bg-button-800/60": "rgba(154, 52, 18, 0.6)",
      "bg-button-900/40": "rgba(124, 45, 18, 0.4)",
      "from-leaderboard-900/70": "rgba(20, 83, 45, 0.7)", // leaderboard floating
      "to-leaderboard-800/70": "rgba(6, 95, 70, 0.7)", // emerald
    },
    borders: {
      "border-li-300": "#86efac",
      "border-button-400": "#4ade80",
      "border-li-400/30": "rgba(74, 222, 128, 0.3)",
      "border-button-400/60": "rgba(74, 222, 128, 0.6)",
      "border-leaderboard-500/50": "rgba(34, 197, 94, 0.5)",
    },
    optionColor: {
      0: {
        from: "#15803d",
        to: "#22c55e",
      },
      1: {
        from: "#f59e0b",
        to: "#facc15",
      },
      2: {
        from: "#059669",
        to: "#14b8a6",
      },
      3: {
        from: "#84cc16",
        to: "#4ade80",
      },
      4: { color: "#facc15" },
    },
    backgroundImage: "./themes/15027.jpg",
    overlayEffect: "fireflies",
  },
  // colors: {
  //   primaryText: "yellow",
  //   secondaryText: "white",
  //   bg: "black",
  //   primaryBackground: "green",
  //   secondaryBackground: "emerald",
  // },
  {
    id: "desert-mirage",
    name: "🏜️ Desert Mirage",
    textColor: {
      "li-text-100": "#000000", // leaderboard row
      "button-text-200": "#000000", // back button
      "primary-300": "#000000", // primary stone color
    },
    background: {
      // "bg-black/20": "rgba(0, 0, 0, 0.2)", // main black background
      "bg-li-100/10": "rgba(245, 245, 244, 0.1)", //  leaderboard row
      "bg-li-400/40": "rgba(251, 146, 60, 0.4)",
      "bg-button-800/60": "rgba(146, 64, 14, 0.6)",
      "bg-button-900/40": "rgba(146, 64, 14, 0.4)",
      "from-leaderboard-900/70": "rgba(124, 45, 18, 0.7)", // leaderboard floating
      "to-leaderboard-800/70": "rgba(146, 64, 14, 0.7)", // emerald
    },
    borders: {
      "border-li-300": "rgba(217, 119, 6, 1)",
      "border-button-400": "rgba(217, 119, 6, 1)",
      "border-li-400/30": "rgba(217, 119, 6,1)",
      "border-button-400/60": "rgba(217, 119, 6, 1)",
      "border-leaderboard-500/50": "rgba(217, 119, 6, 0.5)",
    },
    backgroundImage: "./themes/desert.jpg",
    overlayEffect: "heatwaves",
    optionColor: {
      0: {
        from: "#ea580c", // orange-600
        to: "#fbbf24", // amber-400
      },
      1: {
        from: "#b91c1c", // red-700
        to: "#f97316", // orange-500
      },
      2: {
        from: "#b45309", // amber-700
        to: "#eab308", // yellow-500
      },
      3: {
        from: "#44403c", // stone-700
        to: "#d97706", // amber-600
      },
      4: {
        color: "#1c1917", // stone (base tone, approx stone-500)
      },
    },

    // optionColors: [
    //   "from-orange-600 to-amber-400",
    //   "from-red-700 to-orange-500",
    //   "from-amber-700 to-yellow-500",
    //   "from-stone-700 to-amber-600",
    //   "stone",
    // ],
    // colors: {
    //   primaryText: "stone",
    //   secondaryText: "white",
    //   bg: "orange",
    //   primaryBackground: "orange",
    //   secondaryBackground: "amber",
    // },
  },
  {
    id: "ocean-depths",
    name: "🌊 Ocean Depths",
    colors: {
      primaryText: "cyan",
      secondaryText: "sky",
      bg: "blue",
      primaryBackground: "blue",
      secondaryBackground: "sky",
    },
    backgroundImage: "./themes/ocean.jpg",
    overlayEffect: "waveShimmer",
    optionColors: [
      "from-cyan-500 to-blue-400", // bright aqua shimmer
      "from-teal-600 to-cyan-500", // deep teal to cyan
      "from-blue-600 to-indigo-500", // deep ocean blue
      "from-emerald-600 to-teal-500", // rocky coastal green
      "cyan",
    ],
  },
];
