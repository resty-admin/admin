import type { OnChanges, OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import type { ValidationErrors } from "@angular/forms";
import type { ControlValueAccessor } from "@ngneat/reactive-forms";
import { FormBuilder, FormControl } from "@ngneat/reactive-forms";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { pairwise } from "rxjs";

import { getControlValueAccessorProviders } from "../../../../../../../../../../../shared/functions";
import type { ISimpleChanges } from "../../../../../../../../../../../shared/interfaces";

@UntilDestroy()
@Component({
	selector: "app-halls-select",
	templateUrl: "./halls-select.component.html",
	styleUrls: ["./halls-select.component.scss"],
	providers: getControlValueAccessorProviders(HallsSelectComponent),
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class HallsSelectComponent implements OnInit, OnChanges, ControlValueAccessor {
	@Input() halls?: any[] | null = [];

	readonly hallsGroup = this._formBuilder.group({ all: false });

	onChange: ((value: any) => void) | undefined;
	onTouched: (() => void) | undefined;

	constructor(private readonly _formBuilder: FormBuilder) {}

	trackByFn(index: number) {
		return index;
	}

	ngOnInit() {
		let isProgrammatic = false;

		this.hallsGroup.value$.pipe(untilDestroyed(this), pairwise()).subscribe(([oldHalls, currHalls]) => {
			if (isProgrammatic) {
				isProgrammatic = false;
				return;
			}

			const { all, ...hallsMap } = currHalls;
			const isAllChecked = Object.values(hallsMap).every((isChecked) => isChecked);

			if (all !== isAllChecked) {
				isProgrammatic = true;
				this.hallsGroup.patchValue({ all: isAllChecked });
			}

			if (all !== oldHalls.all) {
				const allCheckedHalls = Object.keys(hallsMap).reduce((prev, id) => ({ ...prev, [id]: all }), { all });
				this.hallsGroup.patchValue(allCheckedHalls);
				return;
			}

			const hallsToReturn = Object.entries(hallsMap)
				.filter(([_, value]) => value)
				.map(([key]) => key);

			if (!this.onChange) {
				return;
			}

			this.onChange(hallsToReturn);
		});
	}

	ngOnChanges(changes: ISimpleChanges<HallsSelectComponent>) {
		if (!changes.halls || !changes.halls.currentValue) {
			return;
		}

		for (const hall of changes.halls.currentValue) {
			this.hallsGroup.addControl(hall.id, new FormControl(false));
		}
	}

	registerOnChange(onChange: (value: any) => void): void {
		this.onChange = onChange;
	}

	registerOnTouched(onTouched: () => void): void {
		this.onTouched = onTouched;
	}

	validate(): ValidationErrors | null {
		return this.hallsGroup.errors;
	}

	writeValue(value: any): void {
		this.hallsGroup.patchValue(value, { emitValue: false });
	}
}
