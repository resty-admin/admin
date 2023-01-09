import type { AfterViewInit, OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component, ViewChild } from "@angular/core";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import type { Observable } from "rxjs";
import { map } from "rxjs";
import { OrdersService } from "src/app/features/orders";
import type { IDatatableColumn } from "src/app/shared/ui/datatable";

import { PLACE_ID } from "../../../../../../../../../../../../shared/constants";
import { RouterService } from "../../../../../../../../../../../../shared/modules/router";
import { AllOrdersPageGQL } from "../graphql/all-orders-page";

@UntilDestroy()
@Component({
	selector: "app-all-orders",
	templateUrl: "./all-orders.component.html",
	styleUrls: ["./all-orders.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class AllOrdersComponent implements AfterViewInit, OnInit {
	@ViewChild("moreTemplate", { static: true }) moreTemplate!: any;

	columns: IDatatableColumn[] = [];

	readonly actions = this._ordersService.actions;

	private readonly _allOrdersPageQuery = this._allOrdersPageGQL.watch();
	readonly allOrders$: Observable<any> = this._allOrdersPageQuery.valueChanges.pipe(
		map((result) => result.data.orders.data)
	);

	constructor(
		private readonly _ordersService: OrdersService,
		private readonly _routerService: RouterService,
		private readonly _allOrdersPageGQL: AllOrdersPageGQL
	) {}

	ngOnInit() {
		this._routerService
			.selectParams(PLACE_ID.slice(1))
			.pipe(untilDestroyed(this))
			.subscribe(async (placeId) => {
				await this._allOrdersPageQuery.setVariables({
					filtersArgs: [{ key: "place.id", operator: "=", value: placeId }]
				});
			});
	}

	ngAfterViewInit() {
		this.columns = [
			{
				prop: "code",
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
				cellTemplate: this.moreTemplate
			}
		];
	}
}
