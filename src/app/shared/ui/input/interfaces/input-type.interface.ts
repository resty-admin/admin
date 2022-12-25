export const inputTypes = ["email", "input", "number", "password", "tel"] as const;
export type IInputType = typeof inputTypes[number];
