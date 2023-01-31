import { FormControl, FormGroup } from "@angular/forms";

import type { ControlConfig, ControlsOf, GroupConfig } from "../interfaces/angular/reactive-form.interface";

export function buildForm<T extends Record<any, any>>(config: GroupConfig<T>): FormGroup<ControlsOf<T>> {
	return new FormGroup(
		Object.entries(config).reduce(
			(acc, [key, [value, validators]]: [keyof T, ControlConfig<T, keyof T>]) => ({
				...acc,
				[key]: new FormControl(value, { validators, nonNullable: true })
			}),
			// eslint-disable-next-line
			{} as ControlsOf<T>
		)
	);
}
