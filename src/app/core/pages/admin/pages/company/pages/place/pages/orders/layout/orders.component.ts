import { ChangeDetectionStrategy, Component } from "@angular/core";
import { OrdersService } from "src/app/features/orders";
import type { IOrder } from "src/app/shared/interfaces";

import { ADMIN_ROUTES } from "../../../../../../../../../../shared/routes";

@Component({
	selector: "app-orders",
	templateUrl: "./orders.component.html",
	styleUrls: ["./orders.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrdersComponent {
	readonly pages = [
		{
			label: "Активные заказы",
			routerLink: ADMIN_ROUTES.ACTIVE_ORDERS.path
		},
		{
			label: "Все заказы",
			routerLink: ADMIN_ROUTES.ALL_ORDERS.path
		}
	];

	constructor(private readonly _ordersService: OrdersService) {}

	openOrderDialog(order?: Partial<IOrder>) {
		this._ordersService.openCreateOrUpdateOrderDialog(order).subscribe();
	}
}
