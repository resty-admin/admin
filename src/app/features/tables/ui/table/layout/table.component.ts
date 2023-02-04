import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from "@angular/core";

import { ITable } from "../interfaces";

@Component({
	selector: "app-table",
	templateUrl: "./table.component.html",
	styleUrls: ["./table.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableComponent {
	@Output() editClicked = new EventEmitter<ITable>();
	@Output() deleteClicked = new EventEmitter<ITable>();
	@Input() table?: ITable;

	emitEditClick(table: ITable) {
		this.editClicked.emit(table);
	}

	emitDeleteClick(table: ITable) {
		this.deleteClicked.emit(table);
	}
}
