import type { OnDestroy, OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ActionsService } from "@features/app";
import { OrdersService } from "@features/orders";
import { OrderDialogComponent } from "@features/orders/ui";
import type { ActiveOrderEntity } from "@graphql";
import { ADMIN_ROUTES, PLACE_ID } from "@shared/constants";
import type { AtLeast } from "@shared/interfaces";
import { I18nService } from "@shared/modules/i18n";
import { RouterService } from "@shared/modules/router";
import type { IAction } from "@shared/ui/actions";
import { ConfirmationDialogComponent } from "@shared/ui/confirmation-dialog";
import { DialogService } from "@shared/ui/dialog";
import { ToastrService } from "@shared/ui/toastr";
import { lastValueFrom, map } from "rxjs";

import { ACTIVE_ORDERS_PAGE } from "../constants";
import { ActiveOrdersPageGQL } from "../graphql";

@Component({
	selector: "app-active-orders",
	templateUrl: "./active-orders.component.html",
	styleUrls: ["./active-orders.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActiveOrdersComponent implements OnInit, OnDestroy {
	readonly adminRoutes = ADMIN_ROUTES;
	readonly activeOrdersPage = ACTIVE_ORDERS_PAGE;
	private readonly _activeOrdersPageQuery = this._activeOrdersPageGQL.watch();
	readonly activeOrders$ = this._activatedRoute.data.pipe(map((data) => data["orders"]));

	readonly actions: IAction<ActiveOrderEntity>[] = [
		{
			label: "Редактировать",
			icon: "edit",
			func: (order) => this.openUpdateOrderDialog(order)
		},
		{
			label: "Закрыть",
			icon: "edit",
			func: (order) => this.closeOrder(order)
		},
		{
			label: "Удалить",
			icon: "delete",
			func: (order) => this.openDeleteOrderDialog(order)
		}
	];

	constructor(
		private readonly _activatedRoute: ActivatedRoute,
		private readonly _activeOrdersPageGQL: ActiveOrdersPageGQL,
		private readonly _ordersService: OrdersService,
		private readonly _routerService: RouterService,
		private readonly _actionsService: ActionsService,
		private readonly _dialogService: DialogService,
		private readonly _toastrService: ToastrService,
		private readonly _i18nService: I18nService
	) {}

	async openCreateOrderDialog() {
		const place = this._routerService.getParams(PLACE_ID.slice(1));

		if (!place) {
			return;
		}

		const order: ActiveOrderEntity | undefined = await lastValueFrom(
			this._dialogService.open(OrderDialogComponent).afterClosed$
		);

		if (!order) {
			return;
		}

		await lastValueFrom(
			this._ordersService
				.createOrder({ place, type: order.type })
				.pipe(
					this._toastrService.observe(
						this._i18nService.translate("title", {}, this.activeOrdersPage),
						this._i18nService.translate("title", {}, this.activeOrdersPage)
					)
				)
		);

		await this._activeOrdersPageQuery.refetch();
	}

	async openUpdateOrderDialog(data: AtLeast<ActiveOrderEntity, "id">) {
		const order: ActiveOrderEntity | undefined = await lastValueFrom(
			this._dialogService.open(OrderDialogComponent, { data }).afterClosed$
		);

		if (!order) {
			return;
		}

		await lastValueFrom(
			this._ordersService
				.updateOrder({ id: order.id, type: order.type })
				.pipe(
					this._toastrService.observe(
						this._i18nService.translate("title", {}, this.activeOrdersPage),
						this._i18nService.translate("title", {}, this.activeOrdersPage)
					)
				)
		);

		await this._activeOrdersPageQuery.refetch();
	}

	async openDeleteOrderDialog(value: AtLeast<ActiveOrderEntity, "id">) {
		const config = { data: { title: this._i18nService.translate("title", {}, this.activeOrdersPage), value } };

		const order: ActiveOrderEntity | undefined = await lastValueFrom(
			this._dialogService.open(ConfirmationDialogComponent, config).afterClosed$
		);

		if (!order) {
			return;
		}

		await lastValueFrom(
			this._ordersService
				.deleteOrder(order.id)
				.pipe(
					this._toastrService.observe(
						this._i18nService.translate("title", {}, this.activeOrdersPage),
						this._i18nService.translate("title", {}, this.activeOrdersPage)
					)
				)
		);

		await this._activeOrdersPageQuery.refetch();
	}

	async closeOrder(order: AtLeast<ActiveOrderEntity, "id">) {
		await lastValueFrom(
			this._ordersService
				.closeOrder(order.id)
				.pipe(
					this._toastrService.observe(
						this._i18nService.translate("title", {}, this.activeOrdersPage),
						this._i18nService.translate("title", {}, this.activeOrdersPage)
					)
				)
		);

		await this._activeOrdersPageQuery.refetch();
	}

	async ngOnInit() {
		const placeId = this._routerService.getParams(PLACE_ID.slice(1));

		if (!placeId) {
			return;
		}

		this._actionsService.setAction({
			label: "Добавить заказ",
			func: () => this.openCreateOrderDialog()
		});

		await this._activeOrdersPageQuery.setVariables({
			filtersArgs: [{ key: "place.id", operator: "=", value: placeId }]
		});
	}

	ngOnDestroy() {
		this._actionsService.setAction(null);
	}
}
