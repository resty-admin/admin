import { ChangeDetectionStrategy, Component } from "@angular/core";
import { filter, from, switchMap, take } from "rxjs";
import type { IOrder } from "src/app/shared/interfaces";
import { DialogService } from "src/app/shared/ui/dialog";
import { ToastrService } from "src/app/shared/ui/toastr";

import { PLACE_ID } from "../../../../../../../../../../shared/constants";
import { OrderTypeEnum } from "../../../../../../../../../../shared/enums";
import { OrdersService } from "../../../../../../../../../../shared/modules/orders";
import { RouterService } from "../../../../../../../../../../shared/modules/router";
import { ADMIN_ROUTES } from "../../../../../../../../../../shared/routes";
import { OrderDialogComponent } from "../components";

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

	constructor(
		private readonly _ordersService: OrdersService,
		private readonly _routerService: RouterService,
		private readonly _dialogService: DialogService,
		private readonly _toastrService: ToastrService
	) {}

	openOrderDialog(order?: Partial<IOrder>) {
		this._dialogService
			.open(OrderDialogComponent, { data: order })
			.afterClosed$.pipe(
				take(1),
				filter((order) => Boolean(order)),
				switchMap((order: Partial<IOrder>) =>
					order.id
						? this._ordersService.updateOrder(order.id, order).pipe(take(1), this._toastrService.observe("Заказы"))
						: this._ordersService
								.createOrder({
									...order,
									place: this._routerService.getParams(PLACE_ID.slice(1)),
									type: OrderTypeEnum.IN_PLACE
								} as unknown as any)
								.pipe(take(1), this._toastrService.observe("Заказы"))
				),
				switchMap(() => from(this._ordersService.refetchOrders()))
			)
			.subscribe();
	}
}
