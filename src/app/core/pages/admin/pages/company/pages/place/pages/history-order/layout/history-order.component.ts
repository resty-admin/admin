import type { OnDestroy, OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { ActionsService } from "@features/app";
import { OrdersService } from "@features/orders";
import { ProductToOrderStatusEnum } from "@graphql";
import { ADMIN_ROUTES, COMPANY_ID, ORDER_ID, PLACE_ID } from "@shared/constants";
import { BreadcrumbsService } from "@shared/modules/breadcrumbs";
import { RouterService } from "@shared/modules/router";
import { SelectionType } from "@swimlane/ngx-datatable";
import { map } from "rxjs";

import { HistoryOrderPageGQL } from "../graphql";

@Component({
	selector: "app-history-order",
	templateUrl: "./history-order.component.html",
	styleUrls: ["./history-order.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class HistoryOrderComponent implements OnInit, OnDestroy {
	readonly SelectionType = SelectionType;
	readonly statuses = [ProductToOrderStatusEnum.Approved, ProductToOrderStatusEnum.WaitingForApprove];
	private readonly _activeOrderPageQuery = this._activeOrderPageGQL.watch();
	readonly activeOrder$ = this._activeOrderPageQuery.valueChanges.pipe(map((result) => result.data.historyOrder));

	constructor(
		private readonly _activeOrderPageGQL: HistoryOrderPageGQL,
		private readonly _routerService: RouterService,
		private readonly _breadcrumbsService: BreadcrumbsService,
		private readonly _actionsService: ActionsService,
		private readonly _ordersService: OrdersService
	) {}

	async ngOnInit() {
		const orderId = this._routerService.getParams(ORDER_ID.slice(1));

		await this._activeOrderPageQuery.setVariables({ historyOrderId: orderId });

		this._ordersService.setActiveOrderId(orderId);

		this._breadcrumbsService.setBreadcrumb({
			routerLink: ADMIN_ROUTES.ORDERS.absolutePath
				.replace(COMPANY_ID, this._routerService.getParams(COMPANY_ID.slice(1)))
				.replace(PLACE_ID, this._routerService.getParams(PLACE_ID.slice(1)))
		});
	}

	ngOnDestroy() {
		this._actionsService.setAction(null);
		this._breadcrumbsService.setBreadcrumb(null);
	}
}
