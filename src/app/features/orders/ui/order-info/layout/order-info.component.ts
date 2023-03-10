import type { OnChanges } from "@angular/core";
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from "@angular/core";
import { OrderStatusEnum } from "@graphql";
import { DAYJS_DISPLAY_FORMAT } from "@shared/constants";
import type { ISimpleChanges } from "@shared/interfaces";
import dayjs from "dayjs";

import { IOrderInfo } from "../interfaces/order-info.interface";

@Component({
	selector: "app-order-info",
	templateUrl: "./order-info.component.html",
	styleUrls: ["./order-info.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrderInfoComponent implements OnChanges {
	@Output() approveClicked = new EventEmitter();
	@Output() rejectClicked = new EventEmitter();
	@Input() order?: IOrderInfo;

	status = "";
	tableInfo = "";
	dateInfo = "";

	readonly orderStatusEnum = OrderStatusEnum;

	ngOnChanges(changes: ISimpleChanges<OrderInfoComponent>) {
		if (!changes.order || !changes.order.currentValue) {
			return;
		}

		const { table, startDate, status } = changes.order.currentValue;

		const tableName = table ? `${table.hall?.name}, ${table.name}` : "";
		const dateName = startDate ? dayjs(startDate).format(DAYJS_DISPLAY_FORMAT) : "";

		this.tableInfo = tableName || "";
		this.dateInfo = dateName || "";
		this.status = status || "";
	}

	emitApproveClick() {
		this.approveClicked.emit();
	}

	emitRejectClick() {
		this.rejectClicked.emit();
	}
}
