import type { AfterViewInit, OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { OrdersService } from "@features/orders";
import type { HistoryOrderEntity } from "@graphql";
import { ADMIN_ROUTES, COMPANY_ID, ORDER_ID, PLACE_ID } from "@shared/constants";
import type { AtLeast } from "@shared/interfaces";
import { RouterService } from "@shared/modules/router";
import type { IDatatableColumn } from "@shared/ui/datatable";
import { DialogService } from "@shared/ui/dialog";
import { map } from "rxjs";

import { HISTORY_ORDERS_PAGE_I18N } from "../constants/history-orders-page-i18n.constant";
import { HistoryOrdersPageGQL } from "../graphql";

@Component({
	selector: "app-history-orders",
	templateUrl: "./history-orders.component.html",
	styleUrls: ["./history-orders.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class HistoryOrdersComponent implements AfterViewInit, OnInit {
	readonly historyOrdersPageI18n = HISTORY_ORDERS_PAGE_I18N;
	private readonly _historyOrdersPageQuery = this._historyOrdersPageGQL.watch();
	readonly allOrders$ = this._historyOrdersPageQuery.valueChanges.pipe(map((result) => result.data.historyOrders.data));

	columns: IDatatableColumn[] = [];

	constructor(
		private readonly _historyOrdersPageGQL: HistoryOrdersPageGQL,
		private readonly _ordersService: OrdersService,
		private readonly _routerService: RouterService,
		private readonly _dialogService: DialogService
	) {}

	trackByFn(index: number) {
		return index;
	}

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
