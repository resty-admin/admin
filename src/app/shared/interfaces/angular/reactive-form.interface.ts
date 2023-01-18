import type { FormControl, FormControlState, ValidatorFn } from "@angular/forms";

export type ControlsOf<T extends Record<string, unknown>> = {
	[K in keyof T]: FormControl<T[K]>;
};

export type GroupConfig<T> = {
	[K in keyof T]: ControlConfig<T, K>;
};

export type ControlConfig<T, K extends keyof T> = readonly [
	initialValue: FormControlState<T[K]> | T[K],
	validators?: ValidatorFn | ValidatorFn[]
];
