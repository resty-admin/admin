import type { DeepPartial } from "./deep-partial.interface";

export type AtLeast<T, K extends keyof T> = Partial<T> & Pick<T, K>;
export type DeepAtLeast<T, K extends keyof T> = DeepPartial<T> & Pick<T, K>;
