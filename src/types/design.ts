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
