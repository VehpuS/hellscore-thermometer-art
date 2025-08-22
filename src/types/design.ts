export enum Themes {
  HELLFIRE = "hellfire",
  MOLTEN = "molten",
  SHADOW = "shadow",
  CRIMSON = "crimson",
  INFERNO = "inferno",
}

export enum FontStyles {
  GOTHIC = "gothic",
  MODERN = "modern",
  METAL = "metal",
  ELEGANT = "elegant",
}

export enum SizePresets {
  STORY = "story",
  SQUARE = "square",
  POST = "post",
  TWITTER = "twitter",
  CUSTOM = "custom",
}

export interface Design {
  goal: number;
  current: number;
  title: string;
  subtitle: string;
  theme: Themes;
  fontStyle: FontStyles;
  showPercentage: boolean;
  customMessage: string;
  scaleX: number;
  scaleY: number;
  previewScale: number;
  rotation: number;
  translateY: number;
  currency: string;
  customSymbol: string;
  currencySymbolPosition: "before" | "after";
  showFlame: boolean;
  sizePreset: SizePresets;
  width?: number;
  height?: number;
}
export const themeOptions: Array<{
  value: Themes;
  label: string;
  desc: string;
}> = [
  {
    value: Themes.HELLFIRE,
    label: "Hellfire",
    desc: "Classic red and orange flames",
  },
  {
    value: Themes.MOLTEN,
    label: "Molten",
    desc: "Yellow and orange lava flow",
  },
  { value: Themes.SHADOW, label: "Shadow", desc: "Dark purples and grays" },
  { value: Themes.CRIMSON, label: "Crimson", desc: "Deep red blood theme" },
  { value: Themes.INFERNO, label: "Inferno", desc: "Intense orange and black" },
];

export const fontOptions: Array<{
  value: FontStyles;
  label: string;
  desc: string;
}> = [
  { value: FontStyles.GOTHIC, label: "Gothic", desc: "Classic serif style" },
  { value: FontStyles.MODERN, label: "Modern", desc: "Clean sans-serif" },
  { value: FontStyles.METAL, label: "Metal", desc: "Bold monospace" },
  { value: FontStyles.ELEGANT, label: "Elegant", desc: "Light and refined" },
];

export const sizeOptions: Array<{
  value: SizePresets;
  label: string;
  width?: number;
  height?: number;
}> = [
  {
    value: SizePresets.STORY,
    label: "Story (9:16)",
    width: 450,
    height: 800,
  },
  {
    value: SizePresets.SQUARE,
    label: "Square Media (1:1)",
    width: 800,
    height: 800,
  },
  {
    value: SizePresets.POST,
    label: "Landscape (16:9)",
    width: 800,
    height: 450,
  },
  {
    value: SizePresets.TWITTER,
    label: "Twitter (2:1)",
    width: 800,
    height: 400,
  },
  {
    value: SizePresets.CUSTOM,
    label: "Custom Size",
  },
];

export const designDefaults: Design = {
  goal: 10000,
  current: 3500,
  currency: "ILS", // Changed default currency
  customSymbol: "",
  currencySymbolPosition: "before",
  title: "HELLSCORE FUNDRAISER",
  subtitle: "Support ...",
  theme: Themes.HELLFIRE,
  fontStyle: FontStyles.GOTHIC,
  showPercentage: true,
  customMessage: "Help us ...",
  scaleX: 1,
  scaleY: 1,
  previewScale: 1,
  rotation: 0,
  translateY: 0,
  showFlame: true,
  sizePreset: SizePresets.STORY,
};
