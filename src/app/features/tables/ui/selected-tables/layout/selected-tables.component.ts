import type { OnChanges, OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import type { ValidationErrors } from "@angular/forms";
import type { ControlValueAccessor } from "@ngneat/reactive-forms";
import { FormControl } from "@ngneat/reactive-forms";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";

import { getControlValueAccessorProviders } from "../../../../../shared/functions";
import type { ISimpleChanges } from "../../../../../shared/interfaces";
import type { ISelectTable } from "../../tables-select/interfaces";
import type { ISelectedTable } from "../interfaces";

@UntilDestroy()
@Component({
	selector: "app-selected-tables",
	templateUrl: "./selected-tables.component.html",
	styleUrls: ["./selected-tables.component.scss"],
	providers: getControlValueAccessorProviders(SelectedTablesComponent),
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectedTablesComponent implements OnInit, OnChanges, ControlValueAccessor {
	@Input() selectedTables?: ISelectTable[];
	onChange?: (value: ISelectedTable[]) => void;
	onTouched?: () => void;
	readonly selectedTablesControl = new FormControl<ISelectedTable[]>([]);
	readonly selectedTables$ = this.selectedTablesControl.value$;

	trackByFn(index: number) {
		return index;
	}

	removeSelectedTable(selectedTableToRemove: ISelectedTable) {
		const newValue = this.selectedTablesControl.value.filter(
			(selectedTable) => selectedTable.id !== selectedTableToRemove.id
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
		if (!changes.selectedTables || !changes.selectedTables.currentValue) {
			return;
		}

		this.writeValue(changes.selectedTables.currentValue);
	}

	registerOnChange(onChange: (value: ISelectedTable[]) => void): void {
		this.onChange = onChange;
	}

	registerOnTouched(onTouched: () => void): void {
		this.onTouched = onTouched;
	}

	validate(): ValidationErrors | null {
		return this.selectedTablesControl.errors;
	}

	writeValue(selectedTables: ISelectTable[]): void {
		this.selectedTablesControl.setValue(selectedTables, { emitValue: false });
	}
}
