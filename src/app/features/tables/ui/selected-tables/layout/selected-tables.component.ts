import type { OnChanges, OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import type { ValidationErrors } from "@angular/forms";
import type { ControlValueAccessor } from "@ngneat/reactive-forms";
import { FormControl } from "@ngneat/reactive-forms";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";

import { getControlValueAccessorProviders } from "../../../../../shared/functions";
import type { ISimpleChanges } from "../../../../../shared/interfaces";

@UntilDestroy()
@Component({
	selector: "app-selected-tables",
	templateUrl: "./selected-tables.component.html",
	styleUrls: ["./selected-tables.component.scss"],
	providers: getControlValueAccessorProviders(SelectedTablesComponent),
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectedTablesComponent implements OnInit, OnChanges, ControlValueAccessor {
	@Input() value: any;
	onChange: ((value: any) => void) | undefined;
	onTouched: (() => void) | undefined;
	readonly selectedTablesControl = new FormControl<any>([]);
	readonly selectedTables$ = this.selectedTablesControl.value$;

	trackByFn(index: number) {
		return index;
	}

	removeSelectedTable(selectedTableToRemove: any) {
		const newValue = this.selectedTablesControl.value.filter(
			(selectedTable: any) => selectedTable.id !== selectedTableToRemove.id
		);

		this.selectedTablesControl.setValue(newValue);
	}

	ngOnInit() {
		this.selectedTablesControl.value$.pipe(untilDestroyed(this)).subscribe((selectedTables) => {
			if (!this.onChange) {
				return;
			}

			this.onChange(selectedTables);
		});
	}

	ngOnChanges(changes: ISimpleChanges<SelectedTablesComponent>) {
		if (!changes.value || !changes.value.currentValue) {
			return;
		}

		this.writeValue(changes.value.currentValue);
	}

	registerOnChange(onChange: (value: any) => void): void {
		this.onChange = onChange;
	}

	registerOnTouched(onTouched: () => void): void {
		this.onTouched = onTouched;
	}

	validate(): ValidationErrors | null {
		return this.selectedTablesControl.errors;
	}

	writeValue(selectedTables: any[]): void {
		this.selectedTablesControl.setValue(selectedTables, { emitValue: false });
	}
}
