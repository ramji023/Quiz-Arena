export interface ThemeData {
  id: string;
  name: string;
  colors: {
    primaryText: string;
    secondaryText: string;
    bg:string;
    primaryBackground: string;
    secondaryBackground: string;
  };
  backgroundImage: string;
  overlayEffect: string;
  optionColors: string[];
}
