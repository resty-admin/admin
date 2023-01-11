import { ChangeDetectionStrategy, Component } from "@angular/core";
import { OrdersService } from "src/app/features/orders";
import { ADMIN_ROUTES } from "src/app/shared/constants";

import { DialogService } from "../../../../../../../../../../shared/ui/dialog";

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

	constructor(private readonly _ordersService: OrdersService, private readonly _dialogService: DialogService) {}

	openCreateOrderDialog() {
		return this._ordersService.openCreateOrderDialog();
	}
}
