import { ThemeData } from "../../types/themeType";

export const THEMES: ThemeData[] = [
  {
    id: "jungle-quest",
    name: "🌿 Jungle Quest",
    textColor: {
      "li-text-100": "#fef9c3", // leaderboard row
      "button-text-200": "#fef08a", // back button
      "primary-300": "#fde047", // primary yellow color
      secondary: "#ffff", // for player name in leaderboard
    },
    background: {
      "bg-black/20": "rgba(0, 0, 0, 0.2)", // main black background
      "bg-li-100/10": "rgba(220, 252, 231, 0.1)", //  leaderboard row
      "bg-li-400/40": "rgba(74, 222, 128, 0.4)",
      "bg-button-800/60": "rgba(154, 52, 18, 0.6)",
      "bg-button-900/40": "rgba(124, 45, 18, 0.4)",
      "from-leaderboard-900/70": "rgba(20, 83, 45, 0.7)", // leaderboard floating
      "to-leaderboard-800/70": "rgba(6, 95, 70, 0.7)", // emerald
      "light-green": "#006400", // light color for leaderboard
      "dark-green": "#013220", // dark color for rank and score
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
    backgroundImage:
      "https://res.cloudinary.com/dqr7qcgch/image/upload/v1762925116/15027_vnjzyt.jpg",
    overlayEffect: "fireflies",
    preview:
      "https://res.cloudinary.com/dqr7qcgch/image/upload/v1763005692/ee70a7e5-6544-48f3-93b6-11ebeefb64cc.png",
    // colors: {
    //   primaryText: "yellow",
    //   secondaryText: "white",
    //   bg: "black",
    //   primaryBackground: "green",
    //   secondaryBackground: "emerald",
    // },
  },
  {
    id: "desert-mirage",
    name: "🏜️ Desert Mirage",
    textColor: {
      "li-text-100": "#000000", // leaderboard row
      "button-text-200": "#000000", // back button
      "primary-300": "#000000", // primary stone color
      secondary: "#ffff", // for player name in leaderboard
    },
    background: {
      // "bg-black/20": "rgba(0, 0, 0, 0.2)", // main black background
      "bg-li-100/10": "rgba(245, 245, 244, 0.1)", //  leaderboard row
      "bg-li-400/40": "rgba(251, 146, 60, 0.4)",
      "bg-button-800/60": "rgba(146, 64, 14, 0.6)",
      "bg-button-900/40": "rgba(146, 64, 14, 0.4)",
      "from-leaderboard-900/70": "rgba(124, 45, 18, 0.7)", // leaderboard floating
      "to-leaderboard-800/70": "rgba(146, 64, 14, 0.7)", // emerald
      "light-green": "#f5a43a", // light color for leaderboard
      "dark-green": "#b87137", // dark color for rank and score
    },
    borders: {
      "border-li-300": "rgba(217, 119, 6, 1)",
      "border-button-400": "rgba(217, 119, 6, 1)",
      "border-li-400/30": "rgba(217, 119, 6,1)",
      "border-button-400/60": "rgba(217, 119, 6, 1)",
      "border-leaderboard-500/50": "rgba(217, 119, 6, 0.5)",
    },
    backgroundImage:
      "https://res.cloudinary.com/dqr7qcgch/image/upload/v1762925089/desert_opqpyv.jpg",
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
    preview:
      "https://res.cloudinary.com/dqr7qcgch/image/upload/v1763006176/9e317a7f-187a-4bb1-8b34-83c801e8ba8b.png",
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
    textColor: {
      "li-text-100": "#cffafe", // leaderboard row
      "button-text-200": "#67e8f9", // back button
      "primary-300": "#22d3ee", // primary stone color
      secondary: "#ffff",
    },
    background: {
      "bg-black/20": "rgba(0, 0, 0, 0.2)", // main black background
      "bg-li-100/10": "rgba(224, 242, 254, 0.1)", //  leaderboard row  -->sky
      "bg-li-400/40": "rgba(56, 189, 248, 0.4)",
      "bg-button-800/60": "rgba(7, 89, 133, 0.6)",
      "bg-button-900/40": "rgba(12, 74, 110, 0.4)",
      "from-leaderboard-900/70": "rgba(12, 74, 110, 0.7)", // sky
      "to-leaderboard-800/70": "rgba(30, 64, 175, 0.7)", // blue
      "light-green": "#596ee1", // light color for leaderboard
      "dark-green": "#2a3670", // dark color for rank and score
    },
    borders: {
      "border-li-300": "rgba(147, 197, 253, 1)",
      "border-button-400": "rgba(96, 165, 250, 1)",
      "border-li-400/30": "rgba(96, 165, 250,1)",
      "border-button-400/60": "rgba(96, 165, 250, 1)",
      "border-leaderboard-500/50": "rgba(59, 130, 246, 0.5)",
    },
    backgroundImage:
      "https://res.cloudinary.com/dqr7qcgch/image/upload/v1762925056/ocean_kpvwde.jpg",
    overlayEffect: "waveShimmer",
    optionColor: {
      0: {
        from: "#06b6d4", // cyan-500
        to: "#60a5fa", // blue-400
      },
      1: {
        from: "#0d9488", // teal-600
        to: "#06b6d4", // cyan-500
      },
      2: {
        from: "#2563eb", // blue-600
        to: "#6366f1", // indigo-500
      },
      3: {
        from: "#047857", // emerald-600
        to: "#14b8a6", // teal-500
      },
      4: {
        color: "#22d3ee", // cyan (base tone, approx cyan-500)
      },
    },
    preview:
      "https://res.cloudinary.com/dqr7qcgch/image/upload/v1763006305/5bf4e37f-340e-4c5c-b196-9af741162ab2.png",
    // colors: {
    //   primaryText: "cyan",
    //   secondaryText: "sky",
    //   bg: "blue",
    //   primaryBackground: "blue",
    //   secondaryBackground: "sky",
    // },
  },
  {
    id: "neural-network",
    name: "🔮 Neural Network",
    textColor: {
      "li-text-100": "#e0e7ff", // indigo-100 - leaderboard row
      "button-text-200": "#c7d2fe", // indigo-200 - back button
      "primary-300": "#a5b4fc", // indigo-300 - primary color
      secondary: "#ffff",
    },
    background: {
      "bg-black/20": "rgba(0, 0, 0, 0.2)", // main overlay
      "bg-li-100/10": "rgba(224, 231, 255, 0.1)", // leaderboard row
      "bg-li-400/40": "rgba(129, 140, 248, 0.4)",
      "bg-button-800/60": "rgba(55, 48, 163, 0.6)", // indigo-800
      "bg-button-900/40": "rgba(49, 46, 129, 0.4)", // indigo-900
      "from-leaderboard-900/70": "rgba(49, 46, 129, 0.7)", // indigo-900
      "to-leaderboard-800/70": "rgba(67, 56, 202, 0.7)", // indigo-700
      "light-green": "#840087", // light color for leaderboard
      "dark-green": "#4f004f", // dark color for rank and score
    },
    borders: {
      "border-li-300": "#a5b4fc", // indigo-300
      "border-button-400": "#818cf8", // indigo-400
      "border-li-400/30": "rgba(129, 140, 248, 0.3)",
      "border-button-400/60": "rgba(129, 140, 248, 0.6)",
      "border-leaderboard-500/50": "rgba(99, 102, 241, 0.5)", // indigo-500
    },
    optionColor: {
      0: {
        from: "#6366f1", // indigo-500
        to: "#8b5cf6", // violet-500
      },
      1: {
        from: "#3b82f6", // blue-500
        to: "#06b6d4", // cyan-500
      },
      2: {
        from: "#8b5cf6", // violet-500
        to: "#d946ef", // fuchsia-500
      },
      3: {
        from: "#0ea5e9", // sky-500
        to: "#6366f1", // indigo-500
      },
      4: { color: "#818cf8" }, // indigo-400
    },
    backgroundImage:
      "https://res.cloudinary.com/dqr7qcgch/image/upload/v1762925027/tech_asrkrz.jpg",
    preview:
      "https://res.cloudinary.com/dqr7qcgch/image/upload/v1763006383/2b4b843b-f0de-41d2-afb9-87fe24881a4b.png",
    overlayEffect: "matrix-rain",
  },
  {
    id: "cosmic-explorer",
    name: "🚀 Cosmic Explorer",
    textColor: {
      "li-text-100": "#e0f2fe",
      "button-text-200": "#67e8f9",
      "primary-300": "#06b6d4",
      secondary: "#2a2419",
    },
    background: {
      "bg-black/20": "rgba(3, 7, 18, 0.2)",
      "bg-li-100/10": "rgba(224, 242, 254, 0.1)",
      "bg-li-400/40": "rgba(6, 182, 212, 0.4)",
      "bg-button-800/60": "rgba(194, 65, 12, 0.6)",
      "bg-button-900/40": "rgba(124, 45, 18, 0.4)",
      "from-leaderboard-900/70": "rgba(12, 74, 110, 0.7)",
      "to-leaderboard-800/70": "rgba(7, 89, 133, 0.7)",
      "light-green": "#b7a77b", // light color for leaderboard
      "dark-green": "#5d5039", // dark color for rank and score
    },
    borders: {
      "border-li-300": "#67e8f9",
      "border-button-400": "#06b6d4",
      "border-li-400/30": "rgba(6, 182, 212, 0.3)",
      "border-button-400/60": "rgba(6, 182, 212, 0.6)",
      "border-leaderboard-500/50": "rgba(14, 165, 233, 0.5)",
    },
    optionColor: {
      0: {
        from: "#0e7490",
        to: "#06b6d4",
      },
      1: {
        from: "#ea580c",
        to: "#fb923c",
      },
      2: {
        from: "#0369a1",
        to: "#0ea5e9",
      },
      3: {
        from: "#fbbf24",
        to: "#fcd34d",
      },
      4: { color: "#67e8f9" },
    },
    backgroundImage:
      "https://res.cloudinary.com/dqr7qcgch/image/upload/v1762924977/cosmic_ucnior.jpg",
    preview:
      "https://res.cloudinary.com/dqr7qcgch/image/upload/v1763006456/ca241832-5d84-46ac-be88-bfa997e54b13.png",
    overlayEffect: "cosmic-stars",
  },
  {
    id: "volcano-fury",
    name: "🌋 Volcano Fury",
    textColor: {
      "li-text-100": "#fef3c7", // soft lava light
      "button-text-200": "#fdba74", // orange highlight
      "primary-300": "#f97316", // bright lava orange
      secondary: "#ffff",
    },
    background: {
      "bg-black/20": "rgba(0, 0, 0, 0.2)", // dark volcanic rock base
      "bg-li-100/10": "rgba(254, 243, 199, 0.1)", // soft ember glow
      "bg-li-400/40": "rgba(249, 115, 22, 0.4)", // glowing orange
      "bg-button-800/60": "rgba(124, 45, 18, 0.6)", // deep molten tone
      "bg-button-900/40": "rgba(67, 20, 7, 0.4)", // dark lava shadows
      "from-leaderboard-900/70": "rgba(30, 27, 27, 0.7)", // smoke-dark gradient start
      "to-leaderboard-800/70": "rgba(69, 10, 10, 0.7)", // ember-red gradient end
      "light-green": "#cf4747", // light color for leaderboard
      "dark-green": "#6b2424", // dark color for rank and score
    },
    borders: {
      "border-li-300": "#fb923c", // lava orange
      "border-button-400": "#f97316", // fiery orange
      "border-li-400/30": "rgba(249, 115, 22, 0.3)",
      "border-button-400/60": "rgba(249, 115, 22, 0.6)",
      "border-leaderboard-500/50": "rgba(234, 88, 12, 0.5)",
    },
    optionColor: {
      0: {
        from: "#b91c1c", // deep red magma
        to: "#ef4444", // bright lava red
      },
      1: {
        from: "#c2410c", // orange molten tone
        to: "#f97316", // bright lava orange
      },
      2: {
        from: "#7c2d12", // dark ember brown
        to: "#ea580c", // glowing orange
      },
      3: {
        from: "#facc15", // yellow molten edge
        to: "#fde047", // golden bright lava
      },
      4: { color: "#fb923c" }, // orange accent
    },
    backgroundImage:
      "https://res.cloudinary.com/dqr7qcgch/image/upload/v1762924865/volcano_vs9fou.jpg",
    preview:
      "https://res.cloudinary.com/dqr7qcgch/image/upload/v1763006513/f298eddd-4026-465f-8dac-39c54b393442.png",
    overlayEffect: "lava-flow",
  },
];
