import type { OnDestroy, OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { map } from "rxjs";
import { OrdersService } from "src/app/features/orders";

import { ActionsService } from "../../../../../../../../../../../../features/app";
import { ADMIN_ROUTES, PLACE_ID } from "../../../../../../../../../../../../shared/constants";
import { RouterService } from "../../../../../../../../../../../../shared/modules/router";
import { ACTIVE_ORDERS_PAGE_I18N } from "../constants";
import { ActiveOrdersPageGQL } from "../graphql/active-orders-page";

@UntilDestroy()
@Component({
	selector: "app-active-orders",
	templateUrl: "./active-orders.component.html",
	styleUrls: ["./active-orders.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActiveOrdersComponent implements OnInit, OnDestroy {
	readonly adminRoutes = ADMIN_ROUTES;
	readonly activeOrdersPageI18n = ACTIVE_ORDERS_PAGE_I18N;
	private readonly _activeOrdersPageQuery = this._activeOrdersPageGQL.watch();
	readonly activeOrders$ = this._activeOrdersPageQuery.valueChanges.pipe(map((result) => result.data.orders.data));

	readonly actions = this._ordersService.actions;

	constructor(
		private readonly _activeOrdersPageGQL: ActiveOrdersPageGQL,
		private readonly _ordersService: OrdersService,
		private readonly _routerService: RouterService,
		private readonly _actionsService: ActionsService
	) {}

	trackByFn(index: number) {
		return index;
	}

	openCreateOrderDialog() {
		const place = this._routerService.getParams(PLACE_ID.slice(1));

		if (!place) {
			return;
		}

		return this._ordersService.openCreateOrderDialog({ place });
	}

	async ngOnInit() {
		const placeId = this._routerService.getParams(PLACE_ID.slice(1));

		if (!placeId) {
			return;
		}

		this._ordersService.changes$.pipe(untilDestroyed(this)).subscribe(async () => {
			await this._activeOrdersPageQuery.refetch();
		});

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
