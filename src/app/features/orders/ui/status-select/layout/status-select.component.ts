import type { OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import type { ValidationErrors } from "@angular/forms";
import type { ControlValueAccessor } from "@ngneat/reactive-forms";
import { FormControl } from "@ngneat/reactive-forms";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";

import { getControlValueAccessorProviders } from "../../../../../shared/functions";

@UntilDestroy()
@Component({
	selector: "app-status-select",
	templateUrl: "./status-select.component.html",
	styleUrls: ["./status-select.component.scss"],
	providers: [getControlValueAccessorProviders(StatusSelectComponent)],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class StatusSelectComponent implements OnInit, ControlValueAccessor {
	@Input() statuses?: any[] | null;

	onChange: ((value: any) => void) | undefined;
	onTouched: (() => void) | undefined;

	readonly formControl = new FormControl();

	ngOnInit() {
		this.formControl.valueChanges.pipe(untilDestroyed(this)).subscribe((value) => {
			if (!this.onChange) {
				return;
			}

			this.onChange(value);
		});
	}

	trackByFn(index: number) {
		return index;
	}

	registerOnChange(onChange: (value: any) => void): void {
		this.onChange = onChange;
	}

	registerOnTouched(onTouched: () => void): void {
		this.onTouched = onTouched;
	}

	validate(): ValidationErrors | null {
		return this.formControl.errors;
	}

	writeValue(value: any): void {
		this.formControl.setValue(value, { emitValue: false });
	}
}
