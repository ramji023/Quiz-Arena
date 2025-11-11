import { ThemeData } from "../../types/themeType";

export const THEMES: ThemeData[] = [
  {
    id: "jungle-quest",
    name: "🌿 Jungle Quest",
    colors: {
      primaryText: "yellow",
      secondaryText: "white",
      bg:"black",
      primaryBackground: "green",
      secondaryBackground: "emerald",
    },
    backgroundImage: "./themes/15027.jpg",
    overlayEffect: "fireflies",
    optionColors: [
      "from-green-700 to-green-500",
      "from-amber-500 to-yellow-400",
      "from-emerald-600 to-teal-500",
      "from-lime-500 to-green-400",
    ],
  },
];
