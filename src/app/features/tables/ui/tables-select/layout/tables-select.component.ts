import type { OnChanges, OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import type { ValidationErrors } from "@angular/forms";
import type { ControlValueAccessor } from "@ngneat/reactive-forms";
import { FormBuilder, FormControl } from "@ngneat/reactive-forms";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";

import { getControlValueAccessorProviders } from "../../../../../shared/functions";
import type { ISimpleChanges } from "../../../../../shared/interfaces";

@UntilDestroy()
@Component({
	selector: "app-tables-select",
	templateUrl: "./tables-select.component.html",
	styleUrls: ["./tables-select.component.scss"],
	providers: getControlValueAccessorProviders(TablesSelectComponent),
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class TablesSelectComponent implements OnInit, OnChanges, ControlValueAccessor {
	@Input() tables?: any = [];
	@Input() value: any;

	readonly tablesGroup = this._formBuilder.group({});

	onChange: ((value: any) => void) | undefined;
	onTouched: (() => void) | undefined;

	constructor(private readonly _formBuilder: FormBuilder) {}

	trackByFn(index: number) {
		return index;
	}

	ngOnInit() {
		this.tablesGroup.valueChanges.pipe(untilDestroyed(this)).subscribe((tables) => {
			if (!this.onChange) {
				return;
			}

			const tablesToReturn = Object.entries(tables)
				.filter(([_, value]) => value)
				.map(([key]) => this.tables.find((table: any) => table.id === key));

			this.onChange(tablesToReturn);
		});
	}

	ngOnChanges(changes: ISimpleChanges<TablesSelectComponent>) {
		if (changes.tables && changes.tables.currentValue) {
			for (const table of changes.tables.currentValue) {
				this.tablesGroup.addControl(table.id, new FormControl(false));
			}
		}

		if (changes.value && changes.value.currentValue) {
			this.writeValue(changes.value.currentValue);
		}
	}

	registerOnChange(onChange: (value: any) => void): void {
		this.onChange = onChange;
	}

	registerOnTouched(onTouched: () => void): void {
		this.onTouched = onTouched;
	}

	validate(): ValidationErrors | null {
		return this.tablesGroup.errors;
	}

	writeValue(selectedTables: any[]): void {
		if (!selectedTables) {
			return;
		}

		const newValue = Object.keys(this.tablesGroup.value).reduce(
			(pre, key) => ({ ...pre, [key]: selectedTables.some(({ id }) => id === key) }),
			{}
		);

		this.tablesGroup.patchValue(newValue, { emitValue: false });
	}
}
