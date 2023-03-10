import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from "@angular/core";
import { SharedService } from "@shared/services";

import type { ITableToSelect } from "../interfaces";

@Component({
	selector: "app-selected-tables",
	templateUrl: "./selected-tables.component.html",
	styleUrls: ["./selected-tables.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectedTablesComponent {
	@Output() selectedTablesChange = new EventEmitter<ITableToSelect[]>();
	@Input() selectedTables?: ITableToSelect[] | null;

	constructor(readonly sharedService: SharedService) {}

	emitRemoveClick(selectedTable: ITableToSelect) {
		this.selectedTablesChange.emit((this.selectedTables || []).filter((table) => table.id !== selectedTable.id));
	}
}
