import type { OnChanges } from "@angular/core";
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from "@angular/core";
import { FormBuilder } from "@angular/forms";

import type { ISimpleChanges } from "../../../../../shared/interfaces";
import type { ITableToSelect } from "../interfaces";

@Component({
	selector: "app-tables-select",
	templateUrl: "./tables-select.component.html",
	styleUrls: ["./tables-select.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class TablesSelectComponent implements OnChanges {
	@Output() selectedTablesChange = new EventEmitter<ITableToSelect[]>();
	@Input() selectedTables?: ITableToSelect[] | null;
	@Input() tables?: ITableToSelect[] | null;

	tablesWithSelected: (ITableToSelect & { selected: boolean })[] = [];

	constructor(private readonly _formBuilder: FormBuilder) {}

	ngOnChanges(changes: ISimpleChanges<TablesSelectComponent>) {
		if (!(changes.tables?.currentValue || changes.selectedTables?.currentValue)) {
			return;
		}

		this.tablesWithSelected = (this.tables || []).map((table) => ({
			...table,
			selected: (this.selectedTables || []).some((selectedTable) => selectedTable.id === table.id)
		}));
	}

	trackByFn(index: number) {
		return index;
	}

	emitChange() {
		const tablesIds = new Set((this.tables || []).map((table) => table.id));
		const notAffectedSelectedTables = (this.selectedTables || []).filter(
			(selectedTable) => !tablesIds.has(selectedTable.id)
		);

		this.selectedTablesChange.emit([
			...notAffectedSelectedTables,
			...this.tablesWithSelected.filter((table) => table.selected)
		]);
	}
}
