import type { OnChanges } from "@angular/core";
import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import dayjs from "dayjs";

import type { ISimpleChanges } from "../../../../../shared/interfaces";

@Component({
	selector: "app-order-info",
	templateUrl: "./order-info.component.html",
	styleUrls: ["./order-info.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrderInfoComponent implements OnChanges {
	@Input() order: any;

	tableStatus = "";
	tableInfo = "";
	dateInfo = "";

	ngOnChanges(changes: ISimpleChanges<OrderInfoComponent>) {
		if (!changes.order) {
			return;
		}

		const { table, startDate, tableStatus } = changes.order.currentValue;

		const tableName = table ? `${table.hall.name}, ${table.name}` : "";
		const dateName = startDate ? dayjs(startDate).format("MM.DD.YYYY, HH:mm") : "";

		this.tableInfo = tableName || "";
		this.dateInfo = dateName || "";
		this.tableStatus = tableStatus || "";
	}
}
