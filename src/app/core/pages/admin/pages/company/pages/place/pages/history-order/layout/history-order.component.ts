import type { OnDestroy, OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { ActionsService } from "@features/app";
import { OrdersService } from "@features/orders";
import { ProductToOrderStatusEnum } from "@graphql";
import { ADMIN_ROUTES, COMPANY_ID, ORDER_ID, PLACE_ID } from "@shared/constants";
import { BreadcrumbsService } from "@shared/modules/breadcrumbs";
import { RouterService } from "@shared/modules/router";
import { take } from "rxjs";

import { HISTORY_ORDER_PAGE } from "../constants";
import { HistoryOrderPageService } from "../services";

@Component({
	selector: "app-history-order",
	templateUrl: "./history-order.component.html",
	styleUrls: ["./history-order.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class HistoryOrderComponent implements OnInit, OnDestroy {
	readonly activeOrderPage = HISTORY_ORDER_PAGE;
	readonly statuses = [ProductToOrderStatusEnum.Approved, ProductToOrderStatusEnum.WaitingForApprove];

	readonly historyOrder$ = this._historyOrderPageService.historyOrder$;

	selectedUsers: string[] = [];
	selectedProductsToOrders: string[] = [];

	constructor(
		private readonly _historyOrderPageService: HistoryOrderPageService,
		private readonly _routerService: RouterService,
		private readonly _breadcrumbsService: BreadcrumbsService,
		private readonly _actionsService: ActionsService,
		private readonly _ordersService: OrdersService
	) {}

	ngOnInit() {
		this._ordersService.setActiveOrderId(this._routerService.getParams(ORDER_ID.slice(1)));

		this._breadcrumbsService.setBreadcrumb({
			routerLink: ADMIN_ROUTES.ORDERS.absolutePath
				.replace(COMPANY_ID, this._routerService.getParams(COMPANY_ID.slice(1)))
				.replace(PLACE_ID, this._routerService.getParams(PLACE_ID.slice(1)))
		});

		this._actionsService.setAction({
			label: "Подтвердить оплату",
			func: () => {
				this._ordersService.setPaidStatusForProductsInOrder(this.selectedProductsToOrders).pipe(take(1)).subscribe();
			}
		});
	}

	ngOnDestroy() {
		this._actionsService.setAction(null);
		this._breadcrumbsService.setBreadcrumb(null);
	}
}
