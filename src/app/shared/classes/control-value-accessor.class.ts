import type { OnChanges, OnInit } from "@angular/core";
import { Component, EventEmitter, Inject, Input, Optional, Output } from "@angular/core";
import type { ValidationErrors } from "@angular/forms";
import type { ControlValueAccessor as _ControlValueAccessor } from "@ngneat/reactive-forms";
import { FormControl } from "@ngneat/reactive-forms";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { v4 } from "uuid";

import type { ISimpleChanges } from "../interfaces";

@UntilDestroy()
@Component({ template: "" })
// eslint-disable-next-line @angular-eslint/component-class-suffix
export abstract class ControlValueAccessor<T> implements _ControlValueAccessor, OnInit, OnChanges {
	@Output() valueChange = new EventEmitter<T>();

	@Input() value?: T | null = null;
	@Input() errors: ValidationErrors | null = null;
	@Input() disabled = false;
	@Input() placeholder = "";

	readonly formControl: FormControl<T>;
	readonly id = v4();

	onChange?: (value: T) => void;
	onTouched?: () => void;

	constructor(@Inject(String) @Optional() initialValue: T) {
		this.formControl = new FormControl<T>(initialValue);
	}

	ngOnInit(): void {
		this.formControl.valueChanges.pipe(untilDestroyed(this)).subscribe((value) => {
			if (this.onChange) {
				this.onChange(value);
			}

			this.valueChange.emit(value);
		});
	}

	ngOnChanges(changes: ISimpleChanges<ControlValueAccessor<T>>) {
		if (changes.errors?.currentValue) {
			this.formControl.setErrors(changes.errors.currentValue);
		}

		if (changes.value?.currentValue) {
			this.formControl.setValue(changes.value.currentValue);
		}

		if (changes.disabled) {
			this.formControl.setDisable(changes.disabled.currentValue);
		}
	}

	validate(): ValidationErrors | null {
		return this.formControl.errors;
	}

	registerOnChange(onChange: (value: T) => void): void {
		this.onChange = onChange;
	}

	registerOnTouched(onTouched: () => void): void {
		this.onTouched = onTouched;
	}

	writeValue(value: T): void {
		this.formControl.setValue(value, { emitEvent: false });
	}

	setDisabledState(isDisabled: boolean): void {
		if (isDisabled) {
			this.formControl.disable();
		} else {
			this.formControl.enable();
		}
	}
}
