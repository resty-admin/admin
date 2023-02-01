import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from "@angular/core";

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
	@Input() order?: IOrder;

	emitEditClick(order: IOrder) {
		this.editClicked.emit(order);
	}

	emitDeleteClick(order: IOrder) {
		this.editClicked.emit(order);
	}
}
