import type { Type } from "@angular/core";
import { forwardRef } from "@angular/core";
import { NG_VALIDATORS, NG_VALUE_ACCESSOR } from "@angular/forms";

export function getControlValueAccessorProviders(component: Type<unknown>) {
	return [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => component),
			multi: true
		},
		{
			provide: NG_VALIDATORS,
			useExisting: forwardRef(() => component),
			multi: true
		}
	];
}
