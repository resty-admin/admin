import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import type { TableEntity } from "@graphql";
import type { IAction } from "@shared/ui/actions";

import { ITable } from "../interfaces";

@Component({
	selector: "app-table",
	templateUrl: "./table.component.html",
	styleUrls: ["./table.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableComponent {
	@Input() table?: ITable;
	@Input() actions?: IAction<TableEntity>[] | null;
}
