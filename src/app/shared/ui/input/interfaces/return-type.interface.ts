export const returnTypes = ["string", "number", "float"] as const;
export type IReturnType = typeof returnTypes[number];
