export interface Design {
  goal: number;
  current: number;
  title: string;
  subtitle: string;
  theme: string;
  fontStyle: string;
  showPercentage: boolean;
  customMessage: string;
  scale: number;
  rotation: number;
  currency: string;
  customSymbol: string;
  symbolPosition: "before" | "after";
  showFlames: boolean;
}

export const designDefaults: Design = {
  goal: 10000,
  current: 3500,
  currency: "ILS", // Changed default currency
  customSymbol: "",
  symbolPosition: "before",
  title: "HELLSCORE FUNDRAISER",
  subtitle: "Support ...",
  theme: "hellfire",
  fontStyle: "gothic",
  showPercentage: true,
  customMessage: "Help us ...",
  scale: 1,
  rotation: 0,
  showFlames: true,
};
