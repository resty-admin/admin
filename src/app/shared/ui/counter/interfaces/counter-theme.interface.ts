export const counterThemes = ["1", "2"] as const;
export type ICounterTheme = typeof counterThemes[number];
