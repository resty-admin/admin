import { ChangeDetectionStrategy, Component } from "@angular/core";

import { OrdersService } from "../../../../../../../../../../../../shared/modules/orders";

@Component({
	selector: "app-active-orders",
	templateUrl: "./active-orders.component.html",
	styleUrls: ["./active-orders.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActiveOrdersComponent {
	readonly orders$ = this._ordersService.orders$;

	constructor(private readonly _ordersService: OrdersService) {}
}
