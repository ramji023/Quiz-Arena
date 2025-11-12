export interface ThemeData {
  id: string;
  name: string;
  textColor: Record<string, string>;
  background: Record<string, string>;
  borders: Record<string, string>;
  backgroundImage: string;
  overlayEffect: string;
  optionColor: Record<number, { from?: string; to?: string; color?: string }>;
}
