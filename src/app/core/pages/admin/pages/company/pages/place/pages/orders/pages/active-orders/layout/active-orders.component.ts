import type { OnDestroy, OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { ActionsService } from "@features/app";
import { OrderDialogComponent, OrdersService } from "@features/orders";
import type { ActiveOrderEntity } from "@graphql";
import { ADMIN_ROUTES, PLACE_ID } from "@shared/constants";
import type { AtLeast } from "@shared/interfaces";
import { I18nService } from "@shared/modules/i18n";
import { RouterService } from "@shared/modules/router";
import { ConfirmationDialogComponent } from "@shared/ui/confirmation-dialog";
import { DialogService } from "@shared/ui/dialog";
import { ToastrService } from "@shared/ui/toastr";
import { filter, from, switchMap, take } from "rxjs";

import { ACTIVE_ORDERS_PAGE } from "../constants";
import { ActiveOrdersPageService } from "../services";

@Component({
	selector: "app-active-orders",
	templateUrl: "./active-orders.component.html",
	styleUrls: ["./active-orders.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActiveOrdersComponent implements OnInit, OnDestroy {
	readonly adminRoutes = ADMIN_ROUTES;
	readonly activeOrdersPage = ACTIVE_ORDERS_PAGE;

	readonly activeOrders$ = this._activeOrdersPageService.activeOrders$;

	constructor(
		private readonly _activeOrdersPageService: ActiveOrdersPageService,
		private readonly _ordersService: OrdersService,
		private readonly _actionsService: ActionsService,
		private readonly _routerService: RouterService,
		private readonly _dialogService: DialogService,
		private readonly _toastrService: ToastrService,
		private readonly _i18nService: I18nService
	) {}

	ngOnInit() {
		this._actionsService.setAction({ label: "Добавить заказ", func: () => this.openCreateOrderDialog() });
	}

	openCreateOrderDialog() {
		return this._dialogService.open(OrderDialogComponent).afterClosed$.pipe(
			filter((order) => Boolean(order)),
			switchMap((order) =>
				this._ordersService
					.createOrder({ place: this._routerService.getParams(PLACE_ID.slice(1)), type: order.type })
					.pipe(
						switchMap(() => from(this._activeOrdersPageService.activeOrdersPageQuery.refetch())),
						this._toastrService.observe(this._i18nService.translate("createOrder"))
					)
			)
		);
	}

	openUpdateOrderDialog(data: AtLeast<ActiveOrderEntity, "id">) {
		this._dialogService
			.open(OrderDialogComponent, { data })
			.afterClosed$.pipe(
				filter((order) => Boolean(order)),
				switchMap((order) =>
					this._ordersService.updateOrder({ id: order.id, type: order.type }).pipe(
						switchMap(() => from(this._activeOrdersPageService.activeOrdersPageQuery.refetch())),
						this._toastrService.observe(this._i18nService.translate("updateOrder"))
					)
				),
				take(1)
			)
			.subscribe();
	}

	openDeleteOrderDialog(value: AtLeast<ActiveOrderEntity, "id">) {
		this._dialogService
			.open(ConfirmationDialogComponent, {
				data: { title: this._i18nService.translate("title"), value }
			})
			.afterClosed$.pipe(
				filter((isConfirmed) => Boolean(isConfirmed)),
				switchMap(() =>
					this._ordersService.deleteOrder(value.id).pipe(
						switchMap(() => from(this._activeOrdersPageService.activeOrdersPageQuery.refetch())),
						this._toastrService.observe(this._i18nService.translate("deleteOrder"))
					)
				),
				take(1)
			)
			.subscribe();
	}

	closeOrder(order: AtLeast<ActiveOrderEntity, "id">) {
		this._ordersService
			.closeOrder(order.id)
			.pipe(this._toastrService.observe(this._i18nService.translate("closeOrder")), take(1))
			.subscribe();
	}

	ngOnDestroy() {
		this._actionsService.setAction(null);
	}
}
