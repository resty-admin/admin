import type { OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import type { Observable } from "rxjs";
import { map } from "rxjs";
import { OrdersService } from "src/app/features/orders";

import { PLACE_ID } from "../../../../../../../../../../../../shared/constants";
import { RouterService } from "../../../../../../../../../../../../shared/modules/router";
import { ActiveOrdersPageGQL } from "../graphql/active-orders-page";

@UntilDestroy()
@Component({
	selector: "app-active-orders",
	templateUrl: "./active-orders.component.html",
	styleUrls: ["./active-orders.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActiveOrdersComponent implements OnInit {
	readonly orders$: Observable<any> = this._ordersService.orders$;
	readonly actions = this._ordersService.actions;

	private readonly _activeOrdersPageQuery = this._activeOrdersPageGQL.watch();
	readonly _activeOrders$ = this._activeOrdersPageQuery.valueChanges.pipe(map((result) => result.data.orders.data));

	constructor(
		private readonly _ordersService: OrdersService,
		private readonly _routerService: RouterService,
		private readonly _activeOrdersPageGQL: ActiveOrdersPageGQL
	) {}

	ngOnInit() {
		this._routerService
			.selectParams(PLACE_ID.slice(1))
			.pipe(untilDestroyed(this))
			.subscribe(async (placeId) => {
				await this._activeOrdersPageQuery.setVariables({
					filtersArgs: [{ key: "place.id", operator: "=", value: placeId }]
				});
			});
	}
}
