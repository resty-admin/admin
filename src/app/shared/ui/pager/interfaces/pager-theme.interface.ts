export const paginatorThemes = ["1", "2"] as const;
export type IPaginatorTheme = (typeof paginatorThemes)[number];
