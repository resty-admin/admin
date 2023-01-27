import type { AfterViewInit, OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import type { HistoryOrderEntity } from "@graphql";
import { ADMIN_ROUTES, COMPANY_ID, ORDER_ID, PLACE_ID } from "@shared/constants";
import type { AtLeast } from "@shared/interfaces";
import { RouterService } from "@shared/modules/router";
import { SharedService } from "@shared/services";
import type { IDatatableColumn } from "@shared/ui/datatable";
import { map } from "rxjs";

import { HISTORY_ORDERS_PAGE } from "../constants";
import { HistoryOrdersPageGQL } from "../graphql";

@Component({
	selector: "app-history-orders",
	templateUrl: "./history-orders.component.html",
	styleUrls: ["./history-orders.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class HistoryOrdersComponent implements AfterViewInit, OnInit {
	readonly historyOrdersPage = HISTORY_ORDERS_PAGE;
	private readonly _historyOrdersPageQuery = this._historyOrdersPageGQL.watch();
	readonly allOrders$ = this._historyOrdersPageQuery.valueChanges.pipe(map((result) => result.data.historyOrders.data));

	columns: IDatatableColumn[] = [];

	constructor(
		readonly sharedService: SharedService,
		private readonly _historyOrdersPageGQL: HistoryOrdersPageGQL,
		private readonly _routerService: RouterService
	) {}

	async navigateToHitoryOrder(event: AtLeast<HistoryOrderEntity, "id">) {
		const { companyId, placeId } = this._routerService.getParams();

		await this._routerService.navigateByUrl(
			ADMIN_ROUTES.HISTORY_ORDER.absolutePath
				.replace(COMPANY_ID, companyId)
				.replace(PLACE_ID, placeId)
				.replace(ORDER_ID, event.id)
		);
	}

	async ngOnInit() {
		const placeId = this._routerService.getParams(PLACE_ID.slice(1));

		if (!placeId) {
			return;
		}

		await this._historyOrdersPageQuery.setVariables({
			filtersArgs: [{ key: "place.id", operator: "=", value: placeId }]
		});
	}

	ngAfterViewInit() {
		this.columns = [
			{
				prop: "orderNumber",
				name: "Код"
			},
			{
				prop: "date",
				name: "Дата"
			},
			{
				prop: "status",
				name: "Статус"
			}
		];
	}
}
