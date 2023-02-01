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
import { filter, from, map, switchMap, take } from "rxjs";

import { ActiveOrdersPageGQL } from "../graphql";

@Component({
	selector: "app-active-orders",
	templateUrl: "./active-orders.component.html",
	styleUrls: ["./active-orders.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActiveOrdersComponent implements OnInit, OnDestroy {
	readonly adminRoutes = ADMIN_ROUTES;

	private readonly _activeOrdersPageQuery = this._activeOrdersPageGQL.watch();
	readonly activeOrders$ = this._activeOrdersPageQuery.valueChanges.pipe(map((result) => result.data.orders.data));

	constructor(
		private readonly _activeOrdersPageGQL: ActiveOrdersPageGQL,
		private readonly _ordersService: OrdersService,
		private readonly _actionsService: ActionsService,
		private readonly _routerService: RouterService,
		private readonly _dialogService: DialogService,
		private readonly _toastrService: ToastrService,
		private readonly _i18nService: I18nService
	) {}

	async ngOnInit() {
		await this._activeOrdersPageQuery.setVariables({
			filtersArgs: [{ key: "place.id", operator: "=", value: this._routerService.getParams(PLACE_ID.slice(1)) }]
		});

		this._actionsService.setAction({ label: "Добавить заказ", func: () => this.openCreateOrderDialog() });
	}

	openCreateOrderDialog() {
		return this._dialogService.open(OrderDialogComponent).afterClosed$.pipe(
			filter((order) => Boolean(order)),
			switchMap((order) =>
				this._ordersService
					.createOrder({ place: this._routerService.getParams(PLACE_ID.slice(1)), type: order.type })
					.pipe(
						switchMap(() => from(this._activeOrdersPageQuery.refetch())),
						this._toastrService.observe(this._i18nService.translate("ORDERS.CREATE"))
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
						switchMap(() => from(this._activeOrdersPageQuery.refetch())),
						this._toastrService.observe(this._i18nService.translate("ORDERS.UPDATE"))
					)
				),
				take(1)
			)
			.subscribe();
	}

	openDeleteOrderDialog(value: AtLeast<ActiveOrderEntity, "id">) {
		this._dialogService
			.open(ConfirmationDialogComponent, {
				data: { title: this._i18nService.translate("ORDERS.CONFIRM"), value }
			})
			.afterClosed$.pipe(
				filter((isConfirmed) => Boolean(isConfirmed)),
				switchMap(() =>
					this._ordersService.deleteOrder(value.id).pipe(
						switchMap(() => from(this._activeOrdersPageQuery.refetch())),
						this._toastrService.observe(this._i18nService.translate("ORDERS.DELETE"))
					)
				),
				take(1)
			)
			.subscribe();
	}

	closeOrder(order: AtLeast<ActiveOrderEntity, "id">) {
		this._ordersService
			.closeOrder(order.id)
			.pipe(this._toastrService.observe(this._i18nService.translate("ORDERS.CLOSE")), take(1))
			.subscribe();
	}

	ngOnDestroy() {
		this._actionsService.setAction(null);
	}
}
