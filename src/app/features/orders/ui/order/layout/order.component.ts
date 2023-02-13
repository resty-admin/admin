import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from "@angular/core";
import type { IAction } from "@shared/ui/actions";

import { IOrder } from "../interfaces";

@Component({
	selector: "app-order",
	templateUrl: "./order.component.html",
	styleUrls: ["./order.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrderComponent {
	@Output() editClicked = new EventEmitter<IOrder>();
	@Output() deleteClicked = new EventEmitter<IOrder>();
	@Output() closeClicked = new EventEmitter<IOrder>();
	@Output() cancelClicked = new EventEmitter<IOrder>();
	@Input() order?: IOrder;

	readonly additionalActions: IAction<IOrder>[] = [
		{
			icon: "close",
			label: "CLOSE",
			func: (data) => this.closeClicked.emit(data)
		},
		{
			icon: "close",
			label: "CANCEL",
			func: (data) => this.cancelClicked.emit(data)
		}
	];

	emitEditClick(order: IOrder) {
		this.editClicked.emit(order);
	}

	emitDeleteClick(order: IOrder) {
		this.deleteClicked.emit(order);
	}
}
