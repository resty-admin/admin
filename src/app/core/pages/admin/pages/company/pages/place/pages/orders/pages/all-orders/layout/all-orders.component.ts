import type { AfterViewInit } from "@angular/core";
import { ChangeDetectionStrategy, Component, ViewChild } from "@angular/core";
import { filter, from, switchMap, take } from "rxjs";
import { OrderTypeEnum } from "src/app/shared/enums";
import type { IOrder } from "src/app/shared/interfaces";
import type { IDatatableColumn } from "src/app/shared/ui/datatable";
import { DialogService } from "src/app/shared/ui/dialog";
import { ToastrService } from "src/app/shared/ui/toastr";

import { PLACE_ID } from "../../../../../../../../../../../../shared/constants";
import { OrdersService } from "../../../../../../../../../../../../shared/modules/orders";
import { RouterService } from "../../../../../../../../../../../../shared/modules/router";
import { OrderDialogComponent } from "../../../components";

@Component({
	selector: "app-all-orders",
	templateUrl: "./all-orders.component.html",
	styleUrls: ["./all-orders.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class AllOrdersComponent implements AfterViewInit {
	@ViewChild("actionsTemplate", { static: true }) actionsTemplate!: any;

	columns: IDatatableColumn[] = [];

	readonly orders$ = this._ordersService.orders$;

	constructor(
		private readonly _ordersService: OrdersService,
		private readonly _dialogService: DialogService,
		private readonly _toastrService: ToastrService,
		private readonly _routerService: RouterService
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

	ngAfterViewInit() {
		this.columns = [
			{
				prop: "orderCode",
				name: "Код"
			},
			{
				prop: "date",
				name: "Дата"
			},
			{
				prop: "status",
				name: "Статус"
			},
			{
				cellTemplate: this.actionsTemplate
			}
		];
	}
}
