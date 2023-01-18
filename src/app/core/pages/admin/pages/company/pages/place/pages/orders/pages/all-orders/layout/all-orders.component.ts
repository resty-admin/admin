import type { AfterViewInit, OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component, TemplateRef, ViewChild } from "@angular/core";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { map } from "rxjs";
import { OrdersService } from "src/app/features/orders";
import type { IDatatableColumn } from "src/app/shared/ui/datatable";

import { PLACE_ID } from "../../../../../../../../../../../../shared/constants";
import { RouterService } from "../../../../../../../../../../../../shared/modules/router";
import { DialogService } from "../../../../../../../../../../../../shared/ui/dialog";
import { ALL_ORDERS_PAGE_I18N } from "../constants";
import { AllOrdersPageGQL } from "../graphql/all-orders-page";

@UntilDestroy()
@Component({
	selector: "app-all-orders",
	templateUrl: "./all-orders.component.html",
	styleUrls: ["./all-orders.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class AllOrdersComponent implements AfterViewInit, OnInit {
	@ViewChild("moreTemplate", { static: true }) moreTemplate?: TemplateRef<unknown>;
	readonly allOrdersPageI18n = ALL_ORDERS_PAGE_I18N;
	private readonly _allOrdersPageQuery = this._allOrdersPageGQL.watch();
	readonly allOrders$ = this._allOrdersPageQuery.valueChanges.pipe(map((result) => result.data.historyOrders.data));

	readonly actions = this._ordersService.actions;

	columns: IDatatableColumn[] = [];

	constructor(
		private readonly _allOrdersPageGQL: AllOrdersPageGQL,
		private readonly _ordersService: OrdersService,
		private readonly _routerService: RouterService,
		private readonly _dialogService: DialogService
	) {}

	trackByFn(index: number) {
		return index;
	}

	async ngOnInit() {
		const placeId = this._routerService.getParams(PLACE_ID.slice(1));

		if (!placeId) {
			return;
		}

		this._ordersService.changes$.pipe(untilDestroyed(this)).subscribe(async () => {
			await this._allOrdersPageQuery.refetch();
		});

		await this._allOrdersPageQuery.setVariables({
			filtersArgs: [{ key: "place.id", operator: "=", value: placeId }]
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
